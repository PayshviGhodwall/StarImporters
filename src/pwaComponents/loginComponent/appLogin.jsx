import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogin } from "../httpServices/loginHttpService/loginHttpService";
function AppLogin() {
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

  const onSubmit = async (data) => {
    console.log(data);
    const response = await userLogin(data);

    if (!response.data.error) {
      navigate("/app/home");
      if (window.flutter_inappwebview)
        window.flutter_inappwebview.callHandler("Flutter", data.email);
    }
  };

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
                    <div className="form-group text-start mb-4">
                      <span>Password</span>
                      <label for="password">
                        <i className="fa-solid fa-key"></i>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="**********"
                        name="password"
                        id="password"
                        {...register("password", { required: true })}
                      />

                      {errors?.password && (
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
                  <Link
                    className="forgot-password d-block mt-3 mb-1"
                    to="/app/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                  <p className="mb-0">
                    Didn't have an account?
                    <Link className="mx-1" to="/app/register">
                      Register Now
                    </Link>
                  </p>
                </div>

                <div className="view-as-guest mt-3">
                  <Link className="btn" to="/app/homeGuest">
                    View as Guest
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

export default AppLogin;
