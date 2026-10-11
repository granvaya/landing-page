import { lazy, Suspense, useRef } from "react";
import { ClientOnly } from "vite-react-ssg";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Pipeline from "./components/Pipeline";
import ImportanceDemo from "./components/ImportanceDemo";
import About from "./components/About";
import JoinPilot from "./components/JoinPilot";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
const ScrollDissolveReveal = lazy(() =>
  import("./components/ScrollDissolveReveal").then((m) => ({ default: m.ScrollDissolveReveal }))
);
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
        <ClientOnly>
          {() => (
            <Suspense fallback={null}>
              <ScrollDissolveReveal
                imageFront="/art-front.jpg"
                imageBack="/art-back.jpg"
                containerClassName="absolute inset-0 h-full"
                className="h-screen sticky top-0 opacity-70"
              />
            </Suspense>
          )}
        </ClientOnly>
      </div>
      <div className="grain fixed inset-0 z-[60] pointer-events-none mix-blend-multiply opacity-[0.22]" />
      {/* decorative; browser-only so its repeated words never land in the prerendered HTML */}
      <ClientOnly>{() => <EdgeRail />}</ClientOnly>
      <div className="relative z-10 pr-6 lg:pr-10 bg-gradient-to-b from-paper/90 via-paper/60 to-paper/90 min-h-screen">
        <Navbar onJoin={scrollToForm} />
        <main>
          <Hero onJoin={scrollToForm} />
          <Problem />
          <HowItWorks />
          <Features />
          <Pipeline />
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

