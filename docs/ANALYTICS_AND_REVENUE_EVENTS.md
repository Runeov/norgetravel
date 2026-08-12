# Analytics and revenue event map

This document defines the shared measurement layer for the visitor-to-revenue funnel.
Events are sent to Vercel Analytics and to GA4 when the visitor has accepted analytics cookies.

## Funnel

1. Discovery: the existing analytics page view identifies the landing page and referrer.
2. Engagement: `article_engaged` and `scroll_depth` show whether the visitor consumed the page.
3. Exploration: `related_content_click` and `transport_filter_used` show planning intent.
4. Planning: `trip_item_added` and `trip_planner_opened` show high intent.
5. Commercial action: `transport_operator_click` and `affiliate_click` show outbound demand.
6. Advocacy: `share_completed` shows content visitors considered useful enough to share.

## Events

| Event | Trigger | Important properties |
| --- | --- | --- |
| `article_engaged` | An article is visible for 30 seconds | `duration_seconds`, `path`, `language` |
| `scroll_depth` | A visitor reaches 50% or 90% | `percent`, `content_type`, `path` |
| `related_content_click` | A related article is selected | `placement`, `target`, `link_text` |
| `transport_filter_used` | A region or travel-mode filter changes | `filter`, `value`, `category` |
| `transport_operator_click` | A listing's operator website is opened | `item_id`, `item_name`, `destination`, `partner` |
| `affiliate_click` | A sponsored or injected affiliate link is opened | `partner`, `destination`, `placement`, `link_text` |
| `commercial_offer_viewed` | At least 50% of a structured offer becomes visible | `offer_id`, `offer_type`, `partner`, `placement` |
| `commercial_offer_clicked` | A structured offer CTA is selected | `offer_id`, `offer_type`, `partner`, `placement` |
| `trip_item_added` | An item is saved to a trip | `item_id`, `item_name`, `category`, `destination` |
| `trip_item_removed` | A saved item is removed | `item_id`, `item_name`, `category`, `destination` |
| `trip_planner_opened` | The planner is opened, restored, or entered from an article | `source` or `placement`, `target` |
| `trip_planner_minimized` | The map planner is minimized | `selected_zone`, `drill_down_zone` |
| `trip_planner_closed` | The map planner is closed | `path` |
| `share_started` | An external social or email share target is opened | `method`, `target` |
| `share_completed` | A native share or copy-link action completes | `method`, `target` |

Every event also receives `path` and `language` from the central helper.

## Affiliate attribution

Links marked with `rel="sponsored"` or the `affiliate-link` class are tracked automatically.
The tracker removes query parameters from the recorded destination so partner IDs and visitor data
are not copied into analytics. Wrap a commercial section with
`data-analytics-placement="placement_name"` to distinguish placements without writing new event code.

Use stable, descriptive placement names such as:

- `article_body`
- `transport_flight_banner`
- `destination_activity_list`
- `article_planner_card`
- `affiliate_card:partner_name`

## Reporting baseline

Review these figures by landing page, country, device category, and operating system:

- engaged article rate
- 50% and 90% scroll rate
- related-content click-through rate
- trip items added per engaged visitor
- affiliate clicks per 1,000 engaged visits
- operator clicks by transport type and destination
- planner opens per engaged visitor

Keep GNU/Linux traffic as a separate segment until its unusually high share has been validated.
Do not use raw visitor totals as the primary optimization metric.

## Adding future sales products

New affiliate, lead-generation, sponsored, or direct-sale components should always provide:

- a stable offer or product identifier
- partner name or `direct`
- offer type
- placement
- destination or topic
- CTA label
- displayed price and currency when applicable
- disclosure text
- active and seasonal dates

Add impression tracking only when an offer is actually viewable, and use click or submission events
for intent. Revenue and completed-order events should come from a server-side confirmation or partner
postback rather than a button click.

## Managing structured offers

Offers live in `src/data/commercial-offers.ts` and are validated by
`src/lib/schemas/commercial-offer.schema.ts`. Only `published` offers inside their optional
validity window are returned. When more than one offer targets the same placement, the highest
`priority` appears first.

Supported offer types are:

- `affiliate`
- `sponsored`
- `lead-generation`
- `direct-sale`

Render offers with `CommercialOfferPanel`. The component records a view only after at least half
the panel enters the viewport. It records its own click attribution and prevents the global link
listener from double-counting the same action. Affiliate offers also emit `affiliate_click` so
existing affiliate reports continue to work.

Current placement names:

| Placement | Page location |
| --- | --- |
| `transport_after_flights` | Below the flight listings on the transport page |

Before publishing an offer, verify the URL, disclosure, validity dates, price wording, mobile
layout, and partner agreement. Never include private commission values in the public component.
