import React from "react";


export const Navbar = () => {
  return (
    <div>
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="/">Divine Beauty</a>
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
              <li>
                <a className="nav-link scrollto" href="/cart">
                  Cart
                </a>
              </li>
              <li>
                <a className="getstarted scrollto" href="/sign-up">
                  Create an Account
                </a>
              </li>
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
                <h3 className="offcanvas-title" id="offcanvasBottomLabel">DIVINE BEAUTY</h3>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                />
                
              </div>
              <div className="offcanvas-body small mobile">
              <ol style={{listStyleType:'none'}}>
              <li  data-bs-dismiss="offcanvas" >
                <a  className="nav-link scrollto" href="/">
                  Home
                </a>
              </li>
              <li data-bs-dismiss="offcanvas">
                <a  className="nav-link scrollto" href="/products">
                  Products
                </a>
              </li>
              <li data-bs-dismiss="offcanvas">
                <a  className="nav-link scrollto" href="/membership">
                  Membership
                </a>
              </li>
              <li data-bs-dismiss="offcanvas">
                <a  className="nav-link scrollto" href="/cart">
                  Cart
                </a>
              </li>
              <li data-bs-dismiss="offcanvas">
                <a style={{color:'black'}}  className="getstarted scrollto" href="/sign-up">
                  Create an Account
                </a>
              </li>
            </ol>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};
