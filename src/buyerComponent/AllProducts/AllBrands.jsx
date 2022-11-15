import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const AllBrands = () => {
  const [brands, setBrands] = useState([]);
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`

  useEffect(() => {
    GetBrands();
  }, []);

  const GetBrands = async () => {
    await axios.get(getBrands).then((res) => {
      setBrands(res?.data.results);
    });
  };
  return (
    <div>
      <Navbar />
      <section className="comman_banner _banner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>ALL BRANDS</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to="/"
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        All Brands
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
                  {(brands || [])?.map((item, index) => (
                    <li key={index}>
                      <Link 
                      to={{
                        pathname: "/Brands/Products",
                        search: "",
                        hash: "",
                      }}
                      state={{name:item?.brandName}}
                      
                      >
                        <img
                          src={item?.brandImage}
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
      <Footer/>
    </div>
  );
};

export default AllBrands;
