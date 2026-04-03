import type { CityRestaurant } from '@/types/city-guide';

/**
 * Restaurant data for Tromsø.
 * Fetched from Google Places API — all entries verified OPERATIONAL at fetch time.
 * Descriptions marked "pending editorial review" need manual editing.
 *
 * To refresh: python scripts/fetch_restaurants.py --city tromso
 * To verify:  python scripts/verify_restaurants.py --city tromso
 */
export const tromsoRestaurants: CityRestaurant[] = [
    {
      id: 'wedebs-restaurant',
      name: 'Wedeb\'s Restaurant',
      placeId: 'ChIJ6Tb9s3bFxEURi17E0qP5QQE',
      cuisine: 'norwegian',
      pricePoint: '$$',
      address: 'Skippergata 27, 9008 Troms\u00F8, Norway',
      website: 'http://wedebsrestaurant.no/',
      reservationRequired: false,
      openingHours: 'Monday: Closed; Tuesday: Closed; Wednesday: 4:00\u2009\u2013\u200910:00\u202FPM...',
      description: "Restaurant in Troms\u00F8. Description pending editorial review.",
      ratings: { google: { score: 4.9, reviewCount: 460 }, tripAdvisor: { score: 4.9, reviewCount: 127, bubbleRating: 5 } },
      diceScore: 6,
    },
    {
      id: 'mathallen-troms',
      name: 'Mathallen Troms\u00F8',
      placeId: 'ChIJr5VzJq3FxEURtPlJRZxE5M0',
      cuisine: 'norwegian',
      pricePoint: '$$$',
      address: 'Gr\u00F8nnegata 60, 9008 Troms\u00F8, Norway',
      website: 'https://www.mathallentromso.no/',
      reservationRequired: true,
      openingHours: 'Monday: 11:00\u202FAM\u2009\u2013\u200910:00\u202FPM; Tuesday: 11:00\u202FAM\u2009\u2013\u200910:00\u202FPM; Wednesday: 11:00\u202FAM\u2009\u2013\u200910:00\u202FPM...',
      description: "Restaurant in Troms\u00F8. Description pending editorial review.",
      ratings: { google: { score: 4.5, reviewCount: 937 }, tripAdvisor: { score: 4.6, reviewCount: 1129, bubbleRating: 5 } },
      diceScore: 5,
    },
    {
      id: 'hildr-gastro-bar',
      name: 'Hildr Gastro Bar',
      placeId: 'ChIJBxWLvFPExEUR84TYozH1G_U',
      cuisine: 'norwegian',
      pricePoint: '$$$',
      address: 'Skippergata 11, 9008 Troms\u00F8, Norway',
      website: 'http://www.hildr.no/',
      reservationRequired: true,
      openingHours: 'Monday: Closed; Tuesday: 3:00\u2009\u2013\u200910:00\u202FPM; Wednesday: 3:00\u2009\u2013\u200910:00\u202FPM...',
      description: "Restaurant in Troms\u00F8. Description pending editorial review.",
      ratings: { google: { score: 4.5, reviewCount: 445 }, tripAdvisor: { score: 4.4, reviewCount: 459, bubbleRating: 4 } },
      diceScore: 5,
    },
    {
      id: 'yalla-habibi-restaurant',
      name: 'Yalla Habibi Restaurant',
      placeId: 'ChIJyRpW66zFxEURFcBh-CHr9cc',
      cuisine: 'norwegian',
      pricePoint: '$$',
      address: 'Storgata 102, 9008 Troms\u00F8, Norway',
      reservationRequired: false,
      openingHours: 'Monday: 3:00\u2009\u2013\u200910:00\u202FPM; Tuesday: 1:00\u2009\u2013\u200910:00\u202FPM; Wednesday: 3:00\u2009\u2013\u200910:00\u202FPM...',
      description: "Restaurant in Troms\u00F8. Description pending editorial review.",
      ratings: { google: { score: 4.5, reviewCount: 281 }, tripAdvisor: { score: 4.3, reviewCount: 23, bubbleRating: 4 } },
      diceScore: 5,
    },
    {
      id: 'the-social-bar-bistro-troms',
      name: 'The Social Bar & Bistro Troms\u00F8',
      placeId: 'ChIJ50h55XXFxEURMWXWz6KrFG8',
      cuisine: 'norwegian',
      pricePoint: '$$',
      address: 'Kaigata 6, 9008 Troms\u00F8, Norway',
      website: 'https://clarionhotel.cc/socialedge',
      reservationRequired: false,
      openingHours: 'Monday: 4:00\u2009\u2013\u200910:00\u202FPM; Tuesday: 4:00\u2009\u2013\u200910:00\u202FPM; Wednesday: 4:00\u2009\u2013\u200910:00\u202FPM...',
      description: "Restaurant in Troms\u00F8. Description pending editorial review.",
      ratings: { google: { score: 4.4, reviewCount: 74 }, tripAdvisor: { score: 3.2, reviewCount: 76, bubbleRating: 3 } },
      diceScore: 4,
    },
];
