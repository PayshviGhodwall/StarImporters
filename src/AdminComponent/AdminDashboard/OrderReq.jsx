import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/adminMain.css";

import Starlogo from "../../assets/img/logo.png";
const OrderReq = () => {

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div>
        <div className="siderbar_section">
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
                  className=""
                  to="/UserManage"
                  style={{ textDecoration: "none", fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif",
                }}
                >
                 <i class="fa fa-user"></i> User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{ textDecoration: "none",  fontSize: "18px",
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
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", 
                }}
                >
                <i class="far fa-building"></i>  Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                <i class="fa fa-ship"></i>  Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className="bg-white"
                  to="/OrderRequest"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  color: "#3e4093",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                 <i class="fa fa-layer-group"></i>  Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                 <i class="fa fa-cog"></i> CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{ textDecoration: "none",  fontSize: "18px",
                  fontFamily: "'Rubik', sans-serif", }}
                >
                  <i class="fa fa-sign-out-alt"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default OrderReq
