import React from "react";
import { Link } from "react-router-dom";

function WebHeader2() {
  return (
    <>
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
              <img src="../assets/img/profile_img1.png" alt="" />
            </div>
            <div className="user-info">
              <h5 className="user-name mb-1 text-white">Ajay Sharma</h5>
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
              <Link to="/app/logout">
                <i className="fa-solid fa-toggle-off"></i>Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default WebHeader2;
