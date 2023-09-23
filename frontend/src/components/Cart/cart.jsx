import React from "react";
import { CartCard } from "./cartCard";

export const Cart = () => {
  return (
    <>
      <div
        className="section-title"
        style={{ marginTop: "6rem", marginBottom: "1rem" }}
      >
        <h2 style={{marginBottom:"-2.5rem"}}>cart</h2>
      </div>
      <div className="container" >
        <CartCard />
      </div>
    </>
  );
};
