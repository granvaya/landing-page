import { useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import ImportanceDemo from "./components/ImportanceDemo";
import About from "./components/About";
import JoinPilot from "./components/JoinPilot";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { ScrollDissolveReveal } from "./components/ScrollDissolveReveal";

export default function App() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      formRef.current?.querySelector("input")?.focus();
    }, 400);
  };

  return (
    <div className="min-h-screen text-ink relative">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <ScrollDissolveReveal
          imageFront="/art-front.jpg"
          imageBack="/art-back.jpg"
          containerClassName="absolute inset-0 h-full"
          className="h-screen sticky top-0 opacity-70"
        />
        <div className="fixed inset-0 z-0 mix-blend-overlay pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      </div>
      <div className="relative z-10 bg-gradient-to-b from-cream/90 via-cream/50 to-cream/90 min-h-screen">
        <Navbar onJoin={scrollToForm} />
        <main>
          <Hero onJoin={scrollToForm} />
          <Problem />
          <HowItWorks />
          <Features />
          <ImportanceDemo />
          <About />
          <JoinPilot ref={formRef} />
          <FAQ />
        </main>
        <Footer />
      </div>
    </div>
  );
}
