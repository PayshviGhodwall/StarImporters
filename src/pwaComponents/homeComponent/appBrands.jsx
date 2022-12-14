import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getBrands } from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppBrands() {
  const [brand, setBrand] = useState([]);
  let ref = useRef();
  useEffect(() => {
    getBrandList();
  }, []);

  const getBrandList = async () => {
    const { data } = await getBrands();
    if (!data.error) {
      setBrand(data.results);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      document.getElementById("closeModal").click();
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea" ref={ref}>
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/home">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div class="page-heading">
              <h6 class="mb-0">Brands</h6>
            </div>
            <div
              class="suha-navbar-toggler ms-2"
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
        <WebHeader2 />
        <div className="page-content-wrapper">
          <div className="brands_section pt-3">
            <div className="row mx-0">
              {brand.map((item, index) => {
                return (
                  <div className="col-6 mb-3 pe-2">
                    <Link
                      className="brands_box shadow"
                      to="/app/productBrands"
                      state={{ name: item?.brandName }}
                    >
                      <img src={item?.brandImage} alt="" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppBrands;
