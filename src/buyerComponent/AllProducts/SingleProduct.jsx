import React from "react";
import Footer from "../Footer/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SingleProduct = () => {
  const getProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/product/getProduct`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCategory`;
  const addCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/addToCart`;
  const [unitCount, setUnitCount] = useState(0);
  const [minDisable, setMinDisable] = useState(true);
  const [category, setCategory] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [product, setProduct] = useState([]);
  let location = useLocation();
  let objectId = location.state.id;
  console.log(location, "joooo");
  console.log(productImages);
  useEffect(() => {
    const NewProducts = async () => {
      await axios.get(getProduct + "/" + objectId).then((res) => {
        console.log(res);
        setProduct(res.data.results);
        setProductImages(res.data.results?.productImage);
        setProductImages({ ...productImages }, res.data.results?.type);
      });
    };
    const getCategory = async () => {
      await axios.get(categoryApi).then((res) => {
        setCategory(res?.data.results);
      });
    };

    getCategory();
    NewProducts();
  }, []);


  const AddtoCart = async() =>{
    await axios.post(addCart,{
      productId:objectId,
      quantity:unitCount
    }).then((res)=>{
      console.log(res);
    })
  }

  return (
    <div className="" style={{ background: "#eef3ff" }}>
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container ">
          <div className="row">
            <div className="col-12">
              <h1>{product?.unitName}</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow mx-1">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="item_nanner">
                      <Link
                        to="/AllBrands"
                        className="text-decoration-none text-white fs-6  "
                      >
                        {product?.category?.categoryName}{" "}
                        <span className="arrow mx-1">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        {product?.unitName}
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
        <section className="Product_single_page my-5">
          <div className="container-fluid card">
            <div className="row mx-0 bg-white p-xl-5 p-lg-4 p-md-4 p-3 ">
              <div className="col-lg-6 px-md-3 px-0 ">
                <div className="product_show">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel"
                    data-bs-touch="false"
                    data-bs-interval="false"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      >
                        <img src={product?.productImage} alt="" />
                      </button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                      >
                        <img src={product?.productImage} alt="" />
                      </button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                      >
                        <img src="assets/img/product_new3.png" alt="" />
                      </button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={3}
                        aria-label="Slide 4"
                      >
                        <img src="assets/img/product_new1.png" alt="" />
                      </button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="productimg_show">
                          <img
                            src={product?.productImage}
                            className="d-block"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="productimg_show">
                          <img
                            src="assets/img/product_new2.png"
                            className="d-block"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="productimg_show">
                          <img
                            src="assets/img/product_new3.png"
                            className="d-block"
                            alt="..."
                          />
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="productimg_show">
                          <img
                            src="assets/img/product_new1.png"
                            className="d-block"
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mt-lg-0 px-md-3 px-0 mt-md-5 mt-4 mb-5">
                <div className="product_details_main ps-xl-5">
                  <div className="row align-items-start">
                    <div className="col">
                      <div className="product_details_text">
                        <div className="row border-bottom pb-4">
                          <div className="col-12">
                            <h1>{product?.unitName}</h1>

                            <div className="ratee_part d-flex align-items-center mt-3">
                              <div className="rating_box">
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fas fa-star" />
                                </a>
                                <a href="javasript:;">
                                  <i className="fa fa-star" />
                                </a>
                              </div>
                              <span>(216)</span>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="row offers_box pt-3 pb-3 border-0">
                              <div className="col-12 offers_head ">
                                <strong>Flavor</strong>
                              </div>
                              <div
                                className="col-lg-11"
                                style={{ marginLeft: "12px" }}
                              >
                                <div className="row offers_box_main">
                                  <div
                                    className="col-lg-12 flavour_box p-2"
                                    style={{ border: "none" }}
                                  >
                                    {(product?.type || []).map(
                                      (item, index) => (
                                        <a
                                          className=" text-decoration-none"
                                          key={index}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {item.flavour}
                                        </a>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 quantity_box d-md-flex align-items-center mt-md-3 mb-md-2">
                            <div className="number me-md-4 mb-md-0 mb-3">
                              <span
                                className="minus"
                                onClick={() => {
                                  setUnitCount(unitCount - 1);
                                }}
                              >
                                -
                              </span>
                              <input type="text" value={unitCount} />
                              <span
                                className="plus"
                                onClick={() => {
                                  setUnitCount(unitCount + 1);
                                }}
                              >
                                +
                              </span>
                            </div>
                          </div>
                          <div className="col-12 mt-3">
                            <a
                              className="comman_btn me-2 rounded"
                              onClick={AddtoCart}
                            >
                              Add To Cart
                            </a>
                            <a className="comman_btn2" href="javascript:;">
                              Request Quotation
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto product_details_btns">
                      <a className="fav_btn" href="javscript:;" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          <div className="container">
            <div className="row ">
              <div className="col-lg-12 mt-5 mb-5">
                <div className="col-12 comman_head text-center mb-3">
                  <h2>Product Description</h2>
                </div>
                <div
                  className="row p-5 text-secondary bg-white mb-5 shadow"
                  style={{ background: "#eef3ff", fontSize: "20px" }}
                >
                  <p>{product?.description}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features_products bg-white  w-100 ">
          <div className="container mb-5">
            <div className="col-12 comman_head mb-2 mt-5 text-center ">
              <h2>Related Products</h2>
            </div>

            <Swiper
              slidesPerView={4}
              spaceBetween={35}
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper px-5 py-2"
            >
              {(category || [])?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="p-3 mb-2">
                    <div className="text-center">
                      <div className="product_parts_box">
                        <div className="partsproduct_img">
                          <img src={item?.categoryImage} alt="Product" />
                        </div>
                        <div className="product_content mt-3 text-center">
                          <a>BLVK Frznberry</a>
                          <div className="rating_box mt-2 mb-1">
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fas fa-star" />
                            </a>
                            <a href="javasript:;">
                              <i className="fa fa-star" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default SingleProduct;
