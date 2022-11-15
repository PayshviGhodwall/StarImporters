import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import axios from "axios";
import Profile from "./Profile";

const MyAccount = () => {
  const [users, setUsers] = useState([]);
  const userApi =  `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`

  axios.defaults.headers.common["x-auth-token-user"] =
  localStorage.getItem("loginToken");
 
  
  useEffect(() => {
    getUser()
  }, []);

  const getUser = async()=>{
   await axios.get(userApi).then((res)=>{
     setUsers(res?.data.results)
   })
  }
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
                      className="  nav-active flex-coloumn text-white  px-3 py-2 border  "
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
                    to="/Account"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2  border  " role="tablist">
                      <h4 className="">
                        <i className="fas fa-heart" />
                        <span className="fs-6 mx-2">MY FAVOURITES</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Favourites"
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
            <div className="col-xl-9 ">
              <div className="bg-white p-4 ">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="row">
                      <div className="col-12 mb-3">
                        <div className="order_heading">
                          <h2>My Order :</h2>
                        </div>
                      </div>
                      <div className="col-6 mb-3 d-flex">
                        <Link
                          href="order-details.html"
                          className="my_orderbox position-relative text-decoration-none"
                        >
                          <div className="left_part">
                            <div className="status_order d-block">
                              Status: Pending
                            </div>
                            <div className="order_id d-block mb-1">
                              Order ID: <strong>12312</strong>
                            </div>
                            <div className="date_box">
                              Sep 21, 2022 | <span>03:45 PM</span>
                            </div>
                          </div>
                          <div className="items_box">
                            <h2>Items :</h2>
                            <ul className="list-unstyled mb-0">
                              <li>BLVK Frznberry</li>
                              <li>Cherry Pineapple</li>
                              <li>4K's Wraps</li>
                              <li>Elf Bar 5000Puff</li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                      <div className="col-6 mb-3 d-flex">
                        <Link
                          href="order-details.html"
                          className="my_orderbox position-relative text-decoration-none"
                        >
                          <div className="left_part">
                            <div className="status_order d-block">
                              Status: Pending
                            </div>
                            <div className="order_id d-block mb-1">
                              Order ID: <strong>234234</strong>
                            </div>
                            <div className="date_box">
                              Sep 21, 2022 | <span>03:45 PM</span>
                            </div>
                          </div>
                          <div className="items_box">
                            <h2>Items :</h2>
                            <ul className="list-unstyled mb-0">
                              <li>BLVK Frznberry</li>
                              <li>Cherry Pineapple</li>
                              <li>4K's Wraps</li>
                              <li>Elf Bar 5000Puff</li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                      <div className="col-6 mb-3 d-flex">
                        <Link
                          href="order-details.html"
                          className="my_orderbox position-relative text-decoration-none"
                        >
                          <div className="left_part">
                            <div className="status_order d-block">
                              Status: Pending
                            </div>
                            <div className="order_id d-block mb-1">
                              Order ID: <strong>123123</strong>
                            </div>
                            <div className="date_box">
                              Sep 21, 2022 | <span>03:45 PM</span>
                            </div>
                          </div>
                          <div className="items_box">
                            <h2>Items :</h2>
                            <ul className="list-unstyled mb-0">
                              <li>BLVK Frznberry</li>
                              <li>Cherry Pineapple</li>
                              <li>4K's Wraps</li>
                              <li>Elf Bar 5000Puff</li>
                            </ul>
                          </div>
                        </Link>
                      </div>
                      <div className="col-6 mb-3 d-flex">
                        <Link
                          href="order-details.html"
                          className="my_orderbox position-relative text-decoration-none"
                        >
                          <div className="left_part">
                            <div className="status_order d-block">
                              Status: Pending
                            </div>
                            <div className="order_id d-block mb-1">
                              Order ID: <strong>0990345</strong>
                            </div>
                            <div className="date_box">
                              Sep 21, 2022 | <span>03:45 PM</span>
                            </div>
                          </div>
                          <div className="items_box">
                            <h2>Items :</h2>
                            <ul className="list-unstyled mb-0">
                              <li>BLVK Frznberry</li>
                              <li>Cherry Pineapple</li>
                              <li>4K's Wraps</li>
                              <li>Elf Bar 5000Puff</li>
                            </ul>
                          </div>
                        </Link>
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

export default MyAccount;
