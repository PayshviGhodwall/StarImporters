import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { FaFileUpload, FaLessThanEqual } from "react-icons/fa";
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
const ApprovedView = () => {
  const [msg, setMsg] = useState("");
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;
  const generatePass = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/generatePassword`;
  const [sideBar, setSideBar] = useState(true);
  const [user, setUser] = useState([]);
  const [editText, setEditText] = useState("Edit");
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  let User = JSON.parse(localStorage.getItem("AdminData"));
  const objectId = localStorage.getItem("objectId");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(apiUrl + "/" + objectId);
      let results = res.data.results;
      setUser(res.data.results);
      if (results.quotation === false) {
        document.getElementById("sh").checked = true;
      }

      return res.data;
    };
    getUser();
  }, []);
  const fileDownload = (url) => {
    saveAs(url);
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
    document.getElementById("preview_modal").click();
    document.getElementById("preview_images").src = id;
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
                  }
                >
                  <Link
                    className=""
                    to="/AdminDashboard"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "2px",
                      }}
                      className="fa fa-home"
                    ></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("User Management") ? "" : "d-none"
                  }
                >
                  <Link
                    className="bg-white"
                    to="/UserManage"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-user"
                    ></i>{" "}
                    User Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Category Sub-Category Management")
                      ? ""
                      : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/CategorySub"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"
                    ></i>{" "}
                    Category &amp; Sub Category
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Inventory Management")
                      ? ""
                      : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/Inventory"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "6px",
                        top: "3px",
                      }}
                      class="far fa-building"
                    ></i>{" "}
                    Inventory Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Brands Management") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/brandsManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-ship"
                    ></i>{" "}
                    Brands Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Sub-Admin") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Orders Request") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"
                    ></i>{" "}
                    Order request
                  </Link>
                </li>
                <li className={User?.access?.includes("CMS") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Cms"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
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
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-sign-out-alt"
                    ></i>
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
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "2px",
                      }}
                      className="fa fa-home"
                    ></i>{" "}
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
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
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
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-layer-group"
                    ></i>{" "}
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
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "6px",
                        top: "3px",
                      }}
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
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-ship"
                    ></i>{" "}
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
                    }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
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
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
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
                      style={{
                        position: "relative",
                        left: "4px",
                        top: "3px",
                      }}
                      class="fa fa-sign-out-alt"
                    ></i>
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
                    }}
                  >
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
      </div>
      <div className="admin_panel_data height_adjust">
        <div className="row Pending-view justify-content-center">
          <div className="col-12">
            <div className="row mx-0">
              <div className="col-12 design_outter_comman recent_orders shadow">
                <div className="row comman_header justify-content-between">
                  <div className="col-auto">
                    <h2 className="main_headers">Edit Approved Details</h2>
                  </div>
                  <div className="col-auto">
                    <div className="Status_box">
                      Status: <strong>Active</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 p-4 Pending-view-main">
                    <div className="row py-2">
                      <div className="col-12 text-center mb-4">
                        <div className="Pending-view_img">
                          <img
                            className="UserImage"
                            src={
                              user?.profileImage ? user?.profileImage : Starlogo
                            }
                            alt="Image not Uploaded"
                          />
                        </div>
                        <h4 className="user_name">{user?.firstName}</h4>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Company:</span>
                          <div className="col">
                            <strong>{user?.companyName}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">DBA:</span>
                          <div className="col">
                            <strong>{user?.dba}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Company Address Line 1:
                          </span>
                          <div className="col">
                            <strong>{user?.addressLine1}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Company Address Line 2:
                          </span>
                          <div className="col">
                            <strong>{user?.addressLine2}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">City:</span>
                          <div className="col">
                            <strong>{user?.city}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">State:</span>
                          <div className="col">
                            <strong>{user?.state}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
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
                          }
                        >
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
                                    onClick={() => preview(user?.federalTaxId)}
                                  ></i>
                                ) : null}
                                <Link
                                  to=""
                                  className="text-decoration-none"
                                  onClick={() => {
                                    fileDownload(user?.federalTaxId);
                                  }}
                                >
                                  {user.federalTaxId ? (
                                    <FaFileDownload size={25} color="black" />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {user?.federalTaxId}
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
                          }
                        >
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
                                    }
                                  ></i>
                                ) : null}
                                <Link
                                  to=""
                                  className="text-decoration-none"
                                  onClick={() => {
                                    fileDownload(user?.tobaccoLicence);
                                  }}
                                >
                                  {user.tobaccoLicence ? (
                                    <FaFileDownload size={25} color="black" />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {user?.tobaccoLicence}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>

                          <strong>
                            {" "}
                            Expires on :{" "}
                            {moment(
                              user?.tobaccoLicenceExpiry?.slice(0, 10)
                            ).format("MM/DD/YYYY")}
                          </strong>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div
                          className={
                            user.salesTaxId
                              ? "row view-inner-box border  mx-0 w-100"
                              : "row view-inner-box border border-danger text-danger mx-0 w-100"
                          }
                        >
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
                                    onClick={() => preview(user?.salesTaxId)}
                                  ></i>
                                ) : null}
                                <Link
                                  to=""
                                  className="text-decoration-none"
                                  onClick={() => {
                                    fileDownload(user?.salesTaxId);
                                  }}
                                >
                                  {user.salesTaxId ? (
                                    <FaFileDownload size={25} color="black" />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {user?.salesTaxId}
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
                          }
                        >
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
                                    }
                                  ></i>
                                ) : null}
                                <Link
                                  to=""
                                  className="text-decoration-none"
                                  onClick={() => {
                                    fileDownload(user?.businessLicense);
                                  }}
                                >
                                  {user?.businessLicense ? (
                                    <FaFileDownload size={25} color="black" />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {user?.businessLicense}
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
                          }
                        >
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
                                    }
                                  ></i>
                                ) : null}
                                <Link
                                  to=""
                                  className="text-decoration-none"
                                  onClick={() => {
                                    fileDownload(user?.accountOwnerId);
                                  }}
                                >
                                  {user.accountOwnerId ? (
                                    <FaFileDownload size={25} color="black" />
                                  ) : (
                                    <FaFileUpload size={25} color="red" />
                                  )}
                                  <p
                                    className="mt-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {user?.accountOwnerId}
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
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
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
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">Tobacco License:</span>
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

                      <div className="col-12 text-center">
                        <Link
                          to="/UserManage/ApprovedView-editUser"
                          className="comman_btn2 text-decoration-none"
                        >
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
                          onClick={genPassword}
                        >
                          Generate Password
                        </Button>
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
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header comman_modal">
              <h5 class="modal-title">Preview</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img
                src={user?.federalTaxId}
                type="application/pdf"
                className="preview_image"
                id="preview_images"
              ></img>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
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
