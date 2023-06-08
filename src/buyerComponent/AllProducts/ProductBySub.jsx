import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Panel, PanelGroup } from "rsuite";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import backGround from "../../assets/img/banner_img2.jpg";
import { chngeFilter, pageSubCategory, pageSubCategoryData } from "../../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

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
  const getFilteredBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/filterBrands`;
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [maxPage, setMaxPage] = useState(1);
  const [filtr, setFltr] = useState(false);
  const setData = useSetRecoilState(pageSubCategoryData);
  const setPage = useSetRecoilState(pageSubCategory);
  const page = useRecoilValue(pageSubCategory);
  const pageData = useRecoilValue(pageSubCategoryData);
  const filters = useRecoilValue(chngeFilter);
  const [activePage, setActivePage] = useState(page);
  const [ObjectId, setObjectId] = useState();

  useEffect(() => {
    getProducts();
  }, [location, heart, activePage]);

  useEffect(() => {
    setActivePage(page);
  }, [page]);

  useEffect(() => {
    GetBrands();
  }, [location]);

  useEffect(() => {
    filtr && clearFilters();
  }, [filters]);

  console.log(pageData);

  useEffect(() => {
    if (pageData[0]?.filtr) {
      console.log(pageData, "newww");
      setBrandName(pageData[0]?.brand);
      setSortValue(pageData[0]?.sortValue);
      setActivePage(pageData[0]?.page);
      setFltr(pageData[0]?.filtr);
      // setData([]);
    }
  }, [pageData]);

  const GetBrands = async () => {
    await axios
      .post(getFilteredBrands, {
        subCategory: location.state?.name,
      })
      .then((res) => {
        setBrands(res?.data.results?.brands);
      });
  };

  const getProducts = async () => {
    console.log("apopop");
    await axios
      .post(getProduct, {
        subCategory: pageData[0]?.subCategory
          ? pageData[0]?.subCategory
          : location.state?.name,
        page: pageData[0]?.page ? pageData[0]?.page : activePage,
        brand: pageData[0]?.brand ? pageData[0]?.brand : filtr && brandName,
        sortBy: pageData[0]?.sortBy
          ? pageData[0]?.sortBy
          : sortValue
          ? sortValue
          : "",
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
        page: 1,
      })
      .then((res) => {
        setProducts(res.data?.results.products);
        setMaxPage(res.data?.results?.totalPages);
        setFltr(true);
        setActivePage(1);
      });
  };
  console.log(page);

  const clearFilters = (e) => {
    // document.getElementById("reset1").click();
    // document.getElementById("reset2").click();
    // setBrandName("");
    // setSortValue("");
    // setActivePage(1);
    // getProducts();
    // setPage([]);
    window.location.reload();
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
      <section
        className="comman_banner _banner marginTop"
        style={{
          backgroundImage: `url(${
            location?.state.image ? location?.state.image : backGround
          })`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{location?.state?.name}</h1>
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

                    <li className="breadcrumb-item fs-6" aria-current="page">
                      {location?.state?.name}
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
              <div class="col-xl-3 col-lg-4 col-md-4 ps-0">
                <div class="singleproduct-left">
                  <div class="singleproduct-left-box border-bottom border-dark mt-4">
                    <h2>Top Brands</h2>
                    <form class="singleproduct-form row" action="">
                      <div className="">
                        {(brands || [])
                          ?.filter((item, idx) => idx < 5)
                          .map((item, index) => (
                            <div
                              className="form-group col-12 mb-3 custom_radio"
                              key={index}
                            >
                              <input
                                class="d-none"
                                defaultChecked={
                                  pageData[0]?.brand == item?.brand?._id
                                    ? true
                                    : false
                                }
                                type="radio"
                                value={item?.brand?.brandName}
                                id={item?.brand?._id}
                                name={item?.brand?._id * index}
                                onChange={(e) => {
                                  setBrandName(item?.brand?._id);
                                }}
                              />
                              <label htmlFor={item?.brand?._id}>
                                {item?.brand?.brandName}
                              </label>
                            </div>
                          ))}
                      </div>
                      <button className="d-none" id="reset1" type="reset">
                        reset
                      </button>
                    </form>
                    <a
                      class="moreee d-flex mt-3 text-decoration-none"
                      onClick={() => {
                        navigate("/app/brands");
                      }}
                    >
                      More Brands
                    </a>
                  </div>
                  <div class="singleproduct-left-box">
                    <h2>Sort By</h2>
                    <form class="singleproduct-form row">
                      <div class="form-group col-12 mb-3 custom_radio">
                        <input
                          type="radio"
                          class="d-none"
                          id="Alphabetically"
                          name="Alphabetically"
                          defaultChecked={
                            pageData[0]?.sortBy == 1 ? true : false
                          }
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
                          defaultChecked={
                            pageData[0]?.sortBy == -1 ? true : false
                          }
                          onChange={(e) => setSortValue(-1)}
                        />
                        <label for="Alphabetically1">
                          Alphabetically: Z to A
                        </label>
                      </div>
                      <button className="d-none" type="reset" id="reset2">
                        reset
                      </button>
                    </form>
                  </div>
                </div>
                <div class="singleproduct--btns mt-4">
                  <a type="reset" onClick={clearFilters}>
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
                    {products?.length ? (
                      <div class="row singleproduct---show">
                        {(products || [{}])?.map((item, index) => (
                          <div class="col-xl-4 col-lg-6 col-md-6 mb-lg-4 mb-md-4">
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
                                    filtr
                                      ? setData([
                                          {
                                            subCategory: location?.state?.name,
                                            brand: brandName,
                                            sortBy: sortValue,
                                            filtr: filtr,
                                            page: activePage,
                                          },
                                        ])
                                      : setPage(activePage);
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
                              <a class="favvv---icon" href="javascript:;">
                                {item?.products?.favourite ? (
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
                                {/* <img src="assets/images/Vector.png" alt="" /> */}
                              </a>
                              <span
                                onClick={() => {
                                  setPage(activePage);
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
                    ) : (
                      <div className="row justify-content-center mt-5">
                        {" "}
                        <h1 className="col-auto center_art">No results...</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="product_single py-5 ">
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
        </section> */}
      </>
      <Footer />
    </div>
  );
};

export default ProductBySubCate;
