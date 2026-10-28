# Visitors 20–26 October and two new articles

Written 27 October 2026. Project `pro-design/norgetravel`, production only. Window 20 October 00:00 to 27 October 00:00 UTC, compared with 13–19 October from [the 20 October review](2026-10-20-weekly-review.md). Same filters as that review (Singapore and the US Android/Chrome Mobile segment excluded), plus one new exclusion explained below. Query scripts and raw responses are in the session scratchpad, not in the repo.

## What the visitors did

### Two segments are not readers

- **China, 284 page views, now the largest country.** 278 visitor identities for 284 views, 205 of them Chrome on Windows, every one with an empty referrer, spread evenly over the week (28 to 51 a day) across Chinese, English and Japanese pages. They fired 253 scroll events and 2 thirty-second reads. Server-side, 677 of China's HTML requests are flagged as an unclassified bot. China grew 143, 212, 284 over the last three weeks and was not excluded in the 20 October review. This is consistent with an automated renderer; it is a suspicion, not proof, and a few real Chinese readers are hidden inside it.
- **One page, 34 views, no reading.** The guided Nærøyfjord kayaking review got 34 views from 34 identities (India, US, Canada, Philippines, Pakistan; desktop Chrome), on four days, with zero scroll and zero reading events. Treat as automated.

### The numbers

| Measure | 13–19 Oct | 20–26 Oct | Change |
|---|---:|---:|---:|
| Page views, raw | 1,281 | 826 | −36% |
| Page views, 20 Oct filter (SG, US Android out) | 499 | 650 | +30% |
| Page views, also excluding China | 287 | 366 | +28% |
| Search-referred page views | 81 | 99 | +22% |
| of which Google | 46 | 52 | +13% |
| 30-second reading events (SG out) | 55 | 73 | +33% |
| Identities that read 30 seconds | 46 | 56 | +22% |
| Pages per visitor identity (20 Oct filter) | 1.19 | 1.18 | flat |
| Related-content clicks | 0 | 0 | still none |
| Affiliate clicks | 1 | 0 | none |

The raw drop is the US Android segment disappearing (550 views last week, 4 this week). Under every filter, real traffic grew: search referrals up a fifth, reading up a third. Depth did not move: almost every visit is still one page.

Search sources: Google 52, Bing 19, DuckDuckGo 14, Yahoo Japan 6, Ecosia 4. AI referrals: 3 (Gemini 2, Copilot 1). ChatGPT fetched pages for users 348 times and through GPT actions 302 times, almost all the home page; Perplexity 30.

### What people searched for and read

| Article | Search visits | 30-second reads |
|---|---:|---:|
| Hurtigruten Bergen to Tromsø | 9 | 6 |
| Norway cost guide (en 5, ja 4) | 9 | 4 |
| Bergen to Lofoten, every route | 7 | 7 |
| Sherpatrappa, Tromsø | 5 | 8 |
| Norway in a Nutshell review | 4 | 4 |
| Preikestolen hike | 4 | 3 |
| Winter driving guide | 4 | 3 |
| Best time to visit (ja) | 4 | 3 |
| Nærøyfjord electric ferry | 3 | 4 |
| Skjervøy whale safari | 1 | 10 |

Two kinds of article earn search visits and get read:

1. **Getting between places.** Bergen to Lofoten, the Hurtigruten leg, Norway in a Nutshell, the Bergen Railway, winter driving and the ferry guide: route comparisons with times and costs. Bergen to Lofoten converts best of all, 7 searches and 7 reads.
2. **One winter activity around Tromsø, told straight.** The whale safari is the most-read article on the site (10 reads) and Sherpatrappa reads well. ChatGPT also fetched both for users.

Preikestolen, at zero last week, now draws search visits. Japanese readers search cost and best time.

### Planner and onward clicks

- `/en/plan` had 15 views from 8 identities; 4 items were saved by 2 identities.
- The day-by-day plan was requested 3 times by one visitor: 1 written, 2 failed. The failures need a look in the Vercel logs.
- Related-content clicks are still zero and affiliate clicks are zero. Articles still end without a second step that fits the reader's region, as the 20 October review found.

## Two new articles

Both follow a format that already works on this site, target searches we can see, and fill a gap: nothing on the site covers Tromsø to Lofoten as a route, and nothing covers dog sledding, reindeer or Sámi hosts, the season's headline activities.

Google's autocomplete phrasing, 27 October:

- "tromso to lofoten" + ferry, flight, drive, bus, cruise, distance, road trip, in winter; "lofoten to tromso" + the same plus train and by car.
- "dog sledding tromso" + october, november, december, price, cheap, ethical, tour.
- "reindeer sledding tromso" + price, evening, night, reviews, reddit; "husky or reindeer sledding".

### Article 1: dog sledding or reindeer sledding from Tromsø

Publish first: November and December trips are being booked now.

- **Slug and category:** `dog-sledding-vs-reindeer-sledding-tromso`, trip-reports.
- **Author:** Bjørn Haugen (Arctic). Same structure as the whale safari, the site's most-read piece.
- **Title draft:** "Dog sledding or reindeer sledding in Tromsø: what each involves, costs and who runs it".
- **Searches it answers:** dog sledding tromso (and by month, price, ethical), reindeer sledding tromso (price, evening), husky or reindeer sledding.
- **The angle:** they are two different trips. Huskies are speed, noise, cold and you drive the team yourself; on short tours that is 10 to 15 minutes at the reins. Reindeer are slow and the sled ride is a short part of the visit; the visit is the Sámi hosts, the feeding, the food by the fire and the stories. Pick by what you came for, not by the photo.

**Sections**, in Bjørn's order:

1. The reality check: what each actually is.
2. At a glance, as a table: ride length, do you drive, total trip time, transfer, price range in NOK, season, minimum age, who it suits.
3. What a husky tour involves: short versus half-day versus self-drive, the transfer to the kennels, what they lend you.
4. What a reindeer camp involves: the herd, the sled, the lavvu, the meal, the hosts.
5. The survival layer: thermal suits are lent, wool underneath, no cotton (link the packing guide).
6. The timing truth: when snow is reliable, October trips on wheeled carts, polar night 27 November to 15 January, evening tours with an aurora chance.
7. Choosing an ethical kennel: the questions to ask about working hours, rest, and what happens to retired dogs.
8. LOCAL ETIQUETTE / SLIK GJØR VI DET HER at the reindeer camp: these are working herds and a living culture, ask before photographing people, joik is not a show.
9. The fallback plan: no snow, storm cancellations, refund terms.
10. Questions travellers ask, marked up as FAQ.

**Facts to verify against the operators' own sites before writing:**

- Operators and who runs them. The reindeer section must name Sámi-run businesses and say so only where their own site confirms it. Search found Tromsø Arctic Reindeer (listed by Visit Tromsø at 2,090 NOK for the full visit with a 25 to 30 minute sled ride, 1,890 NOK for the short one), Tromsø Lapland at Breivikeidet, and Camp Tamok. For huskies, check the kennels around Tromsø and the three already in our listings.
- This season's prices, ride lengths, pickup points, transfer times, minimum ages, snow-season start and cancellation terms.
- Every outbound link checked live (Rules.md section 19). GetYourGuide Tromsø base `tromso-l32375` is verified; any activity category code must be verified separately or the link falls back to the base.

**Links:** whale safari, Northern Lights page, packing guide, Tromsø destination, Sherpatrappa. The planner block opens `/plan/northern-norway` with the wildlife and Sámi culture interests set.

**Data to add when it publishes:** the verified operators as listings in `travel-experiences.json`, so the zone page and the trip planner offer them. Our listings now hold three husky operators, one wrongly typed as whale watching (Lyngen Husky Safari), and no reindeer or Sámi experiences.

### Article 2: Tromsø to Lofoten, every route compared

Publish within a week of the first.

- **Slug and category:** `tromso-to-lofoten-routes`, planning.
- **Author:** Lars Erik Nordvik, who wrote Bergen to Lofoten, with Bjørn's note on winter driving on the E6 and E10.
- **Title draft:** "Tromsø to Lofoten: every route compared, summer and winter (2026/27)".
- **Searches it answers:** tromso to lofoten (ferry, flight, drive, bus, cruise, distance, in winter) and the reverse direction.
- **The angle:** there is no direct way. Every route goes through Bodø, Harstad, Narvik or the coastal ship, and in winter the choice is about daylight and roads, not just hours.

**Sections**, same structure as Bergen to Lofoten:

1. The routes at a glance, as a table: door-to-door time, cost range, car or no car, winter reliability.
2. Fly via Bodø.
3. The coastal ship southbound overnight.
4. Drive the E8, E6 and E10 in winter.
5. Express boat to Harstad, then bus or car.
6. Bus all the way.
7. Going the other way, Lofoten to Tromsø.
8. Which one I would take, in January and in July.
9. Questions travellers ask, as FAQ.

**Facts to verify against official sources only.** The search results for this route are thin, inconsistent or auto-generated, which is why a careful guide can win here.

- Widerøe connections from Tromsø to Svolvær and Leknes via Bodø, and whether anything flies direct (widerøe.no).
- Hurtigruten and Havila southbound times from Tromsø to Svolvær this winter. A traveller report says about 01:30 out, 18:30 in, which is not good enough to publish.
- Norled's Tromsø to Harstad express boat, already in our listings at 2 hours 55 minutes: days, times, price.
- Bus connections through Narvik and Bjerkvik to Svolvær.
- Road distance and time from Statens vegvesen, winter closures, and one-way car-hire fees from Tromsø to a Lofoten drop-off.

**Links:** Bergen to Lofoten, Hurtigruten Bergen to Tromsø, winter driving, ferry guide, the Lofoten and Tromsø destination pages, `/plan/lofoten` and `/plan/northern-norway`. The planner block opens `/plan` with both regions set; that is the two-region trip the planner's route engine is built for.

**Code to update when it publishes:** the Lofoten to Northern Norway leg in `src/lib/plan-engine.ts` with the verified times, so the planner and the article say the same thing.

### For both

- **Second step:** ship each with the region planner block under the quick answer, not only at the end. That is the top recommendation in the 20 October review and still missing; without it these readers leave after one page like the rest.
- **Languages:** Chinese and Japanese titles and descriptions at launch, as with the October guides. Translate the route guide fully into Japanese if Japanese search keeps arriving.
- **Measure at two and four weeks:** search visits, 30-second reads, planner-block clicks and affiliate clicks per article. Benchmarks: Bergen to Lofoten (7 searches, 7 reads in a week) and the whale safari (10 reads).

## Status, 28 October

Both articles are built, with facts checked on the operators' and official sites on 28 October and all 34 outbound links returning 200:

- `dog-sledding-vs-reindeer-sledding-tromso` (trip-reports, Bjørn Haugen). Only Tromsø Arctic Reindeer and Tromsø Lapland say on their own sites that a Sámi family runs them; the article names only those two as Sámi-run.
- `tromso-to-lofoten-routes` (planning, Lars Erik Nordvik). Correction to the brief: Widerøe flies Tromsø to Leknes nonstop daily and Tromsø to Svolvær nonstop on Saturdays only. Widerøe, coastal-ship and bus fares are not published in a form we could check, and the article says so.
- Both carry the planner block under the quick answer (`<!--planner zones="…" interests="…"-->` in the body) and FAQ markup.
- Listings: Lyngen Husky Safari retyped to dog sledding; the Villmarkssenter draft corrected and published; Tromsø Arctic Reindeer, Tromsø Lapland and Arctic Adventure Tours added. The planner's Lofoten to Tromsø leg now uses the article's times.
- Still open: the Widerøe listing. widerøe.no blocks every automated check, so its URL can't pass the Rules.md section 19 check; confirm it by hand before replacing the kiwi.com link.

## Housekeeping found on the way

- Add China to the sensitivity filter in future reviews, or report it separately as the review did for Singapore and the US Android segment.
- Look at the two failed day-by-day plan requests in the Vercel logs.
- Fix the Lyngen Husky Safari listing type (whale-watching to dog-sledding). Point the Widerøe listing at widerøe.no instead of a kiwi.com search for Oslo.
