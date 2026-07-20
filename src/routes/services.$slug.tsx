import { useParams, Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal, MagneticButton } from "@/components/site/primitives";
import { services } from "@/components/site/data";
import { CheckCircle2, Zap, ArrowRight, Layers, Lightbulb, TrendingUp } from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const item = services.find((s) => s.slug === slug);

  if (!item) {
    return (
      <SiteLayout>
        <Section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Service not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </Section>
      </SiteLayout>
    );
  }
  const Icon = item.icon;
  const features = item.features || [];
  const benefits = item.benefits || [];

  return (
    <SiteLayout>
      <PageHero eyebrow="Professional Services" title={item.name} blurb={item.blurb} />
      <Section className="!pt-0 relative">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/5 via-accent/5 to-transparent pointer-events-none -z-10" />

        <div className="grid gap-16 lg:grid-cols-2 items-center mb-24">
          <Reveal>
            <div className="space-y-8">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl leading-tight">
                Engineered for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">regulated industries</span>
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed">
                {item.description}
              </div>
              <div className="pt-4 flex gap-4">
                <MagneticButton to="/contact">Schedule a Consultation</MagneticButton>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.1} x={20}>
             <div className="relative p-10 rounded-[2rem] bg-card/60 backdrop-blur-xl border border-border/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] overflow-hidden group">
                <Icon className="absolute -bottom-10 -right-10 w-80 h-80 text-primary/5 transition-transform duration-1000 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-50 pointer-events-none" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">Business Outcomes</div>
                  </div>
                  
                  <div className="space-y-6">
                    {benefits.map((b: string, i: number) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors">
                        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 text-accent shadow-sm">
                          <Zap className="h-5 w-5" />
                        </div>
                        <p className="text-base font-semibold text-foreground/90 leading-snug">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="border-t border-border/40 pt-20">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">Our Approach & Capabilities</h3>
              <p className="mt-4 text-lg text-muted-foreground">We combine deep domain expertise with cutting-edge technology.</p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f: string, i: number) => (
                <div key={i} className="group rounded-[1.5rem] border border-border/60 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_10px_30px_-15px_rgba(37,99,235,0.2)] hover:-translate-y-1">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-base font-semibold text-foreground leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Call to Action Bar */}
        <Reveal delay={0.2}>
          <div className="mt-24 rounded-[2rem] bg-gradient-to-r from-primary to-accent p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h3 className="text-3xl font-bold text-white tracking-tight">Ready to transform your workflow?</h3>
              <p className="text-white/80 text-lg">Let's discuss how our {item.name} services can accelerate your regulated operations securely.</p>
              <div className="flex justify-center">
                <Link to="/contact" className="group/btn inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary px-8 py-4 text-base font-semibold transition-all hover:bg-white/90 hover:shadow-lg">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
