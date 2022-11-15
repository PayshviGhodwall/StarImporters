import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";

function AppProductDetail() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="product-slide-wrapper">
            <OwlCarousel
              className=" product-slides "
              autoplay={true}
              autoplayHoverPause={false}
              autoplayTimeout={5000}
              dots={false}
              loop={true}
              nav={false}
              fade={false}
              items={1}
            >
              <div className="single-product-slide item">
                <img src="../assets/img/product_new8.png" alt="" />
              </div>
              <div className="single-product-slide item">
                <img src="../assets/img/product_4.png" alt="" />
              </div>
              <div className="single-product-slide item">
                <img src="../assets/img/product_new9.png" alt="" />
              </div>
            </OwlCarousel>
          </div>
          <div className="product-description pb-3">
            <div className="product-title-meta-data bg-white mb-3 py-3">
              <div className="container d-flex justify-content-between rtl-flex-d-row-r">
                <div className="p-title-price">
                  <h5 className="mb-1">Elf Bar 5000Puff</h5>
                </div>
                <div className="p-wishlist-share">
                  <Link to="/app/wishlist">
                    <i className="fa-solid fa-heart"></i>
                  </Link>
                </div>
              </div>
              <div className="product-ratings">
                <div className="container d-flex flex-wrap align-items-center justify-content-between rtl-flex-d-row-r">
                  <div className="ratings">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span className="ps-1">3 ratings</span>
                  </div>
                  <div className="total-result-of-ratings">
                    <span>5.0</span>
                    <span>Very Good</span>
                  </div>
                  <form className="cart-form mt-3 w-100" action="#" method="">
                    <div className="order-plus-minus d-flex align-items-center">
                      <div className="quantity-button-handler">-</div>
                      <input
                        className="form-control cart-quantity-input"
                        type="text"
                        step="1"
                        name="quantity"
                        value="3"
                      />
                      <div className="quantity-button-handler">+</div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="selection-panel bg-white mb-3 py-3">
              <div className="container">
                <div className="choose-color-wrapper">
                  <p className="mb-1 font-weight-bold">
                    Flavor: Pineapple Strawnana
                  </p>
                  <div className="row offers_box_main">
                    <div className="col-12 flavour_box py-2">
                      <a className="disabled" href="javascript:;">
                        Black Ice
                      </a>
                      <a className="disabled" href="javascript:;">
                        Blue Razz Ice
                      </a>
                      <a className="" href="javascript:;">
                        Blueberry Energize
                      </a>
                      <a className="" href="javascript:;">
                        Cranberry Grape
                      </a>
                      <a className="" href="javascript:;">
                        Fuji Ice
                      </a>
                      <a className="disabled" href="javascript:;">
                        Grape Energy
                      </a>
                      <a className="" href="javascript:;">
                        Green Apple
                      </a>
                      <a className="disabled" href="javascript:;">
                        Gumi
                      </a>
                      <a className="" href="javascript:;">
                        Mango Peach Apricot
                      </a>
                      <a className="" href="javascript:;">
                        Guava Ice
                      </a>
                      <a className="" href="javascript:;">
                        Malaysian Mango
                      </a>
                      <a className="disabled" href="javascript:;">
                        Malibu
                      </a>
                      <a className="" href="javascript:;">
                        Mango Peach
                      </a>
                      <a className="disabled" href="javascript:;">
                        Miami Mint
                      </a>
                      <a className="disabled" href="javascript:;">
                        Peach Berry
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-form-wrapper bg-white mb-3 py-3">
              <div className="container">
                <div className="">
                  <Link className="comman_btn mb-2" to="/app/cart">
                    Add To Cart
                  </Link>
                  <button className="comman_btn2" type="submit">
                    Request Quotation
                  </button>
                </div>
              </div>
            </div>
            <div className="p-specification bg-white py-3">
              <div className="container">
                <h6>Specifications</h6>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi, eum? Id, culpa? At officia quisquam laudantium nisi
                  mollitia nesciunt, qui porro asperiores cum voluptates placeat
                  similique recusandae in facere quos vitae?
                </p>
                <ul className="mb-3 ps-3">
                  <li>
                    <i className="fa-solid fa-check me-1"></i> 100% Good Reviews
                  </li>
                  <li>
                    <i className="fa-solid fa-check me-1"></i> 7 Days Returns
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-check me-1"></i> Warranty not
                    Aplicable
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-check me-1"></i> 100% Brand New
                    Product
                  </li>
                </ul>
                <p className="mb-0">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quasi, eum? Id, culpa? At officia quisquam laudantium nisi
                  mollitia nesciunt, qui porro asperiores cum voluptates placeat
                  similique recusandae in facere quos vitae?
                </p>
              </div>
            </div>
            <div className="pb-3"></div>
            <div className="related-product-wrapper bg-white py-3 mb-3">
              <div className="container">
                <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                  <h6>Related Products</h6>
                  <a className="btn p-0" href="shop-list.html">
                    View All
                  </a>
                </div>
                <OwlCarousel
                  className="related-product-slide"
                  autoplay={true}
                  autoplayHoverPause={false}
                  autoplayTimeout={5000}
                  dots={false}
                  loop={true}
                  nav={false}
                  fade={false}
                  items={2}
                  margin={10}
                >
                  <div className="card product-card my-2 item">
                    <div className="card-body">
                      <span className="badge rounded-pill badge-success">
                        New
                      </span>
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
                  <div className="card product-card my-2 item">
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
                  <div className="card product-card my-2 item">
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
                  <div className="card product-card my-2 item">
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
                </OwlCarousel>
              </div>
            </div>
            <div className="rating-and-review-wrapper bg-white py-3 mb-3 dir-rtl">
              <div className="container">
                <h6>Ratings &amp; Reviews</h6>
                <div className="rating-review-content">
                  <ul className="ps-0">
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          Very good product. It's just amazing!
                        </p>
                        <span className="name-date">
                          Designing World 12 Dec 2022
                        </span>
                      </div>
                    </li>
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          Very excellent product. Love it.
                        </p>
                        <span className="name-date">
                          Designing World 8 Dec 2022
                        </span>
                      </div>
                    </li>
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          What a nice product it is. I am looking it's.
                        </p>
                        <span className="name-date">
                          Designing World 28 Nov 2022
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="ratings-submit-form bg-white py-3 dir-rtl">
              <div className="container">
                <h6>Submit A Review</h6>
                <form action="#" method="">
                  <div className="stars mb-3">
                    <input
                      className="star-1"
                      type="radio"
                      name="star"
                      id="star1"
                    />
                    <label className="star-1" for="star1"></label>
                    <input
                      className="star-2"
                      type="radio"
                      name="star"
                      id="star2"
                    />
                    <label className="star-2" for="star2"></label>
                    <input
                      className="star-3"
                      type="radio"
                      name="star"
                      id="star3"
                    />
                    <label className="star-3" for="star3"></label>
                    <input
                      className="star-4"
                      type="radio"
                      name="star"
                      id="star4"
                    />
                    <label className="star-4" for="star4"></label>
                    <input
                      className="star-5"
                      type="radio"
                      name="star"
                      id="star5"
                    />
                    <label className="star-5" for="star5"></label>
                    <span></span>
                  </div>
                  <textarea
                    className="form-control mb-3"
                    id="comments"
                    name="comment"
                    cols="30"
                    rows="10"
                    data-max-length="200"
                    placeholder="Write your review..."
                  ></textarea>
                  <button className="comman_btn" type="submit">
                    Save Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductDetail;
