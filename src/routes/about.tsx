import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal, Counter } from "@/components/site/primitives";
import { Target, Lightbulb, ShieldCheck, Cpu, Network, Database } from "lucide-react";
import { Link } from "react-router-dom";

export default About;

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About cGxP"
        title="Built by data engineers and scientists who lived inside GxP."
        blurb="We exist to make life sciences faster, safer, and smarter — combining deep regulatory experience with modern data and AI engineering."
      />
      <Section className="relative">
        <div className="absolute top-1/4 left-0 w-full h-[600px] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                k: "Mission",
                v: "Accelerate intelligence for human and animal health by unifying the data that powers life sciences.",
                icon: Target
              },
              {
                k: "Vision",
                v: "Be the connected intelligence layer for the global life sciences ecosystem.",
                icon: Lightbulb
              },
            ].map((b, i) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.k} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-primary/5 group-hover:to-accent/5" />
                    <Icon className="absolute -bottom-6 -right-6 h-32 w-32 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
                    
                    <div className="relative z-10 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="relative z-10 text-xs uppercase tracking-widest text-primary font-semibold mb-3">{b.k}</div>
                    <div className="relative z-10 text-2xl font-semibold tracking-tight text-foreground/90">{b.v}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-20 relative">
          <Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border md:grid-cols-4 shadow-sm relative z-10">
              {[
                { v: 6, s: "", label: "Industries Covered" },
                { v: 4, s: "", label: "Data Domains" },
                { v: 30, s: "+", label: "Countries Served" },
                { v: 250, s: "M+", label: "Records Processed" },
              ].map((s, i) => (
                <div key={s.label} className="bg-card/80 backdrop-blur-md p-8 sm:p-10 text-center transition-colors hover:bg-background">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
                    <Counter to={s.v} suffix={s.s} />
                  </div>
                  <div className="mt-3 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Our Story Timeline */}
        <div className="mt-32">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Story</h2>
              <p className="mt-4 text-lg text-muted-foreground">Born from the frustration of disconnected data in the world's most critical industries.</p>
            </div>
          </Reveal>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            {[
              { year: "2018", title: "The Foundation", desc: "Started as a specialized data engineering consultancy for top-10 pharma companies, building custom lakehouses to unify fragmented R&D data." },
              { year: "2020", title: "cGxP Platform V1", desc: "Launched the first iteration of the unified intelligence graph, successfully connecting clinical trial data with manufacturing outcomes." },
              { year: "2022", title: "Global Scale", desc: "Expanded across 30+ countries, integrating real-time regulatory alerts and predictive models for medical devices and biopharma." },
              { year: "2024", title: "Intelligence Ecosystem", desc: "Unveiled the full suite: cGxP Directory, Jobs, and Wire, creating a comprehensive intelligence ecosystem for the life sciences sector." },
            ].map((step, i) => (
              <Reveal key={step.year} delay={i * 0.1}>
                <div className={`relative flex items-center mb-12 sm:mb-20 ${i % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background -translate-x-1/2" />
                  <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-10">
                    <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-primary font-bold text-xl mb-2">{step.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Engineering Culture */}
        <div className="mt-32 pb-20">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Engineering Culture</h2>
              <p className="mt-4 text-lg text-muted-foreground">We engineer software with the rigorous quality standards of the industries we serve.</p>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Compliance as Code", icon: ShieldCheck, desc: "We build GxP validation directly into our CI/CD pipelines, automating compliance without slowing down velocity." },
              { title: "Data Gravity", icon: Database, desc: "We respect data gravity, computing where the data lives to minimize egress and maximize security." },
              { title: "AI-Native", icon: Cpu, desc: "Generative AI and causal inference models are embedded natively into our workflows, not bolted on as afterthoughts." },
              { title: "Open Interoperability", icon: Network, desc: "We believe in connected ecosystems. Our APIs are built to play nicely with your existing enterprise systems." },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Reveal key={feature.title} delay={i * 0.1}>
                  <div className="h-full p-6 rounded-2xl border border-border bg-background hover:bg-card transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
