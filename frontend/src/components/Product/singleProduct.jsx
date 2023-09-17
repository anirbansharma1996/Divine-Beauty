import React from "react";

export const SingleProduct = () => {
  const prod = JSON.parse(localStorage.getItem("product"));
  console.log(prod);
  return (
    <div
      className="card mb-3"
      style={{ maxWidth: "90%", margin: "auto", marginTop: "6rem" }}
    >
      <div className="row g-0">
        <div className="col-md-4">
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
          <div style={{width:'80%',margin:'auto',textAlign:'center',marginBottom:'1rem'}}>

          <button  style={{width:'80%',fontWeight:'600'}}  className="btn btn-warning">
            Add to <i className="bi bi-cart2"></i>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};
