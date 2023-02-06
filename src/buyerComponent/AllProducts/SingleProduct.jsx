import React from "react";
import Footer from "../Footer/Footer";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import { useEffect } from "react";
import { Button } from "rsuite";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";

const SingleProduct = () => {
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/product/getProduct`;
  const addCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/addToCart`;
  const addQuote = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/addQuote`;
  const similarProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/similarProduct`;
  const userData = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const [loader, setLoader] = useState(false);
  const [unitCount, setUnitCount] = useState(1);
  const [userDetail, setUserDetail] = useState([]);
  const [flavour, setFlavour] = useState();
  const [simProducts, setSimProducts] = useState([]);
  const [NState, setNState] = useState(false);
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
        console.log(res);
        axios
          .post(similarProduct, {
            category: res.data?.results?.category?.categoryName,
          })
          .then((res) => {
            setSimProducts(res?.data.results);
          });

        setProduct(res?.data.results);
        setFlavour(res?.data.results.type[0]);
        setProductImages(res.data.results?.productImage);
        setProductImages({ ...productImages }, res.data.results?.type);
      });
    };

    userInfo();
    NewProducts();
  }, [change, objectId]);

  const AddtoCart = async () => {
    if (flavour) {
      setLoader(true);
      cartProduct.push(objectId);
      cartProduct.push(unitCount);

      await axios
        .post(addCart, {
          productId: cartProduct[0],
          quantity: cartProduct[1],
          flavour: flavour,
        })
        .then((res) => {
          if (res.data?.message === "Product Added") {
            setLoader(false);
            setSuccesMsg("Product added to Cart!");

            setNState(true);
          }
          if (res.data?.message === "Product modified") {
            setLoader(false);
            setSuccesMsg("Product added to Cart!");
            // document.getElementById("req-modal2").click();

            setNState(true);
          }
        })
        .catch((err) => {
          if (
            err.response?.data?.message === "Access Denied. No token provided."
          ) {
            setLoader(false);
            Swal.fire({
              title: "Please Login to your Account!",
              icon: "error",
              focusConfirm: false,
            });
          }
          if (err.response?.data?.message === "You are not Authenticated Yet") {
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
  };
  const AddtoQuote = async () => {
    if (flavour) {
      cartProduct.push(objectId);
      cartProduct.push(unitCount);
      await axios
        .post(addQuote, {
          productId: cartProduct[0],
          quantity: cartProduct[1],
          flavour: flavour,
        })
        .then((res) => {
          if (res.data?.message === "Quote is Added") {
            setSuccesMsg("Product added to Quote!");
            // document.getElementById("req-modal").click();
          }
          if (res.data?.message === "Quote is already in Cart") {
            setSuccesMsg("Product added to Cart!");
            // document.getElementById("req-modal").click();
          }
        })
        .catch((err) => {
          if (
            err.response?.data?.message === "Access Denied. No token provided."
          ) {
            Swal.fire({
              title: "Please Login to your Account!",
              icon: "error",
              focusConfirm: false,
            });
          }
          if (err.response?.data?.message === "You are not Authenticated Yet") {
            Swal.fire({
              title: "Please Login to your Account!",
              icon: "error",
              focusConfirm: false,
            });
          }
          if (err.response?.data.message === "") {
            Swal.fire({
              title: "Product is already in Cart!",
              icon: "error",
              focusConfirm: false,
            });
          }
        });
      setTimeout(() => {
        setSuccesMsg();
      }, 3000);
    } else {
      document.getElementById("flavour_box").className =
        "offers_box_main_afterSelect ";
      setErrMsg("Please Select a Flavour.");
    }
  };

  return (
    <div className="" style={{ background: "#eef3ff" }}>
      <Navbar NState={NState} GetChange={GetChange} LoginState={LoginState} />
      <section
        className="comman_banner _banner marginTop"
        style={{ backgroundImage: `url(${location?.state.image})` }}
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
                        Home <span className="arrow mx-1 ">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="item_nanner">
                      <a className="text-decoration-none text-white fs-6  ">
                        {product?.category?.categoryName}{" "}
                        <span className="arrow mx-1">&#62;</span>{" "}
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <a className="text-decoration-none text-white fs-6 mx-2">
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
        <section className="Product_single_page my-5">
          <div className="container-fluid card">
            <div className="row mx-0 bg-white p-xl-5 p-lg-4 p-md-4 p-3 ">
              <div className="col-lg-6 px-md-3 px-0 ">
                <div className="product_show">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel "
                    data-bs-touch="false"
                    data-bs-interval="false"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-slider">
                      <div className="carousel-indicators ">
                        <button
                          type="button"
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
                        {(product?.type || []).map((item, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              document.getElementById("productMainImg").src =
                                item?.flavourImage
                                  ? item?.flavourImage
                                  : require("../../assets/img/product.jpg");
                              setFlavour(item);
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
                          </button>
                        ))}
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

                            <div className="ratee_part d-flex align-items-center mt-3">
                              <div className="rating_box">
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fa fa-star" />
                                </a>
                              </div>
                              <span>(216)</span>
                            </div>
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
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            document.getElementById(
                                              "productMainImg"
                                            ).src = item?.flavourImage;

                                            setErrMsg();
                                            setTypeObj();
                                            setFlavour(item);
                                            document.getElementById(
                                              "flavour_box"
                                            ).className = "offers_box_main ";
                                          }}
                                        >
                                          {item.flavour}
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
                          <div className="col-12 quantity_box d-md-flex align-items-center mt-md-3 mb-md-2">
                            <div className="number me-md-4 mb-md-0 mb-3">
                              <span
                                className="minus"
                                style={{ userSelect: "none" }}
                                onClick={() => {
                                  unitCount == 1
                                    ? setUnitCount(1)
                                    : setUnitCount(unitCount - 1);
                                }}
                              >
                                -
                              </span>
                              <input
                                type="text"
                                className="p-1"
                                disabled
                                value={unitCount}
                              />
                              <span
                                className="plus"
                                style={{ userSelect: "none" }}
                                onClick={() => {
                                  setUnitCount(unitCount + 1);
                                }}
                              >
                                +
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

                            {userDetail?.quotation === true ? (
                              <Button
                                className="comman_btn2"
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#3e4093",
                                  color: "#fff",
                                  fontSize: "16px",
                                  fontWeight: "500px",
                                }}
                                onClick={AddtoQuote}
                              >
                                Add Request to Quote
                              </Button>
                            ) : null}
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
        </section>
        <section className="">
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
        </section>

        <section className="features_products bg-white  w-100 ">
          <div className="container mb-5">
            <div className="col-12 comman_head mb-2 mt-5 text-center ">
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
                    <div className="text-center">
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
                          <div className="rating_box mt-2 mb-1">
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fa fa-star" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default SingleProduct;
