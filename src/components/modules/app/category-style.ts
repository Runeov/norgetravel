import {
  Anchor,
  Beer,
  BedDouble,
  Building2,
  Camera,
  Coffee,
  Croissant,
  Dog,
  Fish,
  Flame,
  Globe,
  Hotel,
  House,
  Landmark,
  LayoutGrid,
  Mountain,
  MountainSnow,
  Music,
  PartyPopper,
  Sailboat,
  Ship,
  ShoppingBasket,
  Snowflake,
  Sparkles,
  Sun,
  Tent,
  TentTree,
  Trophy,
  UtensilsCrossed,
  Waves,
  Wine,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icon and poster hue for each category key used in the app (event types,
 * tour types, stay types and cuisines). Keys are unique across kinds except
 * "northern-lights", which events and tours share and draw the same way.
 */
const STYLES: Record<string, { icon: LucideIcon; hue: number }> = {
  // Events
  festival: { icon: PartyPopper, hue: 330 },
  concert: { icon: Music, hue: 280 },
  market: { icon: ShoppingBasket, hue: 32 },
  sports: { icon: Trophy, hue: 205 },
  cultural: { icon: Landmark, hue: 18 },
  'midnight-sun': { icon: Sun, hue: 42 },
  'northern-lights': { icon: Sparkles, hue: 152 },
  'food-drink': { icon: UtensilsCrossed, hue: 12 },
  outdoor: { icon: Mountain, hue: 120 },
  seasonal: { icon: Snowflake, hue: 200 },
  // Tours
  'whale-watching': { icon: Fish, hue: 198 },
  'dog-sledding': { icon: Dog, hue: 24 },
  'glacier-hike': { icon: MountainSnow, hue: 192 },
  'fjord-cruise': { icon: Ship, hue: 212 },
  fishing: { icon: Fish, hue: 182 },
  surfing: { icon: Waves, hue: 188 },
  kayaking: { icon: Sailboat, hue: 172 },
  snowmobile: { icon: Snowflake, hue: 222 },
  'cultural-tour': { icon: Landmark, hue: 18 },
  'photography-tour': { icon: Camera, hue: 262 },
  // Stays
  hotel: { icon: Hotel, hue: 220 },
  cabin: { icon: House, hue: 26 },
  hostel: { icon: BedDouble, hue: 258 },
  camping: { icon: Tent, hue: 110 },
  rorbu: { icon: Anchor, hue: 4 },
  glamping: { icon: TentTree, hue: 300 },
  apartment: { icon: Building2, hue: 232 },
  // Eat
  norwegian: { icon: UtensilsCrossed, hue: 0 },
  seafood: { icon: Fish, hue: 196 },
  sami: { icon: Flame, hue: 28 },
  international: { icon: Globe, hue: 248 },
  'fine-dining': { icon: Wine, hue: 332 },
  cafe: { icon: Coffee, hue: 30 },
  bakery: { icon: Croissant, hue: 40 },
  pub: { icon: Beer, hue: 36 },
};

export const categoryIcon = (key: string): LucideIcon => STYLES[key]?.icon ?? LayoutGrid;

export const categoryHue = (key: string): number => STYLES[key]?.hue ?? 215;
