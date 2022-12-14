import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";

const Checkout = () => {
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const newOrder = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/newOrder`;
  const [users, setUsers] = useState();
  const [delevryChoice, setDelevryChoice] = useState("In-Store Pickup");
  const navigate = useNavigate();
  const autoClose = () => {
    document.getElementById("close").click();
  };
  useEffect(() => {
    const getUser = async () => {
      await axios.get(userApi).then((res) => {
        console.log(res);
        setUsers(res?.data.results);
      });
    };
    getUser();
  }, []);
  const createOrder = async () => {
    if (delevryChoice == "Shipment") {
      await axios
        .post(newOrder, {
          type: "Shipment",
          address: users?.addressLine[0] + users?.addressLine[1],
        })
        .then((res) => {
          if (!res.error) {
            Swal.fire({
              title: "Hurray! Order Placed.",
              text: "You can Track your order on my account",
              icon: "success",
              confirmButtonText: "View Order",
            }).then((data) => {
              navigate("/app/order-detail", {
                state: { id: res?.data.results?.order._id },
              });
            });
          }
        });
    } else if (delevryChoice == "Delivery") {
      await axios
        .post(newOrder, {
          type: "Delivery",
          address: users?.addressLine[0] + users?.addressLine[1],
        })
        .then((res) => {
          if (!res.error) {
            Swal.fire({
              title: "Hurray! Order Placed.",
              text: "You can Track your order on my account",

              icon: "success",
              confirmButtonText: "View Order",
            }).then((data) => {
              navigate("/app/order-detail", {
                state: { id: res?.data.results.order._id },
              });
            });
          }
        });
    } else if (delevryChoice == "In-Store Pickup") {
      await axios
        .post(newOrder, {
          type: "In-Store Pickup",
          address: users?.addressLine[0] + users?.addressLine[1],
        })
        .then((res) => {
          if (!res.error) {
            Swal.fire({
              title: "Hurray! Order Placed.",
              text: "You can Track your order on my account",

              icon: "success",
              confirmButtonText: "View Order",
            }).then((data) => {
              navigate("/app/order-detail", {
                state: { id: res?.data.results.order._id },
              });
            });
          }
        });
    }
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Checkout</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-2">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="item_nanner">
                      <Link
                        to="/app/cart"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Cart <span className="arrow mx-2">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6"
                      >
                        Checkout
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section
          className="Checkout_page py-5"
          style={{ backgroundColor: "#eef3ff" }}
        >
          <div className="container bg-white">
            <div className="row p-4 align-items-end">
              <div className="col-12 mb-4">
                <div className="chosse_location">
                  <h3>Choose your checkout</h3>

                  {users?.state == "Georgia" ? (
                    <form className="row" action="">
                      <div className="form-group col-4 custom_radio">
                        <input
                          type="radio"
                          defaultChecked="true"
                          className="d-none"
                          value={true}
                          id="new_radio"
                          name="radioo"
                          onClick={() => {
                            setDelevryChoice("In-Store Pickup");
                          }}
                        />
                        <label htmlFor="new_radio">In-Store Pickup</label>
                      </div>
                      <div className="form-group col-4 custom_radio">
                        <input
                          type="radio"
                          className="d-none"
                          value={true}
                          onClick={() => {
                            setDelevryChoice("Delivery");
                          }}
                          id="new_radio1"
                          name="radioo"
                        />
                        <label htmlFor="new_radio1">Delivery</label>
                      </div>
                    </form>
                  ) : (
                    <form className="row" action="">
                      <div className="form-group col-4 custom_radio">
                        <input
                          type="radio"
                          defaultChecked="true"
                          className="d-none"
                          value={true}
                          id="new_radio"
                          name="radioo"
                          onClick={() => {
                            setDelevryChoice("In-Store Pickup");
                          }}
                        />
                        <label htmlFor="new_radio">In-Store Pickup</label>
                      </div>
                      <div className="form-group col-4 custom_radio">
                        <input
                          type="radio"
                          className="d-none"
                          id="new_radio2"
                          onClick={() => {
                            setDelevryChoice("Shipment");
                          }}
                          value={true}
                          name="radioo"
                        />
                        <label htmlFor="new_radio2">Shipment</label>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div className="col-12 pt-3 mb-4">
                {delevryChoice == "Shipment" || delevryChoice == "Delivery" ? (
                  <div className="row mx-0 Checkout_address">
                    <span>Address :</span>
                    <h2>{users?.firstName}</h2>
                    <p className="mb-0">
                      {users?.addressLine[0] +
                        "," +
                        users?.city +
                        "," +
                        users?.state +
                        "-" +
                        users?.zipcode}{" "}
                    </p>
                  </div>
                ) : (
                  <div className="row mx-0 Checkout_address">
                    <span>Store Address :</span>
                    <h2>Star Importers</h2>
                    <p className="mb-0">
                      2166 Mountain Industrial Blvd, Tucker, GA, United States,
                      Georgia
                    </p>
                    <p>5898687485,748746595</p>
                  </div>
                )}
              </div>
              <div className="col-12 text-start">
                <button className="comman_btn" onClick={createOrder}>
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default Checkout;
