import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
const ViewQuoteReq = () => {
  const [sideBar, setSideBar] = useState(true);

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div className={sideBar ? "admin_main" : "expanded_main"}>
      <div className={sideBar ? "siderbar_section" : "d-none"}>
        <div className="siderbar_inner">
          <div className="sidebar_logo">
            <Link to="" className="">
              <img src={Starlogo} alt="Logo" />{" "}
            </Link>
          </div>
          <div className="sidebar_menus">
            <ul className="list-unstyled ps-1 m-0">
              <li>
                <Link
                  className=""
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "2px" }}
                    className="fa fa-home"
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/UserManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-user"
                  ></i>{" "}
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Inventory"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "6px", top: "3px" }}
                    class="far fa-building"
                  ></i>{" "}
                  Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-ship"
                  ></i>{" "}
                  Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className="bg-white"
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "#3e4093",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-cog"
                  ></i>{" "}
                  CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-sign-out-alt"
                  ></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="admin_main_inner">
        <div className="admin_header shadow">
          <div className="row align-items-center mx-0 justify-content-between w-100">
            <div className="col">
              {sideBar ? (
                <div>
                  <h1
                    className="mt-2 text-white"
                    onClick={() => {
                      console.log("yello");
                      setSideBar(!sideBar);
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "4px" }}
                      className="fa fa-bars"
                    ></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar);
                      }}
                    >
                      X
                    </button>
                  </h3>
                </div>
              )}
            </div>
            <div className="col-auto d-flex ml-5">
              <ProfileBar />
            </div>
          </div>
        </div>
        <div className="admin_panel_data height_adjust">
          <div className="row category_management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Order Details</h2>
                    </div>
                  </div>
                  <div className="row p-4 py-5">
                    <div className="col-12 mb-4">
                      <div className="row mx-0 border rounded py-4 px-3 position-relative">
                        <span className="small_header">Order Details</span>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Date:</span>
                            <div className="col">
                              <strong>10/09/2022</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Id:</span>
                            <div className="col">
                              <strong>ASD8ASDJ8ASD</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Total Products:</span>
                            <div className="col">
                              <strong>200</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div className="cart_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  Items{" "}
                                  <a
                                    className="filter_table"
                                    href="javscript:;"
                                  />
                                </th>
                                <th>Quantity</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                    <div className="col-auto">
                                      <span className="cart_product">
                                        <img
                                          src="assets/img/product_new9.png"
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                    <div className="col">
                                      <div className="cart_content">
                                        <h3>Elf Bar 5000Puff</h3>
                                        <p>Bar Code: 232323</p>
                                        <span className="ordertext my-2 d-block ">
                                          Ordered On: 12/12/2021
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="quantity_text">2</span>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                    <div className="col-auto">
                                      <span className="cart_product">
                                        <img
                                          src="assets/img/product_new9.png"
                                          alt=""
                                        />
                                      </span>
                                    </div>
                                    <div className="col">
                                      <div className="cart_content">
                                        <h3>Elf Bar 5000Puff</h3>
                                        <p>Bar Code: 45645</p>
                                        <span className="ordertext my-2 d-block ">
                                          Ordered On: 12/12/2021
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="quantity_text">2</span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-5">
                      <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                        <span className="small_header">
                          Change Order Status
                        </span>
                        <div className="col-12 Change_staus">
                          <form
                            className="form-design row align-items-end"
                            action=""
                          >
                            <div className="form-group mb-0 col">
                              <label htmlFor="">Order Status</label>
                              <select
                                className="form-select form-control"
                                aria-label="Default select example"
                              >
                                <option value={1}>Order Placed</option>
                                <option value={2}>Dispatched</option>
                                <option selected="" value={3}>
                                  Shipped
                                </option>
                                <option value={3}>Delivered</option>
                              </select>
                            </div>
                            <div className="form-group mb-0 col-auto">
                              <button className="comman_btn">Save</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                        <span className="small_header">Shipment Details</span>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Buyer Name:</span>
                            <div className="col">
                              <strong>Ajay Sharma</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Email:</span>
                            <div className="col">
                              <strong>ajay@gmail.com</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Mobile Number:</span>
                            <div className="col">
                              <strong>+1 80910923123</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Shipment Location:</span>
                            <div className="col">
                              <strong>Lorem ipsum dolor sit,</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuoteReq;
