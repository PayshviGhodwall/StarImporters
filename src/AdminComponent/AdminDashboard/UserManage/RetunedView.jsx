import React from "react";
import { useState } from "react";
import { saveAs } from "file-saver";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { useEffect } from "react";
import axios from "axios";
import { FaFileUpload } from "react-icons/fa";
import ProfileBar from "../ProfileBar";
import moment from "moment";
import { FaFileDownload } from "react-icons/fa";

const ReturnedView = () => {
  const [sideBar, setSideBar] = useState(true);
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;
  const [user, setUser] = useState([]);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  let User = JSON.parse(localStorage.getItem("AdminData"));

  const objectId = localStorage.getItem("objectId");

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(apiUrl + "/" + objectId);
      setUser(res.data.results);

      return res.data;
    };
    getUser();
  }, []);
  const fileDownload = (url) => {
    saveAs(url);
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
                    User?.access?.includes("Gallery Management") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"
                    ></i>{" "}
                    Gallery Management
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
                    Order Management
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
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Contact&Support"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-handshake-angle"
                    ></i>{" "}
                    Contact & Support
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
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"
                    ></i>{" "}
                    Gallery Management
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
                    Order Management
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
                    Content Management
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
                    <h2 className="main_headers">Returned Details</h2>
                  </div>
                  <div className="col-auto">
                    <div className="Status_box">
                      Status: <strong>Returned</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 p-4 Pending-view-main">
                    <div className="row py-2">
                      <div className="col-12 text-center mb-4">
                        <div className="Pending-view_img">
                          <img src={profile} alt="" />
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
                      {/* <div className="col-12 text-center">
                        <Link
                          href="javascript:;"
                          className="comman_btn text-decoration-none"
                          onClick={approveUser}
                        >
                          {approveText}
                        </Link>
                        <Link
                          href="javascript:;"
                          className="comman_btn2 ms-2 text-decoration-none"
                          onClick={deleteUser}
                        >
                          Delete
                        </Link>
                      </div> */}
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

export default ReturnedView;
