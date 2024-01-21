import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import image from "../../assets/img/starBgg.jpg";
import Starlogo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";
import moment from "moment";
import Footer from "../Footer/Footer";
import "mui-player/dist/mui-player.min.css";
import MuiPlayer from "mui-player";
const HelpSupport = () => {
  const allContent = `${process.env.REACT_APP_APIENDPOINTNEW}user/getAllContent`;
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [flyers, setFlyers] = useState([]);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getContent();
  }, []);

  const getContent = async () => {
    const { data } = await axios.get(allContent);
    console.log(data);
    if (!data.error) {
      setContents(data?.results?.help);
    }
  };

  return (
    <div>
      <div className="">
        <Navbar />

        <section
          className="marginTop bg-white"
          style={{
            backgroundImage: `url(${require("../../assets/img/10173.jpg")})`,
            // backgroundPosition: "center",
            backgroundSize: "350% 200%",
          }}>
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
                      <div className="col-12 helpMainBg">
                        <h2>
                          <em>Hello</em>, what can we help you find?
                        </h2>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="container ">
                  <div className="row">
                    <div className="">
                      {contents?.map((item, index) => (
                        <section className="">
                          {item?.type === "PDF" ? (
                            <div className="container-xxl py-2  mt-5 mb-3">
                              <div className="heading_container">
                                <h2 className="mb-3 text-center">
                                  {item?.title}
                                </h2>
                              </div>
                              <div className="container">
                                <div className="bg-light rounded p-3">
                                  <div
                                    className="bg-white rounded p-4"
                                    style={{
                                      border: "1px dashed rgba(0,185,142,.3)",
                                    }}>
                                    <div className="row g-5 align-items-center">
                                      <div
                                        className="col-lg-6 wow fadeIn d-flex justify-content-center "
                                        data-wow-delay="0.1s"
                                        style={{
                                          visibility: "visible",
                                          animationDelay: "0.1s",
                                          animationName: "fadeIn",
                                        }}>
                                        <img
                                          className="img-fluid rounded "
                                          width={200}
                                          src={require("../../assets/img/userManual.jpg")}
                                          alt="website template image"
                                        />
                                      </div>
                                      <div
                                        className="col-lg-6 wow fadeIn"
                                        data-wow-delay="0.5s"
                                        style={{
                                          visibility: "visible",
                                          animationDelay: "0.5s",
                                          animationName: "fadeIn",
                                        }}>
                                        <div className="mb-4">
                                          <h1 className="mb-3">
                                            Download Instruction PDF
                                          </h1>
                                          <p>{item?.instructions}</p>
                                        </div>
                                        <a
                                          // href="https://www.free-css.com/free-css-templates"
                                          className="btn btn-primary py-3 px-4 me-2">
                                          <i class="fa-solid fa-download me-2"></i>
                                          Download Pdf
                                        </a>{" "}
                                        <a
                                          // href="https://www.free-css.com/free-css-templates"
                                          className="btn btn-dark py-3 px-4">
                                          <i class="fa-brands fa-youtube me-2"></i>
                                          View Tutorial
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="container-xxl py-5">
                              <div className="row">
                                <div id="mui-player"></div>
                                <div className="col-md-6">
                                  <div className="img-box">
                                    {item?.type === "VIDEO" ? (
                                      <video
                                        id="frameFour"
                                        className="main_video bg-dark"
                                        autoPlay
                                        loop
                                        controls={true}
                                        oncanplay="this.muted=true"
                                        muted={true}
                                        preload="auto">
                                        <source src={item?.content} />
                                      </video>
                                    ) : (
                                      <img
                                        src={
                                          item?.content
                                            ? item?.content
                                            : require("../../assets/img/bg2.jpg")
                                        }
                                        alt="website template image"
                                      />
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="detail-box">
                                    <div className="heading_container">
                                      <h2 className="fw-bold">{item?.title}</h2>
                                    </div>

                                    <p>{item?.instructions}</p>
                                    <p>
                                      Step 2 : dolor sit amet consectetur
                                      adipisicing elit. Corrupti dolorem eum
                                      consequuntur ipsam repellat dolor soluta
                                      aliquid laborum, eius odit consectetur vel
                                      quasi in quidem, eveniet ab est corporis
                                      tempore.
                                    </p>
                                    <a>Read More</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </section>
                      ))}
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            )}
          </>
        </section>
      </div>

      {/* <section class="">
        <div className="">
          <header class="site-header shadow">
            <div class="site-identity">
              <Link className="bg-white" to="/app/home">
                <img
                  style={{
                    width: "8rem",
                    height: "4rem",
                  }}
                  src={Starlogo}
                  alt="Site Name"
                />
              </Link>
              <h1>Star Importers & Wholesalers</h1>
            </div>
            <nav class="site-navigation">
              <ul class="nav">
              <li>
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer">Home</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer/All-Catalogs">Catalogs</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer/All-Flyers">Monthly Flyers</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/about-us">About Us</Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="bg-white">
            <iframe
              src="https://8f920893-trial.flowpaper.com/fileexamplePDF500kB/"
              width="100%"
              height="630"
              allowFullScreen></iframe>
          </div>
        </div>
  
      </section> */}
    </div>
  );
};

export default HelpSupport;
