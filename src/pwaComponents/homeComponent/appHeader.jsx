import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  countProducts,
  getUserProfile,
} from "../httpServices/homeHttpService/homeHttpService";
import { useRecoilValue } from "recoil";
import { notifyCount } from "../../atom";

function AppHeader() {
  const [detail, setDetail] = useState("");
  const [count, setCount] = useState(0);
  let counter = useRecoilValue(notifyCount);
  
  useEffect(() => {
    getUserDetail();
    getCartCount();
  }, []);
  let token = localStorage.getItem("token-user");

  const getUserDetail = async () => {
    const { data } = await getUserProfile();
    if (!data.error) {
      setDetail(data?.results);
    }
  };
  const getCartCount = async () => {
    const { data } = await countProducts();
    if (!data?.error) {
      setCount(data?.results);
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div className="header-area " id="headerArea" >
          <div className="container h-100 d-flex align-items-center justify-content-between d-flex rtl-flex-d-row-r">
            <div className="logo-wrapper">
              <Link to="/app/home">
                <img src="../assets/img/logo.png" alt="" />
              </Link>
            </div>
            <div className="navbar-logo-container d-flex align-items-center">
              {
                token ?

              <div className="cart-icon-wrap">
                <Link to="/app/cart" >
                  <i className="fa-solid fa-bag-shopping"></i>
                  <span>{count}</span>
                </Link>
              </div>
             : null
            }
              <div className="user-profile ms-2">
                <Link>
                  <img
                  className="headerProfile"
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
            id="closeModal"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>

          <div className="offcanvas-body">
            <div className="">
              <div className="mb-2" >
                <img
                style={{width:"120px",height:"120px",borderRadius:"50%",marginLeft:"40px"}}
                  src={
                    detail?.profileImage
                      ? detail?.profileImage
                      : "/assets/img/logo.png"
                  }
                />
              </div>
              <div className="user-info">
                <h5 className="user-name  text-white text-center mt-3">
                  {detail?.companyName}
                </h5>
                
              </div>
            </div>

            <ul className="sidenav-nav ps-0">
              <li>
                <Link to={token ? "/app/profile" :"/app/login"}>
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
                  <span className="ms-1 badge badge-warning">{counter}</span>
                </Link>
              </li>
              <li>
                <Link to="/app/brands">
                  <i className="fa-solid fa-ribbon"></i>Brands
                </Link>
              </li>
              <li>
                <Link to={token ? "/app/wishlist" :"/app/login"}>
                  <i className="fa-solid fa-heart"></i>My Wishlist
                </Link>
              </li>
              <li>
                <Link to={token ? "/app/settings" :"/app/login"}>
                  <i className="fa-solid fa-sliders"></i>Settings
                </Link>
              </li>
              <li>
                <Link to="/app/logout">
                  <i className="fa-solid fa-toggle-off"></i> {token ? "Sign Out" : "Log In"}
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
