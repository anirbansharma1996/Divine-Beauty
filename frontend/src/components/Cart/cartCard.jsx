import React, { useState, useEffect } from "react";
import axios from "axios";

export const CartCard = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState( localStorage.getItem('Total')||0);
  const authToken = localStorage.getItem("auth") || "";
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    handleGetCart();
}, [isDeleted]);

useEffect(() => {

  const calculatedTotal = cart.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  setTotal(calculatedTotal);
  localStorage.setItem('Total',calculatedTotal)
}, [cart, isDeleted]);

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
  //console.log(cart);
  const handleRemove = async (id) => {
    const boolean = window.confirm("items will be removed from cart");
    if (boolean) {
      try {
        await axios.delete(
          `http://127.0.0.1:8008/v1/cart/remove/${id}`,
          {
            headers: { authorization: authToken },
          }
        );
        setIsDeleted(!isDeleted);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
 
  const handleDec = (id) => {
    setCart((prevCart) =>
      prevCart.map((el) =>
        el.productId._id === id ? { ...el, quantity: el.quantity - 1 } : el
      )
    );
  };
  const handleInc = (id) => {
    setCart((prevCart) =>
      prevCart.map((el) =>
        el.productId._id === id ? { ...el, quantity: el.quantity + 1 } : el
      )
    );
  };
 
  return (
    <div className="user-cart">
      <h1>{total}</h1>
      {cart.map((el) => (
        <div className="cart-card">
          <div>
            <img src={el.productId.image} alt={el.productId._id} />
          </div>
          <div>
            <h5>{el.productId.title}</h5>
            <p style={{ display: "inline" }}>{el.productId.desc}</p>|
            <span>{el.productId.offer}</span>
            <h6>Price : ₹{el.productId.price}/-</h6>
            <div className="edit-cart">
              <div className="edit-cart-buttons">
                <button
                  onClick={() => handleDec(el.productId._id)}
                  disabled={el.quantity === 1 ? true : false}
                  className="btn btn-warning"
                >
                  -
                </button>{" "}
                <span>{el.quantity}</span>{" "}
                <button
                  onClick={() => handleInc(el.productId._id)}
                  className="btn btn-warning"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(el.productId._id)}
                className="btn btn-warning"
              >
                Remove{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
