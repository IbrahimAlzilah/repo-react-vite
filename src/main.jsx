import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Style Imports
import "./index.css";
// Generated Icon CSS Imports
import "./assets/icons/sma-icons/css/style.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
