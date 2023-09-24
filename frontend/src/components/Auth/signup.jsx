import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const Signup = () => {
  const [isVisible, setIsvisible] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    gender:"",
    mobileNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const postData = async (user) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8008/v1/signup",
        user
      );
      alert(response.data.message);
      if (response.data.message === "User created successfully") {
        setTimeout(() => {
          navigate("/log-in");
        }, 1200);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLoginSuccess = (e) => {
    e.preventDefault();
    postData(userData);
    setUserData({
      name: "",
      email: "",
      address: "",
      mobileNumber: "",
      gender:"",
      password: "",
    });
  };
  console.log(userData);
  return (
    <div className="container signup">
      <div className="card mb-3 " style={{ marginTop: "6.5rem" }}>
        <h2 style={{ textAlign: "center", paddingTop: "10px" }}>SIGN UP</h2>
        <hr />
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <form className="row g-3" onSubmit={handleLoginSuccess}>
                <div className="col-md-6">
                  <label htmlFor="inputName4" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputName4"
                    placeholder="user full name"
                    name="name"
                    value={userData.name}
                    onChange={handleInput}
                  />
                </div>
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
                    value={userData.email}
                    onChange={handleInput}
                  />
                </div>
                
                <div className="col-12 d-flex form-control" style={{width:"97%",margin:"auto" ,marginTop:"10px",justifyContent:"space-between",alignItems:"center"}}>
                  <label className="form-label">Gender</label>
                  <div>
                    <label className="form-check-label" htmlFor="male">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="male"
                        name="gender"
                        value="male"
                        checked={userData.gender === "male"}
                        onChange={handleInput}
                      />
                     {" "} Male
                    </label>
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="female">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="female"
                        name="gender"
                        value="female"
                        checked={userData.gender === "female"}
                        onChange={handleInput}
                      />
                      {" "}Female
                    </label>
                  </div>
                  <div>
                    <label className="form-check-label" htmlFor="other">
                      <input
                        type="radio"
                        className="form-check-input"
                        id="other"
                        name="gender"
                        value="other"
                        checked={userData.gender === "other"}
                        onChange={handleInput}
                      />
                     {" "} Other
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="inputAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="12/3, abc Colony , city , pin , state"
                    name="address"
                    value={userData.address}
                    onChange={handleInput}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputMobile4" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="inputMobile4"
                    maxLength={10}
                    placeholder="(IN) +91 "
                    name="mobileNumber"
                    value={userData.mobileNumber}
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
                    value={userData.password}
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
                    Sign up
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
                Already Signed Up ?{" "}
                <span>
                  <a href="/log-in">Log In</a> here.
                </span>
              </p>
            </div>
            <img
              src="https://img.freepik.com/free-vector/spa-template-design_23-2150708781.jpg"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
