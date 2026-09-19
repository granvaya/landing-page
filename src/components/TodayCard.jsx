import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCcw, Lightbulb, RotateCw } from "lucide-react";
import { todayFeed } from "../data/content";

const toneStyles = {
  new: { bg: "bg-terracotta-soft", text: "text-terracotta", icon: Sparkles },
  update: { bg: "bg-mustard-soft", text: "text-mustard", icon: RefreshCcw },
  info: { bg: "bg-sage-soft", text: "text-sage", icon: Lightbulb },
  revise: { bg: "bg-navy/10", text: "text-navy", icon: RotateCw },
};

export default function TodayCard() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % todayFeed.length);
          return 0;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(tick);
  }, []);

  return (
    <div className="relative">
      {/* floating accent card behind */}
      <div className="absolute -right-5 -top-5 h-full w-full rounded-[28px] bg-gold-soft/60 -z-10" />

      <div className="w-full max-w-[360px] rounded-[28px] border border-cream-line bg-white p-5 shadow-lift">
        <div className="flex items-center justify-between px-1 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">Today</p>
            <p className="font-display text-lg text-ink">Fri, 19 Sep</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-cream text-xs font-bold">
            G
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {todayFeed.map((item, i) => {
            const tone = toneStyles[item.tagTone];
            const Icon = tone.icon;
            const isActive = i === active;
            return (
              <button
                key={item.heading}
                onClick={() => {
                  setActive(i);
                  setProgress(0);
                }}
                className={`relative overflow-hidden rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                  isActive
                    ? "border-navy/15 bg-cream shadow-soft scale-[1.02]"
                    : "border-cream-line bg-white hover:bg-cream/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gold"
                    style={{ width: `${progress}%` }}
                  />
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={`flex items-center gap-1 rounded-full ${tone.bg} ${tone.text} px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide`}
                  >
                    <Icon size={10} strokeWidth={2.5} />
                    {item.tag}
                  </span>
                  {item.time && (
                    <span className="text-[11px] font-medium text-ink-faint">{item.time}</span>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={item.heading}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="mt-1.5 text-[14px] font-semibold leading-snug text-ink"
                  >
                    {item.heading}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1 text-[12px] text-ink-faint">{item.meta}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
