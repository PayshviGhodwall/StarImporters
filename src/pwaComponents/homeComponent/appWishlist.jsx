import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppWishlist() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                <h6>Wishlist Items (4)</h6>
              </div>
              <div className="row g-2">
                <div className="col-12 mb-3">
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
                        <a className="delete-btn" href="#">
                          <i className="fa-solid fa-trash-can"></i>
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
                <div className="col-12 mb-3">
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
                        <a className="delete-btn" href="#">
                          <i className="fa-solid fa-trash-can"></i>
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
                <div className="col-12 mb-3">
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
                        <a className="delete-btn" href="#">
                          <i className="fa-solid fa-trash-can"></i>
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
                <div className="col-12">
                  <Link to="/app/cart" className="comman_btn">
                    Add To Cart All Item
                  </Link>
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

export default AppWishlist;
