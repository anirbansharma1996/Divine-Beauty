import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BillProvider } from "./components/Context/billContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <BillProvider>
      <App />
    </BillProvider>
  </BrowserRouter>
);
