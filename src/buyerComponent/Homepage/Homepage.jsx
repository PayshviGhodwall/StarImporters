import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { BsFillStarFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../assets/css/main.css";
import AgeVerification from "../AgeVerification";
import { useEffect } from "react";
import TermsCondition from "./Terms&Condition";
import axios from "axios";
import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { charCountState } from "../../selecter.js";
import DOMPurify from "dompurify";

const Homepage = () => {
  const [allSlides, setAllSlides] = useState([]);
  const slidesApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeBanner/getSlides`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCategory`;
  const brandApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const [featured, setFeatured] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsCate, setProductsCate] = useState("hello");
  const ModalClose = document.getElementById("age_close");
  const modalCloseTerms = document.getElementById("terms_close");
  const navigate = useNavigate();
  const [text, setText] = useRecoilState(charCountState);
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");
  console.log(text);
  useEffect(() => {
    let x = document.cookie;
    let token = localStorage.getItem("token-user");
    if (!token) {
      if (x === "") {
        const modal = document.getElementById("age_modal");
        setTimeout(() => {
          modal.click();
        }, 1000);
      }
    }
    getSlides();
    getCategory();
    getBrands();
    AllProducts();
  }, []);
  const AllProducts = async () => {
    await axios.post(allProd).then((res) => {
      console.log(res);
      setFeatured(res?.data.results);
    });
  };
  const getSlides = async () => {
    await axios.get(slidesApi).then((res) => {
      setAllSlides(res?.data.results);
    });
  };
  const getCategory = async () => {
    await axios.get(categoryApi).then((res) => {
      setCategory(res?.data.results);
    });
  };
  const getBrands = async () => {
    await axios.get(brandApi).then((res) => {
      setBrands(res?.data.results);
    });
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className="home_page">
      <Navbar />

      <section className="home">
        <div
          id="carouselExampleControls"
          className="carousel slide auto"
          data-bs-ride="carousel"
          data-interval="3000"
        >
          <div className="carousel-inner banner_box">
            <div className="carousel-item active ">
              <img
                src={allSlides[0]?.banner}
                className="d-block w-100 banner_slide"
                alt=""
              />
              <div className="carousel-caption ">
                <h5
                  className="d-flex text-start  Bannertext"
                  dangerouslySetInnerHTML={createMarkup(allSlides[0]?.title)}
                ></h5>
                <p
                  className="d-flex text-start fs-6 bannerTxt"
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[0]?.description
                  )}
                ></p>

                <Link
                  to="/app/register"
                  className="text-decoration-none bannerTxt "
                  style={{ top: "10px" }}
                >
                  <button
                    className={
                      allSlides[0]?.banner ? "comman_btn22 d-flex" : "d-none"
                    }
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
            <div className="carousel-item ">
              <img
                src={allSlides[1]?.banner}
                className="d-block w-100 banner_slide"
                alt="No image"
              />
              <div className="carousel-caption banner-titles mx-3">
                <h5 className=" text-center  Bannertext">
                  {allSlides[1]?.title}
                </h5>

                <p className="d-flex text-center fs-6 bannerTxt">
                  {allSlides[1]?.description}
                </p>

                <Link
                  to="/app/register"
                  className="text-decoration-none bannerTxt "
                  style={{ top: "10px" }}
                >
                  <button
                    className={allSlides[1]?.banner ? "comman_btn22" : "d-none"}
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
            <div className="carousel-item ">
              <img
                src={allSlides[2]?.banner}
                className="d-block w-100 banner_slide"
                alt="..."
              />
              <div className="carousel-caption bannerTitle2">
                <h5 className=" text-end  Bannertext">{allSlides[2]?.title}</h5>
                <p className="fs-6 bannerTxt text-end ">
                  {allSlides[2]?.description}
                </p>

                <Link
                  to="/app/register"
                  className="d-flex justify-content-end text-decoration-none bannerTxt "
                  style={{ top: "10px" }}
                >
                  <button
                    className={allSlides[2]?.banner ? "comman_btn22" : "d-none"}
                  >
                    SignUp
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev "
            style={{ opacity: "100" }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <button
              className="carousel-control-prev-icon p-4 slideBtn "
              aria-hidden="true"
            ></button>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            style={{ opacity: "90" }}
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon p-4 slideBtn"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="featured_category mx-5 shadow pt-3 mb-5">
        <div className="col-12 comman_head mb-5  mt-2 text-center">
          <h2>Top Categories</h2>
        </div>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          navigation={true}
          autoplay={true}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay, Navigation]}
          className="mySwiper px-4 py-2"
        >
          {(category || [])?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="p-3 mb-2">
                <div className="text-center">
                  <Link
                    to={{
                      pathname: "/CategoryProducts",
                      search: "?sort=name",
                      hash: "#the-hash",
                    }}
                    state={{ name: item?.categoryName }}
                    className="featured__box text-center mt-5  text-decoration-none"
                  >
                    <img src={item?.categoryImage} className="" alt="lorem" />
                  </Link>
                </div>
                <span className="d-flex justify-content-center w-100 mt-2 ">
                  {item?.categoryName}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="viewAllBtn">
          View All <i class="fa fa-arrow-up-right-from-square"></i>
        </span>
      </section>
      <section className="features_products py-5 bg-white">
        <div className="container py-xl-3">
          <div className="col-12 comman_head mb-4 text-center">
            <h2>Featured Products</h2>
          </div>
          <div className="row">
            {(featured || [])
              ?.filter((item, idx) => idx < 8)
              .map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-4" key={index}>
                  <div
                    className="product_parts_box shadow"
                    onClick={() =>
                      navigate("/AllProducts/Product", {
                        state: {
                          id: item?._id,
                        },
                      })
                    }
                  >
                    <div className="partsproduct_img ">
                      <img
                        src={item?.productImage}
                        className="mt-3 mb-3"
                        alt="Product"
                      />
                    </div>
                    <div className="product_content mt-3 text-center">
                      <FontAwesomeIcon />
                      <Link
                        to=""
                        style={{
                          textDecoration: "none",
                          color: "#3e4093",
                          fontWeight: "600",
                          fontFamily: "poppins",
                        }}
                      >
                        {item?.unitName}
                      </Link>
                      <div className="rating_box mt-2 mb-1">
                        <Link className="mx-1">
                          <BsFillStarFill color=" #FFCC00  " />
                        </Link>
                        <Link className="mx-1">
                          <BsFillStarFill color=" #FFCC00  " />
                        </Link>
                        <Link className="mx-1">
                          <BsFillStarFill color=" #FFCC00  " />
                        </Link>
                        <Link className="mx-1">
                          <BsFillStarFill color=" #FFCC00  " />
                        </Link>
                        <Link className="mx-1">
                          <BsFillStarFill color=" #CACACA" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="product_show_home">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="w-100 mb-5">
                <img src={require("../../assets/img/cigars_img.png")} alt="" />
              </div>
              <Link
                className="comman_btn2 text-decoration-none"
                href="product.html"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="features_brands py-5 bg-white border-top">
        <div className="container-fluid px-0">
          <div className="col-lg-12 col-sm-12 comman_head mb-4 text-center">
            <h2>Popular Brands</h2>
          </div>
          <div className="col-sm-12">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              loop={true}
              navigation={true}
              autoplay={true}
              modules={[FreeMode, Pagination, Autoplay, Navigation]}
              className="mySwiper row px-4 py-2"
            >
              {(brands || [])?.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link
                    to="/app/brands"
                    state={"hisds"}
                    className="brand_box col-sm-12 p-sm-4"
                  >
                    <img src={item?.brandImage} alt="" />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <Footer />
      <button
        type="button"
        id="age_modal"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal "
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog  modal-fullscreen">
          <div class="modal-content">
            <div class="modal-header modalHeadBg">
              <h2 className="fw-bold mt-1 mx-2">
                <img
                  src={require("../../assets/img/logo.png")}
                  width="170"
                  height="80"
                  alt="Brand"
                ></img>
              </h2>

              <button
                type="button"
                className="btn-close fs-2 bg-white mx-0 d-none"
                id="age_close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modalContent">
              <AgeVerification ModalClose={ModalClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
