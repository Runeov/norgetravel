# Bounce rate: what the numbers say and the plan to move them

Written 11 October 2026 from Vercel Web Analytics and Speed Insights, 28 days to 11 October. Companion to [norge-visibility-plan.md](norge-visibility-plan.md); the baseline numbers live in the [worklog](worklog/2026-10-06-baseline.md).

## Definition we will use

Vercel does not report a bounce rate through the CLI, so we measure two things we can pull every week:

- **Pages per visit**: page views divided by unique visitor-days. 1.00 means every visit is one page.
- **Engaged visits**: visits that fire `article_engaged` (30 seconds visible on an article), `scroll_depth` at 50% or 90%, a trip-planner event, an affiliate click or a second page view.

A bounce, for us, is a visit with one page view and none of those events. GA4 (behind the consent banner) reports its own engagement rate for the visitors who accept cookies; use it as a cross-check, not the series.

## What the data says

Clean the data first. 675 of the 1,471 page views in 28 days came from Singapore, all Chrome on Windows or Mac, spread evenly over 60 pages at 17 to 25 views each, with no search referrer. That is a crawler that runs JavaScript, not readers. The numbers below exclude it.

| Measure, 28 days, Singapore excluded | Value |
|---|---|
| Page views | 796 |
| Unique visitor-days | 621 |
| Pages per visit | 1.28 |
| Visits from search engines (Google 92, Bing 29, DuckDuckGo 17, Yahoo 7, Ecosia 4) | 149 |
| Visits from AI assistants (chatgpt.com 9, copilot 2) | 11 |
| Mobile share of page views | 41% |
| `article_engaged` (30 s on an article) | 90 events, split evenly desktop 46 / mobile 44 |
| `related_content_click` | 2 |
| `trip_planner_opened` | 11 |
| `affiliate_click` | 9 |

What this means:

1. **Readers read, then leave.** On the top trip reports roughly 40% of human visitors stay 30 seconds or more (Sherpatrappa 17 of about 40, winter driving 11 of about 26), yet unique visitors equal page views almost one to one. The content holds them; nothing on the page gives them a second step.
2. **The end-of-article module does not work.** It shows three articles from the same category regardless of place (a Svalbard hike under a Geiranger ferry review). Two clicks in 28 days.
3. **Destination hubs are slow.** Speed Insights p75 LCP: fjord pages 17.0 s, fjords hub 6.4 s, city pages 5.0 s, cities hub 4.7 s, Lofoten 4.0 s, restaurants 3.2 s. Articles 2.1 s, home 1.8 s, Northern Lights 1.5 s. The fjord page also has an INP of 832 ms. A hub that takes 5 to 17 seconds to paint on a phone bounces before it is read.
4. **Search visitors land on articles, not hubs.** All but 3 of the top 15 search-referred pages are trip reports or safety guides. The hubs that are slow are also the hubs people reach second, if at all.
5. **The trip planner is invisible.** 11 opens in 28 days from a site built around it. The hero button and the article card are the only entry points, and the card sits below the article body.

## The plan, in order of return per hour

### 1. Give every article a next step that fits the place (first)

Replace the same-category related list with a "Plan this trip" block built from the article's region and type:

- The destination page for the region (Tromsø, Lofoten, Geirangerfjord, Svalbard).
- Two more articles from the same region, trip reports first, then safety.
- One planning guide matched to the article type: hikes get the Fjellvettreglene and packing guides, drives get the ferry guide, costs for everything else.
- One "Add to trip" action that opens the planner with this place preselected, placed under the quick answer as well as at the end.

The region map already exists in the travel-guides hub (`REGION_RULES`). Target: `related_content_click` from 2 a month to 40, pages per visit from 1.28 to 1.5 within eight weeks.

### 2. Fix the slow hubs: it is the flight widget

Measured on 11 October with a phone profile on a fast line:

| Page | Our JS | Images | Third-party | Other | LCP |
|---|---:|---:|---:|---:|---:|
| Geirangerfjord | 1.06 MB | 39 KB | 3.63 MB in 39 requests | 2.52 MB | 4.1 s |
| Bergen city | 1.10 MB | 26 KB | 3.63 MB in 39 requests | 2.78 MB | 0.8 s |
| Sherpatrappa article | 0.82 MB | 226 KB | 0.23 MB in 16 requests | 0.28 MB | 0.7 s |
| Lofoten | 0.88 MB | 27 KB | 0.23 MB | 0.28 MB | 0.9 s |

The fjord and city pages carry about 6 MB more than an article, all of it from the Aviasales flight-search widget (`tpwgt.com`) that those two templates embed, plus its fonts and frames. On a real mobile network that is the 17-second LCP and the 832 ms INP in Speed Insights. The hero images are not the problem (95 to 437 KB source files, served resized).

Fix, in order: load the widget only when the visitor scrolls to it or taps a "Search flights" button (one click, no payload on landing); then split the fjord activity and basecamp client components so they hydrate after the hero; keep the Travelpayouts verification script out of the critical path or remove it once the account is verified. Target: every hub under 2.5 s LCP p75 and under 200 ms INP.

### 3. Put the quick answer and a contents list at the top of long articles

The Northern Lights and Tromsø pages already have quick-answer blocks. Articles over 1,200 words get the same plus jump links to their H2s. Readers who find their answer in the first screen stay to read the rest more often than readers who scroll blind; the contents list also feeds AI assistants.

### 4. Make the planner a visible, one-click action

A persistent "Add to my trip" button on article and destination pages (place, dates optional), not a card at the bottom. Each add is an engaged visit and a reason to return. Target: `trip_planner_opened` from 11 a month to 60.

### 5. Match language to visitor

Chinese and Japanese visitors still land on English pages because only 13 pages are translated. Every translated page is a visit that does not bounce for language reasons. The translation order is in the visibility plan.

### 6. Measure weekly, exclude the crawler

Add to `scripts/traffic-report.mjs`: pages per visit (page views / unique visitor-days), engaged events per 100 page views, `related_content_click` and `trip_planner_opened`, all with `country ne 'SG'` until that crawler stops, and the LCP p75 table by route. Review on the plan's gates: 3 November, 1 December, 29 December 2026.

## What we will not do

- No pop-ups, exit-intent overlays or newsletter interstitials. They lower bounce on paper and lose the reader.
- No infinite scroll or auto-loading the next article. It inflates page views without a decision by the reader.
- No chasing the Singapore crawler out of the numbers by blocking it; just exclude it in the report.

## Targets

| Measure | Now | 1 December 2026 | 29 December 2026 |
|---|---|---|---|
| Pages per visit (SG excluded) | 1.28 | 1.40 | 1.50 |
| Engaged events per 100 page views | about 14 | 20 | 25 |
| Related-content clicks per month | 2 | 25 | 40 |
| Trip planner opens per month | 11 | 35 | 60 |
| Fjord page LCP p75 | 17.0 s | under 4 s | under 2.5 s |
