import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userRegister } from "../httpServices/loginHttpService/loginHttpService";
import { RotatingLines } from "react-loader-spinner";
import $ from "jquery";
import Swal from "sweetalert2";

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
    setLoader(true);
    console.log(data);

    data.addressLine = [data.addressLine, data.addressLine1];
    delete data.addressLine1;

    const formData = new FormData();
    for (const item in data) {
      formData.append(item, data[item]);
      console.log(data[item]);
    }

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
        window.flutter_inappwebview.callHandler("saveDetails" , data?.email ,"xyzz" );
  
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
                        {...register("companyName", { required: true })}
                      />

                      {errors?.companyName && (
                        <p className="form-error mt-1">
                          This field is required
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
                        name="addressLine"
                        id="addressLine"
                        {...register("addressLine", { required: true })}
                      />

                      {errors?.addressLine && (
                        <p className="form-error mt-1">
                          This field is required
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
                        name="addressLine1"
                        id="addressLine1"
                        {...register("addressLine1", { required: false })}
                      />

                      {errors?.addressLine1 && (
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
                        {...register("city", { required: true })}
                      />
                      {errors?.city && (
                        <p className="form-error mt-1">
                          This field is required
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
                        {...register("state", { required: true })}
                      />

                      {errors?.state && (
                        <p className="form-error mt-1">
                          This field is required
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
                        {...register("zipcode", { required: true })}
                      />

                      {errors?.zipcode && (
                        <p className="form-error mt-1">
                          This field is required
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
                        {...register("firstName", { required: true })}
                      />

                      {errors?.firstName && (
                        <p className="form-error mt-1">
                          This field is required
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
                        {...register("lastName", { required: true })}
                      />

                      {errors?.lastName && (
                        <p className="form-error mt-1">
                          This field is required
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
                          required: true,
                          maxLength: 10,
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
                        accept= "image/jpeg,image/png,application/pdf,image/x-eps"
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
                        accept= "image/jpeg,image/png,application/pdf,image/x-eps"

                        onChange={(e) => onFileSelection(e.target.files, 2)}
                      />
                    </div>
                    <div className="form-group choose_file position-relative text-start mb-4">
                      <span>Sales Tax ID </span>
                      <label for="p-3">Choose file</label>
                      <input
                        className="form-control"
                        id="p-3"
                        accept= "image/jpeg,image/png,application/pdf,image/x-eps"

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
                        accept= "image/jpeg,image/png,application/pdf,image/x-eps"

                        type="file"
                        placeholder=""
                        onChange={(e) => onFileSelection(e.target.files, 4)}
                      />
                    </div>
                    {/* <hr
                      style={{
                        margin: "10px auto 30px",
                        width: "100%",
                        border: "1px dashed #fff",
                        opacity: "1",
                      }}
                    /> */}

                    <div className="form-group choose_file position-relative text-start mb-4">
                      <span>Account Owner ID </span>
                      <label for="p-5">Choose file</label>
                      <input
                        className="form-control"
                        id="p-5"
                        type="file"
                        accept= "image/jpeg,image/png,application/pdf,image/x-eps"

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
                        name="businessNumber"
                        {...register("businessNumber", {
                          required: false,
                          maxLength: 10,
                          minLength: 10,
                        })}
                      />
                      {errors.businessNumber &&
                        errors.businessNumber.type === "required" && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}

                      {errors.businessNumber &&
                        errors.businessNumber.type === "maxLength" && (
                          <p className="form-error mt-2">
                            Please enter 10 digit number
                          </p>
                        )}
                      {errors.businessNumber &&
                        errors.businessNumber.type === "minLength" && (
                          <p className="form-error mt-2">
                            Please enter 10 digit number
                          </p>
                        )}
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
                        name="hear"
                        {...register("hear", {
                          required: true,
                        })}
                      >
                        <option value="">Select</option>
                        <option value="Email Flyer">Email Flyer</option>
                        <option value="Search Engine (Google, Yahoo, Bing, Etc.)">
                          Search Engine
                        </option>
                        <option value="SMS">SMS</option>
                        <option value="Referral">Referral</option>
                        <option value="Instagram">Instagram</option>
                      </select>

                      {errors?.hear && (
                        <p className="form-error mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                    <div className="d-flex">
                      <button className="comman_btn me-1" onClick={()=>navigate("/app/login")}>Cancel</button>
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
                <div className="login-meta-data">
                  <p className="mt-3 mb-0">
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
