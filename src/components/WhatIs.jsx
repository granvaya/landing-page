import { motion } from "framer-motion";
import { whatIs } from "../data/content";
import { SectionHeading } from "./Section";

// A plain-language explainer at the end of the page. Reached from the hero's
// "What is Granvaya?" link; also the clearest passage on the page for search and AI answers.
export default function WhatIs() {
  return (
    <section id="what-is-granvaya" className="scroll-mt-24 border-t-2 border-ink bg-paper-deep/70 py-20 sm:py-24">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">
        <SectionHeading no="08" eyebrow="In plain words" title="What is Granvaya?" />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          {whatIs.paragraphs.map((p) => (
            <p key={p} className="mb-4 text-[21px] leading-[1.5] text-ink last:mb-0">
              {p}
            </p>
          ))}

          <dl className="mt-9 border-t-4 border-double border-ink">
            {whatIs.facts.map((f) => (
              <div
                key={f.label}
                className="grid grid-cols-1 gap-1 border-b border-ink/30 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <dt className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-vermilion">
                  {f.label}
                </dt>
                <dd className="text-[19px] leading-snug text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
