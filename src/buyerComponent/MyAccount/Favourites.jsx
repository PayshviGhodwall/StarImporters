import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import Profile from "./Profile";


const Favourites = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUsers(data);
  }, []);
  return (
    <div className="main_myaccount">
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>My Account</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        My Account
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="myaccount mb-4 ">
        <div className="container-lg position-relative">
        <Profile/>
        </div>
        <div className="container container-sm">
          <div className="row mt-5  justify-content-center">
            <div className="col-lg-3   col-md-3 col-sm-5 col-xs-5 ">
              <div className="row  ">
                {/* My Account Tab Menu Start */}
                <div className="myaccount_tabs bg-white p-2">
                  <Link
                    to="/MyAccount"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div
                      className="  nav flex-coloumn text-white  px-3 py-2 border  "
                      role=""
                    >
                      <h4 className="mt-1">
                        <i className="fa fa-clipboard-list" />
                        <span className="fs-6 mx-2">ORDER HISTORY</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/RequestOrder"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border   " role="tablist">
                      <h4 className="">
                        <i className="fas fa-file mt-1" />
                        <span className="fs-6 mx-2">REQUEST ORDER</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Address"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border" role="tablist">
                      <h4 className="">
                        <i className="fa fa-map-signs" />
                        <span className="fs-6 mx-2">ADDRESS BOOK</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Account"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2  border  " role="nav-link">
                      <h4 className="">
                        <i className="fas fa-user" />
                        <span className="fs-6 mx-2">ACCOUNT SETTING</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Favourites"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div
                      className="nav-active  text-white px-3 py-2  border  "
                      role="tablist"
                    >
                      <h4 className="">
                        <i className="fas fa-heart" />
                        <span className="fs-6 mx-2">MY FAVOURITES</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/MainMenu"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border  " role="tablist">
                      <h4 className="">
                        <i className="fa fa-list" />
                        <span className="fs-6 mx-2">MAIN MENU</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-9 ">
              <div className="bg-white p-4 ">
                <div className="row">
                  <div className="col-12">
                    <div className="row myfavourites">
                      <div className="col-lg-3 col-md-4 mb-lg-4 mb-md-2">
                        <div className="product_parts_box">
                          <div className="partsproduct_img">
                            <img
                              src={require("../../assets/img/product_new9.png")}
                              alt="Product"
                            />
                          </div>
                          <div className="product_content mt-2 text-center">
                            <Link to="" className="text-decoration-none">
                              Elf Bar 5000Puff
                            </Link>
                            <div className="rating_box mt-1 mb-2">
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#b1afaa" }}
                                ></i>
                              </a>
                            </div>
                            <a
                              className="fav_btn change_btn"
                              href="javscript:;"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 mb-lg-4 mb-md-2">
                        <div className="product_parts_box">
                          <div className="partsproduct_img">
                            <img
                              src={require("../../assets/img/product_new9.png")}
                              alt="Product"
                            />
                          </div>
                          <div className="product_content mt-2 text-center">
                            <Link to="" className="text-decoration-none">
                              Elf Bar 5000Puff
                            </Link>
                            <div className="rating_box mt-1 mb-2">
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#b1afaa" }}
                                ></i>
                              </a>
                            </div>
                            <a
                              className="fav_btn change_btn"
                              href="javscript:;"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 mb-lg-4 mb-md-2">
                        <div className="product_parts_box">
                          <div className="partsproduct_img">
                            <img
                              src={require("../../assets/img/product_new9.png")}
                              alt="Product"
                            />
                          </div>
                          <div className="product_content mt-2 text-center">
                            <Link to="" className="text-decoration-none">
                              Elf Bar 5000Puff
                            </Link>
                            <div className="rating_box mt-1 mb-2">
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#b1afaa" }}
                                ></i>
                              </a>
                            </div>
                            <a
                              className="fav_btn change_btn"
                              href="javscript:;"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4 mb-lg-4 mb-md-2">
                        <div className="product_parts_box">
                          <div className="partsproduct_img">
                            <img
                              src={require("../../assets/img/product_new9.png")}
                              alt="Product"
                            />
                          </div>
                          <div className="product_content mt-2 text-center">
                            <Link to="" className="text-decoration-none">
                              Elf Bar 5000Puff
                            </Link>
                            <div className="rating_box mt-1 mb-2">
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i className="fas fa-star" />
                              </a>
                              <a href="javasript:;">
                                <i
                                  className="fa fa-star"
                                  style={{ color: "#b1afaa" }}
                                ></i>
                              </a>
                            </div>
                            <a
                              className="fav_btn change_btn"
                              href="javscript:;"
                            />
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;
