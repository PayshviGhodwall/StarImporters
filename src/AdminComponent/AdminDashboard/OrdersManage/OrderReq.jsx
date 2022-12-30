import axios from "axios";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
const OrderReq = () => {
  const orderList = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderList`;
  const quoteList = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/getAllQuotations`;
  const exportAllOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/exportAllOrders`;
  const exportAllQuotes = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/exportAllQuotes`;
  const searchOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/searchOrders`;
  const quoteOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/searchQuotes`;
  const [orders, setOrders] = useState([]);
  const [quoteReq, setQuoteReq] = useState([]);
  const [sideBar, setSideBar] = useState(true);
  const [values, setValues] = useState({ from: "", to: "" });
  const navigate = useNavigate();
  const fileDownload = (url, name) => {
    saveAs(url, name);
  };
  useEffect(() => {
    OrderRequest();
    QuoteRequest();
  }, []);
  const OrderRequest = async () => {
    await axios.post(orderList).then((res) => {
      setOrders(res?.data.results?.orders);
    });
  };
  const QuoteRequest = async () => {
    await axios.post(quoteList).then((res) => {
      setQuoteReq(res?.data.results);
    });
  };

  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
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
  const onQuoteSearch = async (e) => {
    e.preventDefault();
    await axios
      .post(quoteList, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        setQuoteReq(res?.data.results);
      });
  };
  const exportOrder = async (e) => {
    e.preventDefault();
    await axios
      .post(exportAllOrder, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        if (!res?.error) {
          fileDownload(res?.data.results?.file);
        }
      });
  };
  const exporQuotation = async (e) => {
    e.preventDefault();
    await axios
      .post(exportAllQuotes, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        if (!res?.error) {
          fileDownload(res?.data.results?.file, "request");
        }
      });
  };
  const OrderSearch = async (e) => {
    let string = e.target.value;
    string !== ""
      ? await axios
          .post(searchOrder, {
            search: e.target.value,
          })
          .then((res) => {
            if (!res.error) {
              setOrders(res?.data.results.order);
            }
          })
      : OrderRequest();
  };
  const QuoteSearch = async (e) => {
    let string = e.target.value;
    string !== ""
      ? await axios
          .post(quoteOrder, {
            search: e.target.value,
          })
          .then((res) => {
            if (!res.error) {
              setQuoteReq(res?.data.results.quotes);
            }
          })
      : QuoteRequest();
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
                  <div className="row">
                    <div className="col-12 user-management-tabs px-0">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            Order
                            <span className="circle_count">
                              {orders?.length ? orders?.length : 0}
                            </span>
                          </button>
                          <button
                            className="nav-link"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                          >
                            Quotation Request
                            <span className="circle_count">
                              {quoteReq?.length ? quoteReq?.length : 0}
                            </span>
                          </button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div className="row mx-0">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action=""
                              >
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">From</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="from"
                                    value={values.from}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">To</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="to"
                                    value={values.to}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-1 text-center">
                                  <button
                                    className="comman_btn rounded"
                                    onClick={onOrderSearch}
                                  >
                                    Search
                                  </button>
                                </div>
                                <div className="col-2 text-center">
                                  <button
                                    className="comman_btn2 rounded"
                                    onClick={exportOrder}
                                  >
                                    Export <i class="fa fa-download"></i>
                                  </button>
                                </div>
                                <div className=" d -flex col-3">
                                  <form className="form-design" action="">
                                    <div className="form-group mb-0 position-relative icons_set">
                                      <input
                                        type="text"
                                        className="form-control bg-white "
                                        placeholder="Search by Order ID/Customer Name"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                          OrderSearch(e);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </form>
                              <div className="row">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{ backgroundColor: "#f2f2f2" }}
                                        >
                                          <th>S.No.</th>
                                          <th>User Name</th>
                                          <th>Mobile Number</th>
                                          <th>Email</th>
                                          <th>Order ID</th>
                                          <th>Status</th>
                                          <th>Order Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(orders || [])?.map((item, index) => (
                                          <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {item?.userId?.firstName ||
                                                item?.user?.firstName}
                                            </td>
                                            <td>
                                              {item?.userId?.phoneNumber ||
                                                item?.user?.phoneNumber}
                                            </td>
                                            <td>
                                              {item?.userId?.email ||
                                                item?.user?.email}
                                            </td>
                                            <td>{item?.orderId}</td>
                                            <td>{item?.status}</td>
                                            <td>
                                              <button
                                                className="comman_btn table_viewbtn"
                                                onClick={() => {
                                                  navigate(
                                                    "/OrderRequest/ViewOrder",
                                                    {
                                                      state: {
                                                        id: item?._id,
                                                      },
                                                    }
                                                  );
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
                        <div
                          className="tab-pane fade"
                          id="nav-profile"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          <div className="row mx-0">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action=""
                              >
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">From</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="from"
                                    value={values.from}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">To</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="to"
                                    value={values.to}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-1 text-center">
                                  <button
                                    className="comman_btn rounded"
                                    onClick={onQuoteSearch}
                                  >
                                    Search
                                  </button>
                                </div>
                                <div className="col-2 text-center">
                                  <button
                                    className="comman_btn2 rounded"
                                    onClick={exporQuotation}
                                  >
                                    Export <i class="fa fa-download"></i>
                                  </button>
                                </div>
                                <div className=" d -flex col-3">
                                  <form className="form-design" action="">
                                    <div className="form-group mb-0 position-relative icons_set">
                                      <input
                                        type="text"
                                        className="form-control bg-white "
                                        placeholder="Search by Quote
                                         ID/Customer Name"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                          QuoteSearch(e);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </form>
                              <div className="row">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{ backgroundColor: "#f2f2f2" }}
                                        >
                                          <th>S.No.</th>
                                          <th>User Name</th>
                                          <th>Mobile Number</th>
                                          <th>Email</th>
                                          <th>Request Id</th>
                                          <th>Status</th>
                                          <th>QUOTATION REQUEST</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(quoteReq || [])?.map(
                                          (item, index) => (
                                            <tr key={index}>
                                              <td>{index + 1}</td>
                                              <td>
                                                {item?.userId?.firstName || item?.user?.firstName}
                                              </td>
                                              <td>
                                                {item?.userId?.phoneNumber || item?.user?.phoneNumber }
                                              </td>
                                              <td>{item?.userId?.email || item?.user?.email}</td>
                                              <td>{item?.quoteId}</td>

                                              <td>{item?.status}</td>
                                              <td>
                                                <button
                                                  className="comman_btn table_viewbtn"
                                                  onClick={() => {
                                                    navigate(
                                                      "/OrderRequest/ViewQuotationRequest",
                                                      {
                                                        state: {
                                                          id: item?._id,
                                                        },
                                                      }
                                                    );
                                                  }}
                                                >
                                                  View
                                                </button>
                                              </td>
                                            </tr>
                                          )
                                        )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReq;
