import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "rsuite";
import Swal from "sweetalert2";
import Navbar from "../Homepage/Navbar";
import Select from "react-select";

const OrderForm = () => {
  // axios.defaults.headers.common["x-auth-token-vendor"] =
  //   localStorage.getItem("vendorLog");
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getVendorProducts`;
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("vendorLog") ?? false
  );
  const [productsV, setProductsV] = useState(
    JSON.parse(localStorage.getItem("vendorId")) ?? []
  );
  const [keySort, setKeySort] = useState();
  let id = localStorage.getItem("vendorId");
  const [searchKey, setSearchKey] = useState("");
  let { name } = useParams();
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}user/register`;
  const apiLogin = `${process.env.REACT_APP_APIENDPOINTNEW}vendor/login`;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [delOption, setDelOption] = useState([]);
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const barcodeSearch = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderDetail`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetProducts();
  }, []);

  const createOptions = async () => {
    await axios
      .post(barcodeSearch, {
        barcode: searchKey,
      })
      .then((res) => {
        if (!res.error) {
          let data = res?.data.results.results;
          setProducts(data);
          const optionList = data?.map((item, index) => ({
            value: item?._id,
            label: item?.unitName,
          }));
          setOptions(optionList);
        }
      });
  };
  console.log(productsV, "kjhj");

  const handleChange2 = (selected) => {
    setSelectedProduct({
      usersSelected: selected,
    });
    GetProducts(selected?.value);
  };

  const GetProducts = async () => {
    try {
      const response = await axios.get(getProducts + "/" + id, null, {
        headers: {
          "x-auth-token-vender": isLogin,
        },
      });
      console.log(response);
      setProducts(response?.data.results);
    } catch (error) {
      // Handle errors
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    setSearchKey(inputValue);
  };

  const onSubmit = (data) => {
    setLoader(true);
    const SignUpData = async (e) => {
      const formData = new FormData();
      formData.append(
        "companyName",
        data?.companyName?.charAt(0).toUpperCase() +
          data?.companyName?.slice(1).trim()
      );
      formData.append(
        "dba",
        data?.dba?.charAt(0).toUpperCase() + data?.dba?.slice(1).trim()
      );
      formData.append(
        "addressLine1",
        data?.addressLine1?.charAt(0).toUpperCase() +
          data?.addressLine1?.slice(1).trim()
      );
      formData.append(
        "addressLine2",
        data?.addressLine2?.charAt(0).toUpperCase() +
          data?.addressLine2?.slice(1).trim()
      );
      formData.append(
        "city",
        data?.city?.charAt(0).toUpperCase() + data?.city?.slice(1).trim()
      );
      formData.append(
        "state",
        data?.state?.charAt(0).toUpperCase() + data?.state?.slice(1).trim()
      );
      formData.append("zipcode", data?.zipcode?.trim());
      formData.append(
        "firstName",
        data?.firstName?.charAt(0).toUpperCase() +
          data?.firstName?.slice(1).trim()
      );
      formData.append(
        "lastName",
        data?.lastName?.charAt(0).toUpperCase() +
          data?.lastName?.slice(1).trim()
      );
      formData.append("email", data?.email?.trim());
      formData.append("wholesaleConfirmation", data?.wholeSale);
      formData.append("multipleUsers", data?.multipleUsers);
      formData.append("newsLetter", data?.subscribe);
      formData.append("phoneNumber", data?.phoneNumber?.trim());
      formData.append("businessPhoneNumber", data?.businessPhoneNumber);
      formData.append("federalTaxId", files?.federalTaxId);
      formData.append("businessLicense", files?.businessLicense);
      formData.append("tobaccoLicence", files?.tobaccoLicence);
      formData.append("salesTaxId", files?.salesTaxId);
      formData.append("accountOwnerId", files?.accountOwnerId);
      formData.append("heardAboutUs", data?.heardAboutUs);
      formData.append(
        "comments",
        data?.comments?.charAt(0).toUpperCase() +
          data?.comments?.slice(1).trim()
      );

      await axios
        .post(apiUrl, formData)
        .then((response) => {
          if (response?.data.message === "Registered Successfully") {
            setLoader(false);
            Swal.fire({
              title: "Thanks You! Your Account Is Under Review.",
              text: "We will be reviewing your account.Please check your registered email.",
              icon: "success",
              button: "Ok",
            });
            //   setText("done");
            navigate("/app/home");
          }
          if (response?.data.message === "Email is already registered") {
            setLoader(false);

            Swal.fire({
              title: "Email is Already registered!",
              text: "Please Login to your Account",
              icon: "error",
              button: "Ok",
            });
          }
          if (response?.data.message === "Invalid file format") {
            Swal.fire({
              title: "Invalid file format!",
              text: "Only Images/docs/pdf are allowed",
              icon: "warning",
              confirmButtonText: "ok",
            });
            setLoader(false);
          }
          if (response?.data.message === "Please enter valid name") {
            setLoader(false);

            Swal.fire({
              title:
                "First/Last Name cannot contain spaces/numbers/special characters!",
              icon: "error",
              button: "Ok",
            });
          }
          if (response?.data.message === "Phone is already registered") {
            setLoader(false);

            Swal.fire({
              title: "This Phone Number is Already Registered ",
              text: "Please Enter a new Number ",
              icon: "error",
              button: "Ok",
            });
          }
          if (response?.data.message == "Wrong input") {
            setLoader(false);

            console.log();
            Swal.fire({
              title: "Enter Valid Data in Required Fields.",
              text: "",
              icon: "error",
              button: "Ok",
            });
          }
        })
        .catch((err) => {
          let error = err?.response?.data?.message;
          setLoader(false);
          if (err) {
            Swal.fire({
              title: error,
              text: "401 error",
              icon: "error",
              button: "Ok",
            });
          }
        });
    };

    SignUpData();
  };

  const Login = async () => {
    await axios
      .patch(apiLogin, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (!response.data.error) {
          localStorage.removeItem("vendorLog");
          localStorage.removeItem("vendorId");
          localStorage.setItem("vendorLog", response?.data?.results.token);
          localStorage.setItem(
            "vendorId",
            JSON.stringify(response?.data?.results?.products)
          );
          window.location.reload(false);
        } else {
          Swal.fire({
            title: response.data.message,
            text: "",
            icon: "error",
            button: "Okay",
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        let error = err?.response?.data?.message;
        setLoader(false);
        if (err) {
          Swal.fire({
            title: error,
            text: "401 error",
            icon: "error",
            button: "Ok",
          });
        }
      });
  };

  const togglePassword = () => {
    let x = document.getElementById("floatingPassword88");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <div>
      <div className="">
        {/* <Navbar /> */}
        {!isLogin ? (
          <div className="container marginTop p-4">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <form
                  className=" mt-3 bg-white p-4 mb-5 shadow"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="text-center mb-5">
                    <div>
                      <img
                        className=""
                        onClick={() =>
                          (window.location.href =
                            "https://www.starimporters.com/")
                        }
                        src="https://starimporters-media.s3.amazonaws.com/1710029749556--Star%20Logo%20Tradeshow%202024.png"
                        alt="Company Logo"
                        width={200}
                        style={{
                          height: "120px",
                        }}
                      />
                      <h2 className=" mt-5 fw-bold  fs-2 text-center text-dark headOrder">
                        LOGIN
                      </h2>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="form-floating col-10 mb-4">
                      <input
                        type="email"
                        className="form-control shadow-none border border-secondary"
                        id="floatingPassword4"
                        name="email"
                        required
                        placeholder="name@example.com"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />

                      <label
                        htmlFor="floatingPassword4"
                        className="mx-2 fw-bold"
                      >
                        Email Address <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div class="form-floating mb-4 col-10">
                      <input
                        type="password"
                        className="form-control shadow-none border border-secondary"
                        id="floatingPassword88"
                        name="email"
                        required
                        placeholder="name@example.com"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="floatingPassword88"
                        className="mx-2 fw-bold"
                      >
                        Password <span className="text-danger">*</span>
                      </label>
                      <input
                        type="checkbox"
                        onClick={togglePassword}
                        className="showPassCheck"
                      />
                      <small className=" showPass">Show Password</small>
                    </div>
                    <>
                      <div className="col-12 text-center mt-4">
                        <Button
                          onClick={() => Login()}
                          appearance="primary"
                          className="comman_btn mx-2 fw-bold"
                          style={{ backgroundColor: "#3e4093", color: "#fff" }}
                        >
                          Login
                        </Button>
                      </div>
                      <p className="fs-6 text-center mt-3 text-secondary">
                        {" "}
                        *Forgot your password{" "}
                        <Link
                          to="/Terms&Condition"
                          state={"jiij"}
                          className="text-decoration-none"
                        >
                          Click here.
                        </Link>
                      </p>
                    </>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="container marginTop p-4">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <form
                  className=" mt-3 bg-white p-4 mb-5 shadow"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="d-flex justify-content-between mb-5">
                    <div className="text-center">
                      <img
                        className=""
                        src="https://starimporters-media.s3.amazonaws.com/1702039270708--WhatsApp%20Image%202023-12-08%20at%2011.41.31%20AM%20%281%29.jpeg"
                        alt="Company Logo"
                        width={80}
                        style={{
                          height: "80px",
                          borderRadius: "50%",
                        }}
                      />
                      <h1 className="fs-6 mt-2">{name}</h1>

                      <p className="fs-6 text-center text-secondary">
                        <Link
                          onClick={() => {
                            localStorage.removeItem("vendorLog");
                            window.location.reload();
                          }}
                          className="text-decoration-none"
                        >
                          <i class="fa fa-right-from-bracket"></i> Logout
                        </Link>
                      </p>
                    </div>{" "}
                    <div>
                      <img
                        className=""
                        onClick={() =>
                          (window.location.href =
                            "https://www.starimporters.com/")
                        }
                        src="https://starimporters-media.s3.amazonaws.com/1710029749556--Star%20Logo%20Tradeshow%202024.png"
                        alt="Company Logo"
                        width={200}
                        style={{
                          height: "120px",
                        }}
                      />
                      <h2 className=" mt-5 fw-bold  fs-2 text-center text-dark headOrder">
                        ORDER FORM
                      </h2>
                    </div>
                    <div
                      className="text-center "
                      style={{
                        visibility: "hidden",
                      }}
                    >
                      <img
                        className=""
                        src="https://starimporters-media.s3.amazonaws.com/1702039270708--WhatsApp%20Image%202023-12-08%20at%2011.41.31%20AM%20%281%29.jpeg"
                        alt="Company Logo"
                        width={170}
                        style={{
                          height: "150px",
                          borderRadius: "50%",
                        }}
                      />
                      <h1 className="fs-5">{name} Private ltd</h1>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-floating col-4 mb-4">
                      <input
                        type="text"
                        className={classNames(
                          "form-control  border border-secondary",
                          { "is-invalid": errors.email }
                        )}
                        id="floatingInput3"
                        name="companyName"
                        placeholder="name@example.com"
                        {...register("companyName", {
                          required: "Company Name is Required*",
                          pattern: {
                            value: /^[^*|\":<>[\]{}`\\()';@$]+$/,
                            message: "Special Character not allowed",
                          },

                          minLength: {
                            value: 2,
                            message:
                              "Minimium 2 letters Should be in Company Name", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                      {errors.companyName && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.companyName?.message}
                        </small>
                      )}
                      <label
                        htmlFor="floatingInput3"
                        className="mx-2 fw-bolder text-dark"
                      >
                        Account Number <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-floating col-4 mb-4">
                      <input
                        type="text"
                        className={classNames(
                          "form-control  border border-secondary signup_fields"
                        )}
                        id="floatingPassword1"
                        placeholder="name@example.com"
                        name="dba"
                        {...register("dba")}
                      />

                      <label
                        htmlFor="floatingPassword1"
                        className="mx-2 fw-bolder"
                      >
                        Customer Name <span className="text-danger"></span>
                      </label>
                    </div>
                    <div className="form-floating col-4 mb-4">
                      <input
                        type="email"
                        className="form-control shadow-none border border-secondary"
                        id="floatingPassword4"
                        name="email"
                        placeholder="name@example.com"
                        {...register("email", {
                          required: "Email is Required*",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.email?.message}
                        </small>
                      )}

                      <label
                        htmlFor="floatingPassword4"
                        className="mx-2 fw-bold"
                      >
                        Email Address <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="form-floating col-4 mb-4">
                      <input
                        type="text"
                        className={classNames(
                          "form-control  border border-secondary signup_fields",
                          { "is-invalid": errors.addressLine1 }
                        )}
                        id="floatingAddrees1"
                        placeholder="name@example.com"
                        name="addressLine1"
                        {...register("addressLine1", {
                          required: "Company Adrress Line1 is Required*",
                          pattern: {
                            value: /^[^*|\":<>[\]{}`\\()';@$]+$/,
                            message: "Special Character not allowed!",
                          },
                          maxLength: {
                            value: 200,
                            message: "Max length is 200 characters!",
                          },
                          minLength: {
                            value: 6,
                            message: "Min length is 6 characters!",
                          },
                        })}
                      />
                      {errors.addressLine1 && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.addressLine1?.message}
                        </small>
                      )}
                      <label
                        htmlFor="floatingAddress1"
                        className="mx-2 fw-bolder"
                      >
                        Company Address
                        <span className="text-danger">*</span>
                      </label>
                    </div>

                    <>
                      <div className="form-floating col-4 mb-4">
                        <input
                          type="number"
                          className={classNames(
                            "form-control  border border-secondary signup_fields ",
                            { "is-invalid": errors.phoneNumber }
                          )}
                          id="floatingPassword3"
                          placeholder="Password"
                          name="phoneNumber"
                          {...register("phoneNumber", {
                            required: "Phone Number is Required*",
                            maxLength: {
                              value: 10,
                              message: "maximium 10 Charcarters",
                            },
                            minLength: {
                              value: 8,
                              message: "minimium 8 Charcarters",
                            },
                          })}
                        />
                        {errors.phoneNumber && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.phoneNumber?.message}
                          </small>
                        )}
                        <label
                          htmlFor="floatingPassword3"
                          className="mx-2 fw-bolder"
                        >
                          Phone Number <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="form-floating col-4 mb-4 select_dropdown ">
                        <select
                          className={classNames(
                            "form-select border border-secondary signup_fields fw-bolder mt-1",
                            { "is-invalid": errors.state }
                          )}
                          id="floatingSelect1"
                          aria-label="Floating label select example"
                          name="state"
                          {...register("state", {
                            required: "State is Required*",
                            onChange: (e) => {
                              setDelOption(e.target.value);
                            },
                          })}
                        >
                          <option value="">Select an option...</option>
                          <option value="Alabama">Delivery</option>
                          <option value="Alaska">Pickup</option>
                          <option value="American Samoa">Shipment</option>
                        </select>
                        {errors.state && (
                          <small className="errorText mx-1 fw-bold">
                            {errors.state?.message}
                          </small>
                        )}

                        <label
                          htmlFor="floatingSelect1"
                          className="mx-2 fw-bolder mb-4"
                        >
                          State/Province
                        </label>
                      </div>

                      <label className="fs-5 ">Select Products</label>
                      <div className="row">
                        <div className="col-12 mb-4">
                          <div className="cart_table_2">
                            <div className="">
                              <table className="table">
                                <thead>
                                  {/* <tr>
                                    <th>
                                      {" "}
                                      <div class="dropdowns">
                                        <button class="dropdown-btns sort_btn ">
                                          Scanned by{" "}
                                          <i class="fa-solid fa-caret-down"></i>
                                        </button>
                                        <div class="dropdown-contents DropBg">
                                          <a
                                            className="text-decoration-none text-dark "
                                            onClick={() =>
                                              OrderDetails("", 1, "qr")
                                            }
                                          >
                                            Qr Scanned
                                          </a>
                                          <a
                                            onClick={() =>
                                              OrderDetails("", -1, "manual")
                                            }
                                            className="text-decoration-none text-dark "
                                          >
                                            Manually Scanned
                                          </a>
                                        </div>
                                      </div>
                                    </th>
                                    <th>
                                      Items{" - "}
                                      <div class="dropdowns">
                                        <button class="dropdown-btns sort_btn ">
                                          Sort{" "}
                                          <i class="fa-solid fa-caret-down"></i>
                                        </button>
                                        <div class="dropdown-contents DropBg">
                                          <a
                                            className="text-decoration-none text-dark "
                                            onClick={() => OrderDetails("", 1)}
                                          >
                                            A to Z
                                          </a>
                                          <a
                                            onClick={() => OrderDetails("", -1)}
                                            className="text-decoration-none text-dark "
                                          >
                                            Z to A
                                          </a>
                                        </div>
                                      </div>
                                    </th>
                                    <th>Quantity</th>
                                    <th>
                                      Pull Status{" - "}
                                      <div class="dropdowns">
                                        <button class="dropdown-btns sort_btn ">
                                          {keySort
                                            ? (keySort === "scanned" &&
                                                "Scanned") ||
                                              (keySort === "overUnderScanned" &&
                                                "Over/Under Scanned") ||
                                              (keySort === "outOfStock" &&
                                                "Out of Stock") ||
                                              (keySort === "" && "All")
                                            : "Sort"}
                                          <i class="fa-solid fa-caret-down mx-2"></i>
                                        </button>
                                        <div class="dropdown-contents DropBg">
                                          <a
                                            className="text-decoration-none text-dark "
                                            onClick={() => OrderDetails("", 1)}
                                          >
                                            All
                                          </a>
                                          <a
                                            className="text-decoration-none text-dark "
                                            onClick={() =>
                                              OrderDetails("scanned", 1)
                                            }
                                          >
                                            Scanned
                                          </a>
                                          <a
                                            onClick={() =>
                                              OrderDetails(
                                                "overUnderScanned",
                                                1
                                              )
                                            }
                                            className="text-decoration-none text-dark "
                                          >
                                            Over/Under Scanned
                                          </a>

                                          <a
                                            onClick={() =>
                                              OrderDetails("outOfStock", 1)
                                            }
                                            className="text-decoration-none text-dark "
                                          >
                                            Out of Stock
                                          </a>
                                        </div>
                                      </div>
                                    </th>
                                    <th>Pull Quantity</th>
                                  </tr> */}
                                </thead>
                                {productsV?.length < 0 ? (
                                  <tbody className="border">
                                    <tr
                                      className="border"
                                      style={{
                                        width: "20rem",
                                      }}
                                    >
                                      <td>
                                        No Results -{" "}
                                        <button
                                          className="bg-primary text-white p-2 border rounded"
                                          // onClick={() => {
                                          //   OrderDetails();
                                          // }}
                                        >
                                          Refresh
                                        </button>
                                      </td>
                                      <td className="border rounded">
                                        <span className="fs-5 bg-light p-2 px-3 rounded">
                                          No Results
                                        </span>
                                      </td>
                                      <td className="border rounded">
                                        No Results
                                      </td>
                                      <td className="border rounded">
                                        <span className="fs-5 bg-light p-2 px-3 rounded">
                                          No Results
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                ) : (
                                  <tbody className="border">
                                    {(productsV || [])?.map((item, index) => (
                                      <tr className="border text-center mt-5">
                                        <td className="border rounded">
                                          <span className="fs-5 bg-light p-2 px-3 rounded">
                                            {item?.isDirectScanned ? (
                                              <i class="fa-solid fa-file-pen"></i>
                                            ) : (
                                              <i class="fa-solid fa-qrcode"></i>
                                            )}
                                          </span>
                                        </td>
                                        <td>
                                          <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                            <div className="col-auto">
                                              <span className="cart_product">
                                                <img
                                                  src={
                                                    item?.flavour?._id
                                                      ? item?.flavour
                                                          ?.flavourImage
                                                      : item?.productId
                                                          ?.productImage
                                                  }
                                                  alt=""
                                                />
                                              </span>
                                            </div>
                                            <div className="col">
                                              <div className="cart_content ">
                                                <h3 className="fs-5">
                                                  {item?.flavour?._id
                                                    ? item?.productId
                                                        ?.unitName +
                                                      "-" +
                                                      item?.flavour?.flavour
                                                    : item?.productId?.unitName}
                                                </h3>
                                                <p>
                                                  Barcodes:
                                                  {item?.flavour?.barcode
                                                    ?.filter(
                                                      (itm, id) => id == 1
                                                    )
                                                    .map((item) => (
                                                      <li>{item}</li>
                                                    ))}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="border rounded">
                                          <span className="fs-5 bg-light p-2 px-3 rounded">
                                            {item?.quantity}
                                          </span>
                                        </td>
                                        <td className="border rounded">
                                          {item?.scanned === "NotScanned" ? (
                                            <span className="text-secondary  p-2 px-3 rounded bg-secondary text-white PullStatusText">
                                              Not Scanned
                                            </span>
                                          ) : (
                                            <div>
                                              {item?.scanned ===
                                                "PartlyScanned" && (
                                                <span className=" text-secondary  p-2 px-3 rounded bg-warning text-white PullStatusText">
                                                  Under Scanned
                                                </span>
                                              )}
                                              {item?.scanned ===
                                                "OutOfStock" && (
                                                <span className=" text-secondary  p-2 px-3 rounded bg-danger text-white PullStatusText">
                                                  Out of Stock
                                                </span>
                                              )}
                                              {item?.scanned ===
                                                "OverlyScanned" && (
                                                <span className=" text-secondary  p-2 px-3 rounded bg-primary text-white PullStatusText">
                                                  Over Scanned
                                                </span>
                                              )}
                                              {item?.scanned ===
                                                "FullyScanned" && (
                                                <span className="  p-2 px-3 rounded bg-success text-white text-nowrap PullStatusText">
                                                  <img
                                                    className="mx-2"
                                                    src={require("../../assets/img/Group 427322975.png")}
                                                  ></img>{" "}
                                                  Completely Scanned
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </td>
                                        <td className="border rounded">
                                          <span className="fs-5 bg-light p-2 px-3 rounded">
                                            {item?.pickedQuantity}
                                          </span>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                )}
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 text-center mt-4">
                        <Button
                          className="comman_btn2 mx-2 fw-bold"
                          appearance="primary"
                          onClick={() => {
                            navigate("/app/home");
                          }}
                          style={{ backgroundColor: "#eb3237", color: "#fff" }}
                        >
                          Cancel
                        </Button>
                        <Button
                          loading={loader}
                          appearance="primary"
                          className="comman_btn mx-2 fw-bold"
                          type="submit"
                          style={{ backgroundColor: "#3e4093", color: "#fff" }}
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
