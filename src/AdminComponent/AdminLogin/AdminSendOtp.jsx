import React from "react";
import "../../assets/css/adminMain.css";
import Starlogo from "../../assets/img/logo.png";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const AdminSendOtp = ({ AdminEmail }) => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/verifyOtp`;
  const sendOtp =`${process.env.REACT_APP_APIENDPOINTNEW}api/admin/forgetPassword`
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState();

  useEffect(() => {
    const AdminEmail = localStorage.getItem("AdminEmail");
    setEmail(AdminEmail);
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    const tempOtp = data.number1 + data.number2 + data.number3 + data.number4;
    const otp = parseInt(tempOtp);

    const VerifyUser = () => {
      axios
        .post(apiUrl, {
          email,
          otp,
        })
        .then((res) => {
          console.log(res);
          if (res?.data.message === "OTP Verified") {
            navigate("/AdminResetPassword");
          } else if (res?.data.message === "Invalid OTP") {
            setError("Invalid Otp");
          }
        });
    };
    VerifyUser();
  };
  const moveOnMax = (event, field, nextFieldID) => {
    event = event || window.event;
    if (event.keyCode != 9) {
      if (field.value.length >= field.maxLength) {
        nextFieldID.focus();
      }
    }
  };
  const ResendOtp = async (e) => {
    e.preventDefault();
    await axios
      .post(sendOtp, {
        email: email,
      })
      .then((res) => {
        console.log(res?.data.results);
      });
  };
  return (
    <div>
      <section className="login_page">
        <div className="container-fluid mx-0">
          <div className="row justify-content-start">
            <div className="col-4 p-0">
              <div className="login_page_form shadow">
                <div className="row">
                  <div className="col-12 formheader mb-4">
                    <div className="text-center mb-5">
                      <img
                        src={Starlogo}
                        width="170"
                        height="80"
                        alt="Brand"
                      ></img>
                    </div>
                    <h1 className="fw-bold fs-3 mx-3  LoginHead">
                      Verification
                    </h1>
                    <p className="fw-bold fs-6 mx-3">
                      Please enter the OTP received on your Email.
                    </p>
                  </div>
                  <div className="col-12">
                    <form
                      className="forms_modal_content otp_part"
                      onSubmit={handleSubmit(onSubmit)}
                      autocomplete="off"
                    >
                      <div className="form-group mb-3 d-flex justify-content-center">
                        <input
                          className="form-control shadow-none border border-secondary text-center mx-1 otp_input "
                          type="text"
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
                          type="text"
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
                          type="text"
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
                          type="text"
                          maxLength={1}
                          name="number4"
                          id="number4"
                          {...register("number4", {
                            required: "Required",
                          })}
                        />
                      </div>
                      <div className="fs-6 text-danger fw-bold">{error}</div>
                      <div className="form-group my-3">
                        <div className="time_js">
                          <span className=" d-flex justify-content-center fw-bold fs-5 text-danger">
                            01:34
                          </span>
                        </div>
                      </div>
                      <div className="form-group mb-4 d-flex justify-content-center">
                        <button className="comman_btn2  " type="submit">
                          Submit
                        </button>
                      </div>
                      <div className="form-group mb-0 comman_text d-flex justify-content-center">
                        <span>
                          Didn't receive the OTP?{" "}
                          <Link
                            href="javascript:;"
                            className="text-decoration-none fw-bold "
                            onClick={ResendOtp}
                          >
                            Request Again
                          </Link>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminSendOtp;
