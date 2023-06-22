import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../httpServices/loginHttpService/loginHttpService";
import { RotatingLines } from "react-loader-spinner";
import $ from "jquery";
import Swal from "sweetalert2";
import { useTimeout } from "rsuite/esm/utils";
import { browserName } from "react-device-detect";

function AppSignUp() {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append(
      "companyName",
      data?.companyName?.charAt(0).toUpperCase() +
        data?.companyName?.slice(1).trim()
    );
    formData.append(
      "dba",
      data?.dba?.charAt(0).toUpperCase() + data?.dba?.slice(1).trim()
    );
    formData.append(
      "addressLine1",
      data?.addressLine1?.charAt(0).toUpperCase() +
        data?.addressLine1?.slice(1).trim()
    );
    formData.append(
      "addressLine2",
      data?.addressLine2
        ? data?.addressLine2?.charAt(0).toUpperCase() +
            data?.addressLine2?.slice(1).trim()
        : ""
    );
    formData.append(
      "city",
      data?.city?.charAt(0).toUpperCase() + data?.city?.slice(1).trim()
    );
    formData.append(
      "state",
      data?.state?.charAt(0).toUpperCase() + data?.state?.slice(1).trim()
    );
    formData.append("zipcode", data?.zipcode?.trim());
    formData.append(
      "firstName",
      data?.firstName?.charAt(0).toUpperCase() +
        data?.firstName?.slice(1).trim()
    );
    formData.append(
      "lastName",
      data?.lastName?.charAt(0).toUpperCase() + data?.lastName?.slice(1).trim()
    );
    formData.append("email", data?.email?.trim());
    formData.append(
      "wholesaleConfirmation",
      data?.wholeSale ? data?.wholeSale : false
    );
    // formData.append("newsLetter", data?.subscribe);
    formData.append("phoneNumber", data?.phoneNumber?.trim());
    formData.append("businessPhoneNumber", data?.businessPhoneNumber);
    formData.append("heardAboutUs", data?.heardAboutUs);
    formData.append(
      "comments",
      data?.comments?.charAt(0).toUpperCase() + data?.comments?.slice(1).trim()
    );

    if (selectedFile1) {
      formData.append("federalTaxId", selectedFile1, selectedFile1.name);
    }
    if (selectedFile2) {
      formData.append("tobaccoLicence", selectedFile2, selectedFile2.name);
    }
    if (selectedFile3) {
      formData.append("salesTaxId", selectedFile3, selectedFile3.name);
    }
    if (selectedFile4) {
      formData.append("businessLicense", selectedFile4, selectedFile4.name);
    }
    if (selectedFile5) {
      formData.append("accountOwnerId", selectedFile5, selectedFile5.name);
    }

    const response = await userRegister(formData);

    if (response?.data.message === "Registered Successfully") {
      if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler(
          "saveDetails",
          data?.email,
          "xyzz"
        );
      }
      setLoader(false);
      Swal.fire({
        title: "Thanks You! Your account is under review.",
        text: "We will be reviewing your account. Please check your registered email.",
        icon: "success",
        button: "Ok",
      });
      navigate("/app/pre-login");
    }
    if (response?.data.message === "Email is already registered") {
      setLoader(false);
      Swal.fire({
        title: "Email is Already Registered!",
        text: "Please login to your account",
        icon: "error",
        button: "Ok",
      });
    }
    if (response?.data.message === "Invalid Image format") {
      Swal.fire({
        title: "Invalid Image format!",
        text: "Only Images are allowed",
        icon: "warning",
        confirmButtonText: "ok",
      });
      setLoader(false);
    }
    if (response?.data.message === "Phone is already registered") {
      setLoader(false);

      Swal.fire({
        title: "Phone Number is Already Registered!",
        text: "Please enter a new number ",
        icon: "error",
        button: "Ok",
      });
    }
  };
  useTimeout(() => {
    setLoader(false);
  }, [9000]);

  const onFileSelection = (event, index) => {
    let file = event[0];
    if (index === 1) {
      setSelectedFile1(event[0]);
    } else if (index === 2) {
      setSelectedFile2(event[0]);
    } else if (index === 3) {
      setSelectedFile3(event[0]);
    } else if (index === 4) {
      setSelectedFile4(event[0]);
    } else if (index === 5) {
      setSelectedFile5(event[0]);
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
          <div className="background-shape"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8">
                {" "}
                <div className="logo_comman">
                  <img
                    className="big-logo"
                    src="../assets/img/logo1.png"
                    alt=""
                  />
                </div>
                {browserName === "WebKit" ||
                browserName === "Chrome WebView" ? (
                  <div className="register-form mt-5">
                    <span className="mb-3">
                      Fields that are mark with{" "}
                      <strong className="text-danger">*</strong> are mandatory!
                    </span>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group text-start mb-4">
                        <span>Company</span>
                        <label for="username">
                          <i className="fa fa-building"></i>
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="companyName"
                          id="companyName"
                          {...register("companyName", {
                            required: false,
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.companyName && (
                          <p className="form-error mt-1">
                            {errors.companyName?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>DBA</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="dba"
                          id="dba"
                          {...register("dba")}
                        />

                        {errors?.dba && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Company Address 1</span>
                        <label for="username">
                          <i className="fas fa-map-signs"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="addressLine1"
                          id="addressLine1"
                          {...register("addressLine1", {
                            required: false,

                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed!",
                            },
                            maxLength: {
                              value: 200,
                              message: "Max length is 200 characters!",
                            },
                            minLength: {
                              value: 6,
                              message: "Min length is 6 characters!",
                            },
                          })}
                        />

                        {errors?.addressLine1 && (
                          <p className="form-error mt-1">
                            {errors.addressLine1?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Company Address 2</span>
                        <label for="username">
                          <i className="fas fa-map-signs"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="addressLine2"
                          id="addressLine2"
                          {...register("addressLine2", { required: false })}
                        />

                        {errors?.addressLine2 && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>City</span>
                        <label for="username">
                          <i className="fa fa-map-marker-alt"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="city"
                          id="city"
                          {...register("city", {
                            required: false,

                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />
                        {errors?.city && (
                          <p className="form-error mt-1">
                            {errors.city?.message}
                          </p>
                        )}{" "}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>State</span>
                        <label for="username">
                          <i className="fa fa-map-marker-alt"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="state"
                          id="state"
                          {...register("state", {
                            required: false,

                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.state && (
                          <p className="form-error mt-1">
                            {errors.state?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Zip/Postal</span>
                        <label for="username">
                          <i className="fa fa-mars" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder=""
                          name="zipcode"
                          id="zipcode"
                          {...register("zipcode", {
                            required: false,

                            maxLength: 10,
                          })}
                        />

                        {errors?.zipcode && (
                          <p className="form-error mt-1">
                            {errors.zipcode?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Contact First Name</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="firstName"
                          id="firstName"
                          {...register("firstName", {
                            pattern: {
                              required: false,

                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.firstName && (
                          <p className="form-error mt-1">
                            {errors.firstName?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Contact Last Name</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="lastName"
                          id="lastName"
                          {...register("lastName", {
                            pattern: {
                              required: false,

                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.lastName && (
                          <p className="form-error mt-1">
                            {errors.lastName?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Email <strong>*</strong>
                        </span>
                        <label for="email">
                          <i className="fa-solid fa-at"></i>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          {...register("email", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Invalid email address",
                            },
                          })}
                        />

                        {errors?.email && (
                          <p className="form-error mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Phone Number</span>
                        <label for="text">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="phoneNumber"
                          name="phoneNumber"
                          {...register("phoneNumber", {
                            required: false,

                            maxLength: 12,
                            minLength: 10,
                          })}
                        />
                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "required" && (
                            <p className="form-error mt-2">
                              This field is required
                            </p>
                          )}

                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "maxLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "minLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Federal Tax ID </span>
                        <label for="p-1">Choose file</label>
                        <input
                          className="form-control"
                          id="p-1"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 1)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Tobacco License</span>
                        <label for="p-2">Choose file</label>
                        <input
                          className="form-control"
                          id="p-2"
                          type="file"
                          placeholder=""
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          onChange={(e) => onFileSelection(e.target.files, 2)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Sales Tax ID </span>
                        <label for="p-3">Choose file</label>
                        <input
                          className="form-control"
                          id="p-3"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 3)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Business License</span>
                        <label for="p-4">Choose file</label>
                        <input
                          className="form-control"
                          id="p-4"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 4)}
                        />
                      </div>

                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Account Owner ID </span>
                        <label for="p-5">Choose file</label>
                        <input
                          className="form-control"
                          id="p-5"
                          type="file"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 5)}
                        />
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Business Number</span>
                        <label for="text">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="businessNumber"
                          name="businessPhoneNumber"
                          {...register("businessPhoneNumber", {
                            required: false,
                            maxLength: 10,
                            minLength: 10,
                          })}
                        />
                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "required" && (
                            <p className="form-error mt-2">
                              This field is required
                            </p>
                          )}

                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "maxLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "minLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Comments(optional)</span>
                        <label for="comments">
                          <i className="fa-solid fa-edit"></i>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="comments"
                          placeholder="Type anything ....."
                          {...register("comments")}
                        />
                        {errors?.comments && (
                          <p className="form-error mt-1">
                            {errors.comments.message}
                          </p>
                        )}
                      </div>
                      <div class="form-group text-start mb-4 d-flex col-12">
                        <label
                          className="form-check-label-app "
                          for="flexCheckAddress"
                        >
                          Wholesale Confirmation ?
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={true}
                          id="flexCheckAddress"
                          name="wholesaleConfirmation"
                          {...register("wholesaleConfirmation")}
                        />
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>How did you hear about us?</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <select
                          className="form-select mt-2"
                          aria-label="Default select example"
                          id="hear"
                          name="heardAboutUs"
                          {...register("heardAboutUs")}
                        >
                          <option value="">Select</option>
                          <option value="Email Flyer">Email Flyer</option>
                          <option value="Search Engine (Google, Yahoo, Bing, Etc.)">
                            Search Engine
                          </option>
                          <option value="Referral">Referral</option>
                          <option value="Instagram">Instagram</option>
                        </select>

                        {errors?.heardAboutUs && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="d-flex">
                        <button
                          className="comman_btn me-1"
                          onClick={() => navigate("/app/login")}
                        >
                          Cancel
                        </button>
                        <button
                          className="comman_btn2 bg-white text-dark ms-1"
                          type="submit"
                        >
                          {loader ? (
                            <RotatingLines
                              strokeColor="#eb3237"
                              animationDuration="0.75"
                              width="30"
                              visible={true}
                            />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="register-form mt-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-group text-start mb-4">
                        <span>
                          Company <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa fa-building"></i>
                        </label>

                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="companyName"
                          id="companyName"
                          {...register("companyName", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.companyName && (
                          <p className="form-error mt-1">
                            {errors.companyName?.message}
                          </p>
                        )}
                      </div>

                      <div className="form-group text-start mb-4">
                        <span>DBA</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="dba"
                          id="dba"
                          {...register("dba")}
                        />

                        {errors?.dba && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Company Address 1 <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fas fa-map-signs"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="addressLine1"
                          id="addressLine1"
                          {...register("addressLine1", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed!",
                            },
                            maxLength: {
                              value: 200,
                              message: "Max length is 200 characters!",
                            },
                            minLength: {
                              value: 6,
                              message: "Min length is 6 characters!",
                            },
                          })}
                        />

                        {errors?.addressLine1 && (
                          <p className="form-error mt-1">
                            {errors.addressLine1?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Company Address 2</span>
                        <label for="username">
                          <i className="fas fa-map-signs"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="addressLine2"
                          id="addressLine2"
                          {...register("addressLine2", { required: false })}
                        />

                        {errors?.addressLine2 && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          City <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa fa-map-marker-alt"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="city"
                          id="city"
                          {...register("city", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />
                        {errors?.city && (
                          <p className="form-error mt-1">
                            {errors.city?.message}
                          </p>
                        )}{" "}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          State <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa fa-map-marker-alt"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="state"
                          id="state"
                          {...register("state", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.state && (
                          <p className="form-error mt-1">
                            {errors.state?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Zip/Postal <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa fa-mars" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder=""
                          name="zipcode"
                          id="zipcode"
                          {...register("zipcode", {
                            required: "Required and max-length is 10",
                            maxLength: 10,
                          })}
                        />

                        {errors?.zipcode && (
                          <p className="form-error mt-1">
                            {errors.zipcode?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Contact First Name <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="firstName"
                          id="firstName"
                          {...register("firstName", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.firstName && (
                          <p className="form-error mt-1">
                            {errors.firstName?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Contact Last Name <strong>*</strong>
                        </span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder=""
                          name="lastName"
                          id="lastName"
                          {...register("lastName", {
                            required: "Required",
                            pattern: {
                              value: /^[^*|\":<>[\]{}`\\()';@&$]+$/,
                              message: "Special Character not allowed",
                            },
                          })}
                        />

                        {errors?.lastName && (
                          <p className="form-error mt-1">
                            {errors.lastName?.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Email <strong>*</strong>
                        </span>
                        <label for="email">
                          <i className="fa-solid fa-at"></i>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          id="email"
                          {...register("email", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: "Invalid email address",
                            },
                          })}
                        />

                        {errors?.email && (
                          <p className="form-error mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Phone Number <strong>*</strong>
                        </span>
                        <label for="text">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="phoneNumber"
                          name="phoneNumber"
                          {...register("phoneNumber", {
                            required: false,
                            maxLength: 12,
                            minLength: 10,
                          })}
                        />
                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "required" && (
                            <p className="form-error mt-2">
                              This field is required
                            </p>
                          )}

                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "maxLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                        {errors.phoneNumber &&
                          errors.phoneNumber.type === "minLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Federal Tax ID </span>
                        <label for="p-1">Choose file</label>
                        <input
                          className="form-control"
                          id="p-1"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 1)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Tobacco License</span>
                        <label for="p-2">Choose file</label>
                        <input
                          className="form-control"
                          id="p-2"
                          type="file"
                          placeholder=""
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          onChange={(e) => onFileSelection(e.target.files, 2)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Sales Tax ID </span>
                        <label for="p-3">Choose file</label>
                        <input
                          className="form-control"
                          id="p-3"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 3)}
                        />
                      </div>
                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Business License</span>
                        <label for="p-4">Choose file</label>
                        <input
                          className="form-control"
                          id="p-4"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 4)}
                        />
                      </div>

                      <div className="form-group choose_file position-relative text-start mb-4">
                        <span>Account Owner ID </span>
                        <label for="p-5">Choose file</label>
                        <input
                          className="form-control"
                          id="p-5"
                          type="file"
                          accept="image/jpeg,image/png,application/pdf,image/x-eps"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files, 5)}
                        />
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>
                          Business Number <strong>*</strong>
                        </span>
                        <label for="text">
                          <i className="fa fa-phone" aria-hidden="true"></i>
                        </label>
                        <input
                          className="form-control"
                          type="number"
                          id="businessNumber"
                          name="businessPhoneNumber"
                          {...register("businessPhoneNumber", {
                            required: false,
                            maxLength: 10,
                            minLength: 10,
                          })}
                        />
                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "required" && (
                            <p className="form-error mt-2">
                              This field is required
                            </p>
                          )}

                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "maxLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                        {errors.businessPhoneNumber &&
                          errors.businessPhoneNumber.type === "minLength" && (
                            <p className="form-error mt-2">
                              Please enter 10 digit number
                            </p>
                          )}
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>Comments(optional)</span>
                        <label for="comments">
                          <i className="fa-solid fa-edit"></i>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="comments"
                          placeholder="Type anything ....."
                          {...register("comments")}
                        />

                        {errors?.comments && (
                          <p className="form-error mt-1">
                            {errors.comments.message}
                          </p>
                        )}
                      </div>
                      <div class="form-group text-start mb-4 d-flex col-12">
                        <label
                          className="form-check-label-app "
                          for="flexCheckAddress"
                        >
                          Wholesale Confirmation ?
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={true}
                          id="flexCheckAddress"
                          name="wholesaleConfirmation"
                          {...register("wholesaleConfirmation")}
                        />
                      </div>
                      <div className="form-group text-start mb-4">
                        <span>How did you hear about us?</span>
                        <label for="username">
                          <i className="fa-solid fa-user"></i>
                        </label>
                        <select
                          className="form-select mt-2"
                          aria-label="Default select example"
                          id="hear"
                          name="heardAboutUs"
                          {...register("heardAboutUs", {
                            required: true,
                          })}
                        >
                          <option value="">Select</option>
                          <option value="Email Flyer">Email Flyer</option>
                          <option value="Search Engine (Google, Yahoo, Bing, Etc.)">
                            Search Engine
                          </option>
                          <option value="Referral">Referral</option>
                          <option value="Instagram">Instagram</option>
                        </select>

                        {errors?.heardAboutUs && (
                          <p className="form-error mt-1">
                            This field is required
                          </p>
                        )}
                      </div>
                      <div className="d-flex">
                        <button
                          className="comman_btn me-1"
                          onClick={() => navigate("/app/login")}
                        >
                          Cancel
                        </button>
                        <button
                          className="comman_btn2 bg-white text-dark ms-1"
                          type="submit"
                        >
                          {loader ? (
                            <RotatingLines
                              strokeColor="#eb3237"
                              animationDuration="0.75"
                              width="30"
                              visible={true}
                            />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                <div className="login-meta-data mt-2">
                  <small style={{ fontSize: "13px" }}>
                    *By signing up, you agree to our
                    <Link className="mx-1" to="/app/terms" state={"jiij"}>
                      Terms and Conditions.
                    </Link>
                  </small>
                  <p className="mt-2 mb-0">
                    Already have an account?
                    <Link className="mx-1" to="/app/login">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppSignUp;
