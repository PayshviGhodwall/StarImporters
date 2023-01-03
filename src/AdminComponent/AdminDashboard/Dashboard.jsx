import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../assets/css/adminMain.css";

import Starlogo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile_img1.png";
import { HiMenuAlt1 } from "react-icons/hi";
import $ from "jquery";
import ProfileBar from "./ProfileBar";
import axios from "axios";

const Dashboard = () => {
  const orderList = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderList`;
  const totalUser = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/dashboard/totalUsers`;
  const totalOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/totalOrders`;
  const totalReq = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/dashboard/totalRequestHistory`;
  const [values, setValues] = useState({ from: "", to: "" });
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [totalRequest, setTotalRequest] = useState();
  const [sideBar, setSideBar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllOrders();
    GetAllUsers();
    GetAllRequest();
    OrderRequest();
  },[]); 

  const OrderRequest = async () => {
    await axios.post(orderList).then((res) => {
      setOrders(res?.data.results?.orders);
    });
  };
  const GetAllOrders = async () => {
    await axios.get(totalOrder).then((res) => {
      setTotalOrders(res?.data.results);
    });
  };
  const GetAllUsers = async () => {
    await axios.get(totalUser).then((res) => {
      setTotalUsers(res?.data.results);
    });
  };
  const GetAllRequest = async () => {
    await axios.get(totalReq).then((res) => {
      setTotalRequest(res?.data.results);
    });
  };
  
  const onOrderSearch = async (e) => {
    e.preventDefault();
    await axios
      .post(orderList, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        setOrders(res?.data.results?.orders);
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
                  className="bg-white"
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "#3e4093",
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
                  className=""
                  to="/OrderRequest"
                  style={{ textDecoration: "none", fontSize: "18px" }}
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
          <div className="row dashboard_part justify-content-center">
            <div className="col-12">
              <div className="row ms-3 mb-5 justify-content-center">
                <div className="col d-flex align-items-stretch">
                  <a
                    href="javascript:;"
                    className="row dashboard_box box_design me-3 w-100 text-decoration-none"
                  >
                    <div className="col-auto px-0">
                      <span className="dashboard_icon">
                        <i className="fas fa-user" />
                      </span>
                    </div>
                    <div className="col pe-0">
                      <div className="dashboard_boxcontent">
                        <h2>Total User</h2>
                        <span>{totalUsers}</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col d-flex align-items-stretch">
                  <a className="row dashboard_box box_design me-3 w-100 text-decoration-none">
                    <div className="col-auto px-0">
                      <span className="dashboard_icon">
                        <i className="fa fa-shopping-bag" />
                      </span>
                    </div>
                    <div className="col pe-0">
                      <div className="dashboard_boxcontent">
                        <h2>Total Orders</h2>
                        <span>{totalOrders}</span>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col d-flex align-items-stretch pe-0">
                  <a className="row dashboard_box box_design me-0 w-100 text-decoration-none">
                    <div className="col-auto px-0">
                      <span className="dashboard_icon">
                        <i className="fas fa-user-friends" />
                      </span>
                    </div>
                    <div className="col pe-0">
                      <div className="dashboard_boxcontent">
                        <h2>Request History</h2>
                        <span>{totalRequest}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className="row mx-0">
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Recent Orders</h2>
                    </div>
                    <div className="col-3">
                      <form className="form-design" action="">
                        <div className="form-group mb-0 position-relative icons_set">
                          <input
                            type="text"
                            className="form-control bg-white"
                            placeholder="Search Recent Orders"
                            name="name"
                            id="name"
                          
                          />
                          <i className="far fa-search" />
                        </div>
                      </form>
                    </div>
                  </div>
               
                  <div className="row">
                    <div className="col-12 comman_table_design px-0">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                              <th>S.No.</th>
                              <th>User Name</th>
                              <th>Mobile Number</th>
                              <th>Order Date</th>
                              <th>Order ID</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(orders || [])?.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {item?.userId?.firstName +
                                    " " +
                                    item?.userId?.lastName}
                                </td>
                                <td>{item?.userId?.phoneNumber}</td>
                                <td>{item?.createdAt?.slice(0, 10)}</td>
                                <td>{item?.orderId}</td>
                                <td>
                                  <button
                                    className="comman_btn table_viewbtn"
                                    onClick={() => {
                                      navigate("/OrderRequest/ViewOrder", {
                                        state: {
                                          id: item?._id,
                                        },
                                      });
                                    }}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
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

export default Dashboard;
