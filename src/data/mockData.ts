import { ComparisonMetric, ServicePillar, IrishSupportItem, CaseStudy, EngagementTier } from '../types';

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    id: 'velocity',
    category: 'Speed to Results',
    enterpriseFlaw: {
      title: '6-Month Committee Meetings',
      description: 'Big agency playbooks spend 3 to 6 months in mood boards, branding workshops, and endless presentations while your bank balance drops.',
      timeline: '12 to 24 weeks before anything launches',
      costImpact: '€25,000+ spent before speaking to a customer'
    },
    startupEdge: {
      title: '14-Day Practical Launch & Testing',
      description: 'We test your core offer directly with real potential buyers in Ireland and Europe within two weeks. We use real sales conversations, not theory.',
      timeline: '2 weeks to real customer feedback',
      costImpact: 'Zero wasted slide decks; 100% focused on finding buyers'
    },
    outperformanceMetric: '6x Faster',
    metricLabel: 'From strategy to first live sales inquiries',
    founderTakeaway: 'Startups survive on customer feedback and sales, not quarterly slide presentations.'
  },
  {
    id: 'targeting',
    category: 'Target Customer Focus',
    enterpriseFlaw: {
      title: 'Broad, Wasted Advertising',
      description: 'Corporate agencies run broad campaigns trying to reach "everyone." Early-stage businesses waste thousands advertising to people who will never buy.',
      timeline: 'Vague mass marketing',
      costImpact: 'Up to 80% of ad spend wasted on the wrong audience'
    },
    startupEdge: {
      title: 'Exact Buyer Match',
      description: 'We pinpoint the exact 150 to 500 companies in Ireland and abroad that have an urgent need for what you sell right now.',
      timeline: 'Direct relevance from Day 1',
      costImpact: 'Every single euro reaches high-intent decision-makers'
    },
    outperformanceMetric: '4.2x Higher',
    metricLabel: 'Meeting booking rate from targeted buyers',
    founderTakeaway: 'When your budget is tight, narrowing your focus is the fastest way to grow your revenue.'
  },
  {
    id: 'budget',
    category: 'Budget Efficiency',
    enterpriseFlaw: {
      title: 'Vanity Clicks & Expensive Overhead',
      description: 'Large firms push billboard ads, awards, and generic social impressions that look nice but bring in zero paying clients.',
      timeline: 'Unclear return on investment',
      costImpact: '€6,000 to €12,000 monthly retainer fees'
    },
    startupEdge: {
      title: 'Direct Focus on Customer Revenue',
      description: 'Every marketing activity is tied directly to booking sales calls, winning customers, and keeping your cost-per-lead as low as possible.',
      timeline: 'Clear results tracked month by month',
      costImpact: 'Every euro goes directly into winning new business'
    },
    outperformanceMetric: '-58% Lower',
    metricLabel: 'Average cost to acquire a paying customer',
    founderTakeaway: 'Cash runway is life. Tailored startup marketing brings in customers without draining your bank account.'
  },
  {
    id: 'leadership',
    category: 'Who Actually Does the Work',
    enterpriseFlaw: {
      title: 'Pitched by Seniors, Run by Juniors',
      description: 'Senior agency directors pitch you the contract, then quietly hand your account to junior grads who are learning on your dime.',
      timeline: 'Slow progress and constant handoffs',
      costImpact: 'Costly mistakes and beginner learning curves'
    },
    startupEdge: {
      title: 'Direct Strategic Guidance with David',
      description: 'You work directly with David Murphy, an experienced advisor who knows the Irish business landscape, grant systems, and growth roadmaps.',
      timeline: 'Direct weekly access & fast decisions',
      costImpact: 'No junior trial-and-error on your balance sheet'
    },
    outperformanceMetric: '100% Senior',
    metricLabel: 'Experienced strategic leadership from day one',
    founderTakeaway: 'You get experienced executive clarity immediately without the cost of hiring a full-time marketing director.'
  },
  {
    id: 'channel',
    category: 'Marketing Channels',
    enterpriseFlaw: {
      title: 'Trying to Be Everywhere at Once',
      description: 'Spreading limited resources across TikTok, LinkedIn, podcasts, events, and print without making a dent on any of them.',
      timeline: 'Sub-scale everywhere with little impact',
      costImpact: 'Burnout and wasted budget across 7 weak channels'
    },
    startupEdge: {
      title: 'Mastering the 1-2 Channels that Work',
      description: 'We find the one or two marketing channels where your target customers actually spend time, master them, and generate steady inquiries.',
      timeline: 'Predictable leads in 60 to 90 days',
      costImpact: 'Concentrated effort that compounds over time'
    },
    outperformanceMetric: '3.1x',
    metricLabel: 'Better return on your marketing spend',
    founderTakeaway: 'Dominating one channel wins customers; dabbling in six just creates noise and stress.'
  }
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'gtm-icp',
    number: '01',
    title: 'Customer Match & Clear Messaging',
    kicker: 'Who You Sell To & Why They Buy',
    description: 'We replace confusing jargon and months of workshops with a practical 14-day sprint. We identify your highest-value customers, write clear website and pitch copy that explains your value in plain English, and give you a sales script that wins deals.',
    whyEnterpriseFailsHere: 'Corporate agencies write 80-page brand guidelines full of abstract buzzwords that never help you close a real sales meeting.',
    startupDeliverables: [
      'Clear profile of your best paying customers and what makes them buy',
      'Plain-English website copy and value proposition',
      'Simple competitor comparison guide highlighting your edge',
      'One-page sales cheat sheet for founder meetings and calls'
    ],
    timeline: '2 to 3-week sprint',
    typicalRoi: 'Saves 3+ months of trial-and-error messaging'
  },
  {
    id: 'demand-sprints',
    number: '02',
    title: 'Practical Lead Generation Sprints',
    kicker: 'Finding Ready-to-Buy Clients',
    description: 'We set up focused, cost-effective lead generation systems for startups that do not have massive advertising budgets. We find the most affordable ways to reach real buyers, test campaigns in short bursts, and build a steady flow of sales inquiries.',
    whyEnterpriseFailsHere: 'Big agency playbooks assume you have €50,000 a month to spend on broad ads, which burns early-stage cash fast.',
    startupDeliverables: [
      'High-intent search and direct outreach setup (LinkedIn and email)',
      'High-converting landing page structure and clear copy',
      'Direct, polite outreach templates that get positive replies',
      'Simple dashboard showing cost per lead and sales pipeline'
    ],
    timeline: '30-day setup and launch',
    typicalRoi: 'Typically brings in first qualified sales leads within 21 days'
  },
  {
    id: 'irish-ecosystem',
    number: '03',
    title: 'Irish Market & Export Strategy',
    kicker: 'Enterprise Ireland, LEO Grants & Overseas Growth',
    description: 'We tailor your commercial strategy to take full advantage of Ireland’s business supports. We help you win domestic credibility, structure plans that meet Enterprise Ireland and LEO grant standards, and expand into the UK and European markets cleanly.',
    whyEnterpriseFailsHere: 'Overseas agencies do not understand Enterprise Ireland grant paperwork, Local Enterprise Office rules, or how business is done in Ireland.',
    startupDeliverables: [
      'Marketing strategy plans formatted to qualify for state enterprise grants',
      'Practical entry plan for launching into the UK and European markets',
      'Checklist for securing matching funding and business vouchers',
      'Guidance on domestic Irish B2B partnerships and buyer networks'
    ],
    timeline: 'Integrated across your growth roadmap',
    typicalRoi: 'Unlocks state co-funding and speeds up international sales'
  },
  {
    id: 'fractional-cmo',
    number: '04',
    title: 'Part-Time Marketing Director',
    kicker: 'Senior Advice Without the €140k Salary',
    description: 'Get regular, hands-on strategic marketing leadership for your business without committing to a full-time executive salary. We guide your weekly marketing priorities, manage freelancers or junior team members, and ensure your marketing generates real sales.',
    whyEnterpriseFailsHere: 'Hiring a junior marketer lacks strategic direction, while hiring a full-time corporate marketing director costs over €140,000 a year before they do any work.',
    startupDeliverables: [
      'Weekly one-on-one strategy and sales review call with David Murphy',
      'Clear monthly plan of what to build, test, and improve',
      'Hiring, reviewing, and directing freelance designers and copywriters',
      'Commercial traction slides for investor and bank meetings'
    ],
    timeline: 'Flexible monthly advisory partnership',
    typicalRoi: 'Senior strategic leadership at roughly a third of full-time cost'
  }
];

export const IRISH_SUPPORTS: IrishSupportItem[] = [
  {
    id: 'hpsu',
    name: 'Enterprise Ireland HPSU Support',
    agency: 'Enterprise Ireland',
    scope: 'High Potential Start-Up Program',
    strategicRelevance: 'Aligns your market research, customer profile, and international sales plan with Enterprise Ireland co-funding requirements.',
    grantValue: 'Co-funding up to 50% for international market development'
  },
  {
    id: 'leo-expansion',
    name: 'Business Expansion Grant',
    agency: 'Local Enterprise Office (LEO)',
    scope: 'Dublin, Cork, Galway & Regional LEOs',
    strategicRelevance: 'Supports growing small businesses and local companies looking to increase sales, hire staff, and expand operations.',
    grantValue: 'Up to €150,000 funding support subject to eligibility'
  },
  {
    id: 'tame-export',
    name: 'Technical Assistance for Micro Exporters (TAME)',
    agency: 'Local Enterprise Office',
    scope: 'Market Research & Export Strategy',
    strategicRelevance: 'Helps Irish businesses research new overseas markets, translate websites, and create marketing materials for export.',
    grantValue: '50% grant aid up to €2,500 towards export marketing'
  },
  {
    id: 'digital-voucher',
    name: 'Trading Online & Digital Vouchers',
    agency: 'LEO & Enterprise Ireland',
    scope: 'Digital Marketing & Sales Systems',
    strategicRelevance: 'Enables investment in modern website improvements, customer booking systems, and digital lead generation tools.',
    grantValue: 'Grant aid towards strategic digital tools and implementation'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'b2b-saas-docklands',
    companySnippet: 'B2B Software & Compliance',
    sector: 'Financial Technology',
    location: 'Dublin Silicon Docks',
    metric: '+215%',
    metricContext: 'Increase in qualified sales inquiries in 90 days',
    headline: 'Replacing a 6-month branding agency retainer with a focused 14-day customer sprint.',
    theBottleneck: 'Spent €32,000 over 8 months with a traditional Dublin corporate agency. Got back heavy brand guidelines and social media posts, but zero sales meetings from Irish financial managers.',
    theTailoredStrategy: 'Removed confusing buzzwords from the website. Created a direct outreach plan aimed at the exact 200 Irish companies dealing with new compliance audits.',
    results: [
      'First enterprise pilot contract signed within 24 days of launch',
      'Average sales cycle dropped from 14 weeks to 38 days',
      'Generated €480,000 in genuine sales pipeline in under one quarter'
    ]
  },
  {
    id: 'deeptech-cork',
    companySnippet: 'Industrial Sensors & Energy Analytics',
    sector: 'CleanTech & Hardware',
    location: 'Cork City, Ireland',
    metric: '€1.4M',
    metricContext: 'Funding secured + 4 commercial pilot contracts',
    headline: 'Translating complex engineering technology into simple benefits that customers buy.',
    theBottleneck: 'Brilliant technical founders whose website read like an academic research paper. Potential buyers could not understand how it saved them money, and sales were stalling.',
    theTailoredStrategy: 'Rewrote the messaging around direct cost savings for European factory managers. Built a simple, one-page savings calculator and clear sales deck.',
    results: [
      'Closed 4 paid factory pilot contracts in Ireland and the UK within 60 days',
      'Secured Enterprise Ireland co-investment on schedule',
      'Cut the cost of acquiring each customer by 62%'
    ]
  },
  {
    id: 'galway-sme',
    companySnippet: 'MedTech Equipment & Calibration',
    sector: 'Healthcare & Manufacturing SME',
    location: 'Galway Innovation Hub',
    metric: '3.4x',
    metricContext: 'Revenue growth with 48% lower marketing spend',
    headline: 'Breaking out of local word-of-mouth into UK and German medical supply chains.',
    theBottleneck: 'Relying solely on word-of-mouth referrals. Traditional consultants suggested €40,000 international trade show booths that would have depleted their annual profits.',
    theTailoredStrategy: 'Built a lean digital outreach system targeting purchasing managers at medical device manufacturers in Galway, Athlone, and the UK.',
    results: [
      'Incoming quotation requests jumped by 340% within 5 months',
      'Secured 3 recurring contracts with multinational medical manufacturers',
      'Entire marketing investment paid for itself within 45 days'
    ]
  }
];

export const ENGAGEMENT_TIERS: EngagementTier[] = [
  {
    id: 'sprint',
    name: '30-Day Founder Growth Sprint',
    idealFor: 'Early-stage startups and small businesses needing clear positioning and quick sales leads.',
    priceModel: 'Fixed sprint investment',
    duration: '4-Week Intensive',
    summary: 'A fast, practical sprint that defines your best customers, sharpens your message, and launches your first active lead generation channel.',
    features: [
      'In-depth review of your best customers and what makes them buy',
      'Clear, jargon-free website copy and sales pitch messaging',
      'Launch of your first targeted customer acquisition campaign',
      'Simple dashboard tracking leads, inquiries, and conversion rates',
      'Weekly strategy and progress review with David Murphy'
    ],
    deliverables: [
      'Step-by-step Go-To-Market Plan',
      'Live customer inquiry campaign',
      'Clear sales presentation deck'
    ],
    buttonText: 'Book Strategy Consultation'
  },
  {
    id: 'fractional',
    name: 'Part-Time Marketing Director',
    isPopular: true,
    idealFor: 'Funded startups and growing Irish SMEs looking for regular senior marketing direction without full-time overhead.',
    priceModel: 'Flexible monthly retainer',
    duration: '3 to 6-Month Partnership',
    summary: 'Senior marketing leadership working alongside your team each week to guide your growth, manage campaigns, and increase sales.',
    features: [
      'Everything in the 30-Day Growth Sprint',
      'Weekly strategy check-ins and sales pipeline reviews',
      'Hiring, briefing, and managing freelance designers and writers',
      'UK and European export market launch strategy',
      'Assistance preparing documents for Enterprise Ireland and LEO grants',
      'Regular board-level and investor progress updates'
    ],
    deliverables: [
      'Quarterly growth roadmap',
      'Repeatable customer acquisition channels',
      'Hands-on executive marketing guidance'
    ],
    buttonText: 'Inquire About Part-Time Director'
  },
  {
    id: 'diagnostic',
    name: '1-on-1 Strategy Diagnostic',
    idealFor: 'Founders who want an honest second opinion on why their marketing is slow before spending more money.',
    priceModel: '1-on-1 Founder Session',
    duration: '90-Minute Deep Dive',
    summary: 'A thorough review of your current website, messaging, customer acquisition channels, and where you might be wasting money.',
    features: [
      'Full review of your website and competitors before the call',
      '90-minute live working session with David Murphy',
      'Identification of your #1 sales bottleneck and immediate quick wins',
      'Comparison against Irish tech and small business benchmarks',
      'Written 30-day action plan sent within 48 hours'
    ],
    deliverables: [
      'Written Strategy Diagnostic Report',
      'Actionable 30-day growth checklist',
      'Full session recording and notes'
    ],
    buttonText: 'Book Strategy Diagnostic'
  }
];

export const FAQS = [
  {
    q: 'Why do marketing strategies built for big corporations fail startups and small businesses?',
    a: 'Large corporations have millions to burn, household name recognition, and months to wait for committee approvals. Startups and small businesses operate with limited cash. If your marketing doesn’t bring in genuine customer conversations, sales calls, or cash flow within weeks, you are burning capital you cannot replace. We focus on fast, practical tests that win customers, not corporate theory.'
  },
  {
    q: 'How is Marketing4Startups different from a standard marketing agency?',
    a: 'Traditional agencies sell hourly retainers, pass your account to junior staff, and focus on vanity metrics like social media likes or impressions. Marketing4Startups is run by senior strategists who talk to you founder-to-founder. We focus on the commercial basics first: who your buyers are, what message makes them say yes, and how to reach them cost-effectively before you spend money on advertising.'
  },
  {
    q: 'Can this work alongside Enterprise Ireland or Local Enterprise Office (LEO) grants?',
    a: 'Yes, absolutely. Many of our clients use state enterprise supports to co-fund our work. Our strategy documents, export plans, and digital marketing setups are structured to meet the eligibility requirements for Enterprise Ireland Market Discovery Grants, LEO Business Expansion Grants, and TAME export vouchers.'
  },
  {
    q: 'What happens during the initial Strategy Consultation call?',
    a: 'It is a focused, 45-minute practical conversation with David Murphy. Before the call, David reviews your website, business model, and competitors. On the call, we pinpoint the single biggest bottleneck holding back your sales, evaluate your pricing and messaging, and give you honest, actionable advice on the fastest way forward.'
  },
  {
    q: 'What stage does my business need to be at to benefit?',
    a: 'We work primarily with pre-seed and seed-funded tech startups, companies on the Enterprise Ireland High Potential Start-Up (HPSU) track, and established Irish small businesses (annual revenue typically between €250k and €5M) that want to modernize their marketing, win more customers, or expand into the UK and Europe.'
  }
];
