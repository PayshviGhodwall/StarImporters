import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import axios from "axios";
import image from "../../assets/img/starBgg.jpg";
import Starlogo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode, Grid } from "swiper";

const Catelogues = () => {
  const allPdf = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getCatalog`;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [flyers, setFlyers] = useState([]);
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    getCatalogs();
    getFLyers();
  }, []);

  const getCatalogs = async () => {
    const { data } = await axios.post(allPdf, {
      type: "catalog",
    });
    console.log(data);
    if (!data.error) {
      setCatalogs(data?.results?.catalog);
    }
  };

  const getFLyers = async () => {
    const { data } = await axios.post(allPdf, {
      type: "flyer",
    });
    console.log(data);
    if (!data.error) {
      setFlyers(data?.results?.catalog);
    }
  };

  return (
    <div>
      <div className="">
        <Navbar />
        <section className="marginTop">
          <>
            {loader ? (
              <div id="loader-wrapper">
                <div id="loader" />
                <div className="loader-section section-left" />
                <div className="loader-section section-right" />
              </div>
            ) : (
              <div>
                <section className="comman_banner _banner marginTopSecx">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <h1>Catalogs & Flyers</h1>
                        <div className="breadcrumbs mt-2">
                          <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                              <li className="item_nanner">
                                <Link
                                  to="/app/home"
                                  className="text-decoration-none text-white fs-6  ">
                                  Home{" "}
                                  <span className="arrow mx-2">&#9679;</span>{" "}
                                </Link>
                              </li>
                              <li
                                className="breadcrumb-item"
                                aria-current="page">
                                <a className="text-decoration-none text-white fs-6 ">
                                  Catalogs & Flyers
                                </a>
                              </li>
                            </ol>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {catalogs?.length > 0 && (
                  <div
                    className="container-fluid bg-white shadow"
                    style={{
                      width: "80%",
                      padding: "20px 20px",
                      marginTop: "30px",
                      borderRadius: "15px",
                    }}>
                    <div class="col-12 mb-5  mt-3">
                      <div class="comn_heads mb-5">
                        <h2>Catalogs</h2>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="row justify-content-center comman_product1">
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={30}
                          navigation={true}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            reverseDirection: true,
                            waitForTransition: true,
                          }}
                          loop={true}
                          style={{ padding: "30px" }}
                          modules={[FreeMode, Pagination, Autoplay, Navigation]}
                          className="mySwiper">
                          {(catalogs || [])?.map((item, index) => (
                            <SwiperSlide key={index} className="px-3 main_hot">
                              <div class="mb-5 ">
                                <a
                                  href={item?.url}
                                  target="_blank"
                                  class="categorynew_box text-decoration-none">
                                  <a>
                                    <div class="categorynew_img p-3">
                                      <img
                                        src={
                                          item?.coverImage
                                            ? item?.coverImage
                                            : require("../../assets/img/logoCat.jpg")
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </a>
                                  <span>{item?.title}</span>
                                </a>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                )}

                {flyers?.length && (
                  <div
                    className="container-fluid bg-white shadow"
                    style={{
                      width: "80%",
                      padding: "20px 20px",
                      marginTop: "30px",
                      marginBottom: "30px",
                      borderRadius: "15px",
                    }}>
                    <div class="col-12 mb-5  mt-3">
                      <div class="comn_heads mb-5">
                        <h2>Flyers</h2>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="row justify-content-center comman_product1">
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={30}
                          navigation={true}
                          autoplay={{
                            delay: 5000,
                            disableOnInteraction: true,
                            reverseDirection: true,
                            waitForTransition: true,
                          }}
                          loop={true}
                          style={{ padding: "30px" }}
                          modules={[FreeMode, Pagination, Autoplay, Navigation]}
                          className="mySwiper">
                          {(flyers || [])?.map((item, index) => (
                            <SwiperSlide key={index} className="px-3 main_hot">
                              <div class="mb-5 ">
                                <a
                                  href={item?.url}
                                  target="_blank"
                                  class="categorynew_box text-decoration-none">
                                  <a>
                                    <div class="categorynew_img p-3">
                                      <img
                                        src={
                                          item?.coverImage
                                            ? item?.coverImage
                                            : require("../../assets/img/logoCat.jpg")
                                        }
                                        alt=""
                                      />
                                    </div>
                                  </a>
                                  <span>{item?.title}</span>
                                </a>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                )}

                <Footer />
              </div>
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default Catelogues;
