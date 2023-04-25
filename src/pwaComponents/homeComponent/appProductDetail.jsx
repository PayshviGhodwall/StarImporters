import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  addToQuote,
  getProductDetaill,
} from "../httpServices/homeHttpService/homeHttpService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import WebHeader2 from "./webHeader2";
import SimlarProduct from "./appSimilarProductComponent";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function AppProductDetail() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const userData = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const [heart, setHeart] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const [productDetail, setProductDetail] = useState("");
  const [FInd, setFInd] = useState();
  const [quantity, setQuantity] = useState(1);
  const [categoryName, setCategoryName] = useState();
  const [flavour, setFlavour] = useState();
  let { id } = useParams();
  const navigate = useNavigate();
  const [objectId, setObjectID] = useState();
  let token = localStorage.getItem("token-user");
  let location = useLocation();
  let ref = useRef();

  if (objectId !== id) {
    setObjectID(id);
    setFlavour(location?.state?.type);
  }

  useEffect(() => {
    getProductDetail();
    userInfo();
  }, [flavour, id]);

  const userInfo = async () => {
    await axios.get(userData).then((res) => {
      setUserDetail(res?.data?.results);
    });
  };
  const getProductDetail = async () => {
    const { data } = await getProductDetaill(id);
    if (!data.error) {
      setProductDetail(data.results);
      setCategoryName(data?.results?.category?.categoryName);
    }
  };
  console.log(categoryName);

  const addToCartt = async () => {
    if (
      productDetail?.category?.isTobacco ||
      productDetail?.subCategory?.isTobacco
    ) {
      if (!userDetail?.istobaccoLicenceExpired) {
        if (flavour) {
          const formData = {
            productId: id,
            quantity: quantity,
            flavour: flavour ? flavour : {},
          };
          console.log(formData);
          const { data } = await addToCart(formData);
          if (!data.error) {
            Swal.fire({
              title: "Product Added to Cart",
              icon: "success",
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
        } else {
          Swal.fire({
            title: "Select Any Flavour/Packsize!",
            icon: "error",
            button: "Ok",
          });
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
        const formData = {
          productId: id,
          quantity: quantity,
          flavour: flavour ? flavour : {},
        };
        console.log(formData);
        const { data } = await addToCart(formData);
        if (!data.error) {
          Swal.fire({
            title: "Product Added to Cart",
            icon: "success",
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
      } else {
        Swal.fire({
          title: "Select Any Flavour/Packsize!",
          icon: "error",
          button: "Ok",
        });
      }
    }
  };
  const AddtoQuotess = async () => {
    if (flavour) {
      const formData = {
        productId: id,
        quantity: quantity,
        flavour: flavour ? flavour : {},
      };
      const { data } = await addToQuote(formData);
      if (!data.error) {
        navigate("/app/quotes");
      }
    } else {
      Swal.fire({
        title: "Select Any Flavour/Packsize!",
        icon: "error",
        button: "Ok",
      });
    }
  };
  // const getFlavour = (index) => {
  //   const flavourData = productDetail?.type.map((option) => option);
  //   console.log(flavourData);
  //   setTypeObj(flavourData[index]);
  //   if (flavour.flavour === flavourData[0].flavour) {
  //     setFlavour({
  //       flavour: "",
  //       flavourImage: "",
  //     });
  //   } else
  //     setFlavour({
  //       flavour: flavourData[index].flavour,
  //       flavourImage: flavourData[index].flavourImage,
  //     });
  // };
  const addToFav = async () => {
    await axios
      .post(addFav, {
        productId: productDetail?._id,
        flavour: flavour?._id,
      })
      .then((res) => {
        Swal.fire({
          title: res?.data.message,
          button: "ok",
        });
      });
    getProductDetail();
    setHeart(!heart);
  };
  const rmvFromFav = async () => {
    await axios
      .post(rmvFav, {
        productId: productDetail._id,
        flavour: flavour?._id,
      })
      .then((res) => {
        Swal.fire({
          title: res?.data.message,
          button: "ok",
        });
      });
    getProductDetail();
    setHeart(!heart);
  };
  console.log(flavour);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      document.getElementById("closeModal").click();
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />

        {/* <div class="header-area" id="headerArea" ref={ref}>
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/home">
                <i className="fa-solid fa-house"></i>
              </Link>
            </div>
            <div class="page-heading">
              <h6 class="mb-0">Product Details</h6>
            </div>
            <div
              class="suha-navbar-toggler ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaOffcanvas"
              aria-controls="suhaOffcanvas"
            >
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <WebHeader2 /> */}

        <div className="page-content-wrapper">
          <div className="product-slide-wrapper">
            {productDetail ? (
              <OwlCarousel
                className=" product-slides "
                autoplay={true}
                autoplayHoverPause={false}
                autoplayTimeout={7000}
                dots={false}
                loop={true}
                nav={false}
                fade={false}
                items={1}
              >
                <div className="single-product-slide item">
                  <img
                    src={
                      flavour?.flavourImage
                        ? flavour?.flavourImage
                        : productDetail?.productImage
                    }
                  />
                </div>
                {productDetail?.type.map((item) => (
                  <div className="single-product-slide item">
                    <img
                      src={item?.flavourImage ? item?.flavourImage : null}
                      alt=""
                    />
                  </div>
                ))}
              </OwlCarousel>
            ) : (
              ""
            )}
          </div>
          <div className="product-description pb-3">
            <div className="product-title-meta-data bg-white mb-2 py-3">
              <div className="container d-flex justify-content-between rtl-flex-d-row-r">
                <div className="p-title-price">
                  <h5 className="">{productDetail?.unitName}</h5>
                </div>
                {token?.length ? (
                  <div className="p-wishlist-share">
                    <Link>
                      {productDetail?.favourite ? (
                        <i
                          class="fa fa-heart"
                          onClick={() => {
                            rmvFromFav();
                          }}
                          style={{ color: "#3e4093 " }}
                        />
                      ) : (
                        <i
                          class="fa fa-heart"
                          onClick={() => {
                            addToFav();
                          }}
                          style={{ color: "#E1E1E1 " }}
                        />
                      )}
                    </Link>
                  </div>
                ) : null}
              </div>
              <div className="product-ratings ">
                <div className="container d-flex flex-wrap align-items-center justify-content-between rtl-flex-d-row-r">
                  {flavour?.flavour ? (
                    <div className="col-12 mt-3">
                      <p className="fw-bold">
                        {flavour?.flavourPriceStatus
                          ? "Price : $" + flavour?.flavourPrice
                          : null}
                      </p>
                    </div>
                  ) : null}
                  <form className="cart-form w-100" action="#" method="">
                    <div className="order-plus-minus d-flex align-items-center">
                      <span
                        className="quantity-button-handler"
                        key={quantity}
                        onClick={() => {
                          if (quantity > 1) setQuantity(quantity - 1);
                        }}
                      >
                        -
                      </span>
                      <input
                        className="cart-quantity-input text-center"
                        type="number"
                        id="quanInput"
                        name="quantity"
                        max="9999"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <span
                        className="quantity-button-handler"
                        onClick={() => {
                          document.getElementById("quanInput").stepUp(1);
                          setQuantity(+quantity + 1);
                        }}
                      >
                        +
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="selection-panel bg-white mb-3 py-3">
              <div className="container">
                <div className="choose-color-wrapper">
                  <p className="mb-1 font-weight-bold">
                    Flavor: {flavour?.flavour}
                  </p>
                  <div className="row offers_box_main">
                    <div className="col-12 flavour_box py-2">
                      {productDetail?.type?.map((item, index) =>
                        flavour?.flavour === item?.flavour ? (
                          <Link
                            className="text-white"
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#3e4093",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setFlavour(item);
                              setFInd(index);
                              setQuantity(1);
                            }}
                          >
                            {item?.flavour}
                          </Link>
                        ) : (
                          <Link
                            className=""
                            onClick={(e) => {
                              e.preventDefault();
                              setFlavour(item);
                              setFInd(index);
                              setQuantity(1);
                            }}
                          >
                            {item?.flavour}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-form-wrapper bg-white mb-3 py-3">
              <div className="container">
                <div className="">
                  {token ? (
                    <button
                      className="comman_btn mb-2"
                      type="submit"
                      onClick={() => addToCartt()}
                    >
                      Add Cart to Order
                    </button>
                  ) : (
                    <Link className="comman_btn mb-2" to="/app/login">
                      Please Login to Add to Cart!.
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="selection-panel bg-white mb-3 py-3">
              <div className="container">
                <div className="choose-color-wrapper">
                  <p className="mb-1 font-weight-bold">Product Description :</p>
                  <div className="row offers_box_main">
                    <div className="col-12 flavour_box py-2">
                      <p>
                        {flavour?.flavour
                          ? flavour?.description
                          : "Please select any flavour to see details"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3">
              <SimlarProduct categoryName={categoryName} />
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductDetail;
