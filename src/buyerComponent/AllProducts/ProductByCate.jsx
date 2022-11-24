import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const ProductByCate = () => {
  const location = useLocation();
  console.log(location.state.name);
  const [category, setCategory] = useState({});
  const [brands, setBrands] = useState([]);
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getByCategory`;
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`;
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    setCategory(location?.state.name);
    getProducts();
    GetBrands();
  }, [location]);
  const GetBrands = async () => {
    await axios.get(getBrands).then((res) => {
      setBrands(res?.data.results);
    });
  };
  const getProducts = async () => {
    await axios
      .post(getProduct, {
        category: location.state?.name,
      })
      .then((res) => {
        setProducts(res.data?.results);
      });
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{location.state.name}</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        {location.state.name}
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
                  <div className="accordion" id="accordionExample1">
                    <div className="accordion-item filter_design ">
                      <h2 className="accordion-header " id="heading3">
                        <button
                          className="accordion-button p-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse3"
                          aria-expanded="true"
                          aria-controls="collapse3"
                        >
                          Product Brands
                        </button>
                      </h2>
                      <div
                        id="collapse3"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading3"
                        data-bs-parent="#accordionExample1"
                      >
                        <div className="accordion-body px-0 pt-3 pb-0">
                          <div className="row">
                            {(brands || [])?.filter((item, idx) => idx < 5).map((item, index) => (
                              
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
                                  id="check5"
                                  name="check5"
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
                              <Link
                                className="more_btn text-decoration-none
                        "
                                href="javscript:;"
                              >
                               More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item filter_design">
                      <h2 className="accordion-header" id="heading4">
                        <button
                          className="accordion-button p-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse4"
                          aria-expanded="true"
                          aria-controls="collapse4"
                        >
                          Sort By
                        </button>
                      </h2>
                      <div
                        id="collapse4"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading4"
                        data-bs-parent="#accordionExample1"
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
                      </div>
                    </div>
                    <div className="accordion-item filter_design">
                      <h2 className="accordion-header" id="heading2">
                        <button
                          className="accordion-button p-2"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse2"
                          aria-expanded="true"
                          aria-controls="collapse2"
                        >
                          Ratings
                        </button>
                      </h2>
                      <div
                        id="collapse2"
                        className="accordion-collapse collapse show"
                        aria-labelledby="heading2"
                        data-bs-parent="#accordionExample1"
                      >
                        <div className="accordion-body px-0 pt-3 pb-0">
                          <div className="row rating_box">
                            <div className="col-12 form-group checkbox_design">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="check1"
                                name="check1"
                              />
                              <label htmlFor="check1">
                                {" "}
                                4{" "}
                                <Link href="javasript:;">
                                  <i className="fas fa-star" />
                                </Link>{" "}
                                &amp; UP
                              </label>
                            </div>
                            <div className="col-12 form-group checkbox_design">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="check2"
                                name="check2"
                              />
                              <label htmlFor="check2">
                                {" "}
                                3{" "}
                                <Link href="javasript:;">
                                  <i className="fas fa-star" />
                                </Link>{" "}
                                &amp; UP
                              </label>
                            </div>
                            <div className="col-12 form-group checkbox_design">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="check3"
                                name="check3"
                              />
                              <label htmlFor="check3">
                                {" "}
                                2{" "}
                                <Link href="javasript:;">
                                  <i className="fas fa-star" />
                                </Link>{" "}
                                &amp; UP
                              </label>
                            </div>
                            <div className="col-12 form-group checkbox_design">
                              <input
                                className="d-none"
                                type="checkbox"
                                id="check4"
                                name="check4"
                              />
                              <label htmlFor="check4">
                                {" "}
                                1{" "}
                                <Link href="javasript:;">
                                  <i className="fas fa-star" />
                                </Link>{" "}
                                &amp; UP
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-0 pt-4 pb-5 bg-white d-lg-flex d-md-none">
                    <div className="col-6">
                      <Link
                        className="d-block comman_btn text-center"
                        href="javscript:;"
                      >
                        Clear All
                      </Link>
                    </div>
                    <div className="col-6">
                      <Link
                        className="d-block comman_btn2 text-center"
                        href="javscript:;"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col width_adjust_right">
                <div className="product_single_right row p-4">
                  {(products || [])?.map((item, index) => (
                    <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                      <div className="product_parts_box">
                        <Link
                          className="text-decoration-none"
                          to={{
                            pathname: "/AllProducts/Product",
                            search: "",
                            hash: "",
                          }}
                          state={{ id: item?.products?._id }}
                        >
                          <div className="partsproduct_img">
                            <img
                              src={item.products?.productImage}
                              alt="Product"
                            />
                          </div>
                          <div className="product_content mt-3 text-center">
                            <Link
                              to="/AllProducts/Product"
                              className="text-decoration-none"
                            >
                              {item?.products?.unitName}
                            </Link>
                            <Link className="fav_btn" href="javscript:;" />
                            <div className="rating_box mt-2 mb-1">
                              <i
                                className="fa fa-star"
                                style={{ color: "#ffff00" }}
                              />

                              <i
                                className="fa fa-star"
                                style={{ color: "#ffff00" }}
                              />

                              <i
                                className="fa fa-star"
                                style={{ color: "#ffff00" }}
                              />

                              <i
                                className="fa fa-star"
                                style={{ color: "#ffff00" }}
                              />

                              <i
                                className="fa fa-star"
                                style={{ color: " #f5f5f0" }}
                              />
                            </div>
                          </div>
                        </Link>
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

export default ProductByCate;
