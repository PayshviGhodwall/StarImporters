import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Panel, PanelGroup, Placeholder } from "rsuite";
import { useNavigate } from "react-router-dom";

const ProductByBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getByBrands`;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  // const [brandName, setBrandName] = useState();
  const [sortValue, setSortValue] = useState("");
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // const ProductFilter = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getAllProducts`;
  // const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  // const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;

  const [heart, setHeart] = useState(false);
  // const [subCategoryName, setSubCategoryName] = useState();

  useEffect(() => {
    GetBrands();
    getProducts();
  }, [location, heart]);

  const GetBrands = async () => {
    await axios
      .get(getBrands, {
        page: 1,
      })
      .then((res) => {
        setBrands(res?.data.results);
      });
  };
  const getProducts = async () => {
    await axios
      .post(getProduct, {
        brand: location.state?.name,
        page: activePage,
      })
      .then((res) => {
        setProducts(res.data?.results.products);
        setMaxPage(res.data?.results.totalPages);
      });
  };
  const filterProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(getProduct, {
        brand: location.state?.name,
        sortBy: sortValue,
      })
      .then((res) => {
        setProducts(res.data?.results);
      });
  };
  const clearFilters = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  // const addToFav = async (index) => {
  //   await axios.post(addFav, {
  //     productId: products[index]?.products?._id,
  //   });
  //   setHeart(!heart);
  // };
  // const rmvFromFav = async (index) => {
  //   await axios.post(rmvFav, {
  //     productId: products[index]?.products?._id,
  //   });
  //   setHeart(!heart);
  // };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{location.state?.name}</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-1">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="item_nanner">
                      <Link
                        to="/app/brands"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Brands <span className="arrow mx-1">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        {location.state?.name}
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section className="product_single py-5 ">
          <div className="container bg-white">
            <div className="row">
              <div className="col-md-3 pe-lg-0 width_adjust ">
                <form className="product_single_left h-100 ">
                  <PanelGroup accordion bordered className="">
                    <Panel
                      header="Sort By"
                      eventKey={2}
                      defaultExpanded
                      id="panel2"
                      className="fw-bold"
                    >
                      <div className="accordion-body px-0 pt-3 pb-0">
                        <div className="row">
                          <div className="col-12 form-group checkbox_design radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="radio3"
                              name="radio1"
                              value="1"
                              onChange={(e) => setSortValue(e.target.value)}
                            />
                            <label htmlFor="radio3">
                              {" "}
                              Alphabetically: A - Z
                            </label>
                          </div>
                          <div className="col-12 form-group checkbox_design radio_design">
                            <input
                              className="d-none"
                              type="radio"
                              id="radio4"
                              name="radio1"
                              value="0"
                              onChange={(e) => setSortValue(e.target.value)}
                            />
                            <label htmlFor="radio4">
                              {" "}
                              Alphabetically: Z - A
                            </label>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  </PanelGroup>

                  <div className="row mx-0 pt-4 pb-5 bg-white d-lg-flex d-md-none">
                    <div className="col-6">
                      <button
                        className="d-block comman_btn text-center"
                        onClick={clearFilters}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={filterProduct}
                        className="d-block comman_btn2 text-center"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col width_adjust_right">
                <div className="product_single_right row p-4">
                  {(products || [])?.map((item, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="product_parts_box">
                        <div className="partsproduct_img">
                          <img
                            src={
                              item.products?.productImage
                                ? item?.products?.productImage
                                : require("../../assets/img/product.jpg")
                            }
                            alt="Product"
                            onClick={() => {
                              navigate("/AllProducts/Product", {
                                state: {
                                  id: item?.products?._id,
                                  CateName: item?.categoryName,
                                },
                              });
                            }}
                          />
                          {/* <p
                              style={{
                                right: "5px",
                                top:"-80px",
                                position: "relative",
                                borderRadius: "50%",
                              }}
                            >
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
                            </p> */}
                        </div>
                        {/* </Link> */}
                        <div className="product_content mt-3 text-center">
                          <div className="d-flex justify-content-center">
                            <h1
                              className="text-center fs-5 fw-bolder "
                              style={{ position: "relative", left: "0px" }}
                              onClick={() => {
                                navigate("/AllProducts/Product", {
                                  state: { id: item?.products?._id },
                                });
                              }}
                            >
                              {item?.products?.unitName}
                            </h1>
                          </div>
                          <div className="rating_box mt-2">
                            <i
                              className="fa fa-star"
                              style={{ color: "#FFCA33" }}
                            />

                            <i
                              className="fa fa-star"
                              style={{ color: "#FFCA33" }}
                            />

                            <i
                              className="fa fa-star"
                              style={{ color: "#FFCA33" }}
                            />

                            <i
                              className="fa fa-star"
                              style={{ color: "#FFCA33" }}
                            />

                            <i
                              className="fa fa-star"
                              style={{ color: "#E2E2E2 " }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-10 py-2 border rounded Paginate ">
                    <span className="totalPage">Total Pages : {maxPage}</span>
                    <ul id="pagination" className="pagination">
                      <li>
                        <a
                          class="fs-6 control"
                          onClick={() =>
                            activePage <= 1
                              ? setActivePage(1)
                              : setActivePage(activePage - 1)
                          }
                        >
                          « previous
                        </a>
                      </li>

                      <li>
                        <a className="active">{activePage}</a>
                      </li>

                      <li>
                        <a
                          className="fs-6"
                          onClick={() =>
                            activePage === maxPage
                              ? setActivePage(maxPage)
                              : setActivePage(activePage + 1)
                          }
                        >
                          next »
                        </a>
                      </li>
                    </ul>
                  </div>
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

export default ProductByBrand;
