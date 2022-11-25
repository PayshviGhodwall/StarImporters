import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";

const MyQuotes = () => {
  const getQuoteProducts = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/getQuotes`;
  const productRemove = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/removeQuoteProducts`;
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");
  const getQuotes = async () => {
    await axios.get(getQuoteProducts).then((res) => {
      setProduct(res?.data.results.products);
    });
  };

  console.log(product);
  useEffect(() => {
    setToken(localStorage.getItem("token-user"));
    getQuotes();
  }, []);

  const RemoveProduct = async (index) => {
    await axios
      .post(productRemove, {
        productId: product[index].productId?._id,
      })
      .then((res) => {
        getQuotes()
      });
  };
  return (
    <div>
      <Navbar />
      <section
        className="cart_page py-5"
        style={{ backgroundColor: "#eef3ff" }}
      >
        {token ? (
          <div className="container user-management-tabs px-0">
            <nav className="w-100">
              <div className="nav nav-tabs  " id="nav-tab" role="tablist">
                <button
                  className="nav-link "
                  style={{ width: "50%" }}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  <i
                    className="fa fa-cart-arrow-down"
                    style={{ fontSize: "15px" }}
                  />
                  MY CART
                </button>
                <button
                  className="nav-link active"
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  style={{ width: "50%" }}
                  onClick={() => {
                    navigate("/MyQuotes");
                  }}
                >
                  <i
                    className="fa fa-clipboard-list"
                    style={{ fontSize: "15px" }}
                  />
                  MY QUOTATIONS
                </button>
              </div>
            </nav>

            <div className="container bg-white ">
              <div className="row p-4">
                <div className="col-12 bg-white">
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
                              {(product || []).map((item, index) => (
                                <tr
                                  key={index}
                                  style={{ backgroundColor: "#eef3ff" }}
                                >
                                  <td>
                                    <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                      <div className="col-auto">
                                        <span className="cart_product bg-white">
                                          <img
                                            src={item?.productId?.productImage}
                                            alt=""
                                          />
                                        </span>
                                      </div>
                                      <div className="col">
                                        <div className="cart_content">
                                          <Link className="text-decoration-none text-dark">
                                            {" "}
                                            <h3 className="fs-5">
                                              {item?.productId?.unitName}{" "}
                                            </h3>
                                          </Link>
                                          <p>
                                            Lorem ipsum dolor sit, amet
                                            consectetur adipisicing elit. Facere
                                            similique odio sed accusantium.
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
                                                <i className="fa fa-star" />
                                              </a>
                                            </div>
                                            <span>(216)</span>
                                          </div>
                                          <a
                                            className="text-decoration-none"
                                            style={{
                                              marginTop: "-3px",
                                              color: "#eb3237",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              RemoveProduct(index);
                                            }}
                                          >
                                            <i
                                              class="fa fa-trash"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Remove
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="number">
                                      <input
                                        type="text"
                                        className="border bg-light rounded"
                                        style={{ width: "70px" }}
                                        defaultValue={item?.quantity}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="col-12 text-center mb-3 mt-5">
                            <Link
                              className="comman_btn text-decoration-none"
                              to="/Cart/Checkout"
                            >
                              Checkout
                            </Link>
                          </div>
                        </div>
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
