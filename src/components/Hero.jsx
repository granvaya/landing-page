import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { hero } from "../data/content";
import TodayCard from "./TodayCard";
import CountUp from "./CountUp";

const EMPHASIS = "exam day";

// Renders one headline line; the phrase "exam day" gets the highlighter swipe.
function Line({ text }) {
  const at = text.indexOf(EMPHASIS);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="marker-swipe whitespace-nowrap">{EMPHASIS}</span>
      {text.slice(at + EMPHASIS.length)}
    </>
  );
}

export default function Hero({ onJoin }) {
  const lines = hero.headline.split(". ").map((chunk, i, arr) => (i < arr.length - 1 ? `${chunk}.` : chunk));

  return (
    <section id="top" className="relative overflow-hidden pt-8 sm:pt-10 pb-20 sm:pb-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        {/* dateline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-y-2 border-ink py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft"
        >
          <span>{hero.eyebrow}</span>
          <span className="hidden sm:inline">Vol. 01 · Pilot Edition</span>
          <span>Fri, 19 Sep</span>
        </motion.div>

        {/* masthead headline — each line rises out of a mask, one after another */}
        <h1 className="font-display mt-8 sm:mt-10 text-[clamp(2.05rem,6.3vw,5.9rem)] leading-[0.98] text-ink">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 + i * 0.16 }}
              >
                <Line text={line} />
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="rule-double mt-10 sm:mt-12 grid grid-cols-1 gap-12 pt-8 lg:grid-cols-12 lg:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-5 lg:pr-12"
          >
            <p className="text-[21px] leading-[1.45] text-ink first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-[4.4rem] first-letter:leading-[0.8] first-letter:text-vermilion">
              {hero.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <button
                onClick={onJoin}
                className="group inline-flex items-center gap-3 border-2 border-ink bg-ink px-6 py-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-paper shadow-[6px_6px_0_0_var(--color-vermilion)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
              >
                {hero.ctaPrimary}
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#how-it-works"
                className="font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-ink underline decoration-vermilion decoration-2 underline-offset-[6px] transition-colors hover:text-vermilion"
              >
                {hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-11 flex items-end gap-5 border-t-2 border-ink pt-5">
              <div className="font-display whitespace-nowrap text-[3.6rem] leading-[0.8] text-vermilion">
                <CountUp to={hero.stat.value} suffix={hero.stat.suffix} />
              </div>
              <p className="pb-0.5 font-mono text-[12px] uppercase leading-snug tracking-[0.14em] text-ink-soft">
                {hero.stat.label}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
            className="flex justify-center lg:col-span-7 lg:items-start lg:justify-center lg:border-l-2 lg:border-ink lg:pl-12"
          >
            <TodayCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
