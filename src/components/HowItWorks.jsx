import { useState } from "react";
import { motion } from "framer-motion";
import { steps } from "../data/content";
import { SectionHeading } from "./Section";
import RevisionQuiz from "./RevisionQuiz";

export default function HowItWorks() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="how-it-works" className="border-y-2 border-ink bg-paper-deep/70 py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading no="02" eyebrow="The method" title="From newspaper to memory, in three steps." />

        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col border-t-2 border-ink">
            {steps.map((s, i) => (
              <motion.button
                key={s.n}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={() => setHovered(i)}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`flex items-start gap-5 border-b-2 border-ink px-4 py-6 text-left transition-colors duration-300 sm:px-5 ${
                  hovered === i ? "bg-marker" : "hover:bg-marker-soft/60"
                }`}
              >
                <span
                  className={`font-display w-16 shrink-0 text-[3.4rem] leading-[0.9] transition-colors ${
                    hovered === i ? "text-ink" : "text-vermilion"
                  }`}
                >
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-[26px] leading-none text-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[18px] leading-relaxed text-ink">{s.body}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center">
            <RevisionQuiz />
          </div>
        </div>
      </div>
    </section>
  );
}
