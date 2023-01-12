import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  getAllProducts,
  getByCategory,
} from "../httpServices/homeHttpService/homeHttpService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import WebHeader2 from "./webHeader2";

function AppProductList() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState();
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    getProductList();
    GetBrands();
  }, []);

  const GetBrands = async () => {
    await axios.get(getBrands).then((res) => {
      setBrands(res?.data.results);
    });
  };
  const filterProduct = async (e) => {
    e.preventDefault();
    const { data } = await getByCategory({ category: id, brand: brandName });
    if (!data.error) {
      setProduct(data.results);
      document.getElementById("sideClose").click();
    }
  };
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
    await axios
      .post(addFav, {
        productId: product[index]?._id,
      })
      .then((res) => {
        toast.success(res?.data?.message);
      });
    getProductList();
    setHeart(!heart);
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product[index]?._id,
      })
      .then((res) => {
        toast.error(res?.data?.message);
      });
    getProductList();
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
              class="suha-navbar-toggler ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaOffcanvas"
              aria-controls="suhaOffcanvas"
            >
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <WebHeader2 />

        <div class="page-content-wrapper">
          <div class="py-3">
            <div class="container">
              <div class="row g-1 align-items-center justify-content-end mb-4">
                {/* <div class="col-auto">
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
                </div> */}
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
                            <img class="mb-2" src={item.productImage ? item.productImage : require("../../assets/img/product.jpg") } />
                          </Link>
                          <div class="row mt-1 d-flex align-items-center justify-content-between">
                            <div class="col">
                              <a class="product-title" href="javascript:;">
                                {item.unitName}
                              </a>
                            </div>
                            {/* <div class="col-auto">
                              <Link
                                class="cart_bttn"
                                to=""
                                onClick={() => addToCartt(item._id)}
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

export default AppProductList;
