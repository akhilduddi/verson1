/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { industries, products, services, dataSources } from "./data";
import cgxpLogo from "@/assets/Logo.jpeg";

type MegaKey = "industries" | "products" | "services" | "data-sources";

const groups: { key: MegaKey; label: string; base: string; items: typeof industries }[] = [
  { key: "industries", label: "Industries", base: "/industries", items: industries },
  { key: "products", label: "Products", base: "/products", items: products as any },
  { key: "services", label: "Services", base: "/services", items: services as any },
  { key: "data-sources", label: "Data Sources", base: "/data-sources", items: dataSources as any },
];

export function Navbar() {
  const [open, setOpen] = useState<MegaKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* ===== DESKTOP: Full-width floating bar ===== */}
      <div
        className="fixed left-0 right-0 top-0 z-[60] hidden lg:block"
        onMouseLeave={() => setOpen(null)}
      >
        {/* Top bar with logo + CTA */}
        <div className="border-b border-border/40 bg-white/95 backdrop-blur-2xl shadow-sm">
          <div className="mx-auto flex h-[77px] max-w-7xl items-center justify-between px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src={cgxpLogo} alt="cGxP Technologies" className="h-10 w-auto" />
            </Link>

            {/* Center nav pill */}
            <nav className="flex items-center gap-0.5 rounded-full border border-border/60 bg-white px-1.5 py-1 shadow-sm">
              <PillLink to="/" active={currentPath === "/"}>
                Home
              </PillLink>
              {groups.map((g) => (
                <button
                  key={g.key}
                  onMouseEnter={() => setOpen(g.key)}
                  onClick={() => setOpen(open === g.key ? null : g.key)}
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition ${
                    open === g.key
                      ? "bg-background text-foreground shadow-sm"
                      : "text-foreground/65 hover:text-foreground"
                  }`}
                >
                  {g.label}
                  <ChevronDown
                    className={`h-3 w-3 transition ${open === g.key ? "rotate-180" : ""}`}
                  />
                </button>
              ))}
              <PillLink to="/about" active={currentPath === "/about"}>
                About Us
              </PillLink>
              <PillLink to="/contact" active={currentPath === "/contact"}>
                Contact Us
              </PillLink>
            </nav>

            {/* Book a Demo */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 px-5 py-2.5 text-[13px] font-medium text-white transition hover:scale-[1.02] hover:opacity-90 shadow-md shadow-primary/20"
            >
              Book a Demo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Mega menu dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="mx-auto mt-0 max-w-5xl rounded-b-2xl border border-t-0 border-border/60 bg-background/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <MegaPanel groupKey={open} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Spacer so content doesn't hide behind the fixed navbar */}
      <div className="hidden h-[77px] lg:block" />

      {/* ===== MOBILE NAVBAR ===== */}
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-xl shadow-sm lg:hidden">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={cgxpLogo} alt="cGxP Technologies" className="h-9 w-auto" />
          </Link>

          <button aria-label="Menu" onClick={() => setMobile(!mobile)}>
            {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-border/60"
            >
              <div className="space-y-1 px-6 py-4">
                <MLink to="/">Home</MLink>
                {groups.map((group) => (
                  <div key={group.key} className="py-1">
                    <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </div>
                    {group.items.map((it: any) => (
                      <Link key={it.slug} to={`${group.base}/${it.slug}`} className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-primary transition-colors">
                        {it.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <MLink to="/about">About</MLink>
                <MLink to="/contact">Contact</MLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function PillLink({
  to,
  children,
  active,
}: {
  to: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-medium transition ${
        active
          ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-sm shadow-primary/20"
          : "text-foreground/65 hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}

function MLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="block rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-accent/10 hover:text-primary transition-colors">
      {children}
    </Link>
  );
}

function MegaPanel({ groupKey }: { groupKey: MegaKey }) {
  const g = groups.find((x) => x.key === groupKey)!;
  return (
    <div className="mx-auto max-w-7xl px-6 py-6">
      <div className="grid grid-cols-3 gap-3">
        {g.items.map((it: any, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                to={`${g.base}/${it.slug}` as any}
                className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-border hover:bg-muted/50"
              >
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-sm font-semibold text-foreground">{it.name}</div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
