import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    GetProducts();
  }, [activePage]);

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
  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
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
                        Home <span className="arrow mx-2">&#62;</span>{" "}
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
        <section className="brands_page py-5 ">
          <div className="container">
            <div className="row">
              <div className="col width_adjust_right">
                <div className="product_single_right row p-2">
                  {products?.length ? (
                    <div className="col-12 py-2 border rounded Paginate ">
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
                  {(products || [{}])?.map((item, index) => (
                    <div className="col-xl-3 col-lg-3 col-md-3" key={index}>
                      <div className="product_parts_box">
                        <div className="partsproduct_img">
                          <img
                            src={
                              item.productImage
                                ? item.productImage
                                : require("../../assets/img/product.jpg")
                            }
                            alt="Product"
                            onClick={() => {
                              navigate(`/AllProducts/Product/${item?._id}`, {
                                state: {
                                  id: item?._id,
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
                              className="text-center fs-5 fw-bolder "
                              style={{ position: "relative", left: "0px" }}
                              onClick={() => {
                                navigate(`/AllProducts/Product/${item?._id}`, {
                                  state: {
                                    id: item?._id,
                                    CateName: item?.categoryName,
                                  },
                                });
                              }}
                            >
                              {item?.unitName}
                            </h1>
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

export default FeaturedProducts;
