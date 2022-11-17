import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";

import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { HiMenu } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";

import { useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { post } from "jquery";
import ProfileBar from "../ProfileBar";
const UserManage = () => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/allUsersList`;
  const uploadUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/importUsers`;
  const userStatus = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/userStatus`;
  const genCrendentials = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/sendUsersCredentials`;
  const [values, setValues] = useState({ from: "", to: "" });
  const [search, setSearch] = useState();
  const [statsIndex, setStatsIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [impFile, setImpFile] = useState([]);
  const [userId, setUserId] = useState();
  const [ux, setUx] = useState("");
  const [sideBar, setSideBar] = useState(true);
  const [uploadError, setUploadError] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [set, setSet] = useState(true);
  const [msg, setMsg] = "";
  const [enableUser, setEnableUser] = useState();
  const importInput = document.getElementById("fileID");
  const dropArea = document.getElementById("dropBox");
  const navigate = useNavigate();

  const onFileSelection = (e) => {
    let file = e.target.files[0];
    setImpFile(file);
    setUx("uploaded");
  };
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  const onPendingSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post(apiUrl, {
      from: values.from,
      to: values.to,
      type: "PENDING",
    });
    setPendingUsers(res?.data.results);
    return res.data;
  };
  const onApprovedSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post(apiUrl, {
      from: values.from,
      to: values.to,
      type: "APPROVED",
    });
    setApprovedUsers(res?.data.results);
    return res.data;
  };
  const onReturnedSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post(apiUrl, {
      from: values.from,
      to: values.to,
      type: "REJECTED",
    });
    setRejectedUsers(res?.data.results);
    return res.data;
  };

  useEffect(() => {
    const getPendingUser = async () => {
      const res = await axios.post(apiUrl, {
        type: "PENDING",
      });
      setPendingUsers(res.data.results);
      return res.data;
    };
    const getApprovedUser = async () => {
      const res = await axios.post(apiUrl, {
        type: "APPROVED",
      });
      setApprovedUsers(res.data.results);

      return res.data;
    };
    const getRejectedUser = async () => {
      const res = await axios.post(apiUrl, {
        type: "REJECTED",
      });
      setRejectedUsers(res.data.results);

      return res.data;
    };
    getPendingUser();
    getApprovedUser();
    getRejectedUser();
  }, [search]);

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("csvFilePath", impFile);
    await axios.post(uploadUrl, formData).then((res) => {
      console.log(res);
      setUploadError(res?.data.message);
      if (res?.data.message === "Successfully Imported") {
        setSet(!set);
      }
    });
    document.getElementById("reUpload").hidden = false;
  };

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };
  const onPendingView = (index) => {
    localStorage.setItem("objectId", pendingUsers[index]?._id);
  };
  const onReturnedView = (index) => {
    localStorage.setItem("objectId", rejectedUsers[index]?._id);
  };
  const onApprovedView = (index) => {
    localStorage.setItem("objectId", approvedUsers[index]?._id);
    setStatsIndex(approvedUsers[index]?._id);
  };

  const UserStatus = async (index) => {
    await axios
      .post(userStatus + "/" + approvedUsers[index]?._id)
      .then((res) => {
        console.log(res);
      });
  };
  const   GenerateCrendential = async () => {
    await axios.post(genCrendentials).then((res) => {
      console.log(res);
      if (res?.data.message === "Credentials Sent Successfully") {
        document.getElementById("modal-toggle87").click();
        setMsg("Credentials Sent Successfully");
      }
    });
  }
  return (
    <div className={sideBar ? "admin_main" : "expanded_main"}>
      <div className={sideBar ? "siderbar_section" : "d-none"}>
        <div className="siderbar_inner">
          <div className="sidebar_logo">
            <Link to="" className=" ">
              <img src={Starlogo} className="" alt="Logo" />
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
        <div className="admin_panel_data height_adjust">
          <div className="row user-management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 text-end mb-4">
                  <Link
                    data-bs-toggle="modal"
                    id="modal-toggle"
                    data-bs-target="#staticBackdrop6"
                    href="javscript:;"
                    className="comman_btn text-decoration-none"
                  >
                    Import User
                  </Link>
                  <Link
                    to="/UserManage/AddUser"
                    className="comman_btn2 ms-2 text-decoration-none"
                  >
                    Add User
                  </Link>
                </div>
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2 className="main_headers">Users Management</h2>
                    </div>
                    <div className="col-3">
                      <form className="form-design" action="">
                        <div className="form-group mb-0 position-relative icons_set">
                          <input
                            type="text"
                            className="form-control bg-white"
                            placeholder="Search"
                            name="name"
                            id="name"
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 p-0 user-management-tabs">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link outline-0 active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            Pending <span className="circle_count">{pendingUsers?.length}</span>
                          </button>
                          <button
                            className="nav-link outline-0"
                            id="nav-approve-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-approve"
                            type="button"
                            role="tab"
                            aria-controls="nav-approve"
                            aria-selected="false"
                          >
                            Approved <span className="circle_count">{approvedUsers?.length}</span>
                          </button>
                          <button
                            className="nav-link outline-0 border-0"
                            id="nav-return-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-return"
                            type="button"
                            role="tab"
                            aria-controls="nav-return"
                            aria-selected="false"
                          >
                            Returned <span className="circle_count">{rejectedUsers?.length}</span>
                          </button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-aria-labelledby="nav-home-tab"
                        >
                          <form
                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                            action=""
                          >
                            <div className="form-group mb-0 col-5">
                              <label htmlFor="" className="main_headers">
                                From
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="from"
                                value={values.from}
                                onChange={handleDate}
                              />
                            </div>
                            <div className="form-group mb-0 col-5">
                              <label htmlFor="" className="main_headers">
                                To
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                name="to"
                                value={values.to}
                                onChange={handleDate}
                              />
                            </div>
                            <div className="form-group mb-0 col-auto">
                              <button
                                className="comman_btn"
                                id="Search"
                                onClick={onPendingSearch}
                              >
                                Search
                              </button>
                            </div>
                          </form>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <thead>
                                    <tr>
                                      <th>S.No.</th>
                                      <th>Date</th>
                                      <th>User Name</th>
                                      <th>Email</th>
                                      <th>Mobile Number</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {(pendingUsers || [])
                                      .filter((User) => {
                                        if (searchTerm == "") {
                                          return User;
                                        } else if (
                                          User?.firstName
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                        ) {
                                          return User;
                                        }
                                      })
                                      .map((User, index) => (
                                        <tr className="" key={index}>
                                          <td>{index + 1}</td>
                                          <td>
                                            {User?.createdAt.slice(0, 10)}
                                          </td>
                                          <td>{User?.firstName}</td>
                                          <td>{User?.email}</td>
                                          <td>{User?.phoneNumber}</td>
                                          <td>{User?.isVerified}</td>
                                          <td>
                                            <Link
                                              className="comman_btn2  text-decoration-none"
                                              to="/UserManage/PendingView"
                                              id={index}
                                              onClick={() => {
                                                onPendingView(index);
                                              }}
                                            >
                                              View
                                            </Link>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade "
                            id="nav-approve"
                            role="tabpanel"
                            aria-labelledby="nav-approve-tab"
                          >
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">From</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="from"
                                  value={values.from}
                                  onChange={handleDate}
                                />
                              </div>
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">To</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  name="to"
                                  value={values.to}
                                  onChange={handleDate}
                                />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <button
                                  className="comman_btn"
                                  onClick={onApprovedSearch}
                                >
                                  Search
                                </button>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr>
                                        <th>S.No.</th>
                                        <th>Date</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Mobile Number</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(approvedUsers || [])
                                        .filter((User) => {
                                          if (searchTerm == "") {
                                            return User;
                                          } else if (
                                            User?.firstName
                                              .toLowerCase()
                                              .includes(
                                                searchTerm.toLowerCase()
                                              )
                                          ) {
                                            return User;
                                          }
                                        })
                                        .map((User, index) => (
                                          <tr key={index} className="">
                                            <td>{index + 1}.</td>
                                            <td>
                                              {User?.createdAt.slice(0, 10)}
                                            </td>
                                            <td>{User?.firstName}</td>
                                            <td>{User?.email}</td>
                                            <td>{User?.phoneNumber}</td>
                                            <td>
                                              {" "}
                                              <div className="toggle-switch">
                                                <input
                                                  type="checkbox"
                                                  className="checkbox"
                                                  id={index + 1}
                                                  defaultChecked={User?.status}
                                                  onClick={() => {
                                                    UserStatus(index);
                                                  }}
                                                />
                                                <label
                                                  className="label"
                                                  htmlFor={index + 1}
                                                >
                                                  <span className="inner" />
                                                  <span className="switch" />
                                                </label>
                                              </div>
                                            </td>
                                            <td>
                                              <Link
                                                className="comman_btn2 text-decoration-none"
                                                to="/UserManage/ApprovedView"
                                                id={index}
                                                onClick={() => {
                                                  onApprovedView(index);
                                                }}
                                              >
                                                View
                                              </Link>
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

                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade"
                          id="nav-return"
                          role="tabpanel"
                          aria-labelledby="nav-return-tab"
                        >
                          <form
                            className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                            action=""
                          >
                            <div className="form-group mb-0 col-5">
                              <label htmlFor="">From</label>
                              <input
                                type="date"
                                className="form-control"
                                name="from"
                                value={values.from}
                                onChange={handleDate}
                              />
                            </div>
                            <div className="form-group mb-0 col-5">
                              <label htmlFor="">To</label>
                              <input
                                type="date"
                                className="form-control"
                                name="to"
                                value={values.to}
                                onChange={handleDate}
                              />
                            </div>
                            <div className="form-group mb-0 col-auto">
                              <button
                                className="comman_btn"
                                onClick={onReturnedSearch}
                              >
                                Search
                              </button>
                            </div>
                          </form>
                          <div className="row">
                            <div className="col-12 comman_table_design px-0">
                              <div className="table-responsive">
                                <table className="table mb-0">
                                  <thead>
                                    <tr>
                                      <th>S.No.</th>
                                      <th>Date</th>
                                      <th>User Name</th>
                                      <th>Email</th>
                                      <th>Mobile Number</th>
                                      <th>Status</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {(rejectedUsers || [])
                                      .filter((User) => {
                                        if (searchTerm == "") {
                                          return User;
                                        } else if (
                                          User?.firstName
                                            .toLowerCase()
                                            .includes(searchTerm.toLowerCase())
                                        ) {
                                          return User;
                                        }
                                      })
                                      .map((User, index) => (
                                        <tr key={index} className="">
                                          <td>{index + 1}.</td>
                                          <td>
                                            {User?.createdAt.slice(0, 10)}
                                          </td>
                                          <td>{User?.firstName}</td>
                                          <td>{User?.email}</td>
                                          <td>{User?.phoneNumber}</td>
                                          <td className="fs-6 text-danger">
                                            {User?.isVerified}
                                          </td>
                                          <td>
                                            <Link
                                              className="comman_btn2  text-decoration-none"
                                              to="/UserManage/ReturnedView"
                                              id={index}
                                              onClick={() => {
                                                onReturnedView(index);
                                              }}
                                            >
                                              View
                                            </Link>
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
          </div>
        </div>
      </div>

      <div
        className="modal comman_modal_form forms_modal"
        id="staticBackdrop6"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0  rounded-top">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />

              <div>
                <div className="container">
                  <div className="">
                    {set ? (
                      <div className="drop_box p-5">
                        <header>
                          <h4>Choose File here</h4>
                        </header>
                        <p>Files Supported: CSV,EXCEL</p>
                        <p className="text-dark bg-light p-2">
                          {impFile?.name}{" "}
                          <button
                            hidden
                            className="btn"
                            id="reUpload"
                            onClick={() => {
                              importInput.click();
                            }}
                          >
                            <BiEdit />
                          </button>
                        </p>
                        <p className="text-danger fw-bold">{uploadError}</p>
                        <input
                          type="file"
                          accept=".csv"
                          id="fileID"
                          style={{ display: "none" }}
                          onChange={onFileSelection}
                        />
                        {ux !== "" ? (
                          <button
                            className="comman_btn"
                            htmlFor=""
                            onClick={onUpload}
                          >
                            Upload
                          </button>
                        ) : (
                          <button
                            className="comman_btn2"
                            htmlFor=""
                            onClick={() => {
                              importInput.click();
                            }}
                          >
                            Import
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="drop_box p-5">
                        <h1 className="fs-5">CSV Imported</h1>
                        <p> {impFile?.name} </p>
                        <button
                          className="comman_btn mt-3"
                          onClick={GenerateCrendential}
                        >
                          Generate Passwords
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal comman_modal_form forms_modal"
        id="staticBackdrop87"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0  rounded-top">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />

              <div>
                <div className="container">
                  <div className="row justify-content-center p-2">
                    <div className="col-11 text-center mt-2">
                      <p className="fs-4 fw-bold">
                      <i class="fa fa-check-double mx-1 text-success"></i>

                        All Crenditials Sent Successfully!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        data-bs-toggle="modal"
        id="modal-toggle87"
        data-bs-target="#staticBackdrop87"
        href="javscript:;"
        className="comman_btn text-decoration-none d-none"
      >
        Import
      </Link>
    </div>
  );
};

export default UserManage;
