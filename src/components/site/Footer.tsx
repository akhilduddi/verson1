/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries, products, services } from "./data";
import cgxpLogo from "@/assets/Logo.jpeg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- INLINE STYLES ---------- */
const STYLES = `
.cinematic-footer {
  --pill-bg: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-hover: color-mix(in oklch, var(--foreground) 9%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 18%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.7; }
}

@keyframes footer-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); }
  15%, 45% { transform: scale(1.25); }
  30% { transform: scale(1); }
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 10%, transparent) 40%,
    transparent 70%
  );
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.footer-grid-bg {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
}

.footer-giant-text {
  font-size: 18vw;
  line-height: 0.8;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 4%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--foreground) 7%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-heading-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 45%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 25px color-mix(in oklch, var(--foreground) 10%, transparent));
}

.footer-glass-pill {
  background: var(--pill-bg);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: var(--pill-bg-hover);
  border-color: var(--pill-border-hover);
  box-shadow: 0 12px 30px -8px rgba(0,0,0,0.15);
}

.footer-marquee-track {
  animation: footer-marquee 35s linear infinite;
}
`;

/* ---------- MARQUEE ---------- */
function MarqueeItem() {
  return (
    <div className="flex items-center space-x-10 px-6">
      <span>Data Engineering</span> <span className="text-primary/40">✦</span>
      <span>Life Sciences Intelligence</span> <span className="text-secondary/40">✦</span>
      <span>Analytics & AI</span> <span className="text-primary/40">✦</span>
      <span>GxP Compliance</span> <span className="text-secondary/40">✦</span>
      <span>Pharma · Biopharma · Devices</span> <span className="text-primary/40">✦</span>
      <span>Global Coverage</span> <span className="text-secondary/40">✦</span>
    </div>
  );
}

/* ---------- MAGNETIC BUTTON ---------- */
function MagneticBtn({
  to,
  children,
  className = "",
  onClick,
}: {
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * 0.3, y: y * 0.3, scale: 1.03, ease: "power2.out", duration: 0.4 });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1 });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (to) {
    return (
      <Link ref={ref as any} to={to as any} className={`cursor-pointer inline-flex ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref as any}
      onClick={onClick}
      className={`cursor-pointer inline-flex ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- LINK COLUMN ---------- */
function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/50 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to as any}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- MAIN FOOTER ---------- */
export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const giantRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Giant text parallax
      if (giantRef.current) {
        gsap.fromTo(
          giantRef.current,
          { y: 60, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "top 30%",
              scrub: 1,
            },
          },
        );
      }

      // Heading reveal
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 75%",
              end: "top 40%",
              scrub: 1,
            },
          },
        );
      }

      // Links grid reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 60%",
              end: "top 25%",
              scrub: 1,
            },
          },
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={footerRef}
        className="cinematic-footer relative overflow-hidden border-t border-border bg-background"
      >
        {/* Ambient aurora + grid */}
        <div className="footer-aurora absolute left-1/2 top-1/2 h-[50vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px] pointer-events-none" />
        <div className="footer-grid-bg absolute inset-0 pointer-events-none" />

        {/* Giant background text */}
        <div
          ref={giantRef}
          className="footer-giant-text absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none select-none"
        >
          cGxP
        </div>

        {/* Diagonal marquee */}
        <div className="relative overflow-hidden border-b border-border/40 bg-background/60 backdrop-blur-sm py-3.5 -rotate-1 scale-105 mt-4">
          <div className="flex w-max footer-marquee-track text-[10px] font-bold tracking-[0.25em] text-muted-foreground/60 uppercase">
            <MarqueeItem />
            <MarqueeItem />
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-6">
          {/* CTA heading */}
          <div className="text-center mb-14">
            <h2
              ref={headingRef}
              className="text-4xl md:text-7xl font-black footer-heading-glow tracking-tighter mb-6"
            >
              Let's build intelligence together.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticBtn
                to="/contact"
                className="footer-glass-pill px-7 py-3.5 rounded-full text-foreground font-semibold text-sm items-center gap-2.5"
              >
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Book a Demo
              </MagneticBtn>
              <MagneticBtn
                to="/products"
                className="footer-glass-pill px-7 py-3.5 rounded-full text-foreground font-semibold text-sm items-center gap-2.5"
              >
                <svg
                  className="h-4 w-4 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Explore Products
              </MagneticBtn>
            </div>
          </div>

          {/* Footer links grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-8 md:grid-cols-5 border-t border-border/40 pt-10 mb-10"
          >
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <img src={cgxpLogo} alt="cGxP Technologies" className="h-9 w-auto" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
                Accelerating life sciences intelligence through data engineering, analytics and AI.
              </p>
            </div>

            <FooterCol
              title="Industries"
              links={industries.map((i) => ({ label: i.name, to: `/industries/${i.slug}` }))}
            />
            <FooterCol
              title="Products"
              links={products.map((i) => ({ label: i.name, to: `/products/${i.slug}` }))}
            />
            <FooterCol
              title="Services"
              links={services.map((i) => ({ label: i.name, to: `/services/${i.slug}` }))}
            />
            <FooterCol
              title="Company"
              links={[
                { label: "About", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Data Sources", to: "/data-sources" },
              ]}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative z-10 border-t border-border/30 px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1">
            © {new Date().getFullYear()} cGxP Technologies. All rights reserved.
          </div>

          <div className="footer-glass-pill px-5 py-2 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
            <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest">
              Built for
            </span>
            <span
              className="text-primary text-sm"
              style={{ animation: "footer-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite" }}
            >
              ⬡
            </span>
            <span className="text-foreground font-black text-xs md:text-sm">Life Sciences</span>
          </div>

          <MagneticBtn
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full footer-glass-pill items-center justify-center text-muted-foreground hover:text-foreground group order-3"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </MagneticBtn>
        </div>
      </footer>
    </>
  );
}
