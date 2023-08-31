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
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/getPromotion`;
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const navigate = useNavigate();
  const [maxPage, setMaxPage] = useState(1);
  const [heart, setHeart] = useState(false);
  const setPage = useSetRecoilState(pageFeature);
  const page = useRecoilValue(pageFeature);
  const [activePage, setActivePage] = useState(page);
  const addCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/addProducts`;
  const [NState, setNState] = useState(false);

  useEffect(() => {
    GetProducts();
  }, [activePage, heart]);
  console.log(page);

  const GetProducts = async () => {
    const { data } = await axios.post(allProd, {
      type: "Featured",
    });

    if (!data.error) {
      setProducts(data?.results.promotion?.products);
    }
  };

  const AddtoCart = async (id, flavour) => {
    const { data } = await axios.post(addCart, {
      productId: id,
      quantity: 1,
      flavour: flavour,
    });
    console.log(data);

    if (!data.error) {
      setNState(!NState);
      Swal.fire({
        title: "Product Added to Cart",
        icon: "success",
        showCloseButton: true,
        showCancelButton: true,
        timer: 1000,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-shopping-cart"></i> Cart!',
        confirmButtonAriaLabel: "Thumbs up, Okay!",
        cancelButtonText: "Close",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/app/cart", { state: "jii" });
        }
      });
    }
    if (data.error) {
      Swal.fire({
        title: data?.message,
        icon: "error",
        showConfirmButton: "okay",
      });
    }
  };

  const addToFav = async (id, flavour) => {
    await axios
      .post(addFav, {
        productId: id,
        flavour: flavour,
      })
      .then((res) => {
        if (!res.error) {
          Swal.fire({
            title: "Product Added to Wishlist.",
            icon: "success",
            text: "You can see your favorite products on My Wishlist.",
            confirmButtonText: "Okay",
            timer: 2000,
          });
        }
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
  };

  return (
    <div>
      <Navbar NState={NState} />
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
                        className="text-decoration-none text-white fs-6  ">
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
                  {/* {products?.length ? (
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
                            }}>
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
                            }}>
                            Next{" "}
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null} */}
                  <div class="col-12">
                    <div class="row singleproduct---show">
                      {(products || [{}])?.map((item, index) => (
                        <div className="col-xl-3 col-lg-3 col-md-3 mb-lg-3 mb-md-4 mb-3">
                          <div className="product-grid ">
                            <div
                              className="product-image border mt-1
                          ">
                              <a
                                className="image
                            
                            "
                                onClick={() => {
                                  navigate(
                                    `/AllProducts/Product/:${item?.productId?.slug}`,
                                    {
                                      state: {
                                        type: item?.productId?.type,
                                      },
                                    }
                                  );
                                }}>
                                <img
                                  className="pic-1"
                                  src={
                                    item?.productId?.productImage
                                      ? item?.productId?.productImage
                                      : require("../../assets/img/product.jpg")
                                  }
                                />
                                <img
                                  className="pic-2"
                                  src={
                                    item?.productId?.type?.flavourImage
                                      ? item?.productId?.type?.flavourImage
                                      : require("../../assets/img/product.jpg")
                                  }
                                />
                              </a>
                              <span className="product-Featured-label">
                                Trending
                              </span>
                              <ul className="product-links">
                                <li>
                                  <a
                                    data-tip="Add to Wishlist"
                                    onClick={() => {
                                      addToFav(
                                        item?.productId?._id,
                                        item?.productId?.type
                                      );
                                    }}>
                                    <i className="far fa-heart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    data-tip="Add to Cart"
                                    onClick={() => {
                                      AddtoCart(
                                        item?.productId?._id,
                                        item?.productId?.type
                                      );
                                    }}>
                                    {" "}
                                    <i className="fas fa-shopping-cart" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    data-tip="Quick View"
                                    onClick={() => {
                                      navigate(
                                        `/AllProducts/Product/:${item?.productId?.slug}`,
                                        {
                                          state: {
                                            type: item?.productId?.type,
                                          },
                                        }
                                      );
                                    }}>
                                    <i className="fa fa-search" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product-content ">
                              <a
                                className="add-to-cart text-decoration-none"
                                onClick={() => {
                                  navigate(
                                    `/AllProducts/Product/:${item?.productId?.slug}`,
                                    {
                                      state: {
                                        type: item?.productId?.type,
                                      },
                                    }
                                  );
                                }}>
                                <strong className="fs-6">
                                  {item?.productId?.type?.flavour}
                                  ..
                                </strong>
                              </a>
                              <h3 className="title ">
                                <a className="text-decoration-none">
                                  {item?.productId?.unitName}
                                </a>
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* {products?.length ? (
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
                            }}>
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
                            }}>
                            Next{" "}
                            <img
                              src={require("../../assets/img/arrow.png")}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : null} */}
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
