import { useEffect, useState } from "react";

// Renders its children only in the browser, after mount. The prerender and the first hydration
// pass both render nothing, so browser-only parts (WebGL, the edge rail) never run on the server.
// Our own version because vite-react-ssg's ClientOnly lives in its main entry, which needs
// react-router-dom (not used in single-page mode, so not installed).
export default function ClientOnly({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children() : null;
}
