import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, BookOpenText } from "lucide-react";
import { nav } from "../data/content";

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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md border-b border-cream-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8 py-4">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <img 
            src="/granvayalogo.jpg" 
            alt="Granvaya Logo" 
            className="h-8 w-auto rounded-lg" 
          />
          <span className="font-display text-[19px] font-medium text-ink">Granvaya</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={onJoin}
            className="rounded-full bg-navy px-5 py-2.5 text-[14px] font-semibold text-cream shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-navy-deep active:translate-y-0"
          >
            Join the pilot
          </button>
        </div>

        <button
          className="md:hidden rounded-md p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-cream-line bg-cream px-5 pb-5"
        >
          <div className="flex flex-col gap-1 pt-3">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-cream-deep"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onJoin();
              }}
              className="mt-2 rounded-full bg-navy px-5 py-2.5 text-[14px] font-semibold text-cream"
            >
              Join the pilot
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
