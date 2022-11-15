import React from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

import $ from "jquery";
import { Link } from "react-router-dom";

function AppHome() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="search-form pt-3 rtl-flex-d-row-r">
              <form action="#" method="">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search in Star Importers"
                />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              <div className="alternative-search-options">
                {/* <a className="comman_btn text-white ms-1" href="#">
                  <i className="fa-solid fa-microphone"></i>
                </a> */}
                <a className="comman_btn2 ms-1" href="#">
                  <i className="fa fa-qrcode"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="hero-wrapper">
            <div className="container">
              <div className="pt-3">
                <OwlCarousel
                  className=" hero-slides "
                  autoplay={true}
                  autoplayHoverPause={false}
                  autoplayTimeout={5000}
                  dots={true}
                  loop={true}
                  nav={false}
                  fade={false}
                  items={1}
                >
                  <div
                    className="single-hero-slide item"
                    style={{
                      backgroundImage: "url('../assets/img/banner_3.png')",
                    }}
                  >
                    <div className="slide-content h-100 d-flex align-items-center">
                      <div className="slide-text">
                        <h4
                          className="text-white mb-2"
                          data-animation="fadeInUp"
                          data-delay="100ms"
                          data-duration="1000ms"
                        >
                          Cake 1.5
                        </h4>
                        <p
                          className="text-white"
                          data-animation="fadeInUp"
                          data-delay="400ms"
                          data-duration="1000ms"
                        >
                          Gorila Glue <br /> Hybrid
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="single-hero-slide item"
                    style={{
                      backgroundImage: "url('../assets/img/banner_2.png')",
                    }}
                  >
                    <div className="slide-content h-100 d-flex align-items-center">
                      <div className="slide-text">
                        <h4
                          className="text-white mb-2"
                          data-animation="fadeInUp"
                          data-delay="100ms"
                          data-duration="1000ms"
                        >
                          Elfbar
                        </h4>
                        <p
                          className="text-white"
                          data-animation="fadeInUp"
                          data-delay="400ms"
                          data-duration="1000ms"
                        >
                          BC5000 Ultra <br /> Orange Soda
                        </p>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>

          <div className="product-catagories-wrapper py-3">
            <div className="container">
              <div className="row g-2 rtl-flex-d-row-r">
                <div className="col-3">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_1.png" alt="" />
                        <span>BLVK Frznberry</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_4.png" alt="" />
                        <span>Cherry Pineapple</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_5.png" alt="" />
                        <span>4K's Wraps</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_new5.png" alt="" />
                        <span>Elf Bar 5000Puff</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_new6.png" alt="" />
                        <span>Elf Bar 5000Puff</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_new7.png" alt="" />
                        <span>Elf Bar 5000Puff</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_new8.png" alt="" />
                        <span>Hookah</span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-stretch">
                  <div className="card catagory-card w-100 active">
                    <div className="card-body px-2">
                      <Link to="/app/product-category">
                        <img src="../assets/img/product_new9.png" alt="" />
                        <span>BLVK Unicorn</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flash-sale-wrapper">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                <h6 className="d-flex align-items-center rtl-flex-d-row-r">
                  <i className="fa-solid fa-bolt-lightning me-1 text-danger lni-flashing-effect"></i>
                  Cyclone Offer
                </h6>
                <ul
                  className="sales-end-timer ps-0 d-flex align-items-center rtl-flex-d-row-r"
                  data-countdown="2022/12/31 14:21:59"
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
              </div>
              <OwlCarousel
                className="flash-sale-slide"
                autoplay={true}
                autoplayHoverPause={false}
                autoplayTimeout={5000}
                dots={false}
                loop={true}
                nav={false}
                fade={false}
                items={3}
                margin={10}
              >
                <div className="card flash-sale-card item">
                  <div className="card-body">
                    <Link to="/app/product-detail">
                      <img src="../assets/img/product_1.png" alt="" />
                      <span className="product-title">BLVK Frznberry</span>
                      <span className="progress-title">33% Sold</span>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "33%" }}
                          aria-valuenow="33"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card flash-sale-card item">
                  <div className="card-body">
                    <Link to="/app/product-detail">
                      <img src="../assets/img/product_4.png" alt="" />
                      <span className="product-title">Cherry Pineapple</span>
                      <span className="progress-title">33% Sold</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "33%" }}
                          aria-valuenow="33"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card flash-sale-card item">
                  <div className="card-body">
                    <Link to="/app/product-detail">
                      <img src="../assets/img/product_5.png" alt="" />
                      <span className="product-title">4K's Wraps</span>
                      <span className="progress-title">33% Sold</span>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "33%" }}
                          aria-valuenow="33"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="card flash-sale-card item">
                  <div className="card-body">
                    <Link to="/app/product-detail">
                      <img src="../assets/img/product_new1.png" alt="" />
                      <span className="product-title">Elf Bar 5000Puff</span>
                      <span className="progress-title">33% Sold</span>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "33%" }}
                          aria-valuenow="33"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </OwlCarousel>
            </div>
          </div>
          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                <h6>Top Products</h6>
                <Link className="btn p-0" to="/app/product-list">
                  View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
              <div className="row g-2">
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
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
              </div>
            </div>
          </div>

          <div className="container">
            <div className="cta-text dir-rtl p-4 p-lg-5">
              <div className="row">
                <div className="col-9">
                  <h4 className="text-white mb-1">
                    20% discount on women's care items
                  </h4>
                  <p className="text-white mb-2 opacity-75">
                    Offer will continue till this Friday.
                  </p>
                  <a className="comman_btn" href="#">
                    Grab this offer
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="weekly-best-seller-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                <h6>Weekly Best Sellers</h6>
                <Link className="btn p-0" to="/app/product-list">
                  View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
                </Link>
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
                          <i className="fa-solid fa-heart"></i>
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
                          <i className="fa-solid fa-heart"></i>
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
                          <i className="fa-solid fa-heart"></i>
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
                          <i className="fa-solid fa-heart"></i>
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

export default AppHome;
