import React, { useState, useEffect } from "react";
import "../../assets/css/main.css";
import axios from "axios";
import { Uploader, Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Starlogo from "../../assets/img/logo.png";
import Swal from "sweetalert2";

const Profile = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [change, setChange] = useState(false);

  const editImage = `${process.env.REACT_APP_APIENDPOINTNEW}user/editProfile`;
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  console.log(fileInfo);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("loginToken");
  useEffect(() => {
    getUser();
  }, [change]);
  const getUser = async () => {
    await axios.get(userApi).then((res) => {
      console.log(res);
      setUsers(res?.data.results);
    });
  };
  document
    .getElementById("profileImg")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("profile")
            .setAttribute("src", event.target.result);
        });
      }
    });

  console.log(files);
  const changeProfile = async (e, key) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    await axios.post(editImage, formData).then((res) => {
      if (res.data?.message === "Profile updated Successfully") {
        console.log("HIi");
        setChange(!change);
      }
      if (res?.data.message === "Invalid Image format") {
        Swal.fire({
          title: "Invalid Image format!",
          text: "Only Images are allowed",
          icon: "warning",
          confirmButtonText: "ok",
        });
        window.location.reload(false);
      }
    });
  };

  return (
    <div className="row  mt-5 mb-5 shadow ">
      <div className="col-lg-12 profile_bg  p-4">
        <div class="content ">
          <div class="carding">
            <div class="firstinfo">
              <form className="nn-form">
                <label for="fileToUpload">
                  <div
                    class="profile-pic-nn border "
                    id="profile"
                    src={users?.profileImage ? users?.profileImage : Starlogo}
                    style={{
                      backgroundImage: `url(${
                        users?.profileImage ? users?.profileImage : Starlogo
                      })`,
                      backgroundSize: "98%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Edit</span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <span class="icon-photo glyphicon glyphicon-camera"></span>
                  </div>
                </label>
                <input
                  type="File"
                  className="nn-Input"
                  name="fileToUpload"
                  id="fileToUpload"
                  onChange={(e) => changeProfile(e, "fileToUpload")}
                />
              </form>
              <div class="profileinfo">
                <h1>
                  {users?.companyName
                    ? users?.companyName
                    : "Login to continue!"}
                </h1>
                <h3>{users?.firstName + " " + users?.lastName}</h3>
              </div>
            </div>
          </div>
          <div class="badgescard">
            {" "}
            <span class="devicons devicons-django"></span>
            <span class="devicons devicons-python"> </span>
            <span class="devicons devicons-codepen"></span>
            <span class="devicons devicons-javascript_badge"></span>
            <span class="devicons devicons-gulp"></span>
            <span class="devicons devicons-angular"></span>
            <span class="devicons devicons-sass"> </span>
          </div>
        </div>
        {/* <div className="myaccount_profile row">
          <div className="col-auto">
            <div className="account_profile">
              <div className="">
                <img
                  className="profileImage"
                  id="profile"
                  src={users?.profileImage ? users?.profileImage : Starlogo}
                />
              </div>
              <div className="">
                <img
                  className="p-camera"
                  src={require("../../assets/img/Camera_icon.png")}
                  alt=""
                />
              </div>
              <input
                className="file-uploadsNew"
                name="ImageProfile"
                id="profileImg"
                type="file"
                onChange={(e) => changeProfile(e, "ImageProfile")}
              />
            </div>
          </div>
          <div className="col">
            <div className="account_detailss mt-3">
              <h2>{users?.firstName}</h2>
              <span>{users?.city}</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
