import type { Locale } from '@/lib/i18n-seo';

// Homepage copy per locale. The page picks one locale and passes each section
// its slice, so client components only ship the language being shown.

export interface PillarCopy {
  label: string;
  title: string;
  body: string;
  quote: string;
  authorRole: string;
}

export interface ExpertCopy {
  role: string;
  zone: string;
  basecamp: string;
  quote: string;
}

export interface CommitmentCopy {
  title: string;
  body: string;
  stat: string;
  statLabel: string;
}

export interface DestinationCopy {
  name: string;
  tagline: string;
  stat: string;
  winter?: { tagline: string; stat: string };
}

export interface HomeCopy {
  hero: { trust: [string, string] };
  editorial: { heading: string; intro: string; pillars: Record<'grit' | 'compass' | 'hearth', PillarCopy> };
  experts: {
    heading: string;
    intro: string;
    cta: string;
    /** {name} and {role} are filled in per expert */
    alt: string;
    people: Record<'ingrid-solheim' | 'bjorn-haugen' | 'marte-asheim' | 'silje-nygard' | 'lars-erik-nordvik', ExpertCopy>;
  };
  sustainable: {
    badge: string;
    heading: string;
    headingAccent: string;
    intro: string;
    cta: string;
    items: Record<'cruising' | 'trails' | 'coast' | 'certified', CommitmentCopy>;
  };
  destinations: {
    heading: string;
    intro: string;
    all: string;
    /** {name} is filled in per destination */
    alt: string;
    items: Record<'northern-norway' | 'lofoten' | 'fjords' | 'svalbard' | 'cities', DestinationCopy>;
  };
  contact: {
    badge: string;
    heading: string;
    intro: string;
    detailsTitle: string;
    emailUs: string;
    copyLabel: string;
    copied: string;
    basedIn: string;
    basedInValue: string;
    affiliateTitle: string;
    affiliateBody: string;
    formTitle: string;
    thanksTitle: string;
    thanksBody: string;
    sendAnother: string;
    name: string;
    interest: string;
    interestPlaceholder: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    error: string;
    sending: string;
    send: string;
  };
}

export const HOME_COPY: Record<Locale, HomeCopy> = {
  en: {
    hero: { trust: ['Local editors in five regions', 'Record 7.2M international visitors in 2025'] },
    editorial: {
      heading: 'How we work',
      intro:
        'Three editorial pillars. One rule: tell the traveller what they need to know, not what they want to hear. Every guide on this site was written by someone who lives in the zone they cover.',
      pillars: {
        grit: {
          label: 'THE GRIT',
          title: 'Reality over fantasy',
          body: 'Norway is demanding. We tell you the DNT trail grade, the elevation gain in metres, and the weather reality before you lace up. If a trail is dangerous, we say it. If a route takes 6 hours, not the 4 hours Google Maps claims, we give you the 6-hour number.',
          quote: 'Trolltunga is a 12-hour trek in sideways rain. If you are not prepared, do not start.',
          authorRole: 'Mountain Safety Editor, Lom',
        },
        compass: {
          label: 'THE COMPASS',
          title: 'Logistics that actually work',
          body: 'The Bodø to Moskenes ferry takes more than three hours across the open Vestfjord. In winter, you feel every kilometre. We cover AutoPASS, ferry timetables, seasonal road closures, and the toll fees nobody mentions. No guessing. Exact numbers.',
          quote: 'Google Maps has never waited in a Gudvangen ferry queue. I have. Here is the actual timing.',
          authorRole: 'Fjord Logistics Editor, Bergen',
        },
        hearth: {
          label: 'THE HEARTH',
          title: 'The reward at the end of the route',
          body: 'After six hours in the sleet, peeling off wet wool by an iron stove in an old bakery is the true definition of koselig. We connect you to the working coast, the fishing villages, the Sami communities, and the producers who make Norway worth the effort.',
          quote: 'A rorbu smells of salt and old wood. This is not a negative.',
          authorRole: 'Coastal Culture Editor, Svolvær',
        },
      },
    },
    experts: {
      heading: 'Five zones. Five locals.',
      intro:
        'Every guide on Norge Travel is written by someone who lives in the zone they cover. Not a content agency in London. Not a freelancer who visited once. The person who grew up there.',
      cta: 'Read the full team bios',
      alt: '{name}, {role} at Norge Travel',
      people: {
        'ingrid-solheim': {
          role: 'Fjord Logistics Editor',
          zone: 'Fjord Norway',
          basecamp: 'Bergen',
          quote: 'You cannot see Sognefjord and Hardangerfjord properly in the same day. Choose one.',
        },
        'bjorn-haugen': {
          role: 'Arctic Field Editor',
          zone: 'The Arctic',
          basecamp: 'Tromsø',
          quote: 'The Northern Lights are not a guaranteed show. Book three nights minimum.',
        },
        'marte-asheim': {
          role: 'Mountain Safety Editor',
          zone: 'The High Peaks',
          basecamp: 'Lom',
          quote: "The mountain doesn't care that you drove four hours to get here. Turn back if the weather says turn back.",
        },
        'silje-nygard': {
          role: 'Urban Culture Editor',
          zone: 'Urban Hubs',
          basecamp: 'Trondheim',
          quote: 'The restaurant review you read was written by someone who visited once, on a press trip, two years ago.',
        },
        'lars-erik-nordvik': {
          role: 'Coastal Culture Editor',
          zone: 'Working Coast',
          basecamp: 'Svolvær',
          quote: 'Lofoten has 24,500 residents and about 800,000 tourist visits a year. Plan accordingly.',
        },
      },
    },
    sustainable: {
      badge: 'Sustainable Arctic travel',
      heading: "We don't promote overtourism.",
      headingAccent: 'We prevent it.',
      intro:
        'Norway is not a theme park. Our editorial team lives in these places. We protect what we write about because we answer to the communities, not to booking volumes.',
      cta: 'Meet the team',
      items: {
        cruising: {
          title: 'Zero-emission fjord cruising',
          body: 'From 1 January 2026, passenger ships under 10,000 gross tonnes must sail zero-emission in the World Heritage fjords, including Geirangerfjord and Nærøyfjord. Larger ships follow from 2032. Havila Voyages ships can sail up to four hours on battery power. We check how an operator meets those rules before we recommend it.',
          stat: '2026 / 2032',
          statLabel: 'Zero-emission deadlines, World Heritage fjords',
        },
        trails: {
          title: 'Protecting the trails',
          body: 'Reinebringen in Lofoten had its trail rebuilt by Nepalese sherpas to control erosion from overtourism. Besseggen sees 60,000 hikers per summer. We grade every route honestly using DNT standards and surface alternatives to overloaded trails. The Fjellvettreglene is not optional guidance. It is the rule.',
          stat: '22,000 km',
          statLabel: 'DNT marked trails',
        },
        coast: {
          title: 'Supporting the working coast',
          body: 'Lofoten has 24,500 residents and about 800,000 tourist visits a year. We steer travellers to buy stockfish from the producer, not the souvenir shop. We explain rorbu etiquette. We direct spending to the communities that have fished these waters for a thousand years, not the tourist-trap chains.',
          stat: '1,000 years',
          statLabel: 'Lofoten fishing culture',
        },
        certified: {
          title: 'Eco-certified operators only',
          body: 'Norge Travel is a certified Eco-Lighthouse (Miljøfyrtårn) business. We prioritise accommodation and tour operators with verified sustainability credentials. When a partner has a mixed record, we note it. Sustainability is a genuine commitment here, not a marketing badge.',
          stat: 'Miljøfyrtårn',
          statLabel: 'Eco-Lighthouse certified',
        },
      },
    },
    destinations: {
      heading: 'Five destinations. One country.',
      intro: 'Each destination has its own logistics, its own weather, and its own set of rules. We cover them all.',
      all: 'All destinations',
      alt: '{name}, Norway',
      items: {
        'northern-norway': {
          name: 'Northern Norway',
          tagline: 'Midnight sun & aurora',
          stat: 'Jun–Aug midnight sun',
          winter: { tagline: 'Aurora & polar night', stat: 'Aurora season Sep–Mar' },
        },
        lofoten: {
          name: 'Lofoten',
          tagline: 'Hiking & midnight sun',
          stat: 'Jun–Jul 24-hour daylight',
          winter: { tagline: 'Skrei season & winter light', stat: 'Skrei cod season Jan–Apr' },
        },
        fjords: { name: 'Fjords', tagline: 'Zero-emission from 2026', stat: '2 UNESCO World Heritage' },
        svalbard: {
          name: 'Svalbard',
          tagline: '78°N – glacier hiking Jul–Aug',
          stat: 'Whale watching Jun–Aug',
          winter: { tagline: '78°N – polar night & aurora', stat: 'Sun below horizon 26 Oct–15 Feb' },
        },
        cities: { name: 'Cities of Norway', tagline: 'Oslo, Bergen, Trondheim & more', stat: '5 city guides' },
      },
    },
    contact: {
      badge: 'Plan your Arctic adventure',
      heading: 'Get in touch',
      intro: 'Questions about a tour? Partnership inquiry? We reply within one business day.',
      detailsTitle: 'Contact details',
      emailUs: 'Email us',
      copyLabel: 'Copy email address',
      copied: 'Email copied to clipboard',
      basedIn: 'Based in',
      basedInValue: 'Norway 🇳🇴',
      affiliateTitle: 'Affiliate partners',
      affiliateBody:
        'NorgeTravel.com earns commissions from linked operators. All recommendations are independent and based on quality, sustainability, and traveller value.',
      formTitle: 'Send us a message',
      thanksTitle: 'Thanks for reaching out!',
      thanksBody: "We'll get back to you within one business day.",
      sendAnother: 'Send another message',
      name: 'Name',
      interest: 'Interested in',
      interestPlaceholder: 'e.g. Northern Lights',
      email: 'Email',
      message: 'Message',
      messagePlaceholder: 'Tell us about your Norway travel plans...',
      error: 'Something went wrong. Try again or email us directly at hello@norgetravel.com.',
      sending: 'Sending...',
      send: 'Send message',
    },
  },

  zh: {
    hero: { trust: ['五个地区的本地编辑', '2025年国际游客创纪录达720万人次'] },
    editorial: {
      heading: '我们怎样写攻略',
      intro: '三条编辑原则，一条规矩：告诉旅行者需要知道的，而不是想听的。本站每一篇攻略，都由住在该地区的编辑撰写。',
      pillars: {
        grit: {
          label: '直面现实',
          title: '现实胜过想象',
          body: '挪威的自然不会迁就人。出发之前，我们告诉您步道的DNT难度等级、爬升多少米，以及真实的天气情况。步道危险，我们直说。谷歌地图说4小时、实际要6小时的路线，我们给您6小时这个数字。',
          quote: '巨魔之舌（Trolltunga）是一段12小时的徒步，雨常常横着打过来。没准备好，就别出发。',
          authorRole: '山地安全编辑，洛姆（Lom）',
        },
        compass: {
          label: '精确规划',
          title: '真正行得通的交通安排',
          body: '博德（Bodø）到莫斯克内斯（Moskenes）的渡轮要横渡开阔的韦斯特峡湾，航程三个多小时。冬天，每一公里您都感受得到。我们讲清楚AutoPASS自动收费、渡轮时刻表、季节性封路，以及没人提起的过路费。不靠猜，只给准确数字。',
          quote: '谷歌地图从没在古德旺根（Gudvangen）排队等过渡轮。我等过。这才是真实的时间。',
          authorRole: '峡湾交通编辑，卑尔根',
        },
        hearth: {
          label: '温暖回报',
          title: '路的尽头，是回报',
          body: '在雨夹雪里走了六个小时，再到老面包房的铁炉边脱下湿透的羊毛衣，这才是挪威人说的koselig（温暖安适）。我们带您认识仍在作业的海岸、渔村、萨米社区，以及让这趟辛苦值得的本地生产者。',
          quote: '渔人小屋（rorbu）里有盐和老木头的味道。这不是缺点。',
          authorRole: '海岸文化编辑，斯沃尔维尔（Svolvær）',
        },
      },
    },
    experts: {
      heading: '五个地区，五位本地编辑',
      intro: '挪威旅行 Norge Travel 的每一篇攻略，都出自住在当地的人之手。不是伦敦的内容公司，也不是只去过一次的自由撰稿人，而是在那里生活的人。',
      cta: '阅读编辑团队介绍',
      alt: '{name}，Norge Travel {role}',
      people: {
        'ingrid-solheim': {
          role: '峡湾交通编辑',
          zone: '挪威峡湾',
          basecamp: '卑尔根',
          quote: '一天之内，松恩峡湾和哈当厄尔峡湾您只能好好看一个。选一个。',
        },
        'bjorn-haugen': {
          role: '北极野外编辑',
          zone: '北极地区',
          basecamp: '特罗姆瑟',
          quote: '极光不是保证会上演的表演。至少订三晚。',
        },
        'marte-asheim': {
          role: '山地安全编辑',
          zone: '高山地区',
          basecamp: '洛姆',
          quote: '您开了四个小时的车才到这里，山不在乎。天气让您回头，就回头。',
        },
        'silje-nygard': {
          role: '城市文化编辑',
          zone: '城市',
          basecamp: '特隆赫姆',
          quote: '您读到的那篇餐厅点评，作者两年前跟着媒体考察团只去过一次。',
        },
        'lars-erik-nordvik': {
          role: '海岸文化编辑',
          zone: '渔业海岸',
          basecamp: '斯沃尔维尔',
          quote: '罗弗敦群岛有2.45万居民，每年接待约80万人次游客。请据此安排行程。',
        },
      },
    },
    sustainable: {
      badge: '可持续的北极旅行',
      heading: '我们不助长过度旅游，',
      headingAccent: '而是尽力避免它。',
      intro: '挪威不是主题公园。我们的编辑就住在这些地方。我们保护自己所写的地方，因为我们要对当地社区负责，而不是对预订量负责。',
      cta: '认识我们的团队',
      items: {
        cruising: {
          title: '峡湾零排放航行',
          body: '自2026年1月1日起，总吨位不足1万吨的客船在盖朗厄尔峡湾、纳柔依峡湾等世界遗产峡湾内必须零排放航行，更大的船只从2032年起执行。Havila Voyages的船可以只靠电池航行最多四小时。推荐任何运营商之前，我们都会核实它如何满足这些规定。',
          stat: '2026 / 2032',
          statLabel: '世界遗产峡湾零排放期限',
        },
        trails: {
          title: '保护步道',
          body: '罗弗敦群岛的雷讷布林根（Reinebringen）步道由尼泊尔夏尔巴人重新修建，以遏制游客过多造成的水土流失。贝塞根山脊（Besseggen）每个夏天有6万名徒步者。我们按DNT标准如实评定每条路线的难度，并为人满为患的步道推荐替代路线。挪威山地守则（Fjellvettreglene）不是可选的建议，而是规矩。',
          stat: '22,000公里',
          statLabel: 'DNT标记步道',
        },
        coast: {
          title: '支持仍在作业的渔业海岸',
          body: '罗弗敦群岛有2.45万居民，每年接待约80万人次游客。我们建议旅行者向生产者直接购买鳕鱼干，而不是去纪念品店。我们讲解入住渔人小屋（rorbu）的规矩，并把消费引向在这片海域捕鱼上千年的社区，而不是专坑游客的连锁店。',
          stat: '1000年',
          statLabel: '罗弗敦渔业文化',
        },
        certified: {
          title: '只推荐经过环保认证的运营商',
          body: 'Norge Travel 是获得认证的“环保灯塔”（Miljøfyrtårn）企业。我们优先推荐有可核实可持续认证的住宿和旅游运营商。合作伙伴有不良记录时，我们会写明。可持续对我们来说是真实的承诺，不是营销标签。',
          stat: 'Miljøfyrtårn',
          statLabel: '“环保灯塔”认证',
        },
      },
    },
    destinations: {
      heading: '五个目的地，一个挪威',
      intro: '每个目的地都有各自的交通、天气和规矩。我们逐一讲清楚。',
      all: '全部目的地',
      alt: '{name}，挪威',
      items: {
        'northern-norway': {
          name: '挪威北部',
          tagline: '午夜太阳与极光',
          stat: '6月至8月午夜太阳',
          winter: { tagline: '极光与极夜', stat: '极光季9月至次年3月' },
        },
        lofoten: {
          name: '罗弗敦群岛',
          tagline: '徒步与午夜太阳',
          stat: '6月至7月24小时日照',
          winter: { tagline: '鳕鱼季与冬日光线', stat: '鳕鱼（skrei）季1月至4月' },
        },
        fjords: { name: '峡湾', tagline: '2026年起实行零排放规定', stat: '2处世界遗产' },
        svalbard: {
          name: '斯瓦尔巴群岛',
          tagline: '北纬78°，7月至8月冰川徒步',
          stat: '6月至8月观鲸',
          winter: { tagline: '北纬78°，极夜与极光', stat: '10月26日至2月15日太阳不升起' },
        },
        cities: { name: '挪威城市', tagline: '奥斯陆、卑尔根、特隆赫姆等', stat: '5篇城市指南' },
      },
    },
    contact: {
      badge: '规划您的北极之旅',
      heading: '联系我们',
      intro: '对行程有疑问？想洽谈合作？我们会在一个工作日内用英文回复。',
      detailsTitle: '联系方式',
      emailUs: '发送邮件',
      copyLabel: '复制邮箱地址',
      copied: '邮箱地址已复制',
      basedIn: '所在地',
      basedInValue: '挪威 🇳🇴',
      affiliateTitle: '联盟合作伙伴',
      affiliateBody: 'NorgeTravel.com 会从部分链接的运营商处获得佣金。所有推荐都是独立做出的，依据是质量、可持续性和对旅行者的价值。',
      formTitle: '给我们留言',
      thanksTitle: '感谢您的来信',
      thanksBody: '我们会在一个工作日内回复您。',
      sendAnother: '再发一条',
      name: '姓名',
      interest: '感兴趣的内容',
      interestPlaceholder: '例如：极光',
      email: '电子邮箱',
      message: '留言',
      messagePlaceholder: '说说您的挪威旅行计划',
      error: '发送失败。请重试，或直接发邮件至 hello@norgetravel.com。',
      sending: '发送中…',
      send: '发送',
    },
  },

  ja: {
    hero: { trust: ['5つの地域に地元の編集者', '2025年の外国人旅行者は過去最多の720万人'] },
    editorial: {
      heading: '私たちの書き方',
      intro:
        '編集の柱は三つ、ルールは一つ。旅行者が聞きたいことではなく、知っておくべきことを伝えます。このサイトのガイドはすべて、その地域に住む編集者が書いています。',
      pillars: {
        grit: {
          label: '現実を伝える',
          title: '理想より現実を',
          body: 'ノルウェーの自然は甘くありません。歩き出す前に、DNTのコース難易度、標高差（メートル）、実際の天候をお伝えします。危険なコースは危険だと書きます。Googleマップで4時間でも実際は6時間かかるルートなら、6時間と書きます。',
          quote: 'トロルトゥンガは横殴りの雨の中を12時間歩くトレッキングです。準備ができていないなら、出発しないでください。',
          authorRole: '山岳安全担当編集者（ロム在住）',
        },
        compass: {
          label: '正確な計画',
          title: '本当に使える移動プラン',
          body: 'ボードー〜モスケネスのフェリーは、外海に開いたヴェストフィヨルドを3時間以上かけて渡ります。冬は1キロごとに揺れを感じます。AutoPASS（自動料金徴収）、フェリー時刻表、季節ごとの道路閉鎖、誰も教えてくれない通行料まで解説します。推測ではなく、正確な数字で。',
          quote: 'Googleマップはグドヴァンゲンのフェリー待ちの列に並んだことがありません。私はあります。これが実際の所要時間です。',
          authorRole: 'フィヨルド交通担当編集者（ベルゲン在住）',
        },
        hearth: {
          label: 'ぬくもり',
          title: 'ルートの終わりに待つもの',
          body: 'みぞれの中を6時間歩いたあと、古いパン屋の鉄ストーブのそばで濡れたウールを脱ぐ。それがノルウェー語の「コーセリグ（koselig）」、ぬくもりの本当の意味です。今も漁が続く海岸、漁村、サーミのコミュニティ、そしてこの旅の苦労に報いてくれる生産者たちを紹介します。',
          quote: 'ロルブー（漁師小屋）は潮と古い木の匂いがします。それは欠点ではありません。',
          authorRole: '沿岸文化担当編集者（スヴォルヴェル在住）',
        },
      },
    },
    experts: {
      heading: '5つの地域に、5人の地元編集者',
      intro:
        'Norge Travelのガイドは、すべてその地域に住む人が書いています。ロンドンの制作会社でも、一度訪れただけのライターでもありません。そこで暮らしている人です。',
      cta: '編集チームの紹介を読む',
      alt: '{name}（Norge Travel {role}）',
      people: {
        'ingrid-solheim': {
          role: 'フィヨルド交通担当編集者',
          zone: 'フィヨルド地方',
          basecamp: 'ベルゲン',
          quote: 'ソグネフィヨルドとハダンゲルフィヨルドを1日で両方きちんと見ることはできません。どちらかを選んでください。',
        },
        'bjorn-haugen': {
          role: '北極圏フィールド担当編集者',
          zone: '北極圏',
          basecamp: 'トロムソ',
          quote: 'オーロラは必ず見られるショーではありません。最低3泊は予約してください。',
        },
        'marte-asheim': {
          role: '山岳安全担当編集者',
          zone: '高山地帯',
          basecamp: 'ロム',
          quote: '4時間運転してここまで来たことなど、山は気にしません。天気が引き返せと言うなら、引き返してください。',
        },
        'silje-nygard': {
          role: '都市文化担当編集者',
          zone: '都市',
          basecamp: 'トロンハイム',
          quote: 'あなたが読んだレストランのレビューは、2年前にプレスツアーで一度訪れただけの人が書いたものです。',
        },
        'lars-erik-nordvik': {
          role: '沿岸文化担当編集者',
          zone: '漁業の海岸',
          basecamp: 'スヴォルヴェル',
          quote: 'ロフォーテン諸島の住民は2万4500人、観光客の訪問は年間約80万回です。それを前提に計画してください。',
        },
      },
    },
    sustainable: {
      badge: 'サステナブルな北極圏の旅',
      heading: 'オーバーツーリズムをあおりません。',
      headingAccent: '防ぐために書いています。',
      intro:
        'ノルウェーはテーマパークではありません。編集チームはこれらの土地に暮らしています。私たちが責任を負うのは予約件数ではなく地域の人々なので、書く場所を守ります。',
      cta: 'チームを見る',
      items: {
        cruising: {
          title: 'フィヨルドのゼロエミッション航行',
          body: '2026年1月1日から、総トン数1万トン未満の旅客船は、ガイランゲルフィヨルドやネーロイフィヨルドなどの世界遺産フィヨルドでゼロエミッション航行が義務づけられました。大型船は2032年からです。Havila Voyagesの船はバッテリーだけで最大4時間航行できます。運航会社を紹介する前に、規則への対応を確認しています。',
          stat: '2026 / 2032',
          statLabel: '世界遺産フィヨルドのゼロエミッション期限',
        },
        trails: {
          title: 'トレイルを守る',
          body: 'ロフォーテン諸島のレイネブリンゲンは、オーバーツーリズムによる浸食を抑えるため、ネパールのシェルパが登山道を造り直しました。ベッセゲン尾根には毎夏6万人のハイカーが訪れます。私たちはDNTの基準で全ルートの難易度を正直に評価し、混雑したトレイルには代わりのルートを示します。山の安全規則「フィエルヴェットレグレネ（Fjellvettreglene）」は任意の心得ではなく、守るべきルールです。',
          stat: '22,000 km',
          statLabel: 'DNTの標識付きトレイル',
        },
        coast: {
          title: '漁業の海岸を支える',
          body: 'ロフォーテン諸島の住民は2万4500人、観光客の訪問は年間約80万回です。干しダラはお土産店ではなく生産者から買うよう勧め、ロルブー（漁師小屋）でのマナーを説明します。観光客向けのチェーン店ではなく、この海で千年漁を続けてきた地域にお金が落ちるよう案内します。',
          stat: '1000年',
          statLabel: 'ロフォーテンの漁業文化',
        },
        certified: {
          title: 'エコ認証を受けた事業者のみ',
          body: 'Norge Travelは「エコ・ライトハウス（Miljøfyrtårn）」認証を受けた事業者です。持続可能性の認証が確認できる宿泊施設やツアー会社を優先して紹介し、パートナーに問題のある実績があれば明記します。サステナビリティは私たちにとって宣伝文句ではなく、本気の約束です。',
          stat: 'Miljøfyrtårn',
          statLabel: 'エコ・ライトハウス認証',
        },
      },
    },
    destinations: {
      heading: '5つの目的地、ひとつの国',
      intro: '目的地ごとに、移動手段も天気もルールも違います。そのすべてを解説します。',
      all: 'すべての目的地',
      alt: '{name}（ノルウェー）',
      items: {
        'northern-norway': {
          name: '北ノルウェー',
          tagline: '白夜とオーロラ',
          stat: '6〜8月は白夜',
          winter: { tagline: 'オーロラと極夜', stat: 'オーロラシーズンは9〜3月' },
        },
        lofoten: {
          name: 'ロフォーテン諸島',
          tagline: 'ハイキングと白夜',
          stat: '6〜7月は24時間の白夜',
          winter: { tagline: 'スクレイ漁の季節と冬の光', stat: 'スクレイ（タラ）漁は1〜4月' },
        },
        fjords: { name: 'フィヨルド', tagline: '2026年からゼロエミッション規制', stat: '世界遺産2か所' },
        svalbard: {
          name: 'スバールバル諸島',
          tagline: '北緯78度、7〜8月は氷河ハイキング',
          stat: '6〜8月はホエールウォッチング',
          winter: { tagline: '北緯78度、極夜とオーロラ', stat: '10月26日〜2月15日は太陽が昇らない' },
        },
        cities: { name: 'ノルウェーの都市', tagline: 'オスロ、ベルゲン、トロンハイムなど', stat: '都市ガイド5本' },
      },
    },
    contact: {
      badge: '北極圏の旅を計画する',
      heading: 'お問い合わせ',
      intro: 'ツアーについての質問や提携のご相談はこちらへ。1営業日以内に英語で返信します。',
      detailsTitle: '連絡先',
      emailUs: 'メール',
      copyLabel: 'メールアドレスをコピー',
      copied: 'メールアドレスをコピーしました',
      basedIn: '所在地',
      basedInValue: 'ノルウェー 🇳🇴',
      affiliateTitle: 'アフィリエイトについて',
      affiliateBody:
        'NorgeTravel.comはリンク先の事業者から紹介料を受け取ることがあります。おすすめはすべて独自の判断で、品質、持続可能性、旅行者にとっての価値に基づいています。',
      formTitle: 'メッセージを送る',
      thanksTitle: 'お問い合わせありがとうございます',
      thanksBody: '1営業日以内にご連絡します。',
      sendAnother: '別のメッセージを送る',
      name: 'お名前',
      interest: '興味のあること',
      interestPlaceholder: '例：オーロラ',
      email: 'メールアドレス',
      message: 'メッセージ',
      messagePlaceholder: 'ノルウェー旅行の計画を教えてください',
      error: '送信できませんでした。もう一度お試しいただくか、hello@norgetravel.com に直接メールしてください。',
      sending: '送信中…',
      send: '送信する',
    },
  },
};
