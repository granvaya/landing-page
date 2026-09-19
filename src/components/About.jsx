import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ChevronDown } from "lucide-react";
import { about, trust } from "../data/content";
import { SectionEyebrow } from "./Section";

export default function About() {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <section id="trust" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-cream-deep p-8 sm:p-10"
          >
            <img src="/granvayalogo.jpg" alt="Granvaya" className="h-11 w-auto rounded-xl" />
            <SectionEyebrow>{about.kicker}</SectionEyebrow>
            <p className="font-display mt-4 text-[22px] leading-snug text-ink">
              {about.body}
            </p>
          </motion.div>

          <div>
            <h3 className="font-display text-[22px] text-ink">What you can hold us to</h3>
            <div className="mt-6 flex flex-col gap-5">
              {trust.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3.5 border-b border-cream-line pb-5 last:border-none"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-soft text-sage">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5L4.5 9L10 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{t.title}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">{t.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => setShowPdf((v) => !v)}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-navy/20 px-5 py-2.5 text-[14px] font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
            >
              <FileText size={15} />
              {showPdf ? "Hide sample notes" : "View sample notes"}
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${showPdf ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Inline PDF Viewer */}
        <AnimatePresence>
          {showPdf && (
            <motion.div
              key="pdf-viewer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-10 rounded-3xl border border-cream-line bg-cream-deep overflow-hidden shadow-soft">
                {/* Header bar */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-cream-line bg-white">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-cream">
                      <FileText size={14} />
                    </span>
                    <span className="text-[13.5px] font-semibold text-ink">Ethanol Blended Fuels — Sample Note</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="/ethanol-blended-fuels.pdf"
                      download
                      className="text-[12.5px] font-medium text-navy hover:underline"
                    >
                      Download PDF
                    </a>
                    <button
                      onClick={() => setShowPdf(false)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-deep text-ink-soft hover:bg-cream-line transition-colors"
                      aria-label="Close PDF"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
                {/* PDF Embed */}
                <iframe
                  src="/ethanol-blended-fuels.pdf"
                  title="Ethanol Blended Fuels Sample Note"
                  className="w-full"
                  style={{ height: "780px", border: "none" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

