import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
  const [quantity, setQuantity] = useState(1);
  const [typeObj, setTypeObj] = useState();
  const [categoryName, setCategoryName] = useState();
  const [flavour, setFlavour] = useState({
    flavour: "",
    flavourImage: "",
    flavourPrice: "",
  });
  let { id } = useParams();
  const navigate = useNavigate();

  let token = localStorage.getItem("token-user");

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
      setCategoryName(data?.results?.category);
    }
  };
  const getQuantity = (type) => {
    if (type === "add") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 0) setQuantity(quantity - 1);
    }
  };

  const addToCartt = async () => {
    if (flavour) {
      const formData = {
        productId: id,
        quantity: quantity,
        flavour: typeObj ? typeObj : {},
      };
      console.log(formData);
      const { data } = await addToCart(formData);
      if (!data.error) {
        navigate("/app/cart");
      }
    } else {
      Swal.fire({
        title: "Select Any Flavour/Packsize!",
        icon: "error",
        button: "Ok",
      });
    }
  };
  const AddtoQuotess = async () => {
    if (flavour.flavour) {
      const formData = {
        productId: id,
        quantity: quantity,
        flavour: typeObj ? typeObj : {},
      };
      console.log(formData);
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
  const getFlavour = (index) => {
    const flavourData = productDetail?.type.map((option) => option);
    console.log(flavourData);
    setTypeObj(flavourData[index]);
    if (flavour.flavour === flavourData[0].flavour) {
      setFlavour({
        flavour: "",
        flavourImage: "",
      });
    } else
      setFlavour({
        flavour: flavourData[index].flavour,
        flavourImage: flavourData[index].flavourImage,
      });
  };
  const addToFav = async () => {
    await axios
      .post(addFav, {
        productId: productDetail?._id,
      })
      .then((res) => {
        toast.success(res?.data?.message);
      });
    getProductDetail();
    setHeart(!heart);
  };
  const rmvFromFav = async () => {
    await axios
      .post(rmvFav, {
        productId: productDetail._id,
      })
      .then((res) => {
        toast.error(res?.data?.message);
      });
    getProductDetail();
    setHeart(!heart);
  };
  console.log(flavour);

  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea">
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/home">
                <i class="fa-solid fa-arrow-left-long"></i>
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
        <WebHeader2 />

        <div className="page-content-wrapper">
          <div className="product-slide-wrapper">
            {productDetail?.productImage ? (
              <OwlCarousel
                className=" product-slides "
                autoplay={true}
                autoplayHoverPause={false}
                autoplayTimeout={5000}
                dots={false}
                loop={true}
                nav={false}
                fade={false}
                items={1}
              >
                <div className="single-product-slide item">
                  <img
                    src={productDetail?.productImage}
                    id="productMainImg"
                    alt=""
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
            <div className="product-title-meta-data bg-white mb-3 py-3">
              <div className="container d-flex justify-content-between rtl-flex-d-row-r">
                <div className="p-title-price">
                  <h5 className="mb-1">{productDetail?.unitName}</h5>
                </div>
                <div className="p-wishlist-share">
                  <Link>
                    {productDetail?.favourities ? (
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
              </div>
              <div className="product-ratings">
                <div className="container d-flex flex-wrap align-items-center justify-content-between rtl-flex-d-row-r">
                  <div className="ratings">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span className="ps-1">3 ratings</span>
                  </div>
                  <div className="total-result-of-ratings">
                    <span>5.0</span>
                    <span>Very Good</span>
                  </div>
                  <form className="cart-form mt-3 w-100" action="#" method="">
                    <div className="order-plus-minus d-flex align-items-center">
                      <div
                        className="quantity-button-handler"
                        onClick={() => getQuantity("sub")}
                      >
                        -
                      </div>
                      <input
                        className="form-control cart-quantity-input"
                        type="number"
                        step="1"
                        name="quantity"
                        value={quantity}
                      />
                      <div
                        className="quantity-button-handler"
                        onClick={() => getQuantity("add")}
                      >
                        +
                      </div>
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
                      {productDetail?.type?.map((item, index) => (
                        <Link
                          className=""
                          to=""
                          onClick={() => {
                            document.getElementById("productMainImg").src =
                              item?.flavourImage;
                            setFlavour(item?.flavour);
                            setTypeObj(item);
                          }}
                        >
                          {item?.flavour}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cart-form-wrapper bg-white mb-3 py-3">
              <div className="container">
                <div className="">
                  {token ?
                   <Link
                   className="comman_btn mb-2"
                   to=""
                   onClick={() => addToCartt()}
                 >
                   Add Cart to Order
                 </Link>
                 :
                 <Link
                 className="comman_btn mb-2"
                 to="/app/login"
                 
               >
                 Please Login to see price.
               </Link>
                  }
                 
                  {userDetail?.quotation === true ? (
                    <button
                      className="comman_btn2"
                      type="submit"
                      onClick={() => AddtoQuotess()}
                    >
                      Add Request to Quotation
                    </button>
                  ) : null}
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
                        {typeObj
                          ? typeObj.description
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
