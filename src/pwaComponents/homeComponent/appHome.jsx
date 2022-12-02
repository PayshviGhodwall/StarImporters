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
} from "../httpServices/homeHttpService/homeHttpService";
import TopProduct from "./appTopProductComponent";
import { useNavigate } from "react-router-dom";

function AppHome() {
  const [banner, setBanner] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBanner();
    getCategoryList();
    getProductList();
    getBrandList();
  }, []);

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
  const getProductList = async () => {
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

  const searchProduct = async () => {
    navigate("/app/product-by-search");
  };

  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div
              className="search-form pt-3 rtl-flex-d-row-r"
              onClick={() => searchProduct()}
            >
              <form action="#" method="">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search in Star Importers"
                />
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>

              <div className="alternative-search-options">
                <Link className="comman_btn text-white ms-1" to="">
                  <i className="fa-solid fa-microphone"></i>
                </Link>
                <a className="comman_btn2 ms-1" href="#">
                  <i className="fa fa-qrcode"></i>
                </a>
              </div>
            </div>
          </div>

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
                        <img src={item.banner}></img>
                        <div className="slide-content h-100 d-flex align-items-center">
                          <div className="slide-text">
                            <h4
                              className="text-white banner_text"
                              data-animation="fadeInUp"
                              data-delay="100ms"
                              data-duration="1000ms"
                            >
                              {item.title}
                            </h4>
                            <p
                              className="text-white"
                              data-animation="fadeInUp"
                              data-delay="400ms"
                              data-duration="1000ms"
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
            <h6>Top Categories</h6>
            <Link className="btn p-0" to="/app/Categories">
              View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
              <div className="row g-2 rtl-flex-d-row-r">
                {category.filter((item, idx) => idx < 6).map((item, index) => {
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

          <div className="container">
            <div className="cta-text dir-rtl p-4 p-lg-5">
              <div className="row">
                <div className="col-9">
                  <h4 className="text-white mb-1">
                    20% discount on women's care items
                  </h4>
                  <p className="text-white mb-2 opacity-75">
                    Offer will continue till this Friday.
                  </p>
                  <a className="comman_btn" href="#">
                    Grab this offer
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flash-sale-wrapper mt-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                <h6 className="d-flex align-items-center rtl-flex-d-row-r">
                  Popular Brands
                </h6>
                <Link className="btn p-0" to="/app/brands">
                  View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
                </Link>
              </div>
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
                    <div className="card flash-sale-card item">
                      <div className="card-body">
                        <Link to="/app/brands">
                          <img src={item.brandImage} alt="" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AppHome;
