import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import axios from "axios";
import image from "../../assets/img/starBgg.jpg";
import Starlogo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-grid-carousel";
import moment from "moment";

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
      <div className="bg-white">
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
                    className="container tm-container-content tm-mt-60 mt-5 widht_mng_r"
                    id="collection">
                    <div>
                      <div class="nine">
                        <h1>
                          CATALOGS<span>Latest</span>
                        </h1>
                      </div>
                    </div>
                    <div className="row tm-mb-90 tm-gallery p-4 shadow pt-5">
                      <Carousel cols={3} rows={1} gap={15} loop autoplay={3000}>
                        {(catalogs || [])?.map((item, ind) => (
                          <Carousel.Item>
                            <a target="_blank" href={item?.url} className="">
                              <figure className="effect-ming tm-video-item">
                                <img
                                  loading="lazy"
                                  src={
                                    item?.coverImage
                                      ? item?.coverImage
                                      : require("../../assets/img/logoCat.jpg")
                                  }
                                  alt="Image"
                                  className="img-fluid "
                                />
                                <figcaption className="d-flex align-items-center justify-content-center">
                                  <h2>{item?.title}</h2>
                                  <a>View more</a>
                                </figcaption>
                              </figure>
                              <div className="d-flex justify-content-center tm-text-gray">
                                <span className="text-dark fw-bold mb-1">
                                  {moment(item?.createdAt?.slice(0, 10)).format(
                                    "MM/DD/YYYY"
                                  )}
                                </span>
                              </div>
                            </a>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}

                {flyers?.length && (
                  <div
                    className="container tm-container-content tm-mt-60 mt-5 widht_mng_r"
                    id="collection">
                    <div>
                      <div class="nine">
                        <h1>
                          Flyers<span>Latest</span>
                        </h1>
                      </div>
                    </div>
                    <div className="row tm-mb-90 tm-gallery p-4  shadow pt-5">
                      <Carousel cols={3} rows={1} gap={15} loop autoplay={3000}>
                        {(flyers || [])?.map((item, ind) => (
                          <Carousel.Item>
                            <a href={item?.url} target="_blank" className="">
                              <figure className="effect-ming tm-video-item">
                                <img
                                  src={
                                    item?.coverImage
                                      ? item?.coverImage
                                      : require("../../assets/img/logoCat.jpg")
                                  }
                                  alt="Image"
                                  className="img-fluid"
                                />
                                <figcaption className="d-flex align-items-center justify-content-center">
                                  <h2>{item?.title}</h2>
                                  <a>View more</a>
                                </figcaption>
                              </figure>
                              <div className="d-flex justify-content-center tm-text-gray">
                                <span className=" mb-1 text-dark fw-bold">
                                  {moment(item?.createdAt?.slice(0, 10)).format(
                                    "MM/DD/YYYY"
                                  )}
                                </span>
                              </div>
                            </a>
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>
                  </div>
                )}

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

export default Catelogues;
