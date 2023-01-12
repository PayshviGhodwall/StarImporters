import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  getByCategory,
  getSubCategories,
} from "../httpServices/homeHttpService/homeHttpService";
import TopProduct from "./appTopProductComponent";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function AppProductCategory() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [sortValue, setSortValue] = useState("");
  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [heart, setHeart] = useState(false);
  const [brandName, setBrandName] = useState();
  const [category, setCategory] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();
  let token = localStorage.getItem("token-user");

  useEffect(() => {
    getCategoryList();
    getProductList();
    GetBrands();
  }, []);
  const GetBrands = async () => {
    await axios.get(getBrands).then((res) => {
      setBrands(res?.data.results);
    });
  };
  const getCategoryList = async () => {
    const { data } = await getSubCategories();
    if (!data.error) {
      setCategory(data.results);
    }
  };

  const getProductList = async () => {
    const { data } = await getByCategory({ category: id });
    if (!data.error) {
      setProduct(data.results);
    }
  };
  const addToCartt = async (id, index) => {
    const formData = {
      productId: id,
      quantity: 1,
      flavour: product[index]?.products.type[0],
    };
    const { data } = await addToCart(formData);
    if (!data.error) {
      navigate("/app/cart");
    }
  };

  const filterProduct = async (e) => {
    e.preventDefault();
    const { data } = await getByCategory({ category: id, brand: brandName });
    if (!data.error) {
      setProduct(data.results);
      document.getElementById("sideClose").click();
    }
  };
  const sortProducts = async (e) => {
    const { data } = await getByCategory({
      category: id,
      sortBy: e.target.value,
    });
    if (!data.error) {
      setProduct(data.results);
    }
  };
  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product[index]?.products?._id,
        flavour: product[index]?.products?.type[0],
      })
      .then((res) => {
        if (!res.error) {
          setHeart(!heart);
          getProductList();
        }
      });
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product[index]?.products?._id,
        flavour: product[index]?.products?.type[0],
      })
      .then((res) => {
        if (!res.error) {
          setHeart(!heart);
          getProductList();
        }
      });
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
              <h6 class="mb-0">{id}</h6>
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
            id="sideClose"
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
                      {(brands || [])
                        ?.filter((item, idx) => idx < 5)
                        .map((item, index) => (
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="check5"
                              onChange={() => setBrandName(item?._id)}
                            />
                            <label class="form-check-label" for="zara">
                              {item?.brandName}
                            </label>
                          </div>
                        ))}
                    </div>
                    <div className="col-12 mt-3">
                      <p
                        className="more_btn text-decoration-none
                        "
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          navigate("/app/brands");
                        }}
                      >
                        More
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="apply-filter-btn">
                    <a class="comman_btn" onClick={filterProduct}>
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
                      onChange={(e) => sortProducts(e)}
                    >
                      <option selected>Short by</option>
                      <option value="1">A to Z</option>
                      <option value="0">Z to A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row g-2 product_list_main">
                {(product || [])?.map((item, index) => {
                  return (
                    <div
                      class="col-6 col-md-4 d-flex align-items-stretch"
                      key={index}
                    >
                      <div class="card product-card w-100">
                        <div class="card-body">
                          {token?.length ? (
                            <a class="wishlist-btn">
                              {item?.favourite ? (
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
                          ) : null}
                          <Link
                            class="product-thumbnail d-block"
                            to={`/app/product-detail/${item?.products?._id}`}
                            state={{ type: item?.products?.type[0] }}
                          >
                            <img
                              class="mb-2"
                              src={
                                item?.products?.type[0]?.flavourImage
                                  ? item?.products?.type[0]?.flavourImage
                                  : require("../../assets/img/product.jpg")
                              }
                              alt=""
                            />
                          </Link>
                          <div class="row mt-1 d-flex align-items-center justify-content-between">
                            <div class="col">
                              <a class="product-title" href="javascript:;">
                                {item?.products?.unitName +
                                  "-" +
                                  item?.products?.type[0]?.flavour}
                              </a>
                              <div className="product-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            </div>
                            {/* <div class="col-auto">
                              <Link
                                class="cart_bttn"
                                to=""
                                onClick={() => addToCartt(item?.products?._id)}
                              >
                                <i class="fa-light fa-plus"></i>
                              </Link>
                            </div> */}
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

export default AppProductCategory;
