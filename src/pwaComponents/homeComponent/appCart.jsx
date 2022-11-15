import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppCart() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="cart-wrapper-area py-3">
              <div className="cart-table card mb-3">
                <div className="table-responsive card-body">
                  <table className="table mb-0">
                    <tbody>
                      <tr>
                        <th scope="row">
                          <a className="remove-product" href="#">
                            <i className="fa-solid fa-xmark"></i>
                          </a>
                        </th>
                        <td>
                          <div className="cart_icon">
                            <img
                              className=""
                              src="../assets/img/product_1.png"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <Link to="/app/product-detail">BLVK Frznberry</Link>
                        </td>
                        <td>
                          <div className="quantity">
                            <input className="qty-text" type="text" value="1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a className="remove-product" href="#">
                            <i className="fa-solid fa-xmark"></i>
                          </a>
                        </th>
                        <td>
                          <div className="cart_icon">
                            <img
                              className=""
                              src="../assets/img/product_4.png"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <Link to="/app/product-detail">Cherry Pineapple</Link>
                        </td>
                        <td>
                          <div className="quantity">
                            <input className="qty-text" type="text" value="1" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <a className="remove-product" href="#">
                            <i className="fa-solid fa-xmark"></i>
                          </a>
                        </th>
                        <td>
                          <div className="cart_icon">
                            <img
                              className=""
                              src="../assets/img/product_5.png"
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <Link to="/app/product-detail">4K's Wraps</Link>
                        </td>
                        <td>
                          <div className="quantity">
                            <input className="qty-text" type="text" value="1" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card coupon-card mb-3">
                <div className="card-body">
                  <div className="apply-coupon">
                    <h6 className="mb-0">Have a coupon?</h6>
                    <p className="mb-2">
                      Enter your coupon code here &amp; get awesome discounts!
                    </p>
                    <div className="coupon-form">
                      <form action="#">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="SUHA30"
                        />
                        <button className="btn btn-primary" type="submit">
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card cart-amount-area">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="total-price mb-0"></h5>
                  <Link className="comman_btn" to="/app/checkout">
                    Checkout Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <AppFooter />
      </div>
    </>
  );
}

export default AppCart;
