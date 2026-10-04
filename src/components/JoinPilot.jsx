import { motion } from "framer-motion";
import { forwardRef } from "react";
import SignupForm from "./SignupForm";

const JoinPilot = forwardRef(function JoinPilot(_, ref) {
  return (
    <section id="join" className="border-y-2 border-ink bg-marker py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.24em] text-ink">
            ■ &nbsp;Classifieds · Early access&nbsp; ■
          </p>
          <h2 className="font-display mt-4 text-[3rem] leading-[0.98] text-ink sm:text-[5rem]">Join the pilot</h2>
          <p className="mx-auto mt-4 max-w-md text-[20px] leading-snug text-ink">
            We're opening a small pilot. Join free and help shape the app.
          </p>
        </motion.div>

        <div className="mt-12">
          <SignupForm formRef={ref} />
        </div>
      </div>
    </section>
  );
});

export default JoinPilot;
