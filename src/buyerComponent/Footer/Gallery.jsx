import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import image from "../../assets/img/starBggN.jpg";
import { Link, animateScroll as scroll } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
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
                className="container-fluid tm-container-content tm-mt-60"
                id="collection"
              >
                <div className="row mb-4 mt-5 d-flex justify-content-center">
                  <h2 className="mt-4  Collect_header">Collection</h2>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    {/* <form action="" className="tm-text-primary">
                      Page
                      <input
                        type="text"
                        defaultValue={1}
                        size={1}
                        className="tm-input-paging tm-text-primary"
                      />
                      of 200
                    </form> */}
                  </div>
                </div>
                <div className="row tm-mb-90 tm-gallery">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_1.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Warehouse</h2>
                        <a
                          onClick={() => {
                            navigate("/app/Gallery/Photos");
                          }}
                        >
                          View more
                        </a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_1.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Oulets</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/banner_1.jpg")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/product_new2.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_1.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_4.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_1.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 mb-5">
                    <figure className="effect-ming tm-video-item">
                      <img
                        src={require("../../assets/img/brand_4.png")}
                        alt="Image"
                        className="img-fluid"
                      />
                      <figcaption className="d-flex align-items-center justify-content-center">
                        <h2>Clocks</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                    </div>
                  </div>
                </div>
                {/* row */}
                <div className="row tm-mb-90">
                  <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                    <a className="comman_btn2 disabled">Previous</a>
                    <div className="tm-paging d-flex">
                      <a
                        href="javascript:void(0);"
                        className="active tm-paging-link"
                      >
                        1
                      </a>
                      <a href="javascript:void(0);" className="tm-paging-link">
                        2
                      </a>
                      <a href="javascript:void(0);" className="tm-paging-link">
                        3
                      </a>
                      <a href="javascript:void(0);" className="tm-paging-link">
                        4
                      </a>
                    </div>
                    <a className="comman_btn2">Next Page</a>
                  </div>
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
