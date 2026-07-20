import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal, MagneticButton } from "@/components/site/primitives";
import { dataSources } from "@/components/site/data";
import { CheckCircle2, ArrowRight, Database, ShieldCheck, Search } from "lucide-react";
import dynamicImg from "@/assets/dynamic_dashboard.png";

export default function DataSourceDetail() {
  const { slug } = useParams();
  const item = dataSources.find((d) => d.slug === slug);

  if (!item) {
    return (
      <SiteLayout>
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Data Source not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }
  const Icon = item.icon;
  const features = item.features || [];

  return (
    <SiteLayout>
      <PageHero eyebrow="Data Ecosystem" title={item.name} blurb={item.blurb} />
      <Section className="!pt-0">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-md p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] group">
              <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-64 w-64 rounded-full bg-accent/10 blur-[80px] pointer-events-none transition-transform duration-1000 group-hover:scale-150" />
              
              <div className="relative z-10 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] mb-10 transform transition-transform group-hover:-translate-y-2 group-hover:rotate-6">
                <Icon className="h-10 w-10" />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6">
                Unified <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Data Layer</span>
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                <p>{item.description}</p>
              </div>
              
              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-4">
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground shadow-sm z-30"><Database className="h-5 w-5" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground shadow-sm z-20"><ShieldCheck className="h-5 w-5" /></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground shadow-sm z-10"><Search className="h-5 w-5" /></div>
                </div>
                <MagneticButton to="/contact" variant="ghost">Request Data Sample</MagneticButton>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <div className="lg:pl-8">
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-8">Data Coverage & Entities</h3>
              <div className="space-y-4">
                {features.map((f: string, i: number) => (
                  <div key={f} className="group flex items-center gap-5 rounded-2xl border border-border/40 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-1 hover:bg-muted/30">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 text-primary group-hover:scale-110 transition-transform shadow-sm">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <span className="text-base font-semibold text-foreground/90">{f}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex items-center gap-3 text-sm text-foreground font-semibold bg-emerald-500/10 text-emerald-600 px-5 py-3 rounded-xl border border-emerald-500/20 w-fit">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                Data updated in real-time
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </SiteLayout>
  );
}
