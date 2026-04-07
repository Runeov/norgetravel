#!/usr/bin/env node
/**
 * Collect results from previously started Apify runs that were still queued.
 * Merges Booking.com ratings into accommodation data.
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'src', 'data', 'travel-accommodation.json');
const APIFY_TOKEN = process.env.APIFY_TOKEN;
if (!APIFY_TOKEN) {
  console.error('ERROR: Set APIFY_TOKEN env var');
  process.exit(1);
}

// Run IDs from the previous batch that had status=READY
const PENDING_RUNS = [
  'E1hyGZccUmMTXYKC8',  // batch 1
  'WWCDxddNjLUPyx8st',  // batch 2
  'pmDq9Y38654esM0Un',  // batch 4
  'bXsflXtZxlGcEcjd9',  // batch 5
  'eXIkluKEqr1OToTkz',  // batch 6
  'SQqTJ0jAhx5k4DNaY',  // batch 7
  'Vxvbt6Yc1dfIpmwJW',  // batch 9
  'o7Y2Pf3HqeLJu3Mwn',  // batch 10
  'hccU2wXK1tbG8LlZR',  // batch 11
];

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

  // Build URL-to-ID map for matching
  const urlMap = new Map();
  const nameMap = new Map();
  entries.forEach(e => {
    if (e.bookingUrl) {
      const clean = cleanBookingUrl(e.bookingUrl);
      urlMap.set(clean, e.id);
      if (clean.endsWith('/')) urlMap.set(clean.slice(0, -1), e.id);
      else urlMap.set(clean + '/', e.id);
    }
    nameMap.set(e.name.toLowerCase(), e.id);
  });

  let totalMatched = 0;

  for (const runId of PENDING_RUNS) {
    try {
      // Check run status
      const statusRes = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}?token=${APIFY_TOKEN}`
      );
      const statusData = await statusRes.json();
      const status = statusData.data?.status;

      if (status !== 'SUCCEEDED') {
        console.log(`  Run ${runId}: ${status} - skipping`);
        continue;
      }

      // Fetch results
      const itemsRes = await fetch(
        `https://api.apify.com/v2/actor-runs/${runId}/dataset/items?token=${APIFY_TOKEN}`
      );
      const items = await itemsRes.json();
      console.log(`  Run ${runId}: ${items.length} results`);

      let matched = 0;
      for (const result of items) {
        const resultUrl = cleanBookingUrl(result.url || '');
        let entryId = urlMap.get(resultUrl);
        if (!entryId) {
          entryId = nameMap.get((result.name || '').toLowerCase());
        }
        if (!entryId || !raw[entryId]) continue;

        const entry = raw[entryId];
        if (result.rating != null) entry._bookingRating = result.rating;
        if (result.reviews != null) entry._bookingReviewCount = result.reviews;
        if (result.ratingLabel) entry._bookingRatingLabel = result.ratingLabel;
        if (result.location?.lat && result.location?.lng) {
          entry._lat = parseFloat(result.location.lat);
          entry._lng = parseFloat(result.location.lng);
        }
        if (result.type) entry._bookingType = result.type;
        if (result.stars != null) entry._bookingStars = result.stars;
        entry.updatedAt = new Date().toISOString();
        matched++;
      }
      console.log(`    Matched: ${matched}`);
      totalMatched += matched;
    } catch (err) {
      console.log(`  Run ${runId}: ERROR - ${err.message}`);
    }
  }

  console.log(`\nTotal newly matched: ${totalMatched}`);

  // Write back
  fs.writeFileSync(DATA_FILE, JSON.stringify(raw, null, 2), 'utf-8');

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
