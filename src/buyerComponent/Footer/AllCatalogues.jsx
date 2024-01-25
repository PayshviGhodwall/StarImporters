import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import $ from "jquery";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import Starlogo from "../../assets/img/logo.png";
import { Link, useNavigate } from "react-router-dom";

const AllCatalogues = () => {
  const allPdf = `${process.env.REACT_APP_APIENDPOINTNEW}user/getCatalogs`;
  // var pages = document.getElementsByClassName("page");
  const navigate = useNavigate();
  const [catalogs, setCatalogs] = useState([]);

  useEffect(() => {
    getCatalogs();
  }, []);

  const getCatalogs = async () => {
    const { data } = await axios.patch(allPdf, {
      type: "Catalog",
    });
    console.log(data);
    if (!data.error) {
      setCatalogs(data?.results?.catalog);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTopSecx">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>POPULAR CATEGORIES</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  ">
                        Home <span className="arrow mx-2">&#9679;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <a className="text-decoration-none text-white fs-6 ">
                        All Categories
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="Sub-Categories-page comman_paddings">
        <div class="container">
          <div class="row comman_divvision mx-0">
            {/* <a class="view_all" href="javascript:;">
                View All
              </a> */}
            <div class="col-12 mb-3">
              <div class="comn_heads mb-5">
                <h2>All Catalogs</h2>
              </div>
            </div>
            <div class="col-md-12">
              <div class="row justify-content-center comman_product1">
                {(catalogs || [])?.map((item, index) => (
                  <div class="col-lg-3 col-md-4 mb-5">
                    <a class="categorynew_box text-decoration-none">
                      <a
                        target="_blank"
                        onClick={() => {
                          item?.type === "ByPDF"
                            ? navigate(
                                `/Catelog-Flyers/Preview-Catalog-pdf/${item?._id}`
                              )
                            : navigate(
                                `/Catelog-Flyers/Preview-Catalog/${item?._id}`
                              );
                        }}>
                        <div class="categorynew_img p-3">
                          <img
                            src={
                              item?.coverImage
                                ? item?.coverImage
                                : require("../../assets/img/logoCat.jpg")
                            }
                            alt=""
                          />
                        </div>
                      </a>
                      <span>{item?.title}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="d-none">
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
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer/All-Catalogs">
                    Catalogs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer/All-Flyers">
                    Monthly Flyers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/about-us">
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div
            className="bg-dark p-5 "
            style={{
              height: "100vh",
            }}>
            <p className="text-white mb-4 fs-5">
              {"CATALOG&FLYERS" + "->" + "Catalogs"}
            </p>

            <div className="row ">
              {catalogs?.map((itm, id) => (
                <div className="col-auto mb-3">
                  <div
                    class="cardR wallet"
                    onClick={() => {
                      navigate("/app/events/catelog&flyer/View", {
                        state: itm?.url,
                      });
                    }}>
                    <div class="overlay"></div>
                    <div class="circle">
                      <img src={require("../../assets/img/iconCata.png")}></img>
                    </div>
                    <p>{itm?.title}</p>
                    {/* <span>{itm?.createdAt?.slice(0,10)}</span> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AllCatalogues;
