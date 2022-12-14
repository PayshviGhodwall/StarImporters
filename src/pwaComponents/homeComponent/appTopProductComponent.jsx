import React, { useEffect, useState } from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
import {
  addToCart,
  getAllProducts,
} from "../httpServices/homeHttpService/homeHttpService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function TopProduct() {
  const addFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/addToFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [product, setProduct] = useState([]);
  const [heart, setHeart] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, []);
  let token = localStorage.getItem("token-user");

  const getProductList = async () => {
    const { data } = await getAllProducts();
    if (!data?.error) {
      setProduct(data?.results.slice(0, 4));
    }
  };

  const addToCartt = async (id, index) => {
    const formData = {
      productId: id,
      quantity: 1,
      flavour: product[index]?.type[0],
    };
    const { data } = await addToCart(formData);
    if (!data.error) {
      navigate("/app/cart");
    }
  };

  const addToFav = async (index) => {
    await axios
      .post(addFav, {
        productId: product[index]?._id,
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
      })
      .then((res) => {
        // toast.error(res?.data?.message);
      });
    getProductList();
    setHeart(!heart);
  };
  return (
    <>
      <div className="top-products-area pb-3 ">
        <div className="container">
          <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
            <h6>Featured Products</h6>
            <Link className="btn p-0" to="/app/product-list">
              View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
          <div className="row g-2">
            {(product || []).map((item, index) => {
              return (
                <div class="col-6 col-md-4 d-flex align-items-stretch">
                  <div class="card product-card w-100">
                    <div class="card-body">
                      <a class="wishlist-btn">
                        {item?.favourities ? (
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

                      <Link
                        class="product-thumbnail d-block"
                        to={`/app/product-detail/${item?._id}`}
                      >
                        <img
                          class="mb-2"
                          src={item?.type[0]?.flavourImage}
                          alt=""
                        />
                      </Link>
                      <div class="row mt-1 d-flex align-items-center justify-content-between">
                        <div class="col">
                          <Link
                            class="product-title"
                            to={`/app/product-detail/${item?._id}`}
                          >
                            {item?.unitName + item?.type[0]?.flavour}
                          </Link>
                          <div className="product-rating">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
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
        </div>
      </div>
    </>
  );
}

export default TopProduct;
