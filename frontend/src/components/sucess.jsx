import React from "react";
import { useNavigate } from "react-router";

export const Success = () => {
  const navigate = useNavigate();
  return (
    <div
      className="container"
      style={{ marginTop: "6rem", marginBottom: "1rem" }}
    >
      <div className="card">
        <img
          width={"100%"}
          src="https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png"
          className="card-img"
          alt="..."
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => navigate("/products")}
            className="btn btn-success"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="btn btn-warning"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};
