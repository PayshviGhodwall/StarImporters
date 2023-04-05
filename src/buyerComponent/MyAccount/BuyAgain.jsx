import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";

const BuyAgain = () => {
  const [users, setUsers] = useState();
  const products = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/purchasedProducts`;
  const addInCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/buyAgain`;
  const [purchasedProd, setPurchasedProd] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUsers(data);
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios.post(products).then((res) => {
      setPurchasedProd(res?.data.results.products);
    });
  };
  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(purchasedProd?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const AddtoCart = async () => {
    if (isCheckAll) {
      await axios.post(addInCart, {
        productId: purchasedProd?.map((item) => item?.products),
        quantity: 1,
        flavour: purchasedProd?.map((li) => li._id),
      });
    }
    // await axios.post(addInCart, {
    //   productId: cartProduct[0],
    //   quantity: cartProduct[1],
    //   flavour: flavour,
    // });
  };
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
                    <div
                      className="nav-active  text-white px-3 py-2 border  "
                      role="tablist"
                    >
                      <h4 className="">
                        <i className="fa fa-shopping-cart mt-1" />
                        <span className="fs-6 mx-2">BUY AGAIN</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-9 col-sm-9">
              <div className="bg-white p-4 ">
                <div className="row">
                  {/* <div className="col-12 fs-5 fw-bold">Purchased Products</div> */}
                  <div className="row myfavourites">
                    {(purchasedProd || [])?.map((item, index) =>
                      item.products?.map((val, ind) => (
                        <div className="col-lg-4 col-md-4 mb-lg-4 mb-md-2">
                          <div className="product_parts_box">
                            <div className="partsproduct_img">
                              <img
                                src={
                                  val?.flavour
                                    ? val?.flavour?.flavourImage ||
                                      require("../../assets/img/product.jpg")
                                    : val?.productId?.productImage ||
                                      require("../../assets/img/product.jpg")
                                }
                                alt="Product"
                              />
                              <label class="checkbox-label">
                                <input
                                  type="checkbox"
                                  key={item._id}
                                  name={ind}
                                  id={item?._id}
                                  onChange={handleClick}
                                  class="checkbox-input"
                                  checked={isCheck.includes(item?._id)}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                            <div>
                              <div class="featuredproduct_details p-2 text-center">
                                <span>
                                  {val?.productId?.unitName}
                                  {"-"}
                                  {val?.flavour ? val?.flavour?.flavour : null}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="col-lg-5 col-md-5 mb-2 ">
                    <label class="checkbox-label-all d-flex">
                      <input
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        onChange={handleSelectAll}
                        checked={isCheckAll}
                        class="checkbox-input-all"
                      />
                      <span class="checkmark-all"></span>
                      <span className="select-text">Select All</span>
                    </label>
                  </div>
                  <div className="col-lg-6 col-md-6 mb-2 justify-content-center">
                    <button className="Signupb">Add to Cart</button>
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

export default BuyAgain;
