import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import classNames from "classnames";
import { useTimer } from "react-timer-hook";
import { count } from "rsuite/esm/utils/ReactChildren";

const SendOtp = (otpEmail) => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/verifyOtp`;
  const sendOtp = `${process.env.REACT_APP_APIENDPOINTNEW}user/forgotPassword`;
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);
  let email = otpEmail?.otpEmail;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, email]);

  const onSubmit = async (data) => {
    const tempOtp = data.number1 + data.number2 + data.number3 + data.number4;
    const otp = parseInt(tempOtp);
    console.log(tempOtp);
    const VerifyUser = () => {
      axios
        .post(apiUrl, {
          email,
          otp,
        })
        .then((res) => {
          console.log(res);
          if (res?.data.message === "OTP Verified") {
            Swal.fire({
              title: "OTP Verified Successfully.",
              text: "",
              icon: "success",
              confirmButtonText: "OK",
            });
            document.getElementById("modal-toggle").click();
          } else if (res?.data.message === "Invalid OTP") {
            setError("Invalid Otp");
          }
        });
    };
    VerifyUser();
  };

  const ResendOtp = async (e) => {
    setCounter(60);
    e.preventDefault();
    await axios
      .post(sendOtp, {
        email: email,
      })
      .then((res) => {
        console.log(res?.data.results);
        if (!res.error) {
          Swal.fire({
            title: "OTP Resent Successfully.",
            text: "Please check your registered Email.",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });
  };
  const moveOnMax = (event, field, nextFieldID) => {
    event = event || window.event;
    if (event.keyCode != 9) {
      if (field.value.length >= field.maxLength) {
        nextFieldID.focus();
      }
    }
  };
  return (
    <div>
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-8">
          <div className="comman_modal_heading">
            <h2 className="fs-2 fw-bold">OTP Verification</h2>
            <p>
              Please enter the OTP received on <br /> your Email Address
            </p>
          </div>
          <form
            className="forms_modal_content otp_part"
            onSubmit={handleSubmit(onSubmit)}
            autocomplete="off"
          >
            <div className="form-group mb-3 d-flex justify-content-center">
              <input
                className="form-control shadow-none border border-secondary text-center mx-1 otp_input "
                type="number"
                maxLength={1}
                name="number1"
                id="number1"
                {...register("number1", {
                  required: "Required",
                })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("number1"),
                    document.getElementById("number2")
                  );
                }}
              />
              <input
                className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                type="number"
                maxLength={1}
                name="number2"
                id="number2"
                {...register("number2", {
                  required: "Required",
                })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("number2"),
                    document.getElementById("number3")
                  );
                }}
              />
              <input
                className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                type="number"
                maxLength={1}
                name="number3"
                id="number3"
                {...register("number3", {
                  required: "Required",
                })}
                onKeyUp={(event) => {
                  moveOnMax(
                    event,
                    document.getElementById("number3"),
                    document.getElementById("number4")
                  );
                }}
              />
              <input
                className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                type="number"
                maxLength={1}
                name="number4"
                id="number4"
                {...register("number4", {
                  required: "Required",
                })}
              />
            </div>
            <div className="mx-3 mb-3">
              {errors.number1 && (
                <small className="errorText mx-5 fw-bold fs-6 text-center">
                  {errors.number1?.message}
                </small>
              )}
            </div>
            <div className="fs-6 text-danger fw-bold">{error}</div>
            <div className="form-group my-3">
              <div className="time_js">
                <span className="fw-bold fs-5" style={{ color: "#3b4093" }}>
                  {
                    counter ?
                 <p>00:{counter}</p>  : null
                     
                  }
                </span>
              </div>
            </div>
            <div className="form-group mb-4">
              <button className="comman_btn" type="submit">
                Submit
              </button>
            </div>
            <div className="form-group mb-0 comman_text">
              <span>
                Didn't receive the OTP?{" "}
                {counter ? (
                  <a
                    className="text-decoration-none "
                    style={{ color: "#3b4093" }}
                  >
                    Check Email
                  </a>
                ) : (
                  <a
                    className="text-decoration-none"
                    style={{ color: "#3b4093", cursor: "pointer" }}
                    onClick={ResendOtp}
                  >
                    Resend OTP
                  </a>
                )}
              </span>
            </div>
          </form>
          <a
            data-bs-toggle="modal"
            id="modal-toggle"
            data-bs-target="#staticBackdrop4"
            href="javscript:;"
            className="comman_btn text-decoration-none d-none"
          >
            Ssdfd
          </a>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
