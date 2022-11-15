import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import SendOtp from "../LoginRegister/SendOtp";
import { useForm } from "react-hook-form";
const Account = () => {
  const editProfile = `${process.env.REACT_APP_APIENDPOINTNEW}user/editProfile`;
  const [users, setUsers] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/verifyOtp`;
  const sendOtp = `${process.env.REACT_APP_APIENDPOINTNEW}user/forgotPassword`;
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;

  const [error, setError] = useState("");
  const [change,setChange] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

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

  const UpdatedData = (e) => {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };
  console.log(formValues);
  const SaveProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("firstName", formValues?.name);
    formData.append("phoneNumber", formValues?.phone);
    formData.append("email", formValues?.email);
    formData.append("password", formValues?.password);
    

    await axios.post(editProfile, formData).then((res) => {
      if (res.data.message === "Profile updated Successfully") {
        setChange(!change)
       let Modal = document.getElementById("close-modal11")
          Modal.click()
      }
    });
  };
  // send Otp//

  let email = users?.email;
  const onSubmit = async (data) => {
    const tempOtp = data.number1 + data.number2 + data.number3 + data.number4;
    const otp = parseInt(tempOtp);
    console.log(tempOtp);
    const VerifyUser = () => {
      axios
        .post(apiUrl, {
          email,
          otp,
        })
        .then((res) => {
          console.log(res);
          if (res?.data.message === "OTP Verified") {
            document.getElementById("modal-toggle11").click();
          } else if (res?.data.message === "Invalid OTP") {
            setError("Invalid Otp");
          }
        });
    };
    VerifyUser();
  };
  const SendOtp = async (e) => {
    e.preventDefault();
    await axios
      .post(sendOtp, {
        email: email,
      })
      .then((res) => {});
  };
  const ResendOtp = async (e) => {
    e.preventDefault();
    await axios
      .post(sendOtp, {
        email: email,
      })
      .then((res) => {});
  };
  const moveOnMax = (event, field, nextFieldID) => {
    event = event || window.event;
    if (event.keyCode != 9) {
      if (field.value.length >= field.maxLength) {
        nextFieldID.focus();
      }
    }
  };

  const togglePassword = () => {
    let x = document.getElementById("password-input");
    let y = document.getElementById("password-input2");
    if (y.type === "password") {
      y.type = "text";
    } else {
      y.type = "password";
    }
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };
  return (
    <div className="main_myaccount">
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>My Account</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        My Account
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="myaccount mb-4 ">
        <div className="container-lg">
          <Profile />
        </div>
        <div className="container container-sm">
          <div className="row mt-5  justify-content-center">
            <div className="col-lg-3   col-md-3 col-sm-5 col-xs-5 ">
              <div className="row  ">
                {/* My Account Tab Menu Start */}
                <div className="myaccount_tabs bg-white p-2">
                  <Link
                    to="/MyAccount"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link "
                  >
                    <div
                      className="nav flex-coloumn text-white  px-3 py-2 border  "
                      role="tablist"
                    >
                      <h4 className="mt-1">
                        <i className="fa fa-clipboard-list" />
                        <span className="fs-6 mx-2">ORDER HISTORY</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/RequestOrder"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border   " role="tablist">
                      <h4 className="">
                        <i className="fas fa-file mt-1" />
                        <span className="fs-6 mx-2">REQUEST ORDER</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Address"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border" role="tablist">
                      <h4 className="">
                        <i className="fa fa-map-signs" />
                        <span className="fs-6 mx-2">ADDRESS BOOK</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Account"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div
                      className="nav-active  text-white px-3 py-2  border  "
                      role="nav-link"
                    >
                      <h4 className="">
                        <i className="fas fa-user" />
                        <span className="fs-6 mx-2">ACCOUNT SETTING</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Favourites"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2  border  " role="tablist">
                      <h4 className="">
                        <i className="fas fa-heart" />
                        <span className="fs-6 mx-2">MY FAVOURITES</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/MainMenu"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border  " role="tablist">
                      <h4 className="">
                        <i className="fa fa-list" />
                        <span className="fs-6 mx-2">MAIN MENU</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-9 ">
              <div className="bg-white p-4 ">
                <div className="row mx-0 py-2">
                  <div className="col-12 text-end mb-4">
                    <Link
                      className="text-center comman_btn"
                      data-bs-toggle="modal"
                      id="modal-toggle"
                      data-bs-target="#staticBackdrop8"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="col-12">
                    <form className="form-design row" action="">
                      <div className="form-floating col-6 mb-4">
                        <input
                          type="text"
                          className="form-control shadow-none"
                          defaultValue={users?.firstName}
                          id="floatingInput"
                         disabled
                        />
                        <label htmlFor="floatingInput">Name</label>
                      </div>
                      <div className="form-floating col-6 mb-4">
                        <input
                          type="email"
                          className="form-control shadow-none"
                          defaultValue={users?.email}
                          id="floatingInput"
                          placeholder=" "
                          disabled
                        />
                        <label htmlFor="floatingInput">Email Address</label>
                      </div>
                      <div className="form-floating col-6 mb-4">
                        <input
                          type="email"
                          className="form-control shadow-none"
                          defaultValue={users?.phoneNumber}
                          id="floatingInput"
                          placeholder=" "
                          disabled
                        />
                        <label htmlFor="floatingInput">Mobile Number</label>
                      </div>
                      <div className="form-floating col-6 mb-4 position-relative">
                        <input
                          type="password"
                          name="password"
                          defaultValue="idontknow"
                          className="form-control shadow-none"
                          id="password-field"
                          disabled
                        />
                        <label htmlFor="password-field">Password</label>
                        <span
                          toggle="#password-field"
                          className="fa fa-fw fa-eye field-icon toggle-password"
                        />
                      </div>
                      <div className="col-12 text-center">
      
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div
        className="modal comman_modal_form forms_modal"
        id="staticBackdrop8"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0  rounded-top">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />

              <div>
                <div className="container">
                  <div className="row justify-content-center p-2">
                    <h1 className="text-center">Verification</h1>
                    <div className="col-6 d-flex">
                      <input
                        type="radio"
                        name="emailType"
                        className="radioBtn"
                        checked
                      />
                      <p className="mt-3 mx-1 fs-6 fw-bold mt-2">
                        Email Address
                      </p>
                    </div>
                    <div className="col-6 d-flex">
                      <input
                        type="radio"
                        name="emailType"
                        className="radioBtn"
                      />
                      <p className="mt-3 mx-1 fs-6 fw-bold mt-2">
                        Mobile Number
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-12 text-center mt-3"
                    data-bs-toggle="modal"
                    id="modal-toggle"
                    data-bs-target="#staticBackdrop9"
                  >
                    <button className="comman_btn2" onClick={SendOtp}>
                      Send Otp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal  comman_modal_form"
        id="staticBackdrop9"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />

              <div className="row align-items-center justify-content-center text-center">
                <div className="col-md-8">
                  <div className="comman_modal_heading">
                    <h2 className="fs-2 fw-bold">OTP Verification</h2>
                    <p>
                      Please enter the OTP received on <br /> your Email Address
                    </p>
                  </div>
                  <form
                    className="forms_modal_content otp_part"
                    onSubmit={handleSubmit(onSubmit)}
                    autocomplete="off"
                  >
                    <div className="form-group mb-3 d-flex justify-content-center">
                      <input
                        className="form-control shadow-none border border-secondary text-center mx-1 otp_input "
                        type="text"
                        maxLength={1}
                        name="number1"
                        id="number1"
                        {...register("number1", {
                          required: "Required",
                        })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("number1"),
                            document.getElementById("number2")
                          );
                        }}
                      />
                      <input
                        className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                        type="text"
                        maxLength={1}
                        name="number2"
                        id="number2"
                        {...register("number2", {
                          required: "Required",
                        })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("number2"),
                            document.getElementById("number3")
                          );
                        }}
                      />
                      <input
                        className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                        type="text"
                        maxLength={1}
                        name="number3"
                        id="number3"
                        {...register("number3", {
                          required: "Required",
                        })}
                        onKeyUp={(event) => {
                          moveOnMax(
                            event,
                            document.getElementById("number3"),
                            document.getElementById("number4")
                          );
                        }}
                      />
                      <input
                        className="form-control shadow-none border border-secondary text-center mx-1 otp_input"
                        type="text"
                        maxLength={1}
                        name="number4"
                        id="number4"
                        {...register("number4", {
                          required: "Required",
                        })}
                      />
                    </div>
                    <div className="fs-6 text-danger fw-bold">{error}</div>
                    <div className="form-group my-3">
                      <div className="time_js">
                        <span className="fw-bold fs-5 text-info">01:34</span>
                      </div>
                    </div>
                    <div className="form-group mb-4">
                      <button className="comman_btn" type="submit">
                        Submit
                      </button>
                    </div>
                    <div className="form-group mb-0 comman_text">
                      <span>
                        Didn't receive the OTP?{" "}
                        <a
                          href="javascript:;"
                          className="text-decoration-none text-info"
                          onClick={ResendOtp}
                        >
                          Resend OTP
                        </a>
                      </span>
                    </div>
                  </form>
                  <a
                    data-bs-toggle="modal"
                    id="modal-toggle"
                    data-bs-target="#staticBackdrop4"
                    href="javscript:;"
                    className="comman_btn text-decoration-none d-none"
                  >
                    Ssdfd
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        data-bs-toggle="modal"
        id="modal-toggle11"
        data-bs-target="#staticBackdrop11"
        href="javscript:;"
        className="comman_btn text-decoration-none d-none"
      >
        Ssdfd
      </a>
      <div
        className="modal  comman_modal_form"
        id="staticBackdrop11"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-modal11"
              />

              <div className="row align-items-center justify-content-center text-center">
                <div className="col-md-11">
                  <div className="comman_modal_heading">
                    <h2 className="fs-2 fw-bold mb-5">Update Your Profile</h2>
                  </div>
                  <form className="form-design row p-0" action="">
                    <div className="form-floating col-6 mb-4">
                      <input
                        type="text"
                        className="form-control shadow-none px-3"
                        defaultValue={users?.firstName}
                        id="floatingInput"
                        placeholder=" "
                        name="name"
                        onChange={UpdatedData}
                      />
                      <label htmlFor="floatingInput">Name</label>
                    </div>

                    <div className="form-floating col-6 mb-4">
                      <input
                        type="number"
                        className="form-control shadow-none px-3"
                        defaultValue={users?.phoneNumber}
                        id="floatingInput"
                        placeholder=" "
                        name="phone"
                        onChange={UpdatedData}
                      />
                      <label htmlFor="floatingInput">Mobile Number</label>
                    </div>
                    <div className="form-floating col-12 mb-4">
                      <input
                        type="email"
                        className="form-control shadow-none px-3"
                        defaultValue={users?.email}
                        id="floatingInput"
                        placeholder=" "
                        name="email"
                        onChange={UpdatedData}
                      />
                      <label htmlFor="floatingInput">Email Address</label>
                    </div>
                    <div className="form-floating col-6 mb-4 position-relative">
                      <input
                        type="password"
                        name="Oldpassword"
                        defaultValue="userPassword"
                        className="form-control shadow-none px-3"
                        id="password-input2"
                      />
                      <label htmlFor="password-field">Old Password</label>
                      <span
                        onClick={togglePassword}
                        className="fa fa-fw fa-eye field-icon toggle-password"
                      />
                    </div>
                    <div className="form-floating col-6 mb-4 position-relative">
                      <input
                        type="password"
                        name="password"
                        defaultValue="idontknow"
                        className="form-control shadow-none px-3"
                        id="password-input"
                        onChange={UpdatedData}
                      />
                      <label htmlFor="password-field">New Password</label>
                      <span
                        onClick={togglePassword}
                        className="fa fa-fw fa-eye field-icon toggle-password"
                      />
                    </div>
                    <div className="form-floating col-12 text-center">
                      <button
                        className="text-center my-2 comman_btn"
                        onClick={SaveProfile}
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

export default Account;
