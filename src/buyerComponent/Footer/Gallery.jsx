import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import image from "../../assets/img/starBggN.jpg";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "react-grid-carousel";
import moment from "moment";

const Gallery = () => {
  const galleries = `${process.env.REACT_APP_APIENDPOINTNEW}user/getGalleries`;
  const [loader, setLoader] = useState(false);
  const [gallery, setGallery] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGalleries();
  }, []);
  const getGalleries = async () => {
    const { data } = await axios.post(galleries);
    console.log(data);
    setGallery(data?.results?.galleries);
  };

  return (
    <div className="header_top">
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
              <div
                class="main-banner product_show_home_Gallery"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div class="container">
                  <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                      <div class="header-text">
                        <h2>
                          Explore our <em>Photos Gallery</em> &amp; Amazing{" "}
                          <em>Collection</em>
                        </h2>
                        <p>
                          STAR IMPORTERS & WHOLESALERS Established Since 1994.
                        </p>
                        <div class="icon-button">
                          <a href="https://youtube.com" target="_blank">
                            <i class="fa fa-play"></i> Watch Our Videos Now
                          </a>
                        </div>
                        <div class="buttons">
                          <div class="">
                            <Link
                              activeClass="active"
                              style={{ cursor: "pointer" }}
                              to="collection"
                              spy={true}
                              smooth={true}
                              offset={-70}
                              duration={100}
                            >
                              <div class="container_swipe">
                                <div class="chevron"></div>
                                <div class="chevron"></div>
                                <div class="chevron"></div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="container-fluid tm-container-content tm-mt-60 mt-5"
                id="collection"
              >
                <div>
                  <div class="nine">
                    <h1>
                      GallerieS<span>Latest</span>
                    </h1>
                  </div>
                </div>
                <div className="row tm-mb-90 tm-gallery p-4 ">
                  <Carousel cols={4} rows={1} gap={15} loop autoplay={3000}>
                    {(gallery || [])?.map((item, ind) => (
                      <Carousel.Item>
                        <div className="border rounded bg-white shadow">
                          <figure className="effect-ming tm-video-item">
                            <img
                              src={
                                item?.coverImage
                                  ? item?.coverImage
                                  : require("../../assets/img/brand_1.png")
                              }
                              alt="Image"
                              className="img-fluid"
                            />
                            <figcaption className="d-flex align-items-center justify-content-center">
                              <h2>{item?.title}</h2>
                              <a
                                onClick={() => {
                                  navigate(`/app/Gallery/Photos/${item?._id}`);
                                }}
                              >
                                View more
                              </a>
                            </figcaption>
                          </figure>
                          <div className="d-flex justify-content-center tm-text-gray">
                            <span className="tm-text-gray-light mb-1">
                              {moment(item?.createdAt?.slice(0, 10)).format(
                                "MM/DD/YYYY"
                              )}
                            </span>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
              </div>
              <Footer />
            </div>
          )}
        </>
      </section>
    </div>
  );
};

export default Gallery;