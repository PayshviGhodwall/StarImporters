import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBrands, getCategory } from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const { data } = await getCategory();
    if (!data.error) {
      setCategories(data.results);
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea">
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/home">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div class="page-heading">
              <h6 class="mb-0">All Categories</h6>
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
              {categories.map((item, index) => {
                return (
                  <div className="col-5 mb-2 p-1 m-3 brands_box shadow">
                    <Link className="text-center mt-4"  to={`/app/product-category/${item?.categoryName}`} >
                        <div>
                        <img src={item?.categoryImage} alt="" />

                        </div>
                    <p className="text-center mt-2">{item?.categoryName}</p>

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

export default AppCategories;
