import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { FaFileUpload } from "react-icons/fa";
import { saveAs } from "file-saver";
import Starlogo from "../../../assets/img/logo.png";
import { useEffect } from "react";
import axios from "axios";
import { FaFileDownload } from "react-icons/fa";
import ProfileBar from "../ProfileBar";
import { Button } from "rsuite";
import moment from "moment";
// Default CSS
import "rsuite/dist/rsuite.min.css";
import Swal from "sweetalert2";
import { MDBDataTable } from "mdbreact";

const ApprovedView = () => {
  const [msg, setMsg] = useState("");
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;
  const generatePass = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/generatePassword`;
  const UserOrders = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUserOrders`;
  const [sideBar, setSideBar] = useState(true);
  const [user, setUser] = useState([]);
  const [editText, setEditText] = useState("Edit");
  const [expand1, setExpand1] = useState(true);
  const [expand2, setExpand2] = useState(true);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  let User = JSON.parse(localStorage.getItem("AdminData"));
  const objectId = localStorage.getItem("objectId");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [orders, setOrders] = useState({
    columns: [
      {
        label: "DATE",
        field: "date",
        sort: "asc",
        width: 150,
      },

      {
        label: "ORDER ID",
        field: "id",
        sort: "asc",
        width: 100,
      },
      {
        label: "ORDER STATUS",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "ORDER TYPE",
        field: "type",
        sort: "asc",
        width: 100,
      },
      {
        label: "PULLER STATUS",
        field: "pull",
        sort: "asc",
        width: 100,
      },

      {
        label: "ORDER DETAILS",
        field: "details",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  const [quote, setQuote] = useState({
    columns: [
      {
        label: "DATE",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "COMPANY NAME",
        field: "name",
        sort: "asc",
        width: 150,
      },

      {
        label: "REQUEST ID",
        field: "id",
        sort: "asc",
        width: 100,
      },

      {
        label: "STATUS",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "REQUEST DETAILS",
        field: "details",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  const [account, setAccount] = useState({
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },

      {
        label: "Company Name",
        field: "name_comp",
        sort: "asc",
        width: 100,
      },
      {
        label: "Full Name",
        field: "name",
        sort: "asc",
        width: 100,
      },
      {
        label: "Address",
        field: "address",
        sort: "asc",
        width: 100,
      },
      {
        label: "Business Number",
        field: "number",
        sort: "asc",
        width: 100,
      },

      {
        label: "Action",
        field: "action",
        sort: "asc",
        width: 100,
      },
    ],
    rows: [],
  });

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(apiUrl + "/" + objectId);
      let results = res.data.results;
      const newRows = [];
      const newRows2 = [];
      if (!res.data.error) {
        let values = res?.data.results?.subAccounts;
        values?.map((list, index) => {
          const returnData = {};
          returnData.name_comp = list?.companyName;
          returnData.name = list?.firstName;
          returnData.number = list?.businessPhoneNumber;
          returnData.address = list?.addressLine1;
          // returnData.pull = list?.pullStatus;
          returnData.date = moment(list?.createdAt).format("MM/DD/YYYY");
          returnData.action = (
            <>
              <button
                className="comman_btn table_viewbtn"
                onClick={() => {
                  navigate(`/UserManage/User/Sub-account/${list?._id}`, {
                    state: {
                      id: objectId,
                    },
                  });
                }}>
                View
              </button>
            </>
          );
          newRows.push(returnData);
        });

        setAccount({ ...account, rows: newRows });
      }

      setUser(res.data.results);
      if (results.quotation === false) {
        document.getElementById("sh").checked = true;
      }

      return res.data;
    };
    getUser();
    getOrders();
  }, []);
  const fileDownload = (url) => {
    saveAs(url);
  };
  const getOrders = async () => {
    const { data } = await axios.post(UserOrders + "/" + objectId);
    if (!data.error) {
      console.log(data);
      const newRows = [];
      const newRows2 = [];
      if (!data.error) {
        let values = data?.results?.orders;
        let values2 = data?.results?.quotations;
        values?.map((list, index) => {
          const returnData = {};
          returnData.id = list?.orderId;
          returnData.status = list?.status;
          returnData.type = list?.type;
          returnData.pull = list?.pullStatus;
          returnData.date = moment(list?.createdAt).format("MM/DD/YYYY");
          returnData.details = (
            <>
              <button
                className="comman_btn table_viewbtn"
                onClick={() => {
                  navigate(`/OrderRequest/ViewOrder/${list?._id}`, {
                    state: {
                      id: list?._id,
                    },
                  });
                }}>
                View
              </button>
            </>
          );
          newRows.push(returnData);
        });
        values2?.map((list, index) => {
          const returnData2 = {};
          returnData2.sn = index + 1 + ".";
          returnData2.name = list?.userId?.companyName;
          returnData2.id = list?.quoteId;
          returnData2.status = list?.status;
          returnData2.date = moment(list?.createdAt).format("MM/DD/YYYY");
          returnData2.details = (
            <>
              <button
                className="comman_btn table_viewbtn"
                onClick={() => {
                  navigate("/OrderRequest/ViewQuotationRequest", {
                    state: {
                      id: list?._id,
                    },
                  });
                }}>
                View
              </button>
            </>
          );
          newRows2.push(returnData2);
        });

        setOrders({ ...orders, rows: newRows });
        setQuote({ ...quote, rows: newRows2 });
      }
    }
  };
  const genPassword = async () => {
    setLoader(true);
    await axios.post(generatePass + "/" + objectId).then((res) => {
      if (res?.data.message === "password Generated") {
        setLoader(false);
        setMsg("Password Generated Successfully");
        Swal.fire({
          title: "Password Generated Successfully",
          text: "Please Check your Email",
          icon: "success",
          showCloseButton: true,
        });
      }
    });
  };
  const preview = (id) => {
    if (id.endsWith(".pdf")) {
      window.location.href = id;
      Swal.fire({
        title: "Preview Not Available!",
        text: "Pdf cannot be shown! Try download and open.",
        icon: "error",
      });
    } else {
      document.getElementById("preview_modal").click();
      document.getElementById("preview_images").src = id;
    }
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
            {User?.type === "SubAdmin" ? (
              <ul className="list-unstyled ps-1 m-0">
                <li
                  className={
                    User?.access?.includes("Dashboard") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/AdminDashboard"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "2px",
                      }}
                      className="fa fa-home"></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("User Management") ? "" : "d-none"
                  }>
                  <Link
                    className="bg-white"
                    to="/UserManage"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-user"></i>{" "}
                    User Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Category Sub-Category Management")
                      ? ""
                      : "d-none"
                  }>
                  <Link
                    className=""
                    to="/CategorySub"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"></i>{" "}
                    Category &amp; Sub Category
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Inventory Management")
                      ? ""
                      : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Inventory"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "6px",
                        top: "3px",
                      }}
                      class="far fa-building"></i>{" "}
                    Inventory Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Brands Management") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/brandsManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-ship"></i>{" "}
                    Brands Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Sub-Admin") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fas fa-user-cog"></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>

                <li
                  className={User?.access?.includes("Puller") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Puller-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-users-gear"></i>{" "}
                    Puller Management
                  </Link>
                </li>

                <li
                  className={User?.access?.includes("Gallery") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"></i>{" "}
                    Gallery Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("catalogFlyers") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Catelog-Flyers"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-book"></i>{" "}
                    Catalog & Flyers
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Orders Management") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"></i>{" "}
                    Order Management
                  </Link>
                </li>
                <li className={User?.access?.includes("CMS") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Cms"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-cog"></i>{" "}
                    Content Management
                  </Link>
                </li>
                <li
                  className={User?.access?.includes("Contact") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Contact&Support"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-handshake-angle"></i>{" "}
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/AdminLogin"
                    onClick={handleClick}
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-sign-out-alt"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="list-unstyled ps-1 m-0">
                <li>
                  <Link
                    className=""
                    to="/AdminDashboard"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "2px",
                      }}
                      className="fa fa-home"></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-white"
                    to="/UserManage"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-user"></i>{" "}
                    User Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/CategorySub"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"></i>{" "}
                    Category &amp; Sub Category
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Inventory"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "6px",
                        top: "3px",
                      }}
                      class="far fa-building"></i>{" "}
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/brandsManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-ship"></i>{" "}
                    Brands Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fas fa-user-cog"></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li>
                  <Link
                    className="d-none at"
                    to="/Puller-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-users-gear"></i>{" "}
                    Puller Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"></i>{" "}
                    Gallery Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Catelog-Flyers"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-book"></i>{" "}
                    Catalog & Flyers
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"></i>{" "}
                    Order Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Cms"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-cog"></i>{" "}
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Contact&Support"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-handshake-angle"></i>{" "}
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/AdminLogin"
                    onClick={handleClick}
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-sign-out-alt"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            )}
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
                    }}>
                    <i className="fa fa-bars"></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar);
                      }}>
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
      </div>
      <div className="admin_panel_data height_adjust">
        <div className="row Pending-view justify-content-center">
          <div className="col-12">
            {user?.multipleUsers && (
              <div className="text-end">
                <Link
                  to={`/UserManage/AddSubAccount/${objectId}`}
                  className="comman_btn2 mb-2">
                  Add Sub-Account
                </Link>
              </div>
            )}

            <div className="row mx-0">
              <div className="col-12 design_outter_comman recent_orders shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2 className="main_headers">Approved User Details</h2>
                  </div>
                  <div className="col-auto d-flex">
                    <div className="Status_box mx-4 mt-2">
                      Status: <strong>Active</strong>
                    </div>
                    <div className="Status_box">
                      {expand1 ? (
                        <i
                          class="fa fa-square-minus fs-3"
                          onClick={() => setExpand1(!expand1)}></i>
                      ) : (
                        <i
                          class="fa-solid fa-square-caret-down fs-3"
                          onClick={() => setExpand1(true)}></i>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-12 p-4 Pending-view-main">
                    <div className={expand1 ? "row py-2" : "row py-2 d-none"}>
                      <div className="col-12 text-center mb-5">
                        <div className="Pending-view_img">
                          <img
                            className="UserImage mb-3"
                            src={
                              user?.profileImage ? user?.profileImage : Starlogo
                            }
                            alt="Image not Uploaded"
                          />
                        </div>
                        <h4 className="user_name mt-5">{user?.firstName}</h4>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Company:</span>
                          <div className="col">
                            <strong>{user?.companyName}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">DBA:</span>
                          <div className="col">
                            <strong>{user?.dba}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Company Address Line 1:
                          </span>
                          <div className="col">
                            <strong>{user?.addressLine1}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Company Address Line 2:
                          </span>
                          <div className="col">
                            <strong>{user?.addressLine2}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-3 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">State:</span>
                          <div className="col">
                            <strong>{user?.state}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">City:</span>
                          <div className="col">
                            <strong>{user?.city}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Zip/Postal Code:</span>
                          <div className="col">
                            <strong>{user?.zipcode}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.federalTaxId
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }>
                          <span className="fw-bold">Federal Tax ID:</span>
                          <div className="col img_box_show ">
                            <input
                              className="d-none"
                              type="file"
                              id="file1"
                              name="file"
                              disabled
                            />
                            <label htmlFor="file1">
                              <div className="">
                                {user?.federalTaxId ? (
                                  <i
                                    class="fa fa-eye preview_icon"
                                    onClick={() =>
                                      preview(user?.federalTaxId)
                                    }></i>
                                ) : null}
                                <Link className="text-decoration-none">
                                  {user.federalTaxId ? (
                                    <FaFileDownload
                                      onClick={() => {
                                        fileDownload(user?.federalTaxId);
                                      }}
                                      size={25}
                                      color="black"
                                    />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    onClick={() => {
                                      fileDownload(user?.federalTaxId);
                                    }}
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}>
                                    {user?.federalTaxId?.slice(0, 40)}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.tobaccoLicence
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }>
                          <span className="fw-bold">Tobacco License:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file1"
                              name="file"
                              disabled
                            />
                            <label htmlFor="file1">
                              <div className="">
                                {user?.tobaccoLicence ? (
                                  <i
                                    class="fa fa-eye preview_icon"
                                    onClick={() =>
                                      preview(user?.tobaccoLicence)
                                    }></i>
                                ) : null}
                                <Link className="text-decoration-none">
                                  {user.tobaccoLicence ? (
                                    <FaFileDownload
                                      onClick={() => {
                                        fileDownload(user?.tobaccoLicence);
                                      }}
                                      size={25}
                                      color="black"
                                    />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    onClick={() => {
                                      fileDownload(user?.tobaccoLicence);
                                    }}
                                    style={{ fontSize: "9px" }}>
                                    {user?.tobaccoLicence?.slice(0, 40)}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>

                          {user?.tobaccoLicence === "" ? (
                            ""
                          ) : (
                            <strong>
                              Expires on :{" "}
                              {user?.tobaccoLicenceExpiry?.slice(0, 10)}
                            </strong>
                          )}
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.salesTaxId
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }>
                          <span className="fw-bold">Sales Tax ID:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file1"
                              name="file"
                              disabled
                            />
                            <label htmlFor="file1">
                              <div className="">
                                {user?.salesTaxId ? (
                                  <i
                                    class="fa fa-eye preview_icon"
                                    onClick={() =>
                                      preview(user?.salesTaxId)
                                    }></i>
                                ) : null}
                                <Link className="text-decoration-none">
                                  {user.salesTaxId ? (
                                    <FaFileDownload
                                      onClick={() => {
                                        fileDownload(user?.salesTaxId);
                                      }}
                                      size={25}
                                      color="black"
                                    />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    onClick={() => {
                                      fileDownload(user?.salesTaxId);
                                    }}
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}>
                                    {user?.salesTaxId?.slice(0, 40)}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.businessLicense
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }>
                          <span className="fw-bold">Business License:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file1"
                              name="file"
                              disabled
                            />
                            <label htmlFor="file1">
                              <div className="">
                                {user?.businessLicense ? (
                                  <i
                                    class="fa fa-eye preview_icon"
                                    onClick={() =>
                                      preview(user?.businessLicense)
                                    }></i>
                                ) : null}
                                <Link className="text-decoration-none">
                                  {user?.businessLicense ? (
                                    <FaFileDownload
                                      onClick={() => {
                                        fileDownload(user?.businessLicense);
                                      }}
                                      size={25}
                                      color="black"
                                    />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    onClick={() => {
                                      fileDownload(user?.businessLicense);
                                    }}
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}>
                                    {user?.businessLicense?.slice(0, 40)}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Contact First name:</span>
                          <div className="col">
                            <strong> {user?.firstName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Contact Last name:</span>
                          <div className="col">
                            <strong> {user?.lastName}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Phone Number:</span>
                          <div className="col">
                            <strong>{user?.phoneNumber}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.accountOwnerId
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }>
                          <span className="fw-bold">Account Owner ID:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file1"
                              name="file"
                              disabled
                            />
                            <label htmlFor="file1">
                              <div className="">
                                {user?.accountOwnerId ? (
                                  <i
                                    class="fa fa-eye preview_icon2"
                                    onClick={() =>
                                      preview(user?.accountOwnerId)
                                    }></i>
                                ) : null}

                                <Link className="text-decoration-none">
                                  {user.accountOwnerId ? (
                                    <FaFileDownload
                                      onClick={() => {
                                        fileDownload(user?.accountOwnerId);
                                      }}
                                      size={25}
                                      color="black"
                                    />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    onClick={() => {
                                      fileDownload(user?.accountOwnerId);
                                    }}
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}>
                                    {user?.accountOwnerId?.slice(0, 40)}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Email Address:</span>
                          <div className="col">
                            <strong>{user?.email}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Business Number:</span>
                          <div className="col">
                            <strong>{user?.businessPhoneNumber}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            How did you hear about us?:
                          </span>
                          <div className="col">
                            <strong>{user?.heardAboutUs}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">
                            Request for Quotation :
                          </span>
                          <div className="col">
                            <div className="action_filter filter_check">
                              <input
                                className="d-none"
                                type="radio"
                                id="vii"
                                checked={user?.quotation}
                                name="quotation"
                                disabled
                              />
                              <label htmlFor="vii">Enabled</label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="action_filter filter_check">
                              <input
                                className="d-none"
                                type="radio"
                                id="sh"
                                name="quotation"
                                disabled
                              />
                              <label htmlFor="sh">Disabled </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {user?.tobaccoLicence === "" ? (
                        ""
                      ) : (
                        <div className="col-md-3 mb-4 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span className="fw-bold fs-6">
                              Tobacco License:
                            </span>
                            <div className="col">
                              <div className="action_filter filter_check">
                                <input
                                  className="d-none"
                                  type="radio"
                                  id="license"
                                  checked={
                                    user?.istobaccoLicenceExpired ? false : true
                                  }
                                  name="license"
                                  disabled
                                />
                                <label htmlFor="vii">Enabled</label>
                              </div>
                            </div>
                            <div className="col">
                              <div className="action_filter filter_check">
                                <input
                                  className="d-none"
                                  type="radio"
                                  id="d_license"
                                  name="license"
                                  checked={
                                    user?.istobaccoLicenceExpired ? true : false
                                  }
                                  disabled
                                />
                                <label htmlFor="sh">Disabled </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">Multiple Users:</span>
                          <div className="col">
                            <div className="action_filter filter_check">
                              <input
                                className="d-none"
                                type="radio"
                                id="multipleUser"
                                checked={user?.multipleUsers ? true : false}
                                name="multipleUser"
                                disabled
                              />
                              <label htmlFor="multipleUser">Enabled</label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="action_filter filter_check">
                              <input
                                className="d-none"
                                type="radio"
                                id="d_multi"
                                name="multiUsers"
                                checked={user?.multipleUsers ? false : true}
                                disabled
                              />
                              <label htmlFor="d_multi">Disabled</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Wholesale Confirmation ?
                          </span>
                          <div className="col">
                            <strong>
                              {user?.wholesaleConfirmation ? "Yes" : "No"}
                            </strong>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <Link
                          to="/UserManage/ApprovedView-editUser"
                          className="comman_btn2 text-decoration-none">
                          {editText}
                        </Link>
                        <Button
                          loading={loader}
                          style={{
                            backgroundColor: "#eb3237",
                            fontSize: "20px",
                            position: "relative",
                            top: "-2px",
                          }}
                          appearance="primary"
                          className="comman_btn2 mx-2"
                          onClick={genPassword}>
                          Generate Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mx-0 mt-4">
              <div className="col-12 design_outter_comman recent_orders shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2 className="main_headers">Order History</h2>
                  </div>
                  <div className="col-auto d-flex">
                    <div className="Status_box">
                      {expand2 ? (
                        <i
                          class="fa fa-square-minus fs-3"
                          onClick={() => setExpand2(!expand2)}></i>
                      ) : (
                        <i
                          class="fa-solid fa-square-caret-down fs-3"
                          onClick={() => setExpand2(true)}></i>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 px-3 Pending-view-main">
                    <div className={expand2 ? "row py-2" : "row py-2 d-none"}>
                      <div className="col-12 user-management-tabs px-0">
                        <nav>
                          <div
                            className="nav nav-tabs_usr  "
                            id="nav-tab"
                            role="tablist">
                            <button
                              className="nav-link active"
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true">
                              All Orders
                            </button>

                            <button
                              className="nav-link mt-1"
                              id="nav-profile-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-profile"
                              type="button"
                              role="tab"
                              aria-controls="nav-profile"
                              aria-selected="false">
                              All Quotations Request
                            </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab">
                            <div className="row mx-0">
                              <div className="col-12">
                                <div className="row ">
                                  <div className="col-12 comman_table_design px-0">
                                    <div className="table-responsive p-0">
                                      <MDBDataTable
                                        bordered
                                        displayEntries={false}
                                        className="categoryTable"
                                        hover
                                        data={orders}
                                        noBottomColumns
                                        sortable
                                      />
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
                            aria-labelledby="nav-profile-tab">
                            <div className="row mx-0 ">
                              <div className="col-12">
                                <div className="row ">
                                  <div className="col-12 comman_table_design px-0">
                                    <div className="table-responsive p-0">
                                      <MDBDataTable
                                        bordered
                                        displayEntries={false}
                                        className="categoryTable"
                                        hover
                                        data={quote}
                                        noBottomColumns
                                        sortable
                                      />
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

            <div className="row mx-0 mt-4">
              <div className="col-12 design_outter_comman recent_orders shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2 className="main_headers">All Sub Accounts</h2>
                  </div>
                  <div className="col-auto d-flex"></div>
                </div>

                <div className="row">
                  <div className="col-12 px-3 Pending-view-main">
                    <div className="row py-2">
                      <div className="col-12 user-management-tabs px-0">
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab">
                            <div className="row mx-0">
                              <div className="col-12">
                                <div className="row ">
                                  <div className="col-12 comman_table_design px-0">
                                    <div className="table-responsive p-0">
                                      <MDBDataTable
                                        bordered
                                        displayEntries={false}
                                        className="categoryTable"
                                        hover
                                        data={account}
                                        noBottomColumns
                                        sortable
                                      />
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

      <button
        type="button"
        class="btn btn-primary d-none"
        id="preview_modal"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header comman_modal">
              <h5 class="modal-title">Preview</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <strong>Only Images Preview Available!</strong>
              <img
                src={user?.federalTaxId}
                type="application/pdf"
                className="preview_image"
                id="preview_images"></img>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedView;
