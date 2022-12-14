import axios from "axios";
import { saveAs } from "file-saver";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
const ViewOrder = () => {
  const [sideBar, setSideBar] = useState(true);
  let location = useLocation();
  const orderView = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderDetail`;
  const updateOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/updateOrder`;
  const orderExport = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/erpOrder`;
  const orderExportXls = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/exportOrder`;
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState();
  const navigate = useNavigate();

  let id = location?.state?.id;

  const fileDownload = (url, name) => {
    saveAs(url, name);
  };

  useEffect(() => {
    OrderDetails();
  }, []);

  const OrderDetails = async () => {
    await axios.get(orderView + "/" + id).then((res) => {
      setOrders(res?.data.results);
    });
  };
  const UpdateOrderStatus = async (e) => {
    e.preventDefault();
    await axios
      .post(updateOrder + "/" + id, {
        status: orderStatus,
      })
      .then((res) => {
        if (!res?.error) {
          Swal.fire({
            title: "Order Status Updated",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };
  const exportOrder = async (e) => {
    e.preventDefault();

    await axios.post(orderExport + "/" + id).then((res) => {
      if (!res?.error) {
        fileDownload(res?.data.results?.file, orders?.orderId);
      }
    });
  };
  const exportOrderXls = async (e) => {
    e.preventDefault();
    await axios.post(orderExportXls + "/" + id).then((res) => {
      if (!res?.error) {
        fileDownload(res?.data.results?.file, orders?.orderId);
      }
    });
  };

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
                    <div className="col-auto">
                      <button
                        className="comman_btn2"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Export <i class="fa fa-download"></i>
                      </button>
                      <ul
                        className="dropdown-menu mt-1"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link
                            className="text-decoration-none text-dark dropdown-item"
                            onClick={exportOrder}
                          >
                            Export .csv
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="text-decoration-none text-dark dropdown-item"
                            onClick={exportOrderXls}
                          >
                            Export .xls
                          </Link>
                        </li>
                      </ul>
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
                              <strong>{orders?.createdAt?.slice(0, 10)}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Id:</span>
                            <div className="col">
                              <strong>{orders?.orderId}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Total Products:</span>
                            <div className="col">
                              <strong>{orders?.products?.length}</strong>
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
                              {(orders?.products || [])?.map((item, index) => (
                                <tr>
                                  <td>
                                    <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                      <div className="col-auto">
                                        <span className="cart_product">
                                          <img
                                            src={
                                              item?.flavour?._id
                                                ? item?.flavour?.flavourImage
                                                : item?.productId?.productImage
                                            }
                                            alt=""
                                          />
                                        </span>
                                      </div>
                                      <div className="col">
                                        <div className="cart_content ">
                                          <h3 className="fs-5">
                                            {item?.flavour?._id
                                              ? item?.productId?.unitName +
                                                "-" +
                                                item?.flavour?.flavour
                                              : item?.productId?.unitName}
                                          </h3>
                                          <p>
                                            Barcodes:{" "}
                                            {item?.flavour?.barcode.map(
                                              (item) => (
                                                <li>{item},</li>
                                              )
                                            )}
                                          </p>
                                          <span className="ordertext my-2 d-block ">
                                            Ordered On:{" "}
                                            {item?.productId?.createdAt?.slice(
                                              0,
                                              10
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="quantity_text">
                                      {item?.quantity}
                                    </span>
                                  </td>
                                </tr>
                              ))}
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
                                onChange={(e) => {
                                  setOrderStatus(e.target.value);
                                }}
                              >
                                <option selected="">{orders?.status}</option>
                                <option value="ORDER PLACED">
                                  Order Placed
                                </option>
                                <option value="DISPATCHED">Dispatched</option>
                                <option value="SHIPPED">Shipped</option>
                                <option value="DELIVERED">Delivered</option>
                                <option value="CANCEL">Canceled</option>
                              </select>
                            </div>
                            <div className="form-group mb-0 col-auto">
                              <button
                                className="comman_btn"
                                onClick={UpdateOrderStatus}
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                        <span className="small_header">Shipment Details</span>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Buyer Name:</span>
                            <div className="col">
                              <strong>
                                {orders?.userId?.firstName +
                                  " " +
                                  orders?.userId?.lastName}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Email:</span>
                            <div className="col">
                              <strong>{orders?.userId?.email}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Mobile Number:</span>
                            <div className="col">
                              <strong>{orders?.userId?.phoneNumber}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Shipment Location:</span>
                            <div className="col">
                              <strong>
                                {orders?.userId?.addressLine[0] +
                                  "," +
                                  orders?.userId?.city +
                                  "," +
                                  orders?.userId?.state +
                                  "-" +
                                  orders?.userId?.zipcode}
                              </strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Type:</span>
                            <div className="col">
                              <strong>{orders?.type}</strong>
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

export default ViewOrder;
