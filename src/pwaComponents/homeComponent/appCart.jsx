import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCart,
  updateCart,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppCart() {
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    const { data } = await getCart();
    if (!data.error) {
      setCart(data.results.products);
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await getCart(id);
    if (!data.error) {
      getCarts();
    }
  };

  const updateQuantity = async (e, id) => {
    setQuantity(e);
    const formData = {
      productId: id,
      quantity: e,
    };
    const { data } = await updateCart(formData);
    if (!data.error) {
      getCarts();
    }
  };

  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="cart-wrapper-area py-3">
              <div className="cart-table card mb-3">
                <div className="table-responsive card-body">
                  <table className="table mb-0">
                    <tbody>
                      {cart.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">
                              <Link
                                className="remove-product"
                                to=""
                                onClick={() =>
                                  deleteProduct(item.productId._id)
                                }
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </Link>
                            </th>
                            <td>
                              <div className="cart_icon">
                                <img
                                  className=""
                                  src={item.productId.productImage}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <Link to="/app/product-detail">
                                BLVK Frznberry
                              </Link>
                            </td>
                            <td>
                              <div className="quantity">
                                <input
                                  className="qty-text"
                                  type="text"
                                  id={`quantity${index}`}
                                  value={quantity}
                                  onChange={(e) =>
                                    updateQuantity(
                                      e.target.value,
                                      item.productId._id,
                                      index
                                    )
                                  }
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card coupon-card mb-3">
                <div className="card-body">
                  <div className="apply-coupon">
                    <h6 className="mb-0">Have a coupon?</h6>
                    <p className="mb-2">
                      Enter your coupon code here &amp; get awesome discounts!
                    </p>
                    <div className="coupon-form">
                      <form action="#">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="SUHA30"
                        />
                        <button className="btn btn-primary" type="submit">
                          Apply
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card cart-amount-area">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="total-price mb-0"></h5>
                  <Link className="comman_btn" to="/app/checkout">
                    Checkout Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <AppFooter />
      </div>
    </>
  );
}

export default AppCart;
