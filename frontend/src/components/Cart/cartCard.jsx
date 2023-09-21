import React, { useState, useEffect } from "react";
import axios from "axios";

export const CartCard = () => {
    const [cart, setCart] = useState([]);
    const authToken = localStorage.getItem("auth") || "";

  useEffect(() => {
    handleGetCart();
  }, []);

  const handleGetCart = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8008/v1/cart", {
        headers: { authorization: authToken },
      });
      // console.log(response.data.cart);
      setCart((prev) => response.data.cart);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(cart);



  return (
    <div className="user-cart">
      {cart.map((el) => (
        <div className="cart-card">
          <div>
            <img src={el.productId.image} alt={el.productId._id}/>
          </div>
          <div>
            <h5>{el.productId.title}</h5>
            <p style={{ display: "inline" }}>{el.productId.desc}</p>|
            <span>{el.productId.offer}</span>
            <h6>Price : ₹{el.productId.price}/-</h6>
            <div className="edit-cart">
              <div className="edit-cart-buttons">
                <button className="btn btn-warning">-</button>{" "}
                <span>{el.quantity}</span>{" "}
                <button className="btn btn-warning">+</button>
              </div>
              <button className="btn btn-warning">Remove </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
