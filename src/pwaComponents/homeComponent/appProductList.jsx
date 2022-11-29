import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { getAllProducts } from "../httpServices/homeHttpService/homeHttpService";

function AppProductList() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    const { data } = await getAllProducts();
    if (!data.error) {
      setProduct(data.results.slice(0, 4));
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="py-3">
            <div className="container">
              <div className="row g-1 align-items-center justify-content-end mb-4">
                <div className="col-4">
                  <div className="select-product-catagory">
                    <select
                      className="right small border-0"
                      id="selectProductCatagory"
                      name="selectProductCatagory"
                      aria-label="Default select example"
                    >
                      <option selected>Short by</option>
                      <option value="1">Newest</option>
                      <option value="2">Popular</option>
                      <option value="3">Ratings</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-2">
                {product.map((item, index) => {
                  return (
                    <div className="col-6 col-md-4">
                      <div className="card product-card">
                        <div className="card-body">
                          <Link
                            className="product-thumbnail d-block"
                            to={`/app/product-detail/${item._id}`}
                          >
                            <img
                              className="mb-2"
                              src={item.productImage}
                              alt=""
                            />
                          </Link>
                          <Link
                            className="product-title"
                            to="/app/product-detail"
                          >
                            {item.unitName}
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

                {product.map((item, index) => {
                  return (
                    <div className="col-12">
                      <div className="horizontal-product-card">
                        <div className="d-flex align-items-center">
                          <div className="product-thumbnail-side">
                            <Link
                              className="product-thumbnail shadow-sm d-block"
                              to={`/app/product-detail/${item._id}`}
                            >
                              <img src={item.productImage} alt="" />
                            </Link>
                          </div>
                          <div className="product-description">
                            <a className="wishlist-btn" href="#">
                              <i className="far fa-heart"></i>
                            </a>
                            <Link
                              className="product-title d-block"
                              to="/app/product-detail"
                            >
                              {item.unitName}
                            </Link>

                            <div className="product-rating">
                              <i className="fa-solid fa-star"></i>4.88{" "}
                              <span className="ms-1">(39 review)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductList;
