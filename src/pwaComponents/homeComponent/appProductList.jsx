import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

function AppProductList() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="py-3">
            <div className="container">
              <div className="row g-1 align-items-center justify-content-end mb-4">
                <div className="col-4">
                  <div className="select-product-catagory">
                    <select
                      className="right small border-0"
                      id="selectProductCatagory"
                      name="selectProductCatagory"
                      aria-label="Default select example"
                    >
                      <option selected>Short by</option>
                      <option value="1">Newest</option>
                      <option value="2">Popular</option>
                      <option value="3">Ratings</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-2">
                <div className="col-12">
                  <div className="horizontal-product-card">
                    <div className="d-flex align-items-center">
                      <div className="product-thumbnail-side">
                        <Link
                          className="product-thumbnail shadow-sm d-block"
                          to="/app/product-detail"
                        >
                          <img src="../assets/img/product_new1.png" alt="" />
                        </Link>
                      </div>
                      <div className="product-description">
                        <a className="wishlist-btn" href="#">
                          <i className="far fa-heart"></i>
                        </a>
                        <Link
                          className="product-title d-block"
                          to="/app/product-detail"
                        >
                          Elf Bar 5000Puff
                        </Link>

                        <div className="product-rating">
                          <i className="fa-solid fa-star"></i>4.88{" "}
                          <span className="ms-1">(39 review)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="horizontal-product-card">
                    <div className="d-flex align-items-center">
                      <div className="product-thumbnail-side">
                        <Link
                          className="product-thumbnail shadow-sm d-block"
                          to="/app/product-detail"
                        >
                          <img src="../assets/img/product_1.png" alt="" />
                        </Link>
                      </div>
                      <div className="product-description">
                        <a className="wishlist-btn" href="#">
                          <i className="far fa-heart"></i>
                        </a>
                        <Link
                          className="product-title d-block"
                          to="/app/product-detail"
                        >
                          BLVK Frznberry
                        </Link>

                        <div className="product-rating">
                          <i className="fa-solid fa-star"></i>4.88{" "}
                          <span className="ms-1">(39 review)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="horizontal-product-card">
                    <div className="d-flex align-items-center">
                      <div className="product-thumbnail-side">
                        <Link
                          className="product-thumbnail shadow-sm d-block"
                          to="/app/product-detail"
                        >
                          <img src="../assets/img/product_4.png" alt="" />
                        </Link>
                      </div>
                      <div className="product-description">
                        <a className="wishlist-btn" href="#">
                          <i className="far fa-heart"></i>
                        </a>
                        <Link
                          className="product-title d-block"
                          to="/app/product-detail"
                        >
                          Cherry Pineapple
                        </Link>

                        <div className="product-rating">
                          <i className="fa-solid fa-star"></i>4.88{" "}
                          <span className="ms-1">(39 review)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="horizontal-product-card">
                    <div className="d-flex align-items-center">
                      <div className="product-thumbnail-side">
                        <Link
                          className="product-thumbnail shadow-sm d-block"
                          to="/app/product-detail"
                        >
                          <img src="../assets/img/product_5.png" alt="" />
                        </Link>
                      </div>
                      <div className="product-description">
                        <a className="wishlist-btn" href="#">
                          <i className="far fa-heart"></i>
                        </a>
                        <Link
                          className="product-title d-block"
                          to="/app/product-detail"
                        >
                          4K's Wraps
                        </Link>

                        <div className="product-rating">
                          <i className="fa-solid fa-star"></i>4.88{" "}
                          <span className="ms-1">(39 review)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductList;
