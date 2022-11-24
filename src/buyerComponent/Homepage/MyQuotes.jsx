import { logDOM } from "@testing-library/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";

const MyQuotes = () => {
  const getCartProducts = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/getCart`;
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState();
  axios.defaults.headers.common["x-auth-token-user"] =
  localStorage.getItem("token-user");
  const getCart = async () => {
    await axios.get(getCartProducts).then((res) => {
      setProduct(res?.data.results);
    });
  };
  
  console.log(token); 
  useEffect(() => {
    setToken(localStorage.getItem("token-user"));
    getCart();
  }, []);

  console.log(product);
  return (
    <div>
      <Navbar />
      <section className="cart_page py-5" style={{backgroundColor:"#eef3ff"}}>
        {token ? (
          <div className="container bg-white">
            <div className="row p-4">
              <div className="col-12 text-end mb-4">
                <a className="comman_btn" href="checkout.html">
                  Checkout
                </a>
              </div>
              <div className="col-12 bg-white" >
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
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container bg-white">
            <div className="row p-4">
              <div className="col-12 text-center mb-4">
                <p className="fs-2">Please Login To Access Cart!</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default MyQuotes;
