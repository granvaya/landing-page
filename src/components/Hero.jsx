import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { hero } from "../data/content";
import TodayCard from "./TodayCard";
import CountUp from "./CountUp";

export default function Hero({ onJoin }) {
  return (
    <section id="top" className="relative overflow-hidden pt-14 sm:pt-20 pb-20">
      {/* soft backdrop shapes */}
      <div className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-gold-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute top-40 left-[-8%] h-[300px] w-[300px] rounded-full bg-sage-soft/50 blur-3xl" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cream-line bg-white/70 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-wide text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {hero.eyebrow}
          </div>

          <h1 className="font-display mt-6 text-[2.6rem] sm:text-[3.4rem] leading-[1.06] tracking-tight text-ink">
            {hero.headline.split(". ").map((chunk, i, arr) => (
              <span key={i} className="block">
                {chunk}
                {i < arr.length - 1 ? "." : ""}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">{hero.sub}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onJoin}
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-cream shadow-lift transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {hero.ctaPrimary}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:text-navy transition-colors"
            >
              <PlayCircle size={19} />
              {hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-cream-line pt-6 max-w-sm">
            <div className="font-display text-3xl text-navy">
              <CountUp to={hero.stat.value} suffix={hero.stat.suffix} />
            </div>
            <p className="text-[13.5px] leading-snug text-ink-soft">{hero.stat.label}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex justify-center lg:justify-end"
        >
          <TodayCard />
        </motion.div>
      </div>
    </section>
  );
}
