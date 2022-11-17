import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import Swal from "sweetalert2";
import { useEffect } from "react";

const ForgotPassword = ({ getEmail }) => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/forgotPassword`;
  const [passDiss, setPassDis] = useState(false);
  const [emailDiss, setEmailDis] = useState(false);
  const [value, setValue] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    formState,
    reset
  } = useForm();
  const handleClick = () => {};

 
  const onSubmit = (data) => {
    getEmail(data.email);
    axios
      .post(apiUrl, {
        email: data.email,
        phoneNumber: data.phoneNumber,
      })
      .then((res) => {
        console.log(res?.data.results);
        if (res?.data.message === "User not registered") {
          Swal.fire({
            title: "You are not a registered User",
            text: " Register Now!",
            icon: "error",
            confirmButtonText: "GO BACK",
          });
        } else if (res?.data.message === "OTP Sent") {
          Swal.fire({
            title: "OTP SEND SUCCESS",
            text: "OTP SENT",
            icon: "success",
            confirmButtonText: "ENTER OTP",
          });
             
          document.getElementById("modal-toggler").click();
        }
      });
  };

  return (
    <div className="">
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-8">
          <div className="comman_modal_heading">
            <h2 className="fw-bolder fs-2">Forgot Your Password</h2>
            <p>
              PLease Enter Your Registered <strong>Email/Phone</strong> Number
              to Recieve verification code
            </p>
          </div>
          <form
            className="forms_modal_content form-design"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={emailDiss ? "d-none" : "form-floating mb-2 "}>
              <input
                type="email"
                className={classNames(
                  "form-control  border border-secondary px-4",
                  {
                    "is-invalid": errors.email,
                  }
                )}
                id="floatingEmail"
                name="email"
                placeholder="Password"
                {...register("email")}
                onChange={(e) => {
                  let volue = e.target.value;
                  console.log(volue.length);
                  if (volue.length == 1) {
                    setPassDis(true);
                  } else if (volue == 0) {
                    setPassDis(!passDiss);
                  }
                }}
              />
              {errors.email && (
                <small className="errorText mx-1 fw-bold">
                  {errors.email?.message}
                </small>
              )}
              <label htmlFor="floatingEmail" className="fs-6 fw-bolder">
                Email Address
              </label>
            </div>

            <div>
              <h5
                className={passDiss || emailDiss ? "d-none" : " fs-6 mt-2 mb-2"}
              >
                or
              </h5>
            </div>
            <div className={passDiss ? "d-none" : "form-floating mb-4 "}>
              <input
                type="Number"
                className={classNames(
                  "form-control  border border-secondary px-4",
                  {
                    "is-invalid": errors.email,
                  }
                )}
                id="floatingNumber"
                name="phoneNumber"
                placeholder="cxc"
                {...register("phoneNumber")}
                onChange={(e) => {
                  let number = e.target.value;
                  if (number.length == 1) {
                    setEmailDis(true);
                  } else if (number == 0) {
                    setEmailDis(!emailDiss);
                  }
                }}
              />
              {errors.email && (
                <small className="errorText mx-1 fw-bold">
                  {errors.email?.message}
                </small>
              )}
              <label htmlFor="floatingEmail" className="fs-6 fw-bolder">
                Phone Number
              </label>
            </div>
            <div className="form-group mb-4 mt-3">
              <button
                className="comman_btn"
                type="submit"
                onClick={handleClick}
              >
                {" "}
                Send Otp
              </button>
            </div>
            <div className="form-group mb-0 comman_text">
              <span>
                Didn't have access to email/phone ? {" "}
                <a
                  href="javascript:;"
                  className="text-decoration-none text-info"
                >
                  Try Another Options
                </a>
              </span>
            </div>
          </form>
          <button
            id="modal-toggler"
            className="comman_btn mx-2 d-none"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop3"
          >
            Verify Otp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
