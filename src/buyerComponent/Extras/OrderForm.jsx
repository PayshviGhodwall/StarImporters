import axios from "axios";import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "rsuite";
import Swal from "sweetalert2";
import Navbar from "../Homepage/Navbar";
import Select from "react-select";

const OrderForm = () => {
  axios.defaults.headers.common["x-auth-token-vendor"] =
    localStorage.getItem("vendorLog");
  const [productsV, setProductsV] = useState([]);
  const [keySort, setKeySort] = useState("");
  const [quantities, setQuantities] = useState([]);
  let { name } = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}vendor/createOrder`;
  const [delOption, setDelOption] = useState([]);
  const [products, setProducts] = useState([]);
  const barcodeSearch = `${process.env.REACT_APP_APIENDPOINTNEW}vendor/getVendorProducts`;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const searchProducts = async (key) => {
    try {
      const response = await axios.patch(barcodeSearch, {
        search: key,
      });
      console.log(response);
      setProductsV(response?.data.results.products);
    } catch (error) {
      // Handle errors
      console.error("Error fetching products:", error);
    }
  };

  const onSubmit = (data) => {
    // setLoader(true);
    let Nprod = [];
    products?.map((itm) => {
      Nprod.push({
        productId: itm?.productId,
        quantity: 10,
        promotionalComment: itm?.comment,
        flavourId: itm?.flavourId,
      });
    });

    const SignUpData = async (e) => {
      const formData = {
        fullName:
          data?.fullName?.charAt(0).toUpperCase() +
          data?.fullName?.slice(1).trim(),
        address:
          data?.addressLine1?.charAt(0).toUpperCase() +
          data?.addressLine1?.slice(1).trim(),
        email: data?.email?.trim(),
        phoneNumber: data?.phoneNumber?.trim(),
        type: delOption,
        countryCode: +1,
        products: Nprod,
        comments:
          data?.comments?.charAt(0).toUpperCase() +
          data?.comments?.slice(1).trim(),
      };

      await axios.post(apiUrl, formData).then((response) => {
        if (!response.data.error) {
          document.getElementById("resetBtn").click();
          setProducts([]);
          setProductsV([]);
          Swal.fire({
            title: "Thanks You! Your Order is Placed.",
            icon: "success",
            confirmButtonText: "Okay",
          });
        } else if (response?.data?.error) {
          Swal.fire({
            title: response?.data?.message,
            text: "401 error",
            icon: "error",
            button: "Ok",
          });
        }
      });
    };

    SignUpData();
  };

  const handleChange = async (id, e) => {
    let val = e.target.value;
    let quant = [...quantities];
    let found = false;

    quant.forEach((obj) => {
      if (obj.id === id) {
        obj.value = val;
        found = true;
      }
    });
    if (!found) {
      quant.push({ id: id, value: val });
    }
    setQuantities(quant);
  };

  console.log(quantities, "klk", products);

  const addProducts = async (pId, fId, uName, flv, bar, comment) => {
    document.getElementById(fId).value = 1;
    let prods = [...products];
    let found = false;
    let qnty = quantities.filter((itm) => itm.id === fId);

    console.log(quantities, "ij");
    prods.forEach((obj) => {
      if (obj?.flavourId === fId) {
        let quantityToAdd = qnty[0]?.value ? parseInt(qnty[0]?.value) :  1;
        console.log(quantityToAdd);
        obj.quantity += quantityToAdd;
        found = true;
      }
    });

    if (!found) {
      prods.push({
        productId: pId,
        flavourId: fId,
        quantity: qnty[0]?.value ?? 1,
        unitName: uName,
        flavour: flv,
        barcodes: bar,
        comment: comment,
      });
    }
    setProducts(prods);
  };

  return (
    <div>
      <div className="">
        {/* <Navbar /> */}

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
                    <h2 className=" mt-5 fw-bold  fs-4 text-center text-dark headOrder">
                      ORDER FORM
                    </h2>
                  </div>
                  <div className="text-center ">
                    <p className="fs-6 text-center text-secondary">
                      <Link
                        to={`/app/OrderForm/Login/${localStorage.getItem(
                          "vendor"
                        )}`}
                        onClick={() => {
                          localStorage.removeItem("vendorLog");
                          localStorage.removeItem("vendor");
                          localStorage.removeItem("vendorId");
                        }}
                        className="text-decoration-none"
                      >
                        <i class="fa fa-right-from-bracket"></i> Logout
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="form-floating col-4 mb-4">
                    <input
                      type="text"
                      className={classNames(
                        "form-control  border border-secondary",
                        { "is-invalid": errors.fullName }
                      )}
                      id="floatingInput3"
                      name="fullName"
                      placeholder="name@example.com"
                      {...register("fullName", {
                        required: "Full Name is Required*",
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
                    {errors.fullName && (
                      <small className="errorText mx-1 fw-bold">
                        {errors.fullName?.message}
                      </small>
                    )}
                    <label
                      htmlFor="floatingInput3"
                      className="mx-2 fw-bolder text-dark"
                    >
                      Full Name <span className="text-danger">*</span>
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

                    <label htmlFor="floatingPassword4" className="mx-2 fw-bold">
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
                        required: "Full Address is Required*",
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
                      Full Address
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
                          { "is-invalid": errors.type }
                        )}
                        id="floatingSelect1"
                        aria-label="Floating label select example"
                        name="type"
                        {...register("type", {
                          required: "Please select delivery type.*",
                          onChange: (e) => {
                            setDelOption(e.target.value);
                          },
                        })}
                      >
                        <option value="">Select an option...</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Shipment">Shipment</option>
                      </select>
                      {errors.type && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.type?.message}
                        </small>
                      )}

                      <label
                        htmlFor="floatingSelect1"
                        className="mx-2 fw-bolder mb-4"
                      >
                        Select Delivery Options
                      </label>
                    </div>

                    <div className="form-floating col-4 mb-4">
                      <input
                        type="text"
                        className={classNames(
                          "form-control  border border-secondary signup_fields",
                          { "is-invalid": errors.comments }
                        )}
                        id="floatingAddreesComments"
                        placeholder="name@example.com"
                        name="comments"
                        {...register("comments", {
                          required: false,
                        })}
                      />
                      {errors.comments && (
                        <small className="errorText mx-1 fw-bold">
                          {errors.comments?.message}
                        </small>
                      )}
                      <label
                        htmlFor="floatingAddressComents"
                        className="mx-2 fw-bolder"
                      >
                        Order Comment
                      </label>
                    </div>

                    {products?.length > 0 && (
                      <div>
                        <table className="table mb-4">
                          <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                              <th>S.No.</th>
                              <th>Barcodes.</th>
                              <th>Product Name</th>
                              <th>Flavour Number</th>
                              <th>Quantity</th>
                              <th>comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(products || [])?.map((item, index) => (
                              <tr key={index} className="border ">
                                <td>{index + 1}</td>
                                <td className="border">{item?.barcodes[0]}</td>
                                <td className="border">{item?.unitName}</td>
                                <td className="border">{item?.flavour}</td>
                                <td className="border">{item?.quantity}</td>
                                <td className="border">{item?.comment}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {products?.length > 0 && (
                      <div className="col-12 text-center mb-2">
                        <button
                          className="comman_btn mx-2 fw-bold "
                          // onClick={() => {
                          //   setProducts([]);
                          //   setProductsV([]);
                          // }}
                          id="resetBtn"
                          type="reset"
                          style={{ backgroundColor: "#3e4093", color: "#fff" }}
                        >
                          Cancel
                        </button>

                        <Button
                          loading={loader}
                          appearance="primary"
                          className="comman_btn mx-2 fw-bold"
                          type="submit"
                          style={{ backgroundColor: "#3e4093", color: "#fff" }}
                        >
                          Create Order
                        </Button>
                      </div>
                    )}

                    <div className="border p-3 rounded bg-light">
                      <label className="fs-5 ">Select Products</label>
                      <div className="row">
                        <div className="form-floating col-6 mb-4">
                          <input
                            type="search"
                            className={classNames(
                              "form-control  border border-secondary signup_fields"
                            )}
                            id="floatingAddrees1"
                            placeholder="Type Barcode or Product Name"
                            name="addressLine1"
                            onChange={(e) => {
                              setKeySort(e.target.value);
                              searchProducts(e.target.value);
                            }}
                          />

                          <label
                            htmlFor="floatingAddress1"
                            className="mx-2 fw-bolder"
                          >
                            Search Product by Barcode or Product name
                          </label>
                        </div>

                        <div className="form-floating col-6 mb-4">
                          <input
                            type="search"
                            className={classNames(
                              "form-control  border border-secondary signup_fields"
                            )}
                            disabled={keySort?.length ? false : true}
                            id="floatingAddrees122"
                            placeholder="Type Barcode or Product Name"
                            name="addressLine1"
                            onChange={(e) => {
                              let key = e.target.value.toLowerCase();
                              if (key) {
                                setProductsV((prod) => {
                                  return prod.filter((itm) =>
                                    itm.type.flavour.toLowerCase().includes(key)
                                  );
                                });
                              } else {
                                searchProducts(keySort);
                              }
                            }}
                          />

                          <label
                            htmlFor="floatingAddress122"
                            className="mx-2 fw-bolder"
                          >
                            Filter by Flavours name
                          </label>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mb-4 bg-white">
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
                                {console.log(productsV)}
                                {!productsV?.length ? (
                                  <tbody className="border">
                                    <tr
                                      className="border"
                                      style={{
                                        width: "20rem",
                                      }}
                                    >
                                      <td className="border rounded">
                                        <span className="fs-5 bg-light p-2 px-3 rounded">
                                          Search Results .....
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                ) : (
                                  <tbody className="border">
                                    {(productsV || [])?.map((item, index) => (
                                      <tr className="border text-center mt-5">
                                        <td className="border rounded">
                                          <div className="col-auto">
                                            <span className="cart_product">
                                              <img
                                                src={
                                                  item?.type?._id
                                                    ? item?.type?.flavourImage
                                                    : item?.productId
                                                        ?.productImage
                                                }
                                                alt=""
                                              />
                                            </span>
                                          </div>
                                        </td>
                                        <td>
                                          <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                            <div className="col">
                                              <div className="cart_content ">
                                                <h3 className="fs-5 mt-4">
                                                  {item?.type?._id
                                                    ? item?.unitName +
                                                      "-" +
                                                      item?.type?.flavour
                                                    : item?.productId?.unitName}
                                                </h3>
                                                <p>
                                                  Barcodes:
                                                  {item?.type?.barcode
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
                                        <td className="border  ">
                                          <p className="fs-6 mt-5">
                                            {item?.vendorProduct?.promoComment?.slice(
                                              0,
                                              20
                                            ) ?? "No Comment"}
                                          </p>
                                        </td>
                                        <td className="border  ">
                                          <span className="fs-5 p-2  mt-5">
                                            <input
                                              type="number"
                                              style={{
                                                width: "100px",
                                              }}
                                              maxLength="4"
                                              id={item?.type?._id}
                                              name="price"
                                              defaultValue={1}
                                              className="border text-center mt-5 bg-light rounded"
                                              onChange={(e) => {
                                                handleChange(
                                                  item?.type?._id,
                                                  e
                                                );
                                              }}
                                            ></input>
                                          </span>
                                        </td>
                                        <td className="border rounded">
                                          <Button
                                            appearance="primary"
                                            className="comman_btn mx-2 fw-bold border rounded mt-5"
                                            style={{
                                              backgroundColor: "#3e4093",
                                              color: "#fff",
                                            }}
                                            onClick={() =>
                                              addProducts(
                                                item?._id,
                                                item?.type?._id,
                                                item?.unitName,
                                                item?.type?.flavour,
                                                item?.type?.barcode,
                                                item?.vendorProduct
                                                  ?.promoComment
                                              )
                                            }
                                          >
                                            + Add
                                          </Button>
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
                    </div>
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
