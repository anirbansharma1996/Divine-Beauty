import React from "react";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { useCart } from "./Context/cartContext";

export const Navbar = () => {
  const { cart } = useCart();
  const authToken = localStorage.getItem("auth") || false;
  var decoded = "";
  if (authToken) {
    decoded = jwt_decode(authToken);
  }

  return (
    <div>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <img style={{borderRadius:"100%"}} src="https://png.pngtree.com/png-vector/20220706/ourlarge/pngtree-beauty-logo-png-image_5687724.png" alt="logo" />
           {" "} <a href="/">ᗪIᐯIᑎE ᗷEᗩᑌTY</a>
          </h1>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a className="nav-link scrollto" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/products">
                  Products
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="/membership">
                  Membership
                </a>
              </li>
              {authToken && (
                <li>
                  <a className="nav-link scrollto" href="/cart">
                    Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart && cart?.length}
                    </span>
                  </a>
                </li>
              )}
              {!authToken ? (
                <li>
                  <a className="getstarted scrollto" href="/log-in">
                    Create an Account
                  </a>
                </li>
              ) : (
                <User props={decoded} />
              )}
            </ul>
            <button
              className="btn btn-ghost"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
            >
              <i className="bi bi-list mobile-nav-toggle" />
            </button>
            <div
              className="offcanvas offcanvas-bottom"
              tabIndex={-1}
              id="offcanvasBottom"
              aria-labelledby="offcanvasBottomLabel"
            >
              <div className="offcanvas-header">
                <h3 className="offcanvas-title" id="offcanvasBottomLabel">
                  DIVINE BEAUTY
                </h3>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
              </div>
              <div className="offcanvas-body small mobile">
                <ol style={{ listStyleType: "none" }}>
                  <li data-bs-dismiss="offcanvas">
                    <a className="nav-link scrollto" href="/">
                      Home
                    </a>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <a className="nav-link scrollto" href="/products">
                      Products
                    </a>
                  </li>
                  <li data-bs-dismiss="offcanvas">
                    <a className="nav-link scrollto" href="/membership">
                      Membership
                    </a>
                  </li>
                  {authToken && (
                    <li data-bs-dismiss="offcanvas">
                      <a className="nav-link scrollto" href="/cart">
                        Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart.length}
                        </span>
                      </a>
                    </li>
                  )}
                  {!authToken ? (
                    <li data-bs-dismiss="offcanvas">
                      <a
                        style={{ color: "black" }}
                        className="getstarted scrollto"
                        href="/log-in"
                      >
                        Create an Account
                      </a>
                    </li>
                  ) : (
                    <User props={decoded} />
                  )}
                </ol>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export const User = ({ props }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/user")}
      data-bs-dismiss="offcanvas"
      className="getstarted scrollto d-flex align-items-center"
    >
      <img
        style={{ width: "30px", borderRadius: "100%" }}
        src={props.image}
        alt={props.userId}
      />
      <h6 style={{ color: "white", marginTop: "10px", marginLeft: "10px" }}>
        {" "}
        {props.name}
      </h6>
    </div>
  );
};
