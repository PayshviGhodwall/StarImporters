import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

const TradeShowManage = () => {
  const [sideBar, setSideBar] = useState(true);
  let User = JSON.parse(localStorage.getItem("AdminData"));
  const cityApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/cityByState`;
  const getVendorsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getVendors`;
  const vendorStatusChange = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/vendorStatus`;
  const createVendor = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/addVendor`;
  const [allVendors, setAllVendors] = useState([]);
  const [cities, setCities] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [files, setFiles] = useState([]);
  const [activePage, setActivePage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFileSelection = (e, key) => {
    let image = e.target.files[0];
    setFiles({ ...files, [key]: image });
  };

  const handleCities = async (state) => {
    const { data } = await axios.post(cityApi, {
      state: state,
    });
    if (!data.error) {
      setCities(data?.results?.states);
    }
  };

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async (key) => {
    await axios
      .patch(getVendorsApi, {
        search: key,
      })
      .then((res) => {
        setAllVendors(res?.data.results.vendors?.data);
        setMaxPage(res?.data.results.totalPages);
      });
  };

  const onSubmit = async (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("fullName", data?.username?.trim());
    formData.append("address", data?.address);
    formData.append("city", data?.city);
    formData.append("state", data?.state);
    formData.append("zipcode", data?.zipcode);
    formData.append("countryCode ", "+1");
    formData.append("email", data?.email?.trim());
    formData.append("phoneNumber", data?.phoneNumber?.trim());
    formData.append("password", data?.password?.trim());
    formData.append("image", files?.coverImage);
    await axios
      .post(createVendor, formData)
      .then((res) => {
        if (res?.data?.message === "Vendor added") {
          getVendors();
          setFiles([]);
          document.getElementById("resetF").click();
          Swal.fire({
            title: res?.data?.message,
            text: "New Vendor Created!",
            icon: "success",
            timer: 2000,
            confirmButtonText: "okay",
          });
        }
        if (res?.data?.error) {
          Swal.fire({
            title: res?.data.message,
            icon: "error",
            confirmButtonText: "okay",
          });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: err.response?.data?.message,
            text: "",
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      });
  };

  const PullerStatus = async (id) => {
    const { data } = await axios.get(vendorStatusChange + "/" + id);
    if (!data?.error) {
      getVendors();
      Swal.fire({
        title: "Vendor Status Changed!",
        icon: "success",
        confirmButtonText: "Okay",
      });
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
                      style={{ position: "relative", left: "4px", top: "2px" }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
                      style={{ position: "relative", left: "6px", top: "3px" }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li
                  className={User?.access?.includes("Puller") ? "" : "d-none"}
                >
                  <Link
                    className="bg-white"
                    to="/Puller-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Puller Management
                  </Link>
                </li>
                <li
                  className={User?.access?.includes("Gallery") ? "" : "d-none"}
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
                    User?.access?.includes("catalogFlyers") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/Catelog-Flyers"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-book"
                    ></i>{" "}
                    Catalog & Flyers
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Orders Management") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-cog"
                    ></i>{" "}
                    Content Management
                  </Link>
                </li>
                <li
                  className={User?.access?.includes("Contact") ? "" : "d-none"}
                >
                  <Link
                    className=""
                    to="/Contact&Support"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
                    style={{ textDecoration: "none", fontSize: "18px" }}
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
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
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
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-users-gear"
                    ></i>{" "}
                    Puller Management
                  </Link>
                </li>
                <li>
                  <Link
                    className="bg-white"
                    to="/admin/Tradeshow-manage"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"
                    ></i>{" "}
                    Trade Show Management
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
                    to="/Catelog-Flyers"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-book"
                    ></i>{" "}
                    Catalog & Flyers
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
                      style={{ position: "relative", left: "4px", top: "3px" }}
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
          <div className="row inventory-management justify-content-center">
            <div className="col-12">
              <div className="row mx-0 ">
                <div className="col-12 design_outter_comman shadow mb-4">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Add Store Details</h2>
                    </div>
                  </div>

                  <form
                    className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between "
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group mb-0 col-4 choose_fileAdmin position-relative mb-4">
                      <span>
                        Cover Image:{" "}
                        {errors.coverImage && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.coverImage?.message}
                          </small>
                        )}
                      </span>{" "}
                      <label htmlFor="upload_video">
                        <i class="fa fa-camera me-1"></i>
                        Choose File
                      </label>{" "}
                      <input
                        type="file"
                        className="form-control shadow-none"
                        defaultValue=""
                        accept="image/*"
                        name="coverImage"
                        {...register("coverImage", {
                          required: false,
                          onChange: (e) => {
                            onFileSelection(e, "coverImage");
                          },
                        })}
                      />
                    </div>

                    <div className="form-group col-4 mb-0 mb-4">
                      <label htmlFor="puller">
                        Full Name{" "}
                        {errors.username && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.username?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="text"
                        id="puller"
                        className={classNames(
                          "form-control border border-secondary",
                          {
                            "is-invalid": errors.username,
                          }
                        )}
                        name="username"
                        placeholder="Enter Name"
                        {...register("username", {
                          required: "Puller Name is required!",
                        })}
                      />
                    </div>

                    <div className="form-group col-4">
                      <label htmlFor="">
                        Address{" "}
                        {errors.address && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.address?.message}
                          </small>
                        )}
                        <input
                          type="address"
                          className={classNames(
                            "form-control border border-secondary",
                            {
                              "is-invalid": errors.address,
                            }
                          )}
                          name="address"
                          placeholder="Enter address"
                          {...register("address", {
                            required: "Address is required!",
                          })}
                        />
                      </label>
                    </div>

                    <div
                      className="form-group col-4 mb-5
                    "
                    >
                      <label htmlFor="">
                        Phone Number{" "}
                        {errors.phoneNumber && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.phoneNumber?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="number"
                        className={classNames(
                          "form-control border border-secondary",
                          {
                            "is-invalid": errors.phoneNumber,
                          }
                        )}
                        name="phoneNumber"
                        placeholder="Enter Phone Number "
                        {...register("phoneNumber", {
                          required: "Phone Number is required!",
                          maxLength: {
                            value: 10,
                            message: "maximium 10 Charcarters",
                          },
                          minLength: {
                            value: 8,
                            message: "minimium 8 Charcarters",
                          },
                        })}
                      />
                    </div>
                    <div
                      className="form-group col-4 mb-5 mt-4
                    "
                    >
                      <label htmlFor="">
                        Email Address{" "}
                        {errors.email && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.email?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="email"
                        className={classNames(
                          "form-control border border-secondary",
                          {
                            "is-invalid": errors.email,
                          }
                        )}
                        name="email"
                        placeholder="Enter email address"
                        {...register("email", {
                          required: "Email is required!",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    <div className="form-group col-4 mb-5">
                      <label htmlFor="">
                        Zipcode{" "}
                        {errors.zipcode && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.zipcode?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="number"
                        className={classNames(
                          "form-control border border-secondary",
                          {
                            "is-invalid": errors.zipcode,
                          }
                        )}
                        name="zipcode"
                        placeholder="Enter Zipcode "
                        {...register("zipcode", {
                          required: "Zipcode is required!",
                          maxLength: {
                            value: 10,
                            message: "maximium 10 Charcarters",
                          },
                          minLength: {
                            value: 2,
                            message: "minimium 2 Charcarters",
                          },
                        })}
                      />
                    </div>

                    <div className="form-group col-4">
                      <label htmlFor="">
                        Password{" "}
                        {errors.password && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.password?.message}
                          </small>
                        )}
                        <input
                          type="text"
                          className={classNames(
                            "form-control border border-secondary",
                            {
                              "is-invalid": errors.password,
                            }
                          )}
                          name="password"
                          placeholder="Enter password"
                          {...register("password", {
                            required: false,
                          })}
                        />
                      </label>
                    </div>

                    <div className="form-floating col-4 mb-4 select_dropdown ">
                      <select
                        className={classNames(
                          "form-select border border-secondary signup_fields fw-bolder mt-1",
                          { "is-invalid": errors.state }
                        )}
                        id="floatingSelect1"
                        aria-label="Floating label select example"
                        name="state"
                        {...register("state", {
                          required: "State is Required*",
                          onChange: (e) => {
                            handleCities(e.target.value);
                          },
                        })}
                      >
                        <option value="">Select a state/province...</option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="American Samoa">American Samoa</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
                        <option value="Delaware">Delaware</option>
                        <option value="District of Columbia">
                          District of Columbia
                        </option>
                        <option value="Federated States of Micronesia">
                          Federated States of Micronesia
                        </option>
                        <option value="Florida">Florida</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Guam">Guam</option>
                        <option value="Hawaii">Hawaii</option>
                        <option value="Idaho">Idaho</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Indiana">Indiana</option>
                        <option value="Iowa">Iowa</option>
                        <option value="Kansas">Kansas</option>
                        <option value="Kentucky">Kentucky</option>
                        <option value="Louisiana">Louisiana</option>
                        <option value="Maine">Maine</option>
                        <option value="Marshall Islands">
                          Marshall Islands
                        </option>
                        <option value="Maryland">Maryland</option>
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Palau">Palau</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Puerto Rico">Puerto Rico</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                        <option value="Virgin Islands">Virgin Islands</option>
                        <option value="Armed Forces Americas">
                          Armed Forces Americas
                        </option>
                        <option value="Armed Forces Europe">
                          Armed Forces Europe
                        </option>
                        <option value="Armed Forces Pacific">
                          Armed Forces Pacific
                        </option>
                      </select>
                      {errors.state && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.state?.message}
                        </small>
                      )}

                      <label
                        htmlFor="floatingSelect1"
                        className="mx-2 fw-bolder mb-4"
                      >
                        State/Province
                      </label>
                    </div>

                    <div className="form-floating col-4 mb-4 select_dropdown ">
                      <select
                        className={classNames(
                          "form-select border border-secondary signup_fields fw-bolder mt-1",
                          { "is-invalid": errors.city }
                        )}
                        id="floatingSelect2"
                        aria-label="Floating label select example"
                        name="city"
                        disabled={cities?.length ? false : true}
                        {...register("city", {
                          required: false,
                        })}
                      >
                        <option value="">
                          {cities?.length > 0
                            ? "Select City"
                            : "No cities in selected State."}
                        </option>
                        {(cities || [])?.map((item, ind) => (
                          <option value={item?.city}>{item?.city}</option>
                        ))}
                      </select>
                      {errors.city && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.city?.message}
                        </small>
                      )}

                      <label
                        htmlFor="floatingSelect2"
                        className="mx-2 fw-bolder mb-2"
                      >
                        City
                      </label>
                    </div>

                    <div className="form-group mb-0 col-12 text-center mt-3">
                      <button className="comman_btn" type="submit">
                        Save Details
                      </button>
                      <button
                        className="comman_btn d-none"
                        type="reset"
                        id="resetF"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Stores Management</h2>
                    </div>
                    <div className=" d-flex col-3">
                      <form className="form-design" action="">
                        <div className="form-group mb-0 position-relative icons_set">
                          <input
                            type="text"
                            className="form-control bg-white "
                            placeholder="Search by Vendor Name"
                            name="name"
                            id="name"
                            onChange={(e) => {
                              getVendors(e.target.value);
                            }}
                          />
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
                              <th>Date</th>
                              <th>Email</th>
                              <th>Image</th>
                              <th>User Name</th>
                              <th>Phone Number</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(allVendors || [])?.map((item, index) => (
                              <tr key={index} className="border ">
                                <td>{index + 1}</td>
                                <td className="border">
                                  {moment(item?.createdAt?.slice(0, 10)).format(
                                    "MM/DD/YYYY"
                                  )}
                                </td>
                                <td className="border">{item?.email}</td>
                                <td className="border">
                                  <img
                                    className="subCatImages"
                                    src={
                                      item?.image?.length > 4
                                        ? item?.image
                                        : require("../../../assets/img/product.jpg")
                                    }
                                  ></img>
                                </td>
                                <td className="border">{item?.username}</td>
                                <td className="border">{item?.phoneNumber}</td>

                                <td className=" border" key={item?.status}>
                                  {" "}
                                  <div className="">
                                    <label class="switchUser">
                                      <input
                                        type="checkbox"
                                        id={index + 1}
                                        defaultChecked={item?.status}
                                        onClick={() => {
                                          PullerStatus(item?._id);
                                        }}
                                      />
                                      <span class="sliderUser round"></span>
                                    </label>
                                  </div>
                                </td>

                                <td>
                                  <Link
                                    className="comman_btn2 text-white text-decoration-none"
                                    key={index}
                                    to={`/admin/view-TradeStore/${item?._id}`}
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
  );
};

export default TradeShowManage;
