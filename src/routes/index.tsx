/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Database,
  Brain,
  Activity,
  ShieldCheck,
  Cpu,
  Globe2,
  Building2,
  Briefcase,
  Newspaper,
  FlaskConical,
  TestTubes,
  Microscope,
  Factory,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { industries, products, services, dataSources } from "@/components/site/data";
import {
  Section,
  Eyebrow,
  Reveal,
  Counter,
  MagneticButton,
  FeatureGrid,
} from "@/components/site/primitives";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { ProjectCard } from "@/components/ui/project-card";
import ctaBg from "@/assets/cta-background.png";
import logo2Img from "@/assets/logo2.png";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SiteLayout>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      <Hero />
      <Trust />
      <Industries />
      <Products />
      <Services />
      <DataEcosystem />
      <Process />
      <Capabilities />
      <Testimonials />
      <AboutTeaser />
      <ContactCTA />
    </SiteLayout>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [trailCards, setTrailCards] = useState<any[]>([]);
  const lastSpawn = useRef({ x: 0, y: 0 });
  const cardIdCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - lastSpawn.current.x;
    const dy = y - lastSpawn.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 150) {
      lastSpawn.current = { x, y };
      
      const SHOWCASE_DATA = [
        { title: "Pharma Analytics", desc: "Real-time dashboard" },
        { title: "Clinical Trials", desc: "Phase III Monitoring" },
        { title: "Drug Pipeline", desc: "Visualization" },
        { title: "Market Analytics", desc: "Competitor Tracking" },
        { title: "Regulatory Intel", desc: "FDA & EMA Updates" },
        { title: "Data Engineering", desc: "ETL Workflow" },
        { title: "Company Profile", desc: "Acquisition Target" },
        { title: "cGxP Directory", desc: "Partner Search" },
        { title: "cGxP Jobs", desc: "Data Scientist Role" },
      ];
      
      const randomData = SHOWCASE_DATA[Math.floor(Math.random() * SHOWCASE_DATA.length)];
      const rotate = Math.random() * 20 - 10;

      const newCard = {
        id: cardIdCounter.current++,
        x,
        y,
        rotate,
        ...randomData
      };

      setTrailCards(prev => {
        const next = [...prev, newCard];
        if (next.length > 8) {
           return next.slice(next.length - 8);
        }
        return next;
      });

      setTimeout(() => {
        setTrailCards(prev => prev.filter(c => c.id !== newCard.id));
      }, 500);
    }
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section ref={ref} className="relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* gradient + grid background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10 bg-soft-radial" />
      <motion.div style={{ y: yBg }} className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_55%_at_50%_30%,black,transparent)]" />
      {/* floating gradient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -left-24 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-secondary/25 to-primary/10 blur-3xl"
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      <CursorTrailCards cards={trailCards} />

      <motion.div style={{ opacity: opacityText, scale: scaleText }} className="relative z-10 mx-auto max-w-7xl px-6 pb-12 pt-14 sm:pt-20">
        <div 
          className="relative inline-block w-full max-w-4xl"
        >
          <Reveal>
            <Eyebrow>Life Sciences Intelligence · Built on Data</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-7xl">
              Accelerating <span className="text-gradient">Life Sciences</span> Intelligence Through
              Data
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Transforming Pharma, Biopharma, Medical Devices, Veterinary, Cosmetics, and Food
              industries with advanced data engineering, analytics, and intelligence solutions.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton to="#products">Explore Solutions</MagneticButton>
              <MagneticButton to="/contact" variant="ghost">
                Book a Demo
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25}>
          <DashboardPreview />
        </Reveal>
      </motion.div>
    </section>
  );
}

/* ---------------- HERO SHOWCASE CARDS (CURSOR TRAIL) ---------------- */
function CursorTrailCards({ cards }: { cards: any[] }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {cards.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%", transition: { duration: 0.5, ease: "easeOut" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ 
              top: c.y, 
              left: c.x,
            }}
            className="absolute flex w-44 h-44 flex-col items-center justify-center gap-3 rounded-2xl border border-white/60 bg-white/50 p-4 text-center shadow-xl backdrop-blur-md will-change-transform"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 text-primary shadow-sm ring-1 ring-primary/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="flex w-full min-w-0 flex-1 flex-col justify-center px-1">
              <p className="w-full truncate text-sm font-bold text-foreground/90">{c.title}</p>
              <p className="mt-0.5 w-full truncate text-[11px] text-muted-foreground">{c.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl">
      <div className="absolute -inset-x-8 -top-8 bottom-0 -z-10 rounded-[2rem] bg-gradient-to-b from-primary/10 via-accent/5 to-transparent blur-2xl" />
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-card overflow-hidden rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="text-xs text-muted-foreground">cgxp.directory / intelligence</div>
          <div className="text-xs text-muted-foreground">Live</div>
        </div>
        <div className="grid grid-cols-12 gap-4 p-5">
          <div className="col-span-12 grid grid-cols-3 gap-4 md:col-span-8">
            {[
              { label: "Companies tracked", value: "48.2K", trend: "+12%" },
              { label: "Active trials", value: "11.6K", trend: "+4%" },
              { label: "Pipeline assets", value: "32.4K", trend: "+9%" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-background/70 p-4">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</div>
                <div className="mt-1 text-xs font-medium text-emerald-600">{s.trend}</div>
              </div>
            ))}
            <div className="col-span-3 h-44 rounded-xl border border-border bg-background/70 p-4">
              <div className="text-xs text-muted-foreground">Pipeline by phase</div>
              <Sparkline />
            </div>
          </div>
          <div className="col-span-12 space-y-3 md:col-span-4">
            {industries.slice(0, 5).map((it, i) => {
              const Icon = it.icon;
              return (
                <motion.div
                  key={it.slug}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background/70 px-3 py-2"
                >
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 text-sm">{it.name}</div>
                  <div className="text-xs text-muted-foreground">Live</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Sparkline() {
  const pts = [12, 28, 22, 40, 34, 56, 48, 66, 60, 78, 72, 88];
  const max = Math.max(...pts);
  const w = 100,
    h = 50;
  const d = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - (p / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 h-28 w-full">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="#2563EB" strokeWidth="1.4" points={d} />
      <polygon fill="url(#g)" points={`0,${h} ${d} ${w},${h}`} />
    </svg>
  );
}

/* ---------------- TRUST ---------------- */
function Trust() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

  const stats = [
    { v: 48000, s: "+", label: "Companies Covered" },
    { v: 11000, s: "+", label: "Clinical Trials" },
    { v: 32000, s: "+", label: "Products Tracked" },
    { v: 250, s: "M+", label: "Data Records Processed" },
  ];
  const pills = ["Industry Coverage", "Data Sources", "Products", "Global Reach"];
  return (
    <div ref={ref}>
      <motion.div style={{ opacity, scale }}>
        <Section className="!py-20">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {pills.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="bg-background p-8 text-center h-full flex flex-col justify-center items-center"
                >
                  <div className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Section>
      </motion.div>
    </div>
  );
}

/* ---------------- INDUSTRIES ---------------- */
function Industries() {
  return (
    <section id="industries" className="py-12 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-center text-center gap-4">
        <div className="flex flex-col items-center">
          <Reveal>
            <Eyebrow>Industries</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl mx-auto">
              Deep coverage across the{" "}
              <span className="text-gradient">life sciences ecosystem</span>
            </h2>
          </Reveal>
        </div>
      </div>
      <div className="mt-12 w-full">
        <Industries3DCarousel />
      </div>
    </section>
  );
}

/* ---------------- INDUSTRIES CAROUSEL ---------------- */
function Industries3DCarousel() {
  // Duplicate industries to ensure we have enough slides for a full infinite amphitheater loop
  const carouselItems = [...industries, ...industries, ...industries];

  const colorThemes = [
    { lightBg: "bg-blue-50", border: "border-blue-100", text: "text-blue-600", iconFaint: "text-blue-50", cardBg: "bg-gradient-to-b from-white to-blue-50/60" },
    { lightBg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", iconFaint: "text-emerald-50", cardBg: "bg-gradient-to-b from-white to-emerald-50/60" },
    { lightBg: "bg-purple-50", border: "border-purple-100", text: "text-purple-600", iconFaint: "text-purple-50", cardBg: "bg-gradient-to-b from-white to-purple-50/60" },
    { lightBg: "bg-amber-50", border: "border-amber-100", text: "text-amber-600", iconFaint: "text-amber-50", cardBg: "bg-gradient-to-b from-white to-amber-50/60" },
    { lightBg: "bg-rose-50", border: "border-rose-100", text: "text-rose-600", iconFaint: "text-rose-50", cardBg: "bg-gradient-to-b from-white to-rose-50/60" },
    { lightBg: "bg-cyan-50", border: "border-cyan-100", text: "text-cyan-600", iconFaint: "text-cyan-50", cardBg: "bg-gradient-to-b from-white to-cyan-50/60" },
  ];

  return (
    <div className="w-full pb-12 overflow-hidden">
      <Swiper
        effect={'creative'}
        loop={true}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={0}
        creativeEffect={{
          limitProgress: 4,
          perspective: true,
          prev: {
            translate: ['-100%', 0, 80],
            rotate: [0, 15, 0],
          },
          next: {
            translate: ['100%', 0, 80],
            rotate: [0, -15, 0],
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectCreative, Autoplay]}
        className="w-full !pt-10 !pb-20 px-4"
      >
        {carouselItems.map((it, i) => {
          const Icon = it.icon;
          const theme = colorThemes[i % colorThemes.length];
          return (
             <SwiperSlide key={`${it.slug}-${i}`} className="!w-[190px] sm:!w-[220px] select-none transition-transform duration-300 !z-10">
              <Link to={`/industries/${it.slug}`} className="block w-full h-full cursor-grab active:cursor-grabbing">
                <div className={`group relative overflow-hidden rounded-[24px] border border-slate-200/60 ${theme.cardBg} p-5 sm:p-6 transition-all shadow-[0_15px_35px_-5px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] hover:border-slate-300/80 h-full min-h-[340px] flex flex-col`}>
                  {/* Huge faint background icon */}
                  <Icon 
                    className={`absolute -bottom-8 -right-8 h-48 w-48 ${theme.iconFaint} transition-transform duration-700 group-hover:scale-105 pointer-events-none`} 
                    strokeWidth={1.5} 
                  />
                  
                  {/* Small top-left icon square */}
                  <div className={`relative z-10 mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] ${theme.lightBg} border ${theme.border} ${theme.text}`}>
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  
                  {/* Clean text styling */}
                  <h3 className="relative z-10 text-2xl font-bold tracking-tight text-[#0a1b3f] mb-3">{it.name}</h3>
                  <p className="relative z-10 text-[13px] text-slate-600 leading-relaxed flex-1">{it.blurb}</p>
                  
                  {/* Explore Link */}
                  <div className={`relative z-10 mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold ${theme.text} transition-transform group-hover:translate-x-1`}>
                    Explore Industry <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

/* ---------------- PRODUCTS ---------------- */
function Products() {
  const customProducts = [
    {
      name: "cGxP.Directory",
      slug: "cgxp-directory",
      imgSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop", // Corporate buildings representing companies
      blurb: "The unified company intelligence platform for life sciences stakeholders.",
      features: [
        "48K+ Verified entities",
        "Real-time ownership links",
        "GxP compliance history",
      ],
      linkText: "Explore Directory",
    },
    {
      name: "cGxP.Jobs",
      slug: "cgxp-jobs",
      imgSrc: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop", // Microscope representing tech/pharma jobs
      blurb: "Precision career matches for elite GxP engineering and scientific talent.",
      features: [
        "Domain-specific mapping",
        "Direct scientist recruiting",
        "GxP-verified profiles",
      ],
      linkText: "Search Roles",
    },
    {
      name: "cGxP.Wire",
      slug: "cgxp-wire",
      imgSrc: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop", // Digital news app on phone
      blurb: "The industry's first intelligence-first news and regulatory update feed.",
      features: [
        "AI-curated summaries",
        "Regulatory impact scoring",
        "Real-time alert system",
      ],
      linkText: "Read Intelligence",
    }
  ];

  return (
    <section id="products" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              PRODUCTS
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
              Three platforms. <span className="text-gradient">One intelligence layer.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {customProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} y={32}>
              <Link to={`/products/${p.slug}`} className="block h-full">
                <ProjectCard
                  title={p.name}
                  description={
                    <div className="flex flex-col gap-3">
                      <p>{p.blurb}</p>
                      <ul className="space-y-1.5 mt-2">
                        {p.features.map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                  imgSrc={p.imgSrc}
                  link={`/products/${p.slug}`}
                  linkText={p.linkText}
                  className="h-full"
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
function Services() {
  return (
    <Section id="services">
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow>Services</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            End-to-end data services, <span className="text-gradient">engineered for regulated industries.</span>
          </h2>
        </Reveal>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.map((s, i) => {
          const features = featuresFor(s.slug);
          const description = (
            <div className="flex flex-col gap-3">
              <p>{s.blurb}</p>
              <ul className="space-y-1.5 mt-2">
                {features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
          
          let imgSrc = "";
          if (s.slug === "data-engineering") {
            imgSrc = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop";
          } else if (s.slug === "data-science") {
            imgSrc = "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop";
          } else {
            imgSrc = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop";
          }

          return (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link to={`/services/${s.slug}`} className="block h-full">
                <ProjectCard
                  title={s.name}
                  description={description}
                  imgSrc={imgSrc}
                  link={`/services/${s.slug}`}
                  linkText="Explore Service"
                  className="h-full"
                />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function featuresFor(slug: string) {
  if (slug === "data-engineering")
    return [
      "Validated ELT pipelines",
      "Lakehouse architecture",
      "Real-time streaming",
      "GxP-compliant infra",
    ];
  if (slug === "data-science")
    return [
      "Forecasting & demand",
      "NLP for scientific text",
      "Generative AI workflows",
      "Causal inference",
    ];
  return ["Executive dashboards", "Self-service BI", "KPI frameworks", "Embedded analytics"];
}

/* ---------------- DATA ECOSYSTEM ---------------- */
function DataEcosystem() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yGraph = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  const rotateGraph = useTransform(scrollYProgress, [0, 1], [0, 180]);

  const nodes = [
    { name: "R&D", icon: FlaskConical, angle: 0 },
    { name: "Clinical", icon: TestTubes, angle: 90 },
    { name: "Manufacturing", icon: Factory, angle: 180 },
    { name: "Laboratory", icon: Microscope, angle: 270 },
  ];
  const r = 150;
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-background">
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(50%_50%_at_50%_50%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>Data Sources</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                A connected intelligence graph for <span className="text-gradient">life sciences.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-muted-foreground">
                We unify research, clinical, manufacturing, and laboratory data into a single,
                governed intelligence layer.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {dataSources.map((d) => (
                  <Link
                    key={d.slug}
                    to={`/data-sources/${d.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition hover:border-foreground/20"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                      <d.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{d.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{d.blurb}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} x={24}>
            <motion.div style={{ y: yGraph }} className="relative mx-auto aspect-square w-full max-w-[600px] hidden sm:block">
              {/* Background Dashed Lines */}
              <svg
                className="absolute inset-0 h-full w-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <line
                  x1="25%"
                  y1="25%"
                  x2="50%"
                  y2="50%"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="75%"
                  y1="25%"
                  x2="50%"
                  y2="50%"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="25%"
                  y1="75%"
                  x2="50%"
                  y2="50%"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <line
                  x1="75%"
                  y1="75%"
                  x2="50%"
                  y2="50%"
                  stroke="currentColor"
                  className="text-primary/40"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>

              {/* Center Circle */}
              <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-10 flex h-32 w-32 items-center justify-center rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] bg-background">
                <motion.div style={{ rotate: rotateGraph }} className="absolute inset-0 rounded-full ring-[8px] ring-primary/10" />
                <img src={logo2Img} alt="cGxP Logo" className="relative z-10 h-full w-full object-contain p-1" />
              </div>

              {/* 4 Corners */}
              <div className="absolute top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20 w-[180px] lg:w-[220px]">
                <GraphCard item={dataSources[0]} />
              </div>
              <div className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20 w-[180px] lg:w-[220px]">
                <GraphCard item={dataSources[1]} />
              </div>
              <div className="absolute top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-20 w-[180px] lg:w-[220px]">
                <GraphCard item={dataSources[2]} />
              </div>
              <div className="absolute top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2 z-20 w-[180px] lg:w-[220px]">
                <GraphCard item={dataSources[3]} />
              </div>
            </motion.div>

            {/* Mobile Fallback Graphic */}
            <div className="sm:hidden flex justify-center mt-10">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] bg-background">
                <div className="absolute inset-0 rounded-full ring-[8px] ring-primary/10" />
                <img src={logo2Img} alt="cGxP Logo" className="relative z-10 h-full w-full object-contain p-1" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GraphCard({ item }: { item: any }) {
  const Icon = item.icon;
  return (
    <Link to={`/data-sources/${item.slug}`} className="block group">
      <motion.div 
        whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-4 lg:p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.15)] hover:border-primary/30"
      >
        <Icon className="absolute -bottom-4 -right-4 h-24 w-24 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
        <div className="relative z-10 grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="relative z-10 mt-4 text-sm lg:text-base font-bold text-foreground leading-tight">
          {item.name}
        </div>
        <div className="relative z-10 mt-1.5 text-[10px] lg:text-xs text-muted-foreground leading-relaxed">
          {item.blurb}
        </div>
      </motion.div>
    </Link>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    {
      name: "Collect",
      icon: Database,
      desc: "Multi-source ingestion across structured and unstructured data.",
    },
    {
      name: "Process",
      icon: Cpu,
      desc: "Validated transformations, lineage, and quality controls.",
    },
    {
      name: "Analyze",
      icon: Brain,
      desc: "AI/ML pipelines and statistical models tuned for life sciences.",
    },
    {
      name: "Deliver",
      icon: Activity,
      desc: "Dashboards, APIs, and embedded products for decision-making.",
    },
  ];
  return (
    <Section>
      <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
        <Reveal>
          <Eyebrow>Process</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            How we deliver <span className="text-gradient">intelligence.</span>
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-12 mb-8 mx-auto w-[85%] max-w-5xl">
        {/* Horizontal line for desktop with animated light effect */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-border/50 hidden md:block overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "300%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        <div className="grid gap-12 md:gap-0 md:grid-cols-4 relative z-10">
          {steps.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <Reveal key={s.name} delay={i * 0.1}>
                {/* Mobile View (Vertical Stack) */}
                <div className="md:hidden flex flex-col items-center text-center">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-background border border-border shadow-sm">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card p-5 w-full shadow-sm">
                    <s.icon className="absolute -bottom-4 -right-4 h-20 w-20 -rotate-12 text-primary/5 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                    <div className="relative z-10 text-base font-bold text-foreground">
                      {s.name}
                    </div>
                    <p className="relative z-10 mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>

                {/* Desktop View (Staggered Timeline - Smaller) */}
                <div className="hidden md:flex flex-col items-center justify-center relative w-full h-[280px] group">
                  {/* Top Half */}
                  <div className="flex-1 flex flex-col items-center w-full relative">
                    {isEven ? (
                      <div className="mt-auto mb-4 w-full flex justify-center px-2 transition-transform duration-300 group-hover:-translate-y-2">
                        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 text-center shadow-md w-full max-w-[210px]">
                          <s.icon className="absolute -bottom-4 -right-4 h-20 w-20 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
                          <div className="relative z-10 text-sm font-bold text-foreground">
                            {s.name}
                          </div>
                          <p className="relative z-10 mt-1.5 text-xs text-muted-foreground leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-auto mb-4 grid h-10 w-10 place-items-center rounded-full bg-background border border-border shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    {/* Vertical connecting line to dot */}
                    <div className="absolute bottom-0 h-4 w-[2px] bg-border/80" />
                  </div>

                  {/* Center Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-primary ring-[3px] ring-background z-20 shrink-0 shadow-sm" />

                  {/* Bottom Half */}
                  <div className="flex-1 flex flex-col items-center w-full relative">
                    {/* Vertical connecting line from dot */}
                    <div className="absolute top-0 h-4 w-[2px] bg-border/80" />
                    {!isEven ? (
                      <div className="mb-auto mt-4 w-full flex justify-center px-2 transition-transform duration-300 group-hover:translate-y-2">
                        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-4 text-center shadow-md w-full max-w-[210px]">
                          <s.icon className="absolute -bottom-4 -right-4 h-20 w-20 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
                          <div className="relative z-10 text-sm font-bold text-foreground">
                            {s.name}
                          </div>
                          <p className="relative z-10 mt-1.5 text-xs text-muted-foreground leading-relaxed">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-auto mt-4 grid h-10 w-10 place-items-center rounded-full bg-background border border-border shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <s.icon className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------------- CAPABILITIES ---------------- */
function Capabilities() {
  const row1 = [
    {
      name: "Real-time Intelligence",
      icon: Activity,
      blurb: "Stream-grade pipelines for live signals.",
    },
    {
      name: "AI-powered Insights",
      icon: Brain,
      blurb: "Language models tuned to scientific corpora.",
    },
    { name: "Data Aggregation", icon: Database, blurb: "Multi-source harmonization at scale." },
    {
      name: "Market Intelligence",
      icon: BarChart3,
      blurb: "Competitive, pricing, and access analytics.",
    },
  ];
  const row2 = [
    { name: "Company Intelligence", icon: Building2, blurb: "Org graphs, pipelines, and deals." },
    {
      name: "Talent Intelligence",
      icon: Briefcase,
      blurb: "Workforce signals and skills mapping.",
    },
    {
      name: "Research Intelligence",
      icon: FlaskConical,
      blurb: "Literature, KOLs, and emerging science.",
    },
    {
      name: "Governance & Trust",
      icon: ShieldCheck,
      blurb: "GxP-aligned controls, lineage, and audits.",
    },
  ];

  return (
    <section className="relative border-t border-border bg-muted/30 overflow-hidden">
      <Section>
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <Reveal>
            <Eyebrow>Platform Capabilities</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              One platform. <span className="text-gradient">Every intelligence layer.</span>
            </h2>
          </Reveal>
        </div>

        {/* Marquee container */}
        <div className="mt-12 space-y-4">
          {/* Row 1: Right to Left */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="flex gap-4 w-max"
            >
              {[...row1, ...row1].map((c, i) => (
                <CapCard key={`r1-${i}`} item={c} />
              ))}
            </motion.div>
          </div>

          {/* Row 2: Left to Right */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              className="flex gap-4 w-max"
            >
              {[...row2, ...row2].map((c, i) => (
                <CapCard key={`r2-${i}`} item={c} />
              ))}
            </motion.div>
          </div>
        </div>
      </Section>
    </section>
  );
}

function CapCard({ item }: { item: { name: string; icon: any; blurb: string } }) {
  const Icon = item.icon;
  return (
    <div className="group relative overflow-hidden flex items-center gap-4 rounded-2xl border border-border bg-background px-6 py-5 min-w-[320px] transition hover:border-foreground/20 hover:shadow-sm">
      <Icon className="absolute -bottom-4 -right-4 h-24 w-24 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
      <div className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="relative z-10">
        <div className="text-sm font-semibold">{item.name}</div>
        <div className="mt-0.5 text-xs text-muted-foreground">{item.blurb}</div>
      </div>
    </div>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
function Testimonials() {
  const testimonials = [
    {
      text: "cGxP gave us a single source of truth for our competitive landscape. The depth of pharma coverage is unmatched.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Sarah Mitchell",
      role: "VP, Strategy — Top 20 Pharma",
    },
    {
      text: "Their data engineering team rebuilt our clinical data lakehouse in 90 days. Validated, performant, audit-ready.",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "James Crawford",
      role: "Head of Data — Global CRO",
    },
    {
      text: "cGxP.wire replaced three subscriptions. Faster signal, less noise, better decisions for our market intelligence team.",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      name: "Elena Rodriguez",
      role: "Director, Market Intel — Medtech",
    },
    {
      text: "The regulatory intelligence from cGxP helped us navigate FDA submissions with confidence. Truly a game-changer.",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      name: "Michael Chen",
      role: "VP Regulatory Affairs — Biopharma",
    },
    {
      text: "Their analytics platform uncovered pipeline opportunities we'd been missing for years. ROI was visible within weeks.",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Priya Sharma",
      role: "Chief Data Officer — Pharma",
    },
    {
      text: "cGxP's talent intelligence gave us an edge in recruiting top scientists. The workforce data coverage is remarkable.",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Lisa Anderson",
      role: "SVP, People & Talent — CRO",
    },
    {
      text: "From clinical trial tracking to competitive benchmarking, cGxP.directory is now our team's go-to resource every morning.",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "David Park",
      role: "Head of Strategy — Medical Devices",
    },
    {
      text: "Their GxP-compliant data pipelines saved us months of validation work. The engineering quality is exceptional.",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      name: "Rachel Foster",
      role: "Dir. Data Engineering — Biotech",
    },
    {
      text: "cGxP's veterinary industry coverage filled a critical gap in our data ecosystem. No one else covers this space as well.",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      name: "Thomas Weber",
      role: "CEO — Animal Health Startup",
    },
  ];

  const firstColumn = testimonials.slice(0, 3);
  const secondColumn = testimonials.slice(3, 6);
  const thirdColumn = testimonials.slice(6, 9);

  return (
    <Section>
      <Reveal>
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto">
          <Eyebrow>Testimonials</Eyebrow>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mt-4 text-center">
            Trusted by leaders across <span className="text-gradient">life sciences.</span>
          </h2>
          <p className="text-center mt-4 text-muted-foreground">
            See what industry leaders have to say about our platform.
          </p>
        </div>
      </Reveal>

      <div className="flex justify-center gap-6 mt-12 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </div>
    </Section>
  );
}

/* ---------------- ABOUT TEASER ---------------- */
function AboutTeaser() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  const cards = [
    { value: "6", title: "INDUSTRIES", desc: "Deep specialized coverage across all regulated domains." },
    { value: "4", title: "DATA DOMAINS", desc: "Integrated research, clinical, manufacturing, and lab data." },
    { value: "GxP", title: "STANDARDS", desc: "Platform-wide engineering aligned with global regulations." },
    { value: "99%", title: "PRECISION", desc: "Highest fidelity entity resolution in the industry." },
  ];

  return (
    <div ref={ref}>
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column — text content */}
        <Reveal>
          <div>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl leading-[1.1] text-foreground">
              Built by data engineers and scientists who <span className="text-gradient">lived inside GxP.</span>
            </h2>
            <p className="mt-8 text-muted-foreground leading-relaxed text-lg">
              We exist to make life sciences faster, safer, and smarter. Our teams combine deep
              regulatory experience with modern data and AI engineering — so leaders can decide with
              confidence.
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The platform brings together research, clinical, manufacturing, and laboratory
              intelligence into one seamless ecosystem. This integration eliminates data silos,
              reduces redundancy, and ensures real-time information flow across all departments.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 shadow-lg shadow-primary/20"
            >
              About cGxP Technologies
            </Link>
          </div>
        </Reveal>

        {/* Right column — 2x2 grid */}
        <motion.div style={{ y: yParallax }}>
          <Reveal x={32}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {cards.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center bg-[#EEF2FF] dark:bg-primary/10 p-8 sm:p-10 rounded-xl transition-colors hover:bg-[#E0E7FF] dark:hover:bg-primary/20"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-6">{c.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-foreground mb-3">
                    {c.title}
                  </div>
                  <div className="text-sm text-foreground/70 leading-relaxed">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>
      </div>
    </Section>
    </div>
  );
}

/* ---------------- CONTACT CTA ---------------- */
function ContactCTA() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-3xl border border-border text-white">
        {/* Background image */}
        <img
          src={ctaBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient tint overlay — vibrant gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 via-indigo-600/70 to-cyan-500/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-indigo-600/50 to-cyan-500/50 backdrop-blur-[1px]" />
        {/* Subtle light blobs */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />

        <div className="relative z-10 p-10 sm:p-16">
          <Reveal>
            <Eyebrow>Get started</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Ready to accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 drop-shadow-sm">life sciences intelligence?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-white/80">
              Talk to our team about a tailored intelligence layer for your business.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-foreground transition hover:scale-[1.02]"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Products
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
