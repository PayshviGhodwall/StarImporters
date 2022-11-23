import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppProfile() {
  const [detail, setDetail] = useState("");

  useEffect(() => {
    getUserDetail();
  }, []);

  const getUserDetail = async () => {
    const { data } = await getUserProfile();
    if (!data.error) {
      setDetail(data.results);
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
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
                          : "../assets/img/profile_img1.png"
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
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-at"></i>
                      <span>Username</span>
                    </div>
                    <div className="data-content">{detail.firstName}</div>
                  </div>
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-user"></i>
                      <span>Full Name</span>
                    </div>
                    <div className="data-content">
                      {detail.firstName + " " + detail.lastName}
                    </div>
                  </div>
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-phone"></i>
                      <span>Phone</span>
                    </div>
                    <div className="data-content">{detail.phoneNumber}</div>
                  </div>
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-envelope"></i>
                      <span>Email</span>
                    </div>
                    <div className="data-content">{detail.email} </div>
                  </div>
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-location-dot"></i>
                      <span>Shipping Address</span>
                    </div>
                    <div className="data-content">
                      {detail?.addressLine?.join(" ")}
                    </div>
                  </div>
                  <div className="single-profile-data d-flex align-items-center justify-content-between">
                    <div className="title d-flex align-items-center">
                      <i className="fa-solid fa-star"></i>
                      <span>My Orders</span>
                    </div>
                    <div className="data-content">
                      <Link
                        className="btn btn-success btn-sm"
                        to="/app/my-order"
                      >
                        View Status
                      </Link>
                    </div>
                  </div>

                  <div className="edit-profile-btn mt-3">
                    <Link className="comman_btn" to="/app/edit-profile">
                      <i className="fa-solid fa-pen me-2"></i>Edit Profile
                    </Link>
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

export default AppProfile;
