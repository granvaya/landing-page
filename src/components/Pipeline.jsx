import { motion } from "framer-motion";
import "./pipeline/granvaya-pipeline.js";
import { SectionHeading } from "./Section";

export default function Pipeline() {
  return (
    <section id="pipeline" className="border-t-2 border-ink py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          no="04"
          eyebrow="Inside the press"
          title="Every story sorted, filed and linked."
          sub="Watch a day's papers go in. Most of it is dropped. What matters becomes one note on one timeline, filed under its syllabus topic and linked to the rest."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-[1100px] border-2 border-ink shadow-block"
        >
          <granvaya-pipeline links="keep" />
        </motion.div>

        <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          Illustration · sample stories, not live data
        </p>
      </div>
    </section>
  );
}
