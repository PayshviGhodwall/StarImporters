import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Swal from "sweetalert2";
import classNames from "classnames";
import Starlogo from "../../assets/img/logo.png";
import LoginPass from "./LoginPass";

const Login = ({getEmail}) => {
  const [apiData, setApiData] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const [emailerr ,setEmailErr] = useState()
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/preLogin`;
  const autoClose = () => {
    document.getElementById("close").click();
  };
  useEffect(() => {


  }, [state]);
  const handleRefresh = () => {
    setState(true);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    getEmail(data?.email)
    await axios
      .post(apiUrl, {
        email: data.email,
      })
      .then((res) => {
        if (res?.data.message === "Please enter password") {
          localStorage.setItem("userEmail",data.email)

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
          localStorage.setItem("userEmail",data.email)

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
          setEmailErr("Email is not registered!")
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
      <div className="modal-body">
        <button
          type="button"
          className="btn-close"
          id="close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={handleRefresh}
        />
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="forms_modal_content"></div>
            <div className="col-md-12">
              <div className="forms_modal_content">
                <div className="row">
                  <div className="col-md-12 heading_forms mb-4">
                    <div className="text-center mb-3">
                      <Link className="header_logo" to="app/home">
                        <img src={Starlogo} alt="" />
                      </Link>
                    </div>
                    <h3 className="fs-3 text-center">
                      Welcome to StarImporters.
                    </h3>
                    <span className=" fs-6 mx-1 mt-2 text-center ">
                      Login to your account !
                    </span>
                  </div>
                  <form
                    action=""
                    className="row form-design justify-content-center mx-1"
                    onSubmit={handleSubmit(onSubmit)}
                  >

                    <div className="form-floating mb-1 col-9 ">
                      <input
                        type="email"
                        className={classNames("form-control   px-3", {
                          "is-invalid": errors.email,
                        })}
                        id="floatingEmail"
                        placeholder="Password"
                        name="email"
                        {...register("email", {
                          required: "Please Enter Your Email",
                        })}
                      />
                     
                      <label htmlFor="floatingEmail" className="fs-6 fw-bolder">
                        Email Address
                      </label>
                      <p className="" style={{color:"#eb3237"}}> {emailerr} </p>

                    </div>
                    {/* <div className="form-floating mb-4">
                      <input
                        type="password"
                        className={classNames(
                          "form-control  border border-secondary px-3",
                          { "is-invalid": errors.password }
                        )}
                        id="Password-Input"
                        
                        placeholder="Password"
                        name="password"
                        {...register("password", {
                          required: "Enter Your Password",
                        })}
                      />
                      {errors.password && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.password?.message}
                        </small>
                      )}
                      <label
                        htmlFor="floatingPassword"
                        className="fs-6 fw-bolder"
                      >
                        Password
                      </label>
                      <span
                        onClick={togglePassword}
                        className="fa fa-fw fa-eye field-icon toggle-password"
                      />
                    </div> */}
                    
                    <div className="form-group mb-3 text-center">
                      <button type="submit" className="comman_btn py-2 rounded" >
                        Sign In
                      </button>
                    </div>
                    <div className="form-group comman_text text-center">
                      <span>
                        Don't have an account?{" "}
                        <Link
                          onClick={()=>navigate("/app/register")}
                          data-bs-dismiss="modal"
                          className="text-decoration-none text-primary "
                        >
                          SIGN UP
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
      <button
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop72"
        id="pass-Modal"
        className="d-none"
      >
        pass
      </button>
    </div>
  );
};

export default Login;
