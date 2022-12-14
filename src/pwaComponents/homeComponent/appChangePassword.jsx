import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  changePassword,
  getUserProfile,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppChangePassword() {
  const [detail, setDetail] = useState("");
  let ref = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    if (data.newPassword === data.confirmPassword) {
      const response = await changePassword(data);
      if (!response.data.error) {
        navigate("/app/home");
        Swal.fire({
          title: "Password Updated Sucessfully!",
          icon: "success",
          button: "ok",
        });
      }
    } else {
      toast.error("New password should be equal to Confirm password");
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const { data } = await getUserProfile();
    if (!data.error) {
      setDetail(data.results);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      document.getElementById("closeModal").click();
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea" ref={ref}>
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/settings">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div class="page-heading">
              <h6 class="mb-0">Change Password</h6>
            </div>
            <div
              class="suha-navbar-toggler ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaOffcanvas"
              aria-controls="suhaOffcanvas"
            >
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <WebHeader2 />

        <div className="page-content-wrapper">
          <div className="page-content-wrapper">
            <div className="container">
              <div className="profile-wrapper-area py-3">
                <div className="card user-info-card">
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="user-profile me-3">
                      <img
                        src={
                          detail?.profileImage
                            ? detail?.profileImage
                            : "/assets/img/profile_img1.png"
                        }
                        alt=""
                      />
                    </div>
                    <div className="user-info">
                      <h5 className="mb-0">{detail.companyName}</h5>
                    </div>
                  </div>
                </div>
                <div className="card user-data-card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <div className="title mb-2">
                          <i className="fa-solid fa-key"></i>
                          <span>Old Password</span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control2"
                          name="oldPassword"
                          id="oldPassword"
                          {...register("oldPassword", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                            },
                          })}
                        />
                        {errors?.oldPassword && (
                          <p className="form-error mt-1">
                            {errors?.oldPassword?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="title mb-2">
                          <i className="fa-solid fa-key"></i>
                          <span>
                            New Password{" "}
                            <span className="text-secondary">
                              (example:StarLovers123@)
                            </span>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control2"
                          name="newPassword"
                          id="newPassword"
                          {...register("newPassword", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                              message:
                                "Password must be 6 characters including one uppercase letter, one special character and alphanumeric characters",
                            },
                          })}
                        />
                        {errors?.newPassword && (
                          <p className="form-error mt-1">
                            {errors?.newPassword?.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3">
                        <div className="title mb-2">
                          <i className="fa-solid fa-key"></i>
                          <span>Repeat New Password </span>
                        </div>
                        <input
                          type="password"
                          className="form-control form-control2"
                          name="confirmPassword"
                          id="confirmPassword"
                          {...register("confirmPassword", {
                            required: "This field is required",
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                              message:
                                "Password must be 6 characters including one uppercase letter, one special character and alphanumeric characters",
                            },
                          })}
                        />
                        {errors?.confirmPassword && (
                          <p className="form-error mt-1">
                            {errors?.confirmPassword?.message}
                          </p>
                        )}
                      </div>
                      <button className="comman_btn" type="submit">
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AppChangePassword;
