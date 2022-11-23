import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { getSubCategories } from "../httpServices/homeHttpService/homeHttpService";
import TopProduct from "./appTopProductComponent";

function AppProductCategory() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const { data } = await getSubCategories();
    if (!data.error) {
      setCategory(data.results);
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="pt-3">
            <div className="container">
              <div
                className="catagory-single-img"
                style={{ backgroundImage: "url('../assets/img/banner_2.png')" }}
              ></div>
            </div>
          </div>

          <div className="product-catagories-wrapper py-3">
            <div className="container">
              <div className="section-heading rtl-text-right">
                <h6>Sub Category</h6>
              </div>
              <div className="product-catagory-wrap">
                <div className="row g-2 rtl-flex-d-row-r">
                  {category.map((item, index) => {
                    return (
                      <div className="col-4 d-flex align-items-stretch">
                        <div className="card catagory-card w-100">
                          <div className="card-body px-2">
                            <Link to="/app/product-category">
                              <img src={item.subCategoryImage} alt="" />
                              <span>{item.subCategoryName}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <TopProduct />
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductCategory;
