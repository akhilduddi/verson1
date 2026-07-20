import {
  Pill,
  Dna,
  HeartPulse,
  PawPrint,
  Sparkles,
  Apple,
  Building2,
  Briefcase,
  Newspaper,
  Database,
  Brain,
  BarChart3,
  FlaskConical,
  Microscope,
  Factory,
  TestTubes,
} from "lucide-react";

export const industries = [
  {
    slug: "pharma",
    name: "Pharma",
    icon: Pill,
    blurb: "Drug pipelines, approvals, and commercial intelligence.",
    description: "Navigate the complex pharmaceutical landscape with unified data on drug pipelines, clinical trial outcomes, and regulatory approvals. We empower strategy teams to monitor competitor progress and anticipate market shifts.",
    features: [
      "Pipeline asset tracking from discovery to approval",
      "Real-time patent expiration and generic competition alerts",
      "Commercial launch analytics and pricing strategies",
      "KOL mapping and physician network analysis"
    ]
  },
  {
    slug: "biopharma",
    name: "Bio-Pharma",
    icon: Dna,
    blurb: "Biologics, cell & gene therapy, and biosimilars.",
    description: "Accelerate development in biologics, monoclonal antibodies, and advanced therapies. Our platform tracks cutting-edge modalities and connects scientific literature with clinical and manufacturing milestones.",
    features: [
      "Specialized tracking for cell and gene therapies",
      "Biosimilar landscape and market penetration metrics",
      "Biomanufacturing facility intelligence",
      "Therapeutic area deep-dives (Oncology, Immunology, etc.)"
    ]
  },
  {
    slug: "medical-devices",
    name: "Medical Devices",
    icon: HeartPulse,
    blurb: "Class I–III device manufacturers and regulatory data.",
    description: "Comprehensive coverage of the medical technology ecosystem, tracking devices across all risk classes. Access centralized data on PMAs, 510(k) clearances, and post-market surveillance.",
    features: [
      "Global regulatory submission and clearance tracking",
      "Recall and adverse event monitoring (MAUDE, etc.)",
      "Device classification and predicate mapping",
      "Supply chain and component manufacturer visibility"
    ]
  },
  {
    slug: "veterinary",
    name: "Veterinary",
    icon: PawPrint,
    blurb: "Animal health pharmaceuticals and diagnostics.",
    description: "Dedicated intelligence for the animal health sector, capturing trends in companion animal therapeutics and livestock vaccines. Understand regulatory pathways unique to veterinary medicine.",
    features: [
      "Animal health product pipelines and approvals",
      "Zoonotic disease tracking and vaccine development",
      "Feed additive and nutritional health analytics",
      "Veterinary diagnostic market intelligence"
    ]
  },
  {
    slug: "cosmetics",
    name: "Cosmetics",
    icon: Sparkles,
    blurb: "Personal care, dermocosmetics, and ingredient intelligence.",
    description: "Stay ahead in the fast-paced personal care market with data on novel ingredients, dermocosmetic clinical trials, and shifting regulatory frameworks across global jurisdictions.",
    features: [
      "Ingredient safety profiles and regulatory limits",
      "Clinical efficacy trials for dermocosmetics",
      "Clean beauty and sustainability certifications",
      "Brand portfolio and market positioning analysis"
    ]
  },
  {
    slug: "food",
    name: "Food",
    icon: Apple,
    blurb: "Food safety, ingredients, and supply-chain visibility.",
    description: "Unify data across the food and beverage ecosystem. From novel food additives and alternative proteins to supply chain safety audits and regulatory compliance monitoring.",
    features: [
      "Food safety alerts and recall databases",
      "Alternative protein and food-tech innovation tracking",
      "Nutritional claim validation and guidelines",
      "Global supply chain and facility inspection intelligence"
    ]
  },
];

export const products = [
  {
    slug: "cgxp-directory",
    name: "cGxP.Directory",
    icon: Building2,
    blurb: "Life Sciences Company Intelligence Platform.",
    description: "The ultimate unified intelligence layer for the life sciences sector. Discover, track, and evaluate thousands of companies, from agile biotech startups to global pharma conglomerates, complete with real-time pipeline and regulatory histories.",
    features: [
      "48K+ comprehensive company profiles",
      "Real-time pipeline & asset mapping",
      "M&A, deals, and funding history",
      "Regulatory filings and compliance tracking",
      "Corporate hierarchy and ownership graph",
      "Developer API for enterprise integration"
    ],
    metrics: [
      { label: "Companies Tracked", value: "48K+" },
      { label: "Clinical Assets", value: "115K+" },
      { label: "Data Updates/Day", value: "5M+" }
    ]
  },
  {
    slug: "cgxp-jobs",
    name: "cGxP.jobs",
    icon: Briefcase,
    blurb: "Specialized jobs platform for life sciences professionals.",
    description: "A precision-matched career platform connecting elite scientific and engineering talent with top-tier GxP-regulated organizations. We map domain-specific skills to critical roles in R&D, clinical, and manufacturing.",
    features: [
      "Domain-specific life sciences roles",
      "Verified employer profiles and culture metrics",
      "Skill-based semantic candidate matching",
      "Real-time salary and compensation intelligence",
      "Career progression insights",
      "Seamless ATS integrations"
    ],
    metrics: [
      { label: "Active Roles", value: "12K+" },
      { label: "Verified Employers", value: "850+" },
      { label: "Talent Pool", value: "250K+" }
    ]
  },
  {
    slug: "cgxp-wire",
    name: "cGxP.wire",
    icon: Newspaper,
    blurb: "Industry news and market intelligence platform.",
    description: "Your daily feed of intelligence-first news, regulatory updates, and market signals. Our AI-driven platform curates, summarizes, and scores industry events to separate the signal from the noise.",
    features: [
      "AI-curated daily executive briefings",
      "Regulatory impact and risk scoring",
      "Custom watchlists and real-time alerts",
      "Theme and sentiment analysis across sources",
      "Full source provenance and citation tracking",
      "Enterprise Slack, Teams, and email digests"
    ],
    metrics: [
      { label: "Sources Monitored", value: "10K+" },
      { label: "Signals Processed", value: "2M+" },
      { label: "Daily Readers", value: "15K+" }
    ]
  },
];

export const services = [
  {
    slug: "data-engineering",
    name: "Data Engineering",
    icon: Database,
    blurb: "Pipelines, lakehouses, and validated data products.",
    description: "We architect and build GxP-compliant data foundations. Our engineering teams specialize in constructing scalable lakehouses, automated ELT pipelines, and real-time streaming architectures specifically designed for regulated life science environments.",
    features: [
      "Validated, high-throughput ELT pipelines",
      "Modern data lakehouse architecture (Databricks, Snowflake)",
      "Real-time streaming and event-driven architectures",
      "GxP-compliant infrastructure as code",
      "Master Data Management (MDM) implementation"
    ],
    benefits: [
      "Reduce data processing time by up to 80%",
      "Ensure 100% auditability and lineage tracking",
      "Lower total cost of ownership for data platforms"
    ]
  },
  {
    slug: "data-science",
    name: "Data Science",
    icon: Brain,
    blurb: "Models, forecasting, and AI-driven discovery.",
    description: "Unlock predictive capabilities and accelerate research with applied AI. We deploy custom machine learning models, natural language processing for scientific literature, and causal inference frameworks to drive actionable business outcomes.",
    features: [
      "Demand forecasting and supply chain optimization",
      "Scientific NLP and literature mining",
      "Generative AI workflows for regulatory drafting",
      "Causal inference and clinical trial simulation",
      "Computer vision for laboratory imaging"
    ],
    benefits: [
      "Accelerate literature review processes by 10x",
      "Improve forecast accuracy by 15-30%",
      "Automate repetitive regulatory compliance checks"
    ]
  },
  {
    slug: "data-analytics",
    name: "Data Analytics",
    icon: BarChart3,
    blurb: "Decision-grade dashboards and KPIs.",
    description: "Transform complex datasets into intuitive, decision-grade visual intelligence. We build custom BI solutions, executive dashboards, and embedded analytics platforms that empower stakeholders across your organization to self-serve insights.",
    features: [
      "Executive and operational KPI dashboards",
      "Self-service Business Intelligence (BI) frameworks",
      "Embedded analytics for commercial products",
      "Interactive data storytelling and visualization",
      "Automated regulatory compliance reporting"
    ],
    benefits: [
      "Eliminate manual reporting workflows entirely",
      "Democratize data access across non-technical teams",
      "Standardize metrics across global operations"
    ]
  },
];

export const dataSources = [
  {
    slug: "rd",
    name: "R&D",
    icon: FlaskConical,
    blurb: "Discovery research, IP, and scientific literature.",
    description: "Tap into the earliest stages of innovation. We aggregate and harmonize data from global patent registries, scientific literature, grant databases, and pre-clinical study results to map the frontier of scientific discovery.",
    features: [
      "Global patent and IP landscape mapping",
      "Academic publications and pre-print servers",
      "KOL (Key Opinion Leader) identification",
      "Public and private grant funding trackers"
    ]
  },
  {
    slug: "clinical-research",
    name: "Clinical Research",
    icon: TestTubes,
    blurb: "Trial registries, sites, sponsors, and outcomes.",
    description: "Comprehensive visibility into global clinical development. Our graph connects trial protocols, sponsor histories, site performance metrics, and clinical outcomes across multiple international registries.",
    features: [
      "Global clinical trial registries (ClinicalTrials.gov, EU CTR)",
      "Trial status, enrollment, and phase tracking",
      "Principal investigator and site performance histories",
      "Adverse event and safety profile monitoring"
    ]
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    icon: Factory,
    blurb: "Facilities, GMP audits, and supply chain.",
    description: "Understand the physical infrastructure of life sciences. We index manufacturing facilities, CMO/CDMO capabilities, regulatory inspection histories, and global supply chain dependencies.",
    features: [
      "Global manufacturing facility intelligence",
      "FDA 483s, warning letters, and GMP audit outcomes",
      "Contract manufacturing (CDMO) capabilities and capacities",
      "Active Pharmaceutical Ingredient (API) supply routes"
    ]
  },
  {
    slug: "laboratory",
    name: "Laboratory",
    icon: Microscope,
    blurb: "Analytical methods, QC, and lab informatics.",
    description: "Connect the bench to the boardroom. We integrate specialized data from laboratory information management systems (LIMS), quality control assays, and analytical testing methods.",
    features: [
      "Analytical testing methodologies and specifications",
      "Quality Control (QC) and stability testing data",
      "Laboratory equipment and informatics (LIMS/ELN) integration",
      "Reference standards and reagent tracking"
    ]
  },
];
