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
import { data } from "jquery";
import ProfileBar from "../ProfileBar";

const AddUser = () => {
  const [files, setFiles] = useState([]);
  const apiUrl =  `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/addUser`
  const navigate = useNavigate();
  const [emailErr,setEmailErr] = useState("")
  const [sideBar, setSideBar] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };
  const onSubmit = async (data) => {
    console.log(data);
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


    await axios.post(apiUrl, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Registered Successfully") {
        navigate("/UserManage");
      }
      if (res?.data.message === "Email is already registered") {
        setEmailErr("Email is already registered")
        
      }
    });
  
  };

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div className={sideBar? "admin_main" : "expanded_main"}>
    <div className={sideBar? "siderbar_section": "d-none"}>
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
                  style={{ textDecoration: "none", fontSize: "18px",
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
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                 <i class="fa fa-layer-group"></i> Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Inventory"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                <i class="far fa-building"></i>  Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                <i class="fa fa-ship"></i>  Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/OrderRequest"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                 <i class="fa fa-layer-group"></i>  Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                 <i class="fa fa-cog"></i> CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
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
                  ><i className="fa fa-bars"></i></h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar)
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
                    <h2 className="main_headers">Add New User</h2>
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
                      <div className="col-4 text-center mb-2 mt-2">
                        <div className="form-group col-auto choose_fil">
                          <div className="account_profile position-relative d-inline-block">
                            <div className="form-group mt-4 ">
                              <label htmlFor="" className="">
                                <i className="fa fa-file me-1" />
                                Choose File
                              </label>
                              <span></span>
                              <input
                                className={classNames(
                                  "form-control",
                                  { "is-invalid": errors.imageProfile }
                                )}
                                type="file"
                                name="imageProfile mx-2"
                                accept="image/*"
                                {...register("imageProfile", {
                                  required: "Please Upload Your Profile Image",
                                })}
                                onChange={(e) =>
                                  onFileSelection(e, "imageProfile")
                                }
                              />
                              {errors.imageProfile && (
                                <small className="errorText text-start fw-bold">
                                  {errors.imageProfile?.message}
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Company
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary  signup_fields",
                            { "is-invalid": errors.companyName }
                          )}
                          name="companyName"
                          id="name"
                          {...register("companyName", {
                            required: "Company Name is Required*",
                            minLength: {
                              value: 5,
                              message:
                                "Minimium 4 letters Should be in Company Name", // JS only: <p>error message</p> TS only support string
                            },
                          })}
                        />
                        {errors.companyName && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.companyName?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-4 mb-4">
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
                          {...register("dba", {
                            required: "DBA Name is Required*",
                          })}
                        />
                        {errors.dba && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.dba?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="address" className="fw-bold fs-6">
                          Company Address Line 1
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields",
                            { "is-invalid": errors.addressLine }
                          )}
                          name="addressLine"
                          id="address"
                          {...register("addressLine", {
                            required: "Company Adrress Line1 is Required*",
                          })}
                        />
                        {errors.addressLine && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.addressLine?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Company Address Line 2
                        </label>
                        <input
                          type="text"
                          className="form-control border border-secondary "
                          name="name"
                          id="addressLine2"
                        />
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="city" className="fw-bold fs-6">
                          City
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields",
                            { "is-invalid": errors.city }
                          )}
                          name="city"
                          id="city"
                          {...register("city", {
                            required: "City is Required*",
                          })}
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
                            "form-select border border-secondary",
                            { "is-invalid": errors.state }
                          )}
                          aria-label="Default select example"
                          name="state"
                          {...register("state", {
                            required: "State is Required*",
                          })}
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
                        {errors.state && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.state?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Zip/Postal Code
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields",
                            { "is-invalid": errors.zipcode }
                          )}
                          name="zipcode"
                          id="name"
                          {...register("zipcode", {
                            required: "Postal Code is Required*",
                          })}
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
                                "d-none  border border-secondary signup_fields",
                                { "is-invalid": errors.federalTaxId }
                              )}
                              type="file"
                              id="file1"
                              name="federalTaxId"
                              {...register("federalTaxId", {
                                required: "ID is Required*",
                              })}
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
                                <FaFileUpload size={26} />
                                <h1 className=" fs-6 mt-2 text-secondary">{files.federalTaxId?.name}</h1>
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
                              className={classNames(
                                " d-none form-control  border border-secondary signup_fields",
                                { "is-invalid": errors.tobaccoLicence }
                              )}
                              type="file"
                              id="file2"
                              name="tobaccoLicence"
                              {...register("tobaccoLicence", {
                                required: "ID is Required*",
                              })}
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
                                <h1 className=" fs-6 mt-2 text-secondary">{files.tobaccoLicence?.name}</h1>

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
                              className={classNames(
                                "d-none form-control  border border-secondary signup_fields",
                                { "is-invalid": errors.salesTaxId }
                              )}
                              type="file"
                              id="file3"
                              name="salesTaxId"
                              {...register("salesTaxId", {
                                required: "ID is Required*",
                              })}
                              onChange={(e) => onFileSelection(e, "salesTaxId")}
                            />
                            {errors.salesTaxId && (
                              <small className="errorText mx-1 fw-bold">
                                {errors.salesTaxId?.message}
                              </small>
                            )}
                            <label htmlFor="file3">
                              <div className="">
                                <FaFileUpload size={25} />
                                <h1 className=" fs-6 mt-2 text-secondary">{files.salesTaxId?.name}</h1>

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
                              className={classNames(
                                "d-none form-control  border border-secondary signup_fields",
                                { "is-invalid": errors.businessLicense }
                              )}
                              type="file"
                              id="file4"
                              name="businessLicense"
                              {...register("businessLicense", {
                                required: "ID is Required*",
                              })}
                              onChange={(e) =>
                                onFileSelection(e, "businessLicense")
                              }
                            />
                            {errors.businessLicense && (
                              <small className="errorText mx-1 fw-bold">
                                {errors.businessLicense?.message}
                              </small>
                            )}
                            <label htmlFor="file4">
                              <div className="">
                                <FaFileUpload size={25} />
                                <h1 className=" fs-6 mt-2 text-secondary">{files.businessLicense?.name}</h1>
                                
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
                          name="fisrtName"
                          id="name"
                          {...register("firstName", {
                            required: "Enter Your First Name*",
                          })}
                        />
                        {errors.firstName && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.firstName?.message}
                          </small>
                        )}
                      </div>
                      <div className="form-group col-6 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Contact Last name
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields fw-bold",
                            { "is-invalid": errors.lastName }
                          )}
                          name="lastName"
                          id="name"
                          {...register("lastName", {
                            required: "Enter Your Last Name*",
                          })}
                        />
                        {errors.lastName && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.lastName?.message}
                          </small>
                        )}
                      </div>
                      <div className="col-md-12 mb-4 mt-2 d-flex align-items-stretch">
                        <div className="row view-inner-box border mx-0 w-100">
                          <span className="fw-bold fs-6">
                            Account Owner ID:
                          </span>
                          <div className="col img_box_show">
                            <input
                              className={classNames(
                                "d-none form-control  border border-secondary signup_fields",
                                { "is-invalid": errors.accountOwnerId }
                              )}
                              type="file"
                              id="file5"
                              name="accountOwnerId"
                              {...register("accountOwnerId", {
                                required: "ID is Required*",
                              })}
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
                                <h1 className=" fs-6 mt-2 text-secondary">{files.accountOwnerId?.name}</h1>

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
                          name="email"
                          id="name"
                          {...register("email", {
                            required: "Email is Required*",

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
                            {emailErr}

                      </div>
                      <div className="form-group col-4 mb-4">
                        <label htmlFor="" className="fw-bold fs-6">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className={classNames(
                            "form-control  border border-secondary signup_fields ",
                            { "is-invalid": errors.phoneNumber }
                          )}
                          name="phoneNumber"
                          id="name"
                          {...register("phoneNumber", {
                            required: "Phone Number is Required*",

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
                        <label htmlFor="reference" className="fw-bold fs-6">
                          How do you know about us?
                        </label>
                        <select
                          className={classNames(
                            "form-control  border border-secondary signup_fields ",
                            { "is-invalid": errors.heardAboutUs }
                          )}
                          name="heardAboutUs"
                          id="reference"
                          {...register("heardAboutUs", {
                            required: "This field is Required",
                          })}
                        >
                          {errors.heardAboutUs && (
                            <small className="errorText mx-1 fw-bold">
                              {errors.heardAboutUs?.message}
                            </small>
                          )}
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
                      <div className="col-12 text-center mt-4">
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

export default AddUser;
