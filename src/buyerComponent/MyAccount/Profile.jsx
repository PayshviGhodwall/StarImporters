import React, { useState, useEffect } from "react";
import "../../assets/css/main.css";
import axios from "axios";
const Profile = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [change, setChange] = useState(false);

  const editImage = `${process.env.REACT_APP_APIENDPOINTNEW}user/editProfile`;
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("loginToken");
  useEffect(() => {
   const getUser =async()=>{
    await axios.get(userApi).then((res)=>{
      console.log(res);
      setUsers(res?.data.results)
    })
   }
   getUser()

  }, [change]);
 


  console.log(files);
  const changeProfile = async (e, key) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);
    await axios.post(editImage, formData).then((res) => {
      if (res.data?.message === "Profile updated Successfully") {
        console.log("HIi");
        setChange(!change);
      }
    });
  };

  return (
    <div className="row  mt-5 mb-5">
      <div className="col-lg-12 bg-white p-4">
        <div className="myaccount_profile row">
          <div className="col-auto">
            <div className="account_profile">
              <div className="">
                <img className="profileImage"  src={users?.profileImage} />
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
