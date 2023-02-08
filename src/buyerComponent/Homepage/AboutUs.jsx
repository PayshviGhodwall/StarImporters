import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import DOMPurify from "dompurify";
import "./about.css";
import { Link } from "react-router-dom";
const AboutUs = () => {
  const [data, setData] = useState("");
  const about = `${process.env.REACT_APP_APIENDPOINTNEW}user/welcome/aboutUs`;
  useEffect(() => {
    axios.get(about).then((res) => {
      setData(res.data?.results);
    });
  }, []);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div>
      <Navbar />
      <div className=" bg-whitem-2 p-5" style={{ marginTop: "5rem" }}>
        <></>
      </div>
      <section class="about-section section">
        <div class="container">
          <div class="row">
            <div class="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div class="inner-column">
                <div class="sec-title">
                  <span class="title">About us</span>
                  <h2>STAR IMPORTER WHOLESALER Established Since 1994</h2>
                </div>
                <div class="text">
                  Star Importers & Wholesalers is a family-owned and operated
                  business that has been serving the convenience store and smoke
                  shop industry for years. With a 110,000 sqft warehouse, we are
                  a one-stop shop for all your products. Our goal is to provide
                  high-quality products and exceptional customer service to our
                  B2B clients.
                </div>
                <div class="text">
                  As a family-run business, we understand the importance of
                  building strong relationships with our clients. Our team is
                  dedicated to ensuring that each and every customer is
                  satisfied with their experience. Whether you're a small
                  business owner or the manager of a large chain, we have the
                  products and expertise to meet your needs. Our extensive
                  product line includes everything from snacks and candy to
                  smoke shop supplies, and we are constantly adding new items to
                  meet the changing needs of the market.
                </div>
                <div class="btn-box">
                  <Link
                    to="/Contact"
                    className="theme-btn  text-decoration-none"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div class="image-column col-lg-6 col-md-12 col-sm-12">
              <div class="inner-column wow fadeInLeft">
                <div class="author-desc">
                  <h2>MONTY HUDDA</h2>
                  <span>Owner</span>
                </div>
                <figure class="image-1">
                  <a href="#" class="lightbox-image" data-fancybox="images">
                    <img
                      title="Rahul Kumar Yadav"
                      src="https://i.ibb.co/QP6Nmpf/image-1-about.jpg"
                      alt=""
                    />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div class="sec-title">
            <span class="title">Our Future Goal</span>
            <h2>We are leading towards Enovation & Technology</h2>
          </div>
          <div class="text">
            <p>
              <span
                dangerouslySetInnerHTML={createMarkup(data[0]?.description)}
              ></span>{" "}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
