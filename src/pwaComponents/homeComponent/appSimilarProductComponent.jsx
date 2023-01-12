import React, { useEffect, useState } from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
import {
  addToCart,
  getAllProducts,
  similarProduct,
} from "../httpServices/homeHttpService/homeHttpService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SimlarProduct({ categoryName }) {
  const similarProduct = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/similarProduct`;
  const [product, setProduct] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProductList();
  }, [categoryName]);
  console.log(categoryName?.categoryName);
  const getProductList = async () => {
    await axios
      .post(similarProduct, {
        category: categoryName?.categoryName,
      })
      .then((res) => {
        setProduct(res?.data?.results);
      });
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
      <div className="related-product-wrapper bg-white py-3 mb-3">
        <div className="container -fluid">
          <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <h6>Related Products</h6>
            <Link className="btn p-0" to="/app/product-list">
              View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
            </Link>
          </div>
          <OwlCarousel
            className="flash-sale-slide"
            autoplay={true}
            autoplayHoverPause={false}
            autoplayTimeout={5000}
            dots={false}
            loop={true}
            nav={false}
            fade={false}
            items={3}
            margin={10}
          >
            {(product || []).map((item, index) => {
              return (
                <div className="card flash-sale-card item" key={index}>
                  <div className="card-body">
                    <Link
                      to={`/app/product-detail/${item?._id}`}
                      state={{ type: item?.type[0] }}
                    >
                      <img
                        src={
                          item.type[0]?.flavourImage
                            ? item.type[0]?.flavourImage
                            : require("../../assets/img/product.jpg")
                        }
                        alt=""
                      />
                    </Link>
                    <div class="row d-flex align-items-center justify-content-between">
                      <div class="col">
                        <Link
                          class="product-title text-center"
                          to={`/app/product-detail/${item?._id}`}
                          state={{ type: item?.type[0] }}
                        >
                          {item?.unitName + "-" + item.type[0]?.flavour}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        </div>
      </div>
    </>
  );
}

export default SimlarProduct;
