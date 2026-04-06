/**
 * NorgeTravel Accommodation Processor
 * =====================================
 * Bulk-processes draft accommodation entries:
 *  - Generates NorgeTravel-voice descriptions
 *  - Publishes entries that have a booking link (bookingUrl or website)
 *  - Normalises location fields
 *
 * Run: node scripts/process_accommodation.js
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/travel-accommodation.json');

// ── City metadata ────────────────────────────────────────────────────────────
const CITY_META = {
  oslo:          { name: 'Oslo',         region: 'eastern Norway' },
  bergen:        { name: 'Bergen',       region: 'western Norway' },
  trondheim:     { name: 'Trondheim',    region: 'central Norway' },
  stavanger:     { name: 'Stavanger',    region: 'southwestern Norway' },
  tromso:        { name: 'Tromsø',       region: 'northern Norway' },
  tromso_:       { name: 'Tromsø',       region: 'northern Norway' },  // handles accent variations
  bodo:          { name: 'Bodø',         region: 'northern Norway' },
  narvik:        { name: 'Narvik',       region: 'northern Norway' },
  alta:          { name: 'Alta',         region: 'Finnmark' },
  hammerfest:    { name: 'Hammerfest',   region: 'Finnmark' },
  honningsvag:   { name: 'Honningsvåg', region: 'Nordkapp' },
  kirkenes:      { name: 'Kirkenes',     region: 'Finnmark' },
  senja:         { name: 'Senja',        region: 'Troms' },
  lyngen:        { name: 'Lyngen',       region: 'Troms' },
  svolver:       { name: 'Svolvær',      region: 'Lofoten' },
  leknes:        { name: 'Leknes',       region: 'Lofoten' },
  reine:         { name: 'Reine',        region: 'Lofoten' },
  henningsvær:   { name: 'Henningsvær', region: 'Lofoten' },
  stamsund:      { name: 'Stamsund',     region: 'Lofoten' },
  longyearbyen:  { name: 'Longyearbyen', region: 'Svalbard' },
};

// ── Description templates per accommodation type ─────────────────────────────
const TEMPLATES = {
  hotel: (name, city, region, priceRange) => {
    const tier = priceRange === 'luxury'
      ? 'full-service hotel'
      : priceRange === 'budget'
        ? 'budget hotel'
        : 'mid-range hotel';
    return `${name} is a ${tier} in ${city}, ${region}. Central location with direct access to ${city}'s main sights. Rates and availability via Booking.com.`;
  },
  hostel: (name, city, region) =>
    `${name} is a hostel in ${city}, ${region}. Shared facilities, social common areas, and a practical base for budget travellers. Book via Booking.com.`,
  cabin: (name, city, region) =>
    `${name} is a self-catering cabin near ${city}, ${region}. Kitchen facilities and independent access make it a practical choice for multi-night stays. Check availability on Booking.com.`,
  rorbu: (name, city, region) =>
    `${name} is a traditional fisherman's cabin (rorbu) in ${city}, ${region}. Originally built on stilts over the water for the cod fishing season — now available as coastal accommodation. Reserve via Booking.com.`,
  camping: (name, city, region) =>
    `${name} is a campsite near ${city}, ${region}. Pitches for tents and caravans, with basic sanitary facilities. A practical base for travellers arriving by car or campervan.`,
  apartment: (name, city, region) =>
    `${name} is a self-catering apartment in ${city}, ${region}. Full kitchen and independent access — suited for stays of three nights or more. Search availability on Booking.com.`,
  glamping: (name, city, region) =>
    `${name} offers glamping accommodation near ${city}, ${region}. Sheltered sleeping with outdoor living — a comfortable entry point for nature-based travel. Book via Booking.com.`,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function normaliseLocation(location, nearestTown) {
  if (!location) return nearestTown ? `${nearestTown}, Norway` : 'Norway';
  // If location looks like a street address, simplify to city, Norway
  if (/^\d/.test(location) || location.includes(',')) {
    // Extract last meaningful part or use nearestTown
    const parts = location.split(',').map(p => p.trim());
    const city = parts.find(p => p.length > 2 && !/^\d/.test(p)) || nearestTown;
    return city ? `${city}, Norway` : location;
  }
  return location;
}

function getCityInfo(nearestTown, location) {
  const raw = (nearestTown || location || '').toLowerCase()
    .replace(/ø/g, 'o').replace(/å/g, 'a').replace(/æ/g, 'ae')
    .replace(/[^a-z]/g, '');
  // Try direct match
  for (const [key, meta] of Object.entries(CITY_META)) {
    const normKey = key.replace(/[^a-z]/g, '');
    if (raw.includes(normKey) || normKey.includes(raw.substring(0, 5))) {
      return meta;
    }
  }
  // Fallback: use nearestTown as-is
  if (nearestTown) return { name: nearestTown, region: 'Norway' };
  return { name: 'Norway', region: '' };
}

function generateDescription(entry) {
  const { name, accommodationType, priceRange, nearestTown, location } = entry;
  const city = getCityInfo(nearestTown, location);
  const cityName = city.name;
  const region = city.region;
  const type = accommodationType || 'hotel';
  const fn = TEMPLATES[type] || TEMPLATES.hotel;
  return fn(name, cityName, region, priceRange || 'mid-range');
}

function hasBookingLink(entry) {
  return !!(entry.bookingUrl || entry.website);
}

// ── Main ──────────────────────────────────────────────────────────────────────
let data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

// Normalise to dict if it's still a list
if (Array.isArray(data)) {
  const dict = {};
  for (const item of data) {
    if (item.id) dict[item.id] = item;
  }
  data = dict;
}

const now = new Date().toISOString();
let published = 0;
let skipped = 0;
let described = 0;

for (const [id, entry] of Object.entries(data)) {
  // Normalise location
  const normLoc = normaliseLocation(entry.location, entry.nearestTown);
  if (normLoc !== entry.location) {
    entry.location = normLoc;
  }

  // Generate description if missing or is placeholder
  const needsDesc = !entry.description
    || entry.description.includes('pending editorial review')
    || /^[^.]+is a [a-z]+ located in/.test(entry.description);

  if (needsDesc) {
    entry.description = generateDescription(entry);
    described++;
  }

  // Publish if has booking link
  if (entry.status === 'draft' && hasBookingLink(entry)) {
    entry.status = 'published';
    entry.updatedAt = now;
    published++;
  } else if (entry.status === 'draft') {
    skipped++;
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

const total = Object.keys(data).length;
console.log(`Processed ${total} accommodation entries`);
console.log(`  Published: ${published}`);
console.log(`  Descriptions updated: ${described}`);
console.log(`  Stayed draft (no booking link): ${skipped}`);
