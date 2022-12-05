import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppWishlist() {
  const allFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/allFav`;
  const rmvFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/removeFav`;
  const [products, setProducts] = useState();
 const navigate = useNavigate()
  useEffect(() => {
    getFavourites();
  }, []);

  const getFavourites = async () => {
    await axios.get(allFav).then((res) => {
      console.log(res);
      setProducts(res?.data?.results?.products);
    });
  };
  const rmvFromFav = async (index) => {
    await axios.post(rmvFav, {
      productId: products[index]?.productId?._id,
    }).then((res)=>{
      toast.error(res?.data?.message);
    })
    getFavourites()
  
  };
  const addToCartt = async (id) => {
    const formData = {
      productId: id,
      quantity: 1,
    };
    console.log(formData);
    const { data } = await addToCart(formData);
    if (!data.error) {
      await axios.post(rmvFav, {
        productId: id,
      }).then((res)=>{
    getFavourites()
        
      })
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between rtl-flex-d-row-r">
                <h6>Wishlist Items - {products?.length}</h6>
              </div>
              <div className="row g-2">
                {(products || [])?.map((item, index) => (
                  <div className="col-12 mb-3" key={index}>
                    <div className="horizontal-product-card">
                      <div className="d-flex align-items-center">
                        <div className="product-thumbnail-side">
                          <Link
                            className="product-thumbnail shadow-sm d-block"
                            to="/app/product-detail"
                          >
                            <img src={item?.productId?.productImage} alt="" />
                          </Link>
                        </div>
                        <div className="product-description">
                          <a className="delete-btn" onClick={()=> rmvFromFav(index)}>
                            <i className="fa-solid fa-trash-can"></i>
                          </a>
                          <Link
                            className="product-title d-block fs-5 mb-2"
                            to="/app/product-detail"
                          >
                            {item?.productId?.unitName}
                          </Link>
                          <div className="product-rating mt-2 mb-2">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                          </div>
                          <div className="col-auto mt-3">
                          <Link
                            class="cart_bttn"
                            to=""
                            onClick={() => addToCartt(item?.productId?._id)}
                          >
                            <i class="fa-light fa-plus"></i>
                          </Link>
                          </div>
                          <div class="col-auto">
                         
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="col-12">
                  <Link to="/app/cart" className="comman_btn">
                    Go to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppWishlist;
