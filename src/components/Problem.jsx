import { motion } from "framer-motion";
import { problems } from "../data/content";
import { SectionHeading } from "./Section";

export default function Problem() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading no="01" eyebrow="The leak" title="Current affairs is where most preparation leaks." />

        <div className="mt-14 grid grid-cols-1 border-y-2 border-ink sm:grid-cols-3">
          {problems.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`p-7 sm:p-9 ${i > 0 ? "border-t-2 border-ink sm:border-l-2 sm:border-t-0" : ""}`}
            >
              <span className="font-display block text-[6.5rem] leading-[0.85] text-transparent [-webkit-text-stroke:2px_var(--color-ink)]">
                {i + 1}
              </span>
              <h3 className="font-display mt-6 text-[26px] leading-[1.1] text-ink">{p.title}</h3>
              <p className="mt-3 text-[18px] leading-relaxed text-ink-soft">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
