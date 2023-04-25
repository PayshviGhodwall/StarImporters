import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppFooter from "./appFooter";
import "owl.carousel/dist/assets/owl.carousel.css";
import {
  addToCart,
  getBrands,
  getByBrands,
  getByCategory,
  getSubCategories,
} from "../httpServices/homeHttpService/homeHttpService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import WebHeader2 from "./webHeader2";
import Swal from "sweetalert2";
import Search from "./search";
import { charSearchKey } from "../../selecter";
import { useRecoilValue } from "recoil";

function AppProductBrands() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [product, setProduct] = useState([]);
  const [heart, setHeart] = useState(false);
  const [brands, setBrands] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [bName, setBName] = useState("");
  let location = useLocation();
  const navigate = useNavigate();
  let ref = useRef();
  const name = location.state?.name;
  let token = localStorage.getItem("token-user");
  const searchKey = useRecoilValue(charSearchKey);
  console.log(searchKey);

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

  const sortProducts = async (e) => {
    const { data } = await getByBrands({
      brand: name ? name : bName,
      sortBy: parseInt(e.target.value),
      page: activePage,
    });
    if (!data.error) {
      setProduct(data.results.products);
    }
  };

  const getProductList = async () => {
    const { data } = await getByBrands({
      brand: name,
      page: activePage,
    });
    if (!data.error) {
      setProduct(data.results.products);
    }
  };

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product[index]?.products?._id,
        flavour: product[index]?.products?.type[0],
      })
      .then((res) => {
        Swal.fire({
          title: res?.data.message,
          button: "ok",
        });
      });
    getProductList();
    setBName(name);
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product[index]?.products?._id,
        flavour: product[index]?.products?.type[0],
      })
      .then((res) => {
        Swal.fire({
          title: res?.data.message,
          button: "ok",
        });
      });
    getProductList();
    setBName(name);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () =>
      document.removeEventListener("click", handleOutsideClick, true);
  }, []);
  const handleOutsideClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      document.getElementById("closeModal").click();
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea" ref={ref}>
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2">
              <Link to="/app/home">
                <i className="fa-solid fa-house"></i>
              </Link>
            </div>

            <div class="page-heading">
              <h6 class="mb-0">{name}</h6>
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
            <Search />

            <div class="container mt-2">
              {searchKey?.length ? null : (
                <div>
                  <div class="row g-1 align-items-center justify-content-end mb-1 mt-1 ">
                    <div class="col-auto">
                      <div class="custom_select_design">
                        <select
                          class=""
                          name="selectProductCatagory"
                          aria-label="Default select example"
                          onChange={(e) => sortProducts(e)}
                        >
                          <option selected>Sort by</option>
                          <option value="1">A to Z</option>
                          <option value="-1">Z to A</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {product?.length ? (
                    <div className="col-lg-12 col-sm-12 d-flex justify-content-between mt-1 mb-1">
                      <div
                        class={
                          activePage <= 1
                            ? "opacity-0"
                            : "back-button me-2 me-2 "
                        }
                      >
                        <Link
                          state={{ naek: "ki" }}
                          onClick={() =>
                            activePage <= 1
                              ? setActivePage(1)
                              : setActivePage(activePage - 1)
                          }
                        >
                          <i class="fa-solid fa-arrow-left-long"></i> Prev
                        </Link>
                      </div>
                      <div
                        class={
                          activePage === maxPage
                            ? "d-none"
                            : "back-button me-2 me-2 "
                        }
                      >
                        <Link
                          state={{ naek: "ki" }}
                          onClick={() =>
                            activePage === maxPage
                              ? setActivePage(maxPage)
                              : setActivePage(activePage + 1)
                          }
                        >
                          Next <i class="fa-solid fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  ) : null}
                  <div class="row g-2 product_list_main">
                    {(product || []).map((item, index) => {
                      return (
                        <div class="col-6 col-md-4 d-flex align-items-stretch">
                          <div class="card product-card w-100">
                            <div class="card-body">
                              {/* {token?.length ? (
                              <a class="wishlist-btn" href="#">
                                {item?.products?.favourities ? (
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
                            ) : null} */}
                              <Link
                                class="product-thumbnail d-block"
                                to={`/app/product-detail/${item?.products?._id}`}
                                state={{ type: item?.products?.type[0] }}
                              >
                                <img
                                  class="mb-2"
                                  src={
                                    item?.products?.productImage
                                      ? item?.products?.productImage
                                      : require("../../assets/img/product.jpg")
                                  }
                                  alt=""
                                />
                              </Link>
                              <div class="row mt-1 d-flex align-items-center justify-content-between">
                                <div class="col">
                                  <a class="product-title" href="javascript:;">
                                    {item.products.unitName}
                                  </a>
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
                  {/* {product?.length ? (
                    <div className="col-lg-12 col-sm-12 d-flex justify-content-between mt-3">
                      <div
                        class={
                          activePage <= 1
                            ? "opacity-0"
                            : "back-button me-2 me-2 "
                        }
                      >
                        <Link
                          state={{ naek: "ki" }}
                          onClick={() =>
                            activePage <= 1
                              ? setActivePage(1)
                              : setActivePage(activePage - 1)
                          }
                        >
                          <i class="fa-solid fa-arrow-left-long"></i> Prev
                        </Link>
                      </div>
                      <div
                        class={
                          activePage === maxPage
                            ? "d-none"
                            : "back-button me-2 me-2 "
                        }
                      >
                        <Link
                          state={{ naek: "ki" }}
                          onClick={() =>
                            activePage === maxPage
                              ? setActivePage(maxPage)
                              : setActivePage(activePage + 1)
                          }
                        >
                          Next <i class="fa-solid fa-arrow-right-long"></i>
                        </Link>
                      </div>
                    </div>
                  ) : null} */}
                </div>
              )}
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductBrands;
