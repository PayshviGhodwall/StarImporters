import React from "react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { Button } from "rsuite";
// Default CSS
import "rsuite/dist/rsuite.min.css";
import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { HiMenu } from "react-icons/hi";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { post } from "jquery";
import ProfileBar from "../ProfileBar";
import ReactPaginate from "react-paginate";
import Pagination from "rsuite/esm/Pagination/Pagination";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { charCountState } from "../../../selecter.js";
import Swal from "sweetalert2";
//
const UserManage = () => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/allUsersList`;
  const uploadUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/importUsers`;
  const userStatus = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/userStatus`;
  const genCrendentials = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/sendUsersCredentials`;
  const totalUser = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/usersCount`;
  const searchUser = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/searchUser`;
  const [values, setValues] = useState({ from: "", to: "" });
  const [search, setSearch] = useState();
  const [statsIndex, setStatsIndex] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [impFile, setImpFile] = useState([]);
  const [usersTotal, setUsersTotal] = useState([]);
  const [ux, setUx] = useState(false);
  const [um, setUm] = useState(false);
  const [sideBar, setSideBar] = useState(true);
  const [uploadError, setUploadError] = useState("");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [set, setSet] = useState(true);
  const [loader, setLoader] = useState(false);
  const importInput = document.getElementById("fileID");
  const [crenditials, setCrenditials] = useState([]);
  const [errEmails, setErrorEmails] = useState([]);
  const [activeApprovePage, setActiveApprovePage] = useState(1);
  const [activePendingPage, setActivePendingPage] = useState(1);
  const [activeReturnedPage, setActiveReturnedPage] = useState(1);
  const [maxAppPage, setMaxAppPage] = useState(1);
  const [maxPenPage, setMaxPenPage] = useState(1);
  const [maxRetPage, setMaxRetPage] = useState(1);
  const [text, setText] = useRecoilState(charCountState);

  const onFileSelection = (e) => {
    let file = e.target.files[0];
    setImpFile(file);
    setUx(true);
  };
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const userSearch = async (e) => {
    let string = e.target.value;
    string !== ""
      ? await axios
          .post(searchUser, {
            type: "APPROVED",
            search: e.target.value,
          })
          .then((res) => {
            if (!res.error) {
              setApprovedUsers(res?.data.results);
            }
          })
      : getApprovedUser();
  };
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
  // const handlePageClick = (event) => {
  //   const selectedPage = event.selected;
  //   setOffset(selectedPage + 1);
  // };
  useEffect(() => {
    GetUserCount();
    getPendingUser();
    getApprovedUser();
    getRejectedUser();
  }, [search, activeApprovePage, activePendingPage, activeReturnedPage]);
  const getPendingUser = async () => {
    const res = await axios.post(apiUrl, {
      type: "PENDING",
      page: activePendingPage,
    });
    setPendingUsers(res.data.results.usersList);
    return res.data;
  };
  const getApprovedUser = async () => {
    const res = await axios.post(apiUrl, {
      type: "APPROVED",
      page: activeApprovePage,
    });
    setApprovedUsers(res?.data.results.usersList);
    setMaxAppPage(res?.data.results.totalPages);
  };
  const getRejectedUser = async () => {
    const res = await axios.post(apiUrl, {
      type: "REJECTED",
      page: activePendingPage,
    });
    setRejectedUsers(res.data.results.usersList);

    return res.data;
  };
  const GetUserCount = async () => {
    await axios.get(totalUser).then((res) => {
      setUsersTotal(res?.data.results);
    });
  };
  const onUpload = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("csvFilePath", impFile);
    await axios.post(uploadUrl, formData).then((res) => {
      if (res.error) {
        setUploadError(res?.data.message);
      }
      if (res?.data.message === "Imported details") {
        setLoader(false);
        setSet(!set);
        setUm(true);
        setCrenditials(res?.data.results?.userNameAndPassword);
      }
      if (res?.data.message === "Duplicte email OR Already Registered") {
        setLoader(false);
        setUm(true);
        setErrorEmails(res?.data.results);
      }
    });
    document.getElementById("reUpload").hidden = false;
  };
  const modalClose = () => {
    window.location.reload(false);
    // setErrorEmails([]);
    // setUx(!ux);
    // setImpFile("");
    // setUm(false)
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
  const GenerateCrendential = async () => {
    await axios
      .post(genCrendentials, {
        credentials: crenditials,
      })
      .then((res) => {
        console.log(res);
        if (res?.data.message === "Credentials Sent Successfully") {
          document.getElementById("modal-toggle87").click();
        }
      });
  };
  return (
    <div className={sideBar ? "  admin_main" : "row expanded_main"}>
      <div className="">
        <div className={sideBar ? " siderbar_section" : "d-none"}>
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
                    <i
                      style={{ position: "relative", left: "4px", top: "2px" }}
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
                                userSearch(e);
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
                              className="nav-link outline-0 "
                              id="nav-home-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-home"
                              type="button"
                              role="tab"
                              aria-controls="nav-home"
                              aria-selected="true"
                            >
                              Pending{" "}
                              <span className="circle_count">
                                {usersTotal?.pending}
                              </span>
                            </button>
                            <button
                              className="nav-link outline-0 active
                              "
                              id="nav-approve-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-approve"
                              type="button"
                              role="tab"
                              aria-controls="nav-approve"
                              aria-selected="false"
                            >
                              Approved{" "}
                              <button className="circle_count">
                                {usersTotal?.approved}
                              </button>
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
                              Returned{" "}
                              <span className="circle_count">
                                {usersTotal?.rejected}
                              </span>
                            </button>
                          </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                          <div
                            className="tab-pane fade "
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
                                      <tr
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          marginLeft: "8px",
                                        }}
                                      >
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
                                              .includes(
                                                searchTerm.toLowerCase()
                                              )
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
                                  <div className="col-11 d-flex justify-content-center py-2 ">
                                    <span className="totalPage">
                                      Total Pages : {maxPenPage}
                                    </span>
                                    <ul id="pagination">
                                      <li>
                                        <a
                                          class="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePendingPage <= 1
                                              ? setActivePendingPage(1)
                                              : setActivePendingPage(
                                                  activePendingPage - 1
                                                )
                                          }
                                        >
                                          «
                                        </a>
                                      </li>

                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#" className="active">
                                          {activePendingPage}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>

                                      <li>
                                        <a
                                          className="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePendingPage <= maxPenPage
                                              ? setActivePendingPage(maxPenPage)
                                              : setActivePendingPage(
                                                  activePendingPage + 1
                                                )
                                          }
                                        >
                                          »
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tab-content" id="nav-tabContent">
                            <div
                              className="tab-pane fade show active"
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
                                        <tr
                                          style={{
                                            backgroundColor: "#f2f2f2",
                                            marginLeft: "8px",
                                          }}
                                        >
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
                                        {(approvedUsers || []).map(
                                          (User, index) => (
                                            <tr key={index} className="">
                                              <td>{index + 1}.</td>
                                              <td>
                                                {User?.createdAt.slice(0, 10)}
                                              </td>
                                              <td>{User?.firstName}</td>
                                              <td>{User?.email}</td>
                                              <td>{User?.phoneNumber}</td>
                                              <td key={User.status}>
                                                {" "}
                                                <div className="">
                                                  <label class="switchUser">
                                                    <input
                                                      type="checkbox"
                                                      name="quotation"
                                                      defaultChecked={
                                                        User.status
                                                      }
                                                      onClick={() => {
                                                        UserStatus(index);
                                                      }}
                                                    />
                                                    <span class="sliderUser round"></span>
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
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="col-11 d-flex justify-content-center py-2 ">
                                    <span className="totalPage">
                                      Total Pages : {maxAppPage}
                                    </span>
                                    <ul id="pagination">
                                      <li>
                                        <a
                                          class="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activeApprovePage <= 1
                                              ? setActiveApprovePage(1)
                                              : setActiveApprovePage(
                                                  activeApprovePage - 1
                                                )
                                          }
                                        >
                                          «
                                        </a>
                                      </li>

                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#" className="active">
                                          {activeApprovePage}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>

                                      <li>
                                        <a
                                          className="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activeApprovePage <= maxAppPage
                                              ? setActiveApprovePage(maxAppPage)
                                              : setActiveApprovePage(
                                                  activeApprovePage + 1
                                                )
                                          }
                                        >
                                          »
                                        </a>
                                      </li>
                                    </ul>
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
                                      <tr
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          marginLeft: "8px",
                                        }}
                                      >
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 rounded-0  rounded-top">
            <div className="modal-body ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={modalClose}
              />

              <div>
                <div className="container-lg w-100">
                  <div className="">
                    {set ? (
                      <div className="drop_box p-5">
                        <header>
                          <h4>Choose File here</h4>
                        </header>
                        <p>Files Supported: CSV</p>
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
                        {um ? (
                          <p className="text-danger fw-bold">{uploadError}</p>
                        ) : null}
                        <input
                          type="file"
                          id="fileID"
                          accept=".csv"
                          style={{ display: "none" }}
                          onChange={onFileSelection}
                        />
                        {ux ? (
                          <Button
                            className="comman_btn"
                            htmlFor=""
                            loading={loader}
                            style={{
                              backgroundColor: "#eb3237",
                              color: "#fff",
                              fontSize: "20px",
                              position: "relative",
                              top: "-2px",
                            }}
                            onClick={onUpload}
                          >
                            Upload
                          </Button>
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
                        <div className="row  w-100 text-start mt-3">
                          <div className="col-6">
                            {errEmails ? (
                              <h3 className="" style={{ fontSize: "12px" }}>
                                Duplicate Emails
                              </h3>
                            ) : null}
                            <ul style={{ listStyle: "none" }}>
                              {(errEmails?.duplicateMails || []).map(
                                (item, ind) => (
                                  <li
                                    key={ind}
                                    style={{
                                      fontSize: "12px",
                                      position: "relative",
                                      left: "-28px",
                                    }}
                                  >
                                    {item}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <div className="col-6">
                            {errEmails ? (
                              <h3 className="" style={{ fontSize: "12px" }}>
                                Existing Emails
                              </h3>
                            ) : null}
                            <ul style={{ listStyle: "none" }}>
                              {(errEmails?.alreadyRegistered || []).map(
                                (item, ind) => (
                                  <li
                                    key={ind}
                                    style={{
                                      fontSize: "12px",
                                      position: "relative",
                                      left: "-28px",
                                    }}
                                  >
                                    {item?.email}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
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
                onClick={() => {
                  window.location.reload(false);
                }}
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
