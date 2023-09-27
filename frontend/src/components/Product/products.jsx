import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Products = () => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authToken = localStorage.getItem("auth");
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(
        "https://divine-beauty-backend-node.onrender.com/v1/products"
      );
      if (response) {
        setIsLoading(false);
        setProducts(response.data.products);
        setOriginalProducts(response.data.products);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };
  console.log(isLoading);
  useEffect(() => {
    fetchProducts();
  }, [isAdded]);

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
  const handleCategory = (category) => {
    setProducts(
      originalProducts.filter((el) => el.title.toLowerCase().includes(category))
    );
  };
  const handleSearch = (input) => {
    setTimeout(() => {
      setProducts(
        originalProducts.filter((el) =>
          el.title.toLowerCase().includes(input.toLowerCase())
        )
      );
    }, 500);
  };

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
      alert(response.data.message);
      setIsAdded(!isAdded);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section id="portfolio" className="portfolio" style={{ marginTop: "25px" }}>
      {isLoading ? (
        <div className="text-center" style={{margin:"7rem 0 5rem 0"}}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container">
          <div
            className="section-title d-flex filter"
            style={{ justifyContent: "space-between" }}
          >
            <div>
              <div className="d-flex" style={{ alignItems: "center" }}>
                <button
                  className="btn btn-info"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasLeft"
                  aria-controls="offcanvasLeft"
                >
                  Filters
                </button>
                <ul id="portfolio-filter-all">
                  <li onClick={handleReset}>All</li>
                </ul>
              </div>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasLeft"
                aria-labelledby="offcanvasLeftLabel"
              >
                <div className="offcanvas-header">
                  <h5 id="offcanvasLeftLabel"></h5>
                  <button
                    type="button"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    className="btn btn-ghost"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <div className="col-lg-12 filter-div">
                    <hr />
                    <ul id="portfolio-flters">
                      <p style={{ textAlign: "left" }}>
                        <b>Filter by Price</b>
                      </p>
                      <hr />
                      <li onClick={() => handleRange(0, 350)}>Below ₹350</li>
                      <li onClick={() => handleRange(351, 750)}>₹351 - ₹750</li>
                      <li onClick={() => handleRange(751, 1000)}>
                        ₹751 - ₹1000
                      </li>
                      <li onClick={() => handleRange(1001, Infinity)}>
                        Above ₹1000
                      </li>
                    </ul>

                    <ul id="portfolio-flters">
                      <p style={{ textAlign: "left" }}>
                        <b>Filter by Category</b>
                      </p>
                      <hr />
                      <li onClick={() => handleCategory("perfume")}>Perfume</li>
                      <li onClick={() => handleCategory("combo")}>Combos</li>
                      <li onClick={() => handleCategory("lotion")}>
                        Lotion & Cream
                      </li>
                    </ul>

                    <ul id="portfolio-flters">
                      <p style={{ textAlign: "left" }}>
                        <b>Filter by Gender</b>
                      </p>
                      <hr />
                      <li onClick={() => handleGender("man")}>MEN</li>
                      <li onClick={() => handleGender("woman")}>WOMEN</li>
                      <li onClick={() => handleGender("unisex")}>UNISEX</li>
                    </ul>
                  </div>
                </div>
                <div className="offcanvas-header">
                  <h5 id="offcanvasLeftLabel"></h5>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
              </div>
            </div>
            <span style={{ color: "blueviolet" }}>
              {products.length} Products Found
            </span>
          </div>
          <div style={{ padding: "10px" }} className="search">
            <label>
              <b>Search Product Here</b>
            </label>
            <input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="search products here..."
              type="text"
              className="form-control"
            />
          </div>
          <div className="row ">
            {products.map((el) => (
              <div
                key={el.id}
                className="col-lg-3 col-md-6 col-sm-6  portfolio-item"
              >
                <div className="portfolio-wrap">
                  <img src={el.image} className="img-fluid" alt={el.desc} />
                  <div className="portfolio-info">
                    <p>{el.offer}</p>
                    <h4>{el.title}</h4>
                    <h5 style={{ color: "white" }}>
                      Price : <s>₹ {el.original}</s> | ₹{el.price}/-
                    </h5>
                    <h6 style={{ color: "white" }}>Rating : {el.rating}</h6>
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
      )}
    </section>
  );
};
