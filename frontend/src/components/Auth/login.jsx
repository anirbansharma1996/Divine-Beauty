import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [isVisible, setIsvisible] = useState(false);
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",
  });

  const postLogData = async (user) => {
    try {
      const response = await axios.post(
        "https://divine-beauty-backend-node.onrender.com/v1/login",
        user
      );
      alert(response.data.message);
      localStorage.setItem("auth", response.data.token);
      if (response.data.message === "Login successful") {
        setTimeout(() => {
          navigate("/products");
          window.location.reload();
        }, 1200);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogUser({ ...logUser, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    postLogData(logUser);
  };

  return (
    <div className="container signup">
      <div className="card mb-3 " style={{ marginTop: "6.5rem" }}>
        <h2 style={{ textAlign: "center", paddingTop: "10px" }}>LOG IN</h2>
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <form className="row g-3" onSubmit={handleLogin}>
                <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    placeholder="example@abc.com"
                    name="email"
                    value={logUser.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputPassword4" className="form-label">
                    Password
                  </label>
                  <input
                    type={isVisible ? "text" : "password"}
                    className="form-control"
                    id="inputPassword4"
                    minLength={8}
                    placeholder="xxxxxxxxx"
                    name="password"
                    value={logUser.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="gridCheck">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => setIsvisible(!isVisible)}
                      />
                      Show Password
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 " style={{ marginTop: "1rem" }}>
            <div
              style={{ marginBottom: "1rem" }}
              className="d-flex justify-content-center"
            >
              <p>
                Don't have an Account ?{" "}
                <span>
                  <a href="/sign-up">Sign up</a> here.
                </span>
              </p>
            </div>
            <img
              src="https://img.freepik.com/free-vector/nature-cosmetics-landing-page-template_23-2148611602.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
