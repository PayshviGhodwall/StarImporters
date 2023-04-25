import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart } from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppBuyAgain() {
  const products = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/purchasedProducts`;
  const addInCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/buyAgain`;
  const [purchasedProd, setPurchasedProd] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);
  const [Nstate, setNstate] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(false);
  let token = localStorage.getItem("token-user");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios.post(products).then((res) => {
      setPurchasedProd(res?.data.results.products);
    });
  };

  const handleClick = (e, flavour, productId, quantity, i) => {
    const { id, checked } = e.target;
    console.log(id, checked);
    if (checked) {
      let Array = [...selected];
      Array.push({ flavour, productId, quantity });
      setSelected(Array);
    }
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setSelected(selected.filter((item) => item?.productId !== productId));
    }
  };
  console.log(selected);
  const handleSelectAll = (e) => {
    const { checked } = e.target;
    setIsCheckAll(!isCheckAll);
    let Nitem = [...isCheck];
    purchasedProd?.map((li) =>
      li.products?.map((val, ind) => Nitem.push(val.flavour?._id))
    );
    console.log(Nitem);
    setIsCheck(Nitem);
    let allData = [...selected];
    (purchasedProd || [])?.map((item, index) =>
      item.products?.map((val, ind) =>
        allData.push({
          flavour: val?.flavour,
          productId: val?.productId?._id,
          quantity: val?.quantity,
        })
      )
    );
    setSelected(allData);
    console.log(checked);
    if (isCheckAll) {
      setIsCheck([]);
    }
    if (!checked) {
      setSelected([]);
    }
  };

  const AddtoCart = async (e) => {
    if (selected === []) {
      Swal.fire({
        title: "Please Select any product!",
        icon: "error",
        showConfirmButton: "okay",
      });
    }
    const { data } = await axios.post(addInCart, {
      products: selected,
    });
    if (!data.error) {
      setCartCount(!cartCount);
      setIsCheck([]);
      setIsCheckAll(false);
      Swal.fire({
        title: "Product Added to Cart",
        icon: "success",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-shopping-cart"></i> Cart!',
        confirmButtonAriaLabel: "Thumbs up, Okay!",
        cancelButtonText: "Close",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/app/cart", { state: "jii" });
        }
      });
    }
    if (data.error) {
      Swal.fire({
        title: data?.message,
        icon: "error",
        showConfirmButton: "okay",
      });
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <AppHeader cartCount={cartCount} />
        <div className="page-content-wrapper">
          <div className="py-3">
            <div className="row mb-2">
              <div className="col-5 mx-3 mx-xs-0 col-xs-6">
                <label class="checkbox-label-all d-flex">
                  <input
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                    class="checkbox-input-all"
                  />
                  <span class="checkmark-all"></span>
                  <span className="select-text">Select All</span>
                </label>
              </div>
              <div className="col-6 col-xs-6">
                <button onClick={(e) => AddtoCart(e)} className="comman_btn">
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="container ">
              <div className="row mt-0 buyAgain">
                {(purchasedProd || [])?.map((item, index) =>
                  item.products?.map((val, ind) => (
                    <div className="col-12 mb-2 card" key={index}>
                      <div className="horizontal-product-card py-2">
                        <div className="d-flex align-items-center">
                          <div className="product-thumbnail-side">
                            <Link
                              className="product-thumbnail shadow-sm d-block"
                              to={`/app/product-detail/${item?.productId?._id}`}
                              state={{ type: item?.flavour }}
                            >
                              <img
                                src={
                                  val?.flavour
                                    ? val?.flavour?.flavourImage ||
                                      require("../../assets/img/product.jpg")
                                    : val?.productId?.productImage ||
                                      require("../../assets/img/product.jpg")
                                }
                                alt="Product"
                              />
                            </Link>
                          </div>

                          <div className="p-3">
                            <Link
                              className="product-title d-block  mb-3"
                              to={`/app/product-detail/${val?.productId?._id}`}
                              state={{ type: val?.flavour }}
                            >
                              {val?.productId?.unitName}
                              {"-"}
                              {val?.flavour ? val?.flavour?.flavour : null}
                            </Link>
                            <small>Quantity : {val?.quantity}</small>
                          </div>
                          <div>
                            <label class="checkbox-label mb-3">
                              <input
                                type="checkbox"
                                key={val?.flavour?._id}
                                name={ind}
                                id={val?.flavour?._id}
                                onChange={(e) =>
                                  handleClick(
                                    e,
                                    val?.flavour,
                                    val?.productId?._id,
                                    val?.quantity,
                                    ind
                                  )
                                }
                                class="checkbox-input mb-2 mx-3"
                                checked={isCheck?.includes(val?.flavour?._id)}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {/* <div className="col-12">
                  <Link to="/app/cart" className="comman_btn">
                    Go to Cart
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppBuyAgain;
