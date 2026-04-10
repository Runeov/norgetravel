const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'src', 'data', 'articles.json');
const data = JSON.parse(fs.readFileSync(articlesPath, 'utf-8'));

// ============================================================
// ARTICLE 1: FOSSEVANDRING (WATERFALL WALK)
// ============================================================
const fossevandringContent = [
  '<p class="text-lg text-slate-700 leading-relaxed">Every logistics plan I build for Geiranger starts with one question: how many hours does the client have? If the answer is two or less, I send them to the Fossevandring. Not because it is the easiest option. Because it is the single most efficient introduction to what makes this fjord a UNESCO World Heritage site: the water, the rock, the vertical scale, and the 327 Corten steel stairs that put you inside all of it.</p>',

  '<p>The Fossevandring (Waterfall Walk) is the lower section of Fosserasa, Norway\u2019s first certified Nasjonal Turiststi (National Hiking Trail). It connects Geiranger\u2019s cruise pier to the Norsk Fjordsenter (Norwegian Fjord Centre) in 1.2 km and 85 meters of climbing. The path follows the Geirangerelva river uphill through the village, past two old hydropower plants, and alongside Storfossen, a 35-meter waterfall that crashes directly into the settlement. 180,000 people walk this route each year. The trail is lit at night and open year-round, including winter, when the falls freeze into towering ice formations.</p>',

  '<figure class="my-8"><img src="/images/geiranger/fossevandring_stairs.jpg" alt="Waterfall cascading down a steep cliff face at Geirangerfjord with green vegetation on the mountainside" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">The waterfalls that powered Geiranger village for over a century. The Fossevandring follows the river uphill through 327 steel stairs to the Fjord Centre at 85 meters above the fjord. Photo: Szilas, public domain</figcaption></figure>',

  '<h2>What this walk actually is</h2>',

  '<p>The Fossevandring is not a wilderness hike. It is an engineered walkway through the working heart of Geiranger\u2019s water system. The path starts near Geiranger Camping, 200 meters from the cruise pier, and climbs through the village alongside the Geirangerelva. The first sections are gentle. The final 400 meters are the 327 Corten steel stairs with handrails, landings, and viewpoints built directly into the rock face alongside the river.</p>',

  '<p>The steel has been left to oxidise deliberately. Corten steel develops a stable rust patina that protects the underlying metal and requires no paint. Against the grey rock and white water, the warm brown colour of the stairs disappears into the landscape rather than competing with it.</p>',

  '<p>You pass two decommissioned hydropower plants along the route. These are relics of how Geiranger\u2019s early residents harnessed the river to generate electricity. The infrastructure predates the tourism era entirely. The waterfalls that now draw 180,000 visitors per year once powered the village.</p>',

  '<h2>The waterfalls</h2>',

  '<p><strong>Storfossen</strong> is the main attraction: a 35-meter waterfall fed by the Geirangerelva, crashing over exposed rock directly beside the stairs. In spring, snowmelt makes the river enormous. You can hear rocks being shifted by the water pressure. In July, the spray reaches the handrails. In January, the falls freeze into vertical ice columns that local photographers wait all year to shoot.</p>',

  '<p><strong>Grinddalsfossen</strong> is visible from the upper sections of the walk. It cascades 660 meters from source to fjord in a series of long, stretched falls down the cliff face behind the village. You see it in the background as you climb, white lines drawn on grey rock. Two rivers merge just before Storfossen: the Grinddalselvi and the Geirangerelva. The confluence is visible from one of the stair landings.</p>',

  '<h2>The Norsk Fjordsenter at the top</h2>',

  '<p>The Fossevandring ends at the Norsk Fjordsenter (Norwegian Fjord Centre), the visitor and education hub for the Geirangerfjord UNESCO World Heritage site. The centre is worth the entry fee for context before you continue hiking the upper Fosserasa trail to Storseterfossen.</p>',

  '<p>The permanent exhibition covers the geological formation of the fjord, local farming history, and the working tools of the families who farmed the cliff ledges above. An outdoor exhibition of bronze sculptures by Ola Stavseng was unveiled by Queen Sonja in September 2025. The Fjordheim children\u2019s exhibition is interactive: glaciers, rivers, and rocks explained for younger visitors. There is a panoramic cinema with a curved screen and seating for 100.</p>',

  '<p>Entry: 160 NOK adults, 85 NOK children (5\u201315), free under 5, 320 NOK family ticket. Open daily 10:00\u201316:00 in summer. The centre has a caf\u00e9 with local produce, a shop, outdoor picnic area with campfire facilities, a playground, and 24-hour outdoor toilets in summer.</p>',

  '<figure class="my-8"><img src="/Banners/geiranger_banner.jpg" alt="Panoramic view of Geiranger village and Geirangerfjord from an elevated position, mountains rising on both sides of the fjord" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">Geiranger from above. The Fossevandring climbs from the cruise pier through the village to the Fjord Centre at 85 meters. The continuation trail to Storseterfossen reaches 540 meters.</figcaption></figure>',

  '<h2>What works</h2>',

  '<ul>',
  '<li><strong>The year-round access.</strong> This is one of the few trails in Geiranger you can walk in any month. In winter, the frozen waterfalls and the blue-hour light create an atmosphere that the summer crowds never see. The trail is lit, so evening walks are possible even during the dark months.</li>',
  '<li><strong>The engineering.</strong> The Corten steel stairs are solid, well-drained, and built with landings every 20 to 30 steps. The handrails are continuous. For an infrastructure project carrying 180,000 visitors annually, the condition is remarkable. Fencing runs along the steeper sections near the river.</li>',
  '<li><strong>The hydropower history.</strong> Two old power plants sit along the route. Most visitors walk past them without noticing. If you look, you see the channels, the intake structures, and the remains of mill dams. These waterfalls generated electricity before they generated tourism revenue. That history adds a layer that the cruise ship passengers rushing through will miss.</li>',
  '<li><strong>The cruise ship calculation.</strong> The trailhead is a 5-minute walk from the cruise pier. The walk takes 30 to 40 minutes up. Add 20 minutes at the top and 20 minutes down, and you are back at the ship in under 90 minutes. No bus, no booking, no guide required.</li>',
  '</ul>',

  '<h3>What does not work</h3>',

  '<ul>',
  '<li><strong>The midday crowds.</strong> When five cruise ships dock simultaneously (the daily maximum is 8,000 cruise visitors), the steel stairs become a queue. Arrive before 09:30 or after 16:00. Evening walks are a genuine alternative: the trail is lit, and the waterfall sounds different in the quiet.</li>',
  '<li><strong>Accessibility limitations.</strong> The 327 stairs make this impossible for wheelchairs and difficult for strollers. If you cannot manage stairs, drive to the Norsk Fjordsenter via the road from Hotel Union and enjoy the exhibitions without the climb. The exhibitions alone justify the visit.</li>',
  '<li><strong>The wet stairs.</strong> Waterfall spray makes the steel slippery, particularly in spring when flow is highest and in winter when ice forms. The slip-resistant surface helps, but shoes with grip are still necessary. Sandals are a poor choice here.</li>',
  '</ul>',

  '<h2>The honest assessment</h2>',

  '<p>The Fossevandring is the trail that works for everyone with functioning knees and 90 minutes to spare. It is not a wilderness experience. It is a walk through the infrastructure that built Geiranger: the water, the power, the rock. The 327 stairs are the centrepiece, but the hydropower plants and the Fjord Centre bookend them with context that transforms a simple waterfall walk into an education in how fjord communities survived.</p>',

  '<p>If you are continuing to Storseterfossen, the Fossevandring is the first third of that journey and worth doing even if you plan to drive to Vesteras farm and skip the middle section. If you have only two hours in Geiranger and must choose one thing, this is the thing.</p>',

  '<h2>The logistics</h2>',

  '<table class="w-full text-sm my-6 border border-slate-200 rounded-lg overflow-hidden">',
  '<thead class="bg-[#1A365D] text-white"><tr><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Detail</th><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Information</th></tr></thead>',
  '<tbody class="divide-y divide-slate-100">',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Trail name</td><td class="px-4 py-3 text-slate-600">Fossevandring (part of Fosserasa Nasjonal Turiststi)</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Distance</td><td class="px-4 py-3 text-slate-600">1.2 km one way</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Elevation gain</td><td class="px-4 py-3 text-slate-600">85 m</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Time</td><td class="px-4 py-3 text-slate-600">30\u201340 minutes up, 20 minutes down</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Grade</td><td class="px-4 py-3 text-slate-600">Green (easy). Stairs with handrails throughout.</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Season</td><td class="px-4 py-3 text-slate-600">Year-round (trail is lit at night)</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Trail fee</td><td class="px-4 py-3 text-slate-600">Free</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Fjord Centre entry</td><td class="px-4 py-3 text-slate-600">160 NOK adult, 85 NOK child (5\u201315), 320 NOK family</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Fjord Centre hours</td><td class="px-4 py-3 text-slate-600">10:00\u201316:00 daily (summer)</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Start point</td><td class="px-4 py-3 text-slate-600">Geiranger village, 200 m from cruise pier</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">End point</td><td class="px-4 py-3 text-slate-600">Norsk Fjordsenter, Gjovahaugen 35</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Guided walk</td><td class="px-4 py-3 text-slate-600">Fjord Ranger tour daily 12:00, from 600 NOK (incl. Fjord Centre entry)</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Annual visitors</td><td class="px-4 py-3 text-slate-600">180,000 (Milj\u00f8direktoratet, 2024)</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Emergency</td><td class="px-4 py-3 text-slate-600">112 (police/rescue) or 113 (medical)</td></tr>',
  '</tbody></table>',

  '<h2>Who should walk this</h2>',

  '<ul>',
  '<li><strong>Cruise ship passengers with under 2 hours.</strong> Five minutes from the pier, no booking needed, free to walk, and you are back aboard in 90 minutes. This is the single best use of a short port call in Geiranger.</li>',
  '<li><strong>Families with young children.</strong> The handrails and fencing make this safe for children who can manage stairs. The Fjordheim children\u2019s exhibition at the Fjord Centre rewards the climb. Strollers do not work on the stairs, but child carriers do.</li>',
  '<li><strong>Anyone arriving in Geiranger for the first time.</strong> The Fossevandring and the Fjord Centre together provide the context for everything else you will see: the waterfalls, the cliff farms, the UNESCO designation. Do this first, then drive the Eagle Road or hike to Storseterfossen with understanding rather than just photographs.</li>',
  '</ul>',

  '<h2>Who should skip this</h2>',

  '<ul>',
  '<li><strong>Anyone who cannot manage stairs.</strong> 327 steps with no alternative route. The Fjord Centre is accessible by road from Hotel Union if you want the exhibitions without the climb.</li>',
  '<li><strong>Hikers who want solitude.</strong> This is the most-walked trail in Geiranger. If you want quiet, drive to Vesteras and start the Storseterfossen or L\u00f8sta trail instead.</li>',
  '<li><strong>Visitors looking for a full-day hike.</strong> The Fossevandring is 30 to 40 minutes. It is the appetiser, not the main course. Continue on the Fosserasa trail to Storseterfossen if you want a proper half-day hike.</li>',
  '</ul>',

  '<p class="text-sm text-slate-500 mt-8 pt-4 border-t border-slate-200"><em>Ingrid Solheim is the Fjord Logistics Editor at NorgeTravel. She spent eleven years putting tourists into rental cars in Bergen and watching them drive off with itineraries that were never going to work. Her guides are written so that does not happen to you. She can be reached at <a href="mailto:hei@norgetravel.com">hei@norgetravel.com</a>.</em></p>',

  '<p class="text-xs text-slate-400 mt-4"><em>Images: Geiranger waterfall by Szilas (public domain, Wikimedia Commons). Geiranger panorama by NorgeTravel.</em></p>',
].join('');

// ============================================================
// ARTICLE 2: LOSTA VIEWPOINT
// ============================================================
const lostaContent = [
  '<p class="text-lg text-slate-700 leading-relaxed">There are four viewpoints above Geirangerfjord that you can drive to. Flydalsjuvet has the postcard angle. \u00d8rnesvingen has the Eagle Road below you. Dalsnibba has the glacier panorama at 1,476 meters. All three involve a car, a parking fee, and a crowd. L\u00f8sta is the viewpoint you earn on foot: 500 meters above the fjord, natural rock, no platform, no railing, no one selling waffles at the top. On a clear morning, you can see the Eagle Road hairpins, the village, the cruise ships, and Homlong across the water. The view is not filtered through a safety barrier. It is filtered through the sweat it took to get there.</p>',

  '<p>The trail starts from Vesteras Gard farm, the same 17th-century seter (summer mountain farm) that serves as the trailhead for Storseterfossen. From Vesteras, it is roughly 1.5 km to the viewpoint with 210 meters of elevation gain. The first half follows a wide tractor road through grazing pastures. The second half narrows into a mountain path with one rope-assisted section over steep rock. There is no official DNT grade for L\u00f8sta, but the terrain places it between Blue and Red on the Norwegian scale: moderate fitness required, proper footwear essential, and the rope section demands honest self-assessment.</p>',

  '<figure class="my-8"><img src="/images/geiranger/geirangerfjord_view_losta.jpg" alt="Panoramic view from L\u00f8sta viewpoint 500 meters above Geirangerfjord, showing the turquoise fjord water, Geiranger village below, Eagle Road hairpins on the right mountainside, and Homlong across the water" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">The view from L\u00f8sta: 500 meters above the fjord, the Eagle Road hairpins visible on the right, Geiranger village and the cruise pier below. No platform, no railing, no crowd. Photo: Bloodworx, CC0</figcaption></figure>',

  '<h2>What this trail actually is</h2>',

  '<p>L\u00f8sta is an ancient abandoned settlement turned viewpoint, accessed by a trail that changes character halfway through. The hike splits into two distinct sections.</p>',

  '<p><strong>Section 1: Vesteras to the trail split (600\u2013700 meters).</strong> A wide tractor road through birch forest and grazing pastures. You pass through a gate at the farm. Close it behind you. Sheep, goats, and llamas roam the path. Expect manure. The walking is flat to gentle uphill, and anyone in reasonable health can manage it.</p>',

  '<p><strong>Section 2: Trail split to L\u00f8sta viewpoint (800\u2013900 meters).</strong> Turn right at the fork (left goes to Vester\u00e5sfjellet, a shorter and easier viewpoint). The path narrows into a mountain trail: exposed roots, large rocks, mud even in dry weather, and one rope-assisted section where the terrain steepens over slick rock. This is where the hike earns its difficulty. The final approach to the viewpoint is open and exposed.</p>',

  '<h2>The viewpoint</h2>',

  '<p>L\u00f8sta is a natural rock promontory at approximately 500 meters above sea level. There is no built platform. There are no fences or safety barriers. You stand on exposed rock with a 120-degree panorama of the Geirangerfjord.</p>',

  '<p>What you see: the full length of the fjord stretching westward, the Eagle Road (\u00d8rnevegen) switchbacks carved into the opposite mountainside, Geiranger village directly below, cruise ships at anchor, and Homlong across the water. On clear days, Vinsashornet peak (1,346 meters) is visible in the distance.</p>',

  '<p>The difference between L\u00f8sta and the car-accessible viewpoints is not just the absence of crowds. It is the angle. Flydalsjuvet looks down the fjord. \u00d8rnesvingen looks from the road. Dalsnibba looks from above the clouds. L\u00f8sta looks from inside the fjord wall, at a height where the scale of the water, the rock, and the Eagle Road geometry all register simultaneously.</p>',

  '<figure class="my-8"><img src="/images/geiranger/ornesvingen_viewpoint.jpg" alt="View from \u00d8rnesvingen viewpoint showing the Eagle Road hairpin bends descending toward Geirangerfjord" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">The Eagle Road hairpins from \u00d8rnesvingen. From L\u00f8sta, you see the same switchbacks from the opposite side of the fjord, at equal height, without the car park crowd.</figcaption></figure>',

  '<h2>What works</h2>',

  '<ul>',
  '<li><strong>The earned solitude.</strong> L\u00f8sta does not appear on most tourist itineraries. The rope section filters out casual walkers. On a July morning, you may share the viewpoint with one or two other hikers. Compare that to the 50-person queue at Flydalsjuvet between 10:00 and 15:00.</li>',
  '<li><strong>The combined potential.</strong> Both L\u00f8sta and Storseterfossen start from Vesteras farm. You can hike L\u00f8sta first (1.5 km, 210 m gain), return to the farm, then hike Storseterfossen (2.9 km, 257 m gain). Total: 6 km of hiking, 4 to 5 hours, two completely different rewards. Eat at the farm restaurant between the two.</li>',
  '<li><strong>The photography angle.</strong> L\u00f8sta is the only viewpoint that shows both the fjord and the full Eagle Road switchback pattern from a facing angle. Photographers working in the golden hours will find compositions here that are not possible from any car-accessible viewpoint.</li>',
  '</ul>',

  '<h3>What does not work</h3>',

  '<ul>',
  '<li><strong>The rope section.</strong> One steep rocky passage near the summit requires using a fixed rope for balance and grip. If you are uncomfortable with exposure or have limited upper body confidence, this section will feel serious. Assess honestly before committing. There is no shame in turning back at the rope and walking to Vester\u00e5sfjellet viewpoint instead (shorter, easier, still a good view).</li>',
  '<li><strong>The mud.</strong> Even in dry weather, sections of the trail hold water. Trip reports describe deeply rutted, muddy ground on the second half. Waterproof hiking boots are not optional. Trail runners will get soaked.</li>',
  '<li><strong>No safety barriers at the viewpoint.</strong> The rock promontory has no fences, no railings, no platform edge markers. This is not a built viewpoint. Exercise extreme caution near the edge, particularly in wind or rain when the rock surface becomes slick. Keep children well back from the edge.</li>',
  '<li><strong>Spring avalanche risk.</strong> The trail crosses terrain susceptible to avalanches when snow remains on the mountain. Meltwater creates dangerous flow across the path. Check varsom.no (Norwegian Avalanche Warning Service) before hiking L\u00f8sta in May or early June. The Geiranger area falls within the Sunnm\u00f8re avalanche forecast region.</li>',
  '</ul>',

  '<h2>The honest assessment</h2>',

  '<p>L\u00f8sta is the Geiranger viewpoint that rewards effort with privacy. The rope section is real but short. The mud is annoying but manageable. The lack of barriers at the top demands respect but delivers the most unmediated view of the fjord available without a helicopter.</p>',

  '<p>If you are already at Vesteras for Storseterfossen, adding L\u00f8sta is a 2-hour investment for a fundamentally different experience. The waterfall puts you inside the landscape. The viewpoint puts the landscape in front of you. Together, they justify a full day at Vesteras farm with lunch in between.</p>',

  '<h2>The logistics</h2>',

  '<table class="w-full text-sm my-6 border border-slate-200 rounded-lg overflow-hidden">',
  '<thead class="bg-[#1A365D] text-white"><tr><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Detail</th><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Information</th></tr></thead>',
  '<tbody class="divide-y divide-slate-100">',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">From Vesteras Gard</td><td class="px-4 py-3 text-slate-600">~1.5 km one way, 210 m elevation, 1\u20131.5 hrs up</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">From Geiranger village</td><td class="px-4 py-3 text-slate-600">~3 km one way, 430\u2013450 m elevation, 2\u20132.5 hrs up</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Round trip (from Vesteras)</td><td class="px-4 py-3 text-slate-600">~3 km, 2\u20133 hours including time at viewpoint</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Approximate grade</td><td class="px-4 py-3 text-slate-600">Blue\u2013Red (no official DNT grade). Rope section near summit.</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Season</td><td class="px-4 py-3 text-slate-600">Mid-June to mid-September. Check varsom.no for spring avalanche risk.</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Trail fee</td><td class="px-4 py-3 text-slate-600">Free</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Parking (Vesteras)</td><td class="px-4 py-3 text-slate-600">100 NOK (~30 spaces)</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Viewpoint elevation</td><td class="px-4 py-3 text-slate-600">~500 m above sea level</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Safety barriers</td><td class="px-4 py-3 text-slate-600">None. Natural rock promontory with no fences or platform.</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Combine with</td><td class="px-4 py-3 text-slate-600">Storseterfossen waterfall (same trailhead, separate trail)</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Emergency</td><td class="px-4 py-3 text-slate-600">112 (police/rescue) or 113 (medical)</td></tr>',
  '</tbody></table>',

  '<h2>Trail safety</h2>',

  '<p>L\u00f8sta has no official DNT grade, but the terrain places it between Blue and Red on the Norwegian grading system. Three Fjellvettreglene (Mountain Code) rules are directly relevant:</p>',

  '<ul>',
  '<li><strong>Rule 2: Adapt the trip to ability and conditions.</strong> The rope section near the summit requires upper body confidence and stable footing on wet rock. If this exceeds your comfort level, turn back and take the left fork to Vester\u00e5sfjellet viewpoint instead. No shame in the alternative.</li>',
  '<li><strong>Rule 3: Pay attention to weather and avalanche forecasts.</strong> In spring and early June, check varsom.no for the Sunnm\u00f8re avalanche region. The trail crosses avalanche-prone terrain when snow remains. In summer, check yr.no: rain makes the rope section and the viewpoint rock slippery.</li>',
  '<li><strong>Rule 8: Turn back in time.</strong> If weather deteriorates above Vesteras, the exposed viewpoint becomes dangerous. Wind and rain on an unprotected rock promontory with no barriers is a combination you avoid.</li>',
  '</ul>',

  '<h2>Who should hike this</h2>',

  '<ul>',
  '<li><strong>Photographers.</strong> The angle from L\u00f8sta is unique: a frontal view of the Eagle Road switchbacks across the fjord, with the village and cruise ships below. Morning and evening light produces compositions not available from any car-accessible viewpoint.</li>',
  '<li><strong>Hikers combining with Storseterfossen.</strong> If you are already at Vesteras, adding L\u00f8sta creates a full-day hiking programme with two distinct payoffs: a viewpoint and a walk-behind waterfall. Eat at the farm between the two.</li>',
  '<li><strong>Travellers who have already driven the viewpoint roads.</strong> You have seen Geirangerfjord from Flydalsjuvet, \u00d8rnesvingen, and Dalsnibba. L\u00f8sta shows you the same fjord from a perspective that no road reaches. The effort is the filter that makes the view different.</li>',
  '</ul>',

  '<h2>Who should skip this</h2>',

  '<ul>',
  '<li><strong>Anyone with a fear of heights.</strong> The rope section and the unprotected viewpoint both involve exposure. If vertigo is an issue, Vester\u00e5sfjellet (left fork, shorter trail, less exposure) offers a view without the technical section.</li>',
  '<li><strong>Families with young children.</strong> The unprotected cliff edge at L\u00f8sta and the rope section make this unsuitable for children under 10. Take them to Storseterfossen or the Fossevandring instead.</li>',
  '<li><strong>Visitors in May or early June.</strong> Avalanche risk and snowmelt make the trail dangerous in spring. Wait until mid-June when the upper slopes have cleared.</li>',
  '</ul>',

  '<p class="text-sm text-slate-500 mt-8 pt-4 border-t border-slate-200"><em>Ingrid Solheim is the Fjord Logistics Editor at NorgeTravel. She spent eleven years putting tourists into rental cars in Bergen and watching them drive off with itineraries that were never going to work. Her guides are written so that does not happen to you. She can be reached at <a href="mailto:hei@norgetravel.com">hei@norgetravel.com</a>.</em></p>',

  '<p class="text-xs text-slate-400 mt-4"><em>Images: Geirangerfjord from L\u00f8sta by Bloodworx (CC0, Wikimedia Commons). \u00d8rnesvingen viewpoint by NorgeTravel.</em></p>',
].join('');

// ============================================================
// ARTICLE 3: SKAGEFLA MOUNTAIN FARM
// ============================================================
const skageflaContent = [
  '<p class="text-lg text-slate-700 leading-relaxed">The story I tell every client who asks about Skagefl\u00e5 is the one about the tax collector. When the sheriff came to collect taxes, the farmer at Skagefl\u00e5 removed the logs and ladders that served as the only path up the cliff face. The farm became inaccessible. The tax collector left. The farmer put the ladders back. Whether that story is fully true or partly legend, it captures what Skagefl\u00e5 is: a farm so vertical, so improbable, and so committed to survival that even the government could not reach it.</p>',

  '<p>Skagefl\u00e5 sits on a grass ledge 250 meters above Geirangerfjord, directly facing the Seven Sisters waterfall (De Syv S\u00f8strene) on the opposite cliff. Families farmed this ledge from the Middle Ages until 1916, when a rockslide finally made the risk unbearable. They kept 120 dairy goats, 20 to 30 sheep, 6 to 8 cows, and a horse. They tied their children to trees to stop them falling off the edge. They lowered hay and supplies by rope to boats at the fjord below. The trail to reach it today involves either a 45-minute climb from a RIB boat drop at Skagehola, or a 4-to-5-hour overland traverse from Homlong via Homlongs\u00e6tra at 544 meters. Either way, you will understand why they left, and why Queen Sonja came to unveil the UNESCO plaque here in 2006.</p>',

  '<figure class="my-8"><img src="/images/geiranger/skagefla_farm.jpg" alt="Skagefl\u00e5 mountain farm perched on a green grass ledge above the steep fjord cliff, farm buildings visible on the narrow plateau with Geirangerfjord water far below" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">Skagefl\u00e5 farm on its cliff ledge 250 meters above Geirangerfjord. Inhabited from the Middle Ages until 1916. The green plateau held 120 dairy goats. Hay harvesting continued until the 1960s. Photo: rheins, CC BY 3.0</figcaption></figure>',

  '<h2>What this trail actually is</h2>',

  '<p>Skagefl\u00e5 is graded Red (strenuous) by morotur.no, the official outdoor recreation platform for M\u00f8re og Romsdal. Red means steep sections on uneven paths, exposed passages where extra care is needed, hiking experience required, and proper footwear essential. This grade is earned. The approach from the fjord involves wire cables, ropes bolted into rock, and narrow paths clinging to the cliff face with 250-meter drops to the water. The overland route from Homlong involves sustained climbing to 544 meters before a steep descent to the farm.</p>',

  '<p>You have three options to reach Skagefl\u00e5, and the choice changes the day entirely.</p>',

  '<p><strong>Option 1: Boat to Skagehola, hike to farm, boat back.</strong> Take the RIB from Geiranger harbour to Skagehola, a tiny landing bay at the base of the cliff directly below Skagefl\u00e5. Hike 45 minutes steeply uphill (250 meters gain over roughly 2 km) to the farm. Explore. Descend. Take the boat back. Total: 3 to 4 hours including boat transfers. This is the most efficient option and the one I recommend for most travellers.</p>',

  '<p><strong>Option 2: Boat one way, hike the other (traverse).</strong> Take the RIB to Skagehola, hike up to Skagefl\u00e5, continue up to Homlongs\u00e6tra (544 meters), then descend to Homlong and walk back to Geiranger. Total: 6.5 km point-to-point, 550 meters cumulative elevation, 3.5 to 4.5 hours of hiking. This is the classic route and shows you the full range of the trail: cliff face, farm ledge, mountain pasture, and fjord-side road.</p>',

  '<p><strong>Option 3: Full overland round trip from Homlong.</strong> Park at Homlong (2 km from Geiranger), hike up to Homlongs\u00e6tra (544 meters), descend to Skagefl\u00e5 (250 meters), and retrace the route back. Total: 8.5 to 9 km, 850 meters cumulative elevation, 4.5 to 5.5 hours. This is the option for experienced hikers who want the full day without booking boat transport.</p>',

  '<figure class="my-8"><img src="/images/geiranger/seven_sisters_waterfall.jpg" alt="The Seven Sisters waterfall cascading 250 meters down the steep cliff face of Geirangerfjord, viewed from water level with the rock wall towering above" class="w-full rounded-lg" /><figcaption class="text-xs text-slate-400 mt-2">The Seven Sisters waterfall (De Syv S\u00f8strene), directly across the fjord from Skagefl\u00e5. From the farm\u2019s grass ledge, you face this 250-meter cascade at eye level. Photo: W. Bulach, CC BY-SA 4.0</figcaption></figure>',

  '<h2>What works</h2>',

  '<ul>',
  '<li><strong>The view from the farm.</strong> You stand on a grass ledge 250 meters above the fjord with the Seven Sisters waterfall cascading directly opposite. The abandoned Knivsfl\u00e5 farm is visible on the cliff near the waterfall. The fjord stretches in both directions below. From May to July, when snowmelt feeds the Seven Sisters at full volume, this is the finest frontal view of the waterfall on Geirangerfjord.</li>',
  '<li><strong>The history in the landscape.</strong> The restored farm buildings are original. You can see the grass plateau where 120 goats grazed. You can see the cliff edge where children were tied to trees. You can see the rock face where ladders once provided the only access before the trail was improved. This is not a museum reconstruction. It is the actual place where families survived for centuries on a ledge that most modern hikers approach with wire cables and racing hearts.</li>',
  '<li><strong>The boat approach.</strong> The RIB ride from Geiranger to Skagehola passes the Seven Sisters, the Bridal Veil (Bruresl\u00f8ret), and the Suitor (Friaren) waterfalls. It is a mini fjord safari before the hike even begins. The operator (Fjord Guiding) runs departures every hour from 09:00 to 19:00 in summer.</li>',
  '<li><strong>The UNESCO connection.</strong> Skagefl\u00e5 is specifically cited in the UNESCO World Heritage designation for the Geirangerfjord. Queen Sonja unveiled the heritage plaque at the farm in 2006. The cliff farms are not a footnote to the fjord\u2019s status. They are a primary reason for it.</li>',
  '</ul>',

  '<h3>What does not work</h3>',

  '<ul>',
  '<li><strong>The exposure from Skagehola.</strong> The climb from the boat landing to the farm is steep, narrow, and exposed. Wire cables and ropes bolted into rock provide handholds, but the path clings to the cliff face with drops of 250 meters to the fjord below. If you have a fear of heights, this approach will be genuinely difficult. The overland route from Homlong avoids the cliff face but adds significant elevation and distance.</li>',
  '<li><strong>Not suitable for children.</strong> The official trail description and FJORDS.COM both state this trail is not suitable for children. The exposed cliff sections, wire cables, and drop-offs are too dangerous for young hikers regardless of their fitness.</li>',
  '<li><strong>The rockslide risk.</strong> Skagefl\u00e5 was abandoned in 1916 because of rockslide danger. That geological reality has not changed. The \u00c5kerneset rock formation on the opposite side of the fjord is continuously monitored for a potential catastrophic collapse. This is not a reason to skip the hike, but it is a reality that the Norwegian authorities track with real-time sensors. The trail is open because the current risk is assessed as manageable, not because the risk is zero.</li>',
  '<li><strong>No services on the trail.</strong> There is a water tap and an outhouse at the farm, but no cafe, no shop, and no shelter beyond the farm buildings. Bring water, food, and rain gear. Weather changes in the fjord within an hour.</li>',
  '</ul>',

  '<h2>The honest assessment</h2>',

  '<p>Skagefl\u00e5 is the hike that explains why Geirangerfjord is a UNESCO World Heritage site. The fjord is not just geology. It is the human story of families who farmed vertical terrain for centuries because the flat land was already taken. The trail is graded Red for good reason: the cliff exposure is real, the wire cables are there because you need them, and the elevation changes are sustained. But the payoff is standing on the same ledge where a farmer once hid from the tax collector, looking directly at the Seven Sisters waterfall from 250 meters above the water, and understanding what the UNESCO designation actually protects.</p>',

  '<p>If you take the boat option, the total time commitment is 3 to 4 hours including transport. If you do the overland traverse, budget a full day. Either way, Skagefl\u00e5 delivers the most historically significant and physically demanding experience in the Geiranger area. It is not for everyone. It does not try to be.</p>',

  '<h2>The logistics</h2>',

  '<table class="w-full text-sm my-6 border border-slate-200 rounded-lg overflow-hidden">',
  '<thead class="bg-[#1A365D] text-white"><tr><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Detail</th><th class="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">Information</th></tr></thead>',
  '<tbody class="divide-y divide-slate-100">',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Trail grade</td><td class="px-4 py-3 text-slate-600">Red (strenuous) \u2014 morotur.no official grading</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">From Skagehola (boat)</td><td class="px-4 py-3 text-slate-600">~2 km, 250 m elevation, 45 min up</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Traverse (Skagehola to Geiranger)</td><td class="px-4 py-3 text-slate-600">6.5 km, 550 m cumulative, 3.5\u20134.5 hrs</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Round trip from Homlong</td><td class="px-4 py-3 text-slate-600">8.5\u20139 km, 850 m cumulative, 4.5\u20135.5 hrs</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Farm elevation</td><td class="px-4 py-3 text-slate-600">250 m above Geirangerfjord</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Season</td><td class="px-4 py-3 text-slate-600">Late May to September (boat: mid-April to mid-September)</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Trail fee</td><td class="px-4 py-3 text-slate-600">Free (boat transport separate)</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">RIB boat (one way)</td><td class="px-4 py-3 text-slate-600">249 NOK per person (Fjord Guiding, every hour 09:00\u201319:00)</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Guided hike</td><td class="px-4 py-3 text-slate-600">4,500 NOK (1\u20135 people), 6,500 NOK (6\u20138 people), incl. boat + guide</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Parking (Homlong)</td><td class="px-4 py-3 text-slate-600">50\u2013120 NOK, 2 km from Geiranger</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Farm GPS</td><td class="px-4 py-3 text-slate-600">62.1101\u00b0N, 7.1212\u00b0E</td></tr>',
  '<tr class="bg-slate-50"><td class="px-4 py-3 font-medium text-slate-800">Boat operator</td><td class="px-4 py-3 text-slate-600">Fjord Guiding (skagefla.no) \u2014 +47 478 020 10</td></tr>',
  '<tr class="bg-white"><td class="px-4 py-3 font-medium text-slate-800">Emergency</td><td class="px-4 py-3 text-slate-600">112 (police/rescue) or 113 (medical)</td></tr>',
  '</tbody></table>',

  '<h2>Trail safety</h2>',

  '<p>Skagefl\u00e5 is graded Red (strenuous) by the official M\u00f8re og Romsdal outdoor platform. The Fjellvettreglene (Mountain Code) is not optional on this trail. Four rules are directly relevant:</p>',

  '<ul>',
  '<li><strong>Rule 1: Plan your route and inform someone.</strong> The traverse involves a boat one way and a hike the other. Know which direction you are going before you start, and tell someone your plan and expected return time.</li>',
  '<li><strong>Rule 2: Adapt the trip to ability and conditions.</strong> Wire cables and exposed cliff paths require steady nerves, grip strength, and hiking boots. If the Skagehola approach exceeds your comfort level, the overland route from Homlong avoids the cliff face but demands more fitness.</li>',
  '<li><strong>Rule 4: Be equipped to help yourself and others.</strong> No shelter, no services, no mobile coverage guarantee above the farm. Bring water, food, rain gear, and a first aid kit. The farm has a water tap and an outhouse, but nothing else.</li>',
  '<li><strong>Rule 8: Turn back in time.</strong> If weather deteriorates on the traverse, the descent from Homlongs\u00e6tra to Skagefl\u00e5 becomes slippery and exposed. Better to retrace to Homlong than push on to the cliff face in rain.</li>',
  '</ul>',

  '<h2>Who should hike this</h2>',

  '<ul>',
  '<li><strong>Experienced hikers comfortable with exposure.</strong> If you have done Besseggen, Kjerag, or Preikestolen, you have the fitness and nerve for Skagefl\u00e5. The exposure from Skagehola is comparable to the steepest sections of those trails.</li>',
  '<li><strong>History-focused travellers.</strong> Skagefl\u00e5 is the most historically significant site on Geirangerfjord. The cliff farm, the UNESCO designation, and the Seven Sisters waterfall opposite make this the single most culturally rich hike in the area. The Norsk Fjordsenter in Geiranger provides excellent context; visit it before the hike.</li>',
  '<li><strong>Travellers taking the boat option with limited time.</strong> The RIB to Skagehola, hike up, explore, hike down, RIB back: 3 to 4 hours total. This fits into a half-day, leaves time for the Fossevandring or Eagle Road, and delivers the most demanding Geiranger experience in the shortest window.</li>',
  '</ul>',

  '<h2>Who should skip this</h2>',

  '<ul>',
  '<li><strong>Anyone with a fear of heights.</strong> The Skagehola approach involves 250 meters of cliff face with wire cables and narrow paths above the fjord. The overland route from Homlong is less exposed but still includes steep descents with drop-offs. If vertigo is an issue, Storseterfossen and L\u00f8sta from Vesteras are better alternatives.</li>',
  '<li><strong>Families with children.</strong> The trail is officially described as not suitable for children. The exposed cliff sections, wire cables, and unprotected edges are too dangerous for young hikers.</li>',
  '<li><strong>Travellers in poor weather.</strong> Rain makes the rock surfaces, wire cables, and cliff paths slippery and dangerous. Fog removes visibility on exposed sections. If the forecast shows rain or thunderstorms, postpone. The trail will be here when the weather clears.</li>',
  '</ul>',

  '<p class="text-sm text-slate-500 mt-8 pt-4 border-t border-slate-200"><em>Ingrid Solheim is the Fjord Logistics Editor at NorgeTravel. She spent eleven years putting tourists into rental cars in Bergen and watching them drive off with itineraries that were never going to work. Her guides are written so that does not happen to you. She can be reached at <a href="mailto:hei@norgetravel.com">hei@norgetravel.com</a>.</em></p>',

  '<p class="text-xs text-slate-400 mt-4"><em>Images: Skagefl\u00e5 farm by rheins (CC BY 3.0, Wikimedia Commons). Seven Sisters waterfall by W. Bulach (CC BY-SA 4.0, Wikimedia Commons).</em></p>',
].join('');


// ============================================================
// ADD ALL THREE ARTICLES
// ============================================================

data['fossevandring-waterfall-walk-geiranger'] = {
  id: 'fossevandring-waterfall-walk-geiranger',
  slug: 'fossevandring-waterfall-walk-geiranger',
  title: 'Fossevandring: 327 steel stairs and the waterfall that powers Geiranger',
  subtitle: 'The lower section of Norway\u2019s first National Hiking Trail puts you inside 85 meters of waterfall, hydropower history, and Corten steel in under 40 minutes.',
  excerpt: 'The Fossevandring climbs 85 meters from Geiranger\u2019s cruise pier to the Fjord Centre on 327 Corten steel stairs alongside Storfossen waterfall. Open year-round, free to walk, and the most efficient introduction to the UNESCO fjord.',
  content: fossevandringContent,
  category: 'trip-reports',
  tags: ['geirangerfjord', 'fossevandring', 'hiking', 'waterfall', 'vestlandet', 'geiranger', 'fosserasa', 'national hiking trail', 'cruise port'],
  readTime: 7,
  authorId: 'ingrid-solheim',
  authorName: 'Ingrid Solheim',
  featuredImage: '/images/geiranger/fossevandring_stairs.jpg',
  featuredImageAlt: 'Waterfall cascading down a steep cliff face at Geirangerfjord, the route of the Fossevandring steel stair walk',
  metaTitle: 'Fossevandring Geiranger 2026: 327 Steel Stairs to a 35m Waterfall | NorgeTravel',
  metaDescription: 'Trail guide to the Fossevandring (Waterfall Walk) in Geiranger. 1.2 km, 85m elevation, 327 Corten steel stairs alongside Storfossen waterfall. Free, year-round, and 5 minutes from the cruise pier.',
  status: 'published',
  publishedAt: '2026-04-11T13:00:00.000Z',
  createdAt: '2026-04-11T13:00:00.000Z',
  updatedAt: '2026-04-11T13:00:00.000Z',
  isFeatured: false,
  sortOrder: 8
};

data['losta-viewpoint-hike-geiranger'] = {
  id: 'losta-viewpoint-hike-geiranger',
  slug: 'losta-viewpoint-hike-geiranger',
  title: 'L\u00f8sta: the earned view 500 meters above Geirangerfjord',
  subtitle: 'No platform, no railing, no crowd. The only Geiranger viewpoint that requires a rope section and rewards you with the fjord to yourself.',
  excerpt: 'L\u00f8sta is a natural rock viewpoint 500 meters above Geirangerfjord. From Vesteras farm: 1.5 km, 210m gain, one rope section, and a 120-degree panorama of the fjord, the Eagle Road, and the village below. No barriers, no crowd.',
  content: lostaContent,
  category: 'trip-reports',
  tags: ['geirangerfjord', 'losta', 'viewpoint', 'hiking', 'vestlandet', 'geiranger', 'vesteras', 'eagle road'],
  readTime: 8,
  authorId: 'ingrid-solheim',
  authorName: 'Ingrid Solheim',
  featuredImage: '/images/geiranger/geirangerfjord_view_losta.jpg',
  featuredImageAlt: 'Panoramic view from L\u00f8sta viewpoint 500 meters above Geirangerfjord showing turquoise water, Geiranger village, and Eagle Road hairpins',
  metaTitle: 'L\u00f8sta Viewpoint Hike Geiranger 2026: 500m Above the Fjord | NorgeTravel',
  metaDescription: 'Trail guide to L\u00f8sta viewpoint above Geiranger. Natural rock promontory 500m above Geirangerfjord. From Vesteras: 1.5 km, 210m gain, rope section, no barriers. The earned alternative to Flydalsjuvet.',
  status: 'published',
  publishedAt: '2026-04-11T14:00:00.000Z',
  createdAt: '2026-04-11T14:00:00.000Z',
  updatedAt: '2026-04-11T14:00:00.000Z',
  isFeatured: false,
  sortOrder: 9
};

data['skagefla-mountain-farm-geirangerfjord'] = {
  id: 'skagefla-mountain-farm-geirangerfjord',
  slug: 'skagefla-mountain-farm-geirangerfjord',
  title: 'Skagefl\u00e5: hiking to the cliff farm that hid from the tax collector',
  subtitle: 'A Red-graded trail to an abandoned farm 250 meters above Geirangerfjord, facing the Seven Sisters waterfall. Inhabited from the Middle Ages until 1916.',
  excerpt: 'Skagefl\u00e5 mountain farm sits on a cliff ledge 250 meters above Geirangerfjord. Red-graded trail with wire cables and exposed cliff paths. Boat to Skagehola + 45-min climb, or 6.5 km overland traverse. The most historically significant hike in Geiranger.',
  content: skageflaContent,
  category: 'trip-reports',
  tags: ['geirangerfjord', 'skagefla', 'hiking', 'cliff farm', 'vestlandet', 'geiranger', 'unesco', 'seven sisters', 'mountain farm'],
  readTime: 10,
  authorId: 'ingrid-solheim',
  authorName: 'Ingrid Solheim',
  featuredImage: '/images/geiranger/skagefla_farm.jpg',
  featuredImageAlt: 'Skagefl\u00e5 mountain farm perched on a green cliff ledge 250 meters above Geirangerfjord, Norway',
  metaTitle: 'Skagefl\u00e5 Mountain Farm Hike 2026: Cliff Farm Above Geirangerfjord | NorgeTravel',
  metaDescription: 'Trail guide to Skagefl\u00e5 cliff farm on Geirangerfjord. Red-graded trail, 250m above the fjord, facing the Seven Sisters waterfall. Boat + hike or overland traverse. History, logistics, and safety.',
  status: 'published',
  publishedAt: '2026-04-11T15:00:00.000Z',
  createdAt: '2026-04-11T15:00:00.000Z',
  updatedAt: '2026-04-11T15:00:00.000Z',
  isFeatured: true,
  sortOrder: 10
};

fs.writeFileSync(articlesPath, JSON.stringify(data, null, 2));
console.log('Three articles added. Total articles:', Object.keys(data).length);
console.log('Fossevandring content:', fossevandringContent.length, 'chars');
console.log('Losta content:', lostaContent.length, 'chars');
console.log('Skagefla content:', skageflaContent.length, 'chars');
