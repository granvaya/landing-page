import { motion } from "framer-motion";
import { Route, Grid3x3, TriangleAlert, PenLine, Repeat2, Map } from "lucide-react";
import { features } from "../data/content";
import { SectionHeading } from "./Section";

const iconMap = {
  route: Route,
  grid: Grid3x3,
  "triangle-alert": TriangleAlert,
  "pen-line": PenLine,
  "repeat-2": Repeat2,
  map: Map,
};

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading no="03" eyebrow="The toolkit" title="Built around how UPSC actually asks." />

        {/* shared 2px rules between cells, like a printed table */}
        <div className="mt-14 grid grid-cols-1 gap-[2px] border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                className="group bg-paper-hi p-7 transition-colors duration-200 hover:bg-ink sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink-faint transition-colors group-hover:text-paper/60">
                    No. {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center border-2 border-ink text-ink transition-colors group-hover:border-marker group-hover:bg-marker">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                </div>
                <h3 className="font-display mt-9 text-[25px] leading-[1.1] text-ink transition-colors group-hover:text-paper">
                  {f.title}
                </h3>
                <p className="mt-3 text-[18px] leading-relaxed text-ink-soft transition-colors group-hover:text-paper/75">
                  {f.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
