import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import axios from "axios";
import Profile from "./Profile";
import moment from "moment";

const RequestOrders = () => {
  const [quotes, setQuotes] = useState([]);
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const getQuotes = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/requestHistory`;
  let token = localStorage.getItem("token-user");

  useEffect(() => {
    GetQuote();
  }, []);

  const GetQuote = async () => {
    await axios.get(getQuotes).then((res) => {
      setQuotes(res?.data.results);
    });
  };
  console.log(quotes);
  return (
    <div className="main_myaccount">
      <Navbar />
      <section className="comman_banner _banner marginTop">
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
                        Home <span className="arrow mx-1">&#9679;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 "
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
          <Profile />
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
                    <div
                      className="nav-active  text-white px-3 py-2 border   "
                      role="tablist"
                    >
                      <h4 className="">
                        <i className="fas fa-file mt-1" />
                        <span className="fs-6 mx-2">MY QUOTATIONS</span>
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
                    <div className="nav px-3 py-2  border  " role="tablist">
                      <h4 className="">
                        <i className="fas fa-heart" />
                        <span className="fs-6 mx-2">MY FAVOURITES</span>
                      </h4>
                    </div>
                  </Link>
                  {/* <Link
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
                  </Link> */}
                  <Link
                    to="/BuyAgain"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border  " role="tablist">
                      <h4 className="">
                        <i className="fa fa-shopping-cart mt-1" />
                        <span className="fs-6 mx-2">BUY AGAIN</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-md-9 col-sm-9">
              {token ? (
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
                            <h2>Request Order :</h2>
                          </div>
                        </div>

                        {(quotes || [])?.map((item, index) => (
                          <div className="col-6 mb-3 d-flex" key={index}>
                            <Link
                              to="/RequestDetails"
                              state={{ id: item?.quoteId }}
                              className="my_orderbox position-relative text-decoration-none"
                            >
                              <div className="left_part">
                                <div className="status_order d-block">
                                  Status: {item?.status}
                                </div>
                                <div className="order_id d-block mb-1">
                                  Request ID: <strong>{item?.quoteId}</strong>
                                </div>
                                <div className="date_box">
                                  Date :{" "}
                                  {moment(item?.createdAt?.slice(0, 10)).format(
                                    "MM/DD/YYYY"
                                  )}
                                </div>
                              </div>
                              <div className="items_box">
                                <h2>Items :</h2>
                                {(item?.products || []).map((item, ind) => (
                                  <ul className="list-unstyled mb-0">
                                    <li key={ind}>
                                      {item?.flavour?._id
                                        ? item?.productId?.unitName +
                                          "-" +
                                          item?.flavour?.flavour
                                        : item?.productId?.unitName}
                                    </li>
                                  </ul>
                                ))}
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    ></div>
                    <div
                      className="tab-pane fade"
                      id="nav-contact1"
                      role="tabpanel"
                      aria-labelledby="nav-contact1-tab"
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <p>Please Login to see details...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RequestOrders;
