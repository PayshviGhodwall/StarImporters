import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  countProducts,
  getUserProfile,
} from "../httpServices/homeHttpService/homeHttpService";

function AppHeader() {
  const [detail, setDetail] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    getUserDetail();
    getCartCount();
  }, []);

  const getUserDetail = async () => {
    const { data } = await getUserProfile();
    if (!data.error) {
      setDetail(data.results);
    }
  };
  const getCartCount = async () => {
    const { data } = await countProducts();
    if (!data.error) {
      setCount(data.results);
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
            <div className="logo-wrapper">
              <Link to="/app/home">
                <img src="../assets/img/logo.png" alt="" />
              </Link>
            </div>
            <div className="navbar-logo-container d-flex align-items-center">
              <div className="cart-icon-wrap">
                <Link to="/app/cart">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>{count}</span>
                </Link>
              </div>

              <div className="user-profile-icon ms-2">
                <Link to="/app/profile">
                  <img
                    src={
                      detail?.profileImage
                        ? detail?.profileImage
                        : "/assets/img/logo.png"
                    }
                    alt=""
                  />
                </Link>
              </div>
              <div
                className="suha-navbar-toggler ms-2"
                data-bs-toggle="offcanvas"
                data-bs-target="#suhaOffcanvas"
                aria-controls="suhaOffcanvas"
              >
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="offcanvas offcanvas-start suha-offcanvas-wrap"
          tabindex="-1"
          id="suhaOffcanvas"
          aria-labelledby="suhaOffcanvasLabel"
        >
          <button
            className="btn-close btn-close-white"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>

          <div className="offcanvas-body">
            <div className="sidenav-profile">
              <div className="user-profile">
                <img
                  src={
                    detail?.profileImage
                      ? detail?.profileImage
                      : "/assets/img/logo.png"
                  }
                />
              </div>
              <div className="user-info">
                <h5 className="user-name mb-1 text-white">
                  {detail.companyName}
                </h5>
                <p className="available-balance text-white">
                  Available points <span className="counter">499</span>
                </p>
              </div>
            </div>

            <ul className="sidenav-nav ps-0">
              <li>
                <Link to="/app/profile">
                  <i className="fa-solid fa-user"></i>My Profile
                </Link>
              </li>
              <li>
                <Link to="/app/my-order">
                  <i className="fa-solid fa-bag-shopping"></i>My Order
                </Link>
              </li>
              <li>
                <Link to="/app/my-request">
                  <i className="fa-solid fa-users"></i>My Request
                </Link>
              </li>
              <li>
                <Link to="/app/notifications">
                  <i className="fa-solid fa-bell lni-tada-effect"></i>
                  Notifications
                  <span className="ms-1 badge badge-warning">3</span>
                </Link>
              </li>
              <li>
                <Link to="/app/brands">
                  <i className="fa-solid fa-ribbon"></i>Brands
                </Link>
              </li>
              <li>
                <Link to="/app/wishlist">
                  <i className="fa-solid fa-heart"></i>My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/app/settings">
                  <i className="fa-solid fa-sliders"></i>Settings
                </Link>
              </li>
              <li>
                <Link to="/app/login" onClick={()=>{localStorage.removeItem("token-user")}}>
                  <i className="fa-solid fa-toggle-off"></i>Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHeader;
