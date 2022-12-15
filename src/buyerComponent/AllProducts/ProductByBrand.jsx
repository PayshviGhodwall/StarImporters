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
  const [category, setCategory] = useState({});
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState();
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const ProductFilter = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getAllProducts`;
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;

  const [heart, setHeart] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState();

  useEffect(() => {
    GetBrands()
    getProducts();
  }, [location,heart]);
  const GetBrands = async () => {
    await axios.get(getBrands).then((res) => {
      setBrands(res?.data.results);
    });
  };
  const getProducts = async () => {
    await axios
      .post(getProduct, {
        brand: location.state?.name,
      })
      .then((res) => {
        setProducts(res.data?.results);
      });
  };
  const filterProduct = async (e) => {
    e.preventDefault();
    await axios
      .post(ProductFilter, {
        brand: brandName,
        sortBt: 1,
      })
      .then((res) => {
        setProducts(res.data?.results);
      });
  };
  const addToFav = async (index) => {
    await axios.post(addFav, {
      productId: products[index]?.products?._id,
    });
    setHeart(!heart);
  };
  const rmvFromFav = async (index) => {
    await axios.post(rmvFav, {
      productId: products[index]?.products?._id,
    });
    setHeart(!heart);
  };
  const clearFilters = () => {};
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
                                  type="checkbox"
                                  value={item?.brandName}
                                  id="check5"
                                  name="check5"
                                  onChange={(e) => {
                                    setBrandName(e.target.value);
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
                                navigate("/AllBrands");
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
                            src={item.products?.productImage}
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
                        </div>
                        {/* </Link> */}
                        <div className="product_content mt-3 text-center">
                          <div className="d-flex justify-content-center">
                            <h1
                              className="text-center fs-4 fw-bolder "
                              style={{ position: "relative", left: "0px" }}
                              onClick={() => {
                                navigate("/AllProducts/Product", {
                                  state: { id: item?.products?._id },
                                });
                              }}
                            >
                              {item?.products?.unitName}
                            </h1>
                            <p style={{ right: "5px", position: "absolute" }}>
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
                            </p>
                          </div>
                          <div className="rating_box mt-2 mb-1">
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
