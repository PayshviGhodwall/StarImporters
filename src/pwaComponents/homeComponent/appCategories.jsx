import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getBrands,
  getCategory,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppCategories() {
  const [categories, setCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  let ref = useRef();
  useEffect(() => {
    getCategoryList();
  }, [activePage]);

  const getCategoryList = async () => {
    const { data } = await getCategory({ page: activePage });
    if (!data.error) {
      setCategories(data.results?.categories);
      setMaxPage(data?.results.totalPages);
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
            <button className="bg-white fw-bold border rounded-end">
              {activePage}
            </button>
            <div className="row mx-0 justify-content-center">
              {categories.map((item, index) => {
                return (
                  <div className="col-sm-5 col-md-5 col-4 mb-2 p-1 m-3 brands_box shadow">
                    <Link
                      className="text-center mt-4"
                      to={`/app/product-category/${item?.categoryName}`}
                    >
                      <div>
                        <img src={item?.categoryImage} alt="" />
                      </div>
                      <p className="text-center mt-2">{item?.categoryName}</p>
                    </Link>
                  </div>
                );
              })}
              {categories?.length ? (
                <div className="col-lg-12 col-sm-12 d-flex justify-content-between mt-3">
                  <div
                    class={
                      activePage <= 1 ? "opacity-0" : "back-button me-2 me-2 "
                    }
                  >
                    <Link
                      state={{ naek: "ki" }}
                      onClick={() =>
                        activePage <= 1
                          ? setActivePage(1)
                          : setActivePage(activePage - 1)
                      }
                    >
                      <i class="fa-solid fa-arrow-left-long"></i> Previous
                    </Link>
                  </div>
                  <div
                    class={
                      activePage === maxPage
                        ? "d-none"
                        : "back-button me-2 me-2 "
                    }
                  >
                    <Link
                      state={{ naek: "ki" }}
                      onClick={() =>
                        activePage === maxPage
                          ? setActivePage(maxPage)
                          : setActivePage(activePage + 1)
                      }
                    >
                      Next <i class="fa-solid fa-arrow-right-long"></i>
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppCategories;
