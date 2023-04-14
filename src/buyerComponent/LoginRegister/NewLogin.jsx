import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Swal from "sweetalert2";
import classNames from "classnames";
import Starlogo from "../../assets/img/logo.png";
import Navbar from "../Homepage/Navbar";

const UserLogin = ({ getEmail }) => {
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [emailerr, setEmailErr] = useState();
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/preLogin`;
  const autoClose = () => {
    document.getElementById("close").click();
  };
  useEffect(() => {}, [state]);
  const handleRefresh = () => {
    window.location.reload(false);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    getEmail(data?.email);
    await axios
      .post(apiUrl, {
        email: data.email,
      })
      .then((res) => {
        if (res?.data.message === "Please enter password") {
          localStorage.setItem("userEmail", data.email);

          document.getElementById("pass-Modal").click();
        }
        if (res?.data.message === "Your ID in under review") {
          Swal.fire({
            title: "Your ID in under review",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
        if (res?.data.message === "You are suspended by admin") {
          Swal.fire({
            title: "Your Account has beed disabled. Please Contact Admin!",
            width: 600,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        if (res?.data.message === "You need to provide details again") {
          localStorage.setItem("userEmail", data.email);

          Swal.fire({
            title:
              "Oops! Your Registration  request is Declined.Please Re-submit your application.",
            width: 600,
            text: "Click Below to know reason.",
            icon: "error",
            confirmButtonText: "Go to Sign Up",
          }).then((res) => {
            autoClose();
            navigate("/Register/ReSubmit");
          });
        }
        if (res?.data.message === "Email is not registered") {
          setEmailErr("Email is not registered!");
        }
      });
  };
  const togglePassword = () => {
    let x = document.getElementById("Password-Input");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div>
      <div class="login-new-design comman_padding">
        <div class="container">
          <div class="row comman_divvision justify-content-center text-center">
            <div class="col-12 login-new-img mb-lg-5 mb-md-4">
              <img src="assets/img/logo.png" alt="" />
            </div>
            <div class="col-12 login-new-heading mb-4">
              <h2>Welcome to starimporters.</h2>
              <span>Login to your account !</span>
            </div>
            <div class="col-lg-6 col-md-8">
              <form class="row login-new-form" action="">
                <div class="form-group mb-4 col-12">
                  <input
                    class="form-control"
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>
                <div class="form-group mb-4 pt-3 col-12">
                  <button class="new---btn">Sign In</button>
                </div>
                <div class="form-group mb-4 col-12">
                  <div class="forrm-btm">
                    Don’t have an account? <a href="javascript:;">Sign up</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
