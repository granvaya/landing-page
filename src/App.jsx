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

export default function App() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      formRef.current?.querySelector("input")?.focus();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
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
  );
}
