import React from "react";
import { Link } from "react-router-dom";

function AppFooter() {
  return (
    <>
      <div className="star_imp_app">
        <div className="footer-nav-area" id="footerNav">
          <div className="suha-footer-nav">
            <ul className="h-100 d-flex align-items-center justify-content-between ps-0 d-flex rtl-flex-d-row-r">
              <li>
                <Link to="/app/home">
                  <i className="fa-solid fa-house"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/app/cart">
                  <i className="fa-solid fa-bag-shopping"></i>Basket
                </Link>
              </li>
              <li>
                <Link to="/app/settings">
                  <i className="fa-solid fa-gear"></i>Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default AppFooter;
