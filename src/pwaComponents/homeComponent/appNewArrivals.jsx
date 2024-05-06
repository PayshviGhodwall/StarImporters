import React, { useEffect, useState } from "react";import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AppNewArrivals() {
  const userData = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const getPromotionProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/getPromotion`;
  const [product, setProduct] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userInfo();
    getPromotionsFeatured();
  }, []);

  let token = localStorage.getItem("token-user");

  const userInfo = async () => {
    await axios.get(userData).then((res) => {
      setUserDetail(res?.data?.results);
    });
  };

  const getPromotionsFeatured = async () => {
    const { data } = await axios.post(getPromotionProd, {
      type: "NewArrivals",
    });

    if (!data.error) {
      setProduct(data?.results.promotion?.products);
    }
  };

  return (
    <>
      {product?.length > 0 && (
        <div className="top-products-area pb-3 ">
          <div className="container">
            <div className=" d-flex align-items-center justify-content-between dir-rtl mt-2 mb-3">
              <h6 className="fs-6 fw-bold">New Arrivals</h6>
              <Link className="btn p-0" to="/app/new-arrival-list">
                View All<i className="ms-1 fa-solid fa-arrow-right-long"></i>
              </Link>
            </div>

            <div className="row px-3 ">
              {(product || [])
                .filter((itm, idx) => idx < 4)
                .map((item, index) => (
                  <div
                    class=" feat_main col-6 mb-5 mt-2 justify-content-center "
                    onClick={() => {
                      navigate(`/app/product-detail/${item?.productId?.slug}`, {
                        state: {
                          type: item?.productId?.type,
                          offer: item?.price,
                        },
                      });
                    }}
                  >
                    <div
                      class="shadow "
                      style={{
                        backgroundImage: `url(${
                          item?.productId?.type?.flavourImage
                            ? item?.productId?.type?.flavourImage
                            : item?.productId?.productImage ||
                              require("../../assets/img/product.jpg")
                        })`,
                        backgroundPosition: "center",
                        opacity: "unset",
                        height: "12rem",
                        backgroundSize: "cover",
                      }}
                    >
                      {item?.price?.length > 0 && (
                        <span className="product-feat-label px-2">
                          Price : {item?.price ? "-" : ""}
                          <span className=" mx-1  fs-5 fw-bold">
                            {item?.price ? "$" + item.price : ""}
                          </span>
                        </span>
                      )}
                    </div>
                    <Link
                      className="price-size2"
                      to={`/app/product-detail/${item?.productId?.slug}`}
                      state={{
                        type: item?.productId?.type,
                        offer: item?.price,
                      }}
                    >
                      {item?.productId?.unitName?.slice(0, 28)}
                      <span>
                        {item?.productId?.type
                          ? item?.productId?.type?.flavour
                          : ""}
                      </span>
                    </Link>
                  </div>
                ))}
            </div>

            {/* )} */}
          </div>
        </div>
      )}
    </>
  );
}

export default AppNewArrivals;
