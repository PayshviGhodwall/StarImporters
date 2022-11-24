import React, { useState, useEffect } from "react";
import "../../assets/css/main.css";
import axios from "axios";
import { Uploader, Message, Loader, useToaster } from 'rsuite';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import Starlogo from "../../assets/img/logo.png";


function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

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
    formData.append("profileImage", fileInfo);
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
                <img className="profileImage"  src={users?.profileImage ? users?.profileImage : Starlogo } />
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
      {/* <Uploader
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={file => {
         setFiles(file)
         changeProfile()
        setUploading(true);
        previewFile(file.blobFile, value => {
          setFileInfo(value);
        });
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toaster.push(<Message type="success">Uploaded successfully</Message>);
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        toaster.push(<Message type="error">Upload failed</Message>);
      }}
    >
      <button style={{ width: 150, height: 150 }}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <AvatarIcon style={{ fontSize: 80 }} />
        )}
      </button>
    </Uploader> */}
    </div>
  );
};

export default Profile;
