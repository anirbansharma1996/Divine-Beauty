import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Products = () => {
  const authToken = localStorage.getItem("auth");
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      let response = await axios.get("http://127.0.0.1:8008/v1/products");
      if (response) {
        setProducts(response.data.products);
        setOriginalProducts(response.data.products);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const handleReset = () => {
    fetchProducts();
  };
  const handleRange = (minPrice, maxPrice) => {
    setProducts(
      originalProducts.filter(
        (el) => el.price >= minPrice && el.price <= maxPrice
      )
    );
  };

  const handleGender = (gen) => {
    setProducts(
      originalProducts.filter((el) => el.title.toLowerCase().includes(gen))
    );
  };

  const handleStore = (data) => {
    localStorage.setItem("product", JSON.stringify(data));
    setTimeout(() => {
      navigate(`/product/${data._id}`);
    }, 1200);
  };

  const handleCart = async (el) => {
    if (!authToken) {
      return alert("You Need to Log in First");
    }

    try {
      let response = await axios.post("http://127.0.0.1:8008/v1/cart/add", el, {
        headers: { authorization: authToken },
      });
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section id="portfolio" className="portfolio" style={{ marginTop: "25px" }}>
      <div className="container">
        <div className="section-title">
          <h2>Products</h2>
          <p>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
            aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
            quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
            fugiat sit in iste officiis commodi quidem hic quas.
          </p>
          <span style={{ color: "blueviolet" }}>
            {products.length} Products Found
          </span>
        </div>
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="portfolio-flters">
              <p>
                {" "}
                <b> filter by Price </b>{" "}
              </p>
              <li onClick={handleReset}>All</li>
              <li onClick={() => handleRange(0, 350)}>Below ₹350</li>
              <li onClick={() => handleRange(351, 750)}>₹351 - ₹750</li>
              <li onClick={() => handleRange(751, 1000)}>₹751 - ₹1000</li>
              <li onClick={() => handleRange(1001, Infinity)}>Above ₹1000</li>
            </ul>
            <ul id="portfolio-flters">
              <p>
                {" "}
                <b> filter by Gender </b>{" "}
              </p>
              <li onClick={() => handleGender("man")}>MEN</li>
              <li onClick={() => handleGender("woman")}>WOMEN</li>
              <li onClick={() => handleGender("unisex")}>UNISEX</li>
            </ul>
          </div>
        </div>
        <div className="row portfolio-container">
          {products.map((el) => (
            <div key={el.id} className="col-lg-3 col-md-6 portfolio-item">
              <div className="portfolio-wrap" >
                <img  src={el.image} className="img-fluid" alt={el.desc} />
                <div className="portfolio-info">
                  {/* <p>{el.desc}</p> */}
                  <h4>{el.title}</h4>
                  <p>{el.offer}</p>
                  <h5 style={{ color: "white" }}>
                    Price : <s>₹ {el.original}</s> | ₹{el.price}/-
                  </h5>
                  {/* <h6 style={{ color: "white" }}>Rating : {el.rating}</h6> */}
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
      </div>
    </section>
  );
};
