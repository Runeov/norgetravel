/**
 * Town-level placement for the /app Explore map.
 *
 * Listings carry no coordinates, only free-text locations ("Tromsø, Norway",
 * "Sorrisniva 20, 9518 Alta, Norway") and, for stays, a nearest town. This
 * module owns turning that text into a known town and the town into a point on
 * the map outline from src/data/norway-map-zones.ts. A listing whose town is
 * not in the table stays unplaced; it is counted, never guessed.
 */

export interface Town {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

const TOWNS: Town[] = [
  { id: 'oslo', name: 'Oslo', lat: 59.913, lon: 10.752 },
  { id: 'bergen', name: 'Bergen', lat: 60.392, lon: 5.324 },
  { id: 'stavanger', name: 'Stavanger', lat: 58.97, lon: 5.733 },
  { id: 'trondheim', name: 'Trondheim', lat: 63.43, lon: 10.395 },
  { id: 'kristiansand', name: 'Kristiansand', lat: 58.146, lon: 7.996 },
  { id: 'alesund', name: 'Ålesund', lat: 62.472, lon: 6.15 },
  { id: 'tromso', name: 'Tromsø', lat: 69.649, lon: 18.956 },
  { id: 'bodo', name: 'Bodø', lat: 67.28, lon: 14.405 },
  { id: 'narvik', name: 'Narvik', lat: 68.438, lon: 17.427 },
  { id: 'alta', name: 'Alta', lat: 69.969, lon: 23.272 },
  { id: 'hammerfest', name: 'Hammerfest', lat: 70.663, lon: 23.682 },
  { id: 'kirkenes', name: 'Kirkenes', lat: 69.727, lon: 30.045 },
  { id: 'honningsvag', name: 'Honningsvåg', lat: 70.982, lon: 25.97 },
  { id: 'longyearbyen', name: 'Longyearbyen', lat: 78.223, lon: 15.647 },
  { id: 'svolvaer', name: 'Svolvær', lat: 68.234, lon: 14.568 },
  { id: 'leknes', name: 'Leknes', lat: 68.148, lon: 13.611 },
  { id: 'reine', name: 'Reine', lat: 67.932, lon: 13.089 },
  { id: 'stamsund', name: 'Stamsund', lat: 68.126, lon: 13.844 },
  { id: 'henningsvaer', name: 'Henningsvær', lat: 68.154, lon: 14.205 },
  { id: 'kabelvag', name: 'Kabelvåg', lat: 68.212, lon: 14.482 },
  { id: 'a-i-lofoten', name: 'Å i Lofoten', lat: 67.879, lon: 12.979 },
  { id: 'senja', name: 'Senja', lat: 69.37, lon: 17.35 },
  { id: 'lyngen', name: 'Lyngen', lat: 69.576, lon: 20.218 },
  { id: 'harstad', name: 'Harstad', lat: 68.799, lon: 16.541 },
  { id: 'sortland', name: 'Sortland', lat: 68.697, lon: 15.413 },
  { id: 'stokmarknes', name: 'Stokmarknes', lat: 68.565, lon: 14.909 },
  { id: 'andoya', name: 'Andøya', lat: 69.315, lon: 16.119 },
  { id: 'mo-i-rana', name: 'Mo i Rana', lat: 66.313, lon: 14.142 },
  { id: 'mosjoen', name: 'Mosjøen', lat: 65.837, lon: 13.19 },
  { id: 'sandnessjoen', name: 'Sandnessjøen', lat: 66.021, lon: 12.632 },
  { id: 'bronnoysund', name: 'Brønnøysund', lat: 65.474, lon: 12.212 },
  { id: 'steinkjer', name: 'Steinkjer', lat: 64.015, lon: 11.495 },
  { id: 'lillehammer', name: 'Lillehammer', lat: 61.115, lon: 10.466 },
  { id: 'flam', name: 'Flåm', lat: 60.863, lon: 7.113 },
  { id: 'sogndal', name: 'Sogndal', lat: 61.229, lon: 7.1 },
  { id: 'odda', name: 'Odda', lat: 60.069, lon: 6.546 },
  { id: 'lom', name: 'Lom', lat: 61.838, lon: 8.568 },
  { id: 'arendal', name: 'Arendal', lat: 58.461, lon: 8.772 },
  { id: 'fredrikstad', name: 'Fredrikstad', lat: 59.218, lon: 10.93 },
  { id: 'geiranger', name: 'Geiranger', lat: 62.101, lon: 7.206 },
  { id: 'voss', name: 'Voss', lat: 60.628, lon: 6.418 },
  { id: 'hemsedal', name: 'Hemsedal', lat: 60.862, lon: 8.552 },
  { id: 'haugesund', name: 'Haugesund', lat: 59.413, lon: 5.268 },
  { id: 'molde', name: 'Molde', lat: 62.737, lon: 7.161 },
  { id: 'geilo', name: 'Geilo', lat: 60.534, lon: 8.206 },
  { id: 'oppdal', name: 'Oppdal', lat: 62.594, lon: 9.691 },
  { id: 'vadso', name: 'Vadsø', lat: 70.074, lon: 29.749 },
  { id: 'vardo', name: 'Vardø', lat: 70.37, lon: 31.11 },
  { id: 'kristiansund', name: 'Kristiansund', lat: 63.11, lon: 7.728 },
  { id: 'roros', name: 'Røros', lat: 62.574, lon: 11.384 },
  { id: 'kautokeino', name: 'Kautokeino', lat: 69.012, lon: 23.04 },
  { id: 'karasjok', name: 'Karasjok', lat: 69.472, lon: 25.511 },
  { id: 'lakselv', name: 'Lakselv', lat: 70.051, lon: 24.971 },
  { id: 'skibotn', name: 'Skibotn', lat: 69.388, lon: 20.268 },
  { id: 'sommaroy', name: 'Sommarøy', lat: 69.635, lon: 18.016 },
  { id: 'norheimsund', name: 'Norheimsund', lat: 60.371, lon: 6.146 },
  { id: 'skjolden', name: 'Skjolden', lat: 61.489, lon: 7.604 },
];

const BY_ID = new Map(TOWNS.map((t) => [t.id, t]));

/** Lowercase ASCII form used for matching: "Tromsø" → "tromso", "Ålesund" → "alesund". */
export function foldPlaceName(text: string): string {
  return text
    .toLowerCase()
    .replace(/ø/g, 'o')
    .replace(/æ/g, 'ae')
    .replace(/å/g, 'a')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Folded place names that point at a town. Each town matches its own name;
// the extra entries are districts, islands and areas used in the listings.
const ALIASES = new Map<string, string>([
  ...TOWNS.map((t) => [foldPlaceName(t.name), t.id] as [string, string]),
  ['tromsdalen', 'tromso'],
  ['kvaloya', 'tromso'],
  ['lyngseidet', 'lyngen'],
  ['nordkapp', 'honningsvag'],
  ['north cape', 'honningsvag'],
  ['skarsvag', 'honningsvag'],
  ['repvag', 'honningsvag'],
  ['lofoten', 'svolvaer'],
  ['lofoten archipelago', 'svolvaer'],
  ['skaland', 'senja'],
  ['silsand', 'senja'],
  ['finnsnes', 'senja'],
  ['svalbard', 'longyearbyen'],
  ['pyramiden', 'longyearbyen'],
  ['adventfjorden', 'longyearbyen'],
  ['vossevangen', 'voss'],
  ['andenes', 'andoya'],
]);

// Longest names first, so "mo i rana" wins over a shorter name inside it.
// Very short names ("lom", "a") only match as a whole location part.
const WORD_KEYS = [...ALIASES.keys()].filter((k) => k.length > 3).sort((a, b) => b.length - a.length);

function lookup(candidate: string | null | undefined): Town | undefined {
  if (!candidate) return undefined;
  const id = ALIASES.get(foldPlaceName(candidate));
  return id ? BY_ID.get(id) : undefined;
}

/**
 * The town a listing belongs to, from its nearest town, the town after a
 * Norwegian postcode in its address, its comma-separated location parts, and
 * finally a whole-word match anywhere in the location text.
 */
export function townOf(item: { location: string; nearestTown?: string | null }): Town | undefined {
  const postal = /\b\d{4}\s+([^,\d]+)/.exec(item.location)?.[1];
  const direct =
    lookup(item.nearestTown) ??
    lookup(postal) ??
    item.location
      .split(',')
      .map((part) => lookup(part))
      .find(Boolean);
  if (direct) return direct;

  const folded = foldPlaceName(item.location);
  const key = WORD_KEYS.find((k) => new RegExp(`(^|[^a-z])${k}([^a-z]|$)`).test(folded));
  return key ? BY_ID.get(ALIASES.get(key) as string) : undefined;
}

export const townById = (id: string): Town | undefined => BY_ID.get(id);

// ─── Map projection ───
// norway-map-zones.ts draws mainland Norway in a 400 × 800 box spanning
// longitude 4.5–31.5 and latitude 71.5–57.5, with Svalbard as an inset scaled
// 0.55 at (30, −110). MAP_VIEWBOX is the box the existing NorwayMap uses.

export const MAP_VIEWBOX = { x: -30, y: -120, width: 460, height: 950 } as const;

// Longyearbyen sits on the south shore of Isfjorden, near inset point (104, 140).
const LONGYEARBYEN_POINT = { x: 30 + 104 * 0.55, y: -110 + 140 * 0.55 };

/** Map position in viewBox units. */
export function townPoint(town: Town): { x: number; y: number } {
  if (town.id === 'longyearbyen') return LONGYEARBYEN_POINT;
  return { x: ((town.lon - 4.5) / 27) * 400, y: ((71.5 - town.lat) / 14) * 800 };
}

/** Map position as percentages of the map box, for absolutely placed pins. */
export function townPercent(town: Town): { left: number; top: number } {
  const p = townPoint(town);
  return {
    left: ((p.x - MAP_VIEWBOX.x) / MAP_VIEWBOX.width) * 100,
    top: ((p.y - MAP_VIEWBOX.y) / MAP_VIEWBOX.height) * 100,
  };
}
