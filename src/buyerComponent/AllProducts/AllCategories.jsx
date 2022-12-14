import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/category/getCatAndSubCat`;

  useEffect(() => {
    GetCategories();
  }, []);

  const GetCategories = async () => {
    await axios.get(categoryApi).then((res) => {
      setCategories(res?.data.results);
    });
  };
  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>POPULAR CATEGORIES</h1>
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
                        All Categories
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
              <div className="col-12 bg-white px-0 ">
                <ul class="brands_ul list-unstyled mb-0">
                  {(categories || [])?.map((item, index) => (
                    <li key={index}>
                      <h5 className="text-center mt-3">{item?.categoryName}</h5>

                      <Link
                      className="text-decoration-none mt-0"
                        to={{
                          pathname: "/CategoryProducts",
                          search: "?sort=name",
                          hash: "#the-hash",
                        }}
                        state={{ name: item?.categoryName }}
                      >
                        <img src={item?.categoryImage} alt="" />
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

export default AllCategories;
