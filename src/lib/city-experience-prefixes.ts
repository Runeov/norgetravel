/**
 * Maps city slugs (as used in URLs and restaurant data) to the ID prefixes
 * used by travel-experiences.json entries.
 *
 * Entries in travel-experiences.json are keyed like:
 *   tromso-northern-lights-chase, troms-aurora-camp, oslo-opera-house, …
 *
 * Multiple prefixes per city handle historical naming inconsistencies from
 * the fetch_experiences.py import runs.
 */
export const CITY_EXPERIENCE_PREFIXES: Record<string, string[]> = {
  tromso:      ['tromso', 'troms'],
  oslo:        ['oslo'],
  bergen:      ['bergen'],
  trondheim:   ['trondheim'],
  stavanger:   ['stavanger'],
  alta:        ['alta'],
  bodo:        ['bodo', 'bod'],
  hammerfest:  ['hammerfest'],
  narvik:      ['narvik'],
  nordkapp:    ['nordkapp'],
  senja:       ['senja'],
  lyngen:      ['lyngen'],
  lofoten:     ['lofoten'],
  svalbard:    ['svalbard'],
};
