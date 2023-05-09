import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Grid } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../../assets/css/main.css";
import AgeVerification from "../AgeVerification";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DOMPurify from "dompurify";
// import Fade from "react-reveal/Fade";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
const Homepage = () => {
  const [allSlides, setAllSlides] = useState([]);
  const [allHeaders, setAllHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const slidesApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeBanner/getSlides`;
  const HeadersApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeBanner/getHeaders`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCategory`;
  const brandApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const [featured, setFeatured] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const ModalClose = document.getElementById("age_close");
  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");
  let token = localStorage.getItem("token-user");
  let NewUser = sessionStorage.getItem("new");
  console.log(NewUser);

  useEffect(() => {
    if (!token) {
      if (!NewUser) {
        setTimeout(() => {
          navigate("/app/verify");
        }, 2000);
      }
    }
    getSlides();
    getCategory();
    getHeaders();
    getBrands();
    AllProducts();
    setTimeout(() => {
      setLoading(false);
    }, 8000);
  }, []);

  let image = JSON.parse(localStorage?.getItem("imageBg"));
  const AllProducts = async () => {
    await axios
      .post(allProd, {
        page: activePage,
      })
      .then((res) => {
        console.log(res);
        if (!res.data.error) {
          setFeatured(res?.data.results.products);
          setLoading(false);
        }
      });
  };

  const getSlides = async () => {
    await axios.get(slidesApi).then((res) => {
      localStorage.setItem("slides", JSON.stringify(res?.data.results));
      setAllSlides(res?.data.results);
      setAllSlides(
        JSON.parse(localStorage.getItem("slides"))
          ? JSON.parse(localStorage.getItem("slides"))
          : res?.data.results
      );

      console.log(image?.bottomImage);
      var background =
        document.getElementById("bottom-image")?.style.backgroundImage;
      if (image) {
        background = `url(${image?.bottomImage})`;
      }
    });
  };

  const getHeaders = async () => {
    await axios.get(HeadersApi).then((res) => {
      setAllHeaders(res?.data.results?.headers[0]);
      localStorage.setItem(
        "imageBg",
        JSON.stringify(res?.data.results?.headers[0])
      );
    });
  };

  const getCategory = async () => {
    await axios
      .post(categoryApi, {
        page: 1,
      })
      .then((res) => {
        localStorage.setItem(
          "categories",
          JSON.stringify(res?.data.results?.categories)
        );
        if (!res.data.error) {
          setLoading(false);
          setCategory(res?.data.results?.categories);
        }
      });
  };

  const getBrands = async () => {
    await axios.get(brandApi).then((res) => {
      setBrands(res?.data.results);
      if (!res.data.error) {
        setLoading(false);
      }
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
      {loading ? (
        <div className="load_position">
          <div class="loader_new"></div>
        </div>
      ) : (
        <div>
          {/* <section className="home ">
            <div
              id="carouselExampleControls"
              className="carousel slide "
              data-bs-ride="carousel"
              data-interval="8000"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="5"
                  aria-label="Slide 6"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide-to="6"
                  aria-label="Slide 7"
                ></button>
              </div>
              <div className="carousel-inner banner_box">
                <div className="carousel-item active">
                  <img
                    src={allSlides[1]?.banner ? allSlides[1]?.banner : ""}
                    className="d-block w-100 banner_slide"
                    alt="No image"
                  />
                  <div
                    className={
                      (allSlides[1]?.position === "One" &&
                        "carousel-caption mt-5") ||
                      (allSlides[1]?.position === "Two" &&
                        "carousel-caption banner-titles mx-3 mt-5") ||
                      (allSlides[1]?.position === "Three" &&
                        "carousel-caption bannerTitle2")
                    }
                  >
                    <h5
                      className={
                        (allSlides[1]?.position === "One" &&
                          "text-start bannerTxt") ||
                        (allSlides[1]?.position === "Two" &&
                          " text-center  Bannertext") ||
                        (allSlides[1]?.position === "Three" &&
                          " text-end bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[1]?.title
                      )}
                    ></h5>
                    <p
                      className={
                        (allSlides[1]?.position === "One" &&
                          " text-start fs-6 bannerTxt") ||
                        (allSlides[1]?.position === "Two" &&
                          "d-flex text-center fs-6 bannerTxt") ||
                        (allSlides[1]?.position === "Three" &&
                          "d-flex text-end fs-6 bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[1]?.description
                      )}
                    ></p>

             
                  </div>
                </div>

                <div className="carousel-item">
                  <video
                    id="frameOne"
                    className="main_video bg-dark"
                    autoPlay
                    loop
                    muted
                    allowfullscreen=""
                  >
                    <source src={require("../../assets/img/videoN.MP4")} />
                  </video>
                
                </div>

                <div className="carousel-item">
                  <video
                    id="frameOne"
                    className="main_video bg-dark"
                    autoPlay
                    loop
                    muted
                    allowfullscreen=""
                    preload="auto"
                  >
                    <source src={require("../../assets/img/videoSugar.mp4")} />
                  </video>
                </div>

                <div className="carousel-item ">
                  <img
                    src={allSlides[2]?.banner}
                    className="d-block w-100 banner_slide"
                    alt="..."
                  />
                  <div
                    className={
                      (allSlides[2]?.position === "One" &&
                        "carousel-caption ") ||
                      (allSlides[2]?.position === "Two" &&
                        "carousel-caption banner-titles mx-3") ||
                      (allSlides[2]?.position === "Three" &&
                        "carousel-caption bannerTitle2")
                    }
                  >
                    <h5
                      className={
                        (allSlides[2]?.position === "One" &&
                          "text-start bannerTxt") ||
                        (allSlides[2]?.position === "Two" &&
                          " text-center  Bannertext") ||
                        (allSlides[2]?.position === "Three" &&
                          " text-end bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[2]?.title
                      )}
                    ></h5>
                    <p
                      className={
                        (allSlides[2]?.position === "One" &&
                          " text-start fs-6 bannerTxt") ||
                        (allSlides[2]?.position === "Two" &&
                          "d-flex text-center fs-6 bannerTxt") ||
                        (allSlides[2]?.position === "Three" &&
                          "d-flex text-end fs-6 bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[2]?.description
                      )}
                    ></p>
                  </div>
                </div>
                <div className="carousel-item ">
                  <img
                    src={allSlides[3]?.banner}
                    className="d-block w-100 banner_slide"
                    alt="No image"
                  />
                  <div
                    className={
                      (allSlides[3]?.position === "One" &&
                        "carousel-caption ") ||
                      (allSlides[3]?.position === "Two" &&
                        "carousel-caption banner-titles mx-3") ||
                      (allSlides[3]?.position === "Three" &&
                        "carousel-caption bannerTitle2")
                    }
                  >
                    <h5
                      className={
                        (allSlides[3]?.position === "One" &&
                          "text-start bannerTxt") ||
                        (allSlides[3]?.position === "Two" &&
                          " text-center  Bannertext") ||
                        (allSlides[3]?.position === "Three" &&
                          " text-end bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[3]?.title
                      )}
                    ></h5>
                    <p
                      className={
                        (allSlides[3]?.position === "One" &&
                          " text-start fs-6 bannerTxt") ||
                        (allSlides[3]?.position === "Two" &&
                          "d-flex text-center fs-6 bannerTxt") ||
                        (allSlides[3]?.position === "Three" &&
                          "d-flex text-end fs-6 bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[3]?.description
                      )}
                    ></p>

                  </div>
                </div>
                <div className="carousel-item ">
                  <img
                    src={allSlides[4]?.banner}
                    className="d-block w-100 banner_slide"
                    alt="No image"
                  />
                  <div
                    className={
                      (allSlides[4]?.position === "One" &&
                        "carousel-caption mt-3") ||
                      (allSlides[4]?.position === "Two" &&
                        "carousel-caption banner-titles mx-3") ||
                      (allSlides[4]?.position === "Three" &&
                        "carousel-caption bannerTitle2")
                    }
                  >
                    <h5
                      className={
                        (allSlides[4]?.position === "One" &&
                          "text-start bannerTxt") ||
                        (allSlides[4]?.position === "Two" &&
                          " text-center  Bannertext") ||
                        (allSlides[4]?.position === "Three" &&
                          " text-end bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[4]?.title
                      )}
                    ></h5>
                    <p
                      className={
                        (allSlides[4]?.position === "One" &&
                          " text-start fs-6 bannerTxt") ||
                        (allSlides[4]?.position === "Two" &&
                          "d-flex text-center fs-6 bannerTxt") ||
                        (allSlides[4]?.position === "Three" &&
                          "d-flex text-end fs-6 bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[4]?.description
                      )}
                    ></p>

                  
                  </div>
                </div>
                <div className="carousel-item ">
                  <img
                    src={allSlides[5]?.banner}
                    className="d-block w-100 banner_slide"
                    alt="No image"
                  />
                  <div
                    className={
                      (allSlides[5]?.position === "One" &&
                        "carousel-caption mt-3") ||
                      (allSlides[5]?.position === "Two" &&
                        "carousel-caption banner-titles mx-5 mt-3") ||
                      (allSlides[5]?.position === "Three" &&
                        "carousel-caption bannerTitle2 mt-3")
                    }
                  >
                    <h5
                      className={
                        (allSlides[5]?.position === "One" &&
                          "text-start bannerTxt") ||
                        (allSlides[5]?.position === "Two" &&
                          " text-center  Bannertext") ||
                        (allSlides[5]?.position === "Three" &&
                          " text-end bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[5]?.title
                      )}
                    ></h5>
                    <p
                      className={
                        (allSlides[5]?.position === "One" &&
                          " text-start fs-6 bannerTxt") ||
                        (allSlides[5]?.position === "Two" &&
                          "d-flex text-center fs-6 bannerTxt") ||
                        (allSlides[5]?.position === "Three" &&
                          "d-flex text-end fs-6 bannerTxt")
                      }
                      dangerouslySetInnerHTML={createMarkup(
                        allSlides[5]?.description
                      )}
                    ></p>

                  
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
                className="carousel-control-next"
                style={{ opacity: "90" }}
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon p-4 slideBtn"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </section> */}
          <OwlCarousel
            className="banner_slider"
            autoplay={true}
            autoplayHoverPause={true}
            autoplayTimeout={8000}
            rewind={true}
            loop={true}
            dots={false}
            nav={true}
            video={true}
            lazyLoad={true}
            items={1}
          >
            {/* <div
              class="banner_section item"
              style={{ backgroundImage: "url(assets/img/01.jpg)" }}
            >
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-md-9 banner_content">
                    <h1>You can #Buy, #Sell, #Booking anything from here.</h1>
                    <p>
                      Buy and sell everything from used cars to mobile phones
                      and computers, or search for property, jobs and more in
                      the world.
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="banner_section item">
              <img
                src={
                  allSlides[1]?.banner
                    ? allSlides[1]?.banner
                    : require("../../assets/img/staticBg.png")
                }
                className="d-block w-100"
                alt="Loading...."
              />
              <div
                className={
                  (allSlides[1]?.position === "One" &&
                    "carousel-caption mt-5") ||
                  (allSlides[1]?.position === "Two" &&
                    "carousel-caption banner-titles mx-3 mt-5") ||
                  (allSlides[1]?.position === "Three" &&
                    "carousel-caption bannerTitle2")
                }
              >
                <h5
                  className={
                    (allSlides[1]?.position === "One" &&
                      "text-start bannerTxt") ||
                    (allSlides[1]?.position === "Two" &&
                      " text-center  Bannertext") ||
                    (allSlides[1]?.position === "Three" &&
                      " text-end bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(allSlides[1]?.title)}
                ></h5>
                <p
                  className={
                    (allSlides[1]?.position === "One" &&
                      " text-start fs-6 bannerTxt") ||
                    (allSlides[1]?.position === "Two" &&
                      "d-flex text-center fs-6 bannerTxt") ||
                    (allSlides[1]?.position === "Three" &&
                      "d-flex text-end fs-6 bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[1]?.description
                  )}
                ></p>
              </div>
            </div>

            <div className="banner_section item">
              <video
                id="frameOne"
                className="main_video bg-dark"
                autoPlay
                loop
                muted
                allowfullscreen=""
              >
                <source src={require("../../assets/img/videoN.MP4")} />
              </video>
            </div>

            <div className="banner_section item">
              <video
                id="frameOne"
                className="main_video bg-dark"
                autoPlay
                loop
                muted
                allowfullscreen=""
                preload="auto"
              >
                <source src={require("../../assets/img/videoSugar.mp4")} />
              </video>
            </div>

            <div className="banner_section item ">
              <img
                src={
                  allSlides[2]?.banner
                    ? allSlides[2]?.banner
                    : require("../../assets/img/staticBg.png")
                }
                className="d-block w-100 "
                alt="Loading..."
              />
              <div
                className={
                  (allSlides[2]?.position === "One" && "carousel-caption ") ||
                  (allSlides[2]?.position === "Two" &&
                    "carousel-caption banner-titles mx-3") ||
                  (allSlides[2]?.position === "Three" &&
                    "carousel-caption bannerTitle2")
                }
              >
                <h5
                  className={
                    (allSlides[2]?.position === "One" &&
                      "text-start bannerTxt") ||
                    (allSlides[2]?.position === "Two" &&
                      " text-center  Bannertext") ||
                    (allSlides[2]?.position === "Three" &&
                      " text-end bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(allSlides[2]?.title)}
                ></h5>
                <p
                  className={
                    (allSlides[2]?.position === "One" &&
                      " text-start fs-6 bannerTxt") ||
                    (allSlides[2]?.position === "Two" &&
                      "d-flex text-center fs-6 bannerTxt") ||
                    (allSlides[2]?.position === "Three" &&
                      "d-flex text-end fs-6 bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[2]?.description
                  )}
                ></p>
              </div>
            </div>
            <div className="banner_section item">
              <img
                src={
                  allSlides[3]?.banner
                    ? allSlides[3]?.banner
                    : require("../../assets/img/staticBg.png")
                }
                className="d-block w-100 "
                alt="Loading..."
              />
              <div
                className={
                  (allSlides[3]?.position === "One" && "carousel-caption ") ||
                  (allSlides[3]?.position === "Two" &&
                    "carousel-caption banner-titles mx-3") ||
                  (allSlides[3]?.position === "Three" &&
                    "carousel-caption bannerTitle2")
                }
              >
                <h5
                  className={
                    (allSlides[3]?.position === "One" &&
                      "text-start bannerTxt") ||
                    (allSlides[3]?.position === "Two" &&
                      " text-center  Bannertext") ||
                    (allSlides[3]?.position === "Three" &&
                      " text-end bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(allSlides[3]?.title)}
                ></h5>
                <p
                  className={
                    (allSlides[3]?.position === "One" &&
                      " text-start fs-6 bannerTxt") ||
                    (allSlides[3]?.position === "Two" &&
                      "d-flex text-center fs-6 bannerTxt") ||
                    (allSlides[3]?.position === "Three" &&
                      "d-flex text-end fs-6 bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[3]?.description
                  )}
                ></p>
              </div>
            </div>
            <div className="banner_section item ">
              <img
                src={
                  allSlides[4]?.banner
                    ? allSlides[4]?.banner
                    : require("../../assets/img/staticBg.png")
                }
                className="d-block w-100 "
                alt="Loading..."
              />
              <div
                className={
                  (allSlides[4]?.position === "One" &&
                    "carousel-caption mt-3") ||
                  (allSlides[4]?.position === "Two" &&
                    "carousel-caption banner-titles mx-3") ||
                  (allSlides[4]?.position === "Three" &&
                    "carousel-caption bannerTitle2")
                }
              >
                <h5
                  className={
                    (allSlides[4]?.position === "One" &&
                      "text-start bannerTxt") ||
                    (allSlides[4]?.position === "Two" &&
                      " text-center  Bannertext") ||
                    (allSlides[4]?.position === "Three" &&
                      " text-end bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(allSlides[4]?.title)}
                ></h5>
                <p
                  className={
                    (allSlides[4]?.position === "One" &&
                      " text-start fs-6 bannerTxt") ||
                    (allSlides[4]?.position === "Two" &&
                      "d-flex text-center fs-6 bannerTxt") ||
                    (allSlides[4]?.position === "Three" &&
                      "d-flex text-end fs-6 bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[4]?.description
                  )}
                ></p>
              </div>
            </div>
            <div className="banner_section item">
              <img
                src={
                  allSlides[5]?.banner
                    ? allSlides[5]?.banner
                    : require("../../assets/img/staticBg.png")
                }
                className="d-block w-100 "
                alt="Loading..."
              />
              <div
                className={
                  (allSlides[5]?.position === "One" &&
                    "carousel-caption mt-3") ||
                  (allSlides[5]?.position === "Two" &&
                    "carousel-caption banner-titles mx-5 mt-3") ||
                  (allSlides[5]?.position === "Three" &&
                    "carousel-caption bannerTitle2 mt-3")
                }
              >
                <h5
                  className={
                    (allSlides[5]?.position === "One" &&
                      "text-start bannerTxt") ||
                    (allSlides[5]?.position === "Two" &&
                      " text-center  Bannertext") ||
                    (allSlides[5]?.position === "Three" &&
                      " text-end bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(allSlides[5]?.title)}
                ></h5>
                <p
                  className={
                    (allSlides[5]?.position === "One" &&
                      " text-start fs-6 bannerTxt") ||
                    (allSlides[5]?.position === "Two" &&
                      "d-flex text-center fs-6 bannerTxt") ||
                    (allSlides[5]?.position === "Three" &&
                      "d-flex text-end fs-6 bannerTxt")
                  }
                  dangerouslySetInnerHTML={createMarkup(
                    allSlides[5]?.description
                  )}
                ></p>
              </div>
            </div>
          </OwlCarousel>
          <section class="category_newdesign">
            <div class="container">
              <div class="row newdesign_main bg-white">
                <a
                  class="view_all"
                  onClick={() => navigate("/app/Categories", { state: "hii" })}
                >
                  View All
                </a>
                <div class="col-12 mb-3">
                  <div class="comn_heads mb-5">
                    <h2
                      dangerouslySetInnerHTML={createMarkup(
                        allHeaders?.categoryTitle
                      )}
                    ></h2>
                  </div>
                </div>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  navigation={true}
                  autoplay={true}
                  loop={true}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper px-4 py-2"
                >
                  {(category || [])?.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className="col-12 px-4">
                        <div className="categorynew_slider sliderbtns_design">
                          <a class="categorynew_box">
                            <div class="categorynew_img p-2">
                              <Link
                                to={{
                                  pathname: "/CategoryProducts",
                                }}
                                state={{
                                  name: item?.categoryName,
                                  image: item?.background,
                                }}
                              >
                                <img
                                  src={item?.categoryImage}
                                  className=""
                                  alt="lorem"
                                />
                              </Link>
                            </div>
                            <span> {item?.categoryName}</span>
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          <section class="featuredproduct">
            <div class="container">
              <div class="row featuredproduct_slider">
                <a
                  class="view_all"
                  onClick={() =>
                    navigate("/app/featured-products", { state: "hii" })
                  }
                >
                  View All
                </a>
                <div class="col-12 mb-3">
                  <div class="comn_heads mb-5">
                    <h2
                      dangerouslySetInnerHTML={createMarkup(
                        allHeaders?.featuredTitle
                      )}
                    ></h2>
                  </div>
                </div>
                <div className="">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    navigation={true}
                    autoplay={true}
                    loop={true}
                    style={{ padding: "30px" }}
                    modules={[FreeMode, Pagination, Autoplay, Navigation]}
                    className="mySwiper  py-3 "
                  >
                    {(featured || [])?.map((item, index) => (
                      <SwiperSlide key={index} className="px-3">
                        <div className="col-12">
                          <div
                            className="categorynew_slider sliderbtns_design"
                            onClick={() =>
                              navigate(`/AllProducts/Product/${item?._id}`, {
                                state: {
                                  id: item?._id,
                                },
                              })
                            }
                          >
                            <a class="featuredproduct_box p-2">
                              <div className="featuredproduct_img ">
                                <img
                                  src={
                                    item?.productImage
                                      ? item?.productImage
                                      : require("../../assets/img/product.jpg")
                                  }
                                  alt="Product"
                                />
                              </div>
                              <div class="featuredproduct_details p-2">
                                <span
                                  onClick={() =>
                                    navigate(
                                      `/AllProducts/Product/${item?._id}`,
                                      {
                                        state: {
                                          id: item?._id,
                                        },
                                      }
                                    )
                                  }
                                >
                                  {item?.unitName}
                                </span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </section>

          <section
            className="product_show_home"
            id="bottom-image"
            style={{ backgroundImage: `url(${image?.bottomImage})` }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="w-100 mb-5">
                    <img
                      className="border rounded border-dark"
                      src={allHeaders?.foreground}
                      alt=""
                    />
                  </div>
                  <Link
                    className="comman_btn2"
                    to={`/app/ProductSearch/${"sugar" + " " + "daddy"}`}
                    state={"loo"}
                    targe=""
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section class="brandsnew">
            <div class="container">
              <div class="row featuredproduct_slider">
                <a
                  class="view_all"
                  onClick={() => navigate("/app/brands", { state: "hii" })}
                >
                  View All
                </a>
                <div class="col-12 mb-3">
                  <div class="comn_heads mb-5">
                    <h2
                      dangerouslySetInnerHTML={createMarkup(
                        allHeaders?.brandTitle
                      )}
                    ></h2>
                  </div>
                </div>
                <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  loop={true}
                  navigation={true}
                  autoplay={true}
                  modules={[FreeMode, Pagination, Autoplay, Navigation]}
                  className="mySwiper px-4 py-2"
                >
                  {(brands || [])?.map((item, index) => (
                    <SwiperSlide key={index} className="px-4">
                      <div class="col-12">
                        <div class="categorynew_slider sliderbtns_design">
                          <Link
                            to="/Brands/Products"
                            state={{ name: item?.brandName }}
                            className="brandsnew_box"
                          >
                            <img src={item?.brandImage} alt="" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          <Footer />
          <button
            type="button"
            id="age_modal"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Launch demo modal
          </button>

          <div
            className="modal "
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog  modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header modalHeadBg">
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
      )}
    </div>
  );
};

export default Homepage;
