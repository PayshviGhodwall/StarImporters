import React, { useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import { useEffect } from "react";
import Footer from "./Footer";
import "yet-another-react-lightbox/styles.css";

const Photos = () => {
  const galleries = `${process.env.REACT_APP_APIENDPOINTNEW}user/getGallery`;
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState([]);
  let id = useParams();
  const [slide, setSlide] = useState([]);
  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    const { data } = await axios.post(galleries + "/" + id?.id);
    console.log(data);
    setGallery(data?.results?.gallery);
  };

  const getSlides = (img) => {
    console.log(img);
    let Slide = [];
    if (img) {
      Slide?.unshift({ src: img });
    }

    (gallery?.images || [])?.map((item) => {
      if (item) {
        Slide?.push({ src: item });
      }
    });
    setSlide(Slide);
    console.log(slide);
    setOpen(true);
  };

  return (
    <div>
      <Navbar />
      <section class="photos">
        <div className="container">
          <div className="row photos_main mt-5">
            {(gallery?.images || [])?.map((item, ind) => (
              <div class="col-sm-6 col-md-6 col-lg-4">
                <a>
                  <img
                    onClick={() => {
                      getSlides(item);
                      // setOpen(true);
                    }}
                    src={
                      item ? item : require("../../assets/img/banner_img2.jpg")
                    }
                    alt="Park"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
      <Lightbox open={open} close={() => setOpen(false)} slides={slide} />
    </div>
  );
};

export default Photos;
