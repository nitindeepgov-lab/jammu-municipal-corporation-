import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { validateEnvironment } from "./config/api.js";

// Validate environment variables on startup
validateEnvironment();

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <App />
    <Analytics />
  </ErrorBoundary>,
);
