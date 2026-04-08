/**
 * Maps city slugs to the nearestTown values used in travel-accommodation.json.
 * Multiple values handle spelling variants that appear in the scraped data.
 */
export const CITY_ACCOMMODATION_TOWNS: Record<string, string[]> = {
  oslo:        ['Oslo'],
  bergen:      ['Bergen'],
  trondheim:   ['Trondheim'],
  stavanger:   ['Stavanger'],
  tromso:      ['Tromsø', 'Tromso'],
  alta:        ['Alta'],
  bodo:        ['Bodø', 'Bodo'],
  hammerfest:  ['Hammerfest'],
  narvik:      ['Narvik'],
  senja:       ['Senja'],
  nordkapp:    ['Honningsvåg', 'Honningsvag'],
  lyngen:      ['Lyngen'],
  lofoten:     ['Svolvær', 'Leknes', 'Reine', 'Henningsvær', 'Stamsund', 'Å i Lofoten', 'Kabelvåg'],
  svalbard:    ['Longyearbyen', 'Barentsburg'],
};
