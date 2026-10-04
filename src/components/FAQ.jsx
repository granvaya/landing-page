import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "../data/content";
import { SectionHeading } from "./Section";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.5fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading no="06" eyebrow="Letters to the editor" title="Questions" />
        </div>

        <div className="border-t-4 border-double border-ink">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border-b border-ink/40">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] tracking-[0.1em] text-vermilion">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[22px] leading-[1.15] text-ink sm:text-[24px]">{item.q}</span>
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border-2 border-ink transition-colors ${
                      isOpen ? "bg-ink text-paper" : "bg-transparent text-ink"
                    }`}
                  >
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="flex">
                      <Plus size={16} />
                    </motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-[3.1rem] pr-12 text-[19px] leading-relaxed text-ink-soft">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
