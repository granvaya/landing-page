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
    <section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading title="Built around how UPSC actually asks." align="center" />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-cream-line bg-white p-6 transition-shadow hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream-deep text-navy transition-colors group-hover:bg-navy group-hover:text-cream">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-[18px] text-ink">{f.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
