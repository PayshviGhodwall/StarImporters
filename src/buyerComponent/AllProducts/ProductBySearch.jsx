import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import { homeSearch } from "../../pwaComponents/httpServices/homeHttpService/homeHttpService";

const ProductBySearch = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  if (search !== location?.state?.search) {
    setSearch(location?.state?.search);
  }

  const getProductList = async () => {
    const { data } = await homeSearch({ search: search.replace(".", "") });
    if (!data.error) {
      setProducts(data.results);
    }
  };
  console.log(products);

  useEffect(() => {
    getProductList();
  }, [search]);

  return (
    <div>
      <Navbar />

      <>
        <section className="brands_page p-5 marginTop">
          <h4>Search Results For : "{search}"</h4>
          {products?.length ? (
            <div>
              <div className="col w-100">
                <div className="product_single_right row p-4">
                  {(products || [])?.map((item, index) => (
                    <div className="col-xl-3 col-lg-3 col-md-3" key={index}>
                      <div className="product_parts_box">
                        <div className="partsproduct_img">
                          <img
                            src={
                              item?.type.flavour
                                ? item?.type?.flavourImage
                                : item?.productImage
                            }
                            alt="../../assets/img/product.jpg"
                            onClick={() => {
                              navigate("/app/product-details", {
                                state: {
                                  id: item?._id,
                                  type: item?.type,
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
                                navigate("/app/product-details", {
                                  state: { id: item?._id, type: item?.type },
                                });
                              }}
                            >
                              {item?.type.flavour
                                ? item?.unitName + "-" + item?.type?.flavour
                                : item?.unitName}
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
          ) : (
            <div className="row justify-content-center">
              <img
                className="no-data"
                src="../assets/img/no-data.gif"
                style={{ width: "600px" }}
              />
            </div>
          )}
        </section>
      </>
      <Footer />
    </div>
  );
};

export default ProductBySearch;
