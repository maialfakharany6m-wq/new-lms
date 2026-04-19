import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

window.onerror = function (msg, url, line, col, error) {
  console.error("GLOBAL ERROR:", error);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);