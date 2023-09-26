import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const Best = () => {
  const authToken = localStorage.getItem("auth");
  const [products, setProducts] = useState([]);
  const perfumeDivRef = useRef(null);
  const navigate = useNavigate();

  const scrollNext = () => {
    if (perfumeDivRef.current) {
      const scrollStep = perfumeDivRef.current.offsetWidth;
      perfumeDivRef.current.scrollLeft += scrollStep;
    }
  };
  const scrollPrev = () => {
    if (perfumeDivRef.current) {
      const scrollStep = perfumeDivRef.current.offsetWidth;
      perfumeDivRef.current.scrollLeft -= scrollStep;
    }
  };

  const fetchProducts = async () => {
    try {
      let response = await axios.get(
        "https://divine-beauty-backend-node.onrender.com/v1/products"
      );
      if (response) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProductsDeo = products.filter((product) =>
    product.title.includes("Perfume")
  );

  const handleStore = (data) => {
    localStorage.setItem("product", JSON.stringify(data));
    setTimeout(() => {
      navigate(`/product/${data._id}`);
    }, 1200);
  };

  const handleCart = async (el) => {
    if (!authToken) {
      return alert("You Need to Login First");
    }
    try {
      let response = await axios.post(
        "https://divine-beauty-backend-node.onrender.com/v1/cart/add",
        el,
        {
          headers: { authorization: authToken },
        }
      );
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container perfume" style={{ marginTop: "2rem" }}>
      <h4>Our Best Sellers</h4>
      <div className="perfume-div" ref={perfumeDivRef}>
        {filteredProductsDeo?.splice(0, 8).map((el) => (
          <div
            key={el.id}
            className="col-lg-3 col-md-6 col-sm-6  portfolio-item"
          >
            <div className="portfolio-wrap">
              <img src={el.image} className="img-fluid" alt={el.desc} />
              <div className="portfolio-info">
                <h4>{el.title}</h4>
                <p>{el.offer}</p>
                <h5 style={{ color: "white" }}>
                  Price : <s>₹ {el.original}</s> | ₹{el.price}/-
                </h5>
                <div className="portfolio-links">
                  <button
                    className="btn btn-ghost"
                    onClick={() => handleCart(el)}
                  >
                    <i
                      style={{
                        color: "white",
                        padding: "5px 20px",
                        border: "1px solid",
                      }}
                      className="bi bi-cart2"
                    ></i>
                  </button>

                  <button
                    onClick={() => handleStore(el)}
                    className="btn btn-ghost"
                  >
                    <i
                      style={{
                        color: "white",
                        padding: "5px 20px",
                        border: "1px solid",
                      }}
                      className="bi bi-eye"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="direction-div">
        <button className="btn btn-ghost direction" onClick={scrollPrev}>
          <i class="bi bi-arrow-left"></i>
        </button>

        <button className="btn btn-ghost direction" onClick={scrollNext}>
          <i class="bi bi-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
