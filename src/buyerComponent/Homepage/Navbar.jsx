import React, { useState, useEffect, useRef } from "react";
import Starlogo from "../../assets/img/logo.png";
import "../../assets/css/main.css";
import { IoSearchCircle } from "react-icons/io5";
import { AiOutlineBell } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { TbMinusVertical } from "react-icons/tb";
import Login from "../LoginRegister/Login";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../LoginRegister/ForgotPassword";
import SendOtp from "../LoginRegister/SendOtp";
import UpdatePassword from "../LoginRegister/UpdatePassword";
import axios from "axios";
import LoginPass from "../LoginRegister/LoginPass";

const Navbar = ({ NState, GetChange }) => {
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCatAndSubCat`;
  const cart = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/countProducts`;
  const searchApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeSearch`;
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const allNotify = `${process.env.REACT_APP_APIENDPOINTNEW}user/notify/getAllNotifications `;
  const deleteNotify = `${process.env.REACT_APP_APIENDPOINTNEW}user/notify/removeOne`;
  const [SearchData, setSearchData] = useState([]);
  const [category, setCategory] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [otpEmail, setOtpEmail] = useState();
  const [UserAuth, setUserAuth] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartNum, setCartNum] = useState(0);
  const [notifications, setNotifications] = useState();
  const [searchItem, setSearchItem] = useState();

  useEffect(() => {
    AllProducts();
    CartCount();
    getNotifications();
    getCategory();
    handleScroll();
  }, [state, NState]);
 let searchItemRef = useRef(null)
 searchItemRef.current = searchItem
  useEffect(() => {
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, []);
  const handleKeyPress = (e) => {
    if (e.key ==="Enter" && searchItemRef?.current?.length > 0) {
      console.log(searchItemRef?.current,"enter");
      navigate("/ProductSearch",{
      state: { search:searchItemRef?.current }
      });
      setSearchItem("")
    }
  };
  const handleOnSearch = async (string, results) => {
    setSearchItem(string);
    // if (string) {
    //   navigate("/ProductSearch",{
    //     state: { search:string }
    //   });
    // }
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
    navigate("/AllProducts/Product", {
      state: { id: item?._id, CateName: item.categoryName },
    });
  };

  const handleOnFocus = (e, string) => {
    // e.preventDefault()
    // navigate("/ProductSearch", {
    //   state: { search: string },
    // });
  };
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");

  const handleRefresh = () => {
    window.location.reload(false);
  };

  const getEmail = (data) => {
    setOtpEmail(data);
  };
  const getCategory = async () => {
    await axios.get(categoryApi).then((res) => {
      console.log(res);
      setCategory(res?.data.results);
    });
  };
  const AllProducts = async () => {
    await axios.post(allProd).then((res) => {
      console.log(res);
      setSearchData(res?.data.results);
    });
  };

  const getNotifications = async () => {
    await axios.get(allNotify).then((res) => {
      setNotifications(res?.data.results?.notifications);
    });
  };
  useEffect(() => {
    // if (window.localStorage !== undefined) {
    const authToken = localStorage.getItem("token-user");
    setUserAuth(authToken);
    // }
  }, [UserAuth]);

  const CartCount = async () => {
    await axios.get(cart).then((res) => {
      console.log(res);

      setCartNum(res?.data.results);
    });
  };

  const removeNotify = async (id) => {
    await axios.post(deleteNotify + "/" + id).then((res) => {
      if (!res.error) {
        getNotifications();
      }
    });
  };

  const LogOut = () => {
    setUserAuth(localStorage.removeItem("token-user"));
    setUserAuth(localStorage.removeItem("UserData"));
    navigate("/app/home");
    window.location.reload();
  };
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 40) {
      setScrolled(!scrolled);
    } else {
      setScrolled(false);
    }
  };
  console.log(notifications);
  return (
    <div className="header_main ">
      <header className="">
        <div className="row header_top py-3 px-4 align-items-center justify-content-between">
          <div className="col-auto">
            <Link className="header_logo mx-2" to="/app/home">
              <img src={Starlogo} alt="" />
            </Link>
          </div>
          <div className="col-lg-6 col-md-5 align-items-center">
            <ReactSearchAutocomplete
              items={SearchData}
              styling={{
                zIndex: "9",
                borderRadius: "10px",

                border: "2px solid #3e4093",
              }}
              fuseOptions={{ keys: ["unitName", "pBarcode", "type.barcode"] }} // Search on both fields
              resultStringKeyName="unitName"
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              maxResults={15}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              placeholder="Search "
            />
          </div>
          <div className="col-auto d-flex align-items-center">
            <div className="social_icon d-flex">
              <Link to="/app/Cart">
                <i className="fa fa-cart-arrow-down" />

                <span className="count">{cartNum}</span>
              </Link>
              <Link class="dropdown-center">
                <Link
                  class=""
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="far fa-bell" />
                  {notifications?.length ? (
                    <span className="count">{notifications?.length}</span>
                  ) : null}
                </Link>

                <ul class="dropdown-menu notification">
                  {notifications?.length ? (
                    <div class="notification-heading">
                      <h4 class="menu-title fs-4 ">
                        <i className="far fa-bell mx-2" />
                        Notifications
                      </h4>
                    </div>
                  ) : (
                    <div class="notification-heading">
                      <h4 class="fs-6">No new notifications found.</h4>
                    </div>
                  )}

                  {notifications?.map((item, index) => (
                    <li key={index} className="notification-Item">
                      <div class="dropdown-item " href="#">
                        <h6 className="item-title ">
                          {item?.title} : {item?.createdAt?.slice(0, 10)}
                          <span class="remove-Notity">
                            <i
                              class="fa fa-close"
                              onClick={() => removeNotify(item?._id)}
                            ></i>
                          </span>
                        </h6>
                        <small className="s">{item?.body}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </Link>
            </div>
            {UserAuth ? (
              <div className="d-flex mt-2 ">
                <div class="dropdown">
                  <Link to="/MyAccount" className="text-decoration-none mx-1">
                    <button className="signup_btns m-2  ">My Account</button>
                  </Link>
                  <div class="dropdown-content">
                    <Link
                      to=""
                      className="login_btns mt-3 text-decoration-none"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop1"
                      aria-current="page"
                      href="#"
                      onClick={() => {
                        LogOut();
                      }}
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex mt-2 mx-3">
                <Link
                  to=""
                  className="login_btns mt-2 text-decoration-none"
                  data-bs-toggle="modal"
                  id="modal-login"
                  data-bs-target="#staticBackdrop1"
                  aria-current="page"
                  href="#"
                >
                  Login
                </Link>
                <Link to="/app/register" style={{ textDecoration: "none" }}>
                  <div className="btn-group ">
                    <button className="signup_btns">SignUp</button>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="row header_bottom px-0">
          <div className="col-12">
            <ul className="header_menus mb-0 ps-0">
              <li>
                <Link className="text-decoration-none" to="/app/home">
                  Home
                </Link>
              </li>
              {(category || [])
                ?.filter((item, idx) => idx < 9)
                .map((item, index) => (
                  <li key={index + 1} className="zindex-1">
                    <Link
                      to={{
                        pathname: "/CategoryProducts",
                      }}
                      state={{ name: item?.categoryName }}
                      className="dropdown-toggle text-decoration-none"
                      href="Javascript:;"
                    >
                      {item?.categoryName}
                    </Link>
                    <div className="dropdown-menu maga_drop_down py-lg-4 py-md-3 shadow">
                      <div className="container-fluid px-0">
                        <div className="row w-100 mx-5">
                          {(item?.subcategories || []).map((item, index) => (
                            <div className="col-lg-2 col-md-6" key={index}>
                              <div className="maga_drop__menus">
                                <Link
                                  to={{
                                    pathname: "/SubCategory/Products",
                                  }}
                                  state={{ name: item?.subCategoryName }}
                                >
                                  <h3 className="dropdown_heading fs-6">
                                    {item?.subCategoryName}
                                  </h3>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              <li>
                <Link className="text-decoration-none" to="/app/brands">
                  Brands
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div
        className="modal  login_modal forms_modal"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <Login getEmail={getEmail} />
          </div>
        </div>
      </div>
      <div
        className="modal  login_modal forms_modal fade"
        id="staticBackdrop72"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <LoginPass otpEmail={otpEmail} />
          </div>
        </div>
      </div>
      <div
        className="modal  login_modal forms_modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <ForgotPassword getEmail={getEmail} />
            </div>
          </div>
        </div>
      </div>
      <>
        <div
          className="modal login_modal forms_modal fade"
          id="staticBackdrop3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleRefresh}
                />
                <SendOtp otpEmail={otpEmail} />
              </div>
            </div>
          </div>
        </div>
        {/* OTP Verification Modal  */}
        {/* Confirm Password Modal  */}
        <div
          className="modal  login_modal forms_modal"
          id="staticBackdrop4"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleRefresh}
                />
                <UpdatePassword otpEmail={otpEmail} />
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Navbar;
