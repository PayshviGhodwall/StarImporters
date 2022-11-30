import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileBar = () => {
  const getAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getAdminData`;
  const [adminData, setAdminData] = useState([]);

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  useEffect(() => {
    let token =  localStorage.getItem("AdminLogToken");
    if(!token ){
      Swal.fire({
        title: "Un-Authenticated Request",
        text: "Please Login!",
        icon: "error",
        confirmButtonText: "okay",
      });
    }  
    const GetAdminData = async () => {
      await axios.get(getAdmin).then((res) => {
        setAdminData(res?.data.results.admin);
      });
    };
    GetAdminData();
  }, []);

  return (
    <div className="d-flex">
        <div className="d-flex flex-column mt-2">
          <Link
            className="text-decoration-none text-white"
            to="/AdminDashboard/EditProfile"
          >
            Edit Profile
          </Link>
          <Link
            className="text-decoration-none text-white"
            to="/AdminDashboard/changePassword"
          >
            Change Password
          </Link>
        </div>
        <div className="dropdown mx-2">
          <div>
            <button
              className="btn btn-secondary p-0 mt-2"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                className="bg-white "
                src={adminData?.adminProfile}
                alt=""
                width={50}
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="edit-profile.html">
                  Edit Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="change-password.html">
                  Change Password
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default ProfileBar;
