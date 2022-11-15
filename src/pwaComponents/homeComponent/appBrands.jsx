import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppBrands() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="brands_section pt-3">
            <div className="row mx-0">
              <div className="col-6 mb-3 pe-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_1.png" alt="" />
                </a>
              </div>
              <div className="col-6 mb-3 ps-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_2.png" alt="" />
                </a>
              </div>
              <div className="col-6 mb-3 pe-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_6.png" alt="" />
                </a>
              </div>
              <div className="col-6 mb-3 ps-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_4.png" alt="" />
                </a>
              </div>
              <div className="col-6 mb-3 pe-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_5.png" alt="" />
                </a>
              </div>
              <div className="col-6 mb-3 ps-2">
                <a className="brands_box shadow" href="javascript:;">
                  <img src="../assets/img/brand_6.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppBrands;
