import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";

import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { useEffect } from "react";
import axios from "axios";
import classNames from "classnames";
import { FaFileUpload } from "react-icons/fa";
import ProfileBar from "../ProfileBar";

const EditUser = () => {
  const [files, setFiles] = useState([]);
  console.log(files);
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;
  const apiUrl2 = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/editUserProfile`;
  const [sideBar, setSideBar] = useState(true);
  const [user, setUser] = useState([]);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  const objectId = localStorage.getItem("objectId");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm();
  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const onSubmit = async (data) => {
    console.log(data, "hii");
    const formData = new FormData();
    formData.append("profileImage", files?.imageProfile);
    formData.append("companyName", data?.companyName);
    formData.append("dba", data?.dba);
    formData.append("addressLine", data?.addressLine);
    formData.append("city", data?.city);
    formData.append("state", data?.state);
    formData.append("zipcode", data?.zipcode);
    formData.append("firstName", data?.firstName);
    formData.append("lastName", data?.lastName);
    formData.append("email", data?.email);
    formData.append("phoneNumber", data?.phoneNumber);
    formData.append("federalTaxId", files?.federalTaxId);
    formData.append("businessLicense", files?.businessLicense);
    formData.append("tobaccoLicence", files?.tobaccoLicence);
    formData.append("salesTaxId", files?.salesTaxId);
    formData.append("accountOwnerId", files?.accountOwnerId);
    formData.append("heardAboutUs", data?.heardAboutUs);
    formData.append("quotation", data?.quotation);

    await axios.post(apiUrl2 + "/" + objectId, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "User Deatils Updated Successfully") {
        navigate("/UserManage/ApprovedView");
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const res = await axios.post(apiUrl + "/" + objectId);
    let results = res?.data.results;
    setUser(res.data.results);
    let defalutValues = {};
    defalutValues.imageProfile = results.imageProfile;
    defalutValues.companyName = results.companyName;
    defalutValues.dba = results.dba;
    defalutValues.addressLine = results.addressLine;
    defalutValues.city = results.city;
    defalutValues.state = results.state;
    defalutValues.zipcode = results.zipcode;
    defalutValues.federalTaxId = results.federalTaxId;
    defalutValues.tobaccoLicence = results.tobaccoLicence;
    defalutValues.salesTaxId = results.salesTaxId;
    defalutValues.businessLicense = results.businessLicense;
    defalutValues.firstName = results.firstName;
    defalutValues.lastName = results.lastName;
    defalutValues.accountOwnerId = results.accountOwnerId;
    defalutValues.email = results.email;
    defalutValues.phoneNumber = results.phoneNumber;
    defalutValues.heardAboutUs = results.heardAboutUs;
    defalutValues.quotation = results.quotation;

    reset({ ...defalutValues });
    return res.data;
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
                    <h2 className="main_headers">Edit User Details</h2>
                  </div>
                  <div className="col-auto">
                    <div className="Status_box">
                      Status: <strong>Active</strong>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 p-4 Pending-view-main">
                    <form
                      className="row py-2 form-design"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="col-12 text-center mb-4">
                        <div className="form-group col-auto">
                          <div className="account_profile position-relative d-inline-block">
                            <div className="">
                              <img className="" width={150} src={profile} />
                            </div>

                            <div className="p-image">
                            <i className="upload-iconIN fas fa-camera" />

                              <input
                                className="file-uploadIN"
                                type="file"
                                name="imageProfile"
                                accept="image/*"
                                {...register("imageProfile")}
                                onChange={(e) =>
                                  onFileSelection(e, "imageProfile")
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Company
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary  signup_fields",
                            { "is-invalid": errors.email }
                          )}
                          name="companyName"
                          id="name"
                          {...register("companyName")}
                        />
                        {errors.companyName && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.companyName?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="DBA" className="fw-bold fs-6">
                          DBA
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields",
                            { "is-invalid": errors.dba }
                          )}
                          name="dba"
                          id="DBA"
                          {...register("dba")}
                        />
                        {errors.dba && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.dba?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Company Address Line 1
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields"
                          )}
                          name="addressLine"
                          id="name"
                          {...register("addressLine")}
                        />
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Company Address Line 2
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          id="addressLine2"
                        />
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          City
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields"
                          )}
                          name="city"
                          id="name"
                          {...register("city")}
                        />
                        {errors.city && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.city?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          State
                        </label>
                        <select
                          className={classNames(
                            "form-select border border-secondary "
                          )}
                          aria-label="Default select example"
                          name="state"
                          {...register("state")}
                        >
                          <option value="">Select a state/province...</option>
                          <option value="Alabama">Alabama</option>
                          <option value="Alabama">Alabama</option>
                          <option value="Alaska">Alaska</option>
                          <option selected="" value="American Samoa">
                            American Samoa
                          </option>
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
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields"
                          )}
                          name="zipcode"
                          id="name"
                          {...register("zipcode")}
                        />
                        {errors.zipcode && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.zipcode?.message}
                          </small>
                        )}
                      </div>
                      <div className="col-md-3 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">Federal Tax ID:</span>
                          <div className="col img_box_show">
                            <input
                              className={classNames(
                                "d-none  border border-secondary signup_fields"
                              )}
                              type="file"
                              id="file1"
                              name="federalTaxId"
                              {...register("federalTaxId")}
                              onChange={(e) =>
                                onFileSelection(e, "federalTaxId")
                              }
                            />
                            {errors.federalTaxId && (
                              <small className="errorText mx-1 fw-bold">
                                {errors.federalTaxId?.message}
                              </small>
                            )}

                            <label htmlFor="file1">
                              <div className="">
                                <FaFileUpload size={25} />

                                <p className="mt-2" style={{ fontSize: "9px" }}>
                                  {user?.federalTaxId}
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">Tobacco License:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file2"
                              name="file"
                              {...register("tobaccoLicence")}
                              onChange={(e) =>
                                onFileSelection(e, "tobaccoLicence")
                              }
                            />
                            {errors.tobaccoLicence && (
                              <small className="errorText mx-1 fw-bold">
                                {errors.tobaccoLicence?.message}
                              </small>
                            )}

                            <label htmlFor="file2">
                              <div className="">
                                <FaFileUpload size={25} />

                                <p className="mt-2" style={{ fontSize: "9px" }}>
                                  {user?.tobaccoLicence}
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">Sales Tax ID:</span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file3"
                              name="salesTaxId"
                              {...register("salesTaxId")}
                              onChange={(e) => onFileSelection(e, "salesTaxId")}
                            />
                            <label htmlFor="file3">
                              <div className="">
                                <FaFileUpload size={25} />

                                <p className="mt-2" style={{ fontSize: "9px" }}>
                                  {user?.salesTaxId}
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">
                            Business License:
                          </span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file4"
                              name="businessLicense"
                              {...register("businessLicense")}
                              onChange={(e) =>
                                onFileSelection(e, "businessLicense")
                              }
                            />
                            <label htmlFor="file1">
                              <div className="">
                                <FaFileUpload size={25} />

                                <p className="mt-2" style={{ fontSize: "9px" }}>
                                  {user?.businessLicense}
                                </p>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Contact First name
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields",
                            { "is-invalid": errors.firstName }
                          )}
                          defaultValue={user?.firstName}
                          name="fisrtName"
                          id="name"
                          {...register("firstName")}
                        />
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="LastName" className="fw-bold fs-6">
                          Contact Last name
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields fw-bold",
                            { "is-invalid": errors.lastName }
                          )}
                          name="lastName"
                          id="LastName"
                          {...register("lastName", {
                            required: "last Name is Required",
                          })}
                        />
                      </div>
                      <div className="col-md-12 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">
                            Account Owner ID:
                          </span>
                          <div className="col img_box_show">
                            <input
                              className="d-none"
                              type="file"
                              id="file5"
                              name="accountOwnerId"
                              {...register("accountOwnerId")}
                              onChange={(e) =>
                                onFileSelection(e, "accountOwnerId")
                              }
                            />
                            {errors.accountOwnerId && (
                              <small className="errorText mx-1 fw-bold">
                                {errors.accountOwnerId?.message}
                              </small>
                            )}

                            <label htmlFor="file5">
                              <div className="">
                                <FaFileUpload size={25} />
                                {user?.accountOwnerId}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Email Address
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields ",
                            { "is-invalid": errors.email }
                          )}
                          defaultValue={user?.email}
                          name="email"
                          id="name"
                          {...register("email", {
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.email?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields "
                          )}
                          defaultValue={user?.phoneNumber}
                          name="phoneNumber"
                          id="name"
                          {...register("phoneNumber", {
                            maxLength: {
                              value: 10,
                              message: "maximium 10 Characters",
                            },
                            minLength: 10,
                            pattern: {
                              value:
                                /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                              message: "Invalid Number",
                            },
                          })}
                        />
                        {errors.phoneNumber && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.phoneNumber?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          How do you know about us?
                        </label>
                        <select
                          className="form-select form-control border border-secondary "
                          aria-label={user?.heardAboutUs}
                          name="heardAboutUs"
                          {...register("heardAboutUs")}
                        >
                          <option selected="" value="Email Flyer">
                            Email Flyer
                          </option>
                          <option value="Search Engine (Google, Yahoo, Bing, Etc.)">
                            Search Engine (Google, Yahoo, Bing, Etc.)
                          </option>
                          <option value="SMS">SMS</option>
                          <option value="Referral">Referral</option>
                          <option value="Instagram">Instagram</option>
                        </select>
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
                                data-val="true"
                                value="true"
                                name="quotation"
                                {...register("quotation")}
                              />
                              <label htmlFor="vii">Yes </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="action_filter filter_check">
                              <input
                                className="d-none"
                                type="radio"
                                id="sh"
                                data-val="false"
                                value="false"
                                name="quotation"
                                {...register("quotation")}
                              />
                              <label htmlFor="sh">No </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <button className="comman_btn mx-2" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
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

export default EditUser;
