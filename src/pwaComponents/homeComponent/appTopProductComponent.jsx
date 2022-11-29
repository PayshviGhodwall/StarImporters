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

function TopProduct() {
  const [product, setProduct] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = async () => {
    const { data } = await getAllProducts();
    if (!data.error) {
      setProduct(data.results.slice(0, 4));
    }
  };

  const addToCartt = async (id) => {
    const formData = {
      productId: id,
      quantity: 1,
    };
    console.log(formData);
    const { data } = await addToCart(formData);
    if (!data.error) {
      navigate("/app/cart");
    }
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
            {product.map((item, index) => {
              return (
                <div class="col-6 col-md-4 d-flex align-items-stretch">
                  <div class="card product-card w-100">
                    <div class="card-body">
                      <a class="wishlist-btn" href="#">
                        <i class="fa-solid fa-heart"></i>
                      </a>

                      <Link
                        class="product-thumbnail d-block"
                        to={`/app/product-detail/${item._id}`}
                      >
                        <img class="mb-2" src={item.productImage} alt="" />
                      </Link>
                      <div class="row mt-1 d-flex align-items-center justify-content-between">
                        <div class="col">
                          <a class="product-title" href="javascript:;">
                            {item.unitName}
                          </a>
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
                            class="cart_bttn"
                            to=""
                            onClick={() => addToCartt(item._id)}
                          >
                            <i class="fa-light fa-plus"></i>
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
