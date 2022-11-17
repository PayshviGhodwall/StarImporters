import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <section className="cart_page py-5">
        <div className="container bg-white">
          <div className="row p-4">
            <div className="col-12 text-end mb-4">
              <a className="comman_btn" href="checkout.html">
                Checkout
              </a>
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-12">
                  <div className="cart_table">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product Details</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                <div className="col-auto">
                                  <span className="cart_product">
                                    <img
                                      src="assets/img/product_new1.png"
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="cart_content">
                                    <h3>Elf Bar 5000Puff </h3>
                                    <p>
                                      Lorem ipsum dolor sit, amet consectetur
                                      adipisicing elit. Facere similique odio
                                      sed accusantium.
                                    </p>
                                    <div className="rate_main d-flex align-items-center my-md-3 my-2">
                                      <div className="rating_box">
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fal fa-star" />
                                        </a>
                                      </div>
                                      <span>(216)</span>
                                    </div>
                                    <a
                                      className="remove_btn"
                                      href="javscript:;"
                                    >
                                      Remove
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="number">
                                <span className="minus">-</span>
                                <input type="text" defaultValue={0} />
                                <span className="plus">+</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                <div className="col-auto">
                                  <span className="cart_product">
                                    <img
                                      src="assets/img/product_1.png"
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="cart_content">
                                    <h3>BLVK Frznberry</h3>
                                    <p>
                                      Lorem ipsum dolor sit, amet consectetur
                                      adipisicing elit. Facere similique odio
                                      sed accusantium.
                                    </p>
                                    <div className="rate_main d-flex align-items-center my-md-3 my-2">
                                      <div className="rating_box">
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fal fa-star" />
                                        </a>
                                      </div>
                                      <span>(216)</span>
                                    </div>
                                    <a
                                      className="remove_btn"
                                      href="javscript:;"
                                    >
                                      Remove
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="number">
                                <span className="minus">-</span>
                                <input type="text" defaultValue={0} />
                                <span className="plus">+</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                <div className="col-auto">
                                  <span className="cart_product">
                                    <img
                                      src="assets/img/product_4.png"
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="cart_content">
                                    <h3>Cherry Pineapple</h3>
                                    <p>
                                      Lorem ipsum dolor sit, amet consectetur
                                      adipisicing elit. Facere similique odio
                                      sed accusantium.
                                    </p>
                                    <div className="rate_main d-flex align-items-center my-md-3 my-2">
                                      <div className="rating_box">
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fal fa-star" />
                                        </a>
                                      </div>
                                      <span>(216)</span>
                                    </div>
                                    <a
                                      className="remove_btn"
                                      href="javscript:;"
                                    >
                                      Remove
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="number">
                                <span className="minus">-</span>
                                <input type="text" defaultValue={0} />
                                <span className="plus">+</span>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                <div className="col-auto">
                                  <span className="cart_product">
                                    <img
                                      src="assets/img/product_5.png"
                                      alt=""
                                    />
                                  </span>
                                </div>
                                <div className="col">
                                  <div className="cart_content">
                                    <h3>4K's Wraps</h3>
                                    <p>
                                      Lorem ipsum dolor sit, amet consectetur
                                      adipisicing elit. Facere similique odio
                                      sed accusantium.
                                    </p>
                                    <div className="rate_main d-flex align-items-center my-md-3 my-2">
                                      <div className="rating_box">
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fas fa-star" />
                                        </a>
                                        <a href="javasript:;">
                                          <i className="fal fa-star" />
                                        </a>
                                      </div>
                                      <span>(216)</span>
                                    </div>
                                    <a
                                      className="remove_btn"
                                      href="javscript:;"
                                    >
                                      Remove
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="number">
                                <span className="minus">-</span>
                                <input type="text" defaultValue={0} />
                                <span className="plus">+</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
