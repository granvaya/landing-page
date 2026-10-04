import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ChevronDown } from "lucide-react";
import { about, trust } from "../data/content";
import { SectionEyebrow } from "./Section";

export default function About() {
  const [showPdf, setShowPdf] = useState(false);

  return (
    <section id="trust" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative self-start border-2 border-ink bg-paper-hi p-8 shadow-block sm:p-10"
          >
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <img src="/granvayalogo.jpg" alt="Granvaya" className="h-12 w-auto shrink-0 border-2 border-ink" />
              <SectionEyebrow no="06">{about.kicker}</SectionEyebrow>
            </div>
            <span className="font-display mt-6 block h-12 text-[6rem] leading-[0.9] text-vermilion" aria-hidden="true">
              “
            </span>
            <p className="text-[25px] italic leading-[1.35] text-ink sm:text-[28px]">{about.body}</p>
          </motion.div>

          <div>
            <h3 className="font-display border-b-4 border-double border-ink pb-3 text-[32px] leading-none text-ink">
              What you can hold us to
            </h3>
            <div className="flex flex-col">
              {trust.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-5 border-b border-ink/30 py-5"
                >
                  <span className="font-display w-9 shrink-0 text-[2.2rem] leading-[0.9] text-vermilion">{i + 1}</span>
                  <div>
                    <p className="text-[19px] font-semibold leading-snug text-ink">{t.title}</p>
                    <p className="mt-1 text-[17px] leading-relaxed text-ink-soft">{t.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => setShowPdf((v) => !v)}
              className="mt-7 inline-flex items-center gap-2.5 border-2 border-ink bg-paper-hi px-5 py-3 font-mono text-[12.5px] font-medium uppercase tracking-[0.12em] text-ink shadow-block-sm transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-marker hover:shadow-none"
            >
              <FileText size={15} />
              {showPdf ? "Hide sample notes" : "View sample notes"}
              <ChevronDown size={15} className={`transition-transform duration-300 ${showPdf ? "rotate-180" : ""}`} />
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
              <div className="mt-12 overflow-hidden border-2 border-ink bg-paper-hi shadow-block">
                <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 text-paper">
                  <div className="flex items-center gap-3">
                    <FileText size={15} className="text-marker" />
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em]">
                      Ethanol Blended Fuels — Sample Note
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="/ethanol-blended-fuels.pdf"
                      download
                      className="font-mono text-[12px] uppercase tracking-[0.12em] underline decoration-marker decoration-2 underline-offset-4 hover:text-marker"
                    >
                      Download PDF
                    </a>
                    <button
                      onClick={() => setShowPdf(false)}
                      className="flex h-7 w-7 items-center justify-center border border-paper/40 transition-colors hover:bg-paper hover:text-ink"
                      aria-label="Close PDF"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
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
