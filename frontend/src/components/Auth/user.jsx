import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CartCard } from "../Cart/cartCard";
import axios from "axios";
import { useBill } from "../Context/billContext";
import StripeCheckout from "react-stripe-checkout";
import jwt_decode from "jwt-decode"

export const UserData = () => {
  const { bill } = useBill();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth");
  const [isPayform, setIsPayment] = useState(false);
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

  const handleCheckOut = () => {
    setIsPayment(true);
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
          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "space-between",
              padding: "0 10px",
            }}
          >
            <input
              type="text"
              placeholder=" apply promo code"
              className="form-control"
            />
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

          {isPayform ? (
            <Payment props={user} />
          ) : (
            <button
              onClick={handleCheckOut}
              style={{ width: "100%" }}
              className="btn btn-info"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const Payment = ({ props }) => {
  const { bill } = useBill();
  const authToken = localStorage.getItem("auth");
  const decoded = jwt_decode(authToken);
  
  const total = Math.ceil(bill + (bill * 18) / 100) ;
  const makePayment = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8008/v1/payment", {total:total,token:decoded}, {
        headers: { Authorization: authToken },
      });
      if(res){
        alert('Payment Successfull')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <StripeCheckout
      stripeKey="pk_test_51IpCbmSDFH7JnKZtGOHgv4OPFIgfL6qt5wiulTxTbrU0sI7PHGZkHFz08Cazv7bg1U7UijviNIuumD65xtUtGq6Q00hvnlDpnz"
      token={makePayment}
      name={props.name}
      amount={(bill + (bill * 18) / 100) * 100}
      currency="INR"
      image={props.image}
      shippingAddress
      billingAddress
    >
      <button b className="btn btn-success w-100">
        Pay Now
      </button>
    </StripeCheckout>
  );
};
