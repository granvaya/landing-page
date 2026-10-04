import { useEffect, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "Sat, 4 Oct" — the visitor's own date, so it matches the day on their newspaper
export function formatToday(d = new Date()) {
  return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

// Returns today's date label and rolls it over at midnight if the tab stays open.
export function useToday() {
  const [label, setLabel] = useState(() => formatToday());

  useEffect(() => {
    let timer;
    const schedule = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
      timer = setTimeout(() => {
        setLabel(formatToday());
        schedule();
      }, nextMidnight - now);
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  return label;
}
