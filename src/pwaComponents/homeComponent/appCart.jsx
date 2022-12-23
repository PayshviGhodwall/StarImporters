import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteCart,
  getCart,
  searchByBarcode,
  updateCart,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppCart() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    const { data } = await getCart();
    if (!data?.error) {
      setCart(data?.results?.getUserCart?.products);
    }
  };

  const deleteProduct = async (id, flavour) => {
    const { data } = await deleteCart({ productId: id, flavour: flavour });
    if (!data?.error) {
      getCarts();
    }
  };

  const updateQuantity = async (e, id) => {
    setQuantity(e.target.value);
    const formData = {
      productId: id,
      quantity: e.target.value,
    };
    const { data } = await updateCart(formData);
    if (!data.error) {
      getCarts();
    }
  };

  const cameraScan = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("scanBarcode");
      if (Dd) {
        const { data } = await searchByBarcode({
          barcode: Dd,
        });
        if (!data.error) {
          if (data.results.length)
            navigate(`/app/product-detail/${data.results[0]._id}`);
          window.location.reload();
        }
      }
    }
  };
  // var toggle = document.getElementById('container');
  // var toggleContainer = document.getElementById('toggle-container');
  // var toggleNumber;

  // toggle.addEventListener('click', function() {
  //   toggleNumber = !toggleNumber;
  //   if (toggleNumber) {
  //     toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
  //     toggleContainer.style.backgroundColor = '#D74046';
  //   } else {
  //     toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
  //     toggleContainer.style.backgroundColor = 'dodgerblue';
  //   }
  //   console.log(toggleNumber)
  // });
  const HandleDecrease = async (id) => {
    const formData = {
      productId: cart[id]?.productId?._id,
      quantity: cart[id]?.quantity,
      flavour: cart[id]?.flavour,
    };
    const { data } = await updateCart(formData);
    if (!data.error) {
      setCart((cart) =>
        cart?.map((item, ind) =>
          id === ind
            ? {
                ...item,
                quantity: item?.quantity - (item?.quantity > 1 ? 1 : 0),
              }
            : item
        )
      );
    }
  };

  const HandleIncrease = async (id) => {
    console.log(id);
    const formData = {
      productId: cart[id]?.productId?._id,
      quantity: cart[id]?.quantity,
      flavour: cart[id]?.flavour,
    };
    const { data } = await updateCart(formData);
    if (!data.error) {
      setCart((cart) =>
        cart?.map((item, ind) =>
          id === ind ? { ...item, quantity: item?.quantity + 1 } : item
        )
      );
    }
  };
  return (
    <>
      <div className="star_imp_app">
        <div class="header-area" id="headerArea">
          <div class="container h-100 d-flex align-items-center justify-content-between rtl-flex-d-row-r">
            <div class="back-button me-2 me-2">
              <Link to="/app/home">
                <i class="fa-solid fa-arrow-left-long"></i>
              </Link>
            </div>

            <div id="container">
              <div class="inner-container">
                <div
                  class="toggle"
                  onClick={() => {
                    navigate("/app/quotes");
                  }}
                >
                  <p className="text-dark fw-bold">Quotes</p>
                </div>
                <div
                  class="toggle"
                  style={{ backgroundColor: "#eb3237" }}
                  onClick={() => {
                    navigate("/app/cart");
                  }}
                >
                  <p className="text-white fw-bold">Cart</p>
                </div>
              </div>
            </div>

            <div
              class="suha-navbar-toggler ms-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#suhaOffcanvas"
              aria-controls="suhaOffcanvas"
            >
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <WebHeader2 />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="cart-wrapper-area py-3 ">
              <div className="cart-table card mb-3">
                <div className="table-responsive card-body p-1">
                  <table className="table mb-0">
                    <tbody>
                      {(cart || [])?.map((item, index) => {
                        return (
                          <tr>
                            <th scope="">
                              <Link
                                className="remove-product"
                                to=""
                                onClick={() =>
                                  deleteProduct(item?.productId._id)
                                }
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </Link>
                            </th>
                            <td>
                              <div className="cart_icon">
                                <img
                                  className=""
                                  src={
                                    item?.flavour?._id
                                      ? item?.flavour?.flavourImage
                                      : item?.productId?.productImage
                                  }
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              {item?.flavour?._id ? (
                                <Link
                                  to={`/app/product-detail/${item?.productId?._id}`}
                                >
                                  {item?.productId?.unitName +
                                    "-" +
                                    item?.flavour?.flavour}
                                </Link>
                              ) : (
                                <Link
                                  to={`/app/product-detail/${item?.productId?._id}`}
                                >
                                  {item?.productId?.unitName}
                                </Link>
                              )}
                            </td>
                            <td>
                              <div className="quantity d-flex">
                                <span
                                  className="minus fs-5 fw-bold ms-5"
                                  style={{ userSelect: "none" }}
                                  onClick={() => {
                                    HandleDecrease(index);
                                  }}
                                >
                                  {item?.quantity <= 1 ? (
                                    <i
                                      class="fa fa-trash fs-6 text-danger"
                                      onClick={() =>
                                        deleteProduct(
                                          item?.productId._id,
                                          item?.flavour
                                        )
                                      }
                                    ></i>
                                  ) : (
                                    "-"
                                  )}
                                </span>
                                <input
                                  className="qty-text mx-2"
                                  type="text"
                                  id={`quantity${index}`}
                                  value={item?.quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      e.target.value,
                                      item?.productId?._id
                                    )
                                  }
                                />
                                <span
                                  className="plus fs-5 fw-bold"
                                  style={{ userSelect: "none" }}
                                  onClick={() => {
                                    HandleIncrease(index);
                                  }}
                                >
                                  +
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className=" col-6 cart-amount-area p-1">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <h5 className="total-price mb-0"></h5>
                    {cart?.length ? (
                      <Link className="comman_btn" to="/app/checkout">
                        Checkout
                      </Link>
                    ) : (
                      <Link className="comman_btn " to="/app/home">
                        Start Shopping
                      </Link>
                    )}
                  </div>
                </div>
                <div className="col-6 cart-amount-area p-1">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <h5 className="total-price mb-0"></h5>
                    <a className="comman_btn2" onClick={cameraScan}>
                      Scan Barcode
                    </a>
                  </div>
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

export default AppCart;
