import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Panel, PanelGroup } from "rsuite";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProductBySubCate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState();
  const [sortValue, setSortValue] = useState();
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [products, setProducts] = useState([]);
  const [heart, setHeart] = useState(false);
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getBySubCategory`;
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [activePage, setActivePage] = useState();
  const [maxPage, setMaxPage] = useState(1);
  useEffect(() => {
    getProducts();
    GetBrands();
  }, [location, heart, activePage]);
  useEffect(() => {
    setActivePage(1);
  }, [location]);

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
        subCategory: location.state?.name,
        page: activePage,
      })
      .then((res) => {
        setProducts(res.data?.results.products);
        setMaxPage(res.data?.results?.totalPages);
      });
  };

  const filterProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(getProduct, {
        subCategory: location.state?.name,
        brand: brandName,
        sortBy: sortValue,
        page: activePage,
      })
      .then((res) => {
        setProducts(res.data?.results.products);
        setMaxPage(res.data?.results?.totalPages);
      });
  };
  const clearFilters = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: products[index]?.products?._id,
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Please Login To Continue!",
            icon: "warning",
            button: "cool",
          });
        }
      });
    setHeart(!heart);
  };
  const rmvFromFav = async (index) => {
    await axios.post(rmvFav, {
      productId: products[index]?.products?._id,
    });
    setHeart(!heart);
  };
  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{location.state.name}</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/app/home"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-2">&#62;</span>{" "}
                      </Link>
                    </li>
                    {/* <li className="item_nanner">
                      <a className="text-decoration-none text-white fs-6  ">
                        {location?.state.catName}{" "}
                        <span className="arrow mx-2">&#62;</span>{" "}
                      </a>
                    </li> */}
                    <li className="breadcrumb-item fs-6" aria-current="page">
                      {location?.state.name}
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
          <div className="container bg-white border border-top shadow">
            <div className="row">
              <div className="col-md-3 pe-lg-0 width_adjust ">
                <form className="product_single_left h-100 border rounded">
                  <PanelGroup bordered className="">
                    <Panel
                      header=" Product Brands "
                      eventKey={1}
                      id="panel1"
                      defaultExpanded
                      className="fw-bold"
                    >
                      <div className="accordion-body px-0 pt-3 pb-0">
                        <div className="row">
                          {(brands || [])
                            ?.filter((item, idx) => idx < 5)
                            .map((item, index) => (
                              <div className="col-12 form-group " key={index}>
                                <input
                                  className=""
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    position: "relative",
                                    top: "4px",
                                  }}
                                  type="radio"
                                  value={item?.brandName}
                                  id="check5"
                                  name="check5"
                                  onChange={(e) => {
                                    setBrandName(item?._id);
                                  }}
                                />
                                <label
                                  htmlFor="check5"
                                  style={{
                                    fontWeight: "500",
                                    marginLeft: "13px",
                                    fontSize: "18px",
                                  }}
                                >
                                  {item?.brandName}
                                </label>
                              </div>
                            ))}
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
                    </Panel>
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
                              onChange={(e) => setSortValue(1)}
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
                              value="2"
                              onChange={(e) => setSortValue(-1)}
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
                        // onClick={clearFilters}
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
                      <div className="product_parts_box border rounded-top">
                        <div className="partsproduct_img">
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
                                    CateName: item?.categoryName,
                                  },
                                }
                              );
                            }}
                          />
                          <p
                            style={{
                              right: "5px",
                              top: "-80px",
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
                          </p>
                        </div>
                        {/* </Link> */}
                        <div className="product_content mt-3 text-center">
                          <div className="d-flex justify-content-center">
                            <h1
                              className="text-center fs-5 fw-bolder "
                              style={{ position: "relative", left: "0px" }}
                              onClick={() => {
                                navigate(
                                  `/AllProducts/Product/${item?.products?._id}`,
                                  {
                                    state: {
                                      id: item?.products?._id,
                                      CateName: item?.categoryName,
                                    },
                                  }
                                );
                              }}
                            >
                              {item?.products?.unitName}
                            </h1>
                          </div>
                          {/* <div className="rating_box mt-2 mb-1">
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
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))}
                  {products?.length ? (
                    <div className="col-12 py-2  Paginate ">
                      <span className="totalPage">Total Pages : {maxPage}</span>
                      <ul id="pagination" className="pagination">
                        <li>
                          <a
                            class="fs-6 control"
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: "smooth" });

                              activePage <= 1
                                ? setActivePage(1)
                                : setActivePage(activePage - 1);
                            }}
                          >
                            « prev
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
        </section>
      </>
      <Footer />
    </div>
  );
};

export default ProductBySubCate;
