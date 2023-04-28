import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
import {
  addToCart,
  getFeaturedProd,
} from "../httpServices/homeHttpService/homeHttpService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { browserName } from "react-device-detect";

function TopProduct() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const userData = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const [product, setProduct] = useState([]);
  const [heart, setHeart] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [userDetail, setUserDetail] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
    userInfo();
  }, []);
  let token = localStorage.getItem("token-user");

  const userInfo = async () => {
    await axios.get(userData).then((res) => {
      setUserDetail(res?.data?.results);
    });
  };

  const getProductList = async () => {
    const { data } = await getFeaturedProd();
    if (!data?.error) {
      setProduct(data?.results.products.slice(0, 6));
    }
  };

  const addToCartt = async (id, index) => {
    if (product?.category?.isTobacco || product?.subCategory?.isTobacco) {
      if (!userDetail?.istobaccoLicenceExpired) {
        const formData = {
          productId: id,
          quantity: 1,
          flavour: product[index]?.type[0],
        };
        const { data } = await addToCart(formData);
        if (!data.error) {
          navigate("/app/cart");
        }
        if (data?.error) {
          navigate("/app/login");
        }
      } else {
        Swal.fire({
          title: "Your Tobacco licence is Expired/Invalid!",
          text: "*Licence is Required for this product.",
          icon: "warning",
          confirmButtonText: "Okay",
        });
      }
    } else {
      const formData = {
        productId: id,
        quantity: 1,
        flavour: product[index]?.type[0],
      };
      const { data } = await addToCart(formData);
      if (!data.error) {
        navigate("/app/cart");
      }
      if (data?.error) {
        navigate("/app/login");
      }
    }
  };

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product[index]?._id,
        flavour: product[index]?.type[0],
      })
      .catch((err) => {
        // toast.success(res?.data?.message);
        if (err) {
          Swal.fire({
            title: "Please Login To Continue",
            icon: "error",
            button: "ok",
          });
        }
      });

    getProductList();
    setHeart(!heart);
  };
  const rmvFromFav = async (index) => {
    await axios
      .post(rmvFav, {
        productId: product[index]?._id,
        flavour: product[index]?.type[0],
      })
      .then((res) => {
        if (!res.error) {
          setHeart(!heart);
        }
      });
    getProductList();
  };
  return (
    <>
      <div className="top-products-area pb-3 ">
        <div className="container">
          <div className=" d-flex align-items-center justify-content-between dir-rtl mt-2 mb-3">
            <h6 className="fs-5">Featured Products</h6>
            <Link className="btn p-0" to="/app/product-list">
              View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
          {browserName === "WebKit" || browserName === "Chrome WebView" ? (
            <div className="row g-2">
              {(product || [])
                .filter(
                  (itm, idx) =>
                    itm.category != "639a042ff2f72167b43774de" &&
                    itm.category != "639a7617f2f72167b4377754"
                )
                .map((item, index) => {
                  return (
                    <div class="col-6 col-md-4 d-flex align-items-stretch">
                      <div class="card product-card w-100">
                        <div class="card-body">
                          {token?.length ? (
                            <a class="wishlist-btn">
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
                            </a>
                          ) : null}

                          <Link
                            class="product-thumbnail d-block"
                            to={`/app/product-detail/${item?._id}`}
                            state={{ type: item?.type[0] }}
                          >
                            <img
                              class="mb-2"
                              src={
                                item.type[0]?.flavourImage
                                  ? item.type[0]?.flavourImage
                                  : require("../../assets/img/product.jpg")
                              }
                              alt="Product Image not updated"
                            />
                          </Link>
                          <div class="row mt-1 d-flex align-items-center justify-content-between">
                            <div class="col">
                              <Link
                                class="product-title"
                                to={`/app/product-detail/${item?._id}`}
                                state={{ type: item?.type[0] }}
                              >
                                {item?.unitName + "-" + item.type[0]?.flavour}
                              </Link>
                            </div>
                            <div class="col-auto">
                              <Link
                                class="cart_bttn text-decoration-none"
                                to=""
                                onClick={() => addToCartt(item?._id, index)}
                              >
                                <i class="fa-light fa-plus "></i>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="row g-2">
              {(product || [])?.map((item, index) => {
                return (
                  <div class="col-6 col-md-4 d-flex align-items-stretch">
                    <div class="card product-card w-100">
                      <div class="card-body">
                        {token?.length ? (
                          <a class="wishlist-btn">
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
                          </a>
                        ) : null}

                        <Link
                          class="product-thumbnail d-block"
                          to={`/app/product-detail/${item?._id}`}
                          state={{ type: item?.type[0] }}
                        >
                          <img
                            class="mb-2"
                            src={
                              item.type[0]?.flavourImage
                                ? item.type[0]?.flavourImage
                                : require("../../assets/img/product.jpg")
                            }
                            alt="Product Image not updated"
                          />
                        </Link>
                        <div class="row mt-1 d-flex align-items-center justify-content-between">
                          <div class="col">
                            <Link
                              class="product-title"
                              to={`/app/product-detail/${item?._id}`}
                              state={{ type: item?.type[0] }}
                            >
                              {item?.unitName + "-" + item.type[0]?.flavour}
                            </Link>
                          </div>
                          <div class="col-auto">
                            <Link
                              class="cart_bttn text-decoration-none"
                              to=""
                              onClick={() => addToCartt(item?._id, index)}
                            >
                              <i class="fa-light fa-plus "></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TopProduct;
