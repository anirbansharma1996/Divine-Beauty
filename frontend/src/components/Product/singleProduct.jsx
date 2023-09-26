import React from "react";
import axios from "axios";

const reviews = [
  {
    id: 1,
    rating: 5,
    reviewText: "Great product! I love it.",
    author: "Amitabh",
  },
  {
    id: 2,
    rating: 4,
    reviewText: "Good product. Could be better.",
    author: "Salman",
  },
];

export const SingleProduct = () => {
  const authToken = localStorage.getItem("auth");
  const prod = JSON.parse(localStorage.getItem("product"));
  //console.log(prod);
  const handleCart = async (el) => {
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
    <div
      className="card mb-3"
      style={{ maxWidth: "90%", margin: "auto", marginTop: "6rem" }}
    >
      <div className="row g-0">
        <div className="col-md-4 d-flex ">
          <img src={prod.image} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h6 style={{ color: "GrayText" }}>Product Code : {prod._id}</h6>
            <h3 className="card-title">{prod.title}</h3>
            <p className="card-text">{prod.desc}</p>
            <p className="card-text">
              <small className="text-muted">{prod.offer}</small>
            </p>
            <h4>
              Price : <s style={{ color: "grey" }}>₹ {prod.original}/</s> , ₹
              {prod.price}/-
            </h4>
            <h6>Rating : {prod.rating}</h6>
          </div>
          <div
            style={{
              width: "80%",
              margin: "auto",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            <button
              onClick={() => handleCart(prod)}
              style={{ width: "80%", fontWeight: "600" }}
              className="btn btn-warning"
            >
              Add to <i className="bi bi-cart2"></i>
            </button>
          </div>
          <div
            style={{ width: "80%", margin: "auto", marginBottom: "10px" }}
            className="row mt-4"
          >
            <div className="col-md-12">
              <h5>Product Reviews</h5>
              <ul className="list-group">
                {reviews.map((review) => (
                  <li key={review.id} className="list-group-item">
                    <div>
                      <strong>Rating : </strong> {review.rating}/5
                    </div>
                    <p>{review.reviewText}</p>
                    <small style={{ color: "grey" }}>By {review.author}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
