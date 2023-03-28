import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import image from "../../assets/img/starBgg.jpg";

const Gallery = () => {
  const [loader, setLoader] = useState(false);
  return (
    <div>
      <Navbar />
      <section className="">
        <>
          {loader ? (
            <div id="loader-wrapper">
              <div id="loader" />
              <div className="loader-section section-left" />
              <div className="loader-section section-right" />
            </div>
          ) : (
            <div>
              <section
                className="product_show_home"
                id="bottom-image"
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 ">
                      <form className="d-flex tm-search-form">
                        <input
                          className="form-control tm-search-input"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          className="btn btn-outline-success tm-search-btn"
                          type="submit"
                        >
                          <i className="fas fa-search" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              <div
                className="tm-hero d-flex justify-content-center align-items-center"
                data-parallax="scroll"
                data-image-src="../../assets/img/banner_3.png"
              ></div>
              <div className="container-fluid tm-container-content tm-mt-60">
                <div className="row mb-4">
                  <h2 className="col-6 tm-text-primary">Latest Photos</h2>
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
                        <h2>Oulets</h2>
                        <a href="photo-detail.html">View more</a>
                      </figcaption>
                    </figure>
                    <div className="d-flex justify-content-between tm-text-gray">
                      <span className="tm-text-gray-light">18 Oct 2020</span>
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
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
                      <span>9,906 views</span>
                    </div>
                  </div>
                </div>
                {/* row */}
                <div className="row tm-mb-90">
                  <div className="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                    <a
                      href="javascript:void(0);"
                      className="btn btn-primary tm-btn-prev mb-2 disabled"
                    >
                      Previous
                    </a>
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
                    <a
                      href="javascript:void(0);"
                      className="btn btn-primary tm-btn-next"
                    >
                      Next Page
                    </a>
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
