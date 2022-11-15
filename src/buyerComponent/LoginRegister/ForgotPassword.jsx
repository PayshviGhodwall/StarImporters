import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import classNames from "classnames";
import Swal from "sweetalert2";

const ForgotPassword = ({ getEmail }) => {
  const apiUrl =  `${process.env.REACT_APP_APIENDPOINTNEW}user/forgotPassword`
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  const handleClick = () => {};

  const onSubmit = (data) => {
    getEmail(data.email);

    axios
      .post(apiUrl, {
        email: data.email,
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
              Reset Your Password by entring your <br /> registered Email
              Address
            </p>
          </div>
          <form
            className="forms_modal_content form-design"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating mb-4">
              <input
                type="email"
                className={classNames("form-control  border border-secondary", {
                  "is-invalid": errors.email,
                })}
                id="floatingEmail"
                name="email"
                placeholder="Password"
                {...register("email", {
                  required: "Please Enter Your Email",
                })}
              />
              {errors.email && (
                <small className="errorText mx-1 fw-bold">
                  {errors.email?.message}
                </small>
              )}
              <label htmlFor="floatingEmail" className="mx-2 fw-bolder">
                Email Address
              </label>
            </div>
            <div className="form-group mb-4">
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
                Didn't receive the OTP?{" "}
                <a
                  href="javascript:;"
                  className="text-decoration-none text-info"
                >
                  Resend OTP
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
