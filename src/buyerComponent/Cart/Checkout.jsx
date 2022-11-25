import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";

const Checkout = () => {
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const [users, setUsers] = useState();
  useEffect(() => {
    const getUser =async()=>{
        await axios.get(userApi).then((res)=>{
          console.log(res);
          setUsers(res?.data.results)
        })
       }
       getUser()
  }, []);

  return (
    <div>
      <Navbar/>
      <section className="comman_banner _banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Checkout</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-2">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="item_nanner">
                      <Link
                        to="/"
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
        <section className="Checkout_page py-5" style={{backgroundColor:"#eef3ff"}}>
          <div className="container bg-white">
            <div className="row p-4 align-items-end">
              <div className="col-12 mb-4">
                <div className="chosse_location">
                  <h3>Choose your checkout</h3>
                  <form className="row" action="">
                    <div className="form-group col-4 custom_radio">
                      <input
                        type="radio"
                        defaultChecked="true"
                        className="d-none"
                        value={true}
                        id="new_radio"
                        name="radioo"
                      />
                      <label htmlFor="new_radio">In-Store Pickup</label>
                    </div>
                    <div className="form-group col-4 custom_radio">
                      <input
                        type="radio"
                        className="d-none"
                        value={true}

                        id="new_radio1"
                        name="radioo"
                      />
                      <label htmlFor="new_radio1">Delivery</label>
                    </div>
                    <div className="form-group col-4 custom_radio">
                      <input
                        type="radio"
                        className="d-none"
                        id="new_radio2"
                        value={true}

                        name="radioo"
                      />
                      <label htmlFor="new_radio2">Shipment</label>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-12 pt-3 mb-4">
                <div className="row mx-0 Checkout_address">
                  <span>Address :</span>
                  <h2>{users?.firstName}</h2>
                  <p className="mb-0">
                   {users?.addressLine}
                  </p>
                </div>
              </div>
              <div className="col-12 text-start">
                <button className="comman_btn">
                  Proceed
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
