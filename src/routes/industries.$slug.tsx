import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal, MagneticButton } from "@/components/site/primitives";
import { industries } from "@/components/site/data";
import { CheckCircle2, ArrowRight, Zap, Database, BarChart3, Activity } from "lucide-react";
import dynamicImg from "@/assets/dynamic_dashboard.png";

// Mappings for distinct industry color themes
const THEMES: Record<string, any> = {
  "pharma": {
    bg: "bg-blue-50/50", border: "border-blue-200/60", hoverBorder: "hover:border-blue-300", 
    text: "text-blue-600", textGradient: "from-blue-600 to-indigo-600", light: "bg-blue-50",
    gradient: "from-blue-500/5 to-indigo-600/10", cardShadow: "shadow-blue-900/5"
  },
  "biopharma": {
    bg: "bg-emerald-50/50", border: "border-emerald-200/60", hoverBorder: "hover:border-emerald-300", 
    text: "text-emerald-600", textGradient: "from-emerald-600 to-teal-600", light: "bg-emerald-50",
    gradient: "from-emerald-500/5 to-teal-600/10", cardShadow: "shadow-emerald-900/5"
  },
  "medical-devices": {
    bg: "bg-purple-50/50", border: "border-purple-200/60", hoverBorder: "hover:border-purple-300", 
    text: "text-purple-600", textGradient: "from-purple-600 to-fuchsia-600", light: "bg-purple-50",
    gradient: "from-purple-500/5 to-fuchsia-600/10", cardShadow: "shadow-purple-900/5"
  },
  "veterinary": {
    bg: "bg-amber-50/50", border: "border-amber-200/60", hoverBorder: "hover:border-amber-300", 
    text: "text-amber-600", textGradient: "from-amber-600 to-orange-600", light: "bg-amber-50",
    gradient: "from-amber-500/5 to-orange-600/10", cardShadow: "shadow-amber-900/5"
  },
  "cosmetics": {
    bg: "bg-rose-50/50", border: "border-rose-200/60", hoverBorder: "hover:border-rose-300", 
    text: "text-rose-600", textGradient: "from-rose-600 to-pink-600", light: "bg-rose-50",
    gradient: "from-rose-500/5 to-pink-600/10", cardShadow: "shadow-rose-900/5"
  },
  "food": {
    bg: "bg-cyan-50/50", border: "border-cyan-200/60", hoverBorder: "hover:border-cyan-300", 
    text: "text-cyan-600", textGradient: "from-cyan-600 to-sky-600", light: "bg-cyan-50",
    gradient: "from-cyan-500/5 to-sky-600/10", cardShadow: "shadow-cyan-900/5"
  }
};

const DEFAULT_THEME = THEMES["pharma"];

export default function IndustryDetail() {
  const { slug } = useParams();
  const item = industries.find((i) => i.slug === slug);

  if (!item) {
    return (
      <SiteLayout>
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Industry not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }
  const Icon = item.icon;
  const features = item.features || [];
  const theme = THEMES[slug || ""] || DEFAULT_THEME;

  return (
    <SiteLayout>
      <PageHero eyebrow="Industry Solutions" title={`Intelligence for ${item.name}`} blurb={item.blurb} />
      
      <Section className="!pt-0 relative">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${theme.gradient} rounded-full blur-[120px] -z-10 pointer-events-none opacity-60`} />
        
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-16">
            <Reveal delay={0.05}>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  Transforming the <span className={`bg-clip-text text-transparent bg-gradient-to-r ${theme.textGradient}`}>{item.name}</span> landscape
                </h2>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-10 w-10 rounded-xl ${theme.light} flex items-center justify-center ${theme.text}`}>
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Key Capabilities</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {features.map((f: string, idx: number) => (
                    <div
                      key={idx}
                      className={`group flex items-start gap-4 rounded-2xl border ${theme.border} ${theme.bg} p-6 transition-all duration-300 ${theme.hoverBorder} hover:shadow-md hover:-translate-y-1`}
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${theme.light} ${theme.text} group-hover:scale-110 transition-transform shadow-sm`}>
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90 leading-snug mt-1">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-10 w-10 rounded-xl ${theme.light} flex items-center justify-center ${theme.text}`}>
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Use Cases</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { title: "Real-time Monitoring", desc: "Track competitor pipelines, clinical trial modifications, and regulatory updates automatically.", icon: BarChart3 },
                    { title: "Data Harmonization", desc: "Combine public registries with internal data lakes securely into one queryable graph.", icon: Database },
                  ].map((uc, i) => {
                    const UCIcon = uc.icon;
                    return (
                      <div key={i} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                        <div className={`mt-1 h-8 w-8 shrink-0 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground`}>
                           <UCIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{uc.title}</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{uc.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
               <div className={`mt-12 rounded-[2rem] border ${theme.border} bg-gradient-to-br ${theme.gradient} p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-lg`}>
                  <div className="max-w-md">
                    <h4 className="text-2xl font-bold text-foreground">Ready to accelerate your strategy?</h4>
                    <p className="mt-3 text-muted-foreground">Connect with our {item.name} domain experts to see the platform tailored to your data architecture.</p>
                  </div>
                  <div className="shrink-0">
                    <MagneticButton to="/contact">Get in Touch</MagneticButton>
                  </div>
               </div>
            </Reveal>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-24">
            <Reveal>
              <div className={`overflow-hidden rounded-3xl border border-border bg-card shadow-2xl ${theme.cardShadow} transition-all`}>
                <div className="aspect-[4/3] relative group">
                  <img 
                    src={dynamicImg} 
                    alt="Data Intelligence Dashboard" 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className={`absolute top-4 left-4 grid h-14 w-14 place-items-center rounded-2xl bg-background/90 backdrop-blur-md border border-border/50 ${theme.text} shadow-xl`}>
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="p-8 bg-background relative">
                  {/* Decorative faint background icon */}
                  <Icon className={`absolute -bottom-4 -right-4 h-32 w-32 opacity-5 ${theme.text} pointer-events-none`} />
                  
                  <h3 className="font-bold text-xl text-foreground">{item.name} Intelligence</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">Continuous, real-time signals and validated data products built specifically for regulated environments.</p>
                  
                  <div className="mt-8 space-y-3">
                    <Link to="/products/cgxp-directory" className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted/80 transition-colors group">
                      <span className="text-sm font-semibold text-foreground">View Directory</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors group-hover:translate-x-1" />
                    </Link>
                    <Link to="/contact" className={`flex items-center justify-between p-3 rounded-xl ${theme.bg} ${theme.border} hover:opacity-80 transition-opacity group`}>
                      <span className={`text-sm font-semibold ${theme.text}`}>Talk to our team</span>
                      <ArrowRight className={`h-4 w-4 ${theme.text} transition-transform group-hover:translate-x-1`} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
