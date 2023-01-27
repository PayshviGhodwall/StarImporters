import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const SubCategories = () => {
  const [categories, setCategories] = useState([]);
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/subCatbyCat`;
  const [objectId, setObjectID] = useState();
  let location = useLocation();

  if (objectId !== location?.state?.id) {
    setObjectID(location?.state?.id);
  }
  useEffect(() => {
    GetSubCategories();
  }, [objectId]);

  const GetSubCategories = async () => {
    await axios
      .post(categoryApi, { category: location?.state?.id })
      .then((res) => {
        setCategories(res?.data.results.subCat);
      });
  };

  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>{location?.state.name}</h1>
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
                      <Link
                        to="/app/Categories"
                        className="text-decoration-none text-white fs-6 "
                      >
                        All Sub-Categories{" "}
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
        <section className="brands_page py-5 ">
          <div className="container">
            <div className="row">
              <div className="col-12 bg-white px-0 mb-3">
                <ul class="brands_ul list-unstyled mb-0 container-fluid mt-4">
                  {(categories || [])?.map((item, index) => (
                    <li key={index} className="mb-2">
                      <h5 className="text-center mt-3">
                        {" "}
                        {item?.subCategoryName}
                      </h5>

                      <Link
                        className="text-decoration-none card w-100 pb-0"
                        to={{
                          pathname: "/SubCategory/Products",
                        }}
                        state={{ name: item?.subCategoryName }}
                      >
                        <img
                          src={
                            item?.subCategoryImage
                              ? item?.subCategoryImage
                              : require("./../../assets/img/product.jpg")
                          }
                          alt=""
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </>
      <Footer />
    </div>
  );
};

export default SubCategories;
