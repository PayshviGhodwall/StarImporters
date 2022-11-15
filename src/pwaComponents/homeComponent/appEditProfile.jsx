import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  editProfile,
  getUserProfile,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppEditProfile() {
  const [detail, setDetail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const { data } = await getUserProfile();
    if (!data.error) {
      setDetail(data.results);

      let defaultValues = {};
      defaultValues.firstName = data.results.firstName;
      defaultValues.lastName = data.results.lastName;
      defaultValues.phoneNumber = data.results.phoneNumber;
      defaultValues.email = data.results.email;
      defaultValues.addressLine = data.results.addressLine;

      reset({ ...defaultValues });
      if (data.results.profileImage) {
        setImageFile(data.results.profileImage);
      }
    }
  };

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    for (const item in data) {
      formData.append(item, data[item]);
    }

    if (selectedFile) {
      formData.append("profileImage", selectedFile, selectedFile.name);
    }

    const response = await editProfile(formData);
    if (!response.data.error) {
    }
  };

  const onFileSelection = (event) => {
    console.log(event);
    let file = event.target.files[0];
    if (file && file.size < 2880) {
      toast.error("Minimum File size should be 1MB.");
      return;
    } else if (file && file.size > 5242880) {
      toast.error("File size exceeded. Max size should be 5MB.");
      return;
    } else {
      // Update the state
      console.log(file);
      setImageFile(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea">
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/profile">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>
            <div class="page-heading">
              <h6 class="mb-0">Edit Profile</h6>
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
          <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="profile-wrapper-area py-3">
                <div className="card user-info-card">
                  <div className="card-body p-4 d-flex align-items-center">
                    <div className="user-profile me-3">
                      <img
                        src={
                          imageFile
                            ? imageFile
                            : "../assets/img/profile_img1.png"
                        }
                        alt=""
                      />
                      <div className="change-user-thumb">
                        <input
                          className="form-control-file"
                          type="file"
                          accept="image/*"
                          id="input-file"
                          onChange={(e) => onFileSelection(e)}
                        />
                        <button>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </div>
                    </div>
                    <div className="user-info">
                      <h5 className="mb-0">{detail.companyName}</h5>
                    </div>
                  </div>
                </div>

                <div className="card user-data-card">
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="title mb-2">
                        <i className="fa-solid fa-at"></i>
                        <span>First Name</span>
                      </div>
                      <input
                        className="form-control form-control2"
                        type="text"
                        name="firstName"
                        id="firstName"
                        {...register("firstName", { required: true })}
                      />

                      {errors?.firstName && (
                        <p className="form-error mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <i className="fa-solid fa-user"></i>
                        <span>Last Name</span>
                      </div>
                      <input
                        className="form-control form-control2"
                        type="text"
                        name="lastName"
                        id="lastName"
                        {...register("lastName", { required: true })}
                      />

                      {errors?.lastName && (
                        <p className="form-error mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <i className="fa-solid fa-phone"></i>
                        <span>Phone</span>
                      </div>
                      <input
                        className="form-control form-control2"
                        type="number"
                        id="phoneNumber"
                        name="phoneNumber"
                        {...register("phoneNumber", {
                          required: true,
                          maxLength: 10,
                          minLength: 10,
                        })}
                      />
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "required" && (
                          <p className="form-error mt-2">
                            This field is required
                          </p>
                        )}

                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "maxLength" && (
                          <p className="form-error mt-2">
                            Please enter 10 digit number
                          </p>
                        )}
                      {errors.phoneNumber &&
                        errors.phoneNumber.type === "minLength" && (
                          <p className="form-error mt-2">
                            Please enter 10 digit number
                          </p>
                        )}
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <i className="fa-solid fa-envelope"></i>
                        <span>Email Address</span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control2"
                        name="email"
                        id="email"
                        disabled
                        {...register("email", {
                          required: "This field is required",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    <div className="mb-3">
                      <div className="title mb-2">
                        <i className="fa-solid fa-location-arrow"></i>
                        <span>Shipping Address</span>
                      </div>
                      <input
                        className="form-control form-control2"
                        type="text"
                        placeholder=""
                        name="addressLine"
                        id="addressLine"
                        {...register("addressLine", { required: true })}
                      />

                      {errors?.addressLine && (
                        <p className="form-error mt-1">
                          This field is required
                        </p>
                      )}
                    </div>
                    <button className="comman_btn" type="submit">
                      Save All Changes
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AppEditProfile;
