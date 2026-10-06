# Plan: Norge Travel visibility through the Chinese and Japanese sites

Owner: site owner. Written 6 October 2026. Baseline: [worklog 2026-10-06](worklog/2026-10-06-baseline.md). Keywords: [zh-ja-keyword-map.md](zh-ja-keyword-map.md). Effects on foreign engines and LLMs: [report-foreign-search-llms.md](report-foreign-search-llms.md).

## The goal, as set

Make "Norge Travel" the brand and dominate "norge travel", "norge northern lights", "norge fjords", "norge lofoten", "norge tromso" and "norge norway", with Chinese and Japanese search as the focus. Test whether this is a cheaper way to gain visibility than competing head-on for "norway travel", "norway holiday" and "norway lofoten", and whether it moves Baidu and Japanese search.

Clarified 7 October 2026: the result that matters most is the answer a traveller gets from an AI assistant in their own language, for example 我想去挪威，去特罗姆瑟看极光 or ノルウェーのトロムソでオーロラを見たい. Being cited in that answer counts as much as a position on a results page.

## What we are testing

| | Hypothesis | What would prove it |
|---|---|---|
| H1 | Owning the "norge" terms is cheap because nobody competes for them | norgetravel.com ranks 1 for "norge travel" within 8 weeks; "Norge Travel" brand searches appear in Search Console |
| H2 | Chinese and Japanese search is cheaper per visit than English | Translated pages reach page 1 for their target terms within 12 weeks; visits per translated page exceed visits per comparable English page |
| H3 | Ranking for "norge X" and in zh/ja lifts the hard English terms | Impressions for "norway travel", "norway lofoten" and "norway holiday" rise more than the English-only trend |
| H4 | The push moves Baidu and Japanese engines | Baiduspider starts crawling and baidu.com referrals appear; Yahoo Japan indexes /ja/ pages and yahoo.co.jp referrals appear |
| H5 | Assistants cite the zh/ja pages when asked about Tromsø and the Northern Lights in Chinese or Japanese | AI fetches of the Tromsø, Northern Lights, best-time and cost pages rise from 0 (baseline 6 October) and norgetravel.com appears in the monthly prompt test |

## What the evidence says today

Honest starting point, from the baseline worklog:

- "norge" has no travel demand outside Scandinavia (Trends: 0 in the US, Japan and Taiwan against "norway"), and engines treat it as a synonym of "norway": the results for "norge northern lights" are the "norway northern lights" pages. H1 is therefore about the brand term "norge travel", which we do not rank for today. Cheap to fix. It will not by itself move H3.
- The zh/ja field is weak where it matters: for "ノルウェー 旅行 費用" a machine-translated hostel site and a translated Czech blog rank. A real translation with exact prices can beat them. Chinese guest nights grew 78% in 2025. H2 is plausible and is the core bet.
- Baidu is not crawling the site (0 Baiduspider requests in 7 days) and Bing is not either (0 Bingbot, 45 pages indexed from earlier crawls). Yahoo Japan has about 28 old URLs and no /ja/ page. H4 cannot move until the engines are told the site exists.
- ChatGPT read the site about 950 times in the week against 285 human page views. Visibility in AI assistants is already larger than visibility in search.

## Why it should be cheaper

Cost here is work per page that reaches page 1.

| Path | Who ranks today | What it takes |
|---|---|---|
| "norway travel", "norway travel guide" (English) | Lonely Planet, Rough Guides, Visit Norway, TripAdvisor, lifeinnorway.net | Years of links; one of the hardest travel SERPs in Europe |
| "norge travel" (brand) | Nobody relevant | Brand consistency and indexing. Done this week |
| "ノルウェー 旅行 費用", "ノルウェー ベストシーズン" (Japanese) | Tour operators, translated blogs, hostelz.com/ja | One faithful translation per topic |
| "挪威旅游攻略", "挪威旅游费用" (Chinese on Google) | visitnorway.com/cn, KKday, Klook, Trip.com, Taiwanese blogs | One faithful translation per topic, plus hreflang so Google shows the zh page to zh users |
| Baidu | Chinese platforms (Mafengwo, Ctrip, Baidu's own properties) | Registration and sitemap; real ranking needs an ICP licence, which needs a Chinese entity |

A translation takes an afternoon with the subagent pipeline and a review pass. A top-10 English ranking for "norway travel" is not available at any price we would pay. So the bet is cheap on the cost side; what the experiment measures is the return side.

## Phases and dates

### Phase 0: baseline (6 October 2026, done)

Numbers recorded in the baseline worklog. The weekly script reproduces them.

### Phase 1: foundation (deploy this week)

- [x] Brand "Norge Travel" in all titles, og:site_name, WebSite and TravelAgency structured data with alternateName (NorgeTravel, 挪威旅行, ノルウェー旅行).
- [x] zh/ja home page, navbar and footer in their own language; titles lead with 挪威旅游攻略 and ノルウェー旅行.
- [x] Canonical and hreflang (en, zh-Hans, ja); untranslated zh/ja pages canonicalise to English; sitemap lists only translated pages.
- [x] Vercel Analytics on /zh/ so Chinese page views can be measured.
- [x] Translate the four pages that match the biggest clusters: norway-cost-budget-guide, best-time-visit-norway, tjenester/northern-lights, destinations/tromso (zh and ja).
- [x] Register the translated static paths in `TRANSLATED_PATHS` (src/lib/i18n-seo.ts) so they get self canonicals and enter the sitemap. Sitemap now lists 135 en, 8 zh and 5 ja URLs.
- [x] Quick-answer block, six-question Q&A section and FAQPage structured data on the Northern Lights and Tromsø pages in en, zh and ja, phrased the way people ask assistants (特罗姆瑟几月能看到极光？ / トロムソでオーロラが見られる時期はいつですか？).
- [ ] Commit, merge to master, confirm the live /zh/ and /ja/ titles and canonicals.

### Phase 2: tell the engines (by 13 October 2026)

- [ ] Google Search Console: confirm the www property is verified and the sitemap at /sitemap.xml is submitted; request indexing of the four translated zh and ja URLs.
- [ ] Bing Webmaster Tools: add the site (import from Search Console takes a minute), submit the sitemap. Bing feeds Bing Japan, Copilot, DuckDuckGo and Ecosia. Put the code in `BING_SITE_VERIFICATION`.
- [ ] Baidu Search Resource Platform (ziyuan.baidu.com): **on hold since 7 October 2026** until a Chinese account can be verified (registration needs a mobile number that Baidu accepts). When that exists: add the site, verify with `BAIDU_SITE_VERIFICATION`, submit the sitemap at 普通收录. Expect slow crawling without an ICP licence. Until then, Chinese visibility is measured on Google, Bing and Petal Search only, and a zero for Baiduspider in the weekly report is expected, not a failure.
- [ ] Check reachability from mainland China with a China ping tool (chinaz or 17ce). If the www host is blocked or very slow from mainland IPs, Baidu will not rank it whatever we do.

### Phase 3: content (by 31 October 2026)

Translate, in this order (demand first, each in zh and ja):

1. destinations/fjords (挪威峡湾攻略 / ノルウェー フィヨルド 時期)
2. destinations/lofoten and bergen-to-lofoten-routes (罗弗敦群岛攻略 / ロフォーテン諸島 行き方)
3. norway-ferry-guide (挪威自驾注意事项 / フィヨルド フェリー)
4. destinations/svalbard (斯瓦尔巴群岛旅游费用 / スバールバル諸島 ツアー)
5. New FAQ article: winter and summer daylight (挪威冬天全是黑夜吗, 挪威夏天日不落吗 / ノルウェー 冬 日照時間, 服装)
6. New FAQ article: visa, safety, cash and cards (挪威签证好办吗, 挪威旅游安全吗 / ノルウェー 旅行 治安, 現金). Visa facts only from UDI and the visa centre.

Each translation: body in the language, "Norge" glossed once near the top (挪威（挪威语：Norge）, ノルウェー（ノルウェー語：Norge）), place names as searchers type them, no em dashes, numbers unchanged, path registered in `TRANSLATED_PATHS` or body present in articles_zh.json / articles_ja.json.

### Phase 4: distribution where Chinese travellers plan (from November 2026, optional)

Mainland travellers plan on Xiaohongshu, Mafengwo and Ctrip more than on search engines. One short post per translated guide on Xiaohongshu with a link, and a note.com post in Japanese, costs little and creates the first Chinese and Japanese links to the site. Track with the referrer sources in the weekly report.

### Phase 5: evaluation gates

| Date | Gate | Pass | Fail action |
|---|---|---|---|
| 3 November 2026 (4 weeks) | Indexing | At least 8 /ja/ and 8 /zh/ pages indexed in Google (Search Console); Bingbot crawling (Baidu on hold, see Phase 2) | Fix indexing before translating more |
| 1 December 2026 (8 weeks) | Rankings and brand | norgetravel.com in the top 3 for "norge travel"; at least 4 translated pages on page 1 (positions 1 to 10) for a target term in Search Console | Review the translations with a native speaker; check titles against the keyword map |
| 29 December 2026 (12 weeks) | Return | /zh/ plus /ja/ at 50 or more human visits per week from search engines, up from 0; visits per translated page at least equal to the same page in English | Keep the zh/ja sites, stop adding translations, move effort to English content and links |

The English pages are the control. If English search visits rise over the same weeks, the rise is seasonal (aurora season) and is subtracted before judging H3.

## The LLM answer test

Baseline, 7 days to 6 October 2026: ChatGPT fetched the site 970 times, 432 of them the home page, the rest English trip reports and Trondheim attractions. It fetched the Tromsø page, the Northern Lights page and every /zh/ and /ja/ page zero times. For the question "I want to go to Norway, see Tromsø and the Northern Lights" the site is not in any assistant's answer today, in any language.

What an assistant needs from a page before it will quote it: the page is in the index the assistant searches (Google and Bing for ChatGPT, Gemini, Perplexity and Copilot; Baidu, Toutiao, Quark and Bing for the Chinese assistants); the page answers the question in the language it was asked, in a self-contained passage; the facts carry dates, prices and names; headings match the questions people ask. The Tromsø and Northern Lights pages get a quick-answer block, a Q&A section and FAQPage structured data in all three languages for this reason.

What "Norge Travel" does here: a keyword engine treats "norge" as a synonym of "norway" and nothing more. An assistant reads the brand as "Norway travel" in any language and uses that when it judges whether a fetched page is relevant. That helps selection, not retrieval; the retrieval still runs on 挪威, ノルウェー and Norway.

Monthly prompt test (first run after deploy, then the first Monday of each month). Ask each assistant with web search on, record whether norgetravel.com is cited and which page:

| Assistant | Prompt zh | Prompt ja | Prompt en |
|---|---|---|---|
| ChatGPT, Gemini, Perplexity, Copilot | 我想去挪威旅游，去特罗姆瑟看极光，几月去最好，怎么安排？ | ノルウェーのトロムソでオーロラを見たいです。時期と費用、行き方を教えてください | I want to travel to Norway, visit Tromsø and see the Northern Lights. When, how, and what does it cost? |
| Doubao, DeepSeek, Kimi, Qwen, Ernie | 挪威特罗姆瑟极光攻略：几月、多少钱、要不要跟团？ | (not applicable) | (not applicable) |
| Yahoo Japan AI, Gemini in Japanese | (not applicable) | ノルウェー旅行の費用はいくらですか？ノルウェーのベストシーズンは？ | (not applicable) |

Also ask the cost and best-time questions (挪威旅游需要多少钱 / 挪威几月去最好, ノルウェー 旅行 費用 / ベストシーズン). Record results in the monthly log next to the Search Console export.

## How we measure

- Weekly, Monday: `node scripts/traffic-report.mjs` writes `docs/seo/worklog/traffic-<date>.md` with page views and human requests per language, sources (Google, Yahoo Japan, Baidu, Bing, ChatGPT and others), top pages, AI assistant fetches per page and language (the H5 metric), and a crawler watch list (Baiduspider, Bingbot, Googlebot, Bytespider and others).
- Monthly: Search Console export of queries for the /zh/ and /ja/ pages and for the terms "norge travel", "norway travel", "norway holiday", "norway lofoten". Filed next to the weekly log.
- Baidu: Baidu Search Resource Platform shows crawl and index counts once the site is registered. Copy them into the monthly log.

## Risks

- Engines conflate "norge" with "norway", so the "norge X" terms give almost no separate traffic. Treated as brand work, not as a traffic source.
- Vercel Analytics may be blocked from mainland China. The human-request count in the weekly report does not depend on it.
- Baidu rarely ranks foreign-hosted sites without an ICP licence. Baidu is measured but not relied on.
- Partial translations (English body under a Chinese title) look like thin content. The site now sends untranslated zh/ja pages to the English canonical, so only real translations are indexed.
- Translations by an AI agent carry a risk of tone and terminology slips. A native read of the four Phase 1 pages before the 8-week gate is the cheapest insurance.
