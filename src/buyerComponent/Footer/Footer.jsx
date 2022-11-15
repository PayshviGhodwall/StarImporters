import React from "react";
import "../../assets/css/main.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { BsFillRssFill } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { ImMobile } from "react-icons/im";
import { GoMail } from "react-icons/go";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  <IconContext.Provider value={{ color: "red" }}>
    <AiFillLinkedin />
    <AiFillTwitterCircle />
  </IconContext.Provider>;
  return (
    <div>
      <section className="section newsletter_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="news_leter_heading">
                <h3>Subscribe Our Newsletter</h3>
              </div>
            </div>
            <div className="col-md-6">
              <div className="newsletter_form">
                <form className="form-design d-flex">
                  <input
                    type="text"
                    required=""
                    className="form-control rounded-0 shadow-none"
                    placeholder="Enter Email Address"
                  />
                  <button
                    type="submit"
                    className="btn btn-dark rounded-0"
                    name="submit"
                    value="Submit"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer_dark">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12 text-white text-lg-start text-md-center">
                <div className="widget">
                  <div className="footer_logo">
                    <Link className="text-decoration-none" to ="">
                      <img src={require("../../assets/img/logo.png")} width={100} alt="logo" />
                     </Link>
                  </div>
                  <p>
                    If you are going to use of Lorem Ipsum need to be sure there
                    isn't hidden of text
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 text-white">
                <div className="widget">
                  <h6 className="widget_title">Useful Links</h6>
                  <ul className="widget_links">
                    <li>
                      <Link className="text-decoration-none" to ="/">Home </Link>
                    </li>
                   
                    <li>
                      <Link className="text-decoration-none" to ="/AllBrands">Brands </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="/Terms&Condition">Terms & Conditions </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="/PrivacyPolicies">Privacy Policies </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="/AboutUs">About Us </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="/Contact">Contact Us </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 text-white">
                <div className="widget">
                  <h6 className="widget_title">Category</h6>
                  <ul className="widget_links">
                    <li>
                      <Link className="text-decoration-none" to ="">Vape </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="">Smoke </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="">Kids </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="">C-Store &amp; Novelty </Link>
                    </li>
                    <li>
                      <Link className="text-decoration-none" to ="">Glass &amp; Sillicone </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6 text-white">
                <div className="widget">
                  <h6 className="widget_title">Contact Info</h6>
                  <ul className="contact_info contact_info_light">
                    <li>
                      <i className="fas fa-map-signs" />
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li>
                    <li>
                      <i className="fal fa-envelope-open-text" />
                      <Link to="mailto:info@sitename.com">info@sitename.com </Link>
                    </li>
                    <li>
                      <i className="fas fa-phone-alt" />
                      <p>+ 457 789 789 65</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom_footer border-top-tran text-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="mb-md-0 text-center text-md-start">
                  ©2022 All Rights Reserved by Star Importers
                </p>
              </div>
              <div className="col-md-6">
                <ul className="footer_payment text-center text-lg-end mb-0">
                  <li>
                    <Link className="text-decoration-none" to ="">
                      <img src={require("../../assets/img/visa.png")} alt="visa" />
                     </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" to ="">
                      <img src={require("../../assets/img/discover.png")} alt="discover" />
                     </Link>
                  </li>
                  <li>
                    <Link className="text-decoration-none" to ="">
                      <img src={require("../../assets/img/master_card.png")} alt="master_card" />
                     </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src={require("../../assets/img/paypal.png")} alt="paypal" />
                     </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img
                        src={require("../../assets/img/amarican_express.png")}
                        alt="amarican_express"
                      />
                     </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
