import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav, todayFeed } from "../data/content";

function Ticker() {
  const items = [
    ...todayFeed.map((i) => `${i.tag} — ${i.heading}`),
    "REVISION CYCLE — DAY 1 · 3 · 7 · 21",
  ];
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden bg-ink py-2 text-paper lg:-mr-10" aria-hidden="true">
      <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em]">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{text}</span>
            <span className="text-vermilion">■</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Navbar({ onJoin }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Ticker />
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sticky top-0 z-50 border-b-2 transition-colors duration-300 ${
          scrolled ? "border-ink bg-paper/95 backdrop-blur-md" : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 sm:px-8 py-3.5">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <img src="/granvayalogo.jpg" alt="Granvaya Logo" className="h-9 w-auto border-2 border-ink" />
            <span className="font-display text-[24px] leading-none text-ink">Granvaya</span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[12px] font-medium uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-vermilion"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button
              onClick={onJoin}
              className="border-2 border-ink bg-marker px-5 py-2 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink shadow-block-sm transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            >
              Join the pilot
            </button>
          </div>

          <button
            className="md:hidden border-2 border-ink p-2.5 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden border-t-2 border-ink bg-paper px-5 pb-5"
          >
            <div className="flex flex-col pt-2">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/20 py-3 font-mono text-[13px] uppercase tracking-[0.16em] text-ink-soft"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onJoin();
                }}
                className="mt-4 border-2 border-ink bg-marker px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-ink shadow-block-sm"
              >
                Join the pilot
              </button>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
