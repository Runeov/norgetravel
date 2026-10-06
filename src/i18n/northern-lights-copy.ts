import type { Locale } from '@/lib/i18n-seo';

// Northern Lights tours page (/tjenester/northern-lights) copy per locale.
// The English entries are the original page text. Links, rel values and
// layout stay in the page; only visible text lives here.

export interface NorthernLightsOperatorCopy {
  name: string;
  type: string;
  priceFrom: string;
  commission: string;
  highlight: string;
  /** Review score and count with source and month, e.g. "4.9 of 5 from 1,886 reviews on GetYourGuide, October 2026" */
  rating: string;
  /** Verified destination (Rules.md section 19). Affiliate params only when sponsored is true. */
  url: string;
  /** true adds rel="sponsored" and means the commission line shows a real rate */
  sponsored: boolean;
}

export interface NorthernLightsTipCopy {
  title: string;
  body: string;
}

/** One question phrased the way travellers ask an assistant, with a 2 to 4 sentence answer */
export interface FaqCopy {
  question: string;
  answer: string;
}

export interface NorthernLightsCopy {
  /** Title without the brand suffix for zh and ja; brandTitle() adds it */
  meta: { title: string; description: string };
  hero: {
    alt: string;
    badge: string;
    heading: string;
    body: string;
    price: string;
    season: string;
  };
  /** aria-label and eyebrow of the answer-first aside under the hero */
  quickAnswerLabel: string;
  /** 3 to 5 sentences an assistant can quote: when, where, how, what it costs, the condition that matters */
  quickAnswer: string;
  operators: {
    heading: string;
    disclosure: string;
    /** Rendered directly before the commission value */
    commission: string;
    cta: string;
    items: [NorthernLightsOperatorCopy, NorthernLightsOperatorCopy, NorthernLightsOperatorCopy];
  };
  tips: {
    heading: string;
    items: [NorthernLightsTipCopy, NorthernLightsTipCopy, NorthernLightsTipCopy, NorthernLightsTipCopy];
  };
  /** h2 of the Q&A section */
  faqHeading: string;
  /** Rendered as h3 + p near the end of the page and as FAQPage JSON-LD; facts only from this page */
  faq: [FaqCopy, FaqCopy, FaqCopy, FaqCopy, FaqCopy, FaqCopy];
  cta: {
    heading: string;
    body: string;
    northernNorway: string;
    svalbard: string;
  };
}

export const NORTHERN_LIGHTS_COPY: Record<Locale, NorthernLightsCopy> = {
  en: {
    meta: {
      title: 'Northern Lights Tours Tromsø 2026 | NorgeTravel',
      description:
        'Northern Lights tours in Tromsø: group and private chases, when to book, the Kp index and Hurtigruten’s Northern Lights Promise, prices and commissions disclosed.',
    },
    hero: {
      alt: 'Northern Lights aurora borealis over Tromsø Norway',
      badge: 'Solar Cycle 25: high activity through 2026/27',
      heading: 'Northern Lights Tours',
      body: 'Solar Cycle 25 reached its maximum in 2024 to 2025. NOAA and NASA announced the maximum period in October 2024, and activity stays high through the 2026/27 season. Tromsø is your base.',
      price: 'Small-group chases from 1,290 NOK',
      season: 'Late Sep–late Mar season',
    },
    quickAnswerLabel: 'Quick answer',
    quickAnswer:
      'The Northern Lights season in Norway (Norge) runs from late September to late March, and Tromsø, at 69°N under the auroral oval, is the base. Kp 2 to 3 is enough for an overhead display here, so a clear sky is the one condition that matters. You can join a small-group chase from 1,290 NOK, book a private guide who drives up to 200 km in a night to find clear sky, or rent a car and drive out of the city light yourself. Plan four nights minimum: the polar night, 27 November to 15 January, still gives twilight at midday, and in September and March the sky is dark from about 21:00.',
    operators: {
      heading: 'Recommended operators',
      disclosure:
        "Affiliate disclosure: NorgeTravel earns a commission on the links that show one. The others pay us nothing; they are here because their reviews are strong. Your price is the same either way.",
      commission: 'Commission: ',
      cta: 'See tours and prices',
      items: [
        {
          name: 'GetYourGuide: Northern Lights Chase, Tromsø',
          type: 'Small-group minibus chase',
          priceFrom: 'From 1,290 NOK',
          commission: '7%',
          highlight: 'Snow-travels drives until the group finds clear sky, and the guide takes the photos. Some operators rebook or refund when a chase is cancelled for weather; check the tour terms.',
          rating: '4.9 of 5 from 1,886 reviews on GetYourGuide, October 2026',
          url: 'https://www.getyourguide.com/tromso-l32375/tromso-small-group-northern-lights-tour-wit-minibus-t525013/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
          sponsored: true,
        },
        {
          name: 'Viator: Northern Lights Minibus Chase, Tromsø',
          type: 'Small-group minibus chase',
          priceFrom: 'Price on Viator',
          commission: 'None. No partner link yet',
          highlight: 'Small-group chase with photos and warm suits included. Mobile tickets and 24/7 support.',
          rating: '1,451 reviews on Viator, October 2026',
          url: 'https://www.viator.com/tours/Tromso/Northern-Lights-Trip/d4362-89661P1',
          sponsored: false,
        },
        {
          name: 'Polar Adventures, Tromsø',
          type: 'Local operator, small groups',
          priceFrom: 'Price on the operator site',
          commission: 'None. Chosen for its reviews',
          highlight: 'Tromsø-based operator running small-group Northern Lights chases, with more than a thousand TripAdvisor reviews behind it.',
          rating: 'TripAdvisor 4.6 (1,427 reviews), Google 4.5 (545 reviews), October 2026',
          url: 'https://www.polaradventures.no/',
          sponsored: false,
        },
      ],
    },
    tips: {
      heading: 'How to maximise your chances',
      items: [
        {
          title: 'Book late September to late March',
          body: 'The season runs from late September to late March. Tromsø’s polar night, 27 November to 15 January, still gives twilight at midday. In September and March the sky is dark from about 21:00.',
        },
        {
          title: 'Check Kp index daily',
          body: 'NOAA’s Space Weather Prediction Center posts 3-day forecasts. Tromsø sits under the auroral oval, so Kp 2 to 3 is enough for an overhead display. At Kp 5 and above the oval moves south and the lights can be seen from southern Norway.',
        },
        {
          title: 'Private tour vs group',
          body: 'A private guide can drive up to 200 km in a night and picks the spot from the live forecast. Group tours follow a fixed route, which is fine when skies are clear.',
        },
        {
          title: 'Hurtigruten Northern Lights Promise',
          body: 'The Northern Lights Promise applies to the 12-day Classic Round Voyage, Bergen to Kirkenes and back, on voyages of 11 days or more sailing between 20 September and 31 March. If the ship’s officers record no Northern Lights, you get a 6- or 7-day Classic Voyage free, cruise only, flights not included. Valid for sailings until 31 March 2028.',
        },
      ],
    },
    faqHeading: 'Questions travellers ask',
    faq: [
      {
        question: 'Which months can you see the Northern Lights in Tromsø?',
        answer:
          'The season runs from late September to late March. During the polar night, 27 November to 15 January, Tromsø still gets twilight at midday, and in September and March the sky is dark from about 21:00. Solar Cycle 25 reached its maximum in 2024 to 2025, and activity stays high through the 2026/27 season.',
      },
      {
        question: 'Which city in Norway is best for seeing the Northern Lights?',
        answer:
          'Tromsø. It sits at 69°N under the auroral oval, so Kp 2 to 3 is enough for an overhead display, and it is a working city of about 80,000 with a 2-hour direct flight from Oslo, not a tourist outpost. Only at Kp 5 and above does the oval move far enough south for the lights to be seen from southern Norway. If you are still choosing a region, read our Northern Norway and Svalbard guides first.',
      },
      {
        question: 'How much does a Northern Lights tour in Tromsø cost, and do you need one?',
        answer:
          'Small-group chases start at 1,290 NOK per person on GetYourGuide and Viator. A private guide can drive up to 200 km in a night to wherever the forecast is clear. Private prices are set by each operator. You do not need a tour if you have a rental car: Kvaløya, 25 minutes west of the city centre, has no light pollution. Group tours are fixed-route, which is fine when the sky is clear.',
      },
      {
        question: 'When is the polar night in Tromsø, and is it dark all day?',
        answer:
          'The polar night (mørketid) runs from 27 November to 15 January, 50 days when the sun does not rise above the horizon. It is not pitch black all day: Tromsø still gets twilight around midday, and the dark hours are when the lights appear. In November the sky is dark by mid-afternoon and the weather is often wet, so chases are hit-or-miss.',
      },
      {
        question: 'What weather and Kp index do you need to see the Northern Lights?',
        answer:
          'A clear sky. Tromsø sits under the auroral oval, so Kp 2 to 3 is enough for an overhead display; at Kp 5 and above the oval moves south and the lights can be seen from southern Norway. NOAA’s Space Weather Prediction Center posts 3-day forecasts, so check the Kp daily and let the cloud forecast decide where you drive. Cloud cover is the one variable you cannot control, which is why four nights is the minimum.',
      },
      {
        question: 'How does the Hurtigruten Northern Lights Promise work?',
        answer:
          'It applies to the 12-day Classic Round Voyage, Bergen to Kirkenes and back, on voyages of 11 days or more sailing between 20 September and 31 March. If the ship’s officers record no Northern Lights during your voyage, you get a 6- or 7-day Classic Voyage free, cruise only, flights not included. The promise is valid for sailings until 31 March 2028.',
      },
    ],
    cta: {
      heading: 'Start with the destination guide',
      body: 'Not sure which region to base yourself in? Read our Northern Norway and Svalbard guides first.',
      northernNorway: 'Northern Norway Guide',
      svalbard: 'Svalbard at 78°N',
    },
  },

  zh: {
    meta: {
      title: '挪威极光团2026：特罗姆瑟极光最佳时间与价格',
      description:
        '特罗姆瑟极光团怎么选：拼团与私人追光团对比、几月去最好、怎样看Kp指数，以及海达路德（Hurtigruten）的极光承诺。价格和我们获得的佣金全部公开。',
    },
    hero: {
      alt: '挪威特罗姆瑟上空的北极光',
      badge: '第25太阳活动周期：2026/27季仍处于高活跃期',
      heading: '挪威极光团',
      body: '第25太阳活动周期在2024至2025年达到极大期，NOAA和NASA于2024年10月宣布进入极大期；高活跃度会持续到2026/27极光季。在挪威（挪威语：Norge），您的基地就是特罗姆瑟。',
      price: '小团追光 1,290挪威克朗起',
      season: '极光季9月下旬至次年3月下旬',
    },
    quickAnswerLabel: '快速回答',
    quickAnswer:
      '挪威的极光季从9月下旬持续到次年3月下旬，基地选在北纬69°、正处于极光椭圆带下方的特罗姆瑟。在这里Kp 2到3就足以让极光出现在头顶，所以唯一真正重要的条件是晴朗的天空。您可以参加1,290挪威克朗起的小团追光，请一位私人向导（一晚最多开200公里去找晴空），或者自己租车开出城市灯光。至少安排4晚：极夜（11月27日至1月15日）正午仍有微光，9月和3月大约21:00以后天就全黑了。',
    operators: {
      heading: '推荐运营商',
      disclosure:
        '联盟声明：标注佣金的链接会给 NorgeTravel 带来佣金，其余链接我们不赚钱，列出它们是因为评价好。您支付的价格不受影响。',
      commission: '佣金：',
      cta: '查看行程与价格',
      items: [
        {
          name: 'GetYourGuide：特罗姆瑟追极光小团',
          type: '小团小巴追光',
          priceFrom: '1,290挪威克朗起',
          commission: '7%',
          highlight: 'Snow-travels 会一直开到找到晴空为止，向导负责拍照。部分运营商在因天气取消时可改期或退款，请查看该团的条款。',
          rating: 'GetYourGuide 评分 4.9/5，1,886 条评价（2026年10月）',
          url: 'https://www.getyourguide.com/tromso-l32375/tromso-small-group-northern-lights-tour-wit-minibus-t525013/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
          sponsored: true,
        },
        {
          name: 'Viator：特罗姆瑟小巴追极光',
          type: '小团小巴追光',
          priceFrom: '价格见 Viator',
          commission: '无，暂无合作链接',
          highlight: '小团追光，含照片和保暖服。手机电子票，7×24小时客服。',
          rating: 'Viator 上 1,451 条评价（2026年10月）',
          url: 'https://www.viator.com/tours/Tromso/Northern-Lights-Trip/d4362-89661P1',
          sponsored: false,
        },
        {
          name: 'Polar Adventures（特罗姆瑟）',
          type: '本地运营商，小团',
          priceFrom: '价格见运营商网站',
          commission: '无，因评价好而推荐',
          highlight: '特罗姆瑟本地运营商，经营小团追极光，TripAdvisor 上有一千多条评价。',
          rating: 'TripAdvisor 4.6（1,427 条评价），Google 4.5（545 条评价），2026年10月',
          url: 'https://www.polaradventures.no/',
          sponsored: false,
        },
      ],
    },
    tips: {
      heading: '怎样提高看到极光的机会',
      items: [
        {
          title: '预订9月下旬至次年3月下旬',
          body: '极光季从9月下旬持续到次年3月下旬。特罗姆瑟的极夜（mørketid）为11月27日至1月15日，正午仍有微光。9月和3月，大约21:00以后天就全黑了。',
        },
        {
          title: '每天查看Kp指数',
          body: 'NOAA空间天气预报中心（Space Weather Prediction Center）发布3天预报。特罗姆瑟正处在极光椭圆带下方，Kp 2到3就足以让极光出现在头顶。Kp 5及以上时，极光带向南移动，挪威南部也能看到。',
        },
        {
          title: '私人团还是拼团',
          body: '私人向导一晚最多可以开200公里，并根据实时预报选地点。拼团路线固定，天空晴朗时也够用。',
        },
        {
          title: '海达路德极光承诺',
          body: '海达路德（Hurtigruten）的极光承诺（Northern Lights Promise）适用于12天的经典往返航线（卑尔根到希尔克内斯再返回，11天及以上的航程），出航日期在9月20日至3月31日之间。如果船上的船员没有记录到北极光，您可以免费获得一次6天或7天的经典航程，仅含航程，不含机票。适用于2028年3月31日前的航次。',
        },
      ],
    },
    faqHeading: '常见问题',
    faq: [
      {
        question: '特罗姆瑟几月能看到极光？',
        answer:
          '极光季从9月下旬持续到次年3月下旬。极夜（mørketid）为11月27日至1月15日，特罗姆瑟正午仍有微光；9月和3月，大约21:00以后天就全黑了。第25太阳活动周期在2024至2025年达到极大期，高活跃度会持续到2026/27极光季。',
      },
      {
        question: '去挪威看极光去哪个城市最好？',
        answer:
          '特罗姆瑟。它位于北纬69°的极光椭圆带下方，Kp 2到3就足以让极光出现在头顶；它是一座约8万居民、正常运转的城市，从奥斯陆直飞2小时，不是旅游前哨站。只有在Kp 5及以上时，极光带才会向南移动，挪威南部也能看到。如果您还在选地区，请先读我们的挪威北部和斯瓦尔巴群岛指南。',
      },
      {
        question: '特罗姆瑟极光团多少钱，需要跟团吗？',
        answer:
          'GetYourGuide和Viator上的小团追光每人1,290挪威克朗起。私人向导一晚最多开200公里，预报哪里晴就去哪里，价格由各运营商自定。如果您租了车，不跟团也可以：市中心以西25分钟车程的克瓦尔岛（Kvaløya）没有光污染。拼团路线固定，天空晴朗时也够用。',
      },
      {
        question: '极夜是什么时候，白天完全黑吗？',
        answer:
          '特罗姆瑟的极夜（mørketid）从11月27日持续到1月15日，共50天，太阳不会升到地平线以上。但白天并不是完全黑：正午仍有微光，极光则在天黑后的时段出现。11月下午三点左右天就黑了，而且常常下雨，所以追光全凭运气。',
      },
      {
        question: '看极光需要什么天气和Kp指数？',
        answer:
          '晴朗的天空。特罗姆瑟正处在极光椭圆带下方，Kp 2到3就足以让极光出现在头顶；Kp 5及以上时，极光带向南移动，挪威南部也能看到。NOAA空间天气预报中心发布3天预报，请每天查看Kp指数，再让云量预报决定您往哪里开。云量是您无法控制的唯一变数，所以至少住4晚。',
      },
      {
        question: '海达路德的极光保证是怎么回事？',
        answer:
          '海达路德（Hurtigruten）的极光承诺（Northern Lights Promise）适用于12天的经典往返航线（卑尔根到希尔克内斯再返回，11天及以上的航程），出航日期在9月20日至3月31日之间。如果船上的船员在您的航程中没有记录到北极光，您可以免费获得一次6天或7天的经典航程，仅含航程，不含机票。适用于2028年3月31日前的航次。',
      },
    ],
    cta: {
      heading: '先读目的地指南',
      body: '不确定把基地设在哪个地区？先读我们的挪威北部和斯瓦尔巴群岛指南。',
      northernNorway: '挪威北部指南',
      svalbard: '北纬78°的斯瓦尔巴群岛',
    },
  },

  ja: {
    meta: {
      title: 'ノルウェーのオーロラツアー2026：トロムソの時期・費用・選び方',
      description:
        'トロムソのオーロラツアーを比較。グループツアーとプライベートツアーの違い、予約すべき時期、Kp指数の読み方、フッティルーテン（Hurtigruten）のオーロラ保証まで、料金と当サイトが受け取る紹介料を公開しています。',
    },
    hero: {
      alt: 'ノルウェー、トロムソ上空のオーロラ',
      badge: '太陽活動周期25：2026/27シーズンも高い活動が続く',
      heading: 'ノルウェーのオーロラツアー',
      body: '太陽活動周期25は2024年から2025年に極大期を迎えました。NOAAとNASAは2024年10月に極大期入りを発表し、活動は2026/27シーズンまで高い水準で続きます。拠点はノルウェー（ノルウェー語：Norge）のトロムソです。',
      price: '少人数の追跡ツアーは1,290クローネから',
      season: 'シーズンは9月下旬〜3月下旬',
    },
    quickAnswerLabel: '要点',
    quickAnswer:
      'ノルウェーのオーロラシーズンは9月下旬から3月下旬までで、拠点はオーロラオーバルの真下、北緯69度のトロムソです。ここではKp 2〜3で頭上にオーロラが出るため、本当に重要な条件は晴れた空だけです。1,290クローネからの少人数追跡ツアーに参加するか、プライベートガイド（晴れ間を探して一晩に最大200km走ります）を頼むか、レンタカーで自分で街の明かりの外へ出るかを選べます。滞在は最低4泊を見てください。極夜（11月27日〜1月15日）でも正午には薄明かりがあり、9月と3月は21:00ごろから空が暗くなります。',
    operators: {
      heading: 'おすすめのツアー会社',
      disclosure:
        'アフィリエイト表示：紹介料の記載があるリンクからの予約でNorgeTravelは紹介料を受け取ります。記載のないリンクからは何も受け取らず、レビューの高さで選んでいます。料金はどちらも変わりません。',
      commission: '紹介料：',
      cta: 'ツアーと料金を見る',
      items: [
        {
          name: 'GetYourGuide：トロムソ オーロラ追跡ツアー',
          type: '少人数ミニバスの追跡ツアー',
          priceFrom: '1,290クローネから',
          commission: '7%',
          highlight: 'Snow-travelsは晴れ間が見つかるまで走り、ガイドが写真を撮ります。天候で中止の場合に振替や返金をする事業者もあるので、ツアーの条件を確認してください。',
          rating: 'GetYourGuide評価4.9/5、レビュー1,886件（2026年10月時点）',
          url: 'https://www.getyourguide.com/tromso-l32375/tromso-small-group-northern-lights-tour-wit-minibus-t525013/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
          sponsored: true,
        },
        {
          name: 'Viator：トロムソ ミニバス追跡ツアー',
          type: '少人数ミニバスの追跡ツアー',
          priceFrom: '料金はViatorで',
          commission: 'なし。提携リンクは未設定',
          highlight: '写真と防寒スーツ込みの少人数追跡ツアーです。モバイルチケット対応、24時間サポート。',
          rating: 'Viatorのレビュー1,451件（2026年10月時点）',
          url: 'https://www.viator.com/tours/Tromso/Northern-Lights-Trip/d4362-89661P1',
          sponsored: false,
        },
        {
          name: 'Polar Adventures（トロムソ）',
          type: '地元の事業者、少人数',
          priceFrom: '料金は公式サイトで',
          commission: 'なし。レビューの高さで選びました',
          highlight: 'トロムソ拠点の事業者で、少人数のオーロラ追跡ツアーを運行しています。TripAdvisorに1,000件を超えるレビューがあります。',
          rating: 'TripAdvisor 4.6（レビュー1,427件）、Google 4.5（レビュー545件）、2026年10月時点',
          url: 'https://www.polaradventures.no/',
          sponsored: false,
        },
      ],
    },
    tips: {
      heading: 'オーロラを見る確率を上げるには',
      items: [
        {
          title: '9月下旬〜3月下旬に予約する',
          body: 'シーズンは9月下旬から3月下旬までです。トロムソの極夜（mørketid、モルケティ）は11月27日〜1月15日ですが、その間も正午には薄明かりがあります。9月と3月は21:00ごろから空が暗くなります。',
        },
        {
          title: '毎日Kp指数を確認する',
          body: 'NOAAの宇宙天気予報センター（Space Weather Prediction Center）が3日間の予報を出しています。トロムソはオーロラオーバルの真下にあるので、Kp 2〜3で頭上にオーロラが出ます。Kp 5以上になるとオーバルは南へ移動し、ノルウェー南部からも見えるようになります。',
        },
        {
          title: 'プライベートツアーかグループツアーか',
          body: 'プライベートガイドは一晩に最大200km走り、リアルタイムの予報で観測地を選びます。グループツアーはルートが決まっていますが、晴れていれば十分です。',
        },
        {
          title: 'フッティルーテンのオーロラ保証（Northern Lights Promise）',
          body: 'フッティルーテン（Hurtigruten）のオーロラ保証は、9月20日〜3月31日に出航する12日間のクラシック往復航海（ベルゲン〜キルケネス〜ベルゲン、11日以上の航海）が対象です。船の航海士がオーロラを記録しなかった場合、6日間または7日間のクラシック航海が無料になります。クルーズ代のみで、航空券は含まれません。2028年3月31日までの出航に有効です。',
        },
      ],
    },
    faqHeading: 'よくある質問',
    faq: [
      {
        question: 'トロムソでオーロラが見られる時期はいつですか？',
        answer:
          'シーズンは9月下旬から3月下旬までです。極夜（mørketid、モルケティ）は11月27日〜1月15日ですが、トロムソではその間も正午に薄明かりがあり、9月と3月は21:00ごろから空が暗くなります。太陽活動周期25は2024年から2025年に極大期を迎え、活動は2026/27シーズンまで高い水準で続きます。',
      },
      {
        question: 'ノルウェーでオーロラを見るならどこがいいですか？',
        answer:
          'トロムソです。北緯69度、オーロラオーバルの真下にあるためKp 2〜3で頭上にオーロラが出るうえ、人口約8万人の普通に機能している都市で、オスロから直行便で2時間、観光客向けの前哨地ではありません。オーロラオーバルが南へ移動してノルウェー南部からも見えるようになるのは、Kp 5以上のときだけです。地域で迷っているなら、まず北ノルウェーとスバールバル諸島のガイドを読んでください。',
      },
      {
        question: 'トロムソのオーロラツアーの費用は？ツアーは必要ですか？',
        answer:
          'GetYourGuideとViatorの少人数追跡ツアーは1人1,290クローネからです。プライベートガイドは予報が晴れの場所へ一晩に最大200km走ってくれます。料金は事業者ごとに異なります。レンタカーがあればツアーは必須ではなく、中心部から西へ車で25分のクヴァル島（Kvaløya）には光害がありません。グループツアーはルートが決まっていますが、晴れていれば十分です。',
      },
      {
        question: '極夜はいつからいつまでですか？',
        answer:
          'トロムソの極夜（mørketid、モルケティ）は11月27日から1月15日までの50日間で、太陽が地平線の上に昇りません。ただし一日中真っ暗ではなく、正午には薄明かりがあります。オーロラが出るのは暗い時間帯です。11月は午後の半ばには暗くなり、雨も多いので、オーロラ追跡は当たり外れが大きくなります。',
      },
      {
        question: 'オーロラを見るのに必要な天気とKp指数は？',
        answer:
          '晴れた空です。トロムソはオーロラオーバルの真下にあるのでKp 2〜3で頭上にオーロラが出ますが、Kp 5以上になるとオーバルは南へ移動し、ノルウェー南部からも見えるようになります。NOAAの宇宙天気予報センターが3日間の予報を出しているので、Kp指数を毎日確認し、どこへ走るかは雲の予報で決めてください。雲だけはどうにもできない唯一の要素なので、最低4泊が原則です。',
      },
      {
        question: 'フッティルーテンのオーロラ保証とは？',
        answer:
          'フッティルーテン（Hurtigruten）のオーロラ保証（Northern Lights Promise）は、9月20日〜3月31日に出航する12日間のクラシック往復航海（ベルゲン〜キルケネス〜ベルゲン、11日以上の航海）が対象です。航海中に船の航海士がオーロラを記録しなかった場合、6日間または7日間のクラシック航海が無料になります。クルーズ代のみで、航空券は含まれません。2028年3月31日までの出航に有効です。',
      },
    ],
    cta: {
      heading: 'まずは目的地ガイドから',
      body: 'どの地域を拠点にするか迷っていますか。まず北ノルウェーとスバールバル諸島のガイドを読んでください。',
      northernNorway: '北ノルウェーガイド',
      svalbard: '北緯78度のスバールバル諸島',
    },
  },
};
