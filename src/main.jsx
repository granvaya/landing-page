import { StrictMode } from "react";
import { ViteReactSSG } from "vite-react-ssg/single-page";
import "./index.css";
import App from "./App.jsx";

// Built with `vite-react-ssg build`: the page's HTML is written at build time so crawlers and
// link previews get real text, then React hydrates it in the browser.
export const createRoot = ViteReactSSG(
  <StrictMode>
    <App />
  </StrictMode>
);
