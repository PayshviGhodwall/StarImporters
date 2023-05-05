import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";

const Favourites = () => {
  const [users, setUsers] = useState();
  const allFav = `${process.env.REACT_APP_APIENDPOINTNEW}user/fav/allFav`;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  let token = localStorage.getItem("token-user");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUsers(data);
    getFavourites();
  }, []);

  const getFavourites = async () => {
    await axios.get(allFav).then((res) => {
      console.log(res);
      setProducts(res?.data?.results);
    });
  };

  return (
    <div className="main_myaccount">
      <div className="row myfavourites">
        {(products || [])?.map((item, index) => (
          <div className="col-md-4 mb-2" key={index}>
            <div className="border rounded br-2 px-4 pt-2 shadow">
              <div
                className="partsproduct_img"
                onClick={() => {
                  navigate(`/AllProducts/Product/${item?.productId?._id}`, {
                    state: {
                      id: item?.productId?._id,
                    },
                  });
                }}
              >
                <img src={item?.productId?.productImage} alt="Product" />
              </div>
              <div
                className="product_content mt-3 text-center mb-0"
                onClick={() => {
                  navigate(`/AllProducts/Product/${item?.productId?._id}`, {
                    state: {
                      id: item?.productId?._id,
                    },
                  });
                }}
              >
                <Link to="" className="text-decoration-none">
                  {item?.productId?.unitName}
                </Link>

                <a className="fav_btn change_btn" href="javscript:;" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
