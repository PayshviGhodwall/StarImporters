import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import Swal from "sweetalert2";
import { pageFeature } from "../../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(1);
  const [heart, setHeart] = useState(false);
  const setPage = useSetRecoilState(pageFeature);
  const page = useRecoilValue(pageFeature);
  const [activePage, setActivePage] = useState(page);

  useEffect(() => {
    GetProducts();
  }, [activePage, heart]);
  console.log(page);

  const GetProducts = async () => {
    await axios
      .post(allProd, {
        page: activePage,
      })
      .then((res) => {
        setProducts(res?.data.results.products);
        setMaxPage(res?.data.results?.totalPages);
      });
  };

  const addToFav = async (id) => {
    await axios
      .post(addFav, {
        productId: id,
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Please Login To Continue!",
            icon: "warning",
            button: "cool",
          }).then(() => navigate("/app/login"));
        }
      });
    setHeart(!heart);
  };
  const rmvFromFav = async (id) => {
    await axios.post(rmvFav, {
      productId: id,
    });
    setHeart(!heart);
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTopSec">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>FEATURED PRODUCTS</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-2">&#9679;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <a className="text-decoration-none text-white fs-6 ">
                        Featured Products
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section className="singleproduct-page comman_paddings">
          <div className="container">
            <div className="row">
              <div className="col singleproduct_divvision mx-0">
                <div className="product_single_right row p-3">
                  {products?.length ? (
                    <div className="col-12 py-2 rounded Paginate ">
                      <div class="col-6 mb-2 ps-lg-3">
                        <div class="singleproducttop---left ps-lg-2">
                          Total Pages: <span>{maxPage}</span>
                        </div>
                      </div>
                      <div class="col-6 mb-2 text-end">
                        <div class="singleproduct---paginationss">
                          <a
                            onClick={() => {
                              // window.scrollTo({ top: 0, behavior: "smooth" });
                              activePage <= 1
                                ? setActivePage(1)
                                : setActivePage(activePage - 1);
                            }}
                          >
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />{" "}
                            Previous
                          </a>
                          <span>{activePage}</span>
                          <a
                            onClick={() => {
                              // window.scrollTo({ top: 0, behavior: "smooth" });
                              activePage === maxPage
                                ? setActivePage(maxPage)
                                : setActivePage(activePage + 1);
                            }}
                          >
                            Next{" "}
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div class="col-12">
                    <div class="row singleproduct---show">
                      {(products || [{}])?.map((item, index) => (
                        <div class="col-xl-3 col-lg-3 col-md-6 mb-lg-4 mb-md-4">
                          <div class="singleproduct-box">
                            <a href="javascript:;" class="singleproduct--img">
                              <img
                                src={
                                  item.productImage
                                    ? item.productImage
                                    : require("../../assets/img/product.jpg")
                                }
                                alt="Product"
                                onClick={() => {
                                  setPage(activePage);
                                  navigate(
                                    `/AllProducts/Product/Product-Details`,
                                    {
                                      state: {
                                        id: item?._id,
                                        CateName: item?.categoryName,
                                      },
                                    }
                                  );
                                }}
                              />
                            </a>
                            <a class="favvv---icon" href="javascript:;">
                              {item?.favourite ? (
                                <i
                                  class="fa fa-heart"
                                  onClick={() => {
                                    rmvFromFav(item?._id);
                                  }}
                                  style={{ color: "#3e4093 " }}
                                />
                              ) : (
                                <i
                                  class="fa fa-heart"
                                  onClick={() => {
                                    addToFav(item?._id);
                                  }}
                                  style={{ color: "#E1E1E1 " }}
                                />
                              )}
                              {/* <img src="assets/images/Vector.png" alt="" /> */}
                            </a>
                            <span
                              onClick={() => {
                                setPage(activePage);
                                navigate(
                                  `/AllProducts/Product/Product-Details`,
                                  {
                                    state: {
                                      id: item?._id,
                                      CateName: item?.categoryName,
                                    },
                                  }
                                );
                              }}
                            >
                              {item?.unitName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {products?.length ? (
                    <div className="col-12 py-2 rounded Paginate ">
                      <div class="col-6 mb-2 ps-lg-3">
                        <div class="singleproducttop---left ps-lg-2">
                          Total Pages: <span>{maxPage}</span>
                        </div>
                      </div>
                      <div class="col-6 mb-2 text-end">
                        <div class="singleproduct---paginationss">
                          <a
                            onClick={() => {
                              // window.scrollTo({ top: 0, behavior: "smooth" });
                              activePage <= 1
                                ? setActivePage(1)
                                : setActivePage(activePage - 1);
                            }}
                          >
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />{" "}
                            Previous
                          </a>
                          <span>{activePage}</span>
                          <a
                            onClick={() => {
                              // window.scrollTo({ top: 0, behavior: "smooth" });
                              activePage === maxPage
                                ? setActivePage(maxPage)
                                : setActivePage(activePage + 1);
                            }}
                          >
                            Next{" "}
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default FeaturedProducts;
