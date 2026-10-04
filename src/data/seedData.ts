import {
  Company,
  Job,
  UserProfile,
  EmployeeConnector,
  CompanyReview,
  CompanyQA,
  NetworkingEvent,
  Application,
  InterviewSchedule,
  OfferLetter,
  OnboardingTask,
  Assessment,
  NotificationItem,
} from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_tech_workspace_1791147879946.jpg';
export const APPLICANT_AVATAR = '/src/assets/images/avatar_applicant_male_1791147891811.jpg';
export const RECRUITER_AVATAR = '/src/assets/images/avatar_recruiter_female_1791147901892.jpg';
export const INSIDER_AVATAR = '/src/assets/images/avatar_insider_engineer_1791147914129.jpg';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'Paystack',
    slug: 'paystack',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Modern payment infrastructure for ambitious businesses in Africa',
    about: 'Paystack builds technology to help Africa’s best businesses grow — from new startups to market leaders launching bold new business models. Over 200,000 organizations use Paystack to accept payments securely.',
    mission: 'To accelerate commerce in Africa by giving ambitious businesses the digital tools and payment rails they need.',
    website: 'https://paystack.com',
    size: '250-500 employees',
    industry: 'Fintech & Payments',
    foundedYear: 2015,
    locations: ['Lagos, Nigeria', 'Accra, Ghana', 'Nairobi, Kenya', 'Cape Town, South Africa', 'Remote'],
    techStack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Go', 'AWS', 'Docker', 'Redis'],
    benefits: ['Full health & dental insurance', 'Unlimited PTO policy', '$3,000 annual learning stipend', 'Home office budget ($1,500)', 'Annual team offsites in Kenya/Rwanda', 'Parental leave (16 weeks paid)'],
    culturePhotos: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
    overallRating: 4.8,
    workLifeRating: 4.7,
    cultureRating: 4.9,
    compensationRating: 4.8,
    reviewsCount: 42,
    followersCount: 18400,
    hrRecruiterId: 'user-recruiter-1'
  },
  {
    id: 'comp-2',
    name: 'Flutterwave',
    slug: 'flutterwave',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Endless possibilities for payments across Africa and the world',
    about: 'Flutterwave is simplifying commerce across Africa and linking global merchants with the African consumer base through Send, Barter, and enterprise payment rails across 30+ African currencies.',
    mission: 'Connecting Africa to the global digital economy through seamless, secure borderless transactions.',
    website: 'https://flutterwave.com',
    size: '500-1000 employees',
    industry: 'Fintech & Global Payments',
    foundedYear: 2016,
    locations: ['Lagos, Nigeria', 'San Francisco, USA', 'London, UK', 'Nairobi, Kenya'],
    techStack: ['Python', 'Django', 'React', 'Vue', 'Kubernetes', 'GCP', 'PostgreSQL', 'Kafka'],
    benefits: ['Competitive equity grants', 'Comprehensive HMO covering family', 'Performance bonuses', 'Wellness allowances', 'Hybrid work flex'],
    culturePhotos: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
    overallRating: 4.5,
    workLifeRating: 4.2,
    cultureRating: 4.6,
    compensationRating: 4.7,
    reviewsCount: 65,
    followersCount: 24300,
    hrRecruiterId: 'user-recruiter-2'
  },
  {
    id: 'comp-3',
    name: 'Moniepoint',
    slug: 'moniepoint',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    tagline: 'The financial engine for small and medium businesses in emerging markets',
    about: 'Moniepoint is the all-in-one financial ecosystem powering over 1.3 million businesses with POS solutions, working capital loans, business bank accounts, and invoice automation.',
    mission: 'Powering financial happiness and operational growth for every business owner in Africa.',
    website: 'https://moniepoint.com',
    size: '1000+ employees',
    industry: 'Business Banking & Neobank',
    foundedYear: 2015,
    locations: ['Lagos, Nigeria', 'Abuja, Nigeria', 'London, UK', 'Remote'],
    techStack: ['Java', 'Spring Boot', 'React', 'Kafka', 'PostgreSQL', 'Kubernetes', 'AWS'],
    benefits: ['High competitive base pay', 'Pension contribution matching', 'Comprehensive medical scheme', 'Gym memberships', 'Internal mobility'],
    culturePhotos: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
    ],
    verified: true,
    overallRating: 4.6,
    workLifeRating: 4.3,
    cultureRating: 4.7,
    compensationRating: 4.9,
    reviewsCount: 38,
    followersCount: 15200
  },
  {
    id: 'comp-4',
    name: 'Piggyvest',
    slug: 'piggyvest',
    logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    tagline: 'The premier automated savings and micro-investment platform in Nigeria',
    about: 'Piggyvest helps millions of Nigerians save and invest billions of naira with competitive interest rates, automated discipline tools, and safe fund management.',
    mission: 'Give everyone the power to achieve financial independence through simple, disciplined savings and high-yield investments.',
    website: 'https://piggyvest.com',
    size: '100-250 employees',
    industry: 'Fintech & WealthTech',
    foundedYear: 2016,
    locations: ['Lagos, Nigeria', 'Remote'],
    techStack: ['Node.js', 'Next.js', 'React Native', 'MongoDB', 'Redis', 'AWS'],
    benefits: ['High savings match bonus', 'Remote-first culture', 'Lunch and catered snacks', 'Mental health support', 'Conference budgets'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.7,
    workLifeRating: 4.8,
    cultureRating: 4.8,
    compensationRating: 4.6,
    reviewsCount: 29,
    followersCount: 19800
  },
  {
    id: 'comp-5',
    name: 'Andela',
    slug: 'andela',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Connecting global companies with elite engineering talent anywhere',
    about: 'Andela is the global network for trusted tech talent. We connect high-growth enterprises and venture-backed startups with vetted engineers across 110+ countries.',
    mission: 'Brilliance is evenly distributed, opportunity is not. We bridge that gap.',
    website: 'https://andela.com',
    size: '500-1000 employees',
    industry: 'Talent Marketplace & EdTech',
    foundedYear: 2014,
    locations: ['Global Remote', 'Lagos, Nigeria', 'Nairobi, Kenya', 'New York, USA'],
    techStack: ['TypeScript', 'GraphQL', 'React', 'Python', 'AWS', 'Terraform'],
    benefits: ['100% remote flexibility', 'USD-pegged compensation', 'Coworking stipends worldwide', 'Global peer community', 'Professional mentoring'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.4,
    workLifeRating: 4.5,
    cultureRating: 4.4,
    compensationRating: 4.6,
    reviewsCount: 52,
    followersCount: 31000
  },
  {
    id: 'comp-6',
    name: 'Kuda Bank',
    slug: 'kuda-bank',
    logo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    tagline: 'The money app for Africans with zero bank charges',
    about: 'Kuda is a full-service, digital-only bank licensed by the Central Bank of Nigeria, providing affordable and accessible banking services with zero card maintenance fees.',
    mission: 'Making financial services affordable, accessible and rewarding for every African.',
    website: 'https://kuda.com',
    size: '500-1000 employees',
    industry: 'Digital Banking',
    foundedYear: 2019,
    locations: ['Lagos, Nigeria', 'London, UK', 'Cape Town, South Africa'],
    techStack: ['Swift', 'Kotlin', 'C#', '.NET Core', 'Azure', 'Angular', 'React'],
    benefits: ['Subsidized tech gear', 'Quarterly hackathons', 'Health insurance with eye/dental care', 'Relocation assistance to UK'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.3,
    workLifeRating: 4.1,
    cultureRating: 4.3,
    compensationRating: 4.5,
    reviewsCount: 34,
    followersCount: 16700
  },
  {
    id: 'comp-7',
    name: 'Nomba',
    slug: 'nomba',
    logo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Simplifying payments and business tools for African merchants',
    about: 'Nomba (formerly Kudi) equips merchants with customized point-of-sale terminals, inventory tracking, business accounts, and multi-location management software.',
    mission: 'Powering seamless transactions and commerce operations for millions of African small businesses.',
    website: 'https://nomba.com',
    size: '250-500 employees',
    industry: 'Merchant Commerce & POS',
    foundedYear: 2016,
    locations: ['Lagos, Nigeria', 'Remote'],
    techStack: ['Go', 'Node.js', 'React Native', 'PostgreSQL', 'GCP'],
    benefits: ['Comprehensive HMO plan', 'Flexible work hours', 'Stock option grants', 'Team lunches'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.4,
    workLifeRating: 4.3,
    cultureRating: 4.5,
    compensationRating: 4.4,
    reviewsCount: 22,
    followersCount: 9400
  },
  {
    id: 'comp-8',
    name: 'Bamboo',
    slug: 'bamboo',
    logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Invest in US and local stocks from your mobile phone in Africa',
    about: 'Bamboo gives Africans real-time access to buy, hold, or sell US tech giants like Apple, Google, Microsoft, as well as high-yield fixed returns from their phones.',
    mission: 'Democratizing wealth creation and investment opportunities for Africans.',
    website: 'https://investbamboo.com',
    size: '50-100 employees',
    industry: 'WealthTech & Securities',
    foundedYear: 2019,
    locations: ['Lagos, Nigeria', 'Accra, Ghana', 'Remote'],
    techStack: ['React Native', 'Node.js', 'Python', 'PostgreSQL', 'AWS'],
    benefits: ['Dollar compensation options', 'Generous equity', 'Remote first setup', 'Unlimited time off'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.6,
    workLifeRating: 4.7,
    cultureRating: 4.6,
    compensationRating: 4.7,
    reviewsCount: 19,
    followersCount: 11200
  },
  {
    id: 'comp-9',
    name: 'Interswitch',
    slug: 'interswitch',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80',
    tagline: 'The pioneering digital payments infrastructure provider in Africa',
    about: 'Interswitch powers the electronic financial transactions ecosystem in Africa. Known for Verve card and Quickteller, processing over 1 billion transactions monthly.',
    mission: 'Creating intuitive exchange solutions that make payments an effortless part of everyday life in Africa.',
    website: 'https://interswitchgroup.com',
    size: '1000+ employees',
    industry: 'Payment Infrastructure',
    foundedYear: 2002,
    locations: ['Lagos, Nigeria', 'Nairobi, Kenya', 'Kampala, Uganda'],
    techStack: ['Java', 'Oracle DB', 'Kafka', 'Spring Boot', 'Kubernetes'],
    benefits: ['Top-tier pension and gratuity', 'Executive health insurance', 'Structured career ladder', 'Annual performance bonuses'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.3,
    workLifeRating: 4.0,
    cultureRating: 4.2,
    compensationRating: 4.5,
    reviewsCount: 78,
    followersCount: 28900
  },
  {
    id: 'comp-10',
    name: 'Reliance Health',
    slug: 'reliance-health',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    tagline: 'Tech-enabled healthcare & insurance for emerging markets',
    about: 'Reliance Health uses data and integrated telemedicine to make healthcare delightfully affordable and accessible for both retail individuals and corporate teams.',
    mission: 'Making world-class quality healthcare accessible and affordable to everyone in emerging markets.',
    website: 'https://reliancehealthinc.com',
    size: '250-500 employees',
    industry: 'HealthTech & InsurTech',
    foundedYear: 2016,
    locations: ['Lagos, Nigeria', 'Cairo, Egypt', 'Remote'],
    techStack: ['Python', 'FastAPI', 'React', 'Docker', 'PostgreSQL', 'AWS'],
    benefits: ['Free platinum healthcare for whole family', 'Gym & wellness stipends', 'Hybrid work setup', 'Continuous learning reimbursement'],
    culturePhotos: [],
    verified: true,
    overallRating: 4.5,
    workLifeRating: 4.4,
    cultureRating: 4.6,
    compensationRating: 4.5,
    reviewsCount: 26,
    followersCount: 8800
  }
];

export const INITIAL_JOBS: Job[] = [
  // Paystack (comp-1)
  {
    id: 'job-1',
    title: 'Senior Full Stack Engineer (Core Payments)',
    slug: 'senior-full-stack-engineer-paystack',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (Hybrid)',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 18000000,
    salaryMax: 26000000,
    salaryCurrency: 'NGN',
    description: 'We are looking for a Senior Full Stack Engineer to join our Core Payments team. You will architect, build, and optimize high-throughput distributed payment processing rails handling hundreds of millions of dollars monthly.',
    responsibilities: [
      'Design, implement, and maintain mission-critical payment APIs and checkout experiences',
      'Optimize database queries and async job queues for sub-100ms latency',
      'Collaborate with banking partners and card schemes on direct integration protocols',
      'Mentor intermediate engineers and participate in architecture review boards'
    ],
    requirements: [
      '5+ years building production web systems at scale with TypeScript or Go',
      'Strong expertise in relational databases (PostgreSQL, MySQL) and transaction locking models',
      'Deep understanding of RESTful API design, idempotency, and security standards (PCI-DSS)',
      'Experience in event-driven architectures with Kafka or RabbitMQ'
    ],
    skills: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    benefits: ['Full health cover', 'Learning stipend ($3k)', 'Unlimited PTO', 'Home office setup'],
    applicantsCount: 34,
    postedDate: '2 days ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-2',
    title: 'Product Designer (Design Systems)',
    slug: 'product-designer-design-systems-paystack',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Remote (Africa / Europe timezone)',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Product Design',
    salaryMin: 12000000,
    salaryMax: 17000000,
    salaryCurrency: 'NGN',
    description: 'Help standardize and scale Paystack design system across web, mobile, checkout popups, and internal dashboard tooling with pixel perfection.',
    responsibilities: [
      'Evolve our multi-brand Figma component library and documentation',
      'Pair closely with frontend engineers to build accessible React components',
      'Conduct usability tests on checkout interfaces to optimize merchant conversion rates'
    ],
    requirements: [
      '3+ years experience as a UI/UX or Product Designer in SaaS or Fintech',
      'Exemplary portfolio showing scalable design system craftsmanship',
      'Strong grasp of WCAG accessibility standards and micro-interactions'
    ],
    skills: ['Figma', 'Design Systems', 'UI/UX', 'Design Tokens', 'User Research'],
    benefits: ['Unlimited time off', 'Hardware budget', 'International offsite'],
    applicantsCount: 48,
    postedDate: '4 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-3',
    title: 'Staff Site Reliability Engineer (Infrastructure)',
    slug: 'staff-sre-infrastructure-paystack',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos or Remote',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Infrastructure',
    salaryMin: 28000000,
    salaryMax: 36000000,
    salaryCurrency: 'NGN',
    description: 'Ensure 99.99% availability of Africa’s most critical payment gateway infrastructure across multiple AWS regions.',
    responsibilities: [
      'Lead infrastructure as code using Terraform and multi-cluster Kubernetes',
      'Build automated disaster recovery and chaos engineering simulations',
      'Tune observability with Prometheus, Grafana, and Datadog'
    ],
    requirements: [
      '7+ years in DevOps/SRE with proven experience supporting high-scale distributed systems',
      'Mastery of AWS cloud networking, VPC peering, and secure transit gateways',
      'Proficiency with Kubernetes operators and zero-downtime blue/green rollouts'
    ],
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Prometheus', 'Datadog', 'Go'],
    benefits: ['Annual company offsites', 'Stock options', 'Premium HMO'],
    applicantsCount: 16,
    postedDate: '1 week ago',
    status: 'active',
    featured: true
  },

  // Flutterwave (comp-2)
  {
    id: 'job-4',
    title: 'Senior Backend Engineer (Send Global Remittance)',
    slug: 'senior-backend-engineer-flutterwave',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 20000000,
    salaryMax: 28000000,
    salaryCurrency: 'NGN',
    description: 'Work on Send by Flutterwave, powering instant cross-border remittances from the US, UK, and Europe into bank accounts and mobile wallets in Africa.',
    responsibilities: [
      'Build resilient FX conversion and real-time settlement microservices',
      'Integrate with international card schemes and local clearing houses',
      'Maintain automated reconciliation pipelines across multi-currency ledgers'
    ],
    requirements: [
      '5+ years building backend systems with Python, Go, or Java',
      'Solid experience with message streaming (Kafka) and caching (Redis)',
      'Experience in financial compliance, AML/KYC flows, or fraud prevention'
    ],
    skills: ['Python', 'Django', 'Kafka', 'PostgreSQL', 'Docker', 'Microservices'],
    benefits: ['Equity allocation', 'International travel perks', 'Comprehensive HMO'],
    applicantsCount: 41,
    postedDate: 'Just now',
    status: 'active',
    featured: true
  },
  {
    id: 'job-5',
    title: 'Lead Product Manager (Enterprise Checkout)',
    slug: 'lead-product-manager-flutterwave',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos / Nairobi / Remote',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Product Management',
    salaryMin: 22000000,
    salaryMax: 30000000,
    salaryCurrency: 'NGN',
    description: 'Own the strategy and roadmap for Flutterwave Enterprise Checkout used by global brands like Uber, Microsoft, and Booking.com.',
    responsibilities: [
      'Translate enterprise merchant requirements into clear engineering specs',
      'Drive data-driven experiments to increase authorization rates by country',
      'Collaborate with global regulatory teams on country-specific compliance'
    ],
    requirements: [
      '6+ years PM experience with at least 3 years in Fintech or B2B payments',
      'Exceptional quantitative analysis and stakeholder management skills',
      'Track record of launching products used by millions of customers'
    ],
    skills: ['Product Strategy', 'Fintech', 'SQL', 'Agile', 'User Discovery'],
    benefits: ['Competitive equity', 'Health coverage', 'Gym membership'],
    applicantsCount: 29,
    postedDate: '3 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-6',
    title: 'Data Scientist (Fraud & Risk Machine Learning)',
    slug: 'data-scientist-fraud-ml-flutterwave',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    location: 'Remote',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Data & Analytics',
    salaryMin: 24000000,
    salaryMax: 32000000,
    salaryCurrency: 'NGN',
    description: 'Build real-time machine learning models that evaluate transactions within milliseconds to prevent fraudulent chargebacks while maintaining seamless friction.',
    responsibilities: [
      'Train anomaly detection and graph neural network fraud models',
      'Deploy low-latency inference pipelines on Kubernetes',
      'Conduct feature engineering on behavioral biometric telemetry'
    ],
    requirements: [
      'MS or PhD in Computer Science, Statistics, or 4+ years applied ML experience',
      'Proficiency in Python (PyTorch, scikit-learn, XGBoost, Pandas)',
      'Experience with real-time stream processing engines'
    ],
    skills: ['Python', 'Machine Learning', 'PyTorch', 'Kafka', 'SQL', 'MLOps'],
    benefits: ['Home office budget', 'Wellness stipend', 'Flexible hours'],
    applicantsCount: 19,
    postedDate: '5 days ago',
    status: 'active',
    featured: false
  },

  // Moniepoint (comp-3)
  {
    id: 'job-7',
    title: 'Senior Java Backend Engineer (Core Banking Ledger)',
    slug: 'senior-java-backend-moniepoint',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 22000000,
    salaryMax: 30000000,
    salaryCurrency: 'NGN',
    description: 'Join the engineering team that powers double-entry accounting and ledger infrastructure for 1.3M+ merchants across Nigeria.',
    responsibilities: [
      'Architect robust double-entry core banking ledger microservices',
      'Ensure strict ACID compliance and zero transaction discrepancy',
      'Scale banking transactions during peak festive trading seasons'
    ],
    requirements: [
      '5+ years hands-on experience with Java 17+, Spring Boot, and Microservices',
      'Extensive experience with high-volume database partitioning and indexing',
      'Experience with Kafka event streaming and transaction outbox patterns'
    ],
    skills: ['Java', 'Spring Boot', 'Kafka', 'PostgreSQL', 'Microservices', 'Kubernetes'],
    benefits: ['Free catered lunch daily', 'Top-tier medical coverage', 'Performance bonus'],
    applicantsCount: 38,
    postedDate: '1 day ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-8',
    title: 'POS Firmware & Embedded Systems Engineer',
    slug: 'pos-firmware-engineer-moniepoint',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Hardware & IoT',
    salaryMin: 14000000,
    salaryMax: 20000000,
    salaryCurrency: 'NGN',
    description: 'Develop custom Android-based smart POS terminal operating applications and secure cryptographic EMV contact/contactless kernel integrations.',
    responsibilities: [
      'Maintain Android POS terminal apps with Bluetooth & NFC peripherals',
      'Implement EMV Level 2 kernel compliance testing',
      'Optimize battery consumption and offline queue synchronization'
    ],
    requirements: [
      '3+ years experience with Android NDK / C++ / Java embedded software',
      'Knowledge of EMV standards, ISO 8583 message protocols, and HSM security',
      'Strong debugging skills on low-spec hardware devices'
    ],
    skills: ['Android', 'C++', 'Java', 'EMV', 'ISO 8583', 'Cryptography'],
    benefits: ['Generous hardware testing lab', 'Relocation allowance', 'Health HMO'],
    applicantsCount: 12,
    postedDate: '6 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-9',
    title: 'Head of Growth Marketing (SME Acquisition)',
    slug: 'head-of-growth-marketing-moniepoint',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Growth & Marketing',
    salaryMin: 20000000,
    salaryMax: 28000000,
    salaryCurrency: 'NGN',
    description: 'Scale merchant acquisition from 1.3M to 5M retail businesses through hyper-local field marketing, digital campaigns, and community engagement.',
    responsibilities: [
      'Manage multi-million dollar performance marketing and offline activation budgets',
      'Lead a team of growth managers, content marketers, and field marketing liaisons',
      'Run rigorous cohort retention analysis to optimize payback periods'
    ],
    requirements: [
      '7+ years driving B2B growth marketing in fast-scaling tech companies',
      'Deep understanding of grassroots retail merchant demographics in Nigeria',
      'Fluency with analytics tools (Mixpanel, Google Analytics, Amplitude)'
    ],
    skills: ['Growth Marketing', 'B2B Acquisition', 'Data Analytics', 'Leadership'],
    benefits: ['Company car allowance', 'Annual bonus', 'Comprehensive HMO'],
    applicantsCount: 22,
    postedDate: '1 week ago',
    status: 'active',
    featured: false
  },

  // Piggyvest (comp-4)
  {
    id: 'job-10',
    title: 'Senior Mobile Engineer (React Native)',
    slug: 'senior-mobile-engineer-react-native-piggyvest',
    companyId: 'comp-4',
    companyName: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (Hybrid)',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 16000000,
    salaryMax: 24000000,
    salaryCurrency: 'NGN',
    description: 'Craft smooth, delightful consumer saving and investment features on the flagship Piggyvest mobile app for millions of iOS and Android users.',
    responsibilities: [
      'Architect smooth 60fps animations and micro-interactions in React Native',
      'Ensure high security standards for biometric authentication and financial data',
      'Optimize cold-start performance and offline cache resilience'
    ],
    requirements: [
      '4+ years production React Native development experience',
      'Deep knowledge of native bridge, TypeScript, and state management (Zustand/Redux)',
      'Experience releasing and maintaining apps on Google Play and Apple App Store'
    ],
    skills: ['React Native', 'TypeScript', 'iOS', 'Android', 'Mobile Security'],
    benefits: ['Annual learning bonus', 'Flexible hours', 'Savings match incentive'],
    applicantsCount: 52,
    postedDate: '3 days ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-11',
    title: 'Financial Risk & Investment Analyst',
    slug: 'financial-risk-analyst-piggyvest',
    companyId: 'comp-4',
    companyName: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Finance & Risk',
    salaryMin: 10000000,
    salaryMax: 15000000,
    salaryCurrency: 'NGN',
    description: 'Assess fixed income, treasury bill yields, and commercial paper instruments to ensure optimal returns with zero capital loss for user savings.',
    responsibilities: [
      'Perform financial due diligence on commercial paper issuers and corporate bonds',
      'Monitor liquidity ratios and asset-liability duration matching',
      'Prepare weekly risk exposure reports for the executive investment committee'
    ],
    requirements: [
      'BSc in Finance, Economics, or Accounting; CFA candidate preferred',
      '3+ years experience in treasury management, commercial banking, or asset management',
      'Advanced financial modeling skills in Excel'
    ],
    skills: ['Financial Modeling', 'Risk Management', 'Fixed Income', 'Excel', 'Valuation'],
    benefits: ['HMO with family cover', 'Lunch stipend', 'Professional exam support'],
    applicantsCount: 27,
    postedDate: '4 days ago',
    status: 'active',
    featured: false
  },

  // Andela (comp-5)
  {
    id: 'job-12',
    title: 'Senior Frontend Engineer (Design Systems & Web3)',
    slug: 'senior-frontend-engineer-andela',
    companyId: 'comp-5',
    companyName: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    location: 'Remote (Worldwide)',
    workplaceType: 'remote',
    jobType: 'contract',
    experienceLevel: 'senior',
    department: 'Talent Network',
    salaryMin: 65000,
    salaryMax: 90000,
    salaryCurrency: 'USD',
    description: 'Work with top Silicon Valley client teams via the Andela network building Next.js 14 applications, complex dashboards, and state-of-the-art interactive web platforms.',
    responsibilities: [
      'Implement responsive, accessible UI modules using Next.js, Tailwind, and TypeScript',
      'Write comprehensive unit and integration tests using Vitest and Playwright',
      'Participate in daily agile standups with US-based product managers'
    ],
    requirements: [
      '5+ years professional frontend engineering experience',
      'Mastery of modern React paradigms (Server Components, hooks, custom state)',
      'Exceptional written and verbal English communication skills'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Testing'],
    benefits: ['Paid in USD directly', 'Remote equipment stipend', 'Global talent community'],
    applicantsCount: 68,
    postedDate: '1 day ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-13',
    title: 'Senior Cloud DevOps Engineer (AWS & Terraform)',
    slug: 'senior-cloud-devops-andela',
    companyId: 'comp-5',
    companyName: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    location: 'Remote',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Infrastructure',
    salaryMin: 70000,
    salaryMax: 95000,
    salaryCurrency: 'USD',
    description: 'Help global enterprise clients modernize their infrastructure, optimize cloud expenditure, and implement continuous delivery pipelines.',
    responsibilities: [
      'Build reusable infrastructure-as-code templates using Terraform and Helm',
      'Design secure CI/CD pipelines with GitHub Actions and GitLab CI',
      'Establish automated security scanning (SAST/DAST) in deployment pipelines'
    ],
    requirements: [
      'AWS Certified Solutions Architect or DevOps Engineer professional',
      '5+ years managing Kubernetes clusters and cloud networking at scale',
      'Strong scripting skills in Python or Bash'
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'Python'],
    benefits: ['100% remote flexibility', 'USD salary', 'Wellness budget'],
    applicantsCount: 31,
    postedDate: '3 days ago',
    status: 'active',
    featured: false
  },

  // Kuda Bank (comp-6)
  {
    id: 'job-14',
    title: 'Backend Software Engineer (.NET 8 & Microservices)',
    slug: 'backend-software-engineer-kuda',
    companyId: 'comp-6',
    companyName: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Engineering',
    salaryMin: 12000000,
    salaryMax: 18000000,
    salaryCurrency: 'NGN',
    description: 'Work on Kuda high-performance banking API services handling instant peer-to-peer transfers, bill payments, and international cards.',
    responsibilities: [
      'Write clean, testable C# code following DDD and CQRS patterns',
      'Collaborate with QA and security teams to eliminate vulnerabilities',
      'Integrate with NIBSS, Interswitch, and Visa payment switches'
    ],
    requirements: [
      '3+ years commercial experience with .NET Core / .NET 8 and C#',
      'Solid experience with SQL Server, Redis, and event messaging (RabbitMQ/Kafka)',
      'Understanding of banking transaction isolation and reconciliation'
    ],
    skills: ['C#', '.NET Core', 'SQL Server', 'RabbitMQ', 'Docker', 'Azure'],
    benefits: ['Free banking perks', 'Medical insurance', 'Subsidized laptop purchase'],
    applicantsCount: 44,
    postedDate: '5 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-15',
    title: 'Customer Experience Lead (24/7 Support Operations)',
    slug: 'customer-experience-lead-kuda',
    companyId: 'comp-6',
    companyName: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Customer Experience',
    salaryMin: 9000000,
    salaryMax: 13000000,
    salaryCurrency: 'NGN',
    description: 'Lead a team of 40+ customer success champions resolving user disputes, failed transaction reversals, and app inquiries with empathy and rapid SLAs.',
    responsibilities: [
      'Monitor resolution SLAs across Zendesk, in-app chat, and social channels',
      'Analyze root causes of common customer complaints to feedback to engineering',
      'Train new support agents on banking regulatory compliance and etiquette'
    ],
    requirements: [
      '5+ years leading customer support teams in fintech or digital banking',
      'Expertise in CRM platforms (Zendesk, Freshdesk, Intercom)',
      'High emotional intelligence and crisis management skills'
    ],
    skills: ['Customer Support', 'Zendesk', 'Team Leadership', 'SLA Management'],
    benefits: ['Comprehensive HMO', 'Shift allowances', 'Free lunches'],
    applicantsCount: 39,
    postedDate: '1 week ago',
    status: 'active',
    featured: false
  },

  // Nomba (comp-7)
  {
    id: 'job-16',
    title: 'Senior Golang Backend Engineer (High Throughput)',
    slug: 'senior-golang-engineer-nomba',
    companyId: 'comp-7',
    companyName: 'Nomba',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria (Hybrid)',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 18000000,
    salaryMax: 25000000,
    salaryCurrency: 'NGN',
    description: 'Build lightning-fast transaction routing microservices in Go supporting hundreds of thousands of retail terminals across Nigeria.',
    responsibilities: [
      'Write ultra-efficient Go services capable of handling thousands of RPS',
      'Optimize Postgres connection pools and caching layers',
      'Implement real-time terminal telemetry monitoring and heartbeat checks'
    ],
    requirements: [
      '4+ years writing production Go (Golang) code in high-load scenarios',
      'Experience with gRPC, protocol buffers, and TCP sockets',
      'Strong grasp of Linux network internals and concurrency primitives'
    ],
    skills: ['Go', 'PostgreSQL', 'Docker', 'gRPC', 'Redis', 'Kafka'],
    benefits: ['Competitive salary', 'Stock options', 'Flexible work model'],
    applicantsCount: 23,
    postedDate: '2 days ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-17',
    title: 'Product Marketing Manager (Hardware & Software Bundles)',
    slug: 'product-marketing-manager-nomba',
    companyId: 'comp-7',
    companyName: 'Nomba',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Marketing',
    salaryMin: 11000000,
    salaryMax: 16000000,
    salaryCurrency: 'NGN',
    description: 'Define the positioning and go-to-market rollout for Nomba smart POS terminals, retail inventory software, and merchant loans.',
    responsibilities: [
      'Craft compelling value propositions and sales collateral for field agents',
      'Run merchant interviews to discover pain points and feature gaps',
      'Organize product launch events and merchant masterclasses'
    ],
    requirements: [
      '3+ years in product marketing for B2B or hardware/software solutions',
      'Proven experience driving product adoption among SMB audiences',
      'Strong storytelling and copywriting capabilities'
    ],
    skills: ['Product Marketing', 'Go-To-Market', 'Copywriting', 'Content Strategy'],
    benefits: ['Full HMO coverage', 'Phone allowance', 'Performance incentives'],
    applicantsCount: 18,
    postedDate: '4 days ago',
    status: 'active',
    featured: false
  },

  // Bamboo (comp-8)
  {
    id: 'job-18',
    title: 'Senior Python Engineer (Trading Systems & US Equities)',
    slug: 'senior-python-trading-bamboo',
    companyId: 'comp-8',
    companyName: 'Bamboo',
    companyLogo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=150&auto=format&fit=crop&q=80',
    location: 'Remote',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 22000000,
    salaryMax: 30000000,
    salaryCurrency: 'NGN',
    description: 'Integrate with US broker-dealers (DriveWealth, Apex) to execute equity orders, dividend distributions, and real-time market data streaming.',
    responsibilities: [
      'Maintain real-time market data feeds via WebSockets and FIX protocols',
      'Ensure sub-second order placement during US stock market trading hours',
      'Build tax reporting and 1042-S compliance pipelines for non-US investors'
    ],
    requirements: [
      '5+ years building backend systems using Python (FastAPI, asyncio, Celery)',
      'Familiarity with financial instruments (stocks, ETFs, fractional shares)',
      'Experience with PostgreSQL transactions and zero-loss financial ledgers'
    ],
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'WebSockets', 'AWS', 'Redis'],
    benefits: ['Option to earn in USD', 'Generous equity', 'Unlimited vacation'],
    applicantsCount: 29,
    postedDate: 'Just now',
    status: 'active',
    featured: true
  },
  {
    id: 'job-19',
    title: 'Compliance & Legal Counsel (Securities & Regulatory)',
    slug: 'compliance-legal-counsel-bamboo',
    companyId: 'comp-8',
    companyName: 'Bamboo',
    companyLogo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Legal & Compliance',
    salaryMin: 18000000,
    salaryMax: 25000000,
    salaryCurrency: 'NGN',
    description: 'Ensure compliance with Nigerian SEC, Central Bank, FINRA, and US SEC rules for cross-border securities brokerages.',
    responsibilities: [
      'Interface with regulatory bodies and capital market authorities',
      'Review partnership contracts with international clearing brokers',
      'Audit AML/CFT policies and oversee suspicious activity reports'
    ],
    requirements: [
      'LL.B / BL with 5+ years post-call experience in capital markets or corporate law',
      'Familiarity with SEC Nigeria digital sub-broker regulations',
      'Strong analytical mindset and negotiation experience'
    ],
    skills: ['Securities Law', 'Compliance', 'Regulatory Affairs', 'AML/CFT'],
    benefits: ['Health coverage', 'Professional development grant', 'Flexible work'],
    applicantsCount: 14,
    postedDate: '1 week ago',
    status: 'active',
    featured: false
  },

  // Interswitch (comp-9)
  {
    id: 'job-20',
    title: 'Lead Information Security & Penetration Tester',
    slug: 'lead-infosec-pentester-interswitch',
    companyId: 'comp-9',
    companyName: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Cybersecurity',
    salaryMin: 24000000,
    salaryMax: 32000000,
    salaryCurrency: 'NGN',
    description: 'Safeguard critical national payment rails by orchestrating red-teaming, adversary simulations, and API vulnerability assessments.',
    responsibilities: [
      'Conduct rigorous ethical hacking on web applications, APIs, and HSM hardware',
      'Lead incident response teams during zero-day disclosure events',
      'Audit PCI-DSS 4.0 and ISO 27001 implementation across all business lines'
    ],
    requirements: [
      'OSCP, CEH, or CISSP certification',
      '6+ years in ethical hacking, reverse engineering, and threat intelligence',
      'Deep understanding of banking cryptographic protocols (3DES, AES, RSA)'
    ],
    skills: ['Cybersecurity', 'Penetration Testing', 'PCI-DSS', 'Cryptography', 'SIEM'],
    benefits: ['Pension & gratuity', 'Car plan', 'Executive HMO scheme'],
    applicantsCount: 15,
    postedDate: '3 days ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-21',
    title: 'Enterprise Solutions Architect (Financial Switching)',
    slug: 'solutions-architect-interswitch',
    companyId: 'comp-9',
    companyName: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'lead',
    department: 'Architecture',
    salaryMin: 26000000,
    salaryMax: 35000000,
    salaryCurrency: 'NGN',
    description: 'Design enterprise integration architectures for tier-1 commercial banks, card issuers, and government payment gateways.',
    responsibilities: [
      'Define technical blueprints for core transaction switches and clearing engines',
      'Evaluate third-party vendor platforms and cloud migration roadmaps',
      'Chair the Architecture Review Committee for new payment ventures'
    ],
    requirements: [
      '8+ years in software architecture with proven background in banking switches',
      'Mastery of microservices, event-driven patterns, and multi-datacenter failover',
      'Exceptional executive presentation and communication skills'
    ],
    skills: ['Architecture', 'Java', 'Enterprise Integration', 'Kafka', 'Cloud'],
    benefits: ['Full benefits package', 'Annual bonus', 'Executive training abroad'],
    applicantsCount: 11,
    postedDate: '5 days ago',
    status: 'active',
    featured: false
  },

  // Reliance Health (comp-10)
  {
    id: 'job-22',
    title: 'Senior Full Stack Engineer (Telemedicine Platform)',
    slug: 'senior-full-stack-telemedicine-reliance',
    companyId: 'comp-10',
    companyName: 'Reliance Health',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    location: 'Remote / Lagos',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Engineering',
    salaryMin: 18000000,
    salaryMax: 25000000,
    salaryCurrency: 'NGN',
    description: 'Build real-time video consultation, electronic health records (EHR), and prescription management systems connecting patients with certified doctors.',
    responsibilities: [
      'Develop WebRTC video consultation rooms with low-bandwidth optimization',
      'Build secure, HIPAA-compliant patient record storage and digital prescription APIs',
      'Integrate with pharmacy delivery networks and medical diagnostic labs'
    ],
    requirements: [
      '4+ years building full-stack web applications with Python/Node and React',
      'Hands-on experience with WebRTC, WebSocket streaming, or real-time media',
      'Knowledge of health data privacy and encrypted storage practices'
    ],
    skills: ['React', 'Python', 'WebRTC', 'PostgreSQL', 'Docker', 'TypeScript'],
    benefits: ['Platinum health coverage for family', 'Gym membership', 'Remote stipend'],
    applicantsCount: 32,
    postedDate: '1 day ago',
    status: 'active',
    featured: true
  },
  {
    id: 'job-23',
    title: 'Medical Operations Lead (Telehealth Clinical Quality)',
    slug: 'medical-operations-lead-reliance',
    companyId: 'comp-10',
    companyName: 'Reliance Health',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Medical Affairs',
    salaryMin: 13000000,
    salaryMax: 19000000,
    salaryCurrency: 'NGN',
    description: 'Ensure clinical excellence, doctor shift scheduling, and standard medical diagnostic protocols across our nationwide telemedicine network.',
    responsibilities: [
      'Audit telemedicine consultation recordings and prescriptions for quality adherence',
      'Oversee credentialing and onboarding of general practitioners and specialists',
      'Collaborate with product teams to refine clinical intake questionnaires'
    ],
    requirements: [
      'MBBS / Medical Doctor degree with valid MDCN license',
      '3+ years clinical experience with interest in healthcare technology and ops',
      'Superior organizational and clinical governance leadership'
    ],
    skills: ['Clinical Governance', 'Telehealth', 'Healthcare Operations', 'Quality Assurance'],
    benefits: ['Free family medical plan', 'Continuing Medical Education (CME) budget'],
    applicantsCount: 16,
    postedDate: '4 days ago',
    status: 'active',
    featured: false
  },

  // Additional jobs to reach 30 rich offerings
  {
    id: 'job-24',
    title: 'Junior Frontend Developer (React & TypeScript)',
    slug: 'junior-frontend-developer-paystack',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'junior',
    department: 'Engineering',
    salaryMin: 7000000,
    salaryMax: 10000000,
    salaryCurrency: 'NGN',
    description: 'Kickstart your engineering career contributing to merchant dashboard widgets, documentation, and internal support tools under senior mentorship.',
    responsibilities: [
      'Build responsive UI components adhering to design system guidelines',
      'Write unit tests and participate in code reviews',
      'Help optimize web accessibility and documentation guides'
    ],
    requirements: [
      '1+ years building projects with React and TypeScript',
      'Solid understanding of HTML, CSS, JavaScript ES6+, and Git',
      'Strong curiosity and eagerness to learn payments domain'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Git', 'JavaScript'],
    benefits: ['Full health cover', 'Learning stipend', 'Laptop provided'],
    applicantsCount: 112,
    postedDate: '1 day ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-25',
    title: 'Software Engineering Intern (Summer 2026/2027)',
    slug: 'software-engineering-intern-flutterwave',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'internship',
    experienceLevel: 'junior',
    department: 'Engineering',
    salaryMin: 3500000,
    salaryMax: 5000000,
    salaryCurrency: 'NGN',
    description: 'A 6-month intensive internship working alongside world-class engineers on payment gateways, merchant checkout, and automated testing suites.',
    responsibilities: [
      'Complete a capstone engineering project with real-world business impact',
      'Pair program with senior engineers on bug fixes and feature enhancements',
      'Attend weekly technical workshops on distributed architecture'
    ],
    requirements: [
      'Undergraduate or recent graduate in Computer Science or self-taught developer',
      'Familiarity with either Python, JavaScript/TypeScript, or Java',
      'Strong problem-solving instincts and passion for fintech'
    ],
    skills: ['Python', 'JavaScript', 'SQL', 'Algorithms'],
    benefits: ['Monthly stipend', 'MacBook provided', 'Direct conversion to full-time opportunity'],
    applicantsCount: 185,
    postedDate: '2 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-26',
    title: 'Technical Technical Writer & Developer Advocate',
    slug: 'technical-writer-devrel-paystack',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Remote',
    workplaceType: 'remote',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Developer Relations',
    salaryMin: 11000000,
    salaryMax: 16000000,
    salaryCurrency: 'NGN',
    description: 'Empower tens of thousands of developers across Africa by producing world-class API documentation, sample code repositories, and video tutorials.',
    responsibilities: [
      'Write crystal-clear API guides, integration tutorials, and quickstart repos',
      'Host monthly developer office hours and workshops',
      'Collect feedback from software engineers integrating Paystack SDKs'
    ],
    requirements: [
      'Experience writing code (Node.js, PHP, Python, or Go)',
      'Proven portfolio of published technical articles or API documentation',
      'Passion for developer communities and education'
    ],
    skills: ['Technical Writing', 'Developer Relations', 'API Documentation', 'Node.js', 'Markdown'],
    benefits: ['Travel budget for tech conferences', 'Remote setup allowance', 'Unlimited leave'],
    applicantsCount: 42,
    postedDate: '3 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-27',
    title: 'Senior QA Automation Engineer (Playwright & Cypress)',
    slug: 'senior-qa-automation-moniepoint',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Quality Assurance',
    salaryMin: 15000000,
    salaryMax: 22000000,
    salaryCurrency: 'NGN',
    description: 'Build robust end-to-end automated testing pipelines verifying financial transaction integrity across web dashboards and mobile banking apps.',
    responsibilities: [
      'Architect automated test frameworks in TypeScript using Playwright and Appium',
      'Integrate automated regression test suites into GitLab CI pipelines',
      'Conduct load testing with k6 simulating thousands of concurrent checkout operations'
    ],
    requirements: [
      '4+ years in software quality assurance with heavy focus on automation',
      'Proficiency in TypeScript, Playwright, Cypress, or Selenium',
      'Experience with API testing using Postman or REST-assured'
    ],
    skills: ['Playwright', 'Cypress', 'TypeScript', 'k6', 'CI/CD', 'API Testing'],
    benefits: ['Top medical insurance', 'Catered food', 'Training allowance'],
    applicantsCount: 28,
    postedDate: '4 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-28',
    title: 'Corporate Treasury Operations Associate',
    slug: 'corporate-treasury-associate-kuda',
    companyId: 'comp-6',
    companyName: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'on-site',
    jobType: 'full-time',
    experienceLevel: 'mid',
    department: 'Treasury & Finance',
    salaryMin: 8000000,
    salaryMax: 12000000,
    salaryCurrency: 'NGN',
    description: 'Manage daily bank settlement positions with Central Bank of Nigeria, interbank clearing houses, and international card networks.',
    responsibilities: [
      'Reconcile daily float and liquidity across clearing counterparties',
      'Execute treasury fund transfers and short-term placement operations',
      'Prepare mandatory daily regulatory filings for CBN supervision'
    ],
    requirements: [
      '2-4 years experience in treasury operations or settlement at a licensed financial institution',
      'Strong understanding of RTGS, NIP, and card clearing cycles',
      'High attention to detail and zero-error tolerance'
    ],
    skills: ['Treasury Operations', 'Reconciliation', 'Banking Regulations', 'Excel'],
    benefits: ['Health coverage', 'Pension match', 'Annual bonuses'],
    applicantsCount: 35,
    postedDate: '5 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-29',
    title: 'Brand & Communications Lead',
    slug: 'brand-communications-lead-piggyvest',
    companyId: 'comp-4',
    companyName: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    experienceLevel: 'senior',
    department: 'Brand Marketing',
    salaryMin: 14000000,
    salaryMax: 20000000,
    salaryCurrency: 'NGN',
    description: 'Lead the beloved cultural voice of Piggyvest across social channels, national PR campaigns, brand partnerships, and annual savings festivals.',
    responsibilities: [
      'Direct viral social media campaigns that educate and engage Nigerian youths',
      'Manage corporate PR with Bloomberg, TechCrunch, and local media outlets',
      'Produce the annual Piggyvest Savings Report with key macro consumer insights'
    ],
    requirements: [
      '5+ years leading brand communications or public relations in tech',
      'Proven record of high-engagement viral cultural storytelling',
      'Deep media relationships across African business journalism'
    ],
    skills: ['Brand Strategy', 'Public Relations', 'Social Media', 'Crisis Comms', 'Storytelling'],
    benefits: ['Savings matching', 'Health insurance', 'Flexible work schedule'],
    applicantsCount: 47,
    postedDate: '6 days ago',
    status: 'active',
    featured: false
  },
  {
    id: 'job-30',
    title: 'Staff Machine Learning Engineer (Conversational AI)',
    slug: 'staff-ml-engineer-andela',
    companyId: 'comp-5',
    companyName: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    location: 'Remote',
    workplaceType: 'remote',
    jobType: 'contract',
    experienceLevel: 'lead',
    department: 'AI & Data Science',
    salaryMin: 85000,
    salaryMax: 120000,
    salaryCurrency: 'USD',
    description: 'Build enterprise-grade AI agent workflows, retrieval-augmented generation (RAG) systems, and specialized LLM fine-tuning pipelines for global tech partners.',
    responsibilities: [
      'Architect scalable agentic AI workflows and LLM evaluation benchmarks',
      'Deploy vector databases (Pinecone, Qdrant) with hybrid search pipelines',
      'Optimize latency and cost of multi-model inference pipelines'
    ],
    requirements: [
      '6+ years in machine learning with 2+ years working with modern LLM architectures',
      'Deep expertise in Python, PyTorch, LangChain/LlamaIndex, and Hugging Face',
      'Proven experience deploying production AI systems serving high concurrency'
    ],
    skills: ['Python', 'LLMs', 'Vector Databases', 'PyTorch', 'RAG', 'Docker'],
    benefits: ['Top-tier USD compensation', '100% remote', 'Stipends for hardware & conferences'],
    applicantsCount: 38,
    postedDate: 'Just now',
    status: 'active',
    featured: true
  }
];

export const INITIAL_USER_APPLICANT: UserProfile = {
  id: 'user-applicant-1',
  name: 'Joshua Daniel',
  email: 'joshua.daniel@skillbridge.ng',
  role: 'applicant',
  avatar: APPLICANT_AVATAR,
  headline: 'Senior Full Stack Engineer · React, TypeScript & Node.js · Building High-Scale FinTech Systems',
  bio: 'Passionate software engineer with 5+ years building scalable distributed web applications and fintech products across West Africa. Open to high-impact Senior Full Stack or Backend roles.',
  location: 'Lagos, Nigeria',
  phone: '+234 812 345 6789',
  skills: [
    { id: 'sk-1', name: 'TypeScript', endorsements: 24 },
    { id: 'sk-2', name: 'React', endorsements: 31 },
    { id: 'sk-3', name: 'Node.js', endorsements: 19 },
    { id: 'sk-4', name: 'PostgreSQL', endorsements: 15 },
    { id: 'sk-5', name: 'Docker', endorsements: 12 },
    { id: 'sk-6', name: 'GraphQL', endorsements: 9 },
    { id: 'sk-7', name: 'System Design', endorsements: 17 }
  ],
  experiences: [
    {
      id: 'exp-1',
      role: 'Full Stack Software Engineer',
      company: 'Kora Payments',
      location: 'Lagos, Nigeria',
      startDate: 'Jan 2023',
      endDate: 'Present',
      current: true,
      description: 'Architected merchant dashboard and instant payout rails handling over 150k monthly transactions with 99.98% uptime. Cut API response latency by 35%.'
    },
    {
      id: 'exp-2',
      role: 'Frontend Developer',
      company: 'Wallets Africa',
      location: 'Lagos, Nigeria',
      startDate: 'Aug 2021',
      endDate: 'Dec 2022',
      current: false,
      description: 'Built customer onboarding and card issuing interfaces using React and Redux Toolkit. Increased user conversion rate by 18%.'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'B.Sc. Computer Science',
      field: 'Software Engineering & Networks',
      institution: 'University of Lagos (UNILAG)',
      graduationYear: '2021'
    }
  ],
  portfolioLinks: {
    github: 'https://github.com/joshuadaniel-dev',
    linkedin: 'https://linkedin.com/in/joshuadaniel-eng',
    portfolio: 'https://joshuadaniel.dev'
  },
  videoIntroUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-working-on-his-laptop-in-an-office-42795-large.mp4',
  hasVideoIntro: true,
  cvFileName: 'Joshua_Daniel_Senior_FullStack_Resume.pdf',
  cvParsedAt: '2026-10-01',
  preferences: {
    openToWork: true,
    preferredRole: 'Senior Full Stack Engineer',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    preferredLocation: 'Lagos or Remote',
    minSalaryExpectation: 18000000,
    currency: 'NGN'
  },
  profileCompletionScore: 92
};

export const INITIAL_USER_EMPLOYER: UserProfile = {
  id: 'user-recruiter-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@paystack.com',
  role: 'employer',
  avatar: RECRUITER_AVATAR,
  headline: 'Lead Talent Acquisition Partner @ Paystack',
  bio: 'Helping ambitious engineers, product leaders, and designers find their dream roles at Paystack. Reach out for engineering roles!',
  location: 'Lagos, Nigeria',
  companyId: 'comp-1',
  companyName: 'Paystack',
  skills: [
    { id: 'sk-r1', name: 'Technical Recruiting', endorsements: 45 },
    { id: 'sk-r2', name: 'Talent Sourcing', endorsements: 38 },
    { id: 'sk-r3', name: 'HR Strategy', endorsements: 29 }
  ],
  experiences: [
    {
      id: 'exp-r1',
      role: 'Lead Talent Acquisition Partner',
      company: 'Paystack',
      location: 'Lagos',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      description: 'Scaling engineering and product teams across West and East Africa.'
    }
  ],
  educations: [],
  portfolioLinks: {},
  preferences: {
    openToWork: false,
    preferredRole: 'Recruiter',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    preferredLocation: 'Lagos',
    minSalaryExpectation: 0,
    currency: 'NGN'
  },
  profileCompletionScore: 100
};

export const INITIAL_USER_INSIDER: UserProfile = {
  id: 'user-insider-1',
  name: 'Tunde Adebayo',
  email: 'tunde.adebayo@flutterwave.com',
  role: 'insider',
  avatar: INSIDER_AVATAR,
  headline: 'Staff Backend Engineer @ Flutterwave · Tech Mentor & Referral Insider',
  bio: 'Staff Engineer leading payment clearing at Flutterwave. Happy to do 15-minute coffee chats to share what interview loops look like and refer rockstar engineers!',
  location: 'Lagos, Nigeria',
  companyId: 'comp-2',
  companyName: 'Flutterwave',
  reputationPoints: 480,
  skills: [
    { id: 'sk-i1', name: 'Distributed Systems', endorsements: 62 },
    { id: 'sk-i2', name: 'Python', endorsements: 54 },
    { id: 'sk-i3', name: 'System Design', endorsements: 49 },
    { id: 'sk-i4', name: 'Kafka', endorsements: 37 }
  ],
  experiences: [
    {
      id: 'exp-i1',
      role: 'Staff Backend Engineer',
      company: 'Flutterwave',
      location: 'Lagos, Nigeria',
      startDate: '2021',
      endDate: 'Present',
      current: true,
      description: 'Building multi-currency settlement clearing infrastructure.'
    }
  ],
  educations: [],
  portfolioLinks: { github: 'https://github.com/tundea', linkedin: 'https://linkedin.com/in/tundea' },
  preferences: {
    openToWork: false,
    preferredRole: 'Staff Engineer',
    workplaceType: 'hybrid',
    jobType: 'full-time',
    preferredLocation: 'Lagos',
    minSalaryExpectation: 0,
    currency: 'NGN'
  },
  profileCompletionScore: 95
};

export const INITIAL_USER_ADMIN: UserProfile = {
  id: 'user-admin-1',
  name: 'Platform Administrator',
  email: 'admin@skillbridge.ng',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  headline: 'Platform Owner & Super Admin @ SkillBridge NG',
  bio: 'Overseeing company verifications, trust & safety, community standards, and hiring analytics.',
  location: 'Lagos, Nigeria',
  skills: [],
  experiences: [],
  educations: [],
  portfolioLinks: {},
  preferences: {
    openToWork: false,
    preferredRole: 'Admin',
    workplaceType: 'remote',
    jobType: 'full-time',
    preferredLocation: 'Lagos',
    minSalaryExpectation: 0,
    currency: 'NGN'
  },
  profileCompletionScore: 100
};

export const INITIAL_EMPLOYEE_CONNECTORS: EmployeeConnector[] = [
  {
    id: 'conn-1',
    userId: 'user-insider-1',
    name: 'Tunde Adebayo',
    avatar: INSIDER_AVATAR,
    role: 'Staff Backend Engineer',
    department: 'Core Infrastructure',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    yearsAtCompany: 3.5,
    bio: 'Happy to give realistic insights into our engineering interview bar, work-life reality, and submit official referrals for qualified applicants.',
    topics: ['System Design Interview Prep', 'Day-in-the-Life at Flutterwave', 'Engineering Culture & Tech Stack', 'Referrals for Senior Roles'],
    coffeeChatAvailable: true,
    totalChatsConducted: 42,
    reputationPoints: 480,
    rating: 4.9,
    availableDays: ['Tuesdays 4pm-6pm', 'Thursdays 3pm-5pm']
  },
  {
    id: 'conn-2',
    userId: 'user-insider-2',
    name: 'Chidinma Okafor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Product Manager',
    department: 'Checkout Experience',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    yearsAtCompany: 2.8,
    bio: 'Product leader passionate about design systems, merchant ergonomics, and career coaching for aspiring PMs.',
    topics: ['Product Management Case Studies', 'Paystack Culture & Autonomy', 'Portfolio Reviews', 'Resume Advice'],
    coffeeChatAvailable: true,
    totalChatsConducted: 31,
    reputationPoints: 390,
    rating: 5.0,
    availableDays: ['Wednesdays 5pm-7pm', 'Fridays 4pm-6pm']
  },
  {
    id: 'conn-3',
    userId: 'user-insider-3',
    name: 'Femi Alabi',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Database Architect',
    department: 'Banking Core',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    yearsAtCompany: 4.2,
    bio: 'Solving scale challenges for millions of daily financial transactions. Love talking high-volume Postgres, Kafka streaming, and hardware.',
    topics: ['Large-Scale PostgreSQL Tuning', 'Moniepoint Engineering Growth', 'Interviewing for Backend Roles'],
    coffeeChatAvailable: true,
    totalChatsConducted: 26,
    reputationPoints: 310,
    rating: 4.8,
    availableDays: ['Mondays 5pm-6pm', 'Fridays 2pm-4pm']
  },
  {
    id: 'conn-4',
    userId: 'user-insider-4',
    name: 'Ngozi Eze',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Mobile Engineer',
    department: 'Consumer Apps',
    companyId: 'comp-4',
    companyName: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    yearsAtCompany: 2.0,
    bio: 'Mobile dev enthusiast. Built interactive savings journeys on Piggyvest. Ask me about React Native performance, testing, and team vibes!',
    topics: ['React Native Mobile Best Practices', 'Work-Life Balance at Piggyvest', 'Referral Submissions'],
    coffeeChatAvailable: true,
    totalChatsConducted: 19,
    reputationPoints: 240,
    rating: 4.9,
    availableDays: ['Thursdays 6pm-7pm']
  },
  {
    id: 'conn-5',
    userId: 'user-insider-5',
    name: 'David Adeleke',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Senior DevOps / SRE',
    department: 'Cloud Platform',
    companyId: 'comp-5',
    companyName: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    yearsAtCompany: 3.0,
    bio: 'Helping engineers navigate international remote contracting, US client expectations, and landing USD-paying roles.',
    topics: ['Global Remote Work Dynamics', 'AWS & Terraform Interview Tips', 'Negotiating International Rates'],
    coffeeChatAvailable: true,
    totalChatsConducted: 55,
    reputationPoints: 610,
    rating: 5.0,
    availableDays: ['Saturdays 11am-1pm']
  }
];

export const INITIAL_REVIEWS: CompanyReview[] = [
  {
    id: 'rev-1',
    companyId: 'comp-1',
    companyName: 'Paystack',
    authorRole: 'Senior Software Engineer',
    authorLocation: 'Lagos',
    isCurrentEmployee: true,
    employmentDuration: '2+ years',
    rating: 5,
    workLifeRating: 5,
    cultureRating: 5,
    compensationRating: 5,
    reviewTitle: 'Exceptional engineering culture with immense trust and respect',
    pros: 'Deeply thoughtful management, world-class tools, $3,000 learning budget that is actually encouraged to spend, high compensation, and offsites in wonderful African cities.',
    cons: 'High expectations for ownership and written documentation; not for people who prefer micro-management.',
    adviceToManagement: 'Keep maintaining the tight bar for hiring even as the headcount grows.',
    interviewDifficulty: 'Medium',
    helpfulVotes: 34,
    createdAt: '2 weeks ago'
  },
  {
    id: 'rev-2',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    authorRole: 'Product Manager',
    authorLocation: 'Lagos',
    isCurrentEmployee: true,
    employmentDuration: '1 year',
    rating: 4,
    workLifeRating: 4,
    cultureRating: 5,
    compensationRating: 5,
    reviewTitle: 'Fast-paced, bold global vision, massive opportunity to learn',
    pros: 'You work on products that literally move money across 30+ countries. The scale is real. Great compensation and generous equity incentives.',
    cons: 'Fast sprint cadences mean priorities can pivot quickly.',
    adviceToManagement: 'Streamline cross-departmental documentation handoffs.',
    interviewDifficulty: 'Hard',
    helpfulVotes: 21,
    createdAt: '1 month ago'
  },
  {
    id: 'rev-3',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    authorRole: 'Java Backend Developer',
    authorLocation: 'Lagos',
    isCurrentEmployee: true,
    employmentDuration: '3 years',
    rating: 5,
    workLifeRating: 4,
    cultureRating: 5,
    compensationRating: 5,
    reviewTitle: 'Market leader in offline retail banking with unmatched transaction volume',
    pros: 'If you want to understand how distributed ledgers handle real millions of retail transactions every hour, this is the best school in Africa. Pay is top-tier in Naira.',
    cons: 'On-site presence is valued heavily for hardware terminal teams.',
    adviceToManagement: 'Offer more flexible hybrid options for platform teams.',
    interviewDifficulty: 'Hard',
    helpfulVotes: 18,
    createdAt: '3 weeks ago'
  }
];

export const INITIAL_COMPANY_QAS: CompanyQA[] = [
  {
    id: 'qa-1',
    companyId: 'comp-1',
    question: 'What does the technical interview loop at Paystack look like for Senior Full Stack roles?',
    askedBy: 'Prospective Applicant',
    askedByRole: 'Full Stack Engineer',
    isAnonymous: false,
    createdAt: '3 days ago',
    upvotes: 14,
    answers: [
      {
        id: 'ans-1',
        authorName: 'Sarah Chen',
        authorRole: 'Recruiter @ Paystack',
        isVerifiedEmployee: true,
        isAnonymous: false,
        text: 'Hi there! The loop has 4 steps: 1) 30-min recruiter chat on values and experience, 2) 90-min practical live coding session on realistic payment domain tasks (no leetcode tricks), 3) System Architecture & Design discussion with a Staff Engineer, and 4) Culture & Leadership conversation. We share preparation materials beforehand!',
        createdAt: '2 days ago',
        upvotes: 22
      }
    ]
  },
  {
    id: 'qa-2',
    companyId: 'comp-2',
    question: 'Does Flutterwave support remote work from outside Lagos or other African countries?',
    askedBy: 'Anonymous Applicant',
    isAnonymous: true,
    createdAt: '1 week ago',
    upvotes: 9,
    answers: [
      {
        id: 'ans-2',
        authorName: 'Tunde Adebayo',
        authorRole: 'Staff Engineer @ Flutterwave',
        isVerifiedEmployee: true,
        isAnonymous: false,
        text: 'Yes! We have colleagues across Kenya, Ghana, the UK, and several Nigerian states (Abuja, Ibadan, Port Harcourt). Many engineering roles are fully hybrid or remote-eligible.',
        createdAt: '5 days ago',
        upvotes: 11
      }
    ]
  }
];

export const INITIAL_NETWORKING_EVENTS: NetworkingEvent[] = [
  {
    id: 'ev-1',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    title: 'Demystifying Payment Gateways: Engineering Scalable APIs',
    description: 'Join our principal engineers for a deep technical walkthrough on building idempotent payment APIs, handling bank webhook dropouts, and zero-downtime database migrations.',
    eventType: 'tech_talk',
    date: 'Oct 15, 2026',
    time: '5:00 PM WAT',
    speakerName: 'Ezra Olubi',
    speakerRole: 'Co-founder & CTO',
    speakerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rsvpsCount: 312,
    rsvpUserIds: ['user-applicant-1'],
    isLive: false,
    meetLink: 'https://meet.google.com/pys-tech-2026'
  },
  {
    id: 'ev-2',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    title: 'Virtual Career Fair & Live AMA with Engineering Hiring Managers',
    description: 'Meet 6 engineering leads hiring across Core Payments, Send Remittance, Cloud SRE, and Mobile. Live Q&A and fast-track resume reviews.',
    eventType: 'career_fair',
    date: 'Oct 20, 2026',
    time: '4:00 PM WAT',
    speakerName: 'Tunde Adebayo & Panel',
    speakerRole: 'Engineering Leadership Panel',
    speakerAvatar: INSIDER_AVATAR,
    rsvpsCount: 489,
    rsvpUserIds: [],
    isLive: false,
    meetLink: 'https://meet.google.com/flw-fair-2026'
  },
  {
    id: 'ev-3',
    companyId: 'comp-4',
    companyName: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=150&auto=format&fit=crop&q=80',
    title: 'Building Frictionless Consumer Mobile Apps at Scale',
    description: 'An interactive product & engineering session exploring how Piggyvest gamified financial savings for over 4 million Nigerians.',
    eventType: 'webinar',
    date: 'Oct 22, 2026',
    time: '6:00 PM WAT',
    speakerName: 'Odunayo Eweniyi',
    speakerRole: 'Co-founder & COO',
    speakerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    rsvpsCount: 220,
    rsvpUserIds: [],
    isLive: false,
    meetLink: 'https://meet.google.com/pgv-ama-2026'
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (Core Payments)',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    applicantHeadline: 'Senior Full Stack Engineer · React, TypeScript & Node.js',
    applicantSkills: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Docker'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Oct 01, 2026',
    updatedDate: 'Oct 04, 2026',
    stage: 'offer',
    rating: 5,
    assignedRecruiter: 'Sarah Chen',
    coverNote: 'I have spent 5 years scaling high-throughput transaction APIs and have long admired Paystack meticulous engineering craftsmanship.',
    cvFileName: 'Joshua_Daniel_Senior_FullStack_Resume.pdf',
    assessmentScore: 94,
    assessmentPassed: true,
    notes: [
      {
        id: 'n-1',
        authorName: 'Sarah Chen',
        authorRole: 'Lead Recruiter',
        text: 'Joshua showed exceptional domain mastery during the technical interview. Strong candidate for Core Payments team.',
        createdAt: 'Oct 02, 2026'
      },
      {
        id: 'n-2',
        authorName: 'Engineering Director',
        authorRole: 'Hiring Manager',
        text: 'System design on distributed idempotency was one of the cleanest we have seen this quarter. Extended offer letter.',
        createdAt: 'Oct 03, 2026'
      }
    ]
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    jobTitle: 'Senior Backend Engineer (Send Global Remittance)',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    applicantHeadline: 'Senior Full Stack Engineer · React, TypeScript & Node.js',
    applicantSkills: ['Python', 'PostgreSQL', 'Kafka', 'System Design'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Sep 28, 2026',
    updatedDate: 'Oct 02, 2026',
    stage: 'interview',
    rating: 4,
    assignedRecruiter: 'Chima Obi',
    coverNote: 'Excited by the Send by Flutterwave global remittance expansion. My experience with ledger consistency fits well.',
    cvFileName: 'Joshua_Daniel_Senior_FullStack_Resume.pdf',
    notes: [
      {
        id: 'n-3',
        authorName: 'Tunde Adebayo',
        authorRole: 'Insider Referrer',
        text: 'Joshua connected with me on coffee chat. Impressed by his questions on Kafka stream reconciliation. Endorsed for technical loop.',
        createdAt: 'Sep 29, 2026'
      }
    ]
  },
  {
    id: 'app-3',
    jobId: 'job-7',
    jobTitle: 'Senior Java Backend Engineer (Core Banking Ledger)',
    companyId: 'comp-3',
    companyName: 'Moniepoint',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    applicantHeadline: 'Senior Full Stack Engineer · React, TypeScript & Node.js',
    applicantSkills: ['Java', 'PostgreSQL', 'Microservices'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Sep 25, 2026',
    updatedDate: 'Sep 30, 2026',
    stage: 'shortlisted',
    rating: 4,
    coverNote: 'Deep appreciation for Moniepoint high-concurrency offline merchant operations.',
    cvFileName: 'Joshua_Daniel_Senior_FullStack_Resume.pdf',
    notes: []
  },
  {
    id: 'app-4',
    jobId: 'job-12',
    jobTitle: 'Senior Frontend Engineer (Design Systems & Web3)',
    companyId: 'comp-5',
    companyName: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    applicantHeadline: 'Senior Full Stack Engineer · React, TypeScript & Node.js',
    applicantSkills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Oct 03, 2026',
    updatedDate: 'Oct 04, 2026',
    stage: 'viewed',
    notes: []
  },
  {
    id: 'app-5',
    jobId: 'job-22',
    jobTitle: 'Senior Full Stack Engineer (Telemedicine Platform)',
    companyId: 'comp-10',
    companyName: 'Reliance Health',
    companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    applicantHeadline: 'Senior Full Stack Engineer · React, TypeScript & Node.js',
    applicantSkills: ['React', 'Python', 'WebRTC'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Oct 04, 2026',
    updatedDate: 'Oct 04, 2026',
    stage: 'applied',
    notes: []
  },
  // Candidates for Employer ATS view
  {
    id: 'app-cand-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (Core Payments)',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-2',
    applicantName: 'Amina Bello',
    applicantEmail: 'amina.bello@example.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    applicantHeadline: 'Lead Software Architect · Ex-Interswitch · Distributed Go & Kubernetes',
    applicantSkills: ['Go', 'Kubernetes', 'PostgreSQL', 'Docker'],
    applicantLocation: 'Abuja, Nigeria',
    appliedDate: 'Oct 02, 2026',
    updatedDate: 'Oct 04, 2026',
    stage: 'interview',
    rating: 5,
    assignedRecruiter: 'Sarah Chen',
    coverNote: 'Extensive background designing high-throughput payment switches in Nigeria.',
    notes: [
      {
        id: 'n-cand-1',
        authorName: 'Sarah Chen',
        authorRole: 'Lead Recruiter',
        text: 'Superb architecture round. Proceeding to final culture match.',
        createdAt: 'Oct 03, 2026'
      }
    ]
  },
  {
    id: 'app-cand-2',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (Core Payments)',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-3',
    applicantName: 'Emeka Nwosu',
    applicantEmail: 'emeka.nwosu@example.com',
    applicantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    applicantHeadline: 'Senior Full Stack Engineer · Node.js & React Native',
    applicantSkills: ['Node.js', 'React', 'MongoDB'],
    applicantLocation: 'Lagos, Nigeria',
    appliedDate: 'Sep 29, 2026',
    updatedDate: 'Oct 01, 2026',
    stage: 'shortlisted',
    rating: 4,
    assignedRecruiter: 'Sarah Chen',
    notes: []
  }
];

export const INITIAL_INTERVIEWS: InterviewSchedule[] = [
  {
    id: 'int-1',
    applicationId: 'app-2',
    jobId: 'job-4',
    jobTitle: 'Senior Backend Engineer (Send Global Remittance)',
    companyId: 'comp-2',
    companyName: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    date: 'Oct 06, 2026',
    time: '02:00 PM',
    durationMinutes: 45,
    roundType: 'System Architecture',
    interviewerName: 'Tunde Adebayo',
    interviewerRole: 'Staff Backend Engineer',
    meetLink: 'https://meet.skillbridge.ng/interview-room-flw-402',
    status: 'scheduled',
    notes: 'Please review distributed consensus, double-entry ledgers, and event streaming with Kafka.'
  },
  {
    id: 'int-2',
    applicationId: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior Full Stack Engineer (Core Payments)',
    companyId: 'comp-1',
    companyName: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    applicantId: 'user-applicant-1',
    applicantName: 'Joshua Daniel',
    applicantEmail: 'joshua.daniel@skillbridge.ng',
    applicantAvatar: APPLICANT_AVATAR,
    date: 'Oct 02, 2026',
    time: '11:00 AM',
    durationMinutes: 60,
    roundType: 'Technical Round',
    interviewerName: 'Sarah Chen & Tech Lead',
    interviewerRole: 'Core Payments Team',
    meetLink: 'https://meet.skillbridge.ng/interview-room-pys-101',
    status: 'completed',
    notes: 'Candidate aced the technical assessment with 94% score. Proceeded directly to offer.',
    scoreCard: {
      technical: 5,
      communication: 5,
      cultural: 5,
      feedback: 'Top-tier problem solving, clear explanation of trade-offs in distributed transactions.'
    }
  }
];

export const INITIAL_OFFER: OfferLetter = {
  id: 'off-1',
  applicationId: 'app-1',
  jobId: 'job-1',
  jobTitle: 'Senior Full Stack Engineer (Core Payments)',
  companyId: 'comp-1',
  companyName: 'Paystack',
  companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
  applicantId: 'user-applicant-1',
  applicantName: 'Joshua Daniel',
  baseSalary: 24000000,
  currency: 'NGN',
  signingBonus: 2000000,
  stockOptions: '0.04% Equity Options (4-year vesting, 1-year cliff)',
  startDate: 'November 02, 2026',
  reportingManager: 'Head of Core Payments',
  location: 'Lagos, Nigeria (Flexible Hybrid)',
  benefitsSummary: [
    'Annual Gross Salary: ₦24,000,000 paid monthly',
    'Signing Bonus: ₦2,000,000 upon start date',
    'Stock Options: 0.04% equity pool allocation',
    'Full comprehensive medical, dental, and optical insurance for self & dependents',
    'Unlimited Paid Time Off (PTO) with a mandatory 20-day minimum',
    '$3,000 USD Annual Professional Development & Conference Stipend',
    'MacBook Pro 16" M3 Max + $1,500 Home Office Setup Budget'
  ],
  expiryDate: 'October 15, 2026',
  letterContent: `Dear Joshua Daniel,

On behalf of Paystack, we are thrilled to extend this formal offer of employment for the role of Senior Full Stack Engineer on our Core Payments team. 

During our interview rounds, our engineering leads were thoroughly impressed by your depth of systems engineering experience, your calm articulation of distributed transaction locks, and your dedication to high-availability payment rails in Africa.

This offer outlines your compensation, equity participation, and comprehensive benefits. Please review and execute your digital signature below to accept this invitation to build the financial rails of Africa with us.

Sincerely,
Sarah Chen & The Paystack People Team`,
  status: 'sent'
};

export const INITIAL_ONBOARDING_TASKS: OnboardingTask[] = [
  {
    id: 'onb-1',
    applicationId: 'app-1',
    title: 'Upload Government Issued Identification (NIN / International Passport)',
    category: 'documents',
    description: 'Required for background verification and regulatory payroll onboarding compliance.',
    dueDate: 'Oct 20, 2026',
    completed: true,
    requiredFile: true,
    uploadedFileName: 'Joshua_Daniel_National_ID.pdf'
  },
  {
    id: 'onb-2',
    applicationId: 'app-1',
    title: 'Provide Bank Account & Tax Identification Number (TIN)',
    category: 'documents',
    description: 'Ensure accurate monthly salary disbursements and statutory pension remittances.',
    dueDate: 'Oct 22, 2026',
    completed: true,
    requiredFile: false
  },
  {
    id: 'onb-3',
    applicationId: 'app-1',
    title: 'Review and Sign Employee Code of Conduct & IP Agreement',
    category: 'culture',
    description: 'Read the Paystack Culture Manual and confirm confidentiality & data protection.',
    dueDate: 'Oct 25, 2026',
    completed: false,
    requiredFile: true
  },
  {
    id: 'onb-4',
    applicationId: 'app-1',
    title: 'Select Home Office Ergonomic Equipment & Laptop Preferences',
    category: 'it_setup',
    description: 'Select your preferred MacBook keyboard layout, external 4K monitor, and desk chair.',
    dueDate: 'Oct 27, 2026',
    completed: false,
    requiredFile: false
  },
  {
    id: 'onb-5',
    applicationId: 'app-1',
    title: 'Schedule Day 1 Welcome & Team Introductions Coffee Chat',
    category: 'team_intro',
    description: 'Meet your engineering buddy and Core Payments teammates for a virtual orientation.',
    dueDate: 'Nov 02, 2026',
    completed: false,
    requiredFile: false
  }
];

export const INITIAL_ASSESSMENT: Assessment = {
  id: 'ass-1',
  jobId: 'job-1',
  jobTitle: 'Senior Full Stack Engineer (Core Payments)',
  companyName: 'Paystack',
  durationMinutes: 15,
  passingScore: 75,
  questions: [
    {
      id: 'q-1',
      prompt: 'In a high-throughput payment gateway, what is the primary purpose of an Idempotency Key header in API requests?',
      options: [
        'To encrypt payload data in transit between client and server',
        'To guarantee that repeated identical API calls result in exactly one transaction execution and avoid duplicate charges',
        'To authenticate the merchant public key against the PCI-DSS vault',
        'To cache query responses on CDN edge nodes'
      ],
      correctIndex: 1
    },
    {
      id: 'q-2',
      prompt: 'When designing a double-entry financial ledger in PostgreSQL, how should account balances be reliably tracked to avoid race conditions under concurrent transactions?',
      options: [
        'Store a single balance float column and execute non-transactional UPDATE balance = balance + amount',
        'Compute balances dynamically from immutable credit/debit entries or use row-level locking (SELECT FOR UPDATE) on the ledger balance row',
        'Rely on local in-memory Redis variables without database persistence',
        'Run periodic cron jobs once per midnight without locking'
      ],
      correctIndex: 1
    },
    {
      id: 'q-3',
      prompt: 'Which HTTP status code is most appropriate when a payment webhook provider retries a delivery that the merchant server has already acknowledged?',
      options: [
        '404 Not Found',
        '200 OK or 204 No Content',
        '500 Internal Server Error',
        '301 Moved Permanently'
      ],
      correctIndex: 1
    },
    {
      id: 'q-4',
      prompt: 'What pattern is best suited for decoupling payment authorization from asynchronous background notification events (e.g., sending emails, updating CRM)?',
      options: [
        'Transactional Outbox Pattern with a message broker (e.g., Kafka / RabbitMQ)',
        'Synchronous cascading HTTP REST calls inside the user request cycle',
        'Blocking database sleep timers',
        'Client-side polling from mobile devices'
      ],
      correctIndex: 0
    }
  ]
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-applicant-1',
    title: 'Official Offer Letter Received!',
    description: 'Paystack has extended an offer for Senior Full Stack Engineer (Core Payments). Click to review & sign.',
    type: 'offer',
    read: false,
    linkTab: 'ats',
    createdAt: '1 hour ago'
  },
  {
    id: 'notif-2',
    userId: 'user-applicant-1',
    title: 'Upcoming System Architecture Interview',
    description: 'Your interview with Tunde Adebayo at Flutterwave is confirmed for Oct 06 at 02:00 PM.',
    type: 'interview',
    read: false,
    linkTab: 'interview',
    createdAt: '3 hours ago'
  },
  {
    id: 'notif-3',
    userId: 'user-applicant-1',
    title: 'Coffee Chat Accepted!',
    description: 'Tunde Adebayo accepted your 15-minute coffee chat request and scheduled Google Meet slot.',
    type: 'coffee_chat',
    read: true,
    linkTab: 'connect',
    createdAt: '1 day ago'
  },
  {
    id: 'notif-4',
    userId: 'user-applicant-1',
    title: 'Application Shortlisted',
    description: 'Moniepoint reviewed your profile for Senior Java Backend Engineer and moved you to Shortlisted.',
    type: 'application',
    read: true,
    linkTab: 'ats',
    createdAt: '2 days ago'
  }
];
