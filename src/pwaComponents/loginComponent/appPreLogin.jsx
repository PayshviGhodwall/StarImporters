import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userPreLogin } from "../httpServices/loginHttpService/loginHttpService";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AppPreLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token-user")) {
      navigate("/app/home");
    }
  }, []);
  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    console.log(data);
    const response = await userPreLogin(data);
   

    if (response.data.message === "Your ID in under review") {
      Swal.fire({
        title: "Your ID in under review",
        text: "Do you want to continue",
        icon: "error",
        button: "Ok",
      });
    }

    if (response?.data.message === "You are suspended by admin") {
      Swal.fire({
        title: "Your account has beed disabled. Please contact admin!",
        width: 600,
        icon: "error",
        button: "Ok",
      });
    }
    if (response?.data.message === "You need to provide details again") {
      Swal.fire({
        title:
          "Oops! Your registration request is declined. Please re-submit your application.",
        width: 600,
        text: "",
        icon: "error",
        button: "Go to Sign Up",
      });
      navigate("/app/re-register", { state: { email: data.email } });
    }
    if (response?.data.message === "Email is not registered") {
      toast.error("Email is not registered");
    }
    if (response?.data.message === "Please enter password") {
      navigate("/app/pre-login-password", { state: { email: data.email } });
      toast.success("Please enter password");
    }
  };
   const faceLogin = ()=>{
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("loginWithFaceID");

   }
   }
  return (
    <>
      <div className="star_imp_app">
        <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
          <div className="background-shape"></div>
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
                <div className="text-center rtl-text-right mt-4">
                  <h5 className="mb-1 text-white">Welcome to StarImporters</h5>
                </div>

                <div className="register-form mt-5">
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="email">
                    <div className="form-group text-start mb-4">
                      <span>Username</span>
                      <label for="username">
                        <i className="fa-solid fa-user"></i>
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="User@gmail.com"
                        name="email"
                        id="email"
                        autoComplete="nope"
                        {...register("email", { required: true })}
                      />

                      {errors?.email && (
                        <p className="form-error mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                    <button className="comman_btn" type="submit">
                      Log In
                    </button>
                  </form>
                </div>

                <div className="login-meta-data">
                  <p className="mb-0 mt-3">
                    Didn't have an account?
                    <Link className="mx-1" to="/app/register">
                      Register Now
                    </Link>
                  </p>
                </div>
                <div className="view-as-guest mt-2">
                  <Link className="btn" to="/app/homeGuest">
                    View as Guest
                  </Link>
                </div>
                <div className="view-as-guest mt-2">
                  <Link className="btn" to="/app/homeGuest" onClick={faceLogin} >
                    Login with face
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppPreLogin;
