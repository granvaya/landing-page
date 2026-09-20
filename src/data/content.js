// Central content store — every section reads from here, so copy and
// structure can change in one place without touching component markup.

export const nav = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Trust", href: "#trust" },
  { label: "Questions", href: "#faq" },
];

export const hero = {
  eyebrow: "Current affairs for UPSC",
  headline: "Read the news once. Remember it on exam day.",
  sub: "Granvaya turns daily current affairs into syllabus linked notes, then revises them with you on Day 1, 3, 7 and 21 — so nothing you read is wasted.",
  ctaPrimary: "Join the early access pilot",
  ctaSecondary: "See how it works",
  stat: { value: 21, suffix: "-day", label: "spaced revision cycle, built in" },
};

export const todayFeed = [
  {
    tag: "FRESH",
    tagTone: "new",
    time: "Fri, 19 Sep",
    heading: "Coastal Regulation Zone rules revised",
    meta: "GS 3 · Environment",
  },
  {
    tag: "ADDENDUM",
    tagTone: "update",
    time: "",
    heading: "New round of India–EU trade talks",
    meta: "GS 2 · International Relations",
  },
  {
    tag: "GOOD TO KNOW",
    tagTone: "info",
    time: "",
    heading: "Fiscal deficit target added to your April note",
    meta: "GS 3 · Economy",
  },
  {
    tag: "REVISION",
    tagTone: "revise",
    time: "Day 7",
    heading: "GI tag for a Kutch handicraft: one quick check due",
    meta: "GS 1 · Culture",
  },
];

export const problems = [
  {
    title: "Hours of note making, every day",
    body: "You retype the same paragraph from three different papers before you even reach the syllabus mapping.",
  },
  {
    title: "The same story, five places",
    body: "One event, five write ups, zero clarity about which version to trust on exam day.",
  },
  {
    title: "Read in March, forgotten by May",
    body: "Without a revision schedule, even good notes decay. Prelims doesn't wait for you to catch up.",
  },
];

export const steps = [
  {
    n: "01",
    title: "Read",
    body: "Each morning, only what matters; sorted into fresh stories, updates to stories you already know, and good to know items.",
  },
  {
    n: "02",
    title: "Connect",
    body: "Every story lives on one timeline, filed under the exact GS syllabus topic, with links to others where it helps your answers.",
  },
  {
    n: "03",
    title: "Revise",
    body: "Short quizzes land on Day 1, 3, 7 and 21. Get one wrong and it's back in rotation; so your weak spots get extra practice.",
  },
];

export const revisionCard = {
  day: "Day 7",
  question: "Refer to the matrix above. How many of the entries from I to VIII are incorrect?",
  matrix: {
    headers: ["Executive", "Oath administered by", "Grounds of removal as per the constitution", "Removal proceedings initiated in", "Conduction of election after vacancy in office by removal"],
    rows: [
      {
        executive: "President",
        cols: ["I: Vice President", "III: Violation of Constitution", "V: Lok Sabha", "VII: Within 6 months"]
      },
      {
        executive: "Vice President",
        cols: ["II: President", "IV: Violation of constitution", "VI: Rajya Sabha", "VIII: Within 6 months"]
      }
    ]
  },
  options: [
    { id: "a", label: "Only one", correct: false },
    { id: "b", label: "Only two", correct: false },
    { id: "c", label: "Only three", correct: false },
    { id: "d", label: "Only four", correct: true },
  ],
  streak: 14,
  coins: 320,
};

export const features = [
  {
    icon: "route",
    title: "One story, one timeline",
    body: "Updates are added to the same page with dates, never duplicated.",
  },
  {
    icon: "grid",
    title: "Mapped to GS 1–4",
    body: "Every note sits under its syllabus topic, with cross links across papers.",
  },
  {
    icon: "triangle-alert",
    title: "Prelims traps flagged",
    body: "A marker flags facts examiners like to twist: ministry, statutory status, membership, firsts.",
  },
  {
    icon: "pen-line",
    title: "Mains-ready points",
    body: "Keyword, explanation and a fresh example for each point; ready to write, not just read.",
  },
  {
    icon: "repeat-2",
    title: "Spaced revision with streaks",
    body: "Day 1, 3, 7 and 21 quizzes, coins and a daily time budget you set.",
  },
  {
    icon: "map",
    title: "My Map",
    body: "See what you've mastered, what's due, what is weak and what is fading.",
  },
];

export const importanceLevels = [
  {
    id: "high",
    label: "High",
    tone: "terracotta",
    body: "Returns across papers, close to a past year pattern, or actively developing. Revise first.",
    example: "CRZ notification amendments: third GS 3 appearance this year.",
  },
  {
    id: "medium",
    label: "Medium",
    tone: "mustard",
    body: "Relevant and plausible, but hasn't shown the same pull in past papers yet.",
    example: "India-EU FTA round 9: steady but not yet a repeat theme.",
  },
  {
    id: "low",
    label: "Low",
    tone: "sage",
    body: "Good to know. Keep the gist, skip the memorisation until it resurfaces.",
    example: "State level handicraft GI tag — context only, low recall value.",
  },
];

export const about = {
  kicker: "Made by an aspirant, for aspirants",
  body: "Granvaya started as one founder's own daily note making system for UPSC preparation, refined over more than a year of actual use. It's now being built into an app with a small engineering team out of IIT IIM Founders.",
};

export const trust = [
  {
    title: "Every note is checked by a human",
    body: "Software helps us sort and link the news, but a person reviews every note before it reaches you.",
  },
  {
    title: "Mistakes are corrected openly",
    body: "In a public changelog: no silent edits, no pretending we got it right the first time.",
  },
  {
    title: "Importance is published before the exam",
    body: "Not after. You can hold our High/Medium/Low calls against how the paper actually turns out.",
  },
  {
    title: "Free sample notes, always",
    body: "Judge the quality yourself before you commit a single rupee.",
  },
];

export const newspapers = ["The Hindu", "The Indian Express", "PIB", "Other"];
export const stages = ["Just starting", "Revising", "Final stretch", "Retaking"];
export const examYears = ["2026", "2027", "2028", "Not decided"];

export const faqs = [
  {
    q: "Is Granvaya free?",
    a: "The pilot is free. Pricing will be announced before launch, and early access members get a locked in founder rate.",
  },
  {
    q: "Which newspapers do you cover?",
    a: "The Hindu, The Indian Express and PIB to start, with more sources added based on pilot feedback.",
  },
  {
    q: "Is this just AI generated notes?",
    a: "No. Software helps us sort and link the news, but every note is reviewed by a UPSC aspirant before it's published.",
  },
  {
    q: "Does it cover Prelims and Mains?",
    a: "Yes. Each note carries Prelims facts and Mains points, tagged to GS 1–4.",
  },
  {
    q: "When does it launch?",
    a: "We're running a small pilot first. Sign up and we'll keep you posted as seats open.",
  },
  {
    q: "Can I use it alongside my current notes?",
    a: "Most pilot users do: Granvaya is built to fill the revision gap, not replace the sources you already trust.",
  },
];

export const footer = {
  tagline: "Revise. Retain. Reproduce.",
  contact: "support@granvaya.in",
  links: ["Instagram", "Telegram", "X"],
  legal: ["Privacy Policy", "Terms"],
  disclaimer: "Granvaya is an independent preparation tool and is not affiliated with UPSC.",
};
