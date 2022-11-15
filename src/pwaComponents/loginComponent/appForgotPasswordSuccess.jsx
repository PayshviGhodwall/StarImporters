import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePassword } from "../httpServices/loginHttpService/loginHttpService";

function AppForgotPasswordSuccess() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmpassword) {
      toast.error("Password & Confirm Password should be same");
      return;
    }
    console.log(data);

    const formData = {
      email: location.state.email,
      password: data.password,
    };

    const response = await updatePassword(formData);

    if (!response.data.error) {
      navigate("/app/login");
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
                  <h5 className="mb-1 text-white">Reset Your Password</h5>
                  <p className="mb-4 text-white"></p>
                </div>

                <div className="register-form mt-5">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group text-start mb-4">
                      <span>New Password</span>
                      <label for="">
                        <i className="fa-solid fa-user"></i>
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="**********"
                        name="password"
                        id="password"
                        {...register("password", {
                          required: "This field is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                          },
                        })}
                      />
                      {errors?.password && (
                        <p className="form-error mt-1">
                          {errors?.password?.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group text-start mb-4">
                      <span>New Password</span>
                      <label for="">
                        <i className="fa-solid fa-user"></i>
                      </label>

                      <input
                        type="password"
                        className="form-control"
                        placeholder="**********"
                        name="confirmpassword"
                        id="confirmpassword"
                        {...register("confirmpassword", {
                          required: "This field is required",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                          },
                        })}
                      />

                      {errors?.confirmpassword && (
                        <p className="form-error mt-1">
                          {errors?.confirmpassword?.message}
                        </p>
                      )}
                    </div>
                    <button className="comman_btn" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppForgotPasswordSuccess;
