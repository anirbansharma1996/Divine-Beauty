import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { CartCard } from "../Cart/cartCard";
import axios from "axios";
import { useBill } from "../Context/billContext";
import StripeCheckout from "react-stripe-checkout";
import { useCart } from "../Context/cartContext";
import jwt_decode from "jwt-decode";

export const UserData = () => {
  const { bill } = useBill();
  const { cart } = useCart();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth");
  const [isPayform, setIsPayment] = useState(false);
  const [user, setUser] = useState([]);
  const [promo, setPromo] = useState("");
  const [total, setTotal] = useState(0);
  const [isApplied, setIsApplied] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://divine-beauty-backend-node.onrender.com/v1/user-details",
        {
          headers: { Authorization: authToken },
        }
      );
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
      window.location.reload();
    }, 1200);
  };

  const handleCheckOut = () => {
    if (!authToken) {
      navigate("/log-in");
    } else {
      if (cart.length !== 0) {
        setIsPayment(true);
      } else {
        alert("Add something to your Cart first");
      }
    }
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setPromo(e.target.value);
  };
  const handlePromo = () => {
    if (promo === "") {
      alert("No promocode applied");
    } else if (promo === "new20") {
      setTotal(Math.ceil(bill - (bill * 20) / 100));
      setIsApplied(true);
    } else {
      alert("invalid promocode");
    }
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                width={40}
                style={{ borderRadius: "100%" }}
                src={user.image}
                alt={user.mobileNumber}
              />{" "}
              <h4>
                {" "}
                &nbsp;
                <b>{user.name}</b>
              </h4>
            </div>
            <div>
              <button
                onClick={() => navigate("/orders")}
                className="btn btn-warning"
              >
                My Orders
              </button>
              &nbsp;
              <button onClick={handleLogout} className="btn btn-danger">
                Log Out
              </button>
            </div>
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
            <b>Contact :</b> +91 {user.mobileNumber}
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
              placeholder="promocode e.g.'new20'"
              className="form-control"
              onChange={handleInput}
            />
            <button
              disabled={isApplied || cart.length == 0}
              onClick={handlePromo}
              className="btn btn-success"
            >
              apply
            </button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <h5>Amount</h5>
            <p>
              {" "}
              {isApplied && <s style={{ color: "grey" }}> ₹{bill}</s>} ₹{" "}
              {total || bill} /-
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: " 0 10px",
              marginTop: "-1.5rem",
            }}
          >
            <h6 style={{ color: "GrayText" }}>Tax</h6>
            <p>
              ₹{" "}
              {(isApplied && Math.ceil((total * 18) / 100)) ||
                Math.ceil((bill * 18) / 100)}
              /-
            </p>
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
            <p style={{ fontSize: "20px", fontWeight: "700" }}>
              ₹{" "}
              {(isApplied && Math.ceil(total + (total * 18) / 100)) ||
                Math.ceil(bill + (bill * 18) / 100)}
              /-
            </p>
          </div>

          {cart.length !== 0 && isPayform ? (
            <Payment props={user} totalBill={total} isApplied={isApplied} />
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

export const Payment = ({ props, totalBill, isApplied }) => {
  const navigate = useNavigate();
  const { bill } = useBill();
  const { cart } = useCart();
  const authToken = localStorage.getItem("auth");
  const decoded = jwt_decode(authToken);

  const total = Math.ceil(bill + (bill * 18) / 100);
  const newTotal = Math.ceil(totalBill + (totalBill * 18) / 100);
  const makePayment = async () => {
    console.log("ok");
    try {
      const res = await axios.post(
        "https://divine-beauty-backend-node.onrender.com/v1/payment",
        { total: newTotal || total, token: decoded, items: cart },
        {
          headers: { Authorization: authToken },
        }
      );
      if (res) {
        alert("Payment Successfull");
        setTimeout(() => {
          navigate("/payment-success");
        }, 1200);
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
      amount={(isApplied && newTotal * 100) || (bill + (bill * 18) / 100) * 100}
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
