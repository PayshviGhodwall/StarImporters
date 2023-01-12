import React, { useEffect, useState } from "react";
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
  const HeadersApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/homeBanner/getHeaders`;

  useEffect(() => {
    getBanner();
    getCategoryList();
    getTopProductList();
    getBrandList();
  }, []);

  useEffect(() => {
    getProductList();
    getHeaders();
  }, [search]);

  let token = localStorage.getItem("token-user");
  const getProductList = async () => {
    const { data } = await homeSearch({ search: search.replace(".", "") });
    if (!data.error) {
      setProduct(data.results);
    }
  };

  const getBanner = async () => {
    const { data } = await homeBanner();
    if (!data.error) {
      setBanner(data.results);
    }
  };

  const getCategoryList = async () => {
    const { data } = await getCategory();
    if (!data.error) {
      setCategory(data.results);
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
      setProduct(data.results.slice(0, 4));
    }
  };

  const getBrandList = async () => {
    const { data } = await getBrands();
    if (!data.error) {
      setBrand(data.results);
    }
  };

  const searchProduct = async (e) => {
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
          if (data.results.length)
            navigate(`/app/product-detail/${data.results[0]._id}`, {
              state: {
                flavour: data.results[0]?.type,
              },
            });
          console.log(data);
          // navigate(`/app/product-by-search/${data.results[0]._id}`)
          window.location.reload();
        }
      }
    }
  };

  const microphoneSearch = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("micSearch");
      console.log(Dd, "hyiioioio");
      if (Dd) {
        navigate("/app/product-by-search", { state: { search: Dd } });
      }
    }
  };
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="search-form pt-3 rtl-flex-d-row-r">
              <form action="#" method="" onSubmit={() => searchProduct()}>
                <input
                  className="form-control "
                  type="search"
                  placeholder="Search in Star Importers"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <button type="submit" className="me-5">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              <div className="alternative-search-options">
                <Link
                  className="comman_btn text-white ms-1"
                  to=""
                  onClick={microphoneSearch}
                >
                  <i className="fa-solid fa-microphone"></i>
                </Link>
                <a className="comman_btn2 ms-1" onClick={() => cameraScan()}>
                  <i className="fa fa-qrcode"></i>
                </a>
              </div>
            </div>
          </div>
          {search?.length ? (
            <div className="top-products-area py-3">
              <div className="container">
                <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                  <h6> Showing results for "{search}"</h6>
                </div>
                {product.length ? (
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
                                      : require("../../assets/img/product.jpg")
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

                              <div className="product-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <img className="no-data" src="../assets/img/no-data.gif" />
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
                      {banner.map((item, index) => {
                        return (
                          <div className="single-hero-slide item">
                            <img src={item?.banner}></img>
                            <div className="slide-content h-100 d-flex align-items-center">
                              <div className="slide-text">
                                <h4
                                  className="text-white banner_text"
                                  data-animation="fadeInUp"
                                  data-delay="100ms"
                                  data-duration="1000ms"
                                  dangerouslySetInnerHTML={createMarkup(
                                    item?.title
                                  )}
                                ></h4>
                                <p
                                  className="text-white"
                                  style={{ fontSize: "4px" }}
                                  data-animation="fadeInUp"
                                  data-delay="400ms"
                                  data-duration="1000ms"
                                  // dangerouslySetInnerHTML={createMarkup(item?.description)}
                                >
                                  {/* {item.description} */}
                                </p>
                              </div>
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
                  <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                    <h6
                      className="fs-6"
                      // dangerouslySetInnerHTML={createMarkup(allHeaders?.categoryTitle)}
                    >
                      Top Categories
                    </h6>
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
                                <Link
                                  to={`/app/product-category/${item.categoryName}`}
                                >
                                  <img src={item.categoryImage} alt="" />
                                  <span>{item.categoryName}</span>
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
                  <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                    <h6 className="d-flex align-items-center rtl-flex-d-row-r">
                      Popular Brands
                    </h6>
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
                                <img src={item?.brandImage} alt="" />
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
        <AppFooter />
      </div>
    </>
  );
}

export default AppHome;
