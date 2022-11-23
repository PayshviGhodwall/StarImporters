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

function TopProduct() {
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
      <div className="top-products-area py-3">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
            <h6>Top Products</h6>
            <Link className="btn p-0" to="/app/product-list">
              View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
          <div className="row g-2">
            {product.map((item, index) => {
              return (
                <div className="col-6 col-md-4">
                  <div className="card product-card">
                    <div className="card-body">
                      <Link
                        className="product-thumbnail d-block"
                        to="/app/product-detail"
                      >
                        <img className="mb-2" src={item.productImage} alt="" />
                      </Link>
                      <Link className="product-title" to="/app/product-detail">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default TopProduct;
