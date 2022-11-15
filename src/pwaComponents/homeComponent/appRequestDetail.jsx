import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppRequestDetail() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="my_order_new">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded py-3 px-1 position-relative bg-white shadow">
                  <span className="small_header">Request Details:</span>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Request Date :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">10/09/2022</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Request Id :</span>
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
                                Price: <span>$230</span>
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
                                Price: <span>$230</span>
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
                                Price: <span>$230</span>
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
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AppRequestDetail;
