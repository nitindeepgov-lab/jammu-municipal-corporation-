import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";
import { validateEnvironment } from "./config/api.js";

// Validate environment variables on startup
validateEnvironment();

// Note: ErrorBoundary is now inside App.jsx wrapping the router,
// so it can render a meaningful fallback within the app shell.
createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Analytics />
  </>,
);
