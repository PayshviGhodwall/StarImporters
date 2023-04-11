import React, { useEffect, useRef, useState } from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
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
import DOMPurify from "dompurify";
import axios from "axios";

function AppHome() {
  const [banner, setBanner] = useState([]);
  const [category, setCategory] = useState([]);
  const [allHeaders, setAllHeaders] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [hideF, setHideF] = useState({ opacity: "1" });
  const HeadersApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeBanner/getHeaders`;
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  let deviceId = localStorage.getItem("device");
  console.log(deviceId);
  useEffect(() => {
    getBanner();
    getCategoryList();
    getTopProductList();
    getBrandList();

    // if (typeof window !== "undefined") {
    //   window.onscroll = () => {
    //     let currentScrollPos = window.pageYOffset;
    //     let maxScroll = document.body.scrollHeight - window.innerHeight;
    //     let minScroll = document.body.scrollHeight - currentScrollPos;
    //     console.log(maxScroll, "max");
    //     console.log(minScroll, "min");
    //     switch (currentScrollPos) {
    //       case currentScrollPos > 10:
    //         setHideF({ opacity: "50%" });
    //         break;
    //       case 10:
    //         setHideF({ opacity: "0%" });
    //       case 2:
    //         break;
    //     }

    //     if (currentScrollPos > 10) {
    //       console.log(currentScrollPos);
    //     }
    //     if (currentScrollPos < maxScroll || currentScrollPos <= maxScroll) {
    //       setHideF({ opacity: "1" });
    //     }
    //   };
    // }
  }, []);

  useEffect(() => {
    getProductList();
    getHeaders();
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
  const getHeaders = async () => {
    await axios.get(HeadersApi).then((res) => {
      setAllHeaders(res?.data.results.headers[0]);
    });
  };
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

  const onSearch = () => {
    if (search?.length >= 3) {
      navigate("/app/product-by-search", { state: { search: search } });
    }
  };

  const cameraScan = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("scanBarcode");
      if (Dd) {
        const { data } = await searchByBarcode({
          barcode: Dd,
        });
        if (!data.error) {
          if (data?.results?.length)
            navigate(`/app/product-detail/${data.results[0]._id}`, {
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

  const handleOutsideClick = (event) => {
    if (ref.current.contains(event.target)) {
      setSearch(null);
      document.getElementById("resetBtn").click();
    }
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
                  deviceId !== "" ? "search-form pt-3 " : "search-new pt-3 "
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
                {deviceId != "" ? (
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
                  <div className="d-none"></div>
                )}
              </div>
            </div>
            {search?.length ? (
              <div className="top-products-area py-1">
                <div className="container">
                  <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
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
                        {banner?.map((item, index) => {
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
                        .filter((item, idx) => idx < 6)
                        .map((item, index) => {
                          return (
                            <div className="col-4 d-flex align-items-stretch">
                              <div className="card catagory-card w-100">
                                <div className="card-body px-2">
                                  <Link to={`/app/Sub-Categories/${item._id}`}>
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
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={ref} style={{ opacity: `${hideF.opacity}` }}>
          <AppFooter />
        </div>
      </div>
    </>
  );
}

export default AppHome;
