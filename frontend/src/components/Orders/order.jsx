import React, { useState, useEffect } from "react";
import axios from "axios";

export const Order = () => {
  const authToken = localStorage.getItem("auth");
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8008/v1/user-details", {
        headers: { Authorization: authToken },
      });

      setOrders((prev) => res.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);



  return (
    <>
      {orders.paymentHistory.length === 0 ? (
        <div 
        className="container"
          style={{ marginTop: "3.5rem" }}
        >
          <img
            className="image-fuild w-100"
            src="https://i.pinimg.com/originals/ae/bc/8c/aebc8c60e30c83f3ab34c978733dab26.png"
            alt="0-item"
          />
        </div>
      ) : (
        <div
          className="container"
          style={{ marginTop: "6rem", marginBottom: "1rem" }}
        >
          <h3>Previous Orders</h3>
          <div className="container order-data">
            {orders.paymentHistory?.map((el) => (
              <div key={el._id} className="order">
                <h6>Order ID: {el._id}</h6>
                <p style={{ marginTop: "-7px" }}>
                  {" "}
                  <i class="bi bi-cash-stack"></i> : <b>₹ {el.amount} /-</b>{" "}
                </p>
                <p style={{ marginTop: "-16px" }}>
                  {" "}
                  <i class="bi bi-geo-alt-fill"></i> : <b> {orders.address}</b>
                </p>
                <p style={{ marginTop: "-16px" }}>
                  {" "}
                  <i class="bi bi-phone-vibrate"></i> :{" "}
                  <b> +91 {orders.mobileNumber}</b>
                </p>
                <h6>ordered Items :</h6>
                <ul style={{ listStyleType: "none" }}>
                  {el.cart.map((cartItem, index) => (
                    <li style={{ margin: "5px" }} key={index}>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={cartItem.productId.image}
                        alt={cartItem.productId._id}
                      />{" "}
                      <strong>{cartItem.productId.title} </strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
