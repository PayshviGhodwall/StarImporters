import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/css/main.css";
import axios from "axios";
import classNames from "classnames";
import Swal from "sweetalert2";

const SignUp = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const apiUrl =  `${process.env.REACT_APP_APIENDPOINTNEW}user/register`

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
  console.log(files);

  const onSubmit = (data) => {
    const SignUpData = async (e) => {
      const formData = new FormData();
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

      let response = await axios.post(apiUrl, formData).then((res) => {
        console.log(res);
        if (res?.data.message === "Registered Successfully") {
          Swal.fire({
            title: "You have been Registered Successfully.",
            text: "Please Be Patient We will contact You Shortly",
            icon: "success",
            button: "Ok",
          });
          navigate("/");
        }
      });
    };

    SignUpData();
  };
  return (
    <div className="SignUp">
      <Navbar />

      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form
              className=" mt-5 bg-white p-5 mb-5 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <h4 className=" mt-1 mb-3 fw-bold  fs-1 text-center text-dark">
                  CREATE MY ACCOUNT
                </h4>

                <p className=" text-center text-secondary fs-5 mb-5">
                  Please fill in the information below
                </p>

                <div className="form-floating col-lg-6 mb-4">
                  <input
                    type="text"
                    className={classNames(
                      "form-control  border border-secondary",
                      { "is-invalid": errors.email }
                    )}
                    id="floatingInput3"
                    name="companyName"
                    placeholder="name@example.com"
                    {...register("companyName", {
                      required: "Company Name is Required*",
                      minLength: {
                        value: 4,
                        message: "Minimium 4 letters Should be in Company Name", // JS only: <p>error message</p> TS only support string
                      },
                    })}
                  />
                  {errors.companyName && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.companyName?.message}
                    </small>
                  )}
                  <label
                    htmlFor="floatingInput3"
                    className="mx-2 fw-bolder text-dark"
                  >
                    Company <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-floating col-6 mb-4">
                  <input
                    type="text"
                    className={classNames(
                      "form-control  border border-secondary signup_fields",
                      { "is-invalid": errors.dba }
                    )}
                    id="floatingPassword1"
                    placeholder="name@example.com"
                    name="dba"
                    {...register("dba", {
                      required: "DBA Name is Required*",
                    })}
                  />
                  {errors.dba && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.dba?.message}
                    </small>
                  )}

                  <label htmlFor="floatingPassword1" className="mx-2 fw-bolder">
                    DBA <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-floating col-6 mb-4">
                  <input
                    type="text"
                    className={classNames(
                      "form-control  border border-secondary signup_fields",
                      { "is-invalid": errors.addressLine }
                    )}
                    id="floatingAddrees1"
                    placeholder="name@example.com"
                    name="addressLine"
                    {...register("addressLine", {
                      required: "Company Adrress Line1 is Required*",
                    })}
                  />
                  {errors.addressLine && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.addressLine?.message}
                    </small>
                  )}
                  <label htmlFor="floatingAddress1" className="mx-2 fw-bolder">
                    Company Address line 1<span className="text-danger">*</span>
                  </label>
                </div>
                <div className="form-floating col-6 mb-2">
                  <input
                    type="text"
                    className="form-control  border border-secondary signup_fields"
                    id="floatingAddress2"
                    placeholder=""
                  />
                  <label htmlFor="floatingAddress2" className="mx-2 fw-bolder">
                    Company Address line 2
                  </label>
                  {/* <div class="form-check mt-1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      
                      value=""
                      id="flexCheckAddress"
                    />
                    <label className="form-check-label fs-6 text-secondary fw-bold" for="flexCheckDefault">
                      Same as addressLine1
                    </label>
                  </div> */}
                </div>
                <div className="form-floating col-4 mb-4">
                  <input
                    type="text"
                    className={classNames(
                      "form-control  border border-secondary signup_fields",
                      { "is-invalid": errors.city }
                    )}
                    id="floatingInput5"
                    placeholder="name@example.com"
                    name="city"
                    {...register("city", {
                      required: "City is Required*",
                    })}
                  />
                  {errors.city && (
                    <small className="errorText mx-1 fw-bold">
                      {errors.city?.message}
                    </small>
                  )}
                  <label htmlFor="floatingInput5" className="mx-2 fw-bolder">
                    City <span className="text-danger">*</span>
                  </label>
                </div>
                <>
                  <div className="form-floating col-4 mb-4 select_dropdown ">
                    <select
                      className={classNames(
                        "form-select border border-secondary signup_fields fw-bolder",
                        { "is-invalid": errors.state }
                      )}
                      id="floatingSelect1"
                      aria-label="Floating label select example"
                      name="state"
                      {...register("state", {
                        required: "State is Required*",
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
                      <option value="Marshall Islands">Marshall Islands</option>
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

                    <label htmlFor="floatingSelect6" className="mx-2 fw-bolder">
                      State/Province
                    </label>
                  </div>
                  <div className="form-floating col-4 mb-4">
                    <input
                      type="text"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.zipcode }
                      )}
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="zipcode"
                      {...register("zipcode", {
                        required: "Pincode is Required*",
                      })}
                    />
                    {errors.zipcode && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.zipcode?.message}
                      </small>
                    )}

                    <label htmlFor="floatingInput6" className="mx-2 fw-bolder">
                      Zip/Postal code <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group col-6 mb-4 choose_file position-relative">
                    <span className="fw-bolder">Federal Tax ID *</span>
                    <label htmlFor="upload1">
                      <i className="fa fa-file me-1  " />
                      Choose File
                    </label>
                    <input
                      type="file"
                      className={classNames(
                        "form-control  border border-secondary",
                        { "is-invalid": errors.federalTaxId }
                      )}
                      defaultValue=""
                      name="federalTaxId"
                      id="upload1"
                      {...register("federalTaxId", {
                        required: "ID is Required*",
                      })}
                      onChange={(e) => onFileSelection(e, "federalTaxId")}
                    />
                    {errors.federalTaxId && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.federalTaxId?.message}
                      </small>
                    )}
                  </div>
                  <div className="form-group col-6 mb-4 choose_file position-relative">
                    <span className="fw-bolder">Tobacco License*</span>
                    <label htmlFor="upload2">
                      <i className="fa fa-file me-1" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.tobaccoLicence }
                      )}
                      defaultValue=""
                      name="tobaccoLicence"
                      id="upload2"
                      {...register("tobaccoLicence", {
                        required: "ID is Required*",
                      })}
                      onChange={(e) => onFileSelection(e, "tobaccoLicence")}
                    />
                    {errors.tobaccoLicence && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.tobaccoLicence?.message}
                      </small>
                    )}
                  </div>
                  <div className="form-group col-6 mb-4 choose_file position-relative">
                    <span className="fw-bolder">Sales Tax ID*</span>
                    <label htmlFor="upload3">
                      <i className="fa fa-file me-1" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.salesTaxId }
                      )}
                      defaultValue=""
                      name="salesTaxId"
                      id="upload3"
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
                  </div>
                  <div className="form-group col-6 mb-5 choose_file position-relative">
                    <span className="fw-bolder ">Business License*</span>
                    <label htmlFor="upload4">
                      <i className="fa fa-file me-1" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.businessLicense }
                      )}
                      defaultValue=""
                      name="businessLicense"
                      id="upload4"
                      {...register("businessLicense", {
                        required: "ID is Required*",
                      })}
                      onChange={(e) => onFileSelection(e, "businessLicense")}
                    />
                    {errors.businessLicense && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.businessLicense?.message}
                      </small>
                    )}
                  </div>
                  <hr style={{ margin: "10px auto 30px", width: "96%" }} />
                  <div className="form-floating col-6 mb-4 mt-4">
                    <input
                      type="text"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.firstName }
                      )}
                      id="floatingInput7"
                      placeholder="name@example.com"
                      name="firstName"
                      {...register("firstName", {
                        required: "Enter Your First Name*",
                      })}
                    />
                    {errors.firstName && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.firstName?.message}
                      </small>
                    )}
                    <label htmlFor="floatingInput7" className="mx-2 fw-bolder">
                      Contact First name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-floating col-6 mb-4 mt-4">
                    <input
                      type="text"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.lastName }
                      )}
                      id="floatingInput8"
                      placeholder="name@example.com"
                      name="lastName"
                      {...register("lastName", {
                        required: "Enter Your Last Name*",
                      })}
                    />
                    {errors.lastName && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.lastName?.message}
                      </small>
                    )}
                    <label htmlFor="floatingInput8" className="mx-2 fw-bolder">
                      Contact Last name <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-group col-12 mb-4 choose_file position-relative">
                    <span className="fw-bolder">Account Owner ID*</span>
                    <label htmlFor="upload5">
                      <i className="fa fa-file me-1" />
                      Choose File
                    </label>
                    <input
                      type="file"
                      className={classNames(
                        "form-control  border border-secondary signup_fields",
                        { "is-invalid": errors.accountOwnerId }
                      )}
                      defaultValue=""
                      name="accountOwnerId"
                      id="upload5"
                      {...register("accountOwnerId", {
                        required: "ID is Required*",
                      })}
                      onChange={(e) => onFileSelection(e, "accountOwnerId")}
                    />
                    {errors.accountOwnerId && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.accountOwnerId?.message}
                      </small>
                    )}
                  </div>
                  <div className="form-floating col-6 mb-4">
                    <input
                      type="email"
                      className="form-control shadow-none border border-secondary"
                      id="floatingPassword4"
                      name="email"
                      placeholder="name@example.com"
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

                    <label htmlFor="floatingPassword4" className="mx-2 fw-bold">
                      Email Address <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-floating col-6 mb-4">
                    <input
                      type="number"
                      className={classNames(
                        "form-control  border border-secondary signup_fields ",
                        { "is-invalid": errors.phoneNumber }
                      )}
                      id="floatingPassword3"
                      placeholder="Password"
                      name="phoneNumber"
                      {...register("phoneNumber", {
                        required: "Phone Number is Required*",
                        maxLength: {
                          value: 10,
                          message: "maximium 10 Charcarters",
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
                    <label
                      htmlFor="floatingPassword3"
                      className="mx-2 fw-bolder"
                    >
                      Phone Number <span className="text-danger">*</span>
                    </label>
                  </div>
                  <div className="form-floating col-12 mb-4 select_dropdown">
                    <select
                      className={classNames(
                        "form-select form-control shadow-none border border-secondary fw-bolder ",
                        { "is-invalid": errors.phoneNumber }
                      )}
                      id="floatingSelect2"
                      aria-label="Floating label select example"
                      name="heardAboutUs"
                      {...register("heardAboutUs", {
                        required: "Email is Required*",
                      })}
                    >
                      <option value="Email Flyer">Email Flyer</option>
                      <option value="Search Engine (Google, Yahoo, Bing, Etc.)">
                        Search Engine (Google, Yahoo, Bing, Etc.)
                      </option>
                      <option value="SMS">SMS</option>
                      <option value="Referral">Referral</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                    <label htmlFor="floatingSelect2" className="mx-2 fw-normal">
                      How did you hear about us?
                    </label>
                  </div>
                  <div class="form-check mt-1 col-6 mx-3 ">
                    <input
                    
                      className={classNames(
                        "form-check-input border border-secondary",
                      )}
                      type="checkbox"
                      value=""
                      id="flexCheckAddress"
                    
                    />
                    <label
                      className="form-check-label fs-6 text-secondary fw-bold "
                      for="flexCheckDefault"
                    >
                      Wholesale Confirmation
                    </label>
                  </div>
                  <div class="form-check mt-1 col-5 mx-2">
                    <input
                      className={classNames(
                        "form-check-input border border-secondary",
                      )}
                      type="checkbox"
                      value=""
                      id="flexCheckAddress"
                    />
                    <label
                      className="form-check-label fs-6 text-secondary fw-bold "
                      for="flexCheckDefault"
                    >
                      Subscribe to our email newslette
                    </label>
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button className="comman_btn2 mx-2">Cancel</button>
                    <button className="comman_btn mx-2" type="submit">
                      Submit
                    </button>
                  </div>
                </>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
