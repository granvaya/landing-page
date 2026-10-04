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
import EdgeRail from "./components/EdgeRail";

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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ScrollDissolveReveal
          imageFront="/art-front.jpg"
          imageBack="/art-back.jpg"
          containerClassName="absolute inset-0 h-full"
          className="h-screen sticky top-0 opacity-70"
        />
      </div>
      <div className="grain fixed inset-0 z-[60] pointer-events-none mix-blend-multiply opacity-[0.22]" />
      <EdgeRail />
      <div className="relative z-10 pr-6 lg:pr-10 bg-gradient-to-b from-paper/90 via-paper/60 to-paper/90 min-h-screen">
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

