import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal, MagneticButton } from "@/components/site/primitives";
import { products } from "@/components/site/data";
import { CheckCircle2, ArrowRight, Network, Lock, Zap } from "lucide-react";
import dynamicImg from "@/assets/dynamic_dashboard.png";

export default function ProductDetail() {
  const { slug } = useParams();
  const item = products.find((p) => p.slug === slug);

  if (!item) {
    return (
      <SiteLayout>
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }
  const Icon = item.icon;
  const features = item.features || [];
  const metrics = item.metrics || [];

  return (
    <SiteLayout>
      <PageHero eyebrow="Product Platform" title={item.name} blurb={item.blurb} />
      <Section className="!pt-0">
        {/* Featured Image Header */}
        <div className="mb-20 relative w-full h-[350px] sm:h-[450px] overflow-hidden rounded-[2.5rem] border border-border/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] group">
          <Reveal>
            <div className="absolute inset-0">
              <img src={dynamicImg} alt="Data Intelligence Dashboard" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] opacity-80 mix-blend-lighten" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 mix-blend-overlay" />
            </div>
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="flex flex-col items-center gap-4 bg-background/90 backdrop-blur-xl px-12 py-8 rounded-[2rem] border border-border/50 shadow-2xl scale-100 transition-transform duration-500 group-hover:scale-105">
                 <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary shadow-inner">
                   <Icon className="h-8 w-8" />
                 </div>
                 <div className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{item.name}</div>
               </div>
            </div>
          </Reveal>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-16">
            <Reveal>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground">
                  The ultimate <span className="text-gradient">intelligence layer</span>
                </h2>
                <div className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  {item.description}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Core Capabilities</h3>
                </div>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {features.map((f: string) => (
                    <li
                      key={f}
                      className="group flex items-start gap-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-5 shadow-sm transition hover:shadow-md hover:-translate-y-1 hover:border-primary/20 hover:bg-card"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground/90 mt-1 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Integration Section */}
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-border bg-gradient-to-br from-background to-muted/30 p-8 sm:p-10 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-primary/5"><Network className="w-64 h-64" /></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Enterprise Integration & Security</h3>
                  <p className="text-muted-foreground mb-8 max-w-lg">
                    {item.name} is built to deploy securely within your existing VPC. It connects natively with your LIMS, ELN, and ERP systems via certified API gateways.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                     <div className="flex items-center gap-3 bg-background p-4 rounded-xl border border-border">
                        <Lock className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-semibold">21 CFR Part 11 Compliant</span>
                     </div>
                     <div className="flex items-center gap-3 bg-background p-4 rounded-xl border border-border">
                        <Network className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-semibold">GraphQL & REST APIs</span>
                     </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {metrics.length > 0 && (
              <Reveal delay={0.1}>
                <div className="rounded-[2rem] border border-border bg-card p-8 shadow-xl">
                  <div className="text-xs font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    By The Numbers
                  </div>
                  <div className="space-y-6">
                    {metrics.map((m: any) => (
                      <div key={m.label} className="border-b border-border/40 pb-5 last:border-0 last:pb-0">
                        <div className="text-4xl font-bold tracking-tight text-foreground">{m.value}</div>
                        <div className="text-sm font-medium text-muted-foreground mt-1.5 uppercase tracking-wide">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <div className="rounded-[2rem] bg-gradient-to-br from-primary to-accent p-8 text-white shadow-2xl relative overflow-hidden group hover:shadow-primary/20 transition-shadow">
                <div className="absolute top-0 right-0 p-6 opacity-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12"><Icon className="w-40 h-40" /></div>
                <div className="relative z-10">
                  <div className="text-2xl font-bold mb-3 tracking-tight">Request Access</div>
                  <p className="text-white/80 text-sm mb-8 leading-relaxed">Deploy {item.name} in a dedicated sandbox environment to see the intelligence graph in action.</p>
                  <Link to="/contact" className="w-full group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary px-6 py-4 text-sm font-semibold transition-all hover:bg-white/90 hover:shadow-lg">
                    Get a Demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
