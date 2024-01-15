import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import axios from "axios";
import image from "../../assets/img/starBgg.jpg";
import Starlogo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";
import moment from "moment";
import Footer from "../Footer/Footer";

const HelpSupport = () => {
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

        <section
          className="marginTop bg-white"
          style={{
            backgroundImage: `url(${require("../../assets/img/10173.jpg")})`,
            // backgroundPosition: "center",
            backgroundSize:"350% 200%"
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
                
                <div
                  class=" product_show_home_Gallery helpMainBg "
                  style={{ backgroundImage: `url(${image})` }}>
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-10 offset-lg-1">
                        <div class="header-text">
                          <h2>
                            <em>Hello</em>, what can we help you find?
                          </h2>

                          <div className="searchBox">
                            <input
                              className="searchInput"
                              type="text"
                              name=""
                              placeholder="Try Searching Below Keywords...."
                            />
                            <button className="searchButton" href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={29}
                                height={29}
                                viewBox="0 0 29 29"
                                fill="none">
                                <g clipPath="url(#clip0_2_17)">
                                  <g filter="url(#filter0_d_2_17)">
                                    <path
                                      d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                                      stroke="white"
                                      strokeWidth={3}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      shapeRendering="crispEdges"
                                    />
                                  </g>
                                </g>
                                <defs>
                                  <filter
                                    id="filter0_d_2_17"
                                    x="-0.418549"
                                    y="3.70435"
                                    width="29.7139"
                                    height="29.7139"
                                    filterUnits="userSpaceOnUse"
                                    colorInterpolationFilters="sRGB">
                                    <feFlood
                                      floodOpacity={0}
                                      result="BackgroundImageFix"
                                    />
                                    <feColorMatrix
                                      in="SourceAlpha"
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                      result="hardAlpha"
                                    />
                                    <feOffset dy={4} />
                                    <feGaussianBlur stdDeviation={2} />
                                    <feComposite
                                      in2="hardAlpha"
                                      operator="out"
                                    />
                                    <feColorMatrix
                                      type="matrix"
                                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in2="BackgroundImageFix"
                                      result="effect1_dropShadow_2_17"
                                    />
                                    <feBlend
                                      mode="normal"
                                      in="SourceGraphic"
                                      in2="effect1_dropShadow_2_17"
                                      result="shape"
                                    />
                                  </filter>
                                  <clipPath id="clip0_2_17">
                                    <rect
                                      width="28.0702"
                                      height="28.0702"
                                      fill="white"
                                      transform="translate(0.403503 0.526367)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </button>
                          </div>
                          <p>
                            Keywords : <em>How to login ?,</em>{" "}
                            <em>How to Register?,</em>
                            <em>
                              Instrutions for Quotations request etc..
                            </em>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <section className="about_section layout_padding long_section">
                  <div className="container-xxl py-5">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="img-box">
                          <img
                            src={require("../../assets/img/bg2.jpg")}
                            alt="website template image"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="detail-box">
                          <div className="heading_container">
                            <h2 className="fw-bold">How to Register ?</h2>
                          </div>

                          <p>
                            Step 2 : dolor sit amet consectetur adipisicing
                            elit. Corrupti dolorem eum consequuntur ipsam
                            repellat dolor soluta aliquid laborum, eius odit
                            consectetur vel quasi in quidem, eveniet ab est
                            corporis tempore.
                          </p>
                          <p>
                            Step 2 : dolor sit amet consectetur adipisicing
                            elit. Corrupti dolorem eum consequuntur ipsam
                            repellat dolor soluta aliquid laborum, eius odit
                            consectetur vel quasi in quidem, eveniet ab est
                            corporis tempore.
                          </p>
                          <a>Read More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="about_section layout_padding long_section ">
                  <div className="container-xxl py-2  mt-5 mb-3">
                    <div className="heading_container">
                      <h2 className="mb-3 text-center">
                        How to Uplaod and Verify Tobacco License ?
                      </h2>
                    </div>
                    <div className="container">
                      <div className="bg-light rounded p-3">
                        <div
                          className="bg-white rounded p-4"
                          style={{ border: "1px dashed rgba(0,185,142,.3)" }}>
                          <div className="row g-5 align-items-center">
                            <div
                              className="col-lg-6 wow fadeIn"
                              data-wow-delay="0.1s"
                              style={{
                                visibility: "visible",
                                animationDelay: "0.1s",
                                animationName: "fadeIn",
                              }}>
                              <img
                                className="img-fluid rounded w-100"
                                src={require("../../assets/img/bg2.jpg")}
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
                                <p>
                                  Eirmod sed ipsum dolor sit rebum magna erat.
                                  Tempor lorem kasd vero ipsum sit sit diam
                                  justo sed vero dolor duo.
                                </p>
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
                </section>

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
