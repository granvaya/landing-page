import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const correctOpt = revisionCard.options.find((o) => o.correct);

  return (
    <div className="w-full sm:max-w-[560px] border-2 border-ink bg-paper-hi shadow-block">
      <div className="flex items-center justify-between bg-ink px-4 py-2.5 text-paper">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          Answer sheet · {revisionCard.day}
        </span>
        <div className="flex items-center gap-4 font-mono text-[11.5px] uppercase tracking-[0.1em]">
          <span>
            <span className="text-vermilion">▲</span> {streak}d
          </span>
          <span>
            <span className="text-marker">●</span> {coins}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        {revisionCard.matrix && (
          <div className="overflow-x-auto border-2 border-ink">
            <table className="w-full min-w-[480px] border-collapse text-left text-[10px] sm:text-[11.5px]">
              <thead>
                <tr className="bg-paper-deep">
                  {revisionCard.matrix.headers.map((h, i) => (
                    <th
                      key={i}
                      className="border-b-2 border-r border-ink p-1.5 font-mono font-medium uppercase leading-tight tracking-wide text-ink last:border-r-0 sm:p-2"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {revisionCard.matrix.rows.map((row, i) => (
                  <tr key={i} className="border-b border-ink/40 last:border-b-0">
                    <td className="border-r border-ink bg-paper-deep/50 p-1.5 font-semibold leading-tight text-ink sm:p-2">
                      {row.executive}
                    </td>
                    {row.cols.map((col, j) => (
                      <td key={j} className="border-r border-ink/40 p-1.5 leading-tight text-ink last:border-r-0 sm:p-2">
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-4 text-[17px] font-medium leading-snug text-ink sm:text-[19px]">{revisionCard.question}</p>

        <div className="mt-4 flex flex-col gap-2">
          {revisionCard.options.map((opt, idx) => {
            const isSelected = selected === opt.id;
            const showResult = selected !== null;

            let row = "border-ink/30 bg-transparent hover:bg-marker-soft/70 hover:border-ink";
            let bubble = "border-ink bg-transparent text-ink";
            if (showResult && opt.correct) {
              row = "border-pine bg-pine-soft";
              bubble = "border-pine bg-pine text-paper-hi";
            } else if (showResult && isSelected) {
              row = "border-vermilion bg-vermilion-soft";
              bubble = "border-vermilion bg-vermilion text-paper-hi";
            } else if (showResult) {
              row = "border-ink/15 opacity-60";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handlePick(opt)}
                disabled={showResult}
                className={`flex items-center gap-3.5 border-2 px-3 py-2.5 text-left text-[17px] font-medium text-ink transition-colors ${row}`}
              >
                {/* OMR-style bubble */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[12px] font-medium transition-colors ${bubble}`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt.label}
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
              <div className="mt-4 flex items-center justify-between gap-4 border-t-2 border-ink pt-3">
                <p className="text-[16px] italic text-ink-soft">
                  {selected === correctOpt.id
                    ? "Nice — that's a full house for today."
                    : "Filed for extra practice on Day 14."}
                </p>
                <button
                  onClick={reset}
                  className="shrink-0 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink underline decoration-vermilion decoration-2 underline-offset-4"
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
