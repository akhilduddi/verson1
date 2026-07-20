/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ctaBg from "@/assets/cta-background.png";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-6 py-24 sm:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
      {children}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  x = 0,
  y = 48,
  scale = 0.95
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  scale?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  to,
  suffix = "",
  duration = 2,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (v) => formatNumber(Math.round(v)) + suffix);

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);
  useEffect(
    () =>
      display.on("change", (v) => {
        if (ref.current) ref.current.textContent = String(v);
      }),
    [display],
  );

  return <span ref={ref}>0{suffix}</span>;
}

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "K";
  return String(n);
}

export function MagneticButton({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  function onMove(e: React.MouseEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-shadow";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.45)] hover:shadow-[0_18px_40px_-12px_rgba(37,99,235,0.55)]"
      : "border border-border bg-background/60 text-foreground backdrop-blur hover:bg-muted";

  return (
    <motion.a
      ref={ref as any}
      href={to}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
    </motion.a>
  );
}

export function PageHero({
  eyebrow,
  title,
  blurb,
}: {
  eyebrow: string;
  title: string;
  blurb: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <img src={ctaBg} alt="" className="w-full h-full object-cover opacity-[0.15]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
      </div>

      {/* gradient + grid background */}
      <div className="absolute inset-0 -z-10 bg-soft-radial opacity-80" />
      <div className="bg-grid absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_55%_at_50%_30%,black,transparent)]" />
      
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

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.03em] text-foreground sm:text-7xl">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{blurb}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function FeatureGrid({
  items,
}: {
  items: { slug?: string; name: string; blurb: string; icon: any; href?: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => {
        const Icon = it.icon;
        const card = (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-foreground/20 hover:shadow-[var(--shadow-elevate)]"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-transparent to-accent/0 opacity-0 transition group-hover:opacity-100 group-hover:from-primary/5 group-hover:to-accent/5" />
            {/* Faint Background Icon */}
            <Icon className="absolute -bottom-6 -right-6 h-32 w-32 -rotate-12 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary/10 pointer-events-none" />
            <div className="relative z-10 mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="relative z-10 text-base font-semibold">{it.name}</h3>
            <p className="relative z-10 mt-2 text-sm text-muted-foreground">{it.blurb}</p>
            {(it.href || it.slug) && (
              <div className="relative z-10 mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </div>
            )}
          </motion.div>
        );
        return it.href ? (
          <Link key={it.name} to={it.href as any}>
            {card}
          </Link>
        ) : (
          <div key={it.name}>{card}</div>
        );
      })}
    </div>
  );
}
