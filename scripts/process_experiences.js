/**
 * NorgeTravel Experience Processor
 * ==================================
 * Cleans up the experiences data from fetch_experiences.py:
 *  1. Extracts clean city name from street-address locations
 *  2. Fixes obviously wrong experience types (glacier-hike in Oslo, etc.)
 *  3. Generates NorgeTravel-voice descriptions for stub entries (pending editorial review)
 *  4. Publishes entries that meet quality threshold
 *
 * Usage:
 *   node scripts/process_experiences.js [--dry-run] [--city oslo] [--min-reviews 30]
 *
 * Flags:
 *   --dry-run       Print stats without writing
 *   --city <slug>   Process only one city prefix
 *   --min-reviews N Minimum Google review count to generate a description (default: 30)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ARGS = process.argv.slice(2);
const DRY_RUN = ARGS.includes('--dry-run');
const CITY_FILTER = (() => { const i = ARGS.indexOf('--city'); return i >= 0 ? ARGS[i + 1] : null; })();
const MIN_REVIEWS = (() => { const i = ARGS.indexOf('--min-reviews'); return i >= 0 ? parseInt(ARGS[i + 1], 10) : 30; })();

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'travel-experiences.json');

// ─── City metadata ────────────────────────────────────────────────────────────

const CITY_META = {
  svalbard:    { name: 'Svalbard',     destination: 'svalbard',        region: 'high-arctic' },
  tromso:      { name: 'Tromsø',       destination: 'northern-norway', region: 'north' },
  troms:       { name: 'Tromsø',       destination: 'northern-norway', region: 'north' },
  alta:        { name: 'Alta',         destination: 'northern-norway', region: 'north' },
  bodo:        { name: 'Bodø',         destination: 'northern-norway', region: 'north' },
  bod:         { name: 'Bodø',         destination: 'northern-norway', region: 'north' },
  hammerfest:  { name: 'Hammerfest',   destination: 'northern-norway', region: 'north' },
  narvik:      { name: 'Narvik',       destination: 'northern-norway', region: 'north' },
  senja:       { name: 'Senja',        destination: 'northern-norway', region: 'north' },
  nordkapp:    { name: 'Nordkapp',     destination: 'northern-norway', region: 'north' },
  lyngen:      { name: 'Lyngen',       destination: 'northern-norway', region: 'north' },
  lofoten:     { name: 'Lofoten',      destination: 'lofoten',         region: 'coast' },
  bergen:      { name: 'Bergen',       destination: 'fjords',          region: 'fjords' },
  stavanger:   { name: 'Stavanger',    destination: 'fjords',          region: 'fjords' },
  oslo:        { name: 'Oslo',         destination: 'all',             region: 'city' },
  trondheim:   { name: 'Trondheim',    destination: 'all',             region: 'city' },
};

// ─── Experience types that make geographic sense ──────────────────────────────

// Keys = city region; values = allowed types at that region
const VALID_TYPES_BY_REGION = {
  'high-arctic': ['northern-lights', 'dog-sledding', 'snowmobile', 'glacier-hike', 'kayaking', 'photography-tour', 'cultural-tour', 'whale-watching', 'fjord-cruise'],
  'north':       ['northern-lights', 'dog-sledding', 'snowmobile', 'glacier-hike', 'kayaking', 'photography-tour', 'cultural-tour', 'whale-watching', 'fjord-cruise', 'fishing', 'surfing'],
  'coast':       ['fishing', 'kayaking', 'surfing', 'cultural-tour', 'photography-tour', 'whale-watching', 'fjord-cruise', 'northern-lights'],
  'fjords':      ['fjord-cruise', 'glacier-hike', 'kayaking', 'cultural-tour', 'photography-tour', 'fishing'],
  'city':        ['cultural-tour', 'fjord-cruise', 'kayaking', 'photography-tour', 'fishing'],
};

// Types that should be fixed if applied incorrectly
function fixType(type, region) {
  const valid = VALID_TYPES_BY_REGION[region] || [];
  if (valid.includes(type)) return type;
  // Fallback mapping
  const fallback = {
    'glacier-hike': 'cultural-tour',   // No glaciers in Oslo/Trondheim/Stavanger
    'northern-lights': 'cultural-tour', // Museums aren't northern-lights experiences
    'whale-watching': region === 'fjords' ? 'fjord-cruise' : 'cultural-tour',
    'dog-sledding': 'cultural-tour',
    'snowmobile': 'cultural-tour',
    'surfing': 'cultural-tour',
  };
  return fallback[type] || 'cultural-tour';
}

// ─── Description templates (NorgeTravel voice) ────────────────────────────────

function reviewQuality(reviewCount) {
  if (reviewCount >= 5000) return 'one of the most-reviewed operators in Norway';
  if (reviewCount >= 1000) return `${reviewCount.toLocaleString()} Google reviews`;
  if (reviewCount >= 200)  return `${reviewCount} Google reviews — a well-established operation`;
  if (reviewCount >= 50)   return `${reviewCount} Google reviews`;
  return `${reviewCount} Google reviews`;
}

function ratingLine(entry) {
  const g = entry.ratings?.google;
  const ta = entry.ratings?.tripadvisor;
  const parts = [];
  if (g?.rating && g.rating > 0) parts.push(`${g.rating}/5 on Google`);
  if (ta?.rating && ta.rating > 0) parts.push(`${ta.rating}/5 on TripAdvisor`);
  if (parts.length === 0) return '';
  return parts.join(', ');
}

const TEMPLATES = {
  'northern-lights': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'high-arctic') {
      return `${e.operator} runs aurora expeditions from ${city} into the high-Arctic darkness — some of the clearest skies in the Northern Hemisphere. The operation tracks KP index and cloud cover in real time, routing groups to wherever conditions are strongest. ${qual}.${ratingStr}`;
    }
    return `${e.operator} chases the northern lights from ${city}, tracking cloud cover and KP activity across the region to find clear skies on each outing. Book 2–3 nights to hedge against cloud. ${qual}.${ratingStr}`;
  },

  'whale-watching': (e, city) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    return `${e.operator} runs whale-watching departures from ${city}. Humpback and orca follow the herring schools into the fjords each autumn and winter — sightings are not guaranteed, but with ${qual}, this is one of the more reliable operations in the area.${ratingStr}`;
  },

  'dog-sledding': (e, city) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    return `${e.operator} runs dog-sledding expeditions from ${city}. A team of huskies pulls you across the snowscape — conditions depend on reliable snow cover, typically January through March. ${qual}.${ratingStr}`;
  },

  'snowmobile': (e, city) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    return `${e.operator} offers snowmobile safaris out of ${city} into the surrounding Arctic terrain. Routes run from January to April, when snow cover is reliable and temperatures are manageable. ${qual}.${ratingStr}`;
  },

  'glacier-hike': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'fjords') {
      return `${e.operator} guides glacier hikes on the ice fields above the western fjords. Glacier terrain near ${city} requires crampons, a helmet, and a certified guide — ${e.operator} provides the equipment. ${qual}.${ratingStr}`;
    }
    return `${e.operator} leads glacier and mountain hikes from ${city}. Route difficulty and conditions vary by season — check directly for current availability and what's included. ${qual}.${ratingStr}`;
  },

  'fjord-cruise': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'fjords') {
      return `${e.operator} departs from ${city} harbour for fjord cruise routes into the Sognefjord, Hardangerfjord, or Nærøyfjord systems. Boat sizes and routes vary — some run scheduled departures, others offer private charters. ${qual}.${ratingStr}`;
    }
    if (city === 'Oslo') {
      return `${e.operator} runs boat tours on the Oslofjord, departing from the harbour at Aker Brygge. The fjord extends 100 km south of the city — tours range from one-hour harbour circuits to full-day island-hop routes. ${qual}.${ratingStr}`;
    }
    return `${e.operator} offers fjord cruise departures from ${city}. Check their website for current routes, departure times, and group size. ${qual}.${ratingStr}`;
  },

  'kayaking': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'north') {
      return `${e.operator} runs sea kayak expeditions in and around ${city}. Arctic kayaking means cold water, fast-changing weather, and some of the most dramatic coastal scenery in Northern Europe. Guided trips suitable for beginners to experienced paddlers. ${qual}.${ratingStr}`;
    }
    if (region === 'coast') {
      return `${e.operator} offers kayak tours along the Lofoten coastline — through sea caves, past bird colonies, and between islands that rise straight out of the water. ${qual}.${ratingStr}`;
    }
    return `${e.operator} runs kayak tours from ${city}. ${qual}.${ratingStr}`;
  },

  'fishing': (e, city) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    return `${e.operator} runs fishing trips from ${city}. Depending on season, target species include cod, halibut, and pollock. Rods and bait supplied — some trips include processing and freezing your catch for the trip home. ${qual}.${ratingStr}`;
  },

  'surfing': (e, city) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    return `${e.operator} operates surf instruction and guided sessions from ${city}. Arctic surfing is real — the Norwegian coast picks up consistent North Atlantic swell. Wetsuits are 6mm minimum, year-round. ${qual}.${ratingStr}`;
  },

  'photography-tour': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'north' || region === 'high-arctic') {
      return `${e.operator} leads photography workshops and guided shoots in ${city} — covering aurora, polar landscapes, and Arctic wildlife. Both beginner and advanced sessions available. ${qual}.${ratingStr}`;
    }
    return `${e.operator} runs photography tours and workshops from ${city}, covering landscapes, coastal light, and local cultural subjects. ${qual}.${ratingStr}`;
  },

  'cultural-tour': (e, city, region) => {
    const qual = reviewQuality(e.ratings?.google?.reviewCount || 0);
    const rating = ratingLine(e);
    const ratingStr = rating ? ` Rated ${rating}.` : '';
    if (region === 'city' && city === 'Oslo') {
      return `${e.operator} runs guided tours and activities in Oslo. The city's best tours go beyond the main boulevards into the neighbourhood markets, waterfront, and cultural institutions. ${qual}.${ratingStr}`;
    }
    if (region === 'city' && city === 'Trondheim') {
      return `${e.operator} offers guided experiences in Trondheim — including the Nidaros Cathedral, Bakklandet riverside district, and NTNU campus culture. ${qual}.${ratingStr}`;
    }
    if (region === 'fjords' && city === 'Bergen') {
      return `${e.operator} runs guided tours in Bergen, covering the Bryggen wharf, Fløyen mountain, and the fish market at Torget. Bergen has 260 days of rain per year — tour operators here know how to work around the weather. ${qual}.${ratingStr}`;
    }
    if (region === 'fjords' && city === 'Stavanger') {
      return `${e.operator} offers tours and cultural experiences in Stavanger — including the old town of Gamle Stavanger, the Nuart street art district, and day trips toward Preikestolen. ${qual}.${ratingStr}`;
    }
    if (region === 'north') {
      return `${e.operator} offers guided tours and cultural experiences in ${city}. In the Norwegian Arctic, local knowledge is the difference between a good trip and a wasted one — this operator covers the local terrain. ${qual}.${ratingStr}`;
    }
    if (region === 'coast') {
      return `${e.operator} runs tours and cultural experiences across the Lofoten archipelago. The working fishing culture here stretches back 1,000 years — a good guide explains what you're looking at. ${qual}.${ratingStr}`;
    }
    return `${e.operator} runs guided tours and cultural experiences in ${city}. ${qual}.${ratingStr}`;
  },
};

function generateDescription(entry, city, region) {
  const tpl = TEMPLATES[entry.experienceType] || TEMPLATES['cultural-tour'];
  return tpl(entry, city, region);
}

// ─── Location cleaner ─────────────────────────────────────────────────────────

function cleanLocation(loc, cityName) {
  if (!loc) return `${cityName}, Norway`;
  // Already clean (city, Country format)
  if (/^[A-ZÆØÅ][a-zæøå]+,\s*(Norway|Svalbard)$/.test(loc)) return loc;
  // Extract city from "Street, City, Norway" patterns
  const match = loc.match(/,\s*([A-ZÆØÅ][a-zæøå]+(?:\s+[A-ZÆØÅ][a-zæøå]+)?),\s*Norway/);
  if (match) return `${match[1]}, Norway`;
  // Plus codes or road numbers — use city fallback
  if (/^[A-Z0-9]{4,}\+[A-Z0-9]{2}/.test(loc) || /^[A-Za-z][0-9]+/.test(loc)) return `${cityName}, Norway`;
  // If it already starts with the city name
  if (loc.startsWith(cityName)) return `${cityName}, Norway`;
  // Otherwise just use city fallback
  return `${cityName}, Norway`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const raw = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  const entries = Object.entries(raw);

  const stats = {
    total: entries.length,
    descriptionsGenerated: 0,
    typesFixed: 0,
    locationsFixed: 0,
    published: 0,
    skipped: 0,
    alreadyPublished: 0,
  };

  const updated = {};

  for (const [id, entry] of entries) {
    // Determine city prefix
    const prefix = id.split('-')[0];
    const meta = CITY_META[prefix];

    // Filter by city if requested
    if (CITY_FILTER && prefix !== CITY_FILTER) {
      updated[id] = entry;
      continue;
    }

    if (!meta) {
      console.warn(`[SKIP] Unknown prefix "${prefix}" for id "${id}"`);
      updated[id] = entry;
      stats.skipped++;
      continue;
    }

    const { name: cityName, destination, region } = meta;
    let e = { ...entry };

    // 1. Fix destination
    if (e.destination !== destination) {
      e.destination = destination;
    }

    // 2. Clean location
    const cleanedLoc = cleanLocation(e.location, cityName);
    if (cleanedLoc !== e.location) {
      stats.locationsFixed++;
      e.location = cleanedLoc;
    }

    // 3. Fix type
    const correctedType = fixType(e.experienceType, region);
    if (correctedType !== e.experienceType) {
      stats.typesFixed++;
      e.experienceType = correctedType;
    }

    // 4. Generate description if pending
    const isPending = !e.description || e.description.includes('pending editorial review') || e.description.includes('Description pending');
    const reviewCount = e.ratings?.google?.reviewCount || 0;

    if (isPending) {
      if (reviewCount >= MIN_REVIEWS) {
        e.description = generateDescription(e, cityName, region);
        stats.descriptionsGenerated++;
      } else {
        // Too few reviews — leave as draft, no description
        updated[id] = e;
        stats.skipped++;
        continue;
      }
    }

    // 5. Publish if quality threshold met
    if (e.status !== 'published') {
      const hasRealDesc = !isPending || reviewCount >= MIN_REVIEWS;
      if (hasRealDesc && e.diceScore) {
        e.status = 'published';
        stats.published++;
      }
    } else {
      stats.alreadyPublished++;
    }

    // Update timestamp
    e.updatedAt = new Date().toISOString();

    updated[id] = e;
  }

  // ── Print report
  console.log('\n═══════════════════════════════════════');
  console.log('  NorgeTravel Experience Processor');
  console.log('═══════════════════════════════════════');
  console.log(`  Total entries:          ${stats.total}`);
  console.log(`  Descriptions generated: ${stats.descriptionsGenerated}`);
  console.log(`  Types fixed:            ${stats.typesFixed}`);
  console.log(`  Locations cleaned:      ${stats.locationsFixed}`);
  console.log(`  Newly published:        ${stats.published}`);
  console.log(`  Already published:      ${stats.alreadyPublished}`);
  console.log(`  Skipped (low quality):  ${stats.skipped}`);
  console.log('───────────────────────────────────────');

  // Post-stats: count by destination
  const postCounts = {};
  const pubCounts = {};
  for (const e of Object.values(updated)) {
    postCounts[e.destination] = (postCounts[e.destination] || 0) + 1;
    if (e.status === 'published') pubCounts[e.destination] = (pubCounts[e.destination] || 0) + 1;
  }
  console.log('\n  Published by destination:');
  for (const [dest, count] of Object.entries(pubCounts).sort()) {
    console.log(`    ${dest.padEnd(20)} ${count} / ${postCounts[dest]}`);
  }
  console.log('');

  if (DRY_RUN) {
    console.log('  DRY RUN — no changes written.\n');
    return;
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(updated, null, 2), 'utf8');
  console.log(`  Written to ${path.relative(process.cwd(), OUTPUT_FILE)}\n`);
}

main();
