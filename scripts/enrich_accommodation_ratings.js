#!/usr/bin/env node
/**
 * Enrich accommodation data with Booking.com ratings via Apify.
 *
 * Usage:
 *   node scripts/enrich_accommodation_ratings.js
 *   node scripts/enrich_accommodation_ratings.js --dry-run
 *   node scripts/enrich_accommodation_ratings.js --batch-size 50
 *
 * Requires: APIFY_TOKEN env var or --token flag
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'travel-accommodation.json');
const ACTOR_ID = 'voyager~booking-scraper';
const DEFAULT_BATCH_SIZE = 25; // Apify handles ~25 URLs per run well
const WAIT_TIMEOUT = 300; // seconds to wait for each run

// ── Parse args ──
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const tokenIdx = args.indexOf('--token');
const batchIdx = args.indexOf('--batch-size');
const APIFY_TOKEN = (tokenIdx >= 0 ? args[tokenIdx + 1] : null)
  || process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error('ERROR: Set APIFY_TOKEN env var or pass --token <token>');
  process.exit(1);
}
const BATCH_SIZE = batchIdx >= 0 ? parseInt(args[batchIdx + 1], 10) : DEFAULT_BATCH_SIZE;

async function apifyRequest(urlPath, options = {}) {
  const base = 'https://api.apify.com/v2';
  const sep = urlPath.includes('?') ? '&' : '?';
  const url = `${base}${urlPath}${sep}token=${APIFY_TOKEN}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Apify ${res.status}: ${text.substring(0, 300)}`);
  }
  return res.json();
}

async function runBatch(urls, batchNum, totalBatches) {
  console.log(`\n  Batch ${batchNum}/${totalBatches}: ${urls.length} URLs`);

  const startUrls = urls.map(u => ({ url: u.cleanUrl }));

  // Start the run
  const runResult = await apifyRequest(`/acts/${ACTOR_ID}/runs?waitForFinish=${WAIT_TIMEOUT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ startUrls }),
  });

  const run = runResult.data;
  if (run.status !== 'SUCCEEDED') {
    console.log(`    WARNING: Run ${run.id} status=${run.status}: ${run.statusMessage}`);
    return [];
  }

  console.log(`    Run ${run.id} succeeded in ${Math.round(run.stats.runTimeSecs)}s`);

  // Fetch dataset items
  const items = await apifyRequest(`/actor-runs/${run.id}/dataset/items`);
  console.log(`    Got ${items.length} results`);
  return items;
}

function cleanBookingUrl(url) {
  try {
    const u = new URL(url);
    return u.origin + u.pathname;
  } catch {
    return url;
  }
}

async function main() {
  console.log('Loading accommodation data...');
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const entries = Object.values(raw);

  // Find entries that need Booking.com ratings
  const toEnrich = entries.filter(e => e.bookingUrl && !e._bookingRating);
  console.log(`Total entries: ${entries.length}`);
  console.log(`Already have Booking rating: ${entries.filter(e => e._bookingRating).length}`);
  console.log(`Need Booking.com ratings: ${toEnrich.length}`);

  if (toEnrich.length === 0) {
    console.log('Nothing to enrich!');
    return;
  }

  if (dryRun) {
    console.log('\n[DRY RUN] Would scrape these URLs:');
    toEnrich.slice(0, 10).forEach(e => console.log(`  ${e.name} -> ${e.bookingUrl.substring(0, 80)}`));
    if (toEnrich.length > 10) console.log(`  ... and ${toEnrich.length - 10} more`);
    return;
  }

  // Prepare URL-to-ID mapping
  const urlMap = new Map();
  toEnrich.forEach(e => {
    const clean = cleanBookingUrl(e.bookingUrl);
    urlMap.set(clean, e.id);
    // Also map without trailing slash
    if (clean.endsWith('/')) urlMap.set(clean.slice(0, -1), e.id);
    else urlMap.set(clean + '/', e.id);
  });

  const urlBatches = [];
  const urlItems = toEnrich.map(e => ({ id: e.id, cleanUrl: cleanBookingUrl(e.bookingUrl) }));
  for (let i = 0; i < urlItems.length; i += BATCH_SIZE) {
    urlBatches.push(urlItems.slice(i, i + BATCH_SIZE));
  }

  console.log(`\nScraping in ${urlBatches.length} batches of ~${BATCH_SIZE}...`);

  let matched = 0;
  let unmatched = 0;

  for (let i = 0; i < urlBatches.length; i++) {
    try {
      const results = await runBatch(urlBatches[i], i + 1, urlBatches.length);

      for (const result of results) {
        // Match by URL
        const resultUrl = cleanBookingUrl(result.url || '');
        let entryId = urlMap.get(resultUrl);

        // Try matching by name if URL doesn't match
        if (!entryId) {
          const byName = toEnrich.find(e =>
            e.name.toLowerCase() === (result.name || '').toLowerCase()
          );
          if (byName) entryId = byName.id;
        }

        if (!entryId || !raw[entryId]) {
          unmatched++;
          continue;
        }

        // Update the entry with Booking.com data
        const entry = raw[entryId];
        if (result.rating != null) {
          entry._bookingRating = result.rating;
        }
        if (result.reviews != null) {
          entry._bookingReviewCount = result.reviews;
        }
        if (result.ratingLabel) {
          entry._bookingRatingLabel = result.ratingLabel;
        }
        if (result.location?.lat && result.location?.lng) {
          entry._lat = parseFloat(result.location.lat);
          entry._lng = parseFloat(result.location.lng);
        }
        if (result.type) {
          entry._bookingType = result.type;
        }
        if (result.stars != null) {
          entry._bookingStars = result.stars;
        }
        entry.updatedAt = new Date().toISOString();
        matched++;
      }
    } catch (err) {
      console.log(`    ERROR in batch ${i + 1}: ${err.message}`);
    }

    // Brief pause between batches to avoid rate limits
    if (i < urlBatches.length - 1) {
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  console.log(`\nResults: ${matched} matched, ${unmatched} unmatched`);

  // Write back
  console.log('Writing updated data...');
  fs.writeFileSync(DATA_FILE, JSON.stringify(raw, null, 2), 'utf-8');
  console.log('Done!');

  // Summary
  const updated = Object.values(raw);
  const withBooking = updated.filter(e => e._bookingRating);
  const withGoogle = updated.filter(e => e._googleRating);
  const withAny = updated.filter(e => e._bookingRating || e._googleRating);
  console.log(`\nRating coverage:`);
  console.log(`  Booking.com: ${withBooking.length}/${updated.length}`);
  console.log(`  Google:      ${withGoogle.length}/${updated.length}`);
  console.log(`  Any rating:  ${withAny.length}/${updated.length}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
