import React from "react";
import Footer from "../Footer/Footer";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import { useEffect } from "react";
import { Modal, Toggle, Button, ButtonToolbar, Placeholder } from "rsuite";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import backGround from "../../assets/img/banner_img2.jpg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SingleProdBySearch = () => {
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/product/getProduct`;
  const addCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/addProducts`;
  const addQuote = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/addQuote`;
  const similarProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/similarProduct`;
  const userData = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const [loader, setLoader] = useState(false);
  const [unitCount, setUnitCount] = useState(1);
  const [userDetail, setUserDetail] = useState([]);
  const [flavour, setFlavour] = useState();
  const [simProducts, setSimProducts] = useState([]);
  const [NState, setNState] = useState(0);
  const [LoginState, setLoginState] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [typeObj, setTypeObj] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [succesMsg, setSuccesMsg] = useState("");
  const [change, setChange] = useState(false);
  let location = useLocation();
  const [errMsg, setErrMsg] = useState();
  const [objectId, setObjectID] = useState();

  const navigate = useNavigate();
  const GetChange = (data) => {
    setChange(data);
  };
  let { id } = useParams();

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");

  let token = localStorage.getItem("token-user");
  if (objectId !== location?.state?.id) {
    setObjectID(location?.state?.id);
    setFlavour(location?.state?.type);
  }

  useEffect(() => {
    const userInfo = async () => {
      await axios.get(userData).then((res) => {
        setUserDetail(res?.data?.results);
      });
    };

    const NewProducts = async () => {
      await axios.get(getProduct + "/" + objectId).then((res) => {
        axios
          .post(similarProduct, {
            category: res.data?.results?.category?.categoryName,
          })
          .then((res) => {
            setSimProducts(res?.data.results);
          });

        setProduct(res?.data.results);
        setProductImages(res.data.results?.productImage);
        setProductImages({ ...productImages }, res.data.results?.type);
      });
    };

    userInfo();
    NewProducts();
  }, [change, objectId]);

  console.log(unitCount);
  const AddtoCart = async () => {
    if (product?.category?.isTobacco || product?.subCategory?.isTobacco) {
      if (!userDetail?.istobaccoLicenceExpired) {
        if (flavour) {
          setLoader(true);
          cartProduct.push(objectId);
          await axios
            .post(addCart, {
              productId: cartProduct[0],
              quantity: unitCount,
              flavour: flavour,
            })

            .then((res) => {
              if (res.data?.message === "Product Added") {
                setLoader(false);
                setSuccesMsg("Product added to Cart!");
                setCartProduct([]);
                setNState(!NState);
              }
              if (res.data?.message === "Product modified") {
                setLoader(false);
                setSuccesMsg("Product added to Cart!");
                // document.getElementById("req-modal2").click();

                setNState(!NState);
              }
            })
            .catch((err) => {
              if (
                err.response?.data?.message ===
                "Access Denied. No token provided."
              ) {
                setLoader(false);
                Swal.fire({
                  title: "Please Login to your Account!",
                  icon: "error",
                  focusConfirm: false,
                });
              }
              if (
                err.response?.data?.message === "You are not Authenticated Yet"
              ) {
                setLoader(false);
                Swal.fire({
                  title: "Please Login to your Account!",
                  icon: "error",
                  focusConfirm: false,
                });
              }
              if (err.response?.data.message === "") {
                setLoader(false);
                Swal.fire({
                  title: "Product is already in Cart!",
                  icon: "error",
                  focusConfirm: false,
                });
              }
            });
          setTimeout(() => {
            setLoader(false);
            setSuccesMsg();
          }, 3000);
        } else {
          document.getElementById("flavour_box").className =
            "offers_box_main_afterSelect ";
          setErrMsg("Please Select a Flavour.");
        }
      } else {
        Swal.fire({
          title: "Your Tobacco licence is Expired/Invalid!",
          text: "*Licence is Required for this product.",
          icon: "warning",
          confirmButtonText: "Okay",
        });
      }
    } else {
      if (flavour) {
        setLoader(true);
        cartProduct.push(objectId);
        cartProduct.push(unitCount);

        await axios
          .post(addCart, {
            productId: cartProduct[0],
            quantity: unitCount,
            flavour: flavour,
          })
          .then((res) => {
            if (res.data?.message === "Product Added") {
              setLoader(false);
              setSuccesMsg("Product added to Cart!");

              setNState(!NState);
            }
            if (res.data?.message === "Product modified") {
              setLoader(false);
              setSuccesMsg("Product added to Cart!");
              // document.getElementById("req-modal2").click();
            }
          })
          .catch((err) => {
            if (
              err.response?.data?.message ===
              "Access Denied. No token provided."
            ) {
              setLoader(false);
              Swal.fire({
                title: "Please Login to your Account!",
                icon: "error",
                focusConfirm: false,
              });
            }
            if (
              err.response?.data?.message === "You are not Authenticated Yet"
            ) {
              setLoader(false);
              Swal.fire({
                title: "Please Login to your Account!",
                icon: "error",
                focusConfirm: false,
              });
            }
            if (err.response?.data.message === "") {
              setLoader(false);
              Swal.fire({
                title: "Product is already in Cart!",
                icon: "error",
                focusConfirm: false,
              });
            }
          });
        setTimeout(() => {
          setLoader(false);
          setSuccesMsg();
        }, 3000);
      } else {
        document.getElementById("flavour_box").className =
          "offers_box_main_afterSelect ";
        setErrMsg("Please Select a Flavour.");
      }
    }
    setUnitCount(1);
  };
  const onHover = (image) => {
    document.getElementById("productMainImg").src = image?.flavourImage
      ? image?.flavourImage
      : require("../../assets/img/product.jpg");
    document.getElementById("productMainImg").className = "selected-img";
    setFlavour(image);
    setUnitCount(1);
  };
  const onHoverMain = (image) => {
    document.getElementById("productMainImg").src = image
      ? image
      : require("../../assets/img/product.jpg");
    setFlavour();
    setUnitCount(1);
  };
  const onMouseOut = () => {
    document.getElementById("productMainImg").className = "d-block";
  };
  return (
    <div className="">
      <Navbar NState={NState} GetChange={GetChange} LoginState={LoginState} />

      <section
        className="comman_banner _banner marginTopSec"
        style={{
          backgroundImage: `url(${
            location?.state.image ? location?.state.image : backGround
          })`,
        }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <h1>{product?.unitName}</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-1 ">&#9679;</span>{" "}
                      </Link>
                      <a className="text-decoration-none text-white fs-6  ">
                        {product?.category?.categoryName}
                        <span className="arrow mx-1 ">&#9679;</span>
                      </a>
                      <a className="text-decoration-none text-white fs-6  ">
                        {product?.subCategory?.subCategoryName}
                        <span className="arrow mx-1 ">&#9679;</span>
                      </a>
                      <a className="text-decoration-none text-white fs-6  ">
                        {product?.unitName}
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section className="prdct_single_main comman_padding">
          <div className="container">
            <div className="row comman_divvision mx-0">
              <div className="col-md-6">
                <div className="prdct_singleneww">
                  <div className="prdct_singleshowimg">
                    <Zoom>
                      <img
                        src={
                          flavour?.flavour
                            ? flavour?.flavourImage ||
                              require("../../assets/img/product.jpg")
                            : product?.productImage ||
                              require("../../assets/img/product.jpg")
                        }
                        id="productMainImg"
                        alt="..."
                      />
                    </Zoom>
                  </div>
                  <ul className="list-unstyled p-0 m-0">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={5}
                      loop={true}
                      navigation={true}
                      autoplay={true}
                      modules={[FreeMode, Pagination, Autoplay, Navigation]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <li>
                          <a
                            type="button"
                            onMouseOver={() =>
                              onHoverMain(product?.productImage)
                            }
                            onClick={() => {
                              document.getElementById("productMainImg").src =
                                product?.productImage
                                  ? product?.productImage
                                  : require("../../assets/img/product.jpg");

                              setFlavour();
                            }}
                          >
                            <img
                              src={
                                product?.productImage
                                  ? product?.productImage
                                  : require("../../assets/img/product.jpg")
                              }
                              alt=""
                            />
                          </a>
                        </li>
                      </SwiperSlide>
                      {(product?.type || [])?.map((item, index) => (
                        <SwiperSlide key={index} className="me-0 ms-1">
                          <li className="image_button">
                            <a
                              key={index}
                              type="button"
                              onMouseOver={() => onHover(item)}
                              onMouseOut={onMouseOut}
                              onClick={() => {
                                document.getElementById("productMainImg").src =
                                  item?.flavourImage
                                    ? item?.flavourImage
                                    : require("../../assets/img/product.jpg");
                                document.getElementById(
                                  "productMainImg"
                                ).className = "selected-img";
                                setFlavour(item);
                                setUnitCount(1);
                              }}
                            >
                              <img
                                src={
                                  item?.flavourImage
                                    ? item?.flavourImage
                                    : require("../../assets/img/product.jpg")
                                }
                                alt=""
                              />
                            </a>
                          </li>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </ul>
                </div>
              </div>
              <div className="col-md-6 ps-lg-5 ps-md-4">
                <div className="prdct_comtenT">
                  <h2>{product?.unitName}</h2>
                  <div className="prdct_comtenT_falvor">
                    <div
                      className={
                        errMsg
                          ? "col-12 offers_head text-danger"
                          : "col-12 offers_head "
                      }
                    >
                      <div className="prdct---falvor">
                        Flavour:{" "}
                        <a href="javascript:;" className="text-decoration-none">
                          {" "}
                          {errMsg ? errMsg : flavour?.flavour}
                        </a>
                      </div>
                    </div>
                    {flavour ? (
                      <div className="col-12">
                        <p className="fw-bold">
                          {flavour?.flavourPriceStatus
                            ? "Price : $" + flavour?.flavourPrice
                            : null}
                        </p>
                      </div>
                    ) : null}
                    <div className="falvor_main mt-4">
                      <div className="row m-1">
                        {(product?.type || []).map((item, ind) => {
                          return flavour?.flavour === item?.flavour ? (
                            <div className="col-md-4 mb-lg-4 mb-md-3">
                              <a
                                className="flavor_design selected_flavor text-decoration-none"
                                key={ind}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={item?.flavour}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#3e4093",
                                }}
                              >
                                {flavour?.flavour?.slice(0, 18)}
                              </a>
                            </div>
                          ) : (
                            <div className="col-md-4 mb-lg-4 mb-md-3">
                              <a
                                className="flavor_design text-decoration-none"
                                key={ind}
                                onMouseMove={onMouseOut}
                                data-toggle="tooltip"
                                data-placement="top"
                                title={item?.flavour}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  document.getElementById(
                                    "productMainImg"
                                  ).src = item?.flavourImage;

                                  setErrMsg();
                                  setTypeObj();
                                  setFlavour(item);
                                  setUnitCount(1);
                                  document.getElementById(
                                    "flavour_box"
                                  ).className = "offers_box_main ";
                                  document.getElementById(
                                    "productMainImg"
                                  ).className = "selected-img";
                                }}
                              >
                                <span>{item?.flavour?.slice(0, 18)}</span>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="prdct_bottom mt-3 d-flex align-items-center">
                    <div className="number">
                      <span
                        className="minus"
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          if (unitCount > 1) {
                            setUnitCount(unitCount - 1);
                            document.getElementById("quanInput").stepDown(1);
                          }
                        }}
                      >
                        -
                      </span>
                      <input
                        type="number"
                        id="quanInput"
                        value={unitCount}
                        onChange={(e) => setUnitCount(e.target.value)}
                      />
                      <span
                        className="plus"
                        style={{ userSelect: "none" }}
                        onClick={() => {
                          document.getElementById("quanInput").stepUp(1);
                          setUnitCount(+unitCount + 1);
                        }}
                      >
                        +
                      </span>
                    </div>
                    {token ? (
                      <Button
                        className="cartt--btn  ms-3"
                        loading={loader}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#3e4093",
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "500px",
                          padding: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                        onClick={AddtoCart}
                      >
                        Add to Cart
                      </Button>
                    ) : (
                      <div
                        className="cartt--btn me-2 rounded  mx-2"
                        style={{
                          color: "#FFF",
                          cursor: "pointer",
                          backgroundColor: "#eb3237",
                        }}
                        onClick={() => {
                          setLoginState(!LoginState);
                        }}
                      >
                        Please Login to Add to cart!
                      </div>
                    )}
                  </div>
                  <p className="text-success fw-bold">
                    {" "}
                    <i className="'fas fa-check-circle'"> </i>
                    {succesMsg}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="Product_single_page">
        <div className="container-fluid card">
          <div className="row mx-0 bg-white p-xl-5 p-lg-4 p-md-4 p-3 ">
            <div className="col-lg-6 px-md-3 px-0 ">
              <div className="product_show ">
                <div
                  id="carouselExampleIndicators"
                  className="carousel p-2"
                  data-bs-touch="false"
                  data-bs-interval="false"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-slider">
                    <div className="carousel-indicators ">
                      <button
                        type="button"
                        className="flavours"
                        onMouseOver={() => onHoverMain(product?.productImage)}
                        onClick={() => {
                          document.getElementById("productMainImg").src =
                            product?.productImage
                              ? product?.productImage
                              : require("../../assets/img/product.jpg");

                          setFlavour();
                        }}
                      >
                        <img
                          src={
                            product?.productImage
                              ? product?.productImage
                              : require("../../assets/img/product.jpg")
                          }
                          alt=""
                        />
                      </button>
                      <div>
                        {(product?.type || []).map((item, index) => (
                          <button
                            key={index}
                            className="flavours"
                            type="button"
                            onMouseOver={() => onHover(item)}
                            onMouseOut={onMouseOut}
                            onClick={() => {
                              document.getElementById("productMainImg").src =
                                item?.flavourImage
                                  ? item?.flavourImage
                                  : require("../../assets/img/product.jpg");
                              document.getElementById(
                                "productMainImg"
                              ).className = "selected-img";
                              setFlavour(item);
                              setUnitCount(1);
                            }}
                          >
                            <img
                              src={
                                item?.flavourImage
                                  ? item?.flavourImage
                                  : require("../../assets/img/product.jpg")
                              }
                              className="flavour_box_img"
                              alt=""
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="productimg_show">
                        <img
                          src={
                            flavour?.flavour
                              ? flavour?.flavourImage ||
                                require("../../assets/img/product.jpg")
                              : product?.productImage ||
                                require("../../assets/img/product.jpg")
                          }
                          id="productMainImg"
                          className="d-block"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-lg-0 px-md-3 px-0 mt-md-5 mt-4 mb-5">
              <div className="product_details_main ps-xl-5">
                <div className="row align-items-start">
                  <div className="col">
                    <div className="product_details_text">
                      <div className="row border-bottom pb-4">
                        <div className="col-12">
                          <h1>{product?.unitName}</h1>
                        </div>
                        <div className="col-12">
                          <div className="row offers_box pt-3 pb-3 border-0">
                            <div
                              className={
                                errMsg
                                  ? "col-12 offers_head text-danger"
                                  : "col-12 offers_head "
                              }
                            >
                              <strong>
                                Flavor :{" "}
                                {errMsg ? (
                                  <i className="fa fa-warning mx-2"></i>
                                ) : null}
                                {errMsg ? errMsg : flavour?.flavour}{" "}
                              </strong>
                            </div>
                            <div
                              className="col-lg-11"
                              style={{ marginLeft: "12px" }}
                            >
                              <div
                                className="row offers_box_main "
                                id="flavour_box"
                              >
                                <div
                                  className="col-lg-12 flavour_box p-2"
                                  style={{ border: "none" }}
                                >
                                  {(product?.type || []).map((item, ind) => {
                                    return flavour?.flavour ===
                                      item?.flavour ? (
                                      <a
                                        className=" text-decoration-none text-white"
                                        key={ind}
                                        style={{
                                          cursor: "pointer",
                                          backgroundColor: "#3e4093",
                                        }}
                                      >
                                        {flavour?.flavour}
                                      </a>
                                    ) : (
                                      <a
                                        className=" text-decoration-none"
                                        key={ind}
                                        onMouseMove={onMouseOut}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          document.getElementById(
                                            "productMainImg"
                                          ).src = item?.flavourImage;

                                          setErrMsg();
                                          setTypeObj();
                                          setFlavour(item);
                                          setUnitCount(1);
                                          document.getElementById(
                                            "flavour_box"
                                          ).className = "offers_box_main ";
                                          document.getElementById(
                                            "productMainImg"
                                          ).className = "selected-img";
                                        }}
                                      >
                                        <span>{item.flavour}</span>
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {flavour ? (
                          <div className="col-12">
                            <p className="fw-bold">
                              {flavour?.flavourPriceStatus
                                ? "Price : $" + flavour?.flavourPrice
                                : null}
                            </p>
                          </div>
                        ) : null}
                        <div className="col-12 quantity_box d-flex align-items-center mt-md-3 mb-md-2">
                          <div className="number me-md-4 mb-md-0 mb-3">
                            <span
                              className="minus"
                              style={{ userSelect: "none" }}
                              onClick={() => {
                                if (unitCount > 1) {
                                  setUnitCount(unitCount - 1);
                                  document
                                    .getElementById("quanInput")
                                    .stepDown(1);
                                }
                              }}
                            >
                              <i
                                class="fa fa-minus fs-6"
                                aria-hidden="true"
                              ></i>
                            </span>
                            <input
                              type="number"
                              id="quanInput"
                              className=" p-1 border rounded mx-2 quanityField"
                              value={unitCount}
                              onChange={(e) => setUnitCount(e.target.value)}
                            />
                            <span
                              className="plus"
                              style={{ userSelect: "none" }}
                              onClick={() => {
                                document
                                  .getElementById("quanInput")
                                  .stepUp(1);
                                setUnitCount(+unitCount + 1);
                              }}
                            >
                              <i
                                class="fa fa-plus fs-6"
                                aria-hidden="true"
                              ></i>
                            </span>
                          </div>
                        </div>
                        <p className="text-success fw-bold">{succesMsg}</p>
                        <div className="col-12 mt-3 ">
                          {token ? (
                            <Button
                              className="comman_btn me-2 rounded mb-1"
                              loading={loader}
                              style={{
                                cursor: "pointer",
                                backgroundColor: "#eb3237",
                                color: "#fff",
                                fontSize: "16px",
                                fontWeight: "500px",
                              }}
                              onClick={AddtoCart}
                            >
                              Add Cart to Order
                            </Button>
                          ) : (
                            <div
                              className="btn  me-2 rounded noHover"
                              style={{
                                color: "#FFF",
                                cursor: "pointer",
                                backgroundColor: "#eb3237",
                              }}
                              onClick={() => {
                                setLoginState(!LoginState);
                              }}
                            >
                              Please Login to add to cart!
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-auto product_details_btns">
                    <a className="fav_btn" href="javscript:;" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        <section class="product_describeee bg-white comman_padding">
          <div class="container">
            <div class="row comman_divvision mx-0">
              <div class="col-12 mb-3">
                <div class="comn_heads mb-5">
                  <h2>PRODUCT DESCRIPTION</h2>
                </div>
              </div>
              <div class="col-12">
                <div class="describe_main text-center">
                  <p>
                    {flavour
                      ? flavour?.description
                      : "Please Select Any Flavour/Type to see details."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="">
        <div className="container">
          <div className="row ">
            <div className="col-lg-12 mt-5 mb-5">
              <div className="col-12 comman_head text-center mb-3">
                <h2>Product Description</h2>
              </div>
              <div
                className="row p-5 text-secondary bg-white mb-5 shadow"
                style={{ background: "#eef3ff", fontSize: "20px" }}
              >
                <p>
                  {flavour
                    ? flavour?.description
                    : "Please Select Any Flavour/Type to see details."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        <section className="brandsnew SIMILAR_prrodct ">
          <div className="container mb-4">
            <div className="col-12 comman_head mt-1 mb-5 text-center ">
              <h2>Similar Products</h2>
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={35}
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper px-5 py-2"
            >
              {(simProducts || [])?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="p-3 mb-2">
                    <a href="javascript:;" class="categorynew_box">
                      <div class="categorynew_img">
                        <img
                          src={
                            item?.productImage
                              ? item?.productImage
                              : require("../../assets/img/product.jpg")
                          }
                          alt="Product"
                          onClick={() => {
                            navigate(`/AllProducts/Product/${item?._id}`, {
                              state: { id: item?._id },
                            });
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        />
                      </div>
                      <span
                        class="text-decoration-none"
                        onClick={() => {
                          navigate(`/AllProducts/Product/${item?._id}`, {
                            state: { id: item?._id },
                          });
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        {item?.unitName}
                      </span>
                    </a>
                    {/* <div className="text-center">
                    <div className="product_parts_box">
                      <div className="partsproduct_img">
                        <img
                          src={
                            item?.productImage
                              ? item?.productImage
                              : require("../../assets/img/product.jpg")
                          }
                          alt="Product"
                          onClick={() => {
                            navigate(`/AllProducts/Product/${item?._id}`, {
                              state: { id: item?._id },
                            });
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        />
                      </div>
                      <div className="product_content mt-3 text-center">
                        <a
                          onClick={() => {
                            navigate(`/AllProducts/Product/${item?._id}`, {
                              state: { id: item?._id },
                            });
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {item?.unitName}
                        </a>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </>
      <Footer />
    </div>
    // <div className="" style={{ background: "#eef3ff" }}>
    //   <Navbar NState={NState} GetChange={GetChange} LoginState={LoginState} />
    //   <section
    //     className="comman_banner _banner marginTop"
    //     style={{ backgroundImage: `url(${location?.state?.image})` }}
    //   >
    //     <div className="container ">
    //       <div className="row">
    //         <div className="col-12">
    //           <h1>{product?.unitName}</h1>
    //           <div className="breadcrumbs mt-2">
    //             <nav aria-label="breadcrumb">
    //               <ol className="breadcrumb mb-0">
    //                 <li className="item_nanner">
    //                   <Link
    //                     to="/app/home"
    //                     className="text-decoration-none text-white fs-6  "
    //                   >
    //                     Home <span className="arrow mx-1 mt-1">&#62;</span>{" "}
    //                   </Link>
    //                 </li>

    //                 <li className="breadcrumb-item" aria-current="page">
    //                   <Link
    //                     to=""
    //                     className="text-decoration-none text-white fs-6 mx-2"
    //                   >
    //                     {product?.unitName}
    //                   </Link>
    //                 </li>
    //               </ol>
    //             </nav>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    //   <>
    //     <section className="Product_single_page my-5">
    //       <div className="container-fluid card">
    //         <div className="row mx-0 bg-white p-xl-5 p-lg-4 p-md-4 p-3 ">
    //           <div className="col-lg-6 px-md-3 px-0 ">
    //             <div className="product_show">
    //               <div
    //                 id="carouselExampleIndicators"
    //                 className="carousel p-2"
    //                 data-bs-touch="false"
    //                 data-bs-interval="false"
    //                 data-bs-ride="carousel"
    //               >
    //                 <div className="carousel-slider">
    //                   <div className="carousel-indicators ">
    //                     <button
    //                       type="button"
    //                       className="flavours"
    //                       onMouseOver={() => onHoverMain(product?.productImage)}
    //                       onClick={() => {
    //                         document.getElementById("productMainImg").src =
    //                           product?.productImage
    //                             ? product?.productImage
    //                             : require("../../assets/img/product.jpg");
    //                         setFlavour();
    //                       }}
    //                     >
    //                       <img
    //                         src={
    //                           product?.productImage
    //                             ? product?.productImage
    //                             : require("../../assets/img/product.jpg")
    //                         }
    //                         alt=""
    //                       />
    //                     </button>
    //                     {(product?.type || []).map((item, index) => (
    //                       <button
    //                         key={index}
    //                         type="button"
    //                         className="flavours"
    //                         onMouseOut={onMouseOut}
    //                         onMouseOver={() => onHover(item)}
    //                         onClick={() => {
    //                           document.getElementById("productMainImg").src =
    //                             item?.flavourImage
    //                               ? item?.flavourImage
    //                               : require("../../assets/img/product.jpg");
    //                           setFlavour(item);
    //                           setUnitCount(1);
    //                         }}
    //                       >
    //                         <img
    //                           src={
    //                             item?.flavourImage
    //                               ? item?.flavourImage
    //                               : require("../../assets/img/product.jpg")
    //                           }
    //                           alt=""
    //                         />
    //                       </button>
    //                     ))}
    //                   </div>
    //                 </div>
    //                 <div className="carousel-inner">
    //                   <div className="carousel-item active">
    //                     <div className="productimg_show">
    //                       <img
    //                         src={
    //                           flavour?.flavour
    //                             ? flavour?.flavourImage ||
    //                               require("../../assets/img/product.jpg")
    //                             : product?.productImage ||
    //                               require("../../assets/img/product.jpg")
    //                         }
    //                         id="productMainImg"
    //                         className="d-block"
    //                         alt="..."
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="col-lg-6 mt-lg-0 px-md-3 px-0 mt-md-5 mt-4 mb-5">
    //             <div className="product_details_main ps-xl-5">
    //               <div className="row align-items-start">
    //                 <div className="col">
    //                   <div className="product_details_text">
    //                     <div className="row border-bottom pb-4">
    //                       <div className="col-12">
    //                         <h1>{product?.unitName}</h1>
    //                       </div>
    //                       <div className="col-12">
    //                         <div className="row offers_box pt-3 pb-3 border-0">
    //                           <div
    //                             className={
    //                               errMsg
    //                                 ? "col-12 offers_head text-danger"
    //                                 : "col-12 offers_head "
    //                             }
    //                           >
    //                             <strong>
    //                               Flavor :{" "}
    //                               {errMsg ? (
    //                                 <i className="fa fa-warning mx-2"></i>
    //                               ) : null}
    //                               {errMsg ? errMsg : flavour?.flavour}{" "}
    //                             </strong>
    //                           </div>
    //                           <div
    //                             className="col-lg-11"
    //                             style={{ marginLeft: "12px" }}
    //                           >
    //                             <div
    //                               className="row offers_box_main "
    //                               id="flavour_box"
    //                             >
    //                               <div
    //                                 className="col-lg-12 flavour_box p-2"
    //                                 style={{ border: "none" }}
    //                               >
    //                                 {(product?.type || []).map((item, ind) => {
    //                                   return flavour?.flavour ===
    //                                     item?.flavour ? (
    //                                     <a
    //                                       className=" text-decoration-none text-white"
    //                                       key={ind}
    //                                       style={{
    //                                         cursor: "pointer",
    //                                         backgroundColor: "#3e4093",
    //                                       }}
    //                                     >
    //                                       {flavour?.flavour}
    //                                     </a>
    //                                   ) : (
    //                                     <a
    //                                       className=" text-decoration-none"
    //                                       onMouseMove={onMouseOut}
    //                                       key={ind}
    //                                       style={{ cursor: "pointer" }}
    //                                       onClick={() => {
    //                                         document.getElementById(
    //                                           "productMainImg"
    //                                         ).src = item?.flavourImage;

    //                                         setErrMsg();
    //                                         setTypeObj();
    //                                         setFlavour(item);
    //                                         setUnitCount(1);
    //                                         document.getElementById(
    //                                           "flavour_box"
    //                                         ).className = "offers_box_main ";
    //                                         document.getElementById(
    //                                           "productMainImg"
    //                                         ).className = "selected-img";
    //                                       }}
    //                                     >
    //                                       {item.flavour}
    //                                     </a>
    //                                   );
    //                                 })}
    //                               </div>
    //                             </div>
    //                           </div>
    //                         </div>
    //                       </div>
    //                       {flavour ? (
    //                         <div className="col-12">
    //                           <p className="fw-bold">
    //                             {flavour?.flavourPriceStatus
    //                               ? "Price : $" + flavour?.flavourPrice
    //                               : null}
    //                           </p>
    //                         </div>
    //                       ) : null}
    //                       <div className="col-12 quantity_box d-md-flex align-items-center mt-md-3 mb-md-2">
    //                         <div className="number me-md-4 mb-md-0 mb-3">
    //                           <span
    //                             className="minus"
    //                             style={{ userSelect: "none" }}
    //                             onClick={() => {
    //                               if (unitCount > 1) {
    //                                 setUnitCount(unitCount - 1);
    //                                 document
    //                                   .getElementById("quanInput")
    //                                   .stepDown(1);
    //                               }
    //                             }}
    //                           >
    //                             <i
    //                               class="fa fa-minus fs-6"
    //                               aria-hidden="true"
    //                             ></i>
    //                           </span>
    //                           <input
    //                             type="number"
    //                             id="quanInput"
    //                             className=" p-1 border rounded mx-2 quanityField "
    //                             value={unitCount}
    //                             onChange={(e) => setUnitCount(e.target.value)}
    //                           />
    //                           <span
    //                             className="plus"
    //                             style={{ userSelect: "none" }}
    //                             onClick={() => {
    //                               // setUnitCount(unitCount + 1);
    //                               setUnitCount(+unitCount + 1);
    //                               document
    //                                 .getElementById("quanInput")
    //                                 .stepUp(1);
    //                             }}
    //                           >
    //                             <i
    //                               class="fa fa-plus fs-6"
    //                               aria-hidden="true"
    //                             ></i>
    //                           </span>
    //                         </div>
    //                       </div>
    //                       <p className="text-success fw-bold">{succesMsg}</p>
    //                       <div className="col-12 mt-3 ">
    //                         {token ? (
    //                           <Button
    //                             className="comman_btn me-2 rounded mb-1"
    //                             loading={loader}
    //                             style={{
    //                               cursor: "pointer",
    //                               backgroundColor: "#eb3237",
    //                               color: "#fff",
    //                               fontSize: "16px",
    //                               fontWeight: "500px",
    //                             }}
    //                             onClick={AddtoCart}
    //                           >
    //                             Add Cart to Order
    //                           </Button>
    //                         ) : (
    //                           <div
    //                             className="btn  me-2 rounded noHover"
    //                             style={{
    //                               color: "#FFF",
    //                               cursor: "pointer",
    //                               backgroundColor: "#eb3237",
    //                             }}
    //                             onClick={() => {
    //                               setLoginState(!LoginState);
    //                             }}
    //                           >
    //                             Please Login to add to cart!
    //                           </div>
    //                         )}

    //                         {/* {userDetail?.quotation === true ? (
    //                           <Button
    //                             className="comman_btn2"
    //                             style={{
    //                               cursor: "pointer",
    //                               backgroundColor: "#3e4093",
    //                               color: "#fff",
    //                               fontSize: "16px",
    //                               fontWeight: "500px",
    //                             }}
    //                             onClick={AddtoQuote}
    //                           >
    //                             Add Request to Quote
    //                           </Button>
    //                         ) : null} */}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="col-auto product_details_btns">
    //                   <a className="fav_btn" href="javscript:;" />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //     <section className="">
    //       <div className="container">
    //         <div className="row ">
    //           <div className="col-lg-12 mt-5 mb-5">
    //             <div className="col-12 comman_head text-center mb-3">
    //               <h2>Product Description</h2>
    //             </div>
    //             <div
    //               className="row p-5 text-secondary bg-white mb-5 shadow"
    //               style={{ background: "#eef3ff", fontSize: "20px" }}
    //             >
    //               <p>
    //                 {flavour
    //                   ? flavour?.description
    //                   : "Please Select Any Flavour/Type to see details."}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     <section className="features_products bg-white  w-100 ">
    //       <div className="container mb-5">
    //         <div className="col-12 comman_head mb-2 mt-5 text-center ">
    //           <h2>Similar Products</h2>
    //         </div>

    //         <Swiper
    //           slidesPerView={4}
    //           spaceBetween={35}
    //           loop={true}
    //           navigation={true}
    //           modules={[Pagination, Navigation]}
    //           className="mySwiper px-5 py-2"
    //         >
    //           {(simProducts || [])?.map((item, index) => (
    //             <SwiperSlide key={index}>
    //               <div className="p-3 mb-2">
    //                 <div className="text-center">
    //                   <div className="product_parts_box">
    //                     <div className="partsproduct_img">
    //                       <img
    //                         src={
    //                           item?.productImage
    //                             ? item?.productImage
    //                             : require("../../assets/img/product.jpg")
    //                         }
    //                         alt="Product"
    //                         onClick={() => {
    //                           navigate(`/AllProducts/Product/${item?._id}`, {
    //                             state: { id: item?._id },
    //                           });
    //                           window.scrollTo({
    //                             top: 0,
    //                             behavior: "smooth",
    //                           });
    //                         }}
    //                       />
    //                     </div>
    //                     <div className="product_content mt-3 text-center">
    //                       <a
    //                         onClick={() => {
    //                           navigate(`/AllProducts/Product/${item?._id}`, {
    //                             state: { id: item?._id },
    //                           });
    //                           window.scrollTo({
    //                             top: 0,
    //                             behavior: "smooth",
    //                           });
    //                         }}
    //                       >
    //                         {item?.unitName}
    //                       </a>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           ))}
    //         </Swiper>
    //       </div>
    //     </section>
    //   </>
    //   <Footer />
    // </div>
  );
};

export default SingleProdBySearch;
