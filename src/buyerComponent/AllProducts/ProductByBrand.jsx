import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const ProductByBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getProductData = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getByBrands`;
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [chnge, setChnge] = useState(false);

  useEffect(() => {
    GetBrands();
    getProducts();
  }, [chnge, activePage]);

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
      .post(getProductData, {
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
      .post(getProductData, {
        brand: location.state?.name,
        sortBy: sortValue,
        page: activePage,
      })
      .then((res) => {
        setProducts(res.data?.results.products);
        setMaxPage(res.data?.results.totalPages);
      });
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner  marginTopSec">
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
                        Home <span className="arrow mx-1">&#9679;</span>
                      </Link>
                    </li>
                    <Link to="/app/brands" className="text-decoration-none">
                      <li className="item_nanner fs-6">
                        Brands <span className="arrow mx-1">&#9679;</span>
                      </li>
                    </Link>
                    <li className="breadcrumb-item fs-6" aria-current="page">
                      <a>{location.state?.name}</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
      <>
        <section class="singleproduct-page comman_padding">
          <div class="container">
            <div class="row singleproduct_divvision mx-0">
              <div class="col-xl-3 col-lg-4 col-md-4 ps-0 mt-4">
                <div class="singleproduct-left">
                  <div class="singleproduct-left-box">
                    <h2>Sort By</h2>
                    <form class="singleproduct-form row" action="">
                      <div class="form-group col-12 mb-3 custom_radio">
                        <input
                          type="radio"
                          defaultChecked
                          class="d-none"
                          id="Alphabetically"
                          name="Alphabetically"
                          value="1"
                          onChange={(e) => setSortValue(1)}
                        />
                        <label for="Alphabetically">
                          Alphabetically: A to Z
                        </label>
                      </div>
                      <div class="form-group col-12 mb-3 custom_radio">
                        <input
                          type="radio"
                          class="d-none"
                          id="Alphabetically1"
                          name="Alphabetically"
                          value="0"
                          onChange={(e) => setSortValue(-1)}
                        />
                        <label for="Alphabetically1">
                          Alphabetically: Z to A
                        </label>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="singleproduct--btns mt-4">
                  <a type="reset" onClick={() => setChnge(!chnge)}>
                    Clear All
                  </a>
                  <a onClick={filterProduct}>Apply Filter</a>
                </div>
              </div>
              <div class="col-xl-9 col-lg-8 col-md-8 pe-0 ps-xl-5 ">
                <div class="row singleproduct_right">
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

                  <div class="col-12 mt-3">
                    <div class="row singleproduct---show">
                      {(products || [{}])?.map((item, index) => (
                        <div
                          class="col-xl-4 col-lg-6 col-md-6 mb-lg-4 mb-md-4"
                          key={index}
                        >
                          <div class="singleproduct-box">
                            <a href="javascript:;" class="singleproduct--img">
                              <img
                                src={
                                  item?.products?.productImage
                                    ? item?.products?.productImage
                                    : require("../../assets/img/product.jpg")
                                }
                                alt="Product"
                                onClick={() => {
                                  navigate(
                                    `/AllProducts/Product/${item?.products?._id}`,
                                    {
                                      state: {
                                        id: item?.products?._id,
                                        image: item?.background,
                                        CateName: item?.categoryName,
                                      },
                                    }
                                  );
                                }}
                              />
                            </a>
                            {/* <a class="favvv---icon" href="javascript:;">
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
                              <img src="assets/images/Vector.png" alt="" />
                            </a> */}
                            <span
                              onClick={() => {
                                navigate(
                                  `/AllProducts/Product/${item?.products?._id}`,
                                  {
                                    replace: true,
                                    state: {
                                      id: item?.products?._id,
                                      CateName: item?.categoryName,
                                    },
                                  }
                                );
                              }}
                            >
                              {item?.products?.unitName}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="product_single py-5 ">
          <div className="container bg-white border shadow">
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
                              onChange={(e) => setSortValue(-1)}
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
                              onChange={(e) => setSortValue(1)}
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
                        type="reset"
                        onClick={() => setChnge(!chnge)}
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={filterProduct}
                        className="d-block comman_btn2 text-center"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col width_adjust_right">
                <div className="product_single_right row p-4">
                  {products?.length ? (
                    <div className="col-12 py-2  Paginate ">
                      <span className="totalPage">Total Pages : {maxPage}</span>
                      <ul id="pagination" className="pagination">
                        <li>
                          <a
                            class="fs-6 control"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setChnge(!chnge);
                              activePage <= 1
                                ? setActivePage(1)
                                : setActivePage(activePage - 1);
                            }}
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
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setChnge(!chnge);
                              activePage === maxPage
                                ? setActivePage(maxPage)
                                : setActivePage(activePage + 1);
                            }}
                          >
                            next »
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                  {(products || [])?.map((item, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6 " key={index}>
                      <div className="product_parts_box ">
                        <div className="partsproduct_img">
                          <img
                            src={
                              item.products?.productImage
                                ? item?.products?.productImage
                                : require("../../assets/img/product.jpg")
                            }
                            alt="Product"
                            onClick={() => {
                              navigate(
                                `/AllProducts/Product/${item?.products?._id}`,
                                {
                                  state: {
                                    id: item?.products?._id,
                                    CateName: item?.brandName,
                                  },
                                }
                              );
                            }}
                          />
                        </div>
                        <div className="product_content mt-3 text-center">
                          <div className="d-flex justify-content-center">
                            <h1
                              className="text-center fs-5 fw-bolder "
                              style={{ position: "relative", left: "0px" }}
                              onClick={() => {
                                navigate(
                                  `/AllProducts/Product/${item?.products?._id}`,
                                  {
                                    state: { id: item?.products?._id },
                                  }
                                );
                              }}
                            >
                              {item?.products?.unitName}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {products?.length ? (
                    <div className="col-12 mt-4 py-2  Paginate ">
                      <span className="totalPage">Total Pages : {maxPage}</span>

                      <ul id="pagination" className="pagination">
                        <li>
                          <a
                            class="fs-6 control"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setChnge(!chnge);
                              activePage <= 1
                                ? setActivePage(1)
                                : setActivePage(activePage - 1);
                            }}
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
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                              setChnge(!chnge);
                              activePage === maxPage
                                ? setActivePage(maxPage)
                                : setActivePage(activePage + 1);
                            }}
                          >
                            next »
                          </a>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </>
      <Footer />
    </div>
  );
};

export default ProductByBrand;
