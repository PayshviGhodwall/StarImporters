import React from "react";
import { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";

import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import { FaFileDownload } from "react-icons/fa";
import ProfileBar from "../ProfileBar";

const PendingView = () => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;
  const approveUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//adminAuthorisedUser`;
  const rejectUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/rejectUser`;
  const [sideBar, setSideBar] = useState(true);

  const [user, setUser] = useState([]);
  const [approveText, setApproveText] = useState("Approve");
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  const objectId = localStorage.getItem("objectId");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.post(apiUrl + "/" + objectId);
      setUser(res.data.results);

      return res.data;
    };
    getUser();
  }, []);

  const approveUser = async () => {
    const res = await axios.post(approveUrl + "/" + objectId);
    console.log(res, "hii");
    if (res?.data.message === "User approved Successfully") {
      setApproveText("Approved");
      navigate("/UserManage");
    }
  };
  const rejectUser = async () => {
    //  await axios.post(rejectUrl + "/" + objectId).then((res)=>{
    //   navigate("/UserManage");
    //  })
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
                  className=" "
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i className="fa fa-home"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="fw-bold bg-white"
                  to="/UserManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                    color: "#3e4093",
                  }}
                >
                  <i class="fa fa-user"></i> User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Inventory"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="far fa-building"></i> Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-ship"></i> Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-cog"></i> CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-sign-out-alt"></i>Logout
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
                    <h2 className="main_headers">Pending Details</h2>
                  </div>
                  <div className="col-auto">
                    <div className="Status_box">
                      Status: <strong>Pending</strong>
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
                            <strong>{user?.addressLine}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            Company Address Line 2:
                          </span>
                          <div className="col">
                            <strong>{user?.addressLine}</strong>
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
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Federal Tax ID:</span>
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
                                    fileDownload(user?.federalTaxId);
                                  }}
                                >
                                  <FaFileDownload size={25} />
                                  <p className="" style={{ fontSize: "9px" }}>
                                    {user?.federalTaxId}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
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
                                    fileDownload(
                                      user?.tobaccoLicence,
                                      "tobaccoLicence.jpg"
                                    );
                                  }}
                                >
                                  <FaFileDownload size={25} />
                                  <p className="" style={{ fontSize: "9px" }}>
                                    {user?.tobaccoLicence}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
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
                                    fileDownload(
                                      user?.salesTaxId,
                                      "salesTaxId.jpg"
                                    );
                                  }}
                                >
                                  <FaFileDownload size={25} />
                                  <p className="" style={{ fontSize: "9px" }}>
                                    {user?.salesTaxId}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
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
                                    fileDownload(
                                      user?.businessLicense,
                                      "businessLicense.jpg"
                                    );
                                  }}
                                >
                                  <FaFileDownload size={25} />
                                  <p className="" style={{ fontSize: "9px" }}>
                                    {user?.businessLicense}
                                  </p>
                                </Link>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Contact First name:</span>
                          <div className="col">
                            <strong> {user?.firstName}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">Contact Last name:</span>
                          <div className="col">
                            <strong> {user?.lastName}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
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
                                    fileDownload(
                                      user?.accountOwnerId,
                                      "accountOwnerId.jpg"
                                    );
                                  }}
                                >
                                  <FaFileDownload size={25} />

                                  <p className="" style={{ fontSize: "9px" }}>
                                    {" "}
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
                          <span className="fw-bold">Phone Number:</span>
                          <div className="col">
                            <strong>{user?.phoneNumber}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 mb-4 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold">
                            How did you hear about us?:
                          </span>
                          <div className="col">
                            <strong>{}</strong>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 text-center">
                        <Link
                          href="javascript:;"
                          className="comman_btn text-decoration-none"
                          onClick={approveUser}
                        >
                          {approveText}
                        </Link>
                        <Link
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop21"
                          className="comman_btn2 ms-2 text-decoration-none"
                        >
                          Return
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

      <div
        className="modal fade comman_modal"
        id="staticBackdrop21"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Return Reason
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body bg-light border rounded">
              <div className="container ">
                <div className="row justify-content-center ">
                  <form className="p-2">
                    <h5 className="fw-bold">Enter Reason :</h5>

                    <textarea
                      className="w-100 fs-6 p-2"
                      style={{ height: "8rem" }}
                    />

                    <div className="row text-start mt-3 return_Reason">
                      <h6 className="mb-2">Choose Invalid Fields :</h6>
                      <div className="col-md-6">
                        <ul className="list-group ">
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Company Name
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                DBA
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                               Address Line
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                htmlFor="flexCheckDefault"
                              >
                                City
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                               State
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Zipcode
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Federal Tax Id
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                               Sales Tax Id
                              </label>
                            </div>
                          </li>
                         
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-group">
                        <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                htmlFor="flexCheckDefault"
                              >
                                Tobacco Licence
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Business Licence
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                First Name
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Last Name
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Account Owner Id
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Email
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Phone
                              </label>
                            </div>
                          </li>
                          <li className="list-group-item">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                              />
                              <label
                                class="form-check-label mx-1"
                                for="flexCheckDefault"
                              >
                                Heard About Us
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-md-12 text-center mt-4">
                         <button className="comman_btn2 rounded" >Return</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingView;
