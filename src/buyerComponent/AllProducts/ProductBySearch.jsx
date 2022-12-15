import React, { useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";

const ProductBySearch = () => {
  const allProd = `${process.env.REACT_APP_APIENDPOINTNEW}user/products/getAllProducts`;

  const [products, setProducts] = useState([]);
  const getBrands = `${process.env.REACT_APP_APIENDPOINTNEW}user/brands/getBrands`

  useEffect(() => {
    
  }, []);

  const AllProducts = async () => {
    await axios.post(allProd).then((res) => {
      console.log(res);
      setProducts(res?.data.results);
    });
  };
  return (
    <div>
      <Navbar />
     
      <>
        <section className="brands_page p-5 marginTop">
          {products.length ? 
          <div>

          </div>
          :
        <div className="row justify-content-center">

                  <img className="no-data" src="../assets/img/no-data.gif" style={{width:"600px"}} />

        </div>
        }
        </section>
      </>
      <Footer/>
    </div>
  );
};

export default ProductBySearch;
