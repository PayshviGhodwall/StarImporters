import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/adminMain.css";
import Starlogo from "../../assets/img/logo.png";
import profile from "../../assets/img/profile_img1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import ProfileBar from "./ProfileBar";

const EditProfile = () => {
  const editProfile = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/editProfile`;
  const getAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getAdminData`;
  const [files, setFiles] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [chnge, setChnge] = useState();
  const [sideBar, setSideBar] = useState(true);

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    const GetAdminData =async ()=>{
    await axios.get(getAdmin).then((res) => {
      setAdminData(res?.data.results.admin);
    });
  }
  GetAdminData()
  }, [chnge]);

  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("adminProfile", files?.adminProfile);
    formData.append("fullName", data?.name);
      
    await axios.post(editProfile, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Profile updated Successfully") {
        window.location.reload()
      }
    });
  };

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div className={sideBar ? "admin_main" : "expanded_main"}>
      <div className={sideBar ? "siderbar_section" : "d-none"}>
        <div className="siderbar_inner">
          <div className="sidebar_logo">
            <Link to="" className="">
              <img src={Starlogo} alt="Logo" />{" "}
            </Link>
          </div>
          <div className="sidebar_menus">
          <ul className="list-unstyled ps-1 m-0">
              <li>
                <Link
                  className=" "
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i className="fa fa-home"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="fw-bold bg-white"
                  to="/UserManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                    color: "#3e4093",
                  }}
                >
                  <i class="fa fa-user"></i> User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Inventory"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="far fa-building"></i> Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-ship"></i> Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-cog"></i> CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-sign-out-alt"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="admin_main_inner">
        <div className="admin_header shadow">
          <div className="row align-items-center mx-0 justify-content-between w-100">
          <div className="col">
              {sideBar ? (
                <div>
                  <h1
                    className="mt-2 text-white"
                    onClick={() => {
                      console.log("yello");
                      setSideBar(!sideBar);
                    }}
                  >
                    <i className="fa fa-bars"></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar);
                      }}
                    >
                      X
                    </button>
                  </h3>
                </div>
              )}
            </div>
            <div className="col-auto d-flex ml-5">
              <ProfileBar />
            </div>
          </div>
        </div>
        <div className="admin_panel_data height_adjust">
          <div className="row">
            <div className="col-12 editprofile design_outter_comman shadow">
              <div className="row comman_header justify-content-between">
                <div className="col-auto">
                  <h2>Edit Profile</h2>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form
                    className="row form-design justify-content-center position-relative mx-0 p-4"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group col-auto">
                      <div className="account_profile position-relative">
                        <div className="admin_profile">
                          <img
                            className="admin_img"
                            src={adminData?.adminProfile}
                          />
                        </div>
                        <div className="p-image ">
                          <i className="upload-icon fas fa-camera  fs-3" />
                          <input
                            className="Admin-upload "
                            name="adminProfile"
                            type="file"
                            accept="image/*"
                            {...register("adminProfile")}
                            onChange={(e) => onFileSelection(e, "adminProfile")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-12 mt-5">
                      <label htmlFor="">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={adminData.fullName}
                        name="name"
                        id="name"
                        {...register("name")}
                      />
                    </div>
                    <div className="form-group col-12 text-center">
                      <button
                        className="comman_btn"
                        href="javscript:;"
                        type="submit"
                      >
                        Save
                      </button>
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

export default EditProfile;
