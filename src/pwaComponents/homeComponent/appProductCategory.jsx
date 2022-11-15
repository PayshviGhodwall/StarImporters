import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

function AppProductCategory() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="pt-3">
            <div className="container">
              <div
                className="catagory-single-img"
                style={{ backgroundImage: "url('../assets/img/banner_2.png')" }}
              ></div>
            </div>
          </div>

          <div className="product-catagories-wrapper py-3">
            <div className="container">
              <div className="section-heading rtl-text-right">
                <h6>Sub Category</h6>
              </div>
              <div className="product-catagory-wrap">
                <div className="row g-2 rtl-flex-d-row-r">
                  <div className="col-3">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_1.png" alt="" />
                          <span>BLVK Frznberry</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_4.png" alt="" />
                          <span>Cherry Pineapple</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_5.png" alt="" />
                          <span>4K's Wraps</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_new5.png" alt="" />
                          <span>Elf Bar 5000Puff</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_new6.png" alt="" />
                          <span>Elf Bar 5000Puff</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_new7.png" alt="" />
                          <span>Elf Bar 5000Puff</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_new8.png" alt="" />
                          <span>Hookah</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-3 d-flex align-items-stretch">
                    <div className="card catagory-card w-100 active">
                      <div className="card-body px-2">
                        <Link to="/app/product-list">
                          <img src="../assets/img/product_new9.png" alt="" />
                          <span>BLVK Unicorn</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                <h6>Top Products</h6>
                <a className="btn p-0" href="shop-list.html">
                  View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
                </a>
              </div>
              <div className="row g-2">
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_1.png"
                          alt=""
                        />
                        <ul
                          className="offer-countdown-timer d-flex align-items-center shadow-sm"
                          data-countdown="2023/12/31 23:59:59"
                        >
                          <li>
                            <span className="days">0</span>d
                          </li>
                          <li>
                            <span className="hours">0</span>h
                          </li>
                          <li>
                            <span className="minutes">0</span>m
                          </li>
                          <li>
                            <span className="seconds">0</span>s
                          </li>
                        </ul>
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        BLVK Frznberry
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_4.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Cherry Pineapple
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_5.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        4K's Wraps
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_new1.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Elf Bar 5000Puff
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_new5.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Elf Bar 5000Puff
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_new9.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Elf Bar 5000Puff
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_new7.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Elf Bar 5000Puff
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <a className="wishlist-btn" href="#">
                        <i className="fa-solid fa-heart"></i>
                      </a>
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img
                          className="mb-2"
                          src="../assets/img/product_new4.png"
                          alt=""
                        />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
                        Elf Bar 5000Puff
                      </Link>

                      <div className="product-rating">
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
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

export default AppProductCategory;
