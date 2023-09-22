import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CartCard } from "../Cart/cartCard";
import axios from "axios";
import { useBill } from "../Context/billContext";

export const UserData = () => {
  const { bill } = useBill();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth");
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8008/v1/user-details", {
        headers: { Authorization: authToken },
      });
      setUser((prev) => res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(bill);
  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("Total");
    localStorage.removeItem("product");
    setTimeout(() => {
      navigate("/log-in");
    }, 1200);
    window.location.reload();
  };

  return (
    <div
      className="container"
      style={{ marginTop: "6rem", marginBottom: "1rem" }}
    >
      <div className="section-title">
        <h2>User Information</h2>
      </div>
      <div className="user-container">
        <CartCard />
        <div className="user-details">
          <div className="user-details-div">
            <img
              width={40}
              style={{ borderRadius: "100%" }}
              src={user.image}
              alt={user.mobileNumber}
            />{" "}
            <h4>
              {" "}
              <b>{user.name}</b>
            </h4>
            <button onClick={handleLogout} className="btn btn-danger">
              Log Out
            </button>
          </div>
          <p>
            {" "}
            <b> User Email : </b>
            {user.email}
          </p>
          <p style={{ marginTop: "-1rem" }}>
            <b> Delivery Address :</b> {user.address}
          </p>
          <p style={{ marginTop: "-1rem" }}>
            {" "}
            <b>Contact :</b> {user.mobileNumber}
          </p>
          <hr />
          <div  style={{
              display: "flex",
              gap:"10px",
              justifyContent: "space-between",
              padding:'0 10px'
            }}>
            <input type="text" placeholder=" apply promo code"  className="form-control" />
            <button className="btn btn-success">apply</button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <h5>Amount</h5>
            <p>₹ {bill}/-</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: " 0 10px",
              marginTop: "-1.5rem",
            }}
          >
            <h6 style={{ color: "GrayText" }}>GST</h6>
            <p>₹ {(bill * 18) / 100}/-</p>
          </div>
          <hr style={{ marginTop: "-0.7rem" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: " 0 10px",
              marginTop: "-0.6rem",
            }}
          >
            <h5 style={{ color: "GrayText" }}>Total</h5>
            <p>₹ {bill + (bill * 18) / 100}/-</p>
          </div>
          <button style={{width:"100%"}} className="btn btn-info">Pay Now</button>
        </div>
      </div>
    </div>
  );
};
