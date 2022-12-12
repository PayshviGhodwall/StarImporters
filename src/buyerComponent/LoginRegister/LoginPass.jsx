import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import Swal from "sweetalert2";
import classNames from "classnames";
import Starlogo from "../../assets/img/logo.png";
import { Button } from "rsuite";
// Default CSS
import "rsuite/dist/rsuite.min.css";
const LoginPass = ({otpEmail}) => {
  const[state,setState]=useState(false)
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/login`;
  const autoClose = () => {
    document.getElementById("close").click();
  };
  let email = localStorage.getItem("userEmail")
  
 const handleRefresh = () => {
    setState(!state);
    setLoader(false)
    document.getElementById("Password-Input").value=""
    console.log("kjklkjkl");
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data) => {
    setLoader(true)
    await axios
      .post(apiUrl, {
        email: otpEmail,
        password: data.password,
      })
      .then((res) => {
        if (res?.data.message === "Logged In") {
            setLoader(false)
          localStorage.setItem("token-user", res?.data?.results.token);
          localStorage.setItem(
            "UserData",
            JSON.stringify(res?.data?.results?.verifyUser)
          );

          Swal.fire({
            title: "You have been successfully Logged In .",
            text: "",
            icon: "success",
            showCloseButton: true,
            focusConfirm: false,
          });

          setTimeout(() => {
            window.location.reload();
          }, [1000]);
          autoClose();
        }
        if (res?.data.message === "Your ID in under review") {
            setLoader(false)
          Swal.fire({
            title: "Your ID in under review",
            text: "Do you want to continue",
            icon: "error",
            confirmButtonText: "Cool",
          });
        }
        if (res?.data.message === "You are suspended by admin") {
            setLoader(false)
            
          Swal.fire({
            title: "Your Account has beed disabled. Please Contact Admin!",
            width: 600,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
        if (res?.data.message === "Wrong Password") {
            setLoader(false)
          Swal.fire({
            title: "Wrong or Invalid Password!",
            width: 600,
            text: "Try again or click ‘Forgot password’ to reset it.",
            icon: "error",
            confirmButtonText: "Try again",
          });
        }
        if (res?.data.message === "First Time Login") {
          setLoader(false)
         
          document.getElementById("modal-toggle").click();
           
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
          onClick={()=>handleRefresh()}
        />
        <div className="row align-items-center">
          <div className="col-md-12">
            <div className="forms_modal_content"></div>
            <div className="col-md-12">
              <div className="forms_modal_content">
                <div className="row">
                  <div className="col-md-12 heading_forms mb-4">
                    <div className="text-center mb-3">
                      <Link className="header_logo" to="/app/home">
                        <img src={Starlogo} alt="" />
                      </Link>
                    </div>
                    <h3 className="fs-3 text-center">
                    Welcome to StarImporters.
                    </h3>
                    <span className=" fs-6 mx-1 mt-2 text-center ">
                      Please Enter Your Password!
                    </span>
                  </div>
                  <form
                    action=""
                    key={state}
                    className="row form-design justify-content-center mx-1"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                   
                    <div className="form-floating  mb-1 col-9">
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
                    </div>
                    <div className="form-group forgot_password mb-md-3 col-9">
                      <a
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop2"
                        href="javascript:;"
                        className="text-decoration-none text-primary"
                        style={{fontSize:"14px"}}
                      >
                        Forgot Your Password ?
                      </a>
                    </div>
                    <div className="form-group mb-3 text-center">
                      <Button loading={loader} style={{backgroundColor:"#eb3237"}} appearance="primary" type="submit" className="comman_btn py-2 rounded">
                        Sign In
                      </Button>
                    </div>
                    <div className="form-group comman_text text-center">
                      <span>
                        Don't have an account?{" "}
                        <Link
                          to="/Register"
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
    </div>
  );
};

export default LoginPass;
