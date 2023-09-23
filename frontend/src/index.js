import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { BillProvider } from "./components/Context/billContext";
import { CartProvider } from "./components/Context/cartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider>
      <BillProvider>
        <App />
      </BillProvider>
    </CartProvider>
  </BrowserRouter>
);
