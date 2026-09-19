import { motion } from "framer-motion";
import { Clock, Copy, CalendarX } from "lucide-react";
import { problems } from "../data/content";
import { SectionHeading } from "./Section";

const icons = [Clock, Copy, CalendarX];

export default function Problem() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading title="Current affairs is where most preparation leaks." />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-cream-line bg-white p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cream-deep text-navy">
                  <Icon size={19} strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-[19px] text-ink">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
