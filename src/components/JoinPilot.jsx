import { motion } from "framer-motion";
import { forwardRef } from "react";
import SignupForm from "./SignupForm";

const JoinPilot = forwardRef(function JoinPilot(_, ref) {
  return (
    <section id="join" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-ink">Join the pilot</h2>
          <p className="mx-auto mt-3 max-w-md text-[15.5px] text-ink-soft">
            We're opening a small pilot. Join free and help shape the app.
          </p>
        </motion.div>

        <div className="mt-10">
          <SignupForm formRef={ref} />
        </div>
      </div>
    </section>
  );
});

export default JoinPilot;
