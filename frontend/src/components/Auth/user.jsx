import React from "react";
import { CartCard } from "../Cart/cartCard";

export const UserData = () => {
  return (
    <div
      className="container"
      style={{ marginTop: "6rem", marginBottom: "1rem" }}
    >
      <div className="section-title">
        <h2>User Information</h2>
      </div>
      <div className="user-container">
         <CartCard/>

        <div className="user-details"></div>
      </div>
    </div>
  );
};
