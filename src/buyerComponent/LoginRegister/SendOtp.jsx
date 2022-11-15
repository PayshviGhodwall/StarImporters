import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import classNames from "classnames";


const SendOtp = (otpEmail) => {
  const apiUrl =  `${process.env.REACT_APP_APIENDPOINTNEW}user/verifyOtp`
  const sendOtp = `${process.env.REACT_APP_APIENDPOINTNEW}user/forgotPassword`
  const[error,setError]=useState("")
  let email = otpEmail?.otpEmail;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  console.log(otpEmail, "Ptop");

  const onSubmit = async (data) => {
    const tempOtp = data.number1 + data.number2 + data.number3 + data.number4;
    const otp = parseInt(tempOtp);
   console.log(tempOtp);
    const VerifyUser = () => {
     axios.post(apiUrl,{
        email,
        otp
      })
      .then((res) => {
        console.log(res);
        if (res?.data.message === "OTP Verified") {
          Swal.fire({
            title: "OTP Verified", 
            text: "",
            icon: "Success",
            confirmButtonText: "OK",
          });
          document.getElementById("modal-toggle").click();

        }
        else if (res?.data.message === "Invalid OTP") {
         setError("Invalid Otp")
        }
      });
    };
    VerifyUser();
  };

  const ResendOtp =async (e)=>{
     e.preventDefault()
     await  axios
     .post(sendOtp, {
       email: email,
     }).then((res)=>{
      console.log(res?.data.results);
     })
  }
  const  moveOnMax =(event, field, nextFieldID)=> {
    event = event || window.event;
    if (event.keyCode != 9) {
        if (field.value.length >= field.maxLength) {
            nextFieldID.focus();
        }
    }
}
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
                type="text"
                maxLength={1}
                name="number1"
                id="number1"
                {...register("number1", {
                  required: "Required",
                })}
                onKeyUp={(event)=>{moveOnMax(event,document.getElementById("number1"),document.getElementById("number2"))}}
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
                onKeyUp={(event)=>{moveOnMax(event,document.getElementById("number2"),document.getElementById("number3"))}}

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
                onKeyUp={(event)=>{moveOnMax(event,document.getElementById("number3"),document.getElementById("number4"))}}

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
                <span className="fw-bold fs-5 text-info">01:34</span>
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
                <a
                  href="javascript:;"
                  className="text-decoration-none text-info"
                  onClick={ResendOtp}
                >
                  Resend OTP
                </a>
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
