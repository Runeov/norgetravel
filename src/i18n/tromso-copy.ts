import type { Locale } from '@/lib/i18n-seo';
import type { CityFact, CityGuide, SeasonalWindow } from '@/types/city-guide';
import type { FaqCopy } from '@/i18n/northern-lights-copy';
import { tromso } from '@/data/city-guides/tromso';

// Tromsø destination page (/destinations/tromso) copy per locale.
// English page-level text is read from src/data/city-guides/tromso.ts, which
// other code also uses, so that file keeps its English values and shape. The
// English text for the page body and its two client components is the original
// inline text. The page passes each client component only its own slice.

export type TromsoFeaturedId = 'aurora' | 'whales' | 'fjellheisen' | 'senja';
export type TromsoTourId = 'aurora' | 'whales' | 'husky' | 'sami';
export type TromsoTrailId = 'sherpatrappa' | 'tromsdalstinden' | 'rodtinden' | 'bonntuva';
export type TromsoTrailDifficulty = 'Easy' | 'Moderate' | 'Hard';
export type TromsoBasecampId = 'sentrum' | 'tromsdalen' | 'kvaloya';

export interface TromsoFeaturedCopy {
  title: string;
  description: string;
  duration: string;
  price: string;
  season: string;
  linkLabel: string;
}

export interface TromsoTourCopy {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
}

export interface TromsoTrailCopy {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  description: string;
}

export interface TromsoRestaurantCopy {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
  norgetravelRating?: number;
}

export interface TromsoActivitiesCopy {
  heading: string;
  intro: string;
  tabs: Record<'featured' | 'tours' | 'hiking' | 'eat', string>;
  bookTour: string;
  checkAvailability: string;
  viewAllTours: string;
  readGuide: string;
  ratingTitle: string;
  rated: string;
  difficulty: Record<TromsoTrailDifficulty, string>;
  featured: Record<TromsoFeaturedId, TromsoFeaturedCopy>;
  tours: Record<TromsoTourId, TromsoTourCopy>;
  trails: Record<TromsoTrailId, TromsoTrailCopy>;
  restaurants: TromsoRestaurantCopy[];
}

export interface TromsoBasecampCopy {
  label: string;
  name: string;
  tagline: string;
  population: string;
  distanceToCentre: string;
  overview: string;
  bestFor: string[];
  notIdealFor: string[];
  accommodation: { name: string; type: string; price: string; highlight: string }[];
  dining: { name: string; detail: string }[];
  services: { label: string; available: boolean; detail: string }[];
  insiderTip: string;
}

export interface TromsoBasecampsCopy {
  heading: string;
  intro: string;
  bestFor: string;
  notIdealFor: string;
  accommodation: string;
  dining: string;
  services: string;
  localTip: string;
  leadTimes: {
    title: string;
    /** Space between the bold label and its text, and between items. Empty for zh and ja. */
    gap: string;
    items: { label: string; body: string }[];
  };
  bases: Record<TromsoBasecampId, TromsoBasecampCopy>;
}

export interface TromsoTransportCopy {
  title: string;
  body: string;
  cta: string;
}

export interface TromsoCopy {
  /** Title without the brand suffix for zh and ja; brandTitle() adds it */
  meta: { title: string; description: string };
  hero: { alt: string; badge: string; heading: string; body: string };
  /** aria-label and eyebrow of the answer-first aside under the hero */
  quickAnswerLabel: string;
  /** 3 to 5 sentences an assistant can quote: when, where, how, what it costs, the condition that matters */
  quickAnswer: string;
  heroStats: CityGuide['heroStats'];
  facts: CityFact[];
  about: { heading: string; paragraphs: [string, string, string]; keyFacts: string; bestTimeHeading: string; bestTimeBody: string };
  seasons: { heading: string; intro: string; windows: SeasonalWindow[] };
  gettingThere: {
    heading: string;
    flights: TromsoTransportCopy;
    hurtigruten: TromsoTransportCopy;
    driving: TromsoTransportCopy;
    bus: TromsoTransportCopy;
  };
  itineraries: { heading: string; intro: string; items: [string, string, string, string] };
  expert: { alt: string; zone: string; role: string; bio: string };
  /** h2 of the Q&A section */
  faqHeading: string;
  /** Rendered as h3 + p near the end of the page and as FAQPage JSON-LD; facts only from this page */
  faq: [FaqCopy, FaqCopy, FaqCopy, FaqCopy, FaqCopy, FaqCopy];
  cta: { heading: string; body: string; northernLights: string; northernNorway: string };
  share: { title: string; label: string };
  activities: TromsoActivitiesCopy;
  basecamps: TromsoBasecampsCopy;
}

/* ------------------------------------------------------------------ */
/*  Featured restaurants (names, order and ratings from tromso.ts)     */
/* ------------------------------------------------------------------ */

const FEATURED_RESTAURANT_IDS = ['emmas-drommekjokken', 'bardus-bistro', 'aunegarden', 'skarven'] as const;
type FeaturedRestaurantId = (typeof FEATURED_RESTAURANT_IDS)[number];

const NORGETRAVEL_RATING: Record<FeaturedRestaurantId, number> = {
  'emmas-drommekjokken': 8.9,
  'bardus-bistro': 8.5,
  'aunegarden': 8.1,
  'skarven': 7.7,
};

type RestaurantText = Omit<TromsoRestaurantCopy, 'name' | 'norgetravelRating'>;

/** English reads cuisine, price and description from tromso.ts; zh and ja pass their own text. */
function featuredRestaurants(text?: Record<FeaturedRestaurantId, RestaurantText>): TromsoRestaurantCopy[] {
  return tromso.restaurants.flatMap((r) => {
    const id = FEATURED_RESTAURANT_IDS.find((featured) => featured === r.id);
    if (!id) return [];
    const translated = text?.[id];
    return [
      {
        name: r.name,
        cuisine: translated?.cuisine ?? r.cuisine,
        priceRange: translated?.priceRange ?? r.averageMealPrice ?? 'Price varies',
        highlight: translated?.highlight ?? r.description,
        norgetravelRating: NORGETRAVEL_RATING[id],
      },
    ];
  });
}

/* ------------------------------------------------------------------ */
/*  Copy                                                               */
/* ------------------------------------------------------------------ */

export const TROMSO_COPY: Record<Locale, TromsoCopy> = {
  en: {
    meta: { title: tromso.metaTitle, description: tromso.metaDescription },
    hero: {
      alt: tromso.heroImageAlt,
      badge: tromso.taglineBadge,
      heading: tromso.heroHeadline,
      body: tromso.heroBody,
    },
    quickAnswerLabel: 'Quick answer',
    quickAnswer:
      'Tromsø is the Arctic basecamp of Norway (Norge): 69°N, about 80,000 residents, a 2-hour direct flight from Oslo, and directly under the auroral oval. The Northern Lights season runs from September to March, and the polar night, 27 November to 15 January, still gives twilight at midday. Kp 2 to 3 is enough for an overhead display here, so a clear sky is the one condition that matters. Small-group chases from 1,290 NOK and private guides drive 50 to 200 km from the city to find it; with a rental car you can base yourself on Kvaløya, 25 minutes west of the centre, where there is no light pollution. Stay 4 to 7 nights and book hotels 3 to 6 months ahead for the aurora season.',
    heroStats: tromso.heroStats,
    facts: tromso.facts,
    about: {
      heading: 'About Tromsø',
      paragraphs: [
        "Tromsø sits at 69°N on the island of Tromsøya, connected by bridge and tunnel to the mainland and to Kvaløya. It is the largest city above the Arctic Circle in Norway: about 80,000 residents, a working port, a university with the world's northernmost medical school, and a functioning hospital. It is not a tourist outpost. It is an Arctic city that happens to sit directly under the auroral oval.",
        'The Northern Lights appear here on clear nights between September and March when the KP index reaches 2 to 3. Neither condition is guaranteed on any given night. Commercial chases drive 50–200 km from the city to find clear sky. Four-night minimum; anything less is a gamble. The polar night runs November 27 to January 15: 50 days when the sun does not rise above the horizon.',
        'From May 18 to July 26, the midnight sun reverses the clock. Hiking, sea kayaking, and the Midnight Sun Marathon happen under 24-hour daylight. In November, orca and humpback pods follow the herring into the fjords; since 2017 the feeding grounds have been around Skjervøy and Kvænangen, about 3 hours from Tromsø, and December to January is the peak whale-watching season. Tromsø is the basecamp for all of it.',
      ],
      keyFacts: 'Key facts',
      bestTimeHeading: 'Best time to visit',
      bestTimeBody:
        'September to March for Northern Lights. May to July for midnight sun. December to January for peak whale season. November is dark by mid-afternoon and often wet, so aurora chases are hit-or-miss. The polar night itself starts 27 November.',
    },
    seasons: {
      heading: 'When to visit Tromsø',
      intro: 'Tromsø runs on light. What you can do and see changes completely by season.',
      windows: tromso.seasonalWindows,
    },
    gettingThere: {
      heading: 'How to get to Tromsø',
      flights: {
        title: 'Direct flights from Oslo (OSL) to Tromsø (TOS)',
        body: 'SAS and Norwegian fly multiple times daily. Flight time: 2 hours. Fares from NOK 799 return in shoulder season. Book 6-8 weeks ahead for winter aurora season.',
        cta: 'Search flights',
      },
      hurtigruten: {
        title: 'Hurtigruten coastal ferry',
        body: 'Tromsø is a stop on the Bergen-Kirkenes coastal route. The northbound ship takes about four days from Bergen and calls at Tromsø in the afternoon. Fly in, sail a segment out.',
        cta: 'Browse sailings',
      },
      driving: {
        title: 'Driving — E8 from Finland or E6 from the south',
        body: 'From Narvik: about 245 km on the E6 and E8, 3.5 to 4 hours in summer. From Skibotn on the E8: 2 hours. Skibotn is in Norway; the Finnish border at Kilpisjärvi is another 45 km up the E8. Winter tyres are required when conditions call for them. Studded tyres are not mandatory, but are allowed in Troms, Nordland and Finnmark from 16 October to 30 April (1 November to the first Sunday after Easter Monday in the rest of Norway).',
        cta: 'Compare car rentals',
      },
      bus: {
        title: 'Express bus from Narvik',
        body: 'The Svipper express bus (Troms county transport) runs Narvik-Tromsø in 4 hours with multiple daily departures. Narvik has direct rail connections from Stockholm via the Ofoten Line. A scenic entry point for train travellers.',
        cta: 'Book on Svipper',
      },
    },
    itineraries: {
      heading: 'Itineraries that include Tromsø',
      intro: 'Multi-day routes built around Tromsø as the Arctic basecamp.',
      items: [
        '7-day Tromsø aurora week: 4 aurora chases, 1 whale safari, 1 dog sled, 1 rest day',
        '10-day Lofoten–Tromsø road trip: fly into Bodø, drive the E10 through Lofoten, ferry to Tromsø',
        '5-day midnight sun intensive (June): Senja island day trip, sea kayaking on Kaldfjord, Fjellheisen under the midnight sun',
        '14-day Arctic circle: Oslo to Tromsø via Hurtigruten + land segments, including Svalbard option',
      ],
    },
    expert: {
      alt: 'Bjørn Haugen, Arctic Field Editor at NorgeTravel',
      zone: 'The Arctic',
      role: 'Arktisk feltekspert | Arctic Field Editor',
      bio: "DNT-certified guide with 25 years in Nord-Norge and Svalbard. Former search and rescue volunteer in Tromsø. Knows exactly why the tourist board photo of the aurora is not the one you'll see on night one — and how to plan for the one you will.",
    },
    faqHeading: 'Questions travellers ask',
    faq: [
      {
        question: 'How do I get to Tromsø, and how long does it take from Oslo?',
        answer:
          'Fly. SAS and Norwegian fly direct from Oslo (OSL) to Tromsø (TOS) several times a day and the flight takes 2 hours; fares start from NOK 799 return in shoulder season, and for the winter aurora season you should book 6 to 8 weeks ahead. The Hurtigruten coastal ship calls at Tromsø about four days out of Bergen. By road it is about 245 km from Narvik on the E6 and E8, 3.5 to 4 hours in summer, or 4 hours on the Svipper express bus.',
      },
      {
        question: 'When should I visit Tromsø: for the Northern Lights or the midnight sun?',
        answer:
          'September to March for the Northern Lights, which appear on clear nights when the Kp index reaches 2 to 3. May 18 to July 26 for the midnight sun, when the sun does not set and hiking, sea kayaking and the Midnight Sun Marathon run under 24-hour daylight. December to January is peak whale season. November is dark by mid-afternoon and often wet, so aurora chases then are hit-or-miss.',
      },
      {
        question: 'Where should I stay in Tromsø?',
        answer:
          'First-time visitors should stay in Sentrum, the city centre on Tromsøya: the harbour hotels, Scandic Ishavshotel and Clarion The Edge among them, are where most aurora and whale tours pick up, and every serious restaurant is within walking distance. Tromsdalen, across the bridge, gives quieter nights and the Fjellheisen cable car, 10 minutes from the centre by bus. Kvaløya, 25 minutes west by car, has no light pollution but needs a rental car. Book hotels 3 to 6 months ahead for the aurora season; Sentrum fills first.',
      },
      {
        question: 'How many days do you need in Tromsø?',
        answer:
          'Plan 4 to 7 nights. The aurora needs a clear sky, and cloud is the variable you cannot control, so four nights is the minimum for a realistic chance; anything less is a gamble. A 7-day winter week fits 4 aurora chases, 1 whale safari, 1 dog sled and a rest day. In June, 5 days covers a Senja day trip, sea kayaking on Kaldfjord and the Fjellheisen cable car under the midnight sun.',
      },
      {
        question: 'What else can you do in Tromsø in winter besides the Northern Lights?',
        answer:
          'Whale safaris: from November to February orca and humpback pods follow the herring into the fjords around Skjervøy and Kvænangen, around 3 hours from Tromsø, with the peak in December and January and 90% sighting rates at peak; boats cost from 1,450 NOK. Husky sledding runs from Camp Tamok in Tamokdalen, about 75 minutes inland, from 2,800 NOK, and a Sami-led reindeer camp with evening aurora viewing costs from 2,190 NOK. The Fjellheisen cable car climbs to Storsteinen at 421 m in four minutes, and the Sherpa steps up the same slope are walkable year-round with microspikes.',
      },
      {
        question: 'Is Tromsø dark all day during the polar night?',
        answer:
          'No. The polar night runs from 27 November to 15 January, 50 days when the sun does not rise above the horizon, but there is still twilight around midday. Before it starts, November is already dark by mid-afternoon. The dark hours are what make the Northern Lights visible, and the city runs as normal: about 80,000 residents, a university, a hospital and a working port.',
      },
    ],
    cta: {
      heading: 'Ready to book Tromsø?',
      body: 'Northern Lights tours, whale safaris, and Arctic trekking — all with commission-transparent affiliate links.',
      northernLights: 'Northern Lights Tours',
      northernNorway: 'All Northern Norway',
    },
    share: { title: 'Tromsø Travel Guide', label: 'Share this page' },
    activities: {
      heading: 'What to do in Tromsø',
      intro:
        'Tromsø sits at 69°N directly under the auroral oval. About 80,000 residents, a working port, a university, and a functioning Arctic city. The aurora season runs September to March. The midnight sun runs May 18 to July 26. Everything below is a real option bookable from the city, or a trailhead you can reach in under 45 minutes by car.',
      tabs: { featured: 'Featured', tours: 'Tours', hiking: 'Hiking', eat: 'Where to eat' },
      bookTour: 'Book tour',
      checkAvailability: 'Check availability',
      viewAllTours: 'View all Tromsø tours on GetYourGuide',
      readGuide: 'Read guide',
      ratingTitle: 'NorgeTravel rating (out of 10)',
      rated: 'NorgeTravel rated',
      difficulty: { Easy: 'Easy', Moderate: 'Moderate', Hard: 'Hard' },
      featured: {
        aurora: {
          title: 'Northern Lights chase by minibus',
          description:
            'Licensed Tromsø guides track clear skies by car and drive up to 200 km in a night to find aurora. 6–8 hours from 18:00. Book four nights minimum. Cloud cover is the only variable you cannot control.',
          duration: '6–8 hours',
          price: 'From 1,290 NOK',
          season: 'Sep–Mar',
          linkLabel: 'Check availability',
        },
        whales: {
          title: 'Whale watching from Skjervøy',
          description:
            'Orca and humpback pods follow the herring into the fjords around Skjervøy and Kvænangen November–February, around 3 hours from Tromsø. Peak December–January. RIB boats get you close; traditional vessels stay warmer for long days. 90% sighting rate at peak season.',
          duration: '4–6 hours',
          price: 'From 1,450 NOK',
          season: 'Nov–Feb',
          linkLabel: 'Check availability',
        },
        fjellheisen: {
          title: 'Fjellheisen cable car to Storsteinen',
          description:
            'Four-minute cable car from Solliveien in Tromsdalen to the 421m Storsteinen ledge. Hours and fares change by season; check fjellheisen.no before you go. Often the fastest way above the city light dome.',
          duration: '1–3 hours',
          price: 'Fares vary by season',
          season: 'Year-round',
          linkLabel: 'Read the trail guide',
        },
        senja: {
          title: 'Senja day trip — Segla and the coast',
          description:
            'Norway’s second-largest island, 2.5 hours from Tromsø by car via the Senja ferry (Brensholmen–Botnhamn). Segla peak (639m), empty beaches, and working fishing villages. National Tourist Route runs the western coast.',
          duration: 'Full day',
          price: 'From 1,200 NOK (guided)',
          season: 'May–Sep',
          linkLabel: 'Check guided options',
        },
      },
      tours: {
        aurora: {
          name: 'Tromsø Aurora Chase (Small Group)',
          type: 'Northern Lights, 6–8 hours',
          price: 'From 1,290 NOK',
          duration: '6–8 hours',
          highlight:
            'Small-group minibus chase with licensed Tromsø guides. Real-time cloud forecasting. Hot drinks and tripods included. Free reschedule if no aurora visible.',
        },
        whales: {
          name: 'Skjervøy Whale Safari (Hybrid Vessel)',
          type: 'Whale watching, 5–6 hours',
          price: 'From 1,450 NOK',
          duration: '5–6 hours',
          highlight:
            'Silent hybrid propulsion gets boats closer to orca pods without disturbing the herring shoals. November–February only. Heated indoor lounge, outdoor deck, and thermal suits.',
        },
        husky: {
          name: 'Husky sledding + aurora combo',
          type: 'Winter adventure, 4–5 hours',
          price: 'From 2,800 NOK',
          duration: '4–5 hours',
          highlight:
            'Evening runs from the Camp Tamok kennels in Tamokdalen, about 75 minutes inland from Tromsø. Operators track the aurora forecast and extend the stop if conditions align. Warm suits, boots, and dinner included.',
        },
        sami: {
          name: 'Sami reindeer camp and aurora',
          type: 'Cultural + aurora, 5–7 hours',
          price: 'From 2,190 NOK',
          duration: '5–7 hours',
          highlight:
            'Sami-owned and Sami-led. Feed reindeer, hear a joik, learn the actual working relationship between Sami herders and the herd. Aurora viewing from the lavvu in the evening if skies clear.',
        },
      },
      trails: {
        sherpatrappa: {
          name: 'Sherpatrappa to Fløya via Storsteinen',
          distance: '5 km round trip',
          elevation: '670 m (to Fløya)',
          time: '3–5 hours',
          description:
            'The 1,200 Nepalese sherpa-built stone steps from Tromsdalen up to Storsteinen (421m, cable car top), with optional extension to Fløya summit (671m). Urban-access trail, year-round with microspikes in winter. DNT Blue.',
        },
        tromsdalstinden: {
          name: 'Tromsdalstinden summit',
          distance: '18 km round trip',
          elevation: '1,100 m',
          time: '8–10 hours',
          description:
            'The 1,238m signature peak above Tromsø. Trailhead at Tromsødalen, long approach over tundra and scree, final scramble to the cairn. Summer only (July–September). DNT Red with full Fjellvettreglene protocol.',
        },
        rodtinden: {
          name: 'Rødtinden on Kvaløya',
          distance: '6 km round trip',
          elevation: '600 m',
          time: '4–5 hours',
          description:
            '644m peak above Ersfjord, 30 minutes from Tromsø by car. Trailhead at Finnvika. Steady climb on marked path, short boulder scramble near the top. DNT Blue with scramble. Summit views across Kvaløya to the Lyngen Alps.',
        },
        bonntuva: {
          name: 'Bønntuva on Kvaløya',
          distance: '5 km round trip',
          elevation: '500 m',
          time: '3–4 hours',
          description:
            '615m family-friendly Kvaløya peak, 35 minutes from Tromsø. Trailhead at Eidkjosen. Well-marked, no scrambling, gradual ascent. DNT Blue. Summit views south across Malangen to Senja.',
        },
      },
      restaurants: featuredRestaurants(),
    },
    basecamps: {
      heading: 'Where to base yourself',
      intro:
        'Three bases, each with a different trade-off between convenience, price, and dark sky. Sentrum puts you on the harbour with every tour pickup at the door. Tromsdalen buys you quiet nights and the Fjellheisen cable car. Kvaløya gives you no light pollution, if you have a rental car.',
      bestFor: 'Best for',
      notIdealFor: 'Not ideal for',
      accommodation: 'Accommodation',
      dining: 'Dining',
      services: 'Practical services',
      localTip: 'Local tip',
      leadTimes: {
        title: 'Booking lead times',
        gap: ' ',
        items: [
          {
            label: 'Aurora season (Nov–Mar):',
            body: 'Book hotels 3–6 months ahead. Sentrum fills first. Scandic Ishavshotel and Clarion With sell out by October for peak January–February dates.',
          },
          {
            label: 'Midnight sun (Jun–Jul):',
            body: '2–3 months lead time usually enough. Prices 30–40% lower than aurora peak.',
          },
          {
            label: 'Shoulder (Sep–Oct, Apr–May):',
            body: 'Last-minute is often fine. Aurora is still possible in September, cheaper than January.',
          },
        ],
      },
      bases: {
        sentrum: {
          label: 'Sentrum',
          name: 'Sentrum (city centre)',
          tagline: 'Walking distance to the harbour, Storgata, and tour pickups',
          population: 'Tromsøya island',
          distanceToCentre: 'You are here',
          overview:
            'The waterfront strip on Tromsøya island. Where most first-time visitors should stay. Scandic Ishavshotel and Clarion The Edge sit directly on the harbour with fjord-view rooms. Tour operators pick up almost hourly from the Scandic during aurora season. Walk to Mathallen food hall, the Polar Museum, the Mack Ølhallen pub, and every serious restaurant in the city.',
          bestFor: [
            'First-time visitors to Tromsø',
            'Travellers without a rental car',
            'Aurora chasers using commercial tour pickups',
            'Whale-safari passengers (tours start in the centre)',
            'Anyone wanting dinner options within walking distance',
          ],
          notIdealFor: [
            'Dark-sky aurora viewing from your balcony (light pollution)',
            'Budget travellers in peak aurora season (prices spike)',
            'Travellers wanting quiet (Storgata is active until late)',
          ],
          accommodation: [
            {
              name: 'Scandic Ishavshotel',
              type: '4-star hotel',
              price: '2,200–4,500 NOK/night',
              highlight:
                'Directly on the harbour with triangular glass facade and fjord-view rooms. The operational heart of Tromsø tourism. Most aurora and whale-watching tour pickups depart from the lobby. Panorama bar on the top floor. Breakfast included.',
            },
            {
              name: 'Clarion Hotel The Edge and Clarion Collection Hotel With',
              type: '4-star harbour hotels',
              price: '1,900–4,000 NOK/night',
              highlight:
                'Two separate hotels on the harbour front. Clarion Hotel The Edge is the big 2014 hotel with a top-floor bar on the 11th floor and harbour and Arctic Cathedral views. Clarion Collection Hotel With is the smaller harbour-front hotel where afternoon waffles and an evening meal are included in the rate.',
            },
            {
              name: 'Radisson Blu Hotel Tromsø',
              type: '4-star hotel',
              price: '1,800–3,800 NOK/night',
              highlight:
                'Central Storgata location. Reliable mid-to-upper range. Yonas restaurant downstairs. Good fallback when Scandic and Clarion are full (which is often in January–March).',
            },
            {
              name: 'Smarthotel Tromsø',
              type: 'Budget hotel',
              price: '1,100–2,200 NOK/night',
              highlight:
                'Compact rooms, central location. The genuine budget option in Sentrum during aurora season. No restaurant, no extras. Book early.',
            },
          ],
          dining: [
            {
              name: 'Emmas Drømmekjøkken',
              detail:
                'Local institution. Scandinavian fine dining upstairs, bistro (Emmas Under) downstairs. Arctic char, reindeer, king crab. 500–800 NOK mains. Book 2–3 weeks ahead in aurora season.',
            },
            {
              name: 'Bardus Bistro',
              detail:
                'Small modern Nordic kitchen next to the city library and the Tromsø Culture House. Seasonal menu, short and confident. Popular with locals. 400–650 NOK mains.',
            },
            {
              name: 'Fiskekompaniet',
              detail:
                'Harbour-front seafood restaurant. King crab, scallops, halibut. Straightforward preparation, premium ingredients. 450–750 NOK mains.',
            },
            {
              name: 'Mathallen Tromsø',
              detail:
                'Food hall on Grønnegata. Local producers under one roof: Arctic cheeses, smoked fish, bakery, small café. Lunch stop, not dinner.',
            },
          ],
          services: [
            { label: 'Grocery', available: true, detail: 'Kiwi, Rema 1000, Coop Mega within 5 minutes walking.' },
            { label: 'Car rental', available: true, detail: 'Hertz, Avis, Europcar. Airport pickup recommended over city desks.' },
            { label: 'EV charging', available: true, detail: 'Multiple hotel-linked and public chargers, including Radisson Blu. Fjellheisen has rapid chargers.' },
            { label: 'Pharmacy', available: true, detail: 'Apotek 1 on Storgata. 24-hour service via phone order.' },
            { label: 'Hospital', available: true, detail: 'UNN Tromsø – University Hospital of Northern Norway. Emergency: 113.' },
            { label: 'Tour pickups', available: true, detail: 'Scandic Ishavshotel and Radisson Blu are primary aurora tour pickup points.' },
          ],
          insiderTip:
            'Book aurora tours before you book the hotel, not after. Operators sell out 4–6 weeks ahead in January–March. If your preferred tour (Chasing Lights, Tromsø Friluftsenter) is full on night 1 but available on night 3, align your dates. The hotel will always have a room somewhere in Sentrum.',
        },
        tromsdalen: {
          label: 'Tromsdalen',
          name: 'Tromsdalen (mainland side)',
          tagline: 'Arctic Cathedral and Fjellheisen cable car at your door',
          population: 'Mainland side of Tromsø bridge',
          distanceToCentre: '10 minutes by car or bus from Sentrum',
          overview:
            'The eastern side of the bridge where the Arctic Cathedral sits on the waterfront and the Fjellheisen cable car climbs to 421m. Quieter than Sentrum, with darker sky at the base of Storsteinen. Bus 26 runs to the city centre every 10–15 minutes. Better aurora viewing from your window if skies cooperate, but noticeably fewer dining options after dark.',
          bestFor: [
            'Repeat visitors who have done Sentrum and want quieter nights',
            'Aurora viewers who want to step outside the hotel and look up',
            'Travellers using Fjellheisen cable car daily',
            'Families preferring to be out of the pub district',
          ],
          notIdealFor: [
            'First-time visitors (logistics cost of crossing the bridge)',
            'Travellers relying on walk-in restaurants at 21:00',
            'Anyone without a car or confidence with the bus network',
          ],
          accommodation: [
            {
              name: 'Tromsø Lodge & Camping',
              type: 'Cabins + camping',
              price: '950–1,900 NOK/night (cabin)',
              highlight:
                'Riverside cabins at the base of Tromsdalen valley. 2 km from Fjellheisen. Sauna, self-catering kitchen, cabin sleeps 2–6. A genuine budget option with darker sky than anywhere in Sentrum.',
            },
            {
              name: 'Private cabins and apartments',
              type: 'Airbnb / Novasol / Finn.no',
              price: '1,000–2,200 NOK/night',
              highlight:
                'The realistic Tromsdalen stock. Hotels on this side of the bridge are thin — most visitors who want the eastern base rent a private apartment or cabin around Tromsdalen, Solligården, or the Fjellheisen approach. Book 2–3 months ahead in aurora season.',
            },
            {
              name: 'Honest note on hotels',
              type: 'Tromsdalen reality',
              price: '—',
              highlight:
                'There is no Radisson Blu, Scandic, or Clarion on the Tromsdalen side. Every major hotel chain in Tromsø is on Tromsøya island in Sentrum. If you want a branded 4-star with tour pickups at the lobby, stay in Sentrum. If you want dark sky and quiet, accept that the stock here is cabins and rentals.',
            },
          ],
          dining: [
            {
              name: 'Fjellstua (top of Fjellheisen)',
              detail:
                'Restaurant at 421m above the fjord. Panoramic glass dining room overlooking Tromsøya and the Lyngen Alps. Open evenings — ride the cable car up for dinner. Book ahead.',
            },
            {
              name: 'Egon Tromsdalen',
              detail:
                'Standard Norwegian chain. Reliable, open late, kid-friendly. Steaks, burgers, fish. Not ambitious but it is open when locals-only places close.',
            },
            {
              name: 'Bus 26 to Sentrum',
              detail:
                'For serious dining, plan to cross. 10 minutes by bus, 5 minutes by car. The eastern side is genuinely thin on restaurants after 20:00.',
            },
          ],
          services: [
            { label: 'Grocery', available: true, detail: 'Rema 1000 and Coop within 10 minutes walking.' },
            { label: 'Fjellheisen cable car', available: true, detail: 'Up to Storsteinen (421m). Hours change by season; check the last departure on fjellheisen.no.' },
            { label: 'EV charging', available: true, detail: 'Rapid chargers at the Fjellheisen base.' },
            { label: 'Pharmacy', available: false, detail: 'No pharmacy on this side. Nearest in Sentrum (10 min) or K1 shopping centre.' },
            { label: 'Bus to Sentrum', available: true, detail: 'Bus 26 every 10–15 minutes. Tickets via Svipper app.' },
            { label: 'Hospital', available: false, detail: 'UNN Tromsø is on the island. 10 minutes by car. Emergency: 113.' },
          ],
          insiderTip:
            'The Fjellheisen cable car is the single best aurora viewing platform in the city. Ride up after 21:00 on a clear night with KP index 3 or above. The café on top serves hot chocolate and the terrace is wide enough to set up a tripod. Check the last descent on fjellheisen.no before you ride up. Miss it and you walk 2.5 km down the Sherpa Stairs in the dark.',
        },
        kvaloya: {
          label: 'Kvaløya',
          name: 'Kvaløya island',
          tagline: 'Dark-sky base with no light pollution, rental car required',
          population: 'Adjacent island, reached by Sandnessund bridge',
          distanceToCentre: '25 minutes by car, 45 by bus from Sentrum',
          overview:
            'The neighbouring island west of Tromsøya. Kaldfjord and Ersfjordbotn lie on the north-west side, 20 to 30 minutes from the centre. Kaldfjord was the whale-watching fjord from 2012 to 2016; since 2017 the orca and humpback feeding grounds have been in Kvænangen and Skjervøy, so whale safaris now run from Skjervøy, around 3 hours from Tromsø. Aurora viewing here is substantially better than from the city because there is no light pollution. Cabins and rorbu-style lodges dominate. This is where you base yourself if you have a rental car and want dark skies. Not for travellers eating out nightly.',
          bestFor: [
            'Travellers with a rental car and 4+ nights',
            'Serious aurora viewers (no light pollution)',
            'Photographers with tripods and patience',
            'Couples wanting a cabin rather than a hotel',
          ],
          notIdealFor: [
            'Travellers without a car (bus is slow and infrequent)',
            'Anyone relying on walking to restaurants',
            'Short stays of 1–2 nights',
            'First-time visitors to Tromsø',
          ],
          accommodation: [
            {
              name: 'Arctic Panorama Lodge',
              type: 'Cabin lodge',
              price: '1,800–3,500 NOK/night',
              highlight:
                'Wooden cabins on Uløya in the Lyngenfjord region with direct fjord views. Not on Kvaløya: about a 3-hour transfer from Tromsø including a ferry, in the same dark-sky tier. Hot tubs, sauna, self-catering kitchens. Built for aurora viewing, with large windows facing north.',
            },
            {
              name: 'Tromsø Ice Domes / Camp Tamok',
              type: 'Glass igloo + activity camp',
              price: '4,500–9,000 NOK/night',
              highlight:
                'In Tamokdalen, about 75 minutes inland from Tromsø, not on Kvaløya itself but in the same dark-sky tier. Ice hotel suites and glass igloos with aurora views from the bed. Dog sled, snowmobile, and aurora chase included in some packages.',
            },
            {
              name: 'Kvaløya cabin rentals (Airbnb/Novasol)',
              type: 'Private cabin',
              price: '1,200–2,400 NOK/night',
              highlight:
                'Significant stock of private cabins around Eidkjosen, Ersfjordbotn, and Kaldfjord. Typically 2–6 bed with kitchen and wood stove. Cheapest dark-sky option. Book via Novasol or Airbnb.',
            },
            {
              name: 'Sommarøy Arctic Hotel',
              type: '3-star fjord hotel',
              price: '1,400–2,800 NOK/night',
              highlight:
                '60 km west on Sommarøy island at the end of the Kvaløya road. White-sand beaches (yes, at 69°N), fish restaurant, fjord-view rooms. Worth the drive for 2–3 nights.',
            },
          ],
          dining: [
            {
              name: 'Bryggejentene (Ersfjordbotn)',
              detail:
                'Small seasonal restaurant on the south Kvaløya coast. Local fish, short menu, casual. Open summer only. A destination lunch if you are hiking in the area.',
            },
            {
              name: 'Sommarøy Arctic Hotel restaurant',
              detail:
                'The main sit-down option on Kvaløya. Fish soup, halibut, lamb. Open year-round. 400–650 NOK mains.',
            },
            {
              name: 'Self-catering reality',
              detail:
                'Most cabins come with kitchens because dining options are thin. Stock up at Eurospar Kvaløysletta on arrival. Fish counter in the supermarket is genuinely good.',
            },
          ],
          services: [
            { label: 'Grocery', available: true, detail: 'Eurospar Kvaløysletta and Coop Kvaløya at the bridge crossing.' },
            { label: 'Fuel', available: true, detail: 'The petrol station at Kvaløysletta and Circle K near the bridge. Fill up before driving west.' },
            { label: 'EV charging', available: true, detail: 'Slow chargers at cabins. Rapid charger at Eurospar. Plan ahead for long drives.' },
            { label: 'Pharmacy', available: false, detail: 'No pharmacy on Kvaløya. Nearest in Sentrum (25 min).' },
            { label: 'Bus to Sentrum', available: true, detail: 'Bus 42 to Sentrum. Runs hourly, less at weekends. Not a practical aurora chase method.' },
            { label: 'Hospital', available: false, detail: 'UNN Tromsø is on Tromsøya. 25–30 minutes by car. Emergency: 113.' },
          ],
          insiderTip:
            'The west coast of Kvaløya — Ersfjordbotn, Tussøya, Sommarøy — has some of the best northern sky exposure in the region. If the forecast shows clear sky west but cloud east, drive out rather than chase with a tour. KP index 3 and a clear night from Ersfjord gives you a display unfiltered by city light. Bring a thermos, park at the shoreline, and wait.',
        },
      },
    },
  },

  zh: {
    meta: {
      title: '特罗姆瑟旅游攻略2026：极光、午夜太阳、观鲸与住宿',
      description:
        '北纬69°的特罗姆瑟：9月至次年3月看北极光，5月至7月有午夜太阳，11月至次年2月出海观鲸。餐厅、行程和住宿一并介绍。',
    },
    hero: {
      alt: '夜晚的特罗姆瑟市区与港口上空的北极光，挪威北极地区',
      badge: '北极基地',
      heading: '特罗姆瑟',
      body: '北纬69°，约8万居民生活在极光椭圆带之内。9月至次年3月，极光就挂在头顶；6月太阳不落；每年11月，虎鲸群追着鲱鱼游进峡湾。这里是挪威（挪威语：Norge）的北极首府，不是明信片上的背景。',
    },
    quickAnswerLabel: '快速回答',
    quickAnswer:
      '特罗姆瑟是挪威的北极基地：北纬69°，约8万居民，从奥斯陆直飞2小时，正处于极光椭圆带下方。极光季从9月持续到次年3月，极夜（11月27日至1月15日）正午仍有微光。在这里Kp 2到3就足以让极光出现在头顶，所以唯一真正重要的条件是晴朗的天空。1,290挪威克朗起的小团追光和私人向导会从市区开出50–200公里去找晴空；如果您租了车，可以住在市中心以西25分钟车程、没有光污染的克瓦尔岛（Kvaløya）。建议停留4–7晚，极光季的酒店请提前3–6个月预订。',
    heroStats: [
      { icon: 'map-pin', text: '特罗姆瑟朗内斯机场（TOS），直飞46个目的地' },
      { icon: 'moon', text: '极夜（mørketid）：11月27日至1月15日' },
      { icon: 'sun', text: '午夜太阳：5月18日至7月26日' },
      { icon: 'thermometer', text: '全年气温在−15°C至+20°C之间' },
      { icon: 'clock', text: '建议停留4–7晚' },
    ],
    facts: [
      { label: '纬度', value: '北纬69°，位于极光椭圆带内' },
      { label: '人口', value: '约80,000' },
      { label: '极夜', value: '11月27日至1月15日（50天）' },
      { label: '午夜太阳', value: '5月18日至7月26日（69天）' },
      { label: '机场', value: '特罗姆瑟朗内斯机场（TOS）' },
      { label: '建议停留', value: '4–7晚' },
    ],
    about: {
      heading: '关于特罗姆瑟',
      paragraphs: [
        '特罗姆瑟位于北纬69°的特罗姆瑟岛（Tromsøya）上，靠桥梁和隧道连接大陆和克瓦尔岛（Kvaløya）。它是挪威北极圈以北最大的城市：约8万居民，一个仍在运作的港口，一所拥有世界最北医学院的大学，还有一家正常运转的医院。这里不是旅游前哨站，而是一座恰好位于极光椭圆带正下方的北极城市。',
        '9月至次年3月，在KP指数达到2到3的晴朗夜晚，这里就能看到北极光。任何一晚，这两个条件都没有保证。商业追光团会从市区开出50–200公里去找晴空。至少住4晚，少于4晚就是赌运气。极夜从11月27日持续到1月15日，共50天，太阳不会升到地平线以上。',
        '5月18日至7月26日，午夜太阳把昼夜颠倒过来。徒步、海上皮划艇和午夜太阳马拉松都在24小时的日光下进行。11月，虎鲸和座头鲸群追着鲱鱼游进峡湾；2017年起，它们的觅食海域转移到了距特罗姆瑟约3小时的谢尔沃伊（Skjervøy）和克韦南根（Kvænangen）一带，12月至1月是观鲸高峰。这一切都以特罗姆瑟为基地。',
      ],
      keyFacts: '基本信息',
      bestTimeHeading: '最佳旅行时间',
      bestTimeBody:
        '看北极光选9月至次年3月。看午夜太阳选5月至7月。观鲸高峰在12月至1月。11月下午三点左右天就黑了，而且常常下雨，追极光全凭运气。极夜本身从11月27日才开始。',
    },
    seasons: {
      heading: '特罗姆瑟几月去最好',
      intro: '特罗姆瑟的一切都跟着光线走。能做什么、能看到什么，随季节完全不同。',
      windows: [
        {
          label: '北极光',
          months: '9月至次年3月',
          detail:
            '极光椭圆带正好位于特罗姆瑟上空。晴朗的夜晚，KP指数达到3以上，极光就会出现在头顶。商业追光团会开车50–200公里去找晴空。至少订4晚，云量是您无法控制的变数。',
        },
        {
          label: '午夜太阳',
          months: '5月至7月',
          detail:
            '5月18日至7月26日，太阳不落。午夜太阳马拉松（Midnight Sun Marathon）在傍晚起跑，冲线时天色依然大亮。徒步、海上皮划艇和沿海骑行，都在24小时的金色光线下进行。',
        },
        {
          label: '观鲸',
          months: '11月至次年2月',
          detail:
            '从11月起，虎鲸和座头鲸群追着鲱鱼游进峡湾，12月至1月是高峰。2017年起，觅食海域转移到了克韦南根（Kvænangen）和谢尔沃伊（Skjervøy）一带，观鲸船现在从距特罗姆瑟约3小时的谢尔沃伊出发。运营商称高峰期目击率达90%。可选RIB快艇或传统船只。',
        },
        {
          label: '狗拉雪橇与活动',
          months: '1月至3月',
          detail:
            '欧洲最长的狗拉雪橇赛芬马克赛（Finnmarksløpet）3月在阿尔塔出发。特罗姆瑟1月举办北极光节（Nordlysfestivalen）和国际电影节。冬季是最忙的季节，行程和住宿都要尽早预订。',
        },
      ],
    },
    gettingThere: {
      heading: '怎样去特罗姆瑟',
      flights: {
        title: '奥斯陆（OSL）直飞特罗姆瑟（TOS）',
        body: '北欧航空（SAS）和挪威航空（Norwegian）每天多个航班。飞行时间2小时。平季往返票价 NOK 799 起。冬季极光季请提前6-8周预订。',
        cta: '搜索航班',
      },
      hurtigruten: {
        title: '海达路德（Hurtigruten）沿海客轮',
        body: '特罗姆瑟是卑尔根至希尔克内斯（Kirkenes）沿海航线的停靠港。北行船从卑尔根出发约四天后到达，下午停靠特罗姆瑟。建议飞进来，再坐一段船离开。',
        cta: '查看航次',
      },
      driving: {
        title: '自驾：从芬兰走E8，或从南边走E6',
        body: '从纳尔维克（Narvik）出发：走E6和E8约245公里，夏季需要3.5到4小时。从斯基博滕（Skibotn）走E8：2小时。斯基博滕在挪威境内，沿E8再往上约45公里才是基尔皮斯耶尔维（Kilpisjärvi）的芬兰边境。冬季路况需要时必须使用冬季轮胎。钉胎不是强制的，但在特罗姆斯（Troms）、诺尔兰（Nordland）和芬马克（Finnmark）允许在10月16日至4月30日使用，挪威其他地区为11月1日至复活节星期一后的第一个星期日。',
        cta: '比较租车价格',
      },
      bus: {
        title: '从纳尔维克乘快线巴士',
        body: 'Svipper快线巴士（特罗姆斯郡公共交通）从纳尔维克到特罗姆瑟需4小时，每天多班。从斯德哥尔摩经奥福滕铁路（Ofoten Line）有直达纳尔维克的火车。对坐火车来的旅行者来说，这是一条沿途风景很好的进入路线。',
        cta: '在Svipper上订票',
      },
    },
    itineraries: {
      heading: '包含特罗姆瑟的行程',
      intro: '以特罗姆瑟为北极基地的多日路线。',
      items: [
        '特罗姆瑟7天极光周：4次追极光、1次观鲸、1次狗拉雪橇、1天休息',
        '罗弗敦群岛至特罗姆瑟10天自驾：飞到博德（Bodø），沿E10公路穿越罗弗敦群岛，再坐船到特罗姆瑟',
        '5天午夜太阳紧凑行程（6月）：塞尼亚岛一日游、卡尔峡湾海上皮划艇、在午夜太阳下坐Fjellheisen缆车',
        '14天北极圈之旅：从奥斯陆到特罗姆瑟，海达路德加陆路分段，可选斯瓦尔巴群岛',
      ],
    },
    expert: {
      alt: 'Bjørn Haugen，NorgeTravel 北极野外编辑',
      zone: '北极地区',
      role: 'Arktisk feltekspert | 北极野外编辑',
      bio: '持有DNT（挪威徒步协会）认证的向导，在挪威北部（Nord-Norge）和斯瓦尔巴群岛工作了25年，曾是特罗姆瑟的搜救志愿者。他很清楚，为什么旅游局照片里的极光不是您第一晚会看到的样子，也知道怎样为您真正会看到的那种做好准备。',
    },
    faqHeading: '常见问题',
    faq: [
      {
        question: '怎样去特罗姆瑟？从奥斯陆要多久？',
        answer:
          '坐飞机。北欧航空（SAS）和挪威航空（Norwegian）每天多班从奥斯陆（OSL）直飞特罗姆瑟（TOS），飞行时间2小时；平季往返票价NOK 799起，冬季极光季请提前6–8周预订。海达路德（Hurtigruten）沿海客轮从卑尔根出发约四天后停靠特罗姆瑟。自驾的话，从纳尔维克（Narvik）走E6和E8约245公里，夏季需要3.5到4小时；Svipper快线巴士需4小时。',
      },
      {
        question: '什么时候去特罗姆瑟：看极光还是看午夜太阳？',
        answer:
          '看极光选9月至次年3月，晴朗的夜晚Kp指数达到2到3就能看到。看午夜太阳选5月18日至7月26日，太阳不落，徒步、海上皮划艇和午夜太阳马拉松都在24小时的日光下进行。观鲸高峰在12月至1月。11月下午三点左右天就黑了，而且常常下雨，那时追光全凭运气。',
      },
      {
        question: '特罗姆瑟住在哪里好？',
        answer:
          '第一次来的人应该住市中心（Sentrum），就在特罗姆瑟岛上：Scandic Ishavshotel和Clarion The Edge等港口酒店是大多数极光和观鲸行程的接送点，城里所有认真做菜的餐厅都在步行范围内。桥对面的特罗姆斯达伦（Tromsdalen）夜晚更安静，有Fjellheisen缆车，坐巴士10分钟到市中心。克瓦尔岛（Kvaløya）在市中心以西25分钟车程，没有光污染，但需要租车。极光季的酒店请提前3–6个月预订，市中心最先订满。',
      },
      {
        question: '特罗姆瑟要玩几天？',
        answer:
          '建议住4–7晚。极光需要晴空，而云量是您无法控制的变数，所以至少4晚才有现实的机会，少于4晚就是赌运气。7天的冬季行程可以安排4次追极光、1次观鲸、1次狗拉雪橇和1天休息。6月的话，5天可以安排塞尼亚岛一日游、卡尔峡湾海上皮划艇和在午夜太阳下坐Fjellheisen缆车。',
      },
      {
        question: '冬天在特罗姆瑟除了看极光还能做什么？',
        answer:
          '观鲸：11月至次年2月，虎鲸和座头鲸群追着鲱鱼游进谢尔沃伊（Skjervøy）和克韦南根（Kvænangen）一带的峡湾，距特罗姆瑟约3小时，12月至1月是高峰，高峰期目击率90%，船票1,450挪威克朗起。哈士奇雪橇从距特罗姆瑟约75分钟车程的塔莫克山谷（Tamokdalen）Camp Tamok狗场出发，2,800挪威克朗起；由萨米人带领、晚上可看极光的驯鹿营地2,190挪威克朗起。Fjellheisen缆车4分钟到达海拔421米的Storsteinen，同一座山上的夏尔巴阶梯全年可走，冬季需要简易冰爪。',
      },
      {
        question: '极夜期间特罗姆瑟白天全是黑的吗？',
        answer:
          '不是。极夜从11月27日持续到1月15日，共50天，太阳不会升到地平线以上，但正午仍有微光。极夜开始前，11月下午三点左右天就已经黑了。天黑的时段正是能看到极光的时段，而城市照常运转：约8万居民、一所大学、一家医院和一个仍在运作的港口。',
      },
    ],
    cta: {
      heading: '准备好预订特罗姆瑟了吗？',
      body: '极光团、观鲸和北极徒步，全部使用佣金透明的联盟链接。',
      northernLights: '极光团',
      northernNorway: '挪威北部总览',
    },
    share: { title: '特罗姆瑟旅游攻略', label: '分享本页' },
    activities: {
      heading: '在特罗姆瑟做什么',
      intro:
        '特罗姆瑟位于北纬69°，正处在极光椭圆带下方。约8万居民，一个仍在运作的港口，一所大学，是一座正常运转的北极城市。极光季从9月到次年3月，午夜太阳从5月18日到7月26日。下面每一项都是可以在市区预订的实际选择，或者开车45分钟内就能到达的步道起点。',
      tabs: { featured: '精选', tours: '行程', hiking: '徒步', eat: '去哪儿吃' },
      bookTour: '预订行程',
      checkAvailability: '查看可订日期',
      viewAllTours: '在GetYourGuide查看全部特罗姆瑟行程',
      readGuide: '阅读攻略',
      ratingTitle: 'NorgeTravel评分（满分10分）',
      rated: 'NorgeTravel评分',
      difficulty: { Easy: '容易', Moderate: '中等', Hard: '困难' },
      featured: {
        aurora: {
          title: '乘小巴追极光',
          description:
            '持证的特罗姆瑟向导开车追踪晴空，一晚最多开200公里去找极光。18:00出发，6–8小时。至少订4晚。云量是唯一无法控制的变数。',
          duration: '6–8小时',
          price: '1,290挪威克朗起',
          season: '9月至次年3月',
          linkLabel: '查看可订日期',
        },
        whales: {
          title: '从谢尔沃伊出发观鲸',
          description:
            '11月至次年2月，虎鲸和座头鲸群追着鲱鱼游进谢尔沃伊（Skjervøy）和克韦南根（Kvænangen）一带的峡湾，距特罗姆瑟约3小时。高峰在12月至1月。RIB快艇能带您靠得更近；传统船只在漫长的一天里更暖和。高峰期目击率90%。',
          duration: '4–6小时',
          price: '1,450挪威克朗起',
          season: '11月至次年2月',
          linkLabel: '查看可订日期',
        },
        fjellheisen: {
          title: '乘Fjellheisen缆车上Storsteinen',
          description:
            '从特罗姆斯达伦（Tromsdalen）的Solliveien乘缆车，4分钟到达海拔421米的Storsteinen平台。运营时间和票价随季节变化，出发前请在fjellheisen.no查看。想离开城市灯光，这通常是最快的办法。',
          duration: '1–3小时',
          price: '票价随季节变化',
          season: '全年',
          linkLabel: '阅读步道攻略',
        },
        senja: {
          title: '塞尼亚岛一日游：Segla峰和海岸',
          description:
            '挪威第二大岛，从特罗姆瑟开车2.5小时，途中坐塞尼亚渡轮（Brensholmen至Botnhamn）。Segla峰（639米）、空旷的海滩，还有仍在作业的渔村。挪威国家旅游路线贯穿西海岸。',
          duration: '全天',
          price: '1,200挪威克朗起（含向导）',
          season: '5月至9月',
          linkLabel: '查看向导团',
        },
      },
      tours: {
        aurora: {
          name: '特罗姆瑟追极光（小团）',
          type: '北极光，6–8小时',
          price: '1,290挪威克朗起',
          duration: '6–8小时',
          highlight:
            '持证特罗姆瑟向导带领的小团小巴追光。实时云量预报。含热饮和三脚架。看不到极光可免费改期。',
        },
        whales: {
          name: '谢尔沃伊观鲸（混合动力船）',
          type: '观鲸，5–6小时',
          price: '1,450挪威克朗起',
          duration: '5–6小时',
          highlight:
            '静音的混合动力推进让船更接近虎鲸群，又不惊扰鲱鱼群。仅限11月至次年2月。有暖气的室内休息舱、户外甲板和保暖连体服。',
        },
        husky: {
          name: '哈士奇雪橇加极光套餐',
          type: '冬季探险，4–5小时',
          price: '2,800挪威克朗起',
          duration: '4–5小时',
          highlight:
            '傍晚从塔莫克山谷（Tamokdalen）的Camp Tamok狗场出发，距特罗姆瑟约75分钟车程。运营商会追踪极光预报，条件合适就延长停留。含保暖服、靴子和晚餐。',
        },
        sami: {
          name: '萨米驯鹿营地与极光',
          type: '文化加极光，5–7小时',
          price: '2,190挪威克朗起',
          duration: '5–7小时',
          highlight:
            '由萨米人拥有、萨米人带领。喂驯鹿，听一段约伊克（joik，萨米传统吟唱），了解萨米牧民和鹿群之间真实的工作关系。晚上天晴的话，可以在拉伏帐篷（lavvu，萨米传统帐篷）看极光。',
        },
      },
      trails: {
        sherpatrappa: {
          name: '夏尔巴阶梯（Sherpatrappa）经Storsteinen到Fløya',
          distance: '往返5公里',
          elevation: '670米（到Fløya）',
          time: '3–5小时',
          description:
            '尼泊尔夏尔巴人修建的1,200级石阶，从特罗姆斯达伦（Tromsdalen）通到Storsteinen（421米，缆车上站），可以继续走到Fløya山顶（671米）。从市区就能到达的步道，全年可走，冬季需要简易冰爪。DNT（挪威徒步协会）蓝色等级。',
        },
        tromsdalstinden: {
          name: 'Tromsdalstinden登顶',
          distance: '往返18公里',
          elevation: '1,100米',
          time: '8–10小时',
          description:
            '特罗姆瑟上方标志性的1,238米山峰。起点在Tromsødalen，要穿过苔原和碎石坡走很长一段，最后攀爬到山顶石堆。仅限夏季（7月至9月）。DNT红色等级，须完整遵守挪威山地守则（Fjellvettreglene）。',
        },
        rodtinden: {
          name: '克瓦尔岛的Rødtinden',
          distance: '往返6公里',
          elevation: '600米',
          time: '4–5小时',
          description:
            'Ersfjord上方644米的山峰，从特罗姆瑟开车30分钟。起点在Finnvika。沿标记路线稳步上升，接近山顶有一小段巨石攀爬。DNT蓝色等级，含攀爬路段。山顶可以越过克瓦尔岛远眺林根阿尔卑斯山（Lyngen Alps）。',
        },
        bonntuva: {
          name: '克瓦尔岛的Bønntuva',
          distance: '往返5公里',
          elevation: '500米',
          time: '3–4小时',
          description:
            '克瓦尔岛上615米、适合全家的山峰，距特罗姆瑟35分钟。起点在Eidkjosen。标记清楚，无需攀爬，坡度平缓。DNT蓝色等级。山顶向南可以越过Malangen峡湾望到塞尼亚岛。',
        },
      },
      restaurants: featuredRestaurants({
        'emmas-drommekjokken': {
          cuisine: '挪威菜',
          priceRange: '每人650–900挪威克朗',
          highlight:
            '这份北极品鉴菜单让特罗姆瑟成了值得专程来吃的城市。厨房用技艺和克制处理北方食材（驯鹿、帝王蟹、云莓）。七道菜。餐厅只有30个座位。极光季请至少提前两周预订。',
        },
        'bardus-bistro': {
          cuisine: '海鲜',
          priceRange: '每人350–500挪威克朗',
          highlight:
            '本地人真正常去的小馆，就在市图书馆旁边。鳕鱼、当季的洄游鳕鱼（skrei），还有一道鱼汤，特罗姆瑟居民争论了十年，说它是挪威最好的。没有品鉴菜单，只有实实在在的北方海鲜，价格不用您再去抵押房子。',
        },
        'aunegarden': {
          cuisine: '本地传统菜',
          priceRange: '每人500–750挪威克朗',
          highlight:
            '在一栋1838年的木屋里吃挪威北部传统菜。驯鹿炖肉、盐腌风干羊排（pinnekjøtt）和鳕鱼干，用的是比旅游业还早的老菜谱。光是这栋房子就值得订个位子。',
        },
        'skarven': {
          cuisine: '酒吧',
          priceRange: '每人200–380挪威克朗',
          highlight:
            '特罗姆瑟最长寿的酒吧。渔民、学生和游客坐在同一张桌子旁，谁也不用做样子给别人看。菜单上有鳕鱼舌（torsketunge），因为它本就该在：裹面粉用鸭油煎，自从渔业建起这座城市，它就是特罗姆瑟的家常菜。这里供应的Mack啤酒如今产自南边70公里的Nordkjosbotn，酒厂2012年搬到了那里。',
        },
      }),
    },
    basecamps: {
      heading: '住在哪里',
      intro:
        '三个落脚区域，在便利、价格和夜空暗度之间各有取舍。住市中心（Sentrum），您就在港口边，所有行程都在门口接人。住特罗姆斯达伦（Tromsdalen），换来安静的夜晚和Fjellheisen缆车。住克瓦尔岛（Kvaløya），没有光污染，前提是您租了车。',
      bestFor: '适合',
      notIdealFor: '不太适合',
      accommodation: '住宿',
      dining: '餐饮',
      services: '实用服务',
      localTip: '本地建议',
      leadTimes: {
        title: '提前预订时间',
        gap: '',
        items: [
          {
            label: '极光季（11月至次年3月）：',
            body: '酒店请提前3–6个月预订。市中心最先订满。1月至2月的高峰日期，Scandic Ishavshotel和Clarion With在10月前就会订满。',
          },
          {
            label: '午夜太阳季（6月至7月）：',
            body: '通常提前2–3个月就够。价格比极光高峰低30–40%。',
          },
          {
            label: '平季（9月至10月、4月至5月）：',
            body: '临时预订通常没问题。9月仍有可能看到极光，价格比1月便宜。',
          },
        ],
      },
      bases: {
        sentrum: {
          label: '市中心',
          name: '市中心（Sentrum）',
          tagline: '步行可到港口、Storgata大街和行程接送点',
          population: '特罗姆瑟岛（Tromsøya）',
          distanceToCentre: '您就在这里',
          overview:
            '特罗姆瑟岛上的海滨地带，大多数第一次来的人都应该住这里。Scandic Ishavshotel和Clarion The Edge就在港口边，有峡湾景观房。极光季里，几乎每小时都有行程从Scandic接人。步行可到Mathallen美食市场、极地博物馆、Mack的Ølhallen啤酒馆，以及城里所有认真做菜的餐厅。',
          bestFor: [
            '第一次来特罗姆瑟的旅行者',
            '没有租车的旅行者',
            '参加商业追光团、需要接送的人',
            '参加观鲸团的游客（行程从市中心出发）',
            '希望步行就能找到晚餐的人',
          ],
          notIdealFor: [
            '想在阳台上看暗夜极光的人（有光污染）',
            '极光旺季的预算旅行者（价格飙升）',
            '想要安静的旅行者（Storgata大街热闹到很晚）',
          ],
          accommodation: [
            {
              name: 'Scandic Ishavshotel',
              type: '四星级酒店',
              price: '每晚2,200–4,500挪威克朗',
              highlight:
                '就在港口边，三角形玻璃外立面，有峡湾景观房。这里是特罗姆瑟旅游业的运作中心，大多数极光和观鲸行程都从大堂接人。顶楼有全景酒吧。含早餐。',
            },
            {
              name: 'Clarion Hotel The Edge 与 Clarion Collection Hotel With',
              type: '四星级港口酒店',
              price: '每晚1,900–4,000挪威克朗',
              highlight:
                '港口边两家各自独立的酒店。Clarion Hotel The Edge是2014年开业的大型酒店，11楼的顶层酒吧可以俯瞰港口和北极大教堂。Clarion Collection Hotel With是规模较小的港口酒店，房价含下午华夫饼和晚餐。',
            },
            {
              name: 'Radisson Blu Hotel Tromsø',
              type: '四星级酒店',
              price: '每晚1,800–3,800挪威克朗',
              highlight:
                '位于市中心Storgata大街。中高档，稳定可靠。楼下有Yonas餐厅。Scandic和Clarion订满时（1月至3月经常如此），这里是不错的备选。',
            },
            {
              name: 'Smarthotel Tromsø',
              type: '经济型酒店',
              price: '每晚1,100–2,200挪威克朗',
              highlight:
                '房间小，位置居中。极光季市中心真正的经济选择。没有餐厅，没有附加服务。尽早预订。',
            },
          ],
          dining: [
            {
              name: 'Emmas Drømmekjøkken',
              detail:
                '本地老店。楼上是斯堪的纳维亚精致餐饮，楼下是小酒馆（Emmas Under）。北极红点鲑、驯鹿、帝王蟹。主菜500–800挪威克朗。极光季请提前2–3周预订。',
            },
            {
              name: 'Bardus Bistro',
              detail:
                '紧邻市图书馆和特罗姆瑟文化中心的现代北欧小厨房。季节菜单，菜不多，做得有把握。很受本地人欢迎。主菜400–650挪威克朗。',
            },
            {
              name: 'Fiskekompaniet',
              detail:
                '港口边的海鲜餐厅。帝王蟹、扇贝、大比目鱼。做法直接，食材上乘。主菜450–750挪威克朗。',
            },
            {
              name: 'Mathallen Tromsø',
              detail:
                'Grønnegata街上的美食市场。本地生产者集中在一个屋檐下：北极奶酪、熏鱼、面包房、小咖啡馆。适合吃午饭，不适合吃晚饭。',
            },
          ],
          services: [
            { label: '超市', available: true, detail: '步行5分钟内有Kiwi、Rema 1000、Coop Mega。' },
            { label: '租车', available: true, detail: 'Hertz、Avis、Europcar。建议在机场取车，而不是在市区柜台。' },
            { label: '电动车充电', available: true, detail: '有多个酒店附属和公共充电桩，Radisson Blu也有。Fjellheisen有快充。' },
            { label: '药店', available: true, detail: 'Storgata大街上有Apotek 1。可通过电话订购享受24小时服务。' },
            { label: '医院', available: true, detail: 'UNN Tromsø，挪威北部大学医院。急救电话：113。' },
            { label: '行程接送点', available: true, detail: 'Scandic Ishavshotel和Radisson Blu是极光团的主要接送点。' },
          ],
          insiderTip:
            '先订极光团，再订酒店，顺序别反。1月至3月，运营商提前4–6周就会订满。如果您想参加的团（Chasing Lights、Tromsø Friluftsenter）第一晚满了、第三晚还有位，就按它调整日期。市中心总能找到一间房。',
        },
        tromsdalen: {
          label: '特罗姆斯达伦',
          name: '特罗姆斯达伦（Tromsdalen，大陆一侧）',
          tagline: '北极大教堂和Fjellheisen缆车就在门口',
          population: '特罗姆瑟大桥的大陆一侧',
          distanceToCentre: '距市中心开车或坐巴士10分钟',
          overview:
            '大桥东侧，北极大教堂立在海边，Fjellheisen缆车爬升到421米。比市中心安静，Storsteinen山脚下的夜空也更暗。26路巴士每10–15分钟一班开往市中心。天公作美的话，从窗口看极光效果更好，但天黑后吃饭的选择明显少了。',
          bestFor: [
            '去过市中心、想要更安静夜晚的回头客',
            '想走出酒店抬头就看极光的人',
            '每天都坐Fjellheisen缆车的旅行者',
            '想远离酒吧区的家庭',
          ],
          notIdealFor: [
            '第一次来的旅行者（过桥的交通成本）',
            '指望21:00随便走进一家餐厅的人',
            '没有车、也不熟悉巴士线路的人',
          ],
          accommodation: [
            {
              name: 'Tromsø Lodge & Camping',
              type: '小木屋加露营',
              price: '每晚950–1,900挪威克朗（小木屋）',
              highlight:
                '特罗姆斯达伦山谷谷口的河边小木屋。距Fjellheisen 2公里。有桑拿、自炊厨房，小木屋可住2–6人。真正的经济选择，夜空比市中心任何地方都暗。',
            },
            {
              name: '私人小木屋和公寓',
              type: 'Airbnb / Novasol / Finn.no',
              price: '每晚1,000–2,200挪威克朗',
              highlight:
                '这才是特罗姆斯达伦实际能订到的房源。桥这一侧酒店很少，大多数想住东侧的游客会在特罗姆斯达伦、Solligården或Fjellheisen附近租私人公寓或小木屋。极光季请提前2–3个月预订。',
            },
            {
              name: '关于酒店的实话',
              type: '特罗姆斯达伦的现实',
              price: '不适用',
              highlight:
                '特罗姆斯达伦这一侧没有Radisson Blu、Scandic或Clarion。特罗姆瑟所有大型连锁酒店都在特罗姆瑟岛的市中心。如果您想住大堂就有行程接送的品牌四星酒店，就住市中心。如果您想要暗夜和安静，就接受这里只有小木屋和出租房。',
            },
          ],
          dining: [
            {
              name: 'Fjellstua（Fjellheisen山顶）',
              detail:
                '峡湾上方421米的餐厅。玻璃全景餐厅俯瞰特罗姆瑟岛和林根阿尔卑斯山。晚上营业，可以坐缆车上去吃晚饭。请提前预订。',
            },
            {
              name: 'Egon Tromsdalen',
              detail:
                '普通的挪威连锁餐厅。可靠，营业到很晚，适合带孩子。牛排、汉堡、鱼。谈不上有追求，但本地人去的小店关门后它还开着。',
            },
            {
              name: '坐26路巴士去市中心',
              detail:
                '想好好吃一顿就得过桥。巴士10分钟，开车5分钟。东侧20:00以后餐厅确实很少。',
            },
          ],
          services: [
            { label: '超市', available: true, detail: '步行10分钟内有Rema 1000和Coop。' },
            { label: 'Fjellheisen缆车', available: true, detail: '上到Storsteinen（421米）。运营时间随季节变化，末班时间请查看fjellheisen.no。' },
            { label: '电动车充电', available: true, detail: 'Fjellheisen山脚有快充。' },
            { label: '药店', available: false, detail: '这一侧没有药店。最近的在市中心（10分钟）或K1购物中心。' },
            { label: '去市中心的巴士', available: true, detail: '26路每10–15分钟一班。用Svipper应用买票。' },
            { label: '医院', available: false, detail: 'UNN Tromsø在岛上。开车10分钟。急救电话：113。' },
          ],
          insiderTip:
            'Fjellheisen缆车是城里最好的极光观赏平台。晴朗的夜晚、KP指数3以上时，21:00以后坐上去。山顶的咖啡馆有热巧克力，露台宽得足够架三脚架。上山前先在fjellheisen.no查好末班下山时间。错过了，就得摸黑走夏尔巴阶梯下山2.5公里。',
        },
        kvaloya: {
          label: '克瓦尔岛',
          name: '克瓦尔岛（Kvaløya）',
          tagline: '没有光污染的暗夜基地，需要租车',
          population: '相邻的岛，经Sandnessund大桥到达',
          distanceToCentre: '距市中心开车25分钟，坐巴士45分钟',
          overview:
            '特罗姆瑟岛西边的邻岛。卡尔峡湾（Kaldfjord）和Ersfjordbotn在岛的西北侧，距市中心20到30分钟。2012至2016年，卡尔峡湾曾是观鲸的峡湾；2017年起，虎鲸和座头鲸的觅食海域转移到了克韦南根（Kvænangen）和谢尔沃伊（Skjervøy），观鲸船现在从距特罗姆瑟约3小时的谢尔沃伊出发。这里看极光比在城里好得多，因为没有光污染。住宿以小木屋和渔人小屋（rorbu）式旅舍为主。如果您有租车又想要暗夜，就把基地放在这里。不适合每晚都下馆子的旅行者。',
          bestFor: [
            '有租车、住4晚以上的旅行者',
            '认真看极光的人（没有光污染）',
            '带三脚架、有耐心的摄影师',
            '想住小木屋而不是酒店的情侣',
          ],
          notIdealFor: [
            '没有车的旅行者（巴士慢且班次少）',
            '指望步行去餐厅的人',
            '只住1–2晚的短途停留',
            '第一次来特罗姆瑟的旅行者',
          ],
          accommodation: [
            {
              name: 'Arctic Panorama Lodge',
              type: '小木屋度假村',
              price: '每晚1,800–3,500挪威克朗',
              highlight:
                '位于林根峡湾（Lyngenfjord）地区乌勒岛（Uløya）上的木屋，直面峡湾。不在克瓦尔岛上：从特罗姆瑟过去约3小时，含一段渡轮，但夜空同样暗。有热水浴缸、桑拿、自炊厨房。为看极光而建，大窗朝北。',
            },
            {
              name: 'Tromsø Ice Domes / Camp Tamok',
              type: '玻璃屋加活动营地',
              price: '每晚4,500–9,000挪威克朗',
              highlight:
                '位于塔莫克山谷（Tamokdalen），从特罗姆瑟往内陆约75分钟车程，不在克瓦尔岛上，但夜空同样暗。冰酒店套房和玻璃屋，躺在床上就能看极光。部分套餐含狗拉雪橇、雪地摩托和追极光。',
            },
            {
              name: '克瓦尔岛小木屋出租（Airbnb/Novasol）',
              type: '私人小木屋',
              price: '每晚1,200–2,400挪威克朗',
              highlight:
                'Eidkjosen、Ersfjordbotn和卡尔峡湾一带有大量私人小木屋。通常2–6个床位，带厨房和柴炉。最便宜的暗夜选择。通过Novasol或Airbnb预订。',
            },
            {
              name: 'Sommarøy Arctic Hotel',
              type: '三星级峡湾酒店',
              price: '每晚1,400–2,800挪威克朗',
              highlight:
                '向西60公里，在克瓦尔岛公路尽头的松马岛（Sommarøy）上。白沙海滩（没错，在北纬69°），鱼餐厅，峡湾景观房。值得开车过去住2–3晚。',
            },
          ],
          dining: [
            {
              name: 'Bryggejentene（Ersfjordbotn）',
              detail:
                '克瓦尔岛南岸的小型季节餐厅。本地鱼，菜单很短，气氛随意。仅夏季营业。如果您在附近徒步，值得专门来吃午饭。',
            },
            {
              name: 'Sommarøy Arctic Hotel餐厅',
              detail:
                '克瓦尔岛上主要的正餐选择。鱼汤、大比目鱼、羊肉。全年营业。主菜400–650挪威克朗。',
            },
            {
              name: '自己做饭的现实',
              detail:
                '大多数小木屋都带厨房，因为外面吃饭的选择很少。到达时在Eurospar Kvaløysletta采购。超市的鱼柜台确实不错。',
            },
          ],
          services: [
            { label: '超市', available: true, detail: '过桥处有Eurospar Kvaløysletta和Coop Kvaløya。' },
            { label: '加油', available: true, detail: '桥附近有Kvaløysletta的加油站和Circle K。往西开之前加满油。' },
            { label: '电动车充电', available: true, detail: '小木屋有慢充。Eurospar有快充。长途驾驶要提前规划。' },
            { label: '药店', available: false, detail: '克瓦尔岛没有药店。最近的在市中心（25分钟）。' },
            { label: '去市中心的巴士', available: true, detail: '42路开往市中心。每小时一班，周末更少。不适合用来追极光。' },
            { label: '医院', available: false, detail: 'UNN Tromsø在特罗姆瑟岛上。开车25–30分钟。急救电话：113。' },
          ],
          insiderTip:
            '克瓦尔岛西海岸的Ersfjordbotn、Tussøya和松马岛，是这一带北方天空视野最好的地方之一。如果预报显示西边晴、东边多云，就自己开车出去，别跟团追。KP指数3、Ersfjord的晴夜，您看到的极光不受城市灯光干扰。带上保温瓶，在海边停车，等着。',
        },
      },
    },
  },

  ja: {
    meta: {
      title: 'トロムソ観光ガイド2026：オーロラ、白夜、ホエールウォッチング、宿泊エリア',
      description:
        '北緯69度のトロムソ。オーロラは9〜3月、白夜は5〜7月、ホエールサファリは11〜2月。レストラン、ツアー、宿泊先を紹介します。',
    },
    hero: {
      alt: 'オーロラが出た夜のトロムソ市街と港、ノルウェー北極圏',
      badge: '北極圏の拠点',
      heading: 'トロムソ',
      body: '北緯69度。オーロラオーバルの内側に約8万人が暮らしています。9〜3月はオーロラが頭上に現れ、6月は太陽が沈まず、毎年11月にはシャチの群れがニシンを追ってフィヨルドに入ってきます。ここはノルウェー（ノルウェー語：Norge）の北極圏の首都であって、絵はがきの背景ではありません。',
    },
    quickAnswerLabel: '要点',
    quickAnswer:
      'トロムソはノルウェーの北極圏の拠点で、北緯69度、人口約8万人、オスロから直行便で2時間、オーロラオーバルの真下にあります。オーロラシーズンは9〜3月で、極夜（11月27日〜1月15日）でも正午には薄明かりがあります。ここではKp 2〜3で頭上にオーロラが出るため、本当に重要な条件は晴れた空だけです。1,290クローネからの少人数追跡ツアーやプライベートガイドは晴れ間を探して市内から50〜200km走り、レンタカーがあれば中心部から西へ車で25分、光害のないクヴァル島（Kvaløya）を拠点にできます。滞在は4〜7泊、オーロラシーズンのホテルは3〜6か月前に予約してください。',
    heroStats: [
      { icon: 'map-pin', text: 'トロムソ・ラングネス空港（TOS）、直行便の就航先46か所' },
      { icon: 'moon', text: '極夜（mørketid、モルケティ）：11月27日〜1月15日' },
      { icon: 'sun', text: '白夜：5月18日〜7月26日' },
      { icon: 'thermometer', text: '年間の気温は−15°C〜+20°C' },
      { icon: 'clock', text: 'おすすめの滞在は4〜7泊' },
    ],
    facts: [
      { label: '緯度', value: '北緯69度、オーロラオーバルの内側' },
      { label: '人口', value: '約80,000人' },
      { label: '極夜', value: '11月27日〜1月15日（50日間）' },
      { label: '白夜', value: '5月18日〜7月26日（69日間）' },
      { label: '空港', value: 'トロムソ・ラングネス空港（TOS）' },
      { label: 'おすすめの滞在', value: '4〜7泊' },
    ],
    about: {
      heading: 'トロムソについて',
      paragraphs: [
        'トロムソは北緯69度のトロムソ島（Tromsøya）にあり、橋とトンネルで本土とクヴァル島（Kvaløya）につながっています。ノルウェーの北極圏で最大の都市で、人口は約8万人。現役の港、世界最北の医学部を持つ大学、きちんと機能している病院があります。観光客向けの前哨地ではありません。たまたまオーロラオーバルの真下にある北極圏の都市です。',
        'ここでは9〜3月、KP指数が2〜3に達した晴れた夜にオーロラが現れます。どちらの条件も、その夜に満たされる保証はありません。ツアーは晴れ間を求めて市内から50〜200km走ります。最低4泊。それより短いと賭けになります。極夜は11月27日から1月15日までの50日間で、太陽が地平線の上に昇りません。',
        '5月18日から7月26日までは白夜で、昼夜の感覚が逆転します。ハイキング、シーカヤック、ミッドナイトサン・マラソンは24時間の明るさの中で行われます。11月にはシャチとザトウクジラの群れがニシンを追ってフィヨルドに入ってきます。2017年以降、その餌場はトロムソから約3時間のシェルヴォイ（Skjervøy）とクヴェーナンゲン（Kvænangen）周辺に移り、12〜1月がホエールウォッチングのピークです。そのすべての拠点がトロムソです。',
      ],
      keyFacts: '基本データ',
      bestTimeHeading: 'ベストシーズン',
      bestTimeBody:
        'オーロラなら9〜3月。白夜なら5〜7月。クジラのピークは12〜1月。11月は午後の半ばには暗くなり、雨も多いので、オーロラ追跡は当たり外れが大きくなります。極夜そのものは11月27日に始まります。',
    },
    seasons: {
      heading: 'トロムソを訪れる時期',
      intro: 'トロムソは光で動く町です。できること、見られるものは季節でまったく変わります。',
      windows: [
        {
          label: 'オーロラ',
          months: '9〜3月',
          detail:
            'オーロラオーバルはトロムソの真上にあります。晴れた夜にKP指数が3以上なら、オーロラは頭上に現れます。ツアーは晴れ間を求めて50〜200km走ります。最低4泊は予約してください。雲だけはどうにもできません。',
        },
        {
          label: '白夜',
          months: '5〜7月',
          detail:
            '5月18日から7月26日まで太陽が沈みません。ミッドナイトサン・マラソンは夕方にスタートし、真昼のような明るさの中でゴールします。ハイキング、シーカヤック、海沿いのサイクリングを、24時間続く黄金色の光の中で楽しめます。',
        },
        {
          label: 'ホエールウォッチング',
          months: '11〜2月',
          detail:
            '11月からシャチとザトウクジラの群れがニシンを追ってフィヨルドに入ってきます。ピークは12〜1月です。2017年以降、餌場はクヴェーナンゲン（Kvænangen）とシェルヴォイ（Skjervøy）周辺に移ったため、ホエールサファリは現在、トロムソから約3時間のシェルヴォイから出ています。ツアー会社によると、ピーク時の遭遇率は90%です。RIBボートか従来型の船を選べます。',
        },
        {
          label: '犬ぞりとイベント',
          months: '1〜3月',
          detail:
            'ヨーロッパ最長の犬ぞりレース、フィンマルクスロペット（Finnmarksløpet）は3月にアルタからスタートします。トロムソでは1月にオーロラ・フェスティバル（Nordlysfestivalen）と国際映画祭が開かれます。冬は最も忙しい季節なので、ツアーと宿は早めに予約してください。',
        },
      ],
    },
    gettingThere: {
      heading: 'トロムソへの行き方',
      flights: {
        title: 'オスロ（OSL）からトロムソ（TOS）への直行便',
        body: 'スカンジナビア航空（SAS）とノルウェー・エアシャトル（Norwegian）が毎日複数便を運航しています。飛行時間は2時間。ショルダーシーズンなら往復NOK 799から。冬のオーロラシーズンは6〜8週間前に予約してください。',
        cta: '航空券を検索',
      },
      hurtigruten: {
        title: 'フッティルーテン（Hurtigruten）の沿岸急行船',
        body: 'トロムソはベルゲン〜キルケネス（Kirkenes）沿岸航路の寄港地です。北行きの船はベルゲンから約4日かけて、午後にトロムソに寄港します。行きは飛行機で入り、帰りに一区間だけ船に乗ってください。',
        cta: '航海スケジュールを見る',
      },
      driving: {
        title: '車：フィンランドからE8、南からE6',
        body: 'ナルヴィク（Narvik）からはE6とE8で約245km、夏で3.5〜4時間。スキボトン（Skibotn）からE8で2時間。スキボトンはノルウェー国内にあり、キルピスヤルヴィ（Kilpisjärvi）のフィンランド国境はE8をさらに約45km進んだ先です。冬は路面状況に応じて冬用タイヤが義務になります。スパイクタイヤは義務ではありませんが、トロムス（Troms）、ヌールラン（Nordland）、フィンマルク（Finnmark）では10月16日〜4月30日に使用でき、ノルウェーのその他の地域では11月1日から復活祭月曜日の後の最初の日曜日までです。',
        cta: 'レンタカーを比較',
      },
      bus: {
        title: 'ナルヴィクからの高速バス',
        body: 'Svipperの高速バス（トロムス県の公共交通）はナルヴィク〜トロムソを4時間で結び、1日に複数便あります。ナルヴィクにはオーフォート線（Ofoten Line）でストックホルムから直通列車が来ています。列車で旅する人にとって、景色のよい入口です。',
        cta: 'Svipperで予約',
      },
    },
    itineraries: {
      heading: 'トロムソを含むモデルコース',
      intro: 'トロムソを北極圏の拠点にした数日間のルート。',
      items: [
        'トロムソ7日間オーロラ週間：オーロラ追跡4回、ホエールサファリ1回、犬ぞり1回、休息日1日',
        'ロフォーテン諸島〜トロムソ10日間ドライブ：ボードー（Bodø）へ飛び、E10でロフォーテン諸島を走り、フェリーでトロムソへ',
        '5日間の白夜集中コース（6月）：セーニャ島への日帰り、カールフィヨルドでのシーカヤック、白夜の中で乗るフィエルハイセン（ロープウェイ）',
        '14日間の北極圏周遊：オスロからトロムソまでフッティルーテンと陸路を組み合わせて移動、スバールバル諸島のオプションあり',
      ],
    },
    expert: {
      alt: 'Bjørn Haugen（NorgeTravel 北極圏フィールド担当編集者）',
      zone: '北極圏',
      role: 'Arktisk feltekspert | 北極圏フィールド担当編集者',
      bio: 'DNT（ノルウェー・トレッキング協会）認定ガイドとして、北ノルウェー（Nord-Norge）とスバールバル諸島で25年の経験があります。トロムソで捜索救助ボランティアをしていました。観光局の写真のオーロラが、初日の夜に見えるものとなぜ違うのか、そして実際に見えるオーロラにどう備えるかをよく知っています。',
    },
    faqHeading: 'よくある質問',
    faq: [
      {
        question: 'トロムソへの行き方は？オスロからどのくらいかかりますか？',
        answer:
          '飛行機です。スカンジナビア航空（SAS）とノルウェー・エアシャトル（Norwegian）がオスロ（OSL）からトロムソ（TOS）へ毎日複数の直行便を運航し、飛行時間は2時間、ショルダーシーズンなら往復NOK 799からで、冬のオーロラシーズンは6〜8週間前に予約してください。フッティルーテン（Hurtigruten）の沿岸急行船はベルゲンから約4日でトロムソに寄港します。車ならナルヴィク（Narvik）からE6とE8で約245km、夏で3.5〜4時間、Svipperの高速バスなら4時間です。',
      },
      {
        question: 'トロムソに行くなら、オーロラと白夜のどちらの時期がいいですか？',
        answer:
          'オーロラなら9〜3月で、晴れた夜にKp指数が2〜3に達すれば見られます。白夜なら5月18日〜7月26日で、太陽が沈まず、ハイキング、シーカヤック、ミッドナイトサン・マラソンが24時間の明るさの中で行われます。クジラのピークは12〜1月です。11月は午後の半ばには暗くなり、雨も多いので、この時期のオーロラ追跡は当たり外れが大きくなります。',
      },
      {
        question: 'トロムソではどこに泊まるのがいいですか？',
        answer:
          '初めての人はトロムソ島の中心部（Sentrum）に泊まってください。Scandic IshavshotelやClarion The Edgeなど港に面したホテルがオーロラやホエールウォッチングのツアーの主な送迎場所で、市内の本格的なレストランはすべて徒歩圏です。橋を渡ったトロムスダーレン（Tromsdalen）は夜が静かでフィエルハイセン（ロープウェイ）があり中心部までバスで10分、クヴァル島（Kvaløya）は中心部から西へ車で25分で光害はありませんが、レンタカーが必要です。オーロラシーズンのホテルは3〜6か月前に予約してください（最初に埋まるのは中心部です）。',
      },
      {
        question: 'トロムソには何日滞在すればいいですか？',
        answer:
          '4〜7泊を見てください。オーロラには晴れた空が必要で、雲だけはどうにもできないため、現実的な確率を得るには最低4泊で、それより短いと賭けになります。冬の7日間なら、オーロラ追跡4回、ホエールサファリ1回、犬ぞり1回、休息日1日が入ります。6月なら5日間で、セーニャ島への日帰り、カールフィヨルドでのシーカヤック、白夜の中で乗るフィエルハイセンを回れます。',
      },
      {
        question: '冬のトロムソでオーロラ以外にできることは？',
        answer:
          'まずホエールサファリで、11〜2月にシャチとザトウクジラの群れがニシンを追って、トロムソから約3時間のシェルヴォイ（Skjervøy）とクヴェーナンゲン（Kvænangen）周辺のフィヨルドに入ってきます。ピークは12〜1月で遭遇率は90%、料金は1,450クローネからです。ハスキー犬ぞりはトロムソから内陸へ約75分のタモクダーレン（Tamokdalen）のキャンプ・タモクから出発し2,800クローネから、サーミの人々が案内し夜にオーロラも観賞するトナカイキャンプは2,190クローネからです。フィエルハイセンは4分で標高421mのストールシュタイネンへ上がり、同じ山のシェルパ階段はチェーンスパイクを付ければ冬でも歩けます。',
      },
      {
        question: '極夜のトロムソは一日中暗いのですか？',
        answer:
          'いいえ。極夜は11月27日から1月15日までの50日間で、太陽は地平線の上に昇りませんが、正午には薄明かりがあります。その前の11月でも、午後の半ばにはすでに暗くなります。暗い時間帯こそオーロラが見える時間で、人口約8万人、大学、病院、現役の港を持つこの町は普段どおり動いています。',
      },
    ],
    cta: {
      heading: 'トロムソ旅行を予約する準備はできましたか？',
      body: 'オーロラツアー、ホエールサファリ、北極圏トレッキング。すべて紹介料を開示したアフィリエイトリンクです。',
      northernLights: 'オーロラツアー',
      northernNorway: '北ノルウェーをもっと見る',
    },
    share: { title: 'トロムソ観光ガイド', label: 'このページをシェア' },
    activities: {
      heading: 'トロムソでできること',
      intro:
        'トロムソは北緯69度、オーロラオーバルの真下にあります。人口約8万人、現役の港と大学があり、普通に機能している北極圏の都市です。オーロラシーズンは9〜3月、白夜は5月18日〜7月26日。以下はすべて市内から予約できる現実的な選択肢か、車で45分以内に行ける登山口です。',
      tabs: { featured: 'おすすめ', tours: 'ツアー', hiking: 'ハイキング', eat: '食事' },
      bookTour: 'ツアーを予約',
      checkAvailability: '空き状況を確認',
      viewAllTours: 'GetYourGuideでトロムソのツアーをすべて見る',
      readGuide: 'ガイドを読む',
      ratingTitle: 'NorgeTravel評価（10点満点）',
      rated: 'NorgeTravel評価',
      difficulty: { Easy: '初級', Moderate: '中級', Hard: '上級' },
      featured: {
        aurora: {
          title: 'ミニバスでオーロラを追う',
          description:
            'トロムソの公認ガイドが車で晴れ間を追い、オーロラを探して一晩に最大200km走ります。18:00から6〜8時間。最低4泊は予約してください。雲だけはどうにもならない唯一の要素です。',
          duration: '6〜8時間',
          price: '1,290クローネから',
          season: '9〜3月',
          linkLabel: '空き状況を確認',
        },
        whales: {
          title: 'シェルヴォイ発のホエールウォッチング',
          description:
            '11〜2月、シャチとザトウクジラの群れがニシンを追って、トロムソから約3時間のシェルヴォイ（Skjervøy）とクヴェーナンゲン（Kvænangen）周辺のフィヨルドに入ってきます。ピークは12〜1月。RIBボートなら近くまで寄れ、従来型の船は長い一日でも暖かく過ごせます。ピーク時の遭遇率は90%です。',
          duration: '4〜6時間',
          price: '1,450クローネから',
          season: '11〜2月',
          linkLabel: '空き状況を確認',
        },
        fjellheisen: {
          title: 'フィエルハイセン（ロープウェイ）でストールシュタイネンへ',
          description:
            'トロムスダーレン（Tromsdalen）のソッリヴェイエン（Solliveien）から4分で、標高421mのストールシュタイネン（Storsteinen）の岩棚へ。運行時間と料金は季節で変わるので、出かける前にfjellheisen.noで確認してください。街の明かりの上に出るには、これがいちばん早い方法であることが多いです。',
          duration: '1〜3時間',
          price: '料金は季節で変動',
          season: '通年',
          linkLabel: 'トレイルガイドを読む',
        },
        senja: {
          title: 'セーニャ島日帰り：セグラ山と海岸',
          description:
            'ノルウェーで2番目に大きな島。トロムソから車とセーニャ・フェリー（Brensholmen〜Botnhamn）で2.5時間。セグラ山（639m）、人のいないビーチ、今も漁を続ける漁村があります。西海岸にはナショナル・ツーリスト・ルートが通っています。',
          duration: '終日',
          price: '1,200クローネから（ガイド付き）',
          season: '5〜9月',
          linkLabel: 'ガイド付きツアーを見る',
        },
      },
      tours: {
        aurora: {
          name: 'トロムソ・オーロラ追跡（少人数）',
          type: 'オーロラ、6〜8時間',
          price: '1,290クローネから',
          duration: '6〜8時間',
          highlight:
            'トロムソの公認ガイドによる少人数のミニバスツアー。リアルタイムで雲の予報を確認します。温かい飲み物と三脚付き。オーロラが見えなければ無料で日程変更できます。',
        },
        whales: {
          name: 'シェルヴォイ・ホエールサファリ（ハイブリッド船）',
          type: 'ホエールウォッチング、5〜6時間',
          price: '1,450クローネから',
          duration: '5〜6時間',
          highlight:
            '静かなハイブリッド推進で、ニシンの群れを乱さずにシャチの群れへ近づけます。11〜2月のみ。暖房付きの室内ラウンジ、屋外デッキ、防寒スーツあり。',
        },
        husky: {
          name: 'ハスキー犬ぞり＋オーロラ',
          type: '冬のアクティビティ、4〜5時間',
          price: '2,800クローネから',
          duration: '4〜5時間',
          highlight:
            'トロムソから内陸へ約75分のタモクダーレン（Tamokdalen）にあるキャンプ・タモク（Camp Tamok）の犬舎から夕方に出発します。ツアー会社がオーロラ予報を追い、条件がそろえば停車時間を延ばします。防寒スーツ、ブーツ、夕食付き。',
        },
        sami: {
          name: 'サーミのトナカイキャンプとオーロラ',
          type: '文化体験＋オーロラ、5〜7時間',
          price: '2,190クローネから',
          duration: '5〜7時間',
          highlight:
            'サーミの人々が所有し、サーミの人々が案内します。トナカイに餌をやり、ヨイク（joik、サーミの伝統歌唱）を聴き、サーミの牧畜民と群れの実際の仕事上の関係を学びます。夜、空が晴れればラヴヴ（lavvu、サーミのテント）からオーロラを観賞します。',
        },
      },
      trails: {
        sherpatrappa: {
          name: 'シェルパトラッパ（Sherpatrappa）からストールシュタイネン経由でフローヤ（Fløya）へ',
          distance: '往復5km',
          elevation: '670m（フローヤまで）',
          time: '3〜5時間',
          description:
            'ネパールのシェルパが造った1,200段の石段で、トロムスダーレンからストールシュタイネン（421m、ロープウェイ山頂駅）まで登ります。フローヤ山頂（671m）まで足を延ばすこともできます。市街地から行けるトレイルで、冬はチェーンスパイクを付ければ通年歩けます。DNT（ノルウェー・トレッキング協会）のブルー等級。',
        },
        tromsdalstinden: {
          name: 'トロムスダールスティンデン（Tromsdalstinden）登頂',
          distance: '往復18km',
          elevation: '1,100m',
          time: '8〜10時間',
          description:
            'トロムソを見下ろす標高1,238mの象徴的な山。登山口はTromsødalenで、ツンドラとガレ場を長く歩き、最後はケルン（石積み）までよじ登ります。夏季のみ（7〜9月）。DNTのレッド等級で、山の安全規則フィエルヴェットレグレネ（Fjellvettreglene）を完全に守る必要があります。',
        },
        rodtinden: {
          name: 'クヴァル島のロードティンデン（Rødtinden）',
          distance: '往復6km',
          elevation: '600m',
          time: '4〜5時間',
          description:
            'エルスフィヨルド（Ersfjord）を見下ろす標高644mの山で、トロムソから車で30分。登山口はフィンヴィカ（Finnvika）。標識のある道を着実に登り、山頂近くで短い岩場をよじ登ります。岩場ありのDNTブルー等級。山頂からはクヴァル島越しにリンゲン・アルプスが見えます。',
        },
        bonntuva: {
          name: 'クヴァル島のボーントゥーヴァ（Bønntuva）',
          distance: '往復5km',
          elevation: '500m',
          time: '3〜4時間',
          description:
            'トロムソから35分、家族向けのクヴァル島の山（615m）。登山口はエイドショーセン（Eidkjosen）。標識が整い、岩場はなく、傾斜はゆるやかです。DNTブルー等級。山頂から南へ、マランゲン（Malangen）越しにセーニャ島が見えます。',
        },
      },
      restaurants: featuredRestaurants({
        'emmas-drommekjokken': {
          cuisine: 'ノルウェー料理',
          priceRange: '1人650〜900クローネ',
          highlight:
            'トロムソを食の目的地にした北極圏のテイスティングメニューです。この厨房は北の食材（トナカイ、タラバガニ、クラウドベリー）を技術と節度をもって仕上げます。全7品。客席は30席。オーロラシーズンは少なくとも2週間前に予約してください。',
        },
        'bardus-bistro': {
          cuisine: 'シーフード',
          priceRange: '1人350〜500クローネ',
          highlight:
            '地元の人が本当に通う、市立図書館のとなりのビストロ。タラ、旬のスクレイ（skrei、回遊タラ）、そしてトロムソの住民が10年来「ノルウェー一」と言い合っているフィッシュスープ。テイスティングメニューはなく、北のシーフードを正直に盛った皿を、家を担保に入れなくても払える値段で出します。',
        },
        'aunegarden': {
          cuisine: '郷土料理',
          priceRange: '1人500〜750クローネ',
          highlight:
            '1838年の木造家屋で味わう北ノルウェーの伝統料理。トナカイのシチュー、塩漬けにして干したラムのリブ（pinnekjøtt）、干しダラを、観光業より古いレシピで作ります。建物だけでも席を予約する価値があります。',
        },
        'skarven': {
          cuisine: 'パブ',
          priceRange: '1人200〜380クローネ',
          highlight:
            'トロムソで最も長く続くパブ。漁師、学生、観光客が同じテーブルを囲み、誰も誰かに見せるために振る舞ったりしません。タラの舌（torsketunge）がメニューにあるのは当然のことです。小麦粉をまぶして鴨の脂で揚げる料理で、漁業がこの町を築いて以来のトロムソの定番です。ここで出るMackのビールは、2012年に醸造所が移転した70km南のノルシュースボトン（Nordkjosbotn）で造られています。',
        },
      }),
    },
    basecamps: {
      heading: 'どこに泊まるか',
      intro:
        '拠点は3つ。便利さ、料金、空の暗さのバランスがそれぞれ違います。中心部（Sentrum）なら港のそばで、どのツアーも玄関前まで迎えに来ます。トロムスダーレン（Tromsdalen）なら静かな夜とフィエルハイセン（ロープウェイ）が手に入ります。クヴァル島（Kvaløya）は、レンタカーがあれば光害がありません。',
      bestFor: 'おすすめの人',
      notIdealFor: '向かない人',
      accommodation: '宿泊',
      dining: '食事',
      services: '生活サービス',
      localTip: '地元のヒント',
      leadTimes: {
        title: '予約のタイミング',
        gap: '',
        items: [
          {
            label: 'オーロラシーズン（11〜3月）：',
            body: 'ホテルは3〜6か月前に予約してください。最初に埋まるのは中心部です。Scandic IshavshotelとClarion Withは、1〜2月のピーク日程が10月までに満室になります。',
          },
          {
            label: '白夜（6〜7月）：',
            body: '通常は2〜3か月前で間に合います。料金はオーロラのピーク時より30〜40%安くなります。',
          },
          {
            label: 'ショルダーシーズン（9〜10月、4〜5月）：',
            body: '直前予約でも大丈夫なことが多いです。9月でもオーロラは見られる可能性があり、1月より安く泊まれます。',
          },
        ],
      },
      bases: {
        sentrum: {
          label: '中心部',
          name: '中心部（Sentrum）',
          tagline: '港、ストールガータ（Storgata）、ツアーの集合場所まで徒歩圏',
          population: 'トロムソ島（Tromsøya）',
          distanceToCentre: '現在地',
          overview:
            'トロムソ島の海沿いのエリア。初めての人の大半はここに泊まるべきです。Scandic IshavshotelとClarion The Edgeは港に面し、フィヨルドビューの部屋があります。オーロラシーズンには、Scandicからほぼ1時間ごとにツアーの送迎が出ます。マットハーレン（Mathallen）のフードホール、極地博物館、Mackのパブ「ウールハレン（Ølhallen）」、そして市内の本格的なレストランすべてに歩いて行けます。',
          bestFor: [
            'トロムソが初めての人',
            'レンタカーを使わない人',
            'ツアーの送迎を利用してオーロラを追う人',
            'ホエールサファリに参加する人（ツアーは中心部から出発）',
            '歩いて行ける範囲で夕食を選びたい人',
          ],
          notIdealFor: [
            'バルコニーから暗い空でオーロラを見たい人（光害あり）',
            'オーロラのピークシーズンに予算を抑えたい人（料金が跳ね上がる）',
            '静けさを求める人（ストールガータは夜遅くまでにぎやか）',
          ],
          accommodation: [
            {
              name: 'Scandic Ishavshotel',
              type: '4つ星ホテル',
              price: '1泊2,200〜4,500クローネ',
              highlight:
                '港に面した三角形のガラス張りの建物で、フィヨルドビューの部屋があります。トロムソ観光の実務の中心で、オーロラやホエールウォッチングのツアーの多くがロビーから出発します。最上階にパノラマバー。朝食付き。',
            },
            {
              name: 'Clarion Hotel The EdgeとClarion Collection Hotel With',
              type: '4つ星の港のホテル',
              price: '1泊1,900〜4,000クローネ',
              highlight:
                '港に面した、別々の2つのホテルです。Clarion Hotel The Edgeは2014年開業の大型ホテルで、11階の最上階バーから港と北極教会を見渡せます。Clarion Collection Hotel Withはより小規模な港沿いのホテルで、午後のワッフルと夕食が宿泊料金に含まれています。',
            },
            {
              name: 'Radisson Blu Hotel Tromsø',
              type: '4つ星ホテル',
              price: '1泊1,800〜3,800クローネ',
              highlight:
                'ストールガータの中心に立地。中〜上クラスの安定した選択肢です。1階にYonasレストラン。ScandicとClarionが満室のとき（1〜3月はよくあります）の代わりとして使えます。',
            },
            {
              name: 'Smarthotel Tromsø',
              type: 'エコノミーホテル',
              price: '1泊1,100〜2,200クローネ',
              highlight:
                '部屋はコンパクトで、立地は中心部。オーロラシーズンの中心部で本当に安い選択肢です。レストランも付帯サービスもありません。早めに予約してください。',
            },
          ],
          dining: [
            {
              name: 'Emmas Drømmekjøkken',
              detail:
                '地元の名店。2階はスカンジナビアのファインダイニング、1階はビストロ（Emmas Under）。ホッキョクイワナ、トナカイ、タラバガニ。メインは500〜800クローネ。オーロラシーズンは2〜3週間前に予約してください。',
            },
            {
              name: 'Bardus Bistro',
              detail:
                '市立図書館とトロムソ文化会館のとなりにある、小さなモダン北欧料理の店。季節のメニューは品数が少なく、自信がうかがえます。地元の人に人気。メインは400〜650クローネ。',
            },
            {
              name: 'Fiskekompaniet',
              detail:
                '港沿いのシーフードレストラン。タラバガニ、ホタテ、オヒョウ。調理はシンプルで、食材は上質。メインは450〜750クローネ。',
            },
            {
              name: 'Mathallen Tromsø',
              detail:
                'グロンネガータ（Grønnegata）にあるフードホール。北極圏のチーズ、燻製魚、ベーカリー、小さなカフェなど、地元の生産者が一つ屋根の下に集まっています。昼食向きで、夕食向きではありません。',
            },
          ],
          services: [
            { label: 'スーパー', available: true, detail: 'Kiwi、Rema 1000、Coop Megaが徒歩5分以内。' },
            { label: 'レンタカー', available: true, detail: 'Hertz、Avis、Europcar。市内のカウンターより空港での受け取りがおすすめです。' },
            { label: 'EV充電', available: true, detail: 'ホテル併設や公共の充電器が複数あり、Radisson Bluにもあります。フィエルハイセンには急速充電器があります。' },
            { label: '薬局', available: true, detail: 'ストールガータにApotek 1。電話注文で24時間対応。' },
            { label: '病院', available: true, detail: 'UNN Tromsø（北ノルウェー大学病院）。救急：113。' },
            { label: 'ツアー送迎', available: true, detail: 'Scandic IshavshotelとRadisson Bluがオーロラツアーの主な送迎場所です。' },
          ],
          insiderTip:
            'ホテルより先にオーロラツアーを予約してください。逆ではありません。1〜3月は4〜6週間前に満席になります。希望のツアー（Chasing Lights、Tromsø Friluftsenter）が1泊目は満席でも3泊目に空きがあるなら、日程をそちらに合わせてください。ホテルは中心部のどこかに必ず部屋があります。',
        },
        tromsdalen: {
          label: 'トロムスダーレン',
          name: 'トロムスダーレン（Tromsdalen、本土側）',
          tagline: '北極教会とフィエルハイセン（ロープウェイ）がすぐそば',
          population: 'トロムソ橋の本土側',
          distanceToCentre: '中心部から車かバスで10分',
          overview:
            '橋の東側で、海沿いに北極教会が立ち、フィエルハイセンのロープウェイが標高421mまで上がります。中心部より静かで、ストールシュタイネンのふもとは空も暗めです。26番バスが10〜15分おきに中心部へ。天気に恵まれれば窓からのオーロラ観賞は中心部より有利ですが、暗くなってからの食事の選択肢は目に見えて少なくなります。',
          bestFor: [
            '中心部に泊まったことがあり、もっと静かな夜を求めるリピーター',
            'ホテルから一歩出て空を見上げたいオーロラファン',
            'フィエルハイセンを毎日使う人',
            '飲み屋街から離れたい家族',
          ],
          notIdealFor: [
            '初めての人（橋を渡る移動の手間）',
            '21:00に予約なしでレストランに入りたい人',
            '車がなく、バス網にも自信がない人',
          ],
          accommodation: [
            {
              name: 'Tromsø Lodge & Camping',
              type: 'キャビン＋キャンプ場',
              price: '1泊950〜1,900クローネ（キャビン）',
              highlight:
                'トロムスダーレン谷の入口、川沿いのキャビン。フィエルハイセンから2km。サウナ、自炊用キッチンあり、キャビンは2〜6人用。中心部のどこよりも空が暗い、本当の格安の選択肢です。',
            },
            {
              name: '個人所有のキャビンとアパート',
              type: 'Airbnb / Novasol / Finn.no',
              price: '1泊1,000〜2,200クローネ',
              highlight:
                'トロムスダーレンで現実に借りられる宿はこれです。橋のこちら側はホテルが少なく、東側を拠点にしたい人の多くは、トロムスダーレン、ソッリゴーデン（Solligården）、フィエルハイセン周辺で個人のアパートやキャビンを借ります。オーロラシーズンは2〜3か月前に予約してください。',
            },
            {
              name: 'ホテルについての正直な話',
              type: 'トロムスダーレンの実情',
              price: '該当なし',
              highlight:
                'トロムスダーレン側にはRadisson Blu、Scandic、Clarionはありません。トロムソの大手チェーンホテルはすべてトロムソ島の中心部にあります。ロビーからツアー送迎のあるブランドの4つ星ホテルに泊まりたいなら、中心部に泊まってください。暗い空と静けさを求めるなら、ここの宿はキャビンと貸し部屋だと割り切ってください。',
            },
          ],
          dining: [
            {
              name: 'Fjellstua（フィエルハイセン山頂）',
              detail:
                'フィヨルドの上、標高421mのレストラン。ガラス張りのパノラマダイニングから、トロムソ島とリンゲン・アルプスを見渡せます。夜も営業しているので、ロープウェイで上がって夕食をとれます。予約してください。',
            },
            {
              name: 'Egon Tromsdalen',
              detail:
                'ノルウェーの一般的なチェーン店。安定していて、夜遅くまで開いていて、子ども連れでも入りやすい店です。ステーキ、ハンバーガー、魚料理。意欲的な店ではありませんが、地元向けの店が閉まった後も開いています。',
            },
            {
              name: '26番バスで中心部へ',
              detail:
                'しっかり食事をしたいなら、橋を渡る前提で計画してください。バスで10分、車で5分。東側は20:00以降、レストランが本当に少なくなります。',
            },
          ],
          services: [
            { label: 'スーパー', available: true, detail: 'Rema 1000とCoopが徒歩10分以内。' },
            { label: 'フィエルハイセン（ロープウェイ）', available: true, detail: 'ストールシュタイネン（421m）まで。運行時間は季節で変わるので、最終便はfjellheisen.noで確認してください。' },
            { label: 'EV充電', available: true, detail: 'フィエルハイセンのふもとに急速充電器。' },
            { label: '薬局', available: false, detail: 'こちら側に薬局はありません。最寄りは中心部（10分）かK1ショッピングセンター。' },
            { label: '中心部へのバス', available: true, detail: '26番バスが10〜15分おき。チケットはSvipperアプリで。' },
            { label: '病院', available: false, detail: 'UNN Tromsøは島側にあります。車で10分。救急：113。' },
          ],
          insiderTip:
            'フィエルハイセンは市内で一番のオーロラ観賞スポットです。KP指数3以上の晴れた夜、21:00以降に上がってください。山頂のカフェではホットチョコレートが飲め、テラスは三脚を立てられる広さがあります。上がる前に、下りの最終便をfjellheisen.noで確認してください。乗り遅れると、暗い中シェルパトラッパ（シェルパ階段）を2.5km歩いて下りることになります。',
        },
        kvaloya: {
          label: 'クヴァル島',
          name: 'クヴァル島（Kvaløya）',
          tagline: '光害のない暗い空の拠点。レンタカー必須',
          population: '隣の島。サンネスン橋（Sandnessund）で渡る',
          distanceToCentre: '中心部から車で25分、バスで45分',
          overview:
            'トロムソ島の西にある隣の島。カールフィヨルド（Kaldfjord）とエルスフィヨルドボトン（Ersfjordbotn）は島の北西側にあり、中心部から20〜30分です。カールフィヨルドは2012年から2016年までホエールウォッチングのフィヨルドでしたが、2017年以降、シャチとザトウクジラの餌場はクヴェーナンゲン（Kvænangen）とシェルヴォイ（Skjervøy）に移り、ホエールサファリは現在、トロムソから約3時間のシェルヴォイから出ています。光害がないので、市内よりオーロラがずっとよく見えます。宿はキャビンとロルブー（rorbu、漁師小屋）風のロッジが中心です。レンタカーがあり、暗い空を求めるならここを拠点にしてください。毎晩外食したい人には向きません。',
          bestFor: [
            'レンタカーがあり4泊以上する人',
            '本気でオーロラを見たい人（光害なし）',
            '三脚と忍耐力を持った写真家',
            'ホテルよりキャビンに泊まりたいカップル',
          ],
          notIdealFor: [
            '車のない人（バスは遅く本数も少ない）',
            '歩いてレストランに行きたい人',
            '1〜2泊の短い滞在',
            'トロムソが初めての人',
          ],
          accommodation: [
            {
              name: 'Arctic Panorama Lodge',
              type: 'キャビンロッジ',
              price: '1泊1,800〜3,500クローネ',
              highlight:
                'リンゲンフィヨルド（Lyngenfjord）地方のウーロイ島（Uløya）にある木造キャビンで、フィヨルドが目の前です。クヴァル島ではなく、トロムソからフェリーを含めて約3時間の移動ですが、空の暗さは同じレベルです。ホットタブ、サウナ、自炊用キッチンあり。オーロラ観賞のために建てられ、大きな窓が北を向いています。',
            },
            {
              name: 'Tromsø Ice Domes / Camp Tamok',
              type: 'ガラスイグルー＋アクティビティキャンプ',
              price: '1泊4,500〜9,000クローネ',
              highlight:
                'トロムソから内陸へ約75分のタモクダーレン（Tamokdalen）にあります。クヴァル島ではありませんが、空の暗さは同じレベルです。アイスホテルのスイートとガラスイグルーで、ベッドからオーロラが見えます。プランによっては犬ぞり、スノーモービル、オーロラ追跡が含まれます。',
            },
            {
              name: 'クヴァル島の貸しキャビン（Airbnb/Novasol）',
              type: '個人所有のキャビン',
              price: '1泊1,200〜2,400クローネ',
              highlight:
                'エイドショーセン（Eidkjosen）、エルスフィヨルドボトン（Ersfjordbotn）、カールフィヨルド周辺に個人のキャビンが多数あります。たいてい2〜6ベッドで、キッチンと薪ストーブ付き。暗い空を求める人にとって最も安い選択肢です。NovasolかAirbnbで予約できます。',
            },
            {
              name: 'Sommarøy Arctic Hotel',
              type: '3つ星のフィヨルドホテル',
              price: '1泊1,400〜2,800クローネ',
              highlight:
                '西へ60km、クヴァル島を抜ける道の終点、ソマロイ島（Sommarøy）にあります。白い砂浜（そう、北緯69度で）、魚料理のレストラン、フィヨルドビューの部屋。2〜3泊するなら運転して行く価値があります。',
            },
          ],
          dining: [
            {
              name: 'Bryggejentene（Ersfjordbotn）',
              detail:
                'クヴァル島南岸にある小さな季節営業のレストラン。地元の魚、短いメニュー、気取らない雰囲気。夏のみ営業。近くでハイキングするなら、昼食のためだけに寄る価値があります。',
            },
            {
              name: 'Sommarøy Arctic Hotelのレストラン',
              detail:
                'クヴァル島で落ち着いて食事できる主な店。フィッシュスープ、オヒョウ、ラム。通年営業。メインは400〜650クローネ。',
            },
            {
              name: '自炊が現実',
              detail:
                '外食の選択肢が少ないため、ほとんどのキャビンにキッチンがあります。到着したらEurospar Kvaløyslettaで買い出しを。スーパーの鮮魚コーナーは本当に質が高いです。',
            },
          ],
          services: [
            { label: 'スーパー', available: true, detail: '橋のたもとにEurospar KvaløyslettaとCoop Kvaløya。' },
            { label: '給油', available: true, detail: '橋の近くにKvaløyslettaのガソリンスタンドとCircle K。西へ向かう前に満タンにしてください。' },
            { label: 'EV充電', available: true, detail: 'キャビンでは普通充電。Eurosparに急速充電器。長距離の運転は事前に計画を。' },
            { label: '薬局', available: false, detail: 'クヴァル島に薬局はありません。最寄りは中心部（25分）。' },
            { label: '中心部へのバス', available: true, detail: '42番バスで中心部へ。1時間に1本、週末はさらに少なめ。オーロラ追跡の手段としては現実的ではありません。' },
            { label: '病院', available: false, detail: 'UNN Tromsøはトロムソ島にあります。車で25〜30分。救急：113。' },
          ],
          insiderTip:
            'クヴァル島の西海岸、エルスフィヨルドボトン、トゥッソイヤ（Tussøya）、ソマロイ島は、この地域で北の空が最もよく開けた場所の一つです。予報で西は晴れ、東は曇りなら、ツアーで追うより自分で車を出してください。KP指数3でエルスフィヨルドの晴れた夜なら、街の明かりに邪魔されないオーロラが見られます。魔法瓶を持って、海岸沿いに車を停めて、待ちましょう。',
        },
      },
    },
  },
};
