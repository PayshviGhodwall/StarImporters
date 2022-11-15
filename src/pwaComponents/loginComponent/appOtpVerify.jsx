import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { verifyOTP } from "../httpServices/loginHttpService/loginHttpService";

function AppOtpVerification() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let otp = Object.values(data);
    otp = otp.join("");
    console.log(otp);

    const formData = {
      email: location.state.email,
      otp: +otp,
    };

    const response = await verifyOTP(formData);
    if (!response.data.error) {
      navigate("/app/success", {
        state: { email: location.state.email },
      });
    }
  };
  const moveOnMax = (event, field, nextField) => {
    event = event || window.event;
    if (event.keyCode != 9) {
      if (field.value.length >= field.maxLength) {
        nextField.focus();
      }
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-11 col-lg-8">
                <div className="logo_comman">
                  <img
                    className="big-logo"
                    src="../assets/img/logo1.png"
                    alt=""
                  />
                </div>
                <div className="text-start rtl-text-right mt-5">
                  <h5 className="mb-1 text-white">OTP Verification</h5>
                  <p className="mb-4 text-white">
                    Please enter the OTP received on your Email Address
                  </p>
                </div>

                <div className="otp-verify-form mt-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-between mb-5 rtl-flex-d-row-r">
                      <input
                        className="single-otp-input form-control"
                        type="number"
                        maxlength="1"
                        name="otp1"
                        id="otp1"
                        {...register("otp1", { required: true })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("otp1"),
                            document.getElementById("otp2")
                          );
                        }}
                      />

                      <input
                        className="single-otp-input form-control"
                        type="number"
                        maxlength="1"
                        name="otp2"
                        id="otp2"
                        {...register("otp2", { required: true })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("otp2"),
                            document.getElementById("otp3")
                          );
                        }}
                      />

                      <input
                        className="single-otp-input form-control"
                        type="number"
                        maxlength="1"
                        name="otp3"
                        id="otp3"
                        {...register("otp3", { required: true })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("otp3"),
                            document.getElementById("otp4")
                          );
                        }}
                      />
                      <input
                        className="single-otp-input form-control"
                        type="number"
                        maxlength="1"
                        name="otp4"
                        id="otp4"
                        {...register("otp4", { required: true })}
                      />
                    </div>
                    <button className="comman_btn" type="submit">
                      Verify &amp; Proceed
                    </button>
                  </form>
                </div>

                <div className="login-meta-data">
                  <p className="mt-3 mb-0">
                    Don't received the OTP?
                    <span
                      className="otp-sec mx-1 text-white"
                      id="resendOTP"
                    ></span>
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

export default AppOtpVerification;
