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

function AppProductDetail() {
  const [productDetail, setProductDetail] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [flavour, setFlavour] = useState({
    flavour: "",
    flavourImage: "",
    flavourPrice: "",
  });
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail();
  }, [flavour]);

  const getProductDetail = async () => {
    const { data } = await getProductDetaill(id);
    if (!data.error) {
      setProductDetail(data.results);
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
    const formData = {
      productId: id,
      quantity: quantity,
    };
    console.log(formData);
    const { data } = await addToCart(formData);
    if (!data.error) {
      navigate("/app/cart");
    }
  };
  const AddtoQuotess = async () => {
    const formData = {
      productId: id,
      quantity: quantity,
    };
    console.log(formData);
    const { data } = await addToQuote(formData);
    if (!data.error) {
      navigate("/app/quotes");
    }
  };
  const getFlavour = (index) => {
    const flavourData = productDetail?.type.map((option) => option);
    console.log(flavourData);
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
                  src={
                    flavour.flavourImage
                      ? flavour.flavourImage
                      : productDetail.productImage
                  }
                  alt=""
                />
              </div>
              <div className="single-product-slide item">
                <img
                  src={
                    flavour.flavourImage
                      ? flavour.flavourImage
                      : productDetail.productImage
                  }
                  alt=""
                />
              </div>
              <div className="single-product-slide item">
                <img
                  src={
                    flavour.flavourImage
                      ? flavour.flavourImage
                      : productDetail.productImage
                  }
                  alt=""
                />
              </div>
            </OwlCarousel>
          </div>
          <div className="product-description pb-3">
            <div className="product-title-meta-data bg-white mb-3 py-3">
              <div className="container d-flex justify-content-between rtl-flex-d-row-r">
                <div className="p-title-price">
                  <h5 className="mb-1">{productDetail.unitName}</h5>
                </div>
                <div className="p-wishlist-share">
                  <Link to="/app/wishlist">
                    <i className="fa-solid fa-heart"></i>
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
                    Flavor: {flavour.flavour}
                  </p>
                  <div className="row offers_box_main">
                    <div className="col-12 flavour_box py-2">
                      {productDetail?.type?.map((item, index) => (
                        <Link
                          className=""
                          to=""
                          onClick={() => getFlavour(index)}
                        >
                          {item.flavour}
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
                  <Link
                    className="comman_btn mb-2"
                    to=""
                    onClick={() => addToCartt()}
                  >
                    Add To Cart
                  </Link>
                  <button className="comman_btn2" type="submit" 
                    onClick={() => AddtoQuotess()}
                    >
                    Request Quotation
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-3"></div>
            {console.log(productDetail?.category?.categoryName)}
            <SimlarProduct
              categoryName={productDetail?.category?.categoryName}
            />
            <div className="rating-and-review-wrapper bg-white py-3 mb-3 dir-rtl">
              <div className="container">
                <h6>Ratings &amp; Reviews</h6>
                <div className="rating-review-content">
                  <ul className="ps-0">
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          Very good product. It's just amazing!
                        </p>
                        <span className="name-date">
                          Designing World 12 Dec 2022
                        </span>
                      </div>
                    </li>
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          Very excellent product. Love it.
                        </p>
                        <span className="name-date">
                          Designing World 8 Dec 2022
                        </span>
                      </div>
                    </li>
                    <li className="single-user-review d-flex">
                      <div className="user-thumbnail">
                        <img src="../assets/img/profile_img1.png" alt="" />
                      </div>
                      <div className="rating-comment">
                        <div className="rating">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                        </div>
                        <p className="comment mb-0">
                          What a nice product it is. I am looking it's.
                        </p>
                        <span className="name-date">
                          Designing World 28 Nov 2022
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="ratings-submit-form bg-white py-3 dir-rtl">
              <div className="container">
                <h6>Submit A Review</h6>
                <form action="#" method="">
                  <div className="stars mb-3">
                    <input
                      className="star-1"
                      type="radio"
                      name="star"
                      id="star1"
                    />
                    <label className="star-1" for="star1"></label>
                    <input
                      className="star-2"
                      type="radio"
                      name="star"
                      id="star2"
                    />
                    <label className="star-2" for="star2"></label>
                    <input
                      className="star-3"
                      type="radio"
                      name="star"
                      id="star3"
                    />
                    <label className="star-3" for="star3"></label>
                    <input
                      className="star-4"
                      type="radio"
                      name="star"
                      id="star4"
                    />
                    <label className="star-4" for="star4"></label>
                    <input
                      className="star-5"
                      type="radio"
                      name="star"
                      id="star5"
                    />
                    <label className="star-5" for="star5"></label>
                    <span></span>
                  </div>
                  <textarea
                    className="form-control mb-3"
                    id="comments"
                    name="comment"
                    cols="30"
                    rows="10"
                    data-max-length="200"
                    placeholder="Write your review..."
                  ></textarea>
                  <button className="comman_btn" type="submit">
                    Save Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductDetail;
