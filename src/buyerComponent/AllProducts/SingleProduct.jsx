import React from "react";
import Footer from "../Footer/Footer";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Swal from "sweetalert2";
import backGround from "../../assets/img/banner_img2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Grid } from "swiper";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Modal, ButtonToolbar, Button, Loader, Placeholder } from "rsuite";
import LoginPOP from "../Homepage/loginPOP";

const SingleProduct = () => {
  const width = window.innerWidth;
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
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [heart, setHeart] = useState();
  const [loaderM, setLoaderM] = useState(true);
  const GetChange = (data) => {
    setChange(data);
  };
  let { id } = useParams();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");

  let token = localStorage.getItem("token-user");
  const handleEntered = () => {
    setTimeout(() => setRows(80), 2000);
  };
  useEffect(() => {
    const userInfo = async () => {
      await axios.get(userData).then((res) => {
        setUserDetail(res?.data?.results);
      });
    };
    console.log(userDetail?.istobaccoLicenceExpired, "Keeiiii", product);
    userInfo();
    NewProducts();
  }, [change, id]);

  useEffect(() => {
    setFlavour(location?.state?.type);
    NewProducts();
    setTimeout(() => {
      setLoaderM(false);
    }, 5000);
  }, []);

  const getLoginCnfirm = (data) => {
    if (data?.length > 1) {
      setOpen(false);
      window.location.reload(false);
    }
  };

  const NewProducts = async () => {
    console.log(id?.slice(0, 1));
    await axios.get(getProduct + "/" + id.slice(1)).then((res) => {
      console.log(res);
      axios
        .post(similarProduct, {
          category: res.data?.results?.category?.categoryName,
        })
        .then((res) => {
          setSimProducts(res?.data.results);
        });
      setProduct(res?.data.results);
      location?.state?.type
        ? setFlavour(location?.state?.type)
        : setFlavour(res?.data.results.type[0]);
      setProductImages(res.data.results?.productImage);
      setProductImages({ ...productImages }, res.data.results?.type);
      setLoaderM(false);
    });
  };
  console.log(product?._id, "ddfsdf");

  const AddtoCart = async () => {
    if (product?.category?.isTobacco || product?.subCategory?.isTobacco) {
      if (userDetail?.istobaccoLicenceExpired) {
        Swal.fire({
          title: "Your Tobacco licence is Expired/Invalid!",
          text: "*Licence is Required for this product.",
          icon: "warning",
          confirmButtonText: "Okay",
        });
      } else {
        if (flavour) {
          setLoader(true);
          cartProduct.push(unitCount);

          await axios
            .post(addCart, {
              productId: product?._id,
              quantity: unitCount,
              flavour: flavour,
            })
            .then((res) => {
              if (res.data?.message === "Product Added") {
                setLoader(false);
                setSuccesMsg("Product added to Cart!");
                Swal.fire({
                  title: "Product Added to Cart",
                  icon: "success",
                  timer: 2000,
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText:
                    '<i class="fa fa-shopping-cart"></i> Cart!',
                  confirmButtonAriaLabel: "Thumbs up, Okay!",
                  cancelButtonText: "Close",
                }).then((res) => {
                  if (res.isConfirmed) {
                    navigate("/app/cart");
                  }
                });
                setNState(!NState);
              }
              if (res.data?.message === "Product modified") {
                setLoader(false);
                setSuccesMsg("Product added to Cart!");
                // document.getElementById("req-modal2").click();
                Swal.fire({
                  title: "Product Added to Cart",
                  icon: "success",
                  timer: 2000,
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: false,
                  confirmButtonText:
                    '<i class="fa fa-shopping-cart"></i> Cart!',
                  confirmButtonAriaLabel: "Thumbs up, Okay!",
                  cancelButtonText: "Close",
                }).then((res) => {
                  if (res.isConfirmed) {
                    navigate("/app/cart");
                  }
                });
                setNState(!NState);
              }
              if (res.data?.message === "Flavour is not available!") {
                setLoader(false);
                Swal.fire({
                  title: "Please Select Any Flavour!",
                  icon: "warning",
                  focusConfirm: false,
                  timer: 1000,
                });
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
          Swal.fire({
            title: "Please Select Any Flavour!",
            icon: "warning",
            focusConfirm: false,
            timer: 1000,
          });
        }
      }
    } else {
      if (flavour) {
        setLoader(true);
        cartProduct.push(unitCount);

        await axios
          .post(addCart, {
            productId: product?._id,
            quantity: unitCount,
            flavour: flavour,
          })
          .then((res) => {
            if (res.data?.message === "Product Added") {
              setLoader(false);
              setSuccesMsg("Product added to Cart!");
              setNState(!NState);
              Swal.fire({
                title: "Product Added to Cart",
                icon: "success",
                timer: 2000,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-shopping-cart"></i> Cart!',
                confirmButtonAriaLabel: "Thumbs up, Okay!",
                cancelButtonText: "Close",
              }).then((res) => {
                if (res.isConfirmed) {
                  navigate("/app/cart");
                }
              });
            }
            if (res.data?.message === "Flavour is not available!") {
              setLoader(false);
              Swal.fire({
                title: "Please Select Any Flavour!",
                icon: "warning",
                focusConfirm: false,
                timer: 1000,
              });
            }
            if (res.data?.message === "Product modified") {
              setLoader(false);
              setSuccesMsg("Product added to Cart!");
              // document.getElementById("req-modal2").click();
              Swal.fire({
                title: "Product Added to Cart",
                icon: "success",
                timer: 2000,
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-shopping-cart"></i> Cart!',
                confirmButtonAriaLabel: "Thumbs up, Okay!",
                cancelButtonText: "Close",
              }).then((res) => {
                if (res.isConfirmed) {
                  navigate("/app/cart");
                }
              });
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
                timer: 1000,
                focusConfirm: false,
              });
            }
          });
        setTimeout(() => {
          setLoader(false);
          setSuccesMsg();
        }, 3000);
      } else {
        Swal.fire({
          title: "Please Select Any Flavour!",
          icon: "warning",
          focusConfirm: false,
          timer: 1000,
        });
      }
    }
    setUnitCount(1);
  };

  const onHover = (image) => {
    console.log("Jii");
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

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product._id,
        flavour: flavour,
      })
      .then((res) => {
        if (!res.error) {
          setHeart(!heart);
          setChange(!change);

          Swal.fire({
            title: "Product Added to Wishlist.",
            icon: "success",
            text: "You can see your favorite products on My Wishlist.",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Please Login To Continue!",
            icon: "warning",
            button: "cool",
          }).then(() => navigate("/app/login"));
        }
      });
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product._id,
        flavour: flavour,
      })
      .then((res) => {
        if (!res.error) {
          setHeart(!heart);
          setChange(!change);
          Swal.fire({
            title: "Product Removed from Wishlist.",
            icon: "success",
            confirmButtonText: "Okay",
          });
        }
      });
  };

  return (
    <div className="">
      <Navbar NState={NState} GetChange={GetChange} LoginState={LoginState} />
      {loaderM ? (
        <div className="load_position">
          <div className="loader_new"></div>
        </div>
      ) : (
        <>
          <section
            className="comman_banner _banner marginTopSec"
            style={{
              backgroundImage: `url(${
                location?.state?.image ? location?.state?.image : backGround
              })`,
            }}>
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
                            className="text-decoration-none text-white fs-6  ">
                            Home <span className="arrow mx-1 ">&#9679;</span>{" "}
                          </Link>
                          <a
                            className="text-decoration-none text-white fs-6  "
                            onClick={() => {
                              navigate("/app/subCategories", {
                                state: {
                                  id: product?.category?._id,
                                  name: product?.category?.categoryName,
                                  image: product?.category?.background,
                                },
                              });
                            }}>
                            {product?.category?.categoryName}
                            <span className="arrow mx-1 ">&#9679;</span>
                          </a>
                          <a
                            className="text-decoration-none text-white fs-6  "
                            onClick={() => {
                              navigate(
                                `/Category/Sub-Category/${product?.subCategory?.slug}`,
                                {
                                  state: {
                                    name: product?.subCategory?.subCategoryName,
                                  },
                                }
                              );
                            }}>
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
            <section className="prdct_single_main comman_paddings">
              <div className="container">
                <div className="row comman_divvision mx-0">
                  <div className="col-md-6">
                    <div className="prdct_singleneww">
                      <a class="wishlist-btn">
                        {product?.favourite ? (
                          <i
                            class="fa fa-heart"
                            onClick={() => {
                              rmvFromFav();
                            }}
                            style={{
                              color: "#3e4093 ",
                              position: "relative",
                              top: "30px",
                              left: "6px",
                              fontSize: "1.4rem",
                            }}
                          />
                        ) : (
                          <i
                            class="fa fa-heart"
                            onClick={() => {
                              addToFav();
                            }}
                            style={{
                              color: "#E1E1E1 ",
                              position: "relative",
                              top: "30px",
                              left: "6px",
                              fontSize: "1.4rem",
                            }}
                          />
                        )}
                      </a>
                      <div className="row">
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
                        <ul className="list-unstyled thumbnails_box ">
                          <Swiper
                            slidesPerView={width <= 1400 ? 2 : 3}
                            loop={true}
                            autoplay={true}
                            modules={[
                              FreeMode,
                              Pagination,
                              Autoplay,
                              Navigation,
                            ]}
                            className="mySwiper">
                            <SwiperSlide>
                              <li className="box">
                                <a
                                  type="button"
                                  onMouseOver={() =>
                                    onHoverMain(product?.productImage)
                                  }
                                  onClick={() => {
                                    document.getElementById(
                                      "productMainImg"
                                    ).src =
                                      product?.productImage?.length >= 2
                                        ? product?.productImage
                                        : require("../../assets/img/product.jpg");

                                    setFlavour();
                                  }}>
                                  <img
                                    src={
                                      product?.productImage?.length >= 2
                                        ? product?.productImage
                                        : require("../../assets/img/product.jpg")
                                    }
                                    alt=""
                                  />
                                </a>
                              </li>
                            </SwiperSlide>
                            {(product?.type || [])
                              ?.filter(
                                (itm, idx) => itm?.flavourStatus === true
                              )
                              .map((item, index) => (
                                <SwiperSlide key={index} className="me-0 ms-1">
                                  <li className="image_button">
                                    <a
                                      key={index}
                                      type="button"
                                      onMouseOver={() => onHover(item)}
                                      onMouseOut={onMouseOut}
                                      onClick={() => {
                                        document.getElementById(
                                          "productMainImg"
                                        ).src =
                                          item?.flavourImage?.length >= 2
                                            ? item?.flavourImage
                                            : require("../../assets/img/product.jpg");
                                        document.getElementById(
                                          "productMainImg"
                                        ).className = "selected-img";
                                        setFlavour(item);
                                        setUnitCount(1);
                                      }}>
                                      <img
                                        src={
                                          item?.flavourImage?.length >= 2
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
                          }>
                          <div className="prdct---falvor">
                            Flavour :{" "}
                            <a
                              href="javascript:;"
                              className="text-decoration-none fw-bolder">
                              {" "}
                              {errMsg ? errMsg : flavour?.flavour}
                            </a>
                          </div>

                          <div className="prdct---falvor">
                            Case Size :{" "}
                            <a
                              href="javascript:;"
                              className="text-decoration-none fw-bolder">
                              {" "}
                              {errMsg
                                ? errMsg
                                : flavour?.caseQty
                                ? flavour?.caseQty
                                : product?.caseSize || "Not Set"}
                            </a>
                          </div>
                        </div>
                        {flavour ? (
                          <div className="col-12">
                            <p className="fw-bold">
                              {flavour?.flavourPriceStatus
                                ? "Price : $" +
                                  (flavour?.flavourPrice
                                    ? flavour?.flavourPrice
                                    : " Not set")
                                : ""}
                            </p>
                          </div>
                        ) : null}
                        <div
                          className={
                            width <= 1400
                              ? "falvor_main mt-2 border rounded p-3 "
                              : "falvor_main mt-4 border rounded p-3 "
                          }>
                          <div className="row">
                            {(product?.type || [])
                              .filter((itm, idx) => itm.flavourStatus === true)
                              .sort((a, b) => {
                                return a.flavour.localeCompare(b.flavour);
                              })
                              .map((item, ind) => {
                                return flavour?.flavour === item?.flavour ? (
                                  <div
                                    className={
                                      width <= 1400
                                        ? "col-md-6 mb-lg-6 mb-md-6 mt-2"
                                        : "col-md-4 mb-lg-4 mb-md-3 mt-2"
                                    }>
                                    <a
                                      className="flavor_design selected_flavor text-decoration-none"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title={item?.flavour}
                                      key={ind}
                                      style={{
                                        cursor: "pointer",
                                        backgroundColor: "#3e4093",
                                      }}>
                                      {flavour?.flavour?.slice(0, 18)}
                                    </a>
                                  </div>
                                ) : (
                                  <div
                                    className={
                                      width <= 1400
                                        ? "col-md-6 mb-lg-6 mb-md-6 mt-2"
                                        : "col-md-4 mb-lg-4 mb-md-3 mt-2"
                                    }>
                                    <a
                                      className="flavor_design text-decoration-none btn-animate"
                                      key={ind}
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title={item?.flavour}
                                      onMouseMove={onMouseOut}
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        document.getElementById(
                                          "productMainImg"
                                        ).src =
                                          item?.flavourImage?.length >= 2
                                            ? item?.flavourImage
                                            : require("../../assets/img/product.jpg");

                                        setErrMsg();
                                        setTypeObj();
                                        setFlavour(item);
                                        setUnitCount(1);

                                        document.getElementById(
                                          "productMainImg"
                                        ).className = "selected-img";
                                      }}>
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
                                document
                                  .getElementById("quanInput")
                                  .stepDown(1);
                              }
                            }}>
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
                            }}>
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
                            onClick={AddtoCart}>
                            Add to Cart
                          </Button>
                        ) : (
                          <div
                            className="cartt--btn me-2 rounded mx-4"
                            style={{
                              color: "#FFF",
                              cursor: "pointer",
                              backgroundColor: "#eb3237",
                            }}
                            onClick={() => {
                              setOpen(true);
                            }}>
                            Please Login to add to cart!
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
                  className="mySwiper px-5 py-2">
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
                                navigate(`/AllProducts/Product/:${item?.slug}`);
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
                              navigate(`/AllProducts/Product/:${item?.slug}`);
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}>
                            {item?.unitName}
                          </span>
                        </a>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          </>
          <Footer />
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        onEntered={handleEntered}
        onExited={() => {
          setRows(0);
        }}
        size="lg"
        position="center">
        <Modal.Header>
          {/* <Modal.Title>Modal Title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          {rows ? (
            <div>
              <LoginPOP getLoginCnfirm={getLoginCnfirm} />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Loader size="md" />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SingleProduct;
