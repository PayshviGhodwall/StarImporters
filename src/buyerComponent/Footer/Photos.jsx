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
          <div className="mt-2">
            <div class="nine">
              <h1>
                {gallery?.title}
                <span>All Photos</span>
              </h1>
            </div>
          </div>
          <div className="row  mt-1 mb-5   comman_divvision">
            {(gallery?.images || [])?.map((item, ind) => (
              <div class="col-4">
                <a>
                  <img
                    onClick={() => {
                      getSlides(item);
                      // setOpen(true);
                    }}
                    className="photo_gallery"
                    src={item}
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
