import React from "react";

export const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>
                  <img
                    style={{ borderRadius: "100%", width: "40px" }}
                    src="https://png.pngtree.com/png-vector/20220706/ourlarge/pngtree-beauty-logo-png-image_5687724.png"
                    alt="logo"
                  />
                  {" "}ᗪIᐯIᑎE ᗷEᗩᑌTY
                </h3>
                <p>
                  Jalpaiguri, West Bengal <br />
                  JAL , 735101, WB
                  <br />
                  <br />
                  <strong>Phone:</strong> +91 9083527130
                  <br />
                  <strong>Email:</strong> divinebeauty@example.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter">
                    <i className="bx bxl-twitter" />
                  </a>
                  <a href="#" className="facebook">
                    <i className="bx bxl-facebook" />
                  </a>
                  <a href="#" className="instagram">
                    <i className="bx bxl-instagram" />
                  </a>
                  <a href="#" className="google-plus">
                    <i className="bx bxl-skype" />
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bx bxl-linkedin" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Home</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">About us</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Services</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Web Design</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Product Management</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Marketing</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{" "}
                  <a href="#">Graphic Design</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>
                Tamen quem nulla quae legam multos aute sint culpa legam noster
                magna
              </p>
              <form action method="post">
                <input type="email" name="email" />
                <input type="submit" defaultValue="Subscribe" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright">
          © Copyright{" "}
          <strong>
            <span>Divine Beauty</span>
          </strong>
          . All Rights Reserved
        </div>
        <div className="credits">
          Designed by <a href="">Anirban Sharma</a>
        </div>
      </div>
    </footer>
  );
};
