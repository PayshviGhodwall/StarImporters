import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  getAllProducts,
} from "../httpServices/homeHttpService/homeHttpService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AppProductList() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [product, setProduct] = useState([]);
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    const { data } = await getAllProducts();
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
  const addToFav = async (index) => {
    await axios.post(addFav, {
      productId: product[index]?._id,
    }).then((res)=>{
      toast.success(res?.data?.message);
    })
    getProductList()
    setHeart(!heart);
  };
  const rmvFromFav = async (index) => {
    await axios.post(rmvFav, {
      productId: product[index]?._id,
    }).then((res)=>{
      toast.error(res?.data?.message);
    })
    getProductList()
    setHeart(!heart);
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
              <h6 class="mb-0">Product List</h6>
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
                          id="v1"
                          name="same"
                          type="radio"
                          checked
                        />
                        <label class="form-check-label" for="v1">
                          Price: Low to High
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="v2"
                          name="same"
                          type="radio"
                        />
                        <label class="form-check-label" for="v2">
                          Price: High to Low
                        </label>
                      </div>

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
                  <div class="widget ratings mb-4">
                    <h6 class="widget-title mb-2">Ratings</h6>
                    <div class="widget-desc">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="5star"
                          type="radio"
                          checked
                          name="v1"
                        />
                        <label class="form-check-label" for="5star">
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="4star"
                          type="radio"
                          name="v1"
                        />
                        <label class="form-check-label" for="4star">
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="3star"
                          type="radio"
                          name="v1"
                        />
                        <label class="form-check-label" for="3star">
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="2star"
                          type="radio"
                          name="v1"
                        />
                        <label class="form-check-label" for="2star">
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                        </label>
                      </div>

                      <div class="form-check">
                        <input
                          class="form-check-input"
                          id="1star"
                          type="radio"
                          name="v1"
                        />
                        <label class="form-check-label" for="1star">
                          <i class="fa-solid fa-star text-warning"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                          <i class="fa-solid fa-star text-secondary"></i>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="widget price-range mb-4">
                    <h6 class="widget-title mb-2">Price Range</h6>
                    <div class="widget-desc">
                      <div class="row g-3">
                        <div class="col-6">
                          <div class="form-floating">
                            <input
                              class="form-control"
                              id="floatingInput"
                              type="text"
                              placeholder="1"
                              value="1"
                            />
                            <label for="floatingInput">Min</label>
                          </div>
                        </div>
                        <div class="col-6">
                          <div class="form-floating">
                            <input
                              class="form-control"
                              id="floatingInput"
                              type="text"
                              placeholder="1"
                              value="5000"
                            />
                            <label for="floatingInput">Max</label>
                          </div>
                        </div>
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
                {(product || [])?.map((item, index) => {
                  return (
                    <div class="col-6 col-md-4 d-flex align-items-stretch">
                      <div class="card product-card w-100">
                        <div class="card-body">
                        <a class="wishlist-btn" href="#">
                        {item?.favourities ? (
                          <i
                            class="fa fa-heart"
                            onClick={() => {
                              rmvFromFav(index);
                            }}
                            style={{ color: "#3e4093 " }}
                          />
                        ) : (
                          <i
                            class="fa fa-heart"
                            onClick={() => {
                              addToFav(index);
                            }}
                            style={{ color: "#E1E1E1 " }}
                          />
                        )}
                      </a>

                          <Link
                            class="product-thumbnail d-block"
                            to={`/app/product-detail/${item._id}`}
                          >
                            <img class="mb-2" src={item.productImage} alt="" />
                          </Link>
                          <div class="row mt-1 d-flex align-items-center justify-content-between">
                            <div class="col">
                              <a class="product-title" href="javascript:;">
                                {item.unitName}
                              </a>
                            </div>
                            <div class="col-auto">
                              <Link
                                class="cart_bttn"
                                to=""
                                onClick={() => addToCartt(item._id)}
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

export default AppProductList;
