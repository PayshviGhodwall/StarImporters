import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  getBrands,
  getByBrands,
  getByCategory,
  getSubCategories,
} from "../httpServices/homeHttpService/homeHttpService";
import TopProduct from "./appTopProductComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AppProductBrands() {
  const [brands, setBrands] = useState([]);
  const [product, setProduct] = useState([]);

  let location = useLocation();
  const navigate = useNavigate();
   let name = location.state?.name
  useEffect(() => {
    getBrandsList();
    getProductList();
  }, []);

  const getBrandsList = async () => {
    const { data } = await getBrands();
    if (!data?.error) {
      setBrands(data.results);
    }
  };

  const getProductList = async () => {
    const { data } = await getByBrands({ brand: name });
    if (!data.error) {
      setProduct(data.results);
    }
  };
  const addToCartt = async (id) => {
    const formData = {
      productId: id,
      quantity: 1,
    };
    console.log(formData);
    const { data } = await addToCart(formData);
    if (!data.error) {
      navigate("/app/cart");
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea">
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2">
              <Link to="/app/home">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>

            <div class="page-heading">
              <h6 class="mb-0">{name}</h6>
            </div>

            <div
              class="filter-option ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaFilterOffcanvas"
              aria-controls="suhaFilterOffcanvas"
            >
              <i class="fa-solid fa-sliders"></i>
            </div>
          </div>
        </div>
        <div
          class="offcanvas offcanvas-start suha-filter-offcanvas-wrap"
          tabindex="-1"
          id="suhaFilterOffcanvas"
          aria-labelledby="suhaFilterOffcanvasLabel"
        >
          <button
            class="btn-close text-reset"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>

          <div class="offcanvas-body py-5">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="widget catagory mb-4">
                    <h6 class="widget-title mb-2">Brand</h6>
                    <div class="widget-desc">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="zara"
                          type="checkbox"
                          checked
                        />
                        <label class="form-check-label" for="zara">
                          Vape
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="Gucci"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="Gucci">
                          Smoke
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="Nike"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="Nike">
                          C-Store & Novelty
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="Denim"
                          type="checkbox"
                        />
                        <label class="form-check-label" for="Denim">
                          Glass & Sillicone
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="widget catagory mb-4">
                    <h6 class="widget-title mb-2">Sort By</h6>
                    <div class="widget-desc">
                      

                      

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="v3"
                          name="same"
                          type="radio"
                        />
                        <label class="form-check-label" for="v3">
                          Alphabetically: A - Z
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="v4"
                          name="same"
                          type="radio"
                        />
                        <label class="form-check-label" for="v4">
                          Alphabetically: Z - A{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
               

                <div class="col-12">
                  <div class="apply-filter-btn">
                    <a class="comman_btn" href="#">
                      Apply Filter
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-content-wrapper">
          <div class="py-3">
            <div class="container">
              <div class="row g-1 align-items-center justify-content-end mb-4">
                <div class="col-auto">
                  <div class="custom_select_design">
                    <select
                      class=""
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
              <div class="row g-2 product_list_main">
                {product.map((item, index) => {
                  return (
                    <div class="col-6 col-md-4 d-flex align-items-stretch">
                      <div class="card product-card w-100">
                        <div class="card-body">
                          <a class="wishlist-btn" href="#">
                            <i class="fa-solid fa-heart"></i>
                          </a>

                          <Link
                            class="product-thumbnail d-block"
                            to={`/app/product-detail/${item?.products?._id}`}
                          >
                            <img
                              class="mb-2"
                              src={item?.products?.productImage}
                              alt=""
                            />
                          </Link>
                          <div class="row mt-1 d-flex align-items-center justify-content-between">
                            <div class="col">
                              <a class="product-title" href="javascript:;">
                                {item.products.unitName}
                              </a>
                              <div className="product-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            </div>
                            <div class="col-auto">
                              <Link
                                class="cart_bttn"
                                to=""
                                onClick={() => addToCartt(item?.products?._id)}
                              >
                                <i class="fa-light fa-plus"></i>
                              </Link>
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

export default AppProductBrands;
