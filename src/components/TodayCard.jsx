import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { todayFeed } from "../data/content";

const toneStyles = {
  new: "bg-vermilion text-paper-hi",
  update: "bg-marker text-ink",
  info: "bg-pine text-paper-hi",
  revise: "bg-ink text-paper-hi",
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
    <div className="relative w-full max-w-[440px] rotate-[1.2deg]">
      {/* strip of tape holding the clipping */}
      <div className="absolute -top-4 left-1/2 z-10 h-7 w-28 -translate-x-1/2 -rotate-3 bg-marker/80 shadow-[0_1px_0_rgba(20,17,14,0.25)]" />

      <div className="border-2 border-ink bg-paper-hi p-5 pt-7 shadow-block">
        <div className="flex items-end justify-between border-b-4 border-double border-ink pb-3">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">The daily brief</p>
            <p className="font-display text-[26px] leading-none text-ink">Fri, 19 Sep</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-ink font-display text-[22px] text-paper">
            G
          </div>
        </div>

        <div className="flex flex-col">
          {todayFeed.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.heading}
                onClick={() => {
                  setActive(i);
                  setProgress(0);
                }}
                className={`relative overflow-hidden border-b border-ink/25 px-3 py-3.5 text-left transition-colors duration-300 last:border-b-0 ${
                  isActive ? "bg-marker-soft" : "hover:bg-paper-deep/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${toneStyles[item.tagTone]}`}
                  >
                    {item.tag}
                  </span>
                  {item.time && (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-faint">{item.time}</span>
                  )}
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={item.heading}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 font-display text-[19px] leading-[1.15] text-ink"
                  >
                    {item.heading}
                  </motion.p>
                </AnimatePresence>
                <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-soft">{item.meta}</p>
                {isActive && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-vermilion" style={{ width: `${progress}%` }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
