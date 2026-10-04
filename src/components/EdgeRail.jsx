import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const WORDS = [
  { text: "Revise", tone: "text-paper" },
  { text: "Retain", tone: "text-marker" },
  { text: "Reproduce", tone: "text-paper" },
];

const BASE_SPEED = 38; // px per second when the page is still
const TICKER_H = 33; // height of the top ticker bar the rail must clear

function Sequence({ innerRef }) {
  return (
    <div ref={innerRef} className="flex shrink-0 flex-col items-center gap-5 py-5">
      {WORDS.map((w) => (
        <div key={w.text} className="flex flex-col items-center gap-5">
          <span
            className={`font-mono text-[10px] font-medium uppercase tracking-[0.4em] [writing-mode:vertical-rl] lg:text-[12px] ${w.tone}`}
          >
            {w.text}
          </span>
          <span className="h-1.5 w-1.5 bg-vermilion lg:h-2 lg:w-2" />
        </div>
      ))}
    </div>
  );
}

// A slim vertical ticker down the right edge of the page. It drifts on its own and
// speeds up in the direction you scroll.
export default function EdgeRail() {
  const reduce = useReducedMotion();
  const blockRef = useRef(null);
  const [blockH, setBlockH] = useState(0);
  const y = useMotionValue(0);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smoothVelocity, [-2000, 0, 2000], [-5, 0, 5], { clamp: false });
  // sit below the ticker at the top of the page, then slide up to the edge as the ticker scrolls away
  const top = useTransform(scrollY, [0, TICKER_H], [TICKER_H, 0]);

  useLayoutEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const measure = () => setBlockH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduce || !blockH) return;
    // scrolling down pushes the text up, like the page itself; scrolling up reverses it
    const move = (BASE_SPEED * (1 + boost.get()) * delta) / 1000;
    let next = y.get() - move;
    if (next <= -blockH) next += blockH;
    if (next > 0) next -= blockH;
    y.set(next);
  });

  return (
    <motion.aside
      aria-hidden="true"
      className="fixed bottom-0 right-0 z-[55] w-6 overflow-hidden border-l border-paper/20 bg-ink lg:w-10"
      style={{
        top,
        maskImage: "linear-gradient(to bottom, #000 0, #000 93%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0, #000 93%, transparent 100%)",
      }}
    >
      <motion.div style={{ y }} className="flex flex-col items-center">
        {/* enough copies to cover a tall screen, the first is measured for the loop */}
        <Sequence innerRef={blockRef} />
        <Sequence />
        <Sequence />
        <Sequence />
        <Sequence />
      </motion.div>
    </motion.aside>
  );
}
