import React from 'react'
import Footer from '../Footer/Footer'
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbar from '../Homepage/Navbar';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const SingleProduct = () => {
  const getProduct =  `${process.env.REACT_APP_APIENDPOINTNEW}user/product/getProduct`
  const [product,setProduct] = useState([])
  let location = useLocation()
  let objectId = location.state.id
  console.log(location,"joooo");

  useEffect(()=>{
   const NewProducts = async () =>{
    await axios.get(getProduct + "/" + objectId).then((res) => {
      setProduct(res.data.results)
    });
   }
   NewProducts()
  },[])
  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container">
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
                       All Brands <span className="arrow mx-1">&#62;</span>{" "}
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
    <div className="container-fluid">
      <div className="row mx-0 bg-white p-xl-5 p-lg-4 p-md-4 p-3 position-relative">
        <div className="col-lg-6 px-md-3 px-0">
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
                  <img src="assets/img/product_new1.png" alt="" />
                </button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={1}
                  aria-label="Slide 2"
                >
                  <img src="assets/img/product_new2.png" alt="" />
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
                      src="assets/img/product_new1.png"
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
        <div className="col-lg-6 mt-lg-0 px-md-3 px-0 mt-md-5 mt-4">
          <div className="product_details_main ps-xl-5">
            <div className="row align-items-start">
              <div className="col">
                <div className="product_details_text">
                  <div className="row border-bottom pb-4">
                    <div className="col-12">
                      <h2>{product?.unitName}</h2>
                      <p>
                      {product?.description}
                      </p>
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
                        <div className="col-12 offers_head mb-2">
                          <strong>Flavor: {product?.flavour}</strong>
                        </div>
                        <div className="col-12">
                          <div className="row offers_box_main">
                            <div className="col-12 flavour_box p-3">
                              <a className="disabled" href="javascript:;">
                                Black Ice
                              </a>
                              <a className="disabled" href="javascript:;">
                                Blue Razz Ice
                              </a>
                              <a className="" href="javascript:;">
                                Blueberry Energize
                              </a>
                              <a className="" href="javascript:;">
                                Cranberry Grape
                              </a>
                              <a className="" href="javascript:;">
                                Fuji Ice
                              </a>
                              <a className="disabled" href="javascript:;">
                                Grape Energy
                              </a>
                              <a className="" href="javascript:;">
                                Green Apple
                              </a>
                              <a className="disabled" href="javascript:;">
                                Gumi
                              </a>
                              <a className="" href="javascript:;">
                                Mango Peach Apricot
                              </a>
                              <a className="" href="javascript:;">
                                Guava Ice
                              </a>
                              <a className="" href="javascript:;">
                                Malaysian Mango
                              </a>
                              <a className="disabled" href="javascript:;">
                                Malibu
                              </a>
                              <a className="" href="javascript:;">
                                Mango Peach
                              </a>
                              <a className="disabled" href="javascript:;">
                                Miami Mint
                              </a>
                              <a className="disabled" href="javascript:;">
                                Peach Berry
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 quantity_box d-md-flex align-items-center mt-md-3">
                      <div className="number me-md-4 mb-md-0 mb-3">
                        <span className="minus">-</span>
                        <input type="text" defaultValue={0} />
                        <span className="plus">+</span>
                      </div>
                    </div>
                    <div className="col-12 mt-3">
                      <a className="comman_btn me-2" href="javascript:;">
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
  <section className="Productsingle_details mb-5">
    <div className="container">
      <div className="row mx-0 bg-white position-relative product_main_inner rounded overflow-hidden">
        <div className="col-12 px-0">
          <ul
            className="nav nav-tabs commam_tabs_design justify-content-center border-0"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="features-tab"
                data-bs-toggle="tab"
                data-bs-target="#features"
                type="button"
                role="tab"
                aria-controls="features"
                aria-selected="true"
              >
                Features &amp; Details
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="qa-tab"
                data-bs-toggle="tab"
                data-bs-target="#qa"
                type="button"
                role="tab"
                aria-controls="qa"
                aria-selected="false"
              >
                Questions &amp; Answers
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="features"
              role="tabpanel"
              aria-labelledby="features-tab"
            >
              <div className="row p-lg-4 p-md-4 p-2">
                <div className="col-lg-12">
                  <div className="featured-details">
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            <span className="btns_collapes position-relative" />{" "}
                            Highlight
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <ul className="featured-ul">
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                              <li>
                                <p>Lorem ipsum</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingtwo">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsetwo"
                            aria-expanded="true"
                            aria-controls="collapsetwo"
                          >
                            <span className="btns_collapes position-relative" />{" "}
                            Description
                          </button>
                        </h2>
                        <div
                          id="collapsetwo"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingtwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Pariatur omnis aliquid aliquam
                              eos magnam neque corporis? Quisquam distinctio
                              dolorum adipisci qui quia ea consequatur. Tempore
                              cumque Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Pariatur omnis aliquid aliquam
                              eos magnam neque corporis? Quisquam distinctio
                              dolorum adipisci qui quia ea consequatur. Tempore
                              cumque commodi numquam ad iste!
                            </p>
                            <p>
                              Lorem ipsum dolor, sit amet consectetur
                              adipisicing elit. Pariatur omnis aliquid aliquam
                              eos magnam neque corporis? Lorem ipsum dolor, sit
                              amet consectetur adipisicing elit. Pariatur omnis
                              aliquid aliquam eos magnam neque corporis Quisquam
                              distinctio dolorum adipisci qui quia ea
                              consequatur. Tempore cumque commodi numquam ad
                              iste!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="qa"
              role="tabpanel"
              aria-labelledby="qa-tab"
            >
              <div className="row p-lg-4 p-md-4 p-3">
                <div className="col-lg-12">
                  <div className="question_answer">
                    <div className="row">
                      <div className="col-12 question_answer_box mb-4 pb-2">
                        <div className="row mb-2 align-items-center">
                          <div className="col-auto">
                            <span className="que_tag">Q: </span>
                          </div>
                          <div className="col ps-0">
                            <h3>
                              Dose power automatically cut lorem ipsum dolar
                              set?
                            </h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <span className="que_tag mt-1">A: </span>
                          </div>
                          <div className="col ps-0">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veritatis commodi, deserunt quasi ullam
                              quibusdam fugiat vero est eum blanditiis explicabo
                              magnam quidem nam assumenda molestias? Numquam rem
                              culpa harum reprehenderit!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 question_answer_box mb-4 pb-2">
                        <div className="row mb-2 align-items-center">
                          <div className="col-auto">
                            <span className="que_tag">Q: </span>
                          </div>
                          <div className="col ps-0">
                            <h3>
                              Dose power automatically cut lorem ipsum dolar
                              set?
                            </h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <span className="que_tag mt-1">A: </span>
                          </div>
                          <div className="col ps-0">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veritatis commodi, deserunt quasi ullam
                              quibusdam fugiat vero est eum blanditiis explicabo
                              magnam quidem nam assumenda molestias? Numquam rem
                              culpa harum reprehenderit!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 question_answer_box mb-4 pb-2">
                        <div className="row mb-2 align-items-center">
                          <div className="col-auto">
                            <span className="que_tag">Q: </span>
                          </div>
                          <div className="col ps-0">
                            <h3>
                              Dose power automatically cut lorem ipsum dolar
                              set?
                            </h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <span className="que_tag mt-1">A: </span>
                          </div>
                          <div className="col ps-0">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veritatis commodi, deserunt quasi ullam
                              quibusdam fugiat vero est eum blanditiis explicabo
                              magnam quidem nam assumenda molestias? Numquam rem
                              culpa harum reprehenderit!
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 question_answer_box mb-4 pb-2">
                        <div className="row mb-2 align-items-center">
                          <div className="col-auto">
                            <span className="que_tag">Q: </span>
                          </div>
                          <div className="col ps-0">
                            <h3>
                              Dose power automatically cut lorem ipsum dolar
                              set?
                            </h3>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <span className="que_tag mt-1">A: </span>
                          </div>
                          <div className="col ps-0">
                            <p>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Veritatis commodi, deserunt quasi ullam
                              quibusdam fugiat vero est eum blanditiis explicabo
                              magnam quidem nam assumenda molestias? Numquam rem
                              culpa harum reprehenderit!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="features_products py-5 bg-white">
    <div className="container py-lg-3">
      <div className="col-12 comman_head mb-4 text-center">
        <h2>Related Products</h2>
      </div>
      <div className="related_product owl-carousel">
        <div className="product_parts_box">
          <div className="partsproduct_img">
            <img src="assets/img/product_1.png" alt="Product" />
          </div>
          <div className="product_content mt-3 text-center">
            <a href="product-single.html">BLVK Frznberry</a>
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
                <i className="fal fa-star" />
              </a>
            </div>
          </div>
        </div>
        <div className="product_parts_box">
          <div className="partsproduct_img">
            <img src="assets/img/product_4.png" alt="Product" />
          </div>
          <div className="product_content mt-3 text-center">
            <a href="product-single.html">Cherry Pineapple</a>
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
                <i className="fal fa-star" />
              </a>
            </div>
          </div>
        </div>
        <div className="product_parts_box">
          <div className="partsproduct_img">
            <img src="assets/img/product_5.png" alt="Product" />
          </div>
          <div className="product_content mt-3 text-center">
            <a href="product-single.html">4K's Wraps</a>
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
                <i className="fal fa-star" />
              </a>
            </div>
          </div>
        </div>
        <div className="product_parts_box">
          <div className="partsproduct_img">
            <img src="assets/img/product_new1.png" alt="Product" />
          </div>
          <div className="product_content mt-3 text-center">
            <a href="product-single.html">Elf Bar 5000Puff</a>
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
                <i className="fal fa-star" />
              </a>
            </div>
          </div>
        </div>
        <div className="product_parts_box">
          <div className="partsproduct_img">
            <img src="assets/img/product_4.png" alt="Product" />
          </div>
          <div className="product_content mt-3 text-center">
            <a href="product-single.html">Cherry Pineapple</a>
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
                <i className="fal fa-star" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>
<Footer/>
    </div>
  )
}

export default SingleProduct
