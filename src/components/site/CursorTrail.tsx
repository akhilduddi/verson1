import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

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

export function CursorTrail() {
  const [trailCards, setTrailCards] = useState<any[]>([]);
  const lastSpawn = useRef({ x: 0, y: 0 });
  const cardIdCounter = useRef(0);
  const selfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = selfRef.current?.parentElement;
    if (!parent) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Check if cursor is in the left/right margins of the viewport (outside 1240px content width)
      const contentWidth = 1240;
      const marginWidth = Math.max(24, (window.innerWidth - contentWidth) / 2);
      const isOverMargin = e.clientX < marginWidth || e.clientX > window.innerWidth - marginWidth;

      if (!isOverMargin) {
        return;
      }

      // 2. Check if cursor is vertically within the boundaries of this section
      const rect = parent.getBoundingClientRect();
      const isVerticallyInside = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!isVerticallyInside) {
        return;
      }

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 150) {
        lastSpawn.current = { x, y };
        
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

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={selfRef} 
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
    >
      <AnimatePresence>
        {trailCards.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, scale: 0.7, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: c.rotate }}
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
