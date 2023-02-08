import React, { useState, useEffect, useRef } from "react";
import Starlogo from "../../assets/img/logo.png";
import "../../assets/css/main.css";
import Login from "../LoginRegister/Login";
import { Link, useNavigate } from "react-router-dom";
import ForgotPassword from "../LoginRegister/ForgotPassword";
import SendOtp from "../LoginRegister/SendOtp";
import UpdatePassword from "../LoginRegister/UpdatePassword";
import axios from "axios";
import LoginPass from "../LoginRegister/LoginPass";
import Animate from "../../Animate";
import { homeSearch } from "../../pwaComponents/httpServices/homeHttpService/homeHttpService";
const Navbar = ({ NState, LoginState }) => {
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCatAndSubCat`;
  const cart = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/countProducts`;
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const allNotify = `${process.env.REACT_APP_APIENDPOINTNEW}user/notify/getAllNotifications `;
  const deleteNotify = `${process.env.REACT_APP_APIENDPOINTNEW}user/notify/removeOne`;
  const [SearchData, setSearchData] = useState([]);
  const [search, setSearch] = useState();
  const [category, setCategory] = useState([]);
  const [state, setState] = useState(false);
  const navigate = useNavigate();
  const [otpEmail, setOtpEmail] = useState();
  const [UserAuth, setUserAuth] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartNum, setCartNum] = useState(0);
  const [notifications, setNotifications] = useState();
  const [products, setProducts] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    AllProducts();
    CartCounts();
    getNotifications();
    getCategory();
    handleScroll();
  }, [state, NState]);

  useEffect(() => {
    if (LoginState) {
      document.getElementById("modal-login").click();
    }
  }, [LoginState]);

  const getProductList = async (e) => {
    let Search = e.target.value;
    const { data } = await homeSearch({ search: Search?.replace(".", "") });
    if (!data.error) {
      let dataList = data?.results;
      setProducts(dataList?.slice(0, 6));
    }
  };

  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);

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
      setCategory(res?.data.results);
    });
  };
  const AllProducts = async () => {
    await axios.post(allProd).then((res) => {
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

  const CartCounts = async () => {
    await axios.get(cart).then((res) => {
      console.log(res);

      setCartNum(res?.data.results);
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
  return (
    <div className="header_main ">
      <header className="">
        <div className="row header_top py-3 px-4 align-items-center justify-content-between">
          <div className="col-auto">
            <Link className="header_logo mx-2" to="/app/home">
              <img src={Starlogo} alt="" />
            </Link>
          </div>
          <div class="col-lg-6 col-md-5 d-flex align-items-center">
            <div class="header_search">
              <form
                class="row justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate("/app/ProductSearch", {
                    state: {
                      search: search,
                    },
                  });
                  setSearch();
                }}
              >
                <div class="col pe-0">
                  <div class="form-group">
                    <input
                      onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value);
                        getProductList(e);
                      }}
                      type="search"
                      id="search"
                      name="search"
                      class="form-control shadow-none"
                      placeholder="Search in Star Importers"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-auto d-flex align-items-center">
            <div className="social_icon d-flex">
              {NState ? (
                <Animate>
                  <Link to="/app/Cart">
                    <i className="fa fa-cart-arrow-down" />

                    <span className="count">{cartNum}</span>
                  </Link>
                </Animate>
              ) : (
                <Link to="/app/Cart">
                  <i className="fa fa-cart-arrow-down" />

                  <span className="count">{cartNum}</span>
                </Link>
              )}
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
        <div className="row  justify-content-center ">
          <div className="col-12 header_bottom ">
            <ul className="header_menus mb-0 ps-0">
              <li>
                <Link className="text-decoration-none" to="/app/home">
                  Home
                </Link>
              </li>
              {(category || [])
                ?.filter((item, idx) => idx < 10)
                .map((item, index) => (
                  <li key={index + 1} className="zindex-1">
                    <Link
                      to={{
                        pathname: "/app/subCategories",
                      }}
                      state={{
                        id: item?._id,
                        name: item?.categoryName,
                        image: item?.background,
                      }}
                      className="dropdown-toggle text-decoration-none"
                      href="Javascript:;"
                    >
                      {item?.categoryName}
                    </Link>
                    <div className="dropdown-menu maga_drop_down py-lg-3 py-md-3 shadow mb-0">
                      <div className="container-fluid px-0 ">
                        <div className="row w-100 justify-content-center">
                          {(item?.subcategories || [])
                            ?.filter((item, idx) => idx < 24)
                            .map((item, index) => (
                              <div
                                className="mega_dropp col-lg-auto col-md-6"
                                key={index}
                              >
                                <div className="maga_drop__menus">
                                  <Link
                                    className="text-decoration-none"
                                    to={{
                                      pathname: "/SubCategory/Products",
                                    }}
                                    state={{
                                      name: item?.subCategoryName,
                                    }}
                                  >
                                    <h3 className="dropdown_heading">
                                      {item?.subCategoryName}
                                    </h3>
                                  </Link>
                                </div>
                              </div>
                            ))}
                          <div className="col-lg-12 d-flex text-center mt-1 mb-0">
                            <p
                              className=" dropViewAll"
                              onClick={() =>
                                navigate("/app/subCategories", {
                                  state: {
                                    id: item?._id,
                                    name: item?.categoryName,
                                  },
                                })
                              }
                            >
                              View all
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}

              <li>
                <Link className="text-decoration-none" to="/app/Categories">
                  More
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      {search?.length ? (
        <section className="brands_page p-2 shadow" ref={ref}>
          {products?.length ? (
            <div>
              <div className="col w-100">
                <div className="product_single_right row p-2">
                  {(products || [])?.map((item, index) => (
                    <div className="col-xl-2 col-lg-2 col-md-3" key={index}>
                      <div className="product_parts_box_search ">
                        <div className="partsproduct_img_search">
                          <img
                            src={
                              item?.type.flavour
                                ? item?.type?.flavourImage ||
                                  require("../../assets/img/product.jpg")
                                : item?.productImage ||
                                  require("../../assets/img/product.jpg")
                            }
                            alt="Product"
                            onClick={() => {
                              navigate(`/app/product-details/${item?._id}`, {
                                state: {
                                  id: item?._id,
                                  type: item?.type,
                                },
                              });
                              setSearch();
                            }}
                          />
                        </div>
                        {/* </Link> */}
                        <div className="product_content mt-3 text-center">
                          <div className="d-flex justify-content-center">
                            <h1
                              className="text-center fw-bolder "
                              style={{
                                position: "relative",
                                left: "0px",
                                fontSize: "13px",
                              }}
                              onClick={() => {
                                navigate(`/app/product-details/${item?._id}`, {
                                  state: {
                                    id: item?._id,
                                    type: item?.type,
                                  },
                                });

                                setSearch();
                              }}
                            >
                              {item?.type.flavour
                                ? item?.unitName + "-" + item?.type?.flavour
                                : item?.unitName}
                            </h1>
                          </div>
                          <div>
                            <small
                              className="fst-italic  "
                              style={{ fontSize: "12px" }}
                            >
                              {item?.type.description?.slice(0, 40)}........
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-lg-12 d-flex text-center mt-1 mb-0">
                  <p
                    className=" dropViewAll"
                    onClick={() => {
                      setSearch();
                      navigate("/app/ProductSearch", {
                        state: {
                          search: search,
                        },
                      });
                    }}
                  >
                    View all results
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <img
                className="no-data"
                src="../assets/img/no-data.gif"
                style={{ width: "600px" }}
              />
              <h5 className="text-center">NO RESULTS...</h5>
            </div>
          )}
        </section>
      ) : null}

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
