import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppOrderDetail() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="my_order_new">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded py-3 px-1 position-relative bg-white shadow">
                  <span className="small_header">Order Details:</span>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Order Date :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">10/09/2022</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Order Id :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">ASD8ASDJ8ASD</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Total Products :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded position-relative bg-white shadow cart-table">
                  <div className="table-responsive card-body">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
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
                            <div className="order_items">
                              <Link to="/app/product-detail">
                                BLVK Frznberry
                              </Link>
                              <div className="bar_code mt-1">
                                Bar Code: <span>232323</span>
                              </div>
                              <div className="bar_code mt-1">
                                Ordered On: <span>12/12/2021</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="quantity">
                              <input
                                className="qty-text"
                                type="text"
                                value="1"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
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
                            <div className="order_items">
                              <Link to="/app/product-detail">
                                Cherry Pineapple
                              </Link>
                              <div className="bar_code mt-1">
                                Bar Code: <span>232323</span>
                              </div>
                              <div className="bar_code mt-1">
                                Ordered On: <span>12/12/2021</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="quantity">
                              <input
                                className="qty-text"
                                type="text"
                                value="1"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
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
                            <div className="order_items">
                              <Link to="/app/product-detail">4K's Wraps</Link>
                              <div className="bar_code mt-1">
                                Bar Code: <span>232323</span>
                              </div>
                              <div className="bar_code mt-1">
                                Ordered On: <span>12/12/2021</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="quantity">
                              <input
                                className="qty-text"
                                type="text"
                                value="1"
                              />
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="card border rounded py-3 px-1 position-relative bg-white shadow">
                  <div className="card-body px-3 py-1">
                    <div className="single-order-status active">
                      <div className="order-icon">
                        <i className="fa-solid fa-bag-shopping"></i>
                      </div>
                      <div className="order-text">
                        <h6>Order placed</h6>
                        <span>2 Feb 2022 - 12:38 PM</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>

                    <div className="single-order-status active">
                      <div className="order-icon">
                        <i className="fa-solid fa-box-open"></i>
                      </div>
                      <div className="order-text">
                        <h6>Product packaging</h6>
                        <span>3 Feb 2022</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>

                    <div className="single-order-status active">
                      <div className="order-icon">
                        <i className="fa-solid fa-truck"></i>
                      </div>
                      <div className="order-text">
                        <h6>Ready for shipment</h6>
                        <span>3 Feb 2022</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>

                    <div className="single-order-status">
                      <div className="order-icon">
                        <i className="fa-solid fa-truck-fast"></i>
                      </div>
                      <div className="order-text">
                        <h6>On the way</h6>
                        <span>Estimate: 4 Feb 2022</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>

                    <div className="single-order-status">
                      <div className="order-icon">
                        <i className="fa-solid fa-store"></i>
                      </div>
                      <div className="order-text">
                        <h6>Dropped in the delivery station</h6>
                        <span>Estimate: 6 Feb 2022</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>

                    <div className="single-order-status">
                      <div className="order-icon">
                        <i className="fa-solid fa-heart-circle-check"></i>
                      </div>
                      <div className="order-text">
                        <h6>Delivered</h6>
                        <span>Estimate: 7 Feb 2022</span>
                      </div>
                      <div className="order-status">
                        <i className="fa-solid fa-circle-check"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded py-3 px-1 position-relative bg-white shadow">
                  <span className="small_header">Shipment Details:</span>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Buyer Name :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">David</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Email:</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">david@gmail.com</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Mobile Number:</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">+1 80910923123</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Shipment Location:</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">
                          Lorem ipsum dolor sit,
                        </span>
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

export default AppOrderDetail;
