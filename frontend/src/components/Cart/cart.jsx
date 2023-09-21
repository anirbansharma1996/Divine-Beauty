import React from "react";
import { CartCard } from "./cartCard";

export const Cart = () => {
  return (
    <>
      <div
        className="section-title"
        style={{ marginTop: "6rem", marginBottom: "1rem" }}
      >
        <h2>cart</h2>
      </div>
      <div className="container">
        <CartCard />
      </div>
    </>
  );
};
