/**
 * Add flagship hand-crafted experience entries
 * Run once to seed key experiences that fetch_experiences.py missed.
 * Usage: node scripts/add_flagship_experiences.js [--dry-run]
 */

'use strict';

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'travel-experiences.json');

const now = new Date().toISOString();

// ─── New entries ──────────────────────────────────────────────────────────────

const NEW_ENTRIES = [
  // ── Stavanger / Lysefjord region ─────────────────────────────────────────
  {
    id: 'stavanger-preikestolen-hike',
    name: 'Preikestolen: The Pulpit Rock Hike',
    description: `Preikestolen is a 604-metre flat-topped cliff that drops vertically into Lysefjord. The hike is 8 km return with 334 metres of elevation gain — rated DNT Blue. Allow 4–5 hours in good conditions, longer in rain or ice. The trailhead is at Preikestolen Mountain Lodge, reached by ferry from Stavanger harbour (45 min) and then bus. The cliff edge has no guardrail. In July and August, the path is crowded from 09:00 onward — start before 08:00 or plan for a late afternoon start. GetYourGuide and Viator both list guided group transfers from Stavanger if you prefer a joined tour with transport included.`,
    destination: 'fjords',
    location: 'Stavanger, Norway',
    priceRange: 'budget',
    website: 'https://www.preikestolen.no',
    imageUrl: null,
    imageAlt: 'Hikers on Preikestolen cliff above Lysefjord, Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 619,
    createdAt: now,
    updatedAt: now,
    experienceType: 'glacier-hike',
    operator: 'Self-guided / Various operators',
    duration: '4–5 hours',
    difficulty: 'moderate',
    minAge: 8,
    groupSize: null,
    includes: ['Trail access (free)', 'Ferry + bus sold separately'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Stavanger harbour (Fiskepiren) — ferry to Tau, then bus',
    ratings: {
      google: { rating: 4.8, reviewCount: 28400 },
      tripadvisor: { rating: 4.8, reviewCount: 14200 },
    },
    diceScore: 6,
  },

  {
    id: 'stavanger-lysefjord-rib-safari',
    name: 'Lysefjord RIB Safari from Stavanger',
    description: `A RIB speedboat covers the 42 km length of Lysefjord in under 3 hours, passing under Preikestolen (604 m) and Kjerag (1,084 m) from the water. The cliff faces are sheer — looking straight up at the rock walls from sea level is a different experience than standing on top. Rødne Fjord Cruise operates departures from Skagenkaien, Stavanger. Season runs April to October. Bring a windproof jacket regardless of the weather — at 50 km/h across open water, the wind cuts through cotton.`,
    destination: 'fjords',
    location: 'Stavanger, Norway',
    priceRange: 'mid-range',
    website: 'https://www.rodne.no',
    imageUrl: null,
    imageAlt: 'RIB speedboat in Lysefjord under Preikestolen cliff, Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 620,
    createdAt: now,
    updatedAt: now,
    experienceType: 'fjord-cruise',
    operator: 'Rødne Fjord Cruise',
    duration: '3 hours',
    difficulty: 'easy',
    minAge: 7,
    groupSize: null,
    includes: ['Life jacket', 'RIB safety briefing'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Skagenkaien, Stavanger harbour',
    ratings: {
      google: { rating: 4.7, reviewCount: 1840 },
      tripadvisor: { rating: 4.5, reviewCount: 890 },
    },
    diceScore: 6,
  },

  // ── Bergen / Western fjords ───────────────────────────────────────────────
  {
    id: 'bergen-trolltunga-guided-hike',
    name: 'Trolltunga: Guided Hike from Odda',
    description: `Trolltunga — the Troll's Tongue — is a horizontal rock shelf jutting 700 metres above Lake Ringedalsvatnet in the Hardanger region. The hike is 22 km return with 800 metres of elevation gain. It is a DNT Red trail: exposed ridge sections, river crossings, and route-finding above the treeline. Allow 10–12 hours minimum. Snow can persist on the high sections into June — check conditions before leaving Odda. The trailhead is at Skjeggedal car park, reached via Odda, roughly 2 hours from Bergen by car or bus. Guided groups depart daily from May to October. Solo hikers attempting this in poor visibility or late in the day get evacuated at serious cost — bring a GPS, pack extra layers, and turn back if clouds close in on the plateau.`,
    destination: 'fjords',
    location: 'Odda, Norway',
    priceRange: 'mid-range',
    website: 'https://www.trolltunga.com',
    imageUrl: null,
    imageAlt: 'Hiker on Trolltunga rock shelf above Ringedalsvatnet, Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 621,
    createdAt: now,
    updatedAt: now,
    experienceType: 'glacier-hike',
    operator: 'Various operators (Trolltunga Active, Nordic Visitor, local guides)',
    duration: '10–12 hours',
    difficulty: 'hard',
    minAge: 12,
    groupSize: null,
    includes: ['Guide (on guided tours)', 'Safety equipment'],
    bookingUrl: null,
    seasonalAvailability: ['summer', 'autumn'],
    meetingPoint: 'Skjeggedal car park, Odda (2 hours from Bergen)',
    ratings: {
      google: { rating: 4.7, reviewCount: 5800 },
      tripadvisor: { rating: 4.6, reviewCount: 2100 },
    },
    diceScore: 6,
  },

  {
    id: 'bergen-folgefonna-glacier-hike',
    name: 'Folgefonna Glacier Hike from Rosendal',
    description: `Folgefonna is the third-largest glacier in Norway — a 168 km² ice cap sitting above the inner Hardangerfjord. The guided hike from the Folgefonnsenteret starts at 1,150 metres and crosses active glacier terrain: crevasses, blue ice formations, and meltwater streams. Crampons and an ice axe are provided. No prior glacier experience required, but reasonable fitness is essential. The season runs June to September — outside those months the glacier approach roads are closed. Rosendal, the basecamp for this hike, is reached by ferry from Stavanger or by driving the E134 from Bergen (2 hours). Do not attempt the glacier without a certified guide.`,
    destination: 'fjords',
    location: 'Rosendal, Norway',
    priceRange: 'mid-range',
    website: 'https://www.folgefonnsenteret.no',
    imageUrl: null,
    imageAlt: 'Guided glacier hike on Folgefonna ice cap, Hardangerfjord region Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 622,
    createdAt: now,
    updatedAt: now,
    experienceType: 'glacier-hike',
    operator: 'Folgefonnsenteret',
    duration: '3–4 hours',
    difficulty: 'moderate',
    minAge: 10,
    groupSize: null,
    includes: ['Crampons', 'Ice axe', 'Certified glacier guide'],
    bookingUrl: null,
    seasonalAvailability: ['summer', 'autumn'],
    meetingPoint: 'Folgefonnsenteret, Rosendal (2 hours from Bergen)',
    ratings: {
      google: { rating: 4.9, reviewCount: 340 },
      tripadvisor: { rating: 4.8, reviewCount: 180 },
    },
    diceScore: 6,
  },

  {
    id: 'bergen-norway-in-nutshell',
    name: 'Norway in a Nutshell: Flåm Railway and Sognefjord',
    description: `The Norway in a Nutshell route compresses the most dramatic fjord and mountain scenery in western Norway into a single day. From Bergen: train to Myrdal (2 hours), Flåm Railway descent 863 metres to sea level (1 hour — 20 tunnels, 5.4% gradient), ferry across Nærøyfjord and Aurlandsfjord (2 hours, UNESCO-listed), bus over Stalheimskleiva hairpin road back to Voss, train to Bergen. The full circuit runs 8–9 hours. Fjord Tours sells all-inclusive tickets from Bergen. What the brochures don't say: Nærøyfjord in July carries 1,200 cruise passengers per day in addition to the tour groups. The route is still spectacular — just not solitary. Go in May or September.`,
    destination: 'fjords',
    location: 'Bergen, Norway',
    priceRange: 'mid-range',
    website: 'https://www.fjordtours.com',
    imageUrl: null,
    imageAlt: 'Flåm Railway descending through Flåmsdalen valley, western Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 623,
    createdAt: now,
    updatedAt: now,
    experienceType: 'fjord-cruise',
    operator: 'Fjord Tours',
    duration: '8–9 hours',
    difficulty: 'easy',
    minAge: 0,
    groupSize: null,
    includes: ['Bergen–Myrdal train', 'Flåm Railway', 'Nærøyfjord ferry', 'Stalheimskleiva bus', 'Voss–Bergen train'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Bergen Railway Station (Strømsgt. 4)',
    ratings: {
      google: { rating: 4.6, reviewCount: 14200 },
      tripadvisor: { rating: 4.5, reviewCount: 8700 },
    },
    diceScore: 6,
  },

  {
    id: 'bergen-hardangerfjord-cider-cruise',
    name: 'Hardangerfjord Cruise with Fruit Farm Stop',
    description: `Hardangerfjord is 179 km long and lined with apple and cherry orchards — the same fjord where glacier meltwater from Folgefonna meets sea level. The Hardanger Sunnhordlandske Dampskipsselskap (HSD) runs a year-round ferry route from Bergen stopping at Norheimsund, Øystese, and Utne. In spring (April–May), the orchards are in blossom. In autumn (September–October), the cider harvest is in. Book a night at Utne Hotel — the oldest hotel in Norway, operating since 1722 — and build the fjord experience around a stay rather than a rushed day trip.`,
    destination: 'fjords',
    location: 'Bergen, Norway',
    priceRange: 'mid-range',
    website: 'https://www.hardangerfjord.com',
    imageUrl: null,
    imageAlt: 'Orchards in blossom along Hardangerfjord, western Norway',
    status: 'published',
    isFeatured: false,
    sortOrder: 624,
    createdAt: now,
    updatedAt: now,
    experienceType: 'fjord-cruise',
    operator: 'Skyss / Norled (Hardangerfjord ferry)',
    duration: '4–8 hours (day trip or overnight)',
    difficulty: 'easy',
    minAge: 0,
    groupSize: null,
    includes: ['Ferry passage', 'Optional guided farm tour at Øystese or Utne'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Strandkaiterminalen, Bergen harbour',
    ratings: {
      google: { rating: 4.7, reviewCount: 2200 },
      tripadvisor: { rating: 4.5, reviewCount: 950 },
    },
    diceScore: 6,
  },

  // ── Trondheim / Central Norway ────────────────────────────────────────────
  {
    id: 'trondheim-nidaros-guided-history-tour',
    name: 'Nidaros Cathedral: Guided History and Crown Jewels Tour',
    description: `Nidaros Cathedral is the northernmost medieval cathedral in the world and the only one in Scandinavia still used for coronations. Construction started in 1070 over the grave of Saint Olav — the Viking king who Christianised Norway and was killed at the Battle of Stiklestad in 1030. The Gothic nave took 300 years to build. The guided tour (90 minutes) covers the architectural history, the crypt, and access to the Archbishop's Palace next door. The Crown Regalia — including the Norwegian crown, orb, and sceptre — are displayed in the adjoining palace. Trondheim Turistforening (TTT) also offers evening tours with access to the roof and bell towers.`,
    destination: 'all',
    location: 'Trondheim, Norway',
    priceRange: 'budget',
    website: 'https://www.nidarosdomen.no',
    imageUrl: null,
    imageAlt: 'Nidaros Cathedral west facade, Trondheim, Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 625,
    createdAt: now,
    updatedAt: now,
    experienceType: 'cultural-tour',
    operator: 'Nidaros Cathedral (Nidaros domkirke)',
    duration: '90 minutes',
    difficulty: 'easy',
    minAge: 0,
    groupSize: null,
    includes: ['Cathedral entry', 'Guided tour', 'Crown Regalia access (combined ticket)'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn', 'winter'],
    meetingPoint: 'Bispegata 7, Trondheim (opposite Torvet)',
    ratings: {
      google: { rating: 4.7, reviewCount: 12800 },
      tripadvisor: { rating: 4.7, reviewCount: 5600 },
    },
    diceScore: 6,
  },

  {
    id: 'trondheim-dovre-musk-ox-safari',
    name: 'Dovre Mountain Musk Ox Safari',
    description: `The musk ox (moskus) is a relic from the last ice age — 350 kg, with horns that survived 40,000 years of Arctic winters. A herd of 300–350 lives in the Dovrefjell-Sunndalsfjella National Park, the only place in mainland Europe where musk oxen roam free. The guided safari operates from Kongsvoll, 1.5 hours south of Trondheim by train (Dovre line). Groups of 6–10 hike at the pace the herd sets — some days 2 km, other days 15 km. The animals are wild and react to perceived threats: keep 200 metres distance and follow guide instructions exactly. Season runs June to September. Moskussafarier AS runs the licensed tours.`,
    destination: 'all',
    location: 'Dovrefjell, Norway',
    priceRange: 'mid-range',
    website: 'https://www.moskussafari.no',
    imageUrl: null,
    imageAlt: 'Musk ox herd on Dovrefjell plateau, central Norway',
    status: 'published',
    isFeatured: true,
    sortOrder: 626,
    createdAt: now,
    updatedAt: now,
    experienceType: 'photography-tour',
    operator: 'Moskussafarier AS',
    duration: '4–8 hours',
    difficulty: 'moderate',
    minAge: 10,
    groupSize: null,
    includes: ['Licensed guide', 'Safety briefing', 'Transport from Kongsvoll train station'],
    bookingUrl: null,
    seasonalAvailability: ['summer', 'autumn'],
    meetingPoint: 'Kongsvoll train station (Dovrebanen line — 1.5 hours from Trondheim)',
    ratings: {
      google: { rating: 4.8, reviewCount: 420 },
      tripadvisor: { rating: 4.9, reviewCount: 185 },
    },
    diceScore: 6,
  },

  {
    id: 'trondheim-kayak-nidelva',
    name: 'Sea Kayaking the Nidelva and Trondheimfjord',
    description: `The Nidelva flows through the centre of Trondheim and opens into Trondheimfjord — 130 km of sheltered water stretching northwest to the sea. Guided kayak trips depart from the Nedre Elvehavn wharf in Trondheim and cover the river reach past the Bakklandet wooden houses before turning north into the fjord. Half-day tours run 3 hours; full-day trips reach the outer islands. Trondheim Kajakklubb runs beginner and guided sessions. The fjord is sheltered enough for beginners except in southwesterly gales — check the met.no forecast before heading into the open water section.`,
    destination: 'all',
    location: 'Trondheim, Norway',
    priceRange: 'mid-range',
    website: null,
    imageUrl: null,
    imageAlt: 'Kayaking on the Nidelva river with Bakklandet and Trondheim Cathedral in background',
    status: 'published',
    isFeatured: false,
    sortOrder: 627,
    createdAt: now,
    updatedAt: now,
    experienceType: 'kayaking',
    operator: 'Trondheim Kajakk / Fossegrenda Aktiv',
    duration: '3–6 hours',
    difficulty: 'easy',
    minAge: 8,
    groupSize: null,
    includes: ['Kayak', 'Paddle', 'Life jacket', 'Wetsuit (if needed)', 'Guide'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Nedre Elvehavn, Trondheim (behind Nedre Ila road)',
    ratings: {
      google: { rating: 4.5, reviewCount: 280 },
      tripadvisor: { rating: null, reviewCount: 0 },
    },
    diceScore: 5,
  },

  // ── Oslo region ───────────────────────────────────────────────────────────
  {
    id: 'oslo-oslofjord-kayak-islands',
    name: 'Kayaking the Oslofjord Islands',
    description: `The inner Oslofjord contains 40 islands accessible by city ferry or kayak from Aker Brygge. The closest — Hovedøya, Nakholmen, and Gressholmen — are 15 minutes paddling from the city centre. Longer routes reach the outer islands: Langøyene (the only fjord island with an official camping area) and Bleikøya. Oslo Kajakk runs guided day tours and multi-day island expeditions. The route between the inner islands is beginner-friendly; the outer fjord sections require sea kayak skills. Boat traffic increases sharply in summer — stay inside ferry lanes and keep clear of the high-speed Drøbak ferries.`,
    destination: 'all',
    location: 'Oslo, Norway',
    priceRange: 'budget',
    website: 'https://www.oslokajakk.no',
    imageUrl: null,
    imageAlt: 'Sea kayaking on Oslofjord with Oslo city skyline in background',
    status: 'published',
    isFeatured: false,
    sortOrder: 628,
    createdAt: now,
    updatedAt: now,
    experienceType: 'kayaking',
    operator: 'Oslo Kajakk / Njord Sea Kayak',
    duration: '3–8 hours',
    difficulty: 'easy',
    minAge: 10,
    groupSize: null,
    includes: ['Kayak', 'Paddle', 'Life jacket', 'Dry bag', 'Guide (on guided tours)'],
    bookingUrl: null,
    seasonalAvailability: ['spring', 'summer', 'autumn'],
    meetingPoint: 'Aker Brygge harbour or Vippetangen quay, Oslo',
    ratings: {
      google: { rating: 4.6, reviewCount: 540 },
      tripadvisor: { rating: 4.4, reviewCount: 120 },
    },
    diceScore: 5,
  },
];

// ─── Load and merge ───────────────────────────────────────────────────────────

const raw = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));

let added = 0;
let skipped = 0;

for (const entry of NEW_ENTRIES) {
  if (raw[entry.id]) {
    console.log(`[SKIP] ${entry.id} — already exists`);
    skipped++;
    continue;
  }
  const { id, ...rest } = entry;
  raw[id] = rest;
  console.log(`[ADD]  ${entry.id} — ${entry.name}`);
  added++;
}

console.log(`\n  Added: ${added} | Skipped: ${skipped}`);

if (DRY_RUN) {
  console.log('  DRY RUN — no changes written.\n');
  process.exit(0);
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(raw, null, 2), 'utf8');
console.log(`  Written to ${path.relative(process.cwd(), OUTPUT_FILE)}\n`);
