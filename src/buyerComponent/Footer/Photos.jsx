import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import FsLightbox from "fslightbox-react";

const Photos = () => {
  const [toggler, setToggler] = useState(false);

  return (
    <div>
      <Navbar />
      <section class="photos">
        <div className="container">
          <div className="row photos_main mt-5">
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  onClick={() => setToggler(!toggler)}
                  src={require("../../assets/img/banner_img2.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  onClick={() => setToggler(!toggler)}
                  src={require("../../assets/img/banner_img2.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  onClick={() => setToggler(!toggler)}
                  src={require("../../assets/img/starBgg.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  onClick={() => setToggler(!toggler)}
                  src={require("../../assets/img/banner_img2.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  onClick={() => setToggler(!toggler)}
                  src={require("../../assets/img/banner_img3.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-4">
              <a>
                <img
                  src={require("../../assets/img/banner_img2.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-4">
              <a>
                <img
                  src={require("../../assets/img/profile_img1.png")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-4">
              <a>
                <img
                  src={require("../../assets/img/banner_img1.jpg")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-4">
              <a>
                <img
                  src={require("../../assets/img/product_new1.png")}
                  alt="Park"
                />
              </a>
            </div>
            <div class="col-sm-6 col-md-4">
              <a>
                <img
                  src={require("../../assets/img/banner_img3.jpg")}
                  alt="Park"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      <FsLightbox
        toggler={toggler}
        sources={[
          "../../assets/img/banner_img3.jpg",
          "../../assets/img/banner_img3.jpg",
          "../../assets/img/banner_img1.jpg",
          "../../assets/img/banner_img3.jpg",
          "../../assets/img/banner_img2.jpg",
          "../../assets/img/banner_img3.jpg",
          "../../assets/img/banner_img3.jpg",
          "../../assets/img/banner_img1.jpg",
          "../../assets/img/banner_img3.jpg",
        ]}
      />
    </div>
  );
};

export default Photos;
