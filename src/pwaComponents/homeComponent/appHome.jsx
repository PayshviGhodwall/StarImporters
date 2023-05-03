import React, { useEffect, useRef, useState } from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link, redirect } from "react-router-dom";
import {
  getAllProducts,
  getBrands,
  getCategory,
  homeBanner,
  homeSearch,
  searchByBarcode,
} from "../httpServices/homeHttpService/homeHttpService";
import TopProduct from "./appTopProductComponent";
import { useNavigate } from "react-router-dom";
import { browserName } from "react-device-detect";
import axios from "axios";

function AppHome() {
  const [banner, setBanner] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [hideF, setHideF] = useState({ opacity: "1" });
  const TempToken = `${process.env.REACT_APP_APIENDPOINTNEW}user/newAuthToken`;
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const [tokenWeb, setTokenWeb] = useState();
  useEffect(() => {
    getBanner();
    getCategoryList();
    getTopProductList();
    getBrandList();
  }, []);

  useEffect(() => {
    getProductList();
  }, [search]);

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);

  const getProductList = async () => {
    const { data } = await homeSearch({ search: search?.replace(".", "") });
    if (!data.error) {
      setProduct(data.results);
    }
  };

  const getBanner = async () => {
    const { data } = await homeBanner();
    if (!data.error) {
      localStorage.setItem("banners", JSON.stringify(data?.results));
      setBanner(data.results);
      setBanner(JSON.parse(localStorage.getItem("banners")));
    }
  };

  const getCategoryList = async () => {
    const { data } = await getCategory(activePage);
    if (!data.error) {
      localStorage.setItem(
        "categories",
        JSON.stringify(data?.results?.categories)
      );
      setCategory(data.results?.categories);
      setCategory(JSON.parse(localStorage.getItem("categories")));
    }
  };
  // const getHeaders = async () => {
  //   await axios.get(HeadersApi).then((res) => {
  //     setAllHeaders(res?.data.results.headers[0]);
  //   });
  // };
  const getTopProductList = async () => {
    const { data } = await getAllProducts();
    if (!data.error) {
      localStorage.setItem(
        "products",
        JSON?.stringify(data.results.slice(0, 4))
      );
      setProduct(data.results.slice(0, 4));
      setProduct(JSON.parse(localStorage.getItem("products")));
    }
  };

  const getBrandList = async () => {
    const { data } = await getBrands();
    if (!data.error) {
      setBrand(data.results);
      setLoading(false);
    }
  };

  const searchProduct = async (e) => {
    e.preventDefault();
    navigate("/app/product-by-search", { state: { search: search } });
  };

  const cameraScan = async () => {
    console.log("Clicked");
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("scanBarcode");
      console.log(Dd, "barcode");
      if (Dd) {
        const { data } = await searchByBarcode({
          barcode: Dd,
        });
        if (!data.error) {
          if (data?.results?.length)
            navigate(`/app/product-detail/${data.results[0]?._id}`, {
              state: {
                flavour: data.results[0]?.type,
              },
            });
          console.log(data);
          // navigate(`/app/product-by-search/${data.results[0]._id}`)
          // window.location.reload();
        }
      }
    }
  };

  const microphoneSearch = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("micSearch");
      console.log(Dd, "hyiioioio");
      if (Dd?.length) {
        navigate("/app/product-by-search", { state: { search: Dd } });
      }
    }
  };
  const redirectToWeb = async (e) => {
    e.preventDefault();
    // if (window.flutter_inappwebview) {
    //   await window.flutter_inappwebview.callHandler(
    //     "openExternalBrowser",
    //     `/app/redirect/constantRedirect99/${tokenWeb}`
    //   );
    // }
  };

  const genToken = async () => {
    const token = await axios.post(TempToken);
    console.log(token.data.results.token);
    setTokenWeb(token.data.results.token);
  };
  const handleOutsideClick = (event) => {
    if (ref.current.contains(event.target)) {
      setSearch(null);
      document.getElementById("resetBtn").click();
    }
  };
  const onFileSelection = async (event) => {
    let file = event[0];
    let formData = new FormData();
    formData.append("file", file);
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <>
      <div className="star_imp_app">
        <div>
          <AppHeader />
        </div>
        {loading ? (
          <div className="load_position">
            <div class="loader_new"></div>
          </div>
        ) : (
          <div className="page-content-wrapper">
            <div className="container ">
              <div
                className={
                  browserName === "WebKit" || browserName === "Chrome WebView"
                    ? "search-form pt-3 "
                    : "search-new pt-3 "
                }
              >
                <form className="" style={{ width: "100%" }}>
                  <input
                    className="form-control"
                    type="search"
                    value={search}
                    placeholder="Search in Star Importers"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />

                  <button onClick={searchProduct} className="me-5">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                  <button type="reset" id="resetBtn" className="d-none">
                    reset
                  </button>
                </form>

                {browserName === "WebKit" ||
                browserName === "Chrome WebView" ? (
                  <div className="alternative-search-options">
                    <Link
                      className="comman_btn text-white ms-1"
                      to=""
                      onClick={microphoneSearch}
                    >
                      <i className="fa-solid fa-microphone"></i>
                    </Link>
                    <a
                      className="comman_btn2 ms-1"
                      onClick={() => cameraScan()}
                    >
                      <i className="fa fa-qrcode"></i>
                    </a>
                  </div>
                ) : (
                  <div className="alternative-search-options">
                    {/* <a className="comman_btn2 ms-1">
                      <i className="fa fa-qrcode">
                        <input
                          className="barScanner"
                          id="p-1"
                          type="file"
                          placeholder=""
                          onChange={(e) => onFileSelection(e.target.files)}
                        />
                      </i>
                    </a> */}
                  </div>
                )}
              </div>
            </div>
            {browserName === "WebKit" || browserName === "Chrome WebView" ? (
              <div>
                {search?.length ? (
                  <div className="top-products-area py-1">
                    <div className="container">
                      <div className="section-heading d-flex align-items-center justify-content-between dir-rtl mb-1">
                        <h6> Showing results for "{search}"</h6>
                      </div>
                      {search === "Tobacco" ||
                      search === "tobacco" ||
                      search === "Tobacc " ||
                      search === "Tobacc " ||
                      search === "tobaco" ||
                      search === "tobacco " ||
                      search === "tobac" ||
                      search === "tobacc" ||
                      search === "smoke" ||
                      search === "cigars" ||
                      search === "Cigerettes" ||
                      search === "vapes" ? (
                        <div className="text-center">
                          <img
                            src={require("../../assets/img/noitem.png")}
                          ></img>
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={genToken}
                          >
                            Click Here{" "}
                          </a>
                          to visit our Website for related products.{" "}
                        </div>
                      ) : null}

                      {product?.length ? (
                        <div className="row g-2">
                          {(product || [])
                            ?.filter(
                              (itm, idx) =>
                                itm.category != "639a042ff2f72167b43774de" &&
                                itm.category != "639a7617f2f72167b4377754"
                            )
                            .map((item, index) => {
                              return (
                                <div className="col-6 col-md-4" key={index}>
                                  <div className="card product-card">
                                    <div className="card-body">
                                      <Link
                                        className="product-thumbnail d-block"
                                        to={`/app/product-detail/${item._id}`}
                                        state={{ type: item?.type }}
                                      >
                                        <img
                                          className="mb-2"
                                          src={
                                            item?.type.flavourImage
                                              ? item?.type.flavourImage
                                              : item?.productImage ||
                                                require("../../assets/img/product.jpg")
                                          }
                                          alt=""
                                        />
                                      </Link>

                                      <Link
                                        className="product-title"
                                        to={`/app/product-detail/${item._id}`}
                                        state={{ type: item?.type }}
                                      >
                                        {item.unitName +
                                          "-" +
                                          item?.type.flavour}
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      ) : (
                        <div>
                          <img
                            className="no-data"
                            src="../assets/img/no-data.gif"
                          />
                          <h1 className="text-center"> No Results</h1>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="hero-wrapper">
                      <div className="container">
                        <div className="pt-3">
                          <OwlCarousel
                            className=" hero-slides "
                            autoplay={true}
                            autoplayHoverPause={false}
                            autoplayTimeout={5000}
                            dots={true}
                            loop={true}
                            nav={false}
                            fade={false}
                            items={1}
                          >
                            <div className="single-hero-slide item">
                              <img
                                src={
                                  banner[1]?.banner
                                    ? banner[1]?.banner
                                    : require("../../assets/img/staticBg.png")
                                }
                              ></img>
                              <div className="slide-content h-100 d-flex align-items-center"></div>
                            </div>
                            {banner?.map((item) => {
                              return (
                                <div className="single-hero-slide item">
                                  <img src={item?.banner}></img>
                                  <div className="slide-content h-100 d-flex align-items-center">
                                    {/* <div className="slide-text"></div> */}
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        </div>
                      </div>
                    </div>

                    <div className="product-catagories-wrapper py-3">
                      <div className="container">
                        <div className=" d-flex align-items-center justify-content-between dir-rtl mt-3 mb-2">
                          <h2 className="fs-5">Top Categories</h2>
                          <Link className="btn p-0" to="/app/Categories">
                            View All
                            <i className="ms-1 fa-solid fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        <div className="row g-2 rtl-flex-d-row-r">
                          {category
                            .filter(
                              (itm, idx) =>
                                itm._id != "639a042ff2f72167b43774de" &&
                                idx < 8 &&
                                itm._id != "639a7617f2f72167b4377754"
                            )
                            .map((item, index) => {
                              return (
                                <div className="col-4 d-flex align-items-stretch">
                                  <div className="card catagory-card w-100">
                                    <div className="card-body px-2">
                                      <Link
                                        to={`/app/Sub-Categories/${item._id}`}
                                      >
                                        <img src={item?.categoryImage} alt="" />
                                        <span>{item?.categoryName}</span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <TopProduct />
                    <div className="flash-sale-wrapper mt-3">
                      <div className="container">
                        <div className="d-flex align-items-center justify-content-between rtl-flex-d-row-r mt-2 mb-3">
                          <h6 className="fs-5">Popular Brands</h6>
                          <Link className="btn p-0" to="/app/brands">
                            View All
                            <i className="ms-1 fa-solid fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        {brand.length ? (
                          <OwlCarousel
                            className="flash-sale-slide"
                            autoplay={true}
                            autoplayHoverPause={false}
                            autoplayTimeout={5000}
                            dots={false}
                            loop={true}
                            nav={false}
                            fade={false}
                            items={3}
                            margin={10}
                          >
                            {brand
                              ?.filter((itm, idx) => itm.isTobacco != true)
                              .map((item, index) => {
                                return (
                                  <div
                                    className="card flash-sale-card item"
                                    key={index}
                                  >
                                    <div className="card-body">
                                      <Link to="/app/brands">
                                        <img
                                          width={40}
                                          src={item?.brandImage}
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                );
                              })}
                          </OwlCarousel>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <small>{deviceId}</small> */}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {search?.length ? (
                  <div className="top-products-area py-1">
                    <div className="container">
                      <div className="section-heading d-flex align-items-center justify-content-between dir-rtl mb-1">
                        <h6> Showing results for "{search}"</h6>
                      </div>

                      {product?.length ? (
                        <div className="row g-2">
                          {(product || [])?.map((item, index) => {
                            return (
                              <div className="col-6 col-md-4" key={index}>
                                <div className="card product-card">
                                  <div className="card-body">
                                    <Link
                                      className="product-thumbnail d-block"
                                      to={`/app/product-detail/${item._id}`}
                                      state={{ type: item?.type }}
                                    >
                                      <img
                                        className="mb-2"
                                        src={
                                          item?.type.flavourImage
                                            ? item?.type.flavourImage
                                            : item?.productImage ||
                                              require("../../assets/img/product.jpg")
                                        }
                                        alt=""
                                      />
                                    </Link>

                                    <Link
                                      className="product-title"
                                      to={`/app/product-detail/${item._id}`}
                                      state={{ type: item?.type }}
                                    >
                                      {item.unitName + "-" + item?.type.flavour}
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div>
                          <img
                            className="no-data"
                            src="../assets/img/no-data.gif"
                          />
                          <h1 className="text-center"> No Results</h1>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="hero-wrapper">
                      <div className="container">
                        <div className="pt-3">
                          <OwlCarousel
                            className=" hero-slides "
                            autoplay={true}
                            autoplayHoverPause={false}
                            autoplayTimeout={5000}
                            dots={true}
                            loop={true}
                            nav={false}
                            fade={false}
                            items={1}
                          >
                            <div className="single-hero-slide item">
                              <img
                                src={
                                  banner[1]?.banner
                                    ? banner[1]?.banner
                                    : require("../../assets/img/staticBg.png")
                                }
                              ></img>
                              <div className="slide-content h-100 d-flex align-items-center"></div>
                            </div>
                            {banner?.map((item) => {
                              return (
                                <div className="single-hero-slide item">
                                  <img src={item?.banner}></img>
                                  <div className="slide-content h-100 d-flex align-items-center">
                                    <div className="slide-text"></div>
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        </div>
                      </div>
                    </div>

                    <div className="product-catagories-wrapper py-3">
                      <div className="container">
                        <div className=" d-flex align-items-center justify-content-between dir-rtl mt-3 mb-2">
                          <h2 className="fs-5">Top Categories</h2>
                          <Link className="btn p-0" to="/app/Categories">
                            View All
                            <i className="ms-1 fa-solid fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        <div className="row g-2 rtl-flex-d-row-r">
                          {category
                            .filter((itm, idx) => idx < 6)
                            .map((item, index) => {
                              return (
                                <div className="col-4 d-flex align-items-stretch">
                                  <div className="card catagory-card w-100">
                                    <div className="card-body px-2">
                                      <Link
                                        to={`/app/Sub-Categories/${item._id}`}
                                      >
                                        <img src={item?.categoryImage} alt="" />
                                        <span>{item?.categoryName}</span>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                    <TopProduct />
                    <div className="flash-sale-wrapper mt-3">
                      <div className="container">
                        <div className="d-flex align-items-center justify-content-between rtl-flex-d-row-r mt-2 mb-3">
                          <h6 className="fs-5">Popular Brands</h6>
                          <Link className="btn p-0" to="/app/brands">
                            View All
                            <i className="ms-1 fa-solid fa-arrow-right-long"></i>
                          </Link>
                        </div>
                        {brand.length ? (
                          <OwlCarousel
                            className="flash-sale-slide"
                            autoplay={true}
                            autoplayHoverPause={false}
                            autoplayTimeout={5000}
                            dots={false}
                            loop={true}
                            nav={false}
                            fade={false}
                            items={3}
                            margin={10}
                          >
                            {brand.map((item, index) => {
                              return (
                                <div
                                  className="card flash-sale-card item"
                                  key={index}
                                >
                                  <div className="card-body">
                                    <Link to="/app/brands">
                                      <img
                                        width={40}
                                        src={item?.brandImage}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                </div>
                              );
                            })}
                          </OwlCarousel>
                        ) : (
                          ""
                        )}
                      </div>
                      {/* <small>{deviceId}</small> */}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div ref={ref} style={{ opacity: `${hideF.opacity}` }}>
          <AppFooter />
        </div>
        <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Please Confirm !
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">Open website in External Browser.</div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="modalCLose"
                >
                  Close
                </button>
                <Link
                  // to={}
                  onClick={() => {
                    redirectToWeb();
                    document.getElementById("modalClose").click();
                  }}
                  class="btn btn-primary"
                >
                  Confirm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHome;
