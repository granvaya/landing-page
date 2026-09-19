import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Flame, Coins } from "lucide-react";
import { revisionCard } from "../data/content";

export default function RevisionQuiz() {
  const [selected, setSelected] = useState(null);
  const [streak, setStreak] = useState(revisionCard.streak);
  const [coins, setCoins] = useState(revisionCard.coins);

  const handlePick = (opt) => {
    if (selected) return;
    setSelected(opt.id);
    if (opt.correct) {
      setStreak((s) => s + 1);
      setCoins((c) => c + 20);
    }
  };

  const reset = () => setSelected(null);

  return (
    <div className="relative w-full">
      <div className="absolute -left-2 sm:-left-5 -bottom-3 sm:-bottom-5 h-full w-full rounded-[20px] sm:rounded-[28px] bg-sage-soft/60 -z-10" />

      <div className="w-full sm:max-w-[550px] rounded-[20px] sm:rounded-[28px] border border-cream-line bg-white p-4 sm:p-5 shadow-lift">
        <div className="flex items-center justify-between px-1">
          <span className="rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cream">
            {revisionCard.day}
          </span>
          <div className="flex items-center gap-3 text-[12px] font-semibold text-ink-soft">
            <span className="flex items-center gap-1">
              <Flame size={13} className="text-terracotta" /> {streak}d
            </span>
            <span className="flex items-center gap-1">
              <Coins size={13} className="text-gold" /> {coins}
            </span>
          </div>
        </div>

        {revisionCard.matrix && (
          <div className="mt-3 -mx-1 overflow-x-auto rounded-lg border border-cream-line">
            <table className="w-full min-w-[480px] text-left text-[9px] sm:text-[11px] border-collapse">
              <thead>
                <tr className="bg-cream/50">
                  {revisionCard.matrix.headers.map((h, i) => (
                    <th key={i} className="border-b border-r border-cream-line p-1.5 sm:p-2 font-semibold text-ink-soft last:border-r-0 leading-tight">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {revisionCard.matrix.rows.map((row, i) => (
                  <tr key={i} className="border-b border-cream-line last:border-b-0">
                    <td className="border-r border-cream-line p-1.5 sm:p-2 font-semibold text-ink-soft bg-cream/20 leading-tight">
                      {row.executive}
                    </td>
                    {row.cols.map((col, j) => (
                      <td key={j} className="border-r border-cream-line p-1.5 sm:p-2 text-ink last:border-r-0 leading-tight">
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-3 px-1 text-[13px] sm:text-[15px] font-medium leading-snug text-ink">
          {revisionCard.question}
        </p>

        <div className="mt-4 flex flex-col gap-2.5">
          {revisionCard.options.map((opt) => {
            const isSelected = selected === opt.id;
            const showResult = selected !== null;
            const isCorrect = opt.correct;

            let cls =
              "border-cream-line bg-cream/40 hover:bg-cream text-ink-soft";
            if (showResult && isCorrect) {
              cls = "border-sage bg-sage-soft text-sage";
            } else if (showResult && isSelected && !isCorrect) {
              cls = "border-terracotta bg-terracotta-soft text-terracotta";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handlePick(opt)}
                disabled={showResult}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[13.5px] font-medium transition-colors ${cls}`}
              >
                {opt.label}
                {showResult && isCorrect && <Check size={16} />}
                {showResult && isSelected && !isCorrect && <X size={16} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 flex items-center justify-between rounded-xl bg-cream-deep px-4 py-3">
                <p className="text-[12.5px] text-ink-soft">
                  {revisionCard.options.find((o) => o.correct).correct && selected === revisionCard.options.find((o) => o.correct).id
                    ? "Nice — that's a full house for today."
                    : "Filed for extra practice on Day 14."}
                </p>
                <button
                  onClick={reset}
                  className="shrink-0 text-[12px] font-semibold text-navy underline underline-offset-2"
                >
                  Try again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
