import React, { useEffect, useState } from "react";
import logo from "../../../assets/img/star_logo.png";
import print from "../../../assets/img/printer-line.svg";
import leftLine from "../../../assets/img/skip-left-line.svg";
import bookmark from "../../../assets/img/bookmark-3-line.svg";
import down from "../../../assets/img/file-download-line.svg";
import full from "../../../assets/img/fullscreen-exit-line.svg";
import rightLine from "../../../assets/img/skip-right-line.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../../../assets/css/flip.css";

const PreviewCate = () => {
  const getTemp = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/viewTemplate/`;
  const width = window.innerWidth;
  const [flipKey, setFlipKey] = useState(Math.random());
  const [zoom, setZoom] = useState(1); // Initial zoom level
  let { id } = useParams();
  const [templatePreview, setTemplatePreview] = useState([]);
  const [pageS, setPageS] = useState();
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const navigate = useNavigate();
  useEffect(() => {
    GetTemplates();
  }, [pageS]);

  var pages = document.getElementsByClassName("page");

  const GetTemplates = async () => {
    await axios.get(getTemp + id).then((res) => {
      let data = res?.data.results?.catalog?.pages;
      setTemplatePreview(data);
      setFlipKey(Math.random());

      for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i % 2 === 0) {
          page.style.zIndex = pages.length - i;
        }
      }

      for (var i = 0; i < pages.length; i++) {
        pages[i].pageNum = i + 1;
        console.log(pages[i], "ll");

        pages[i].onclick = function () {
          if (this.pageNum % 2 === 0) {
            console.log(this.pageNum, "okayN");
            this.classList.remove("flipped");
            this.previousElementSibling.classList.remove("flipped");
          } else {
            console.log(this.pageNum, "okayN");
            this.classList.add("flipped");
            this.nextElementSibling.classList.add("flipped");
          }
        };
      }
    });
  };

  const handleNext = () => {
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      if (i % 2 === 0) {
        page.style.zIndex = pages.length - i;
      }
    }

    for (var i = 0; i < pages.length; i++) {
      pages[i].pageNum = i + 1;
      console.log(pages[i], "ll");

      pages[i].onclick = function () {
        if (this.pageNum % 2 === 0) {
          console.log(this.pageNum, "okayN");
          this.classList.remove("flipped");
          this.previousElementSibling.classList.remove("flipped");
        } else {
          console.log(this.pageNum, "okayN");
          this.classList.add("flipped");
          this.nextElementSibling.classList.add("flipped");
        }
      };
    }
  };

  const handlePrev = () => {
    document.getElementById("pageOne").click();
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom * 1.4); // Increase zoom level by 20%
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => (prevZoom > 0.2 ? prevZoom * 0.8 : prevZoom)); // Decrease zoom level by 20%, with a minimum of 20%
  };

  return (
    <div key={flipKey}>
      <div className="star_catalog bg-white">
        <div className="star_header border-bottom">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-auto">
              <div className="star_logo">
                <img src={logo} alt="" />
              </div>
              <button onClick={() => handleZoomIn()}>
                <i class="icon-zoom-in"></i>{" "}
              </button>
              <button onClick={() => handleZoomOut()}>
                <i class="icon-zoom-in"></i>{" "}
              </button>
            </div>
            <div className="col">
              <div className="star_catalog_menus">
                <div className="catalog_menus_inner">
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Print"
                    className="meeenus"
                    href="javascript:;">
                    <img src={print} alt="" />
                  </a>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Share"
                    className="meeenus"
                    href="javascript:;">
                    <img src="assets/img/share-line.svg" alt="" />
                  </a>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click to view page thumbnail"
                    className="meeenus"
                    href="javascript:;">
                    <img src="assets/img/grid-fill.svg" alt="" />
                  </a>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Allow to search a word"
                    className="meeenus"
                    href="javascript:;">
                    <img src="assets/img/search-line.svg" alt="" />
                  </a>
                </div>
                <div className="catalog_pagination">
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click this button to view this previous page"
                    href="javascript:;">
                    <img src={leftLine} alt="" />
                  </a>
                  <div className="form-group mt-3">
                    <input
                      className="form-control"
                      type="text"
                      defaultValue="1 / 8"
                    />
                  </div>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click this button to view this Next page">
                    <img src={rightLine} alt="" />
                  </a>
                </div>
                <div className="catalog_menus_inner">
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="My Bookmark"
                    className="meeenus">
                    <img src={bookmark} alt="" />
                  </a>
                  <a
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="Click to View Document"
                    className="meeenus">
                    <img src={down} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-auto">
              <div className="full_screen text-end">
                <a className="icons_btns" href="javascript:;">
                  <img src={full} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="star_catalog bg-white">
          <div className="star_catalog_inner position-relative">
            <a className="arrow_btn previous_btn" onClick={() => handlePrev()}>
              <img src={leftLine} alt="" />
            </a>
            <div className="book">
              <div  id="pages" className="pages">
                {templatePreview?.map((item, index) => (
                  <>
                    {(item?.type === "Intro" && (
                      <div  className="page shadow" key={index}>
                        <div className="first_page">
                          <img
                            className="bg_img"
                            src={item?.backgroundImage}
                            alt=""
                          />
                          <img
                            className="qr_img"
                            src={item?.backgroundImage}
                            alt=""
                          />
                        </div>
                      </div>
                    )) ||
                      (item?.type === "ProductListing" && (
                        <div className="page shadow text-center">
                          <div
                            className="comman_inner_bg"
                            style={{
                              backgroundImage: `url(${item?.backgroundImage})`,
                            }}>
                            {console.log(item?.products, typeof item?.products)}
                            <div className="comman_head">
                              <h2>{item?.pageTitle}</h2>
                            </div>
                            <div className="product_main mx-2">
                              {item?.products?.map((itm, id) => (
                                <div className="product_box">
                                  <Link
                                    className="main_products"
                                    to={`/AllProducts/Product/${itm?.productId?.slug}`}
                                    target="_blank">
                                    <div className="product_img">
                                      <img
                                        src={itm?.productId?.productImage}
                                        alt=""
                                      />
                                    </div>
                                    <h2>
                                      {itm?.productId?.unitName?.slice(0, 20)}
                                    </h2>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )) ||
                      (item?.type === "Banner" && (
                        <div className="page shadow">
                          <div
                            className="comman_inner_bg"
                            style={{
                              backgroundImage: `url(${item?.backgroundImage})`,
                            }}>
                            <div className="comman_head">
                              <h2>{item?.pageTitle}</h2>
                            </div>
                            <div className="wholesale_main text-center">
                              <Link
                                to={item?.bannerURL1}
                                className="wholesale_img">
                                <img src={item?.banners[0]} alt="" />
                              </Link>
                              <Link
                                to={item?.bannerURL1}
                                className="wholesale_img">
                                <img src={item?.banners[1]} alt="" />
                              </Link>
                              <Link
                                to={item?.bannerURL1}
                                className="wholesale_img">
                                <img src={item?.banners[2]} alt="" />
                              </Link>

                              <div className="bottom_line text-center">
                                {item?.footer}
                              </div>
                            </div>
                          </div>
                        </div>
                      )) ||
                      (item?.type === "ProductDetail" && (
                        <div className="page shadow">
                          <div
                            className="comman_inner_bg"
                            style={{
                              backgroundImage: `url(${item?.backgroundImage})`,
                            }}>
                            <div className="comman_head">
                              <h2>{item?.pageTitle}</h2>
                            </div>

                            <div className="product_shooww text-center">
                              <div className="row justify-content-center text-center">
                                <div className="col-12 ">
                                  <Link
                                    to={`/AllProducts/Product/${item?.productId?.slug}`}
                                    target="_blank">
                                    <img
                                      className="product_logo_img"
                                      src={item?.productLogo}
                                      alt=""
                                    />
                                  </Link>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <div className="row">
                                    {item?.productId?.type
                                      ?.filter((val, id) => id < 4)
                                      ?.map((itm, ind) => (
                                        <div className="col-md-6">
                                          <Link
                                            to={`/AllProducts/Product/${item?.productId?.slug}`}
                                            state={{
                                              type: itm,
                                            }}
                                            target="_blank"
                                            className="product_shooww_img text-center">
                                            <img
                                              src={itm?.flavourImage}
                                              alt=""
                                            />
                                            <div className="show_details_flav">
                                              {itm?.flavour} <br />{" "}
                                            </div>
                                          </Link>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                                <div className="col-6">
                                  <Link
                                    to={`/AllProducts/Product/${item?.productId?.slug}`}
                                    target="_blank"
                                    className="product_logo">
                                    <img
                                      src={item?.productId?.productImage}
                                      alt=""
                                    />
                                    <div className="show_details me-5">
                                      {item?.productId?.unitName} <br />
                                    </div>
                                  </Link>
                                </div>
                              </div>
                              <div className="bottom_line text-center">
                                {item?.footer}
                              </div>
                            </div>
                          </div>
                        </div>
                      )) ||
                      (item?.type === "Summary" && (
                        <div className="page shadow">
                          <div
                            className="comman_inner_bg"
                            style={{
                              backgroundImage: `url(${item?.backgroundImage})`,
                            }}>
                            <div className="comman_head">
                              <h2>{item?.pageTitle}</h2>
                            </div>

                            <div className="wholesale_main_summary text-center">
                              <Link to={item?.bannerURL1} className="d-none">
                                <video
                                  className="main_video_summary "
                                  autoPlay
                                  loop
                                  oncanplay="this.muted=true"
                                  muted={true}
                                  preload="auto">
                                  <source
                                    src={
                                      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                                    }
                                  />
                                </video>
                              </Link>

                              <Link
                                to={item?.bannerURL1}
                                className="wholesale_img">
                                <img src={item?.banners[0]} alt="" />
                              </Link>

                              <Link
                                to={item?.bannerURL2}
                                className="wholesale_img">
                                <img src={item?.banners[1]} alt="" />
                              </Link>

                              <Link
                                to={item?.bannerURL3}
                                className="wholesale_img">
                                <img src={item?.banners[2]} alt="" />
                              </Link>

                              <div className="bottom_line text-center">
                                {item?.footer}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                ))}
                <div className="page shadow bg-white"></div>
              </div>
            </div>
            <a className="arrow_btn next_btn">
              <img src="assets/img/skip-right-line.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCate;
