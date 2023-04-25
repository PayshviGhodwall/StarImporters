import React, { useEffect, useRef, useState } from "react";
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
import WebHeader2 from "./webHeader2";
import Swal from "sweetalert2";
import { useRecoilValue } from "recoil";
import { charSearchKey } from "../../selecter";
import Search from "./search";

function AppProductList() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [product, setProduct] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState();
  const [heart, setHeart] = useState(false);
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  let ref = useRef();
  let { id } = useParams();
  let token = localStorage.getItem("token-user");

  const searchKey = useRecoilValue(charSearchKey);
  console.log(searchKey);

  useEffect(() => {
    getProductList();
    GetBrands();
  }, [activePage]);

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
    const { data } = await getAllProducts(activePage);
    if (!data.error) {
      setProduct(data.results?.products);
      setMaxPage(data?.results.totalPages);
    }
  };

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product[index]?._id,
        flavour: product[index]?.type[0],
      })
      .then((res) => {
        setHeart(!heart);
        Swal.fire({
          title: "Product Added to Wishlist.",
          icon: "success",
          text: "You can see your favourite products on My Wishlist.",
          confirmButtonText: "Ok",
        });
      });
    getProductList();
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product[index]?._id,
        flavour: product[index]?.type[0],
      })
      .then((res) => {
        setHeart(!heart);
        Swal.fire({
          title: "Product Removed from Wishlist.",
          icon: "success",
          text: "You can see your favourite products on My Wishlist.",
          confirmButtonText: "Ok",
        });
      });
    getProductList();
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
          <Search />
          {searchKey?.length ? null : (
            <div class="py-3">
              <button className="bg-white fw-bold border rounded-end">
                {activePage}
              </button>

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
                {product?.length ? (
                  <div className="col-lg-12 col-sm-12 d-flex justify-content-between mt-1 mb-1">
                    <div
                      class={
                        activePage <= 1 ? "opacity-0" : "back-button me-2 me-2 "
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
                  {(product || [])?.map((item, index) => {
                    return (
                      <div class="col-6 col-md-4 d-flex align-items-stretch">
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
                              to={`/app/product-detail/${item?._id}`}
                              state={{ type: item?.type[0] }}
                            >
                              <img
                                class="mb-2"
                                src={
                                  item.type[0]?.flavourImage
                                    ? item.type[0]?.flavourImage
                                    : require("../../assets/img/product.jpg")
                                }
                              />
                            </Link>
                            <div class="row mt-1 d-flex align-items-center justify-content-between">
                              <div class="col">
                                <a class="product-title">
                                  {item?.unitName + "-" + item.type[0]?.flavour}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {product?.length ? (
                  <div className="col-lg-12 col-sm-12 d-flex justify-content-between mt-3">
                    <div
                      class={
                        activePage <= 1 ? "opacity-0" : "back-button me-2 me-2 "
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
                        <i class="fa-solid fa-arrow-left-long"></i> Previous
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
              </div>
            </div>
          )}
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppProductList;
