import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { PageHero, Section, Reveal } from "@/components/site/primitives";
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Globe2, Building, MessageSquare, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CursorTrail } from "@/components/site/CursorTrail";

export default Contact;

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "7a678625-4424-4938-bdb9-df52a9109701";
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
        setResult("Success!");
        e.currentTarget.reset();
        setTimeout(() => {
          setSent(false);
          setResult("");
        }, 5000);
      } else {
        setResult(data.message || "Error submitting form");
      }
    } catch (error) {
      setResult("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's build your intelligence layer."
        blurb="Tell us about your goals and our team will reach out within one business day."
      />
      <Section className="!pt-12">
        <div className="grid gap-16 lg:grid-cols-2 items-start relative z-10">
          {/* LEFT SIDE: Info & FAQs */}
          <div className="space-y-16">
            <Reveal>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold tracking-tight">Get in touch</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Our experts are ready to help you implement a tailored data intelligence layer for your life sciences workflow.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { Icon: Mail, label: "Email", v: "info@cGxPTech.com" },
                    { Icon: Phone, label: "Phone", v: "+1 (609) 778-0017" },
                  ].map(({ Icon, label, v }) => (
                    <div
                      key={label}
                      className="group relative flex items-center gap-4 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm p-4 overflow-hidden transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-1"
                    >
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">
                          {label}
                        </div>
                        <div className="text-sm font-semibold text-foreground">{v}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary font-medium mt-4 shadow-[0_0_20px_-5px_rgba(37,99,235,0.2)]">
                  <CheckCircle2 className="h-4 w-4" />
                  Join 48,000+ companies powered by cGxP
                </div>
              </div>
            </Reveal>

            {/* Global Reach */}
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">Global Offices</h3>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { city: "New York/New Jersey", region: "HQ - North America", desc: "285 Durham Ave,\nSouth Plainfield, NJ 07080." },
                    { city: "Hyderabad", region: "HQ - India", desc: "Madhapur, Hyderabad,\nTS, India 500081." },
                  ].map((office) => (
                    <div key={office.city} className="p-4 rounded-xl border border-border bg-background">
                      <div className="flex items-start gap-2">
                        <Building className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <div className="font-semibold text-sm">{office.city}</div>
                          <div className="text-[10px] uppercase tracking-wider text-primary mt-1">{office.region}</div>
                          <div className="text-xs text-muted-foreground mt-2 whitespace-pre-line">{office.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* FAQs */}
            <Reveal delay={0.2}>
              <div className="space-y-6 pb-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">Frequently Asked Questions</h3>
                </div>
                
                <div className="space-y-3">
                  {[
                    { q: "Do you offer proof of concepts (PoCs)?", a: "Yes, we typically run 4-week PoCs for enterprise clients using a secure sandbox environment." },
                    { q: "Is your platform 21 CFR Part 11 compliant?", a: "Absolutely. All our systems are fully validated and audited for GxP, HIPAA, and GDPR compliance." },
                    { q: "Can we integrate this with our internal LIMS?", a: "Yes, our API and enterprise connectors are designed to seamlessly integrate with major LIMS, ELN, and ERP systems." },
                  ].map((faq, i) => (
                    <FAQItem key={i} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT SIDE: Smart Form */}
          <div className="lg:sticky lg:top-32">
            <Reveal delay={0.1}>
              <div className="relative">
                {/* Background glow behind form */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-[80px] rounded-[4rem] -z-10 pointer-events-none mix-blend-multiply" />
                
                <form
                  onSubmit={onSubmit}
                  className="space-y-6 rounded-[2rem] border border-white/20 bg-white/60 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-white/20 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold tracking-tight mb-8 text-[#0a1b3f]">Send us a message</h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <SmartField label="First name" name="firstName" />
                      <SmartField label="Last name" name="lastName" />
                      <SmartField label="Work email" name="email" type="email" />
                      <SmartField label="Company" name="company" />
                    </div>
                    
                    <div className="mt-5">
                      <div className="relative group/field">
                        <select
                          required
                          name="industry"
                          className="peer w-full appearance-none rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 pt-6 pb-2 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20 hover:bg-white"
                          defaultValue=""
                        >
                          <option value="" disabled>Select your industry</option>
                          <option value="pharma">Pharmaceuticals</option>
                          <option value="biopharma">Biopharma</option>
                          <option value="medical-devices">Medical Devices</option>
                          <option value="veterinary">Veterinary</option>
                          <option value="other">Other</option>
                        </select>
                        <label className="absolute left-4 top-2 text-[10px] uppercase tracking-wider text-slate-500 font-semibold transition-colors peer-focus:text-blue-600">
                          Industry
                        </label>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="relative group/field">
                        <textarea
                          required
                          name="message"
                          rows={4}
                          placeholder="Tell us about your data infrastructure needs..."
                          className="peer w-full resize-none rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 pt-6 pb-2 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20 placeholder:text-transparent focus:placeholder:text-slate-400 hover:bg-white"
                        />
                        <label className="absolute left-4 top-4 text-xs font-medium text-slate-500 transition-all peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-blue-600 peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-blue-600">
                          How can we help?
                        </label>
                      </div>
                    </div>

                    <div className="mt-8">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading || sent}
                        className="w-full group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all shadow-[0_10px_30px_-12px_rgba(37,99,235,0.45)] hover:bg-blue-700 hover:shadow-[0_18px_40px_-12px_rgba(37,99,235,0.65)] disabled:opacity-50"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : sent ? (
                          "Message sent successfully!"
                        ) : (
                          "Send message"
                        )}
                        {!loading && !sent && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                      </motion.button>
                    </div>
                    {result && !sent && (
                      <p className="mt-3 text-center text-xs font-semibold text-red-500">{result}</p>
                    )}
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}

function SmartField({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div className="relative group/field">
      <input
        required
        name={name}
        type={type}
        placeholder={label}
        className="peer w-full rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 pt-6 pb-2 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/20 placeholder:text-transparent hover:bg-white"
      />
      <label className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-500 transition-all peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-blue-600 peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-blue-600 pointer-events-none">
        {label}
      </label>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="flex w-full items-center justify-between p-4 text-left font-medium text-sm focus:outline-none hover:bg-muted/30"
      >
        {question}
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-2 bg-muted/10">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
