import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import axios from "axios";
import Profile from "./Profile";

const OrderDetails = () => {
  const [users, setUsers] = useState([]);
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const getOrder = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/getOrder`;
  const [orderDetails, setOrderDetails] = useState([]);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("loginToken");

  useEffect(() => {
    const GetOrders = async () => {
      await axios.get(getOrder).then((res) => {
        setOrderDetails(res?.data.results?.orders);
      });
    };
    GetOrders();
    getUser();
  }, []);

  const getUser = async () => {
    await axios.get(userApi).then((res) => {
      setUsers(res?.data.results);
    });
  };
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
            <div className="col-xl-9 ">
              <div className="bg-white p-4 ">
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="col-xl-9">
                      <div className="bg-white p-4">
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
                                  <h2>Order Details :</h2>
                                </div>
                              </div>
                              <div className="col-12 mt-3 mb-4">
                                <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                                  <span className="small_header">
                                    Order Details
                                  </span>
                                  <div className="col-4">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Order Date :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          10/09/2022
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Order Id :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          ASD8ASDJ8ASD
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-4">
                                    <div className="row">
                                      <div className="col text-center">
                                        <span className="data_main">
                                          Total Products :
                                        </span>
                                      </div>
                                      <div className="col-auto">
                                        <span className="data_submain">
                                          200
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mb-2">
                                <div className="cart_table">
                                  <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th>
                                            Items{" "}
                                            <a
                                              className="filter_table"
                                              href="javscript:;"
                                            />
                                          </th>
                                          <th>Quantity</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                              <div className="col-auto">
                                                <span className="cart_product">
                                                  <img
                                                    src="assets/img/product_new1.png"
                                                    alt=""
                                                  />
                                                </span>
                                              </div>
                                              <div className="col">
                                                <div className="cart_content">
                                                  <h3>Elf Bar 5000Puff</h3>
                                                  <p>Bar Code: 232323</p>
                                                  <span className="ordertext my-2 d-block ">
                                                    Ordered On: 12/12/2021
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <span className="quantity_text">
                                              2
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                              <div className="col-auto">
                                                <span className="cart_product">
                                                  <img
                                                    src="assets/img/product_new9.png"
                                                    alt=""
                                                  />
                                                </span>
                                              </div>
                                              <div className="col">
                                                <div className="cart_content">
                                                  <h3>Elf Bar 5000Puff</h3>
                                                  <p>Bar Code: 45645</p>
                                                  <span className="ordertext my-2 d-block ">
                                                    Ordered On: 12/12/2021
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </td>
                                          <td>
                                            <span className="quantity_text">
                                              2
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 mt-3 mb-5">
                                <div className="row mx-0 border rounded pt-5 p-3 position-relative">
                                  <span className="small_header">
                                    Track Your Order
                                  </span>
                                  <ul className="track_order list-unstyled mb-0">
                                    <li className="active">
                                      <span className="track_circle" />
                                      Order Placed
                                    </li>
                                    <li>
                                      <span className="track_circle" />
                                      Dispatched
                                    </li>
                                    <li>
                                      <span className="track_circle" />
                                      Shipped
                                    </li>
                                    <li>
                                      <span className="track_circle" />
                                      Delivered
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="col-12 mb-4">
                                <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                                  <span className="small_header">
                                    Shipment Details
                                  </span>
                                  <div className="col-6 mb-2">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Buyer Name :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          David
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 mb-2">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Email :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          david@gmail.com
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Mobile Number :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          +1 80910923123
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6">
                                    <div className="row">
                                      <div className="col-6">
                                        <span className="data_main">
                                          Shipment Location :
                                        </span>
                                      </div>
                                      <div className="col-6">
                                        <span className="data_submain">
                                          Lorem ipsum dolor sit,
                                        </span>
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

export default OrderDetails;
