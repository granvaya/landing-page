import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, PartyPopper } from "lucide-react";
import { newspapers, stages, examYears } from "../data/content";

const initialState = {
  name: "",
  email: "",
  phone: "",
  examYear: "",
  stage: "",
  papers: [],
};

export default function SignupForm({ formRef }) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const update = (key, val) => setValues((v) => ({ ...v, [key]: val }));

  const togglePaper = (paper) => {
    setValues((v) => ({
      ...v,
      papers: v.papers.includes(paper)
        ? v.papers.filter((p) => p !== paper)
        : [...v.papers, paper],
    }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Tell us what to call you.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.examYear) next.examYear = "Pick a target year.";
    if (!values.stage) next.stage = "Where are you in prep?";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScoJI4UBp_76NwRNJ1ebuYKex44AkoBzP8GDTBCu4ZM8dHW2Q/formResponse";
    const formData = new FormData();
    formData.append("entry.2103317280", values.name);
    formData.append("entry.626263444", values.email);
    if (values.phone) formData.append("entry.1217300461", values.phone);
    formData.append("entry.1001422168", values.examYear);
    formData.append("entry.600406411", values.stage);
    
    values.papers.forEach(paper => {
      formData.append("entry.1612143124", paper);
    });

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      // With no-cors, we can't read the response, so we assume success if no network error thrown
      setStatus("success");
    } catch (error) {
      console.error("Error submitting form", error);
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-sage/30 bg-sage-soft px-8 py-14 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage text-white">
          <PartyPopper size={24} />
        </span>
        <h3 className="font-display mt-5 text-2xl text-ink">You're on the list, {values.name.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-sm text-[14.5px] text-ink-soft">
          We'll email <span className="font-semibold text-ink">{values.email}</span> as pilot seats open for the{" "}
          {values.examYear} attempt. Keep an eye on your inbox.
        </p>
        <button
          onClick={() => {
            setValues(initialState);
            setStatus("idle");
          }}
          className="mt-6 text-[13.5px] font-semibold text-navy underline underline-offset-2"
        >
          Sign up another email
        </button>
      </motion.div>
    );
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="rounded-3xl border border-cream-line bg-white p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your full name"
            className={inputCls(errors.name)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputCls(errors.email)}
          />
        </Field>
        <Field label="Phone / WhatsApp" optional>
          <input
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="Optional"
            className={inputCls()}
          />
        </Field>
        <Field label="Target exam year" error={errors.examYear}>
          <select
            value={values.examYear}
            onChange={(e) => update("examYear", e.target.value)}
            className={inputCls(errors.examYear)}
          >
            <option value="">Select year</option>
            {examYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </Field>
        <Field label="Stage" error={errors.stage} full>
          <select
            value={values.stage}
            onChange={(e) => update("stage", e.target.value)}
            className={inputCls(errors.stage)}
          >
            <option value="">Where are you in prep?</option>
            {stages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <p className="mb-2.5 text-[13px] font-semibold text-ink-soft">Newspaper you read</p>
        <div className="flex flex-wrap gap-2.5">
          {newspapers.map((paper) => {
            const checked = values.papers.includes(paper);
            return (
              <button
                type="button"
                key={paper}
                onClick={() => togglePaper(paper)}
                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  checked
                    ? "border-navy bg-navy text-cream"
                    : "border-cream-line text-ink-soft hover:border-navy/30"
                }`}
              >
                {checked && <Check size={12} />}
                {paper}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-cream shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={17} className="animate-spin" /> Requesting access…
          </>
        ) : (
          "Request early access"
        )}
      </button>
    </form>
  );
}

function Field({ label, error, optional, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-ink-soft">
        {label}
        {optional && <span className="text-[11px] font-normal text-ink-faint">Optional</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-[12px] font-medium text-terracotta"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(error) {
  return `w-full rounded-xl border bg-cream/40 px-4 py-[11px] text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-faint focus:bg-white ${
    error ? "border-terracotta" : "border-cream-line focus:border-navy/40"
  }`;
}
