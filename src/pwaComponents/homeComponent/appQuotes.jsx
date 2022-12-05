import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteCart,
  deleteQuote,
  getCart,
  getQuotes,
  updateCart,
} from "../httpServices/homeHttpService/homeHttpService";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import WebHeader2 from "./webHeader2";

function AppQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [quantity, setQuantity] = useState(0);
 const navigate = useNavigate()
  useEffect(() => {
    getAllQuotes();
  }, []);

  const getAllQuotes = async () => {
    const { data } = await getQuotes();
    if (!data?.error) {
      setQuotes(data?.results?.products);
    }
  };

  const deleteProduct = async (id) => {
    const { data } = await deleteQuote({ productId: id });
    if (!data?.error) {
      getAllQuotes();
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
      getQuotes();
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
                <div class="toggle" style={{backgroundColor:"#eb3237"}} onClick={()=>{navigate("/app/quotes")}}>
                  <p  className="text-white fw-bold">Quotes</p>
                </div>
                <div class="toggle"   onClick={()=>{navigate("/app/cart")}} >
                  <p className="text-dark fw-bold">Cart</p>
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
            <div className="cart-wrapper-area py-3">
              <div className="cart-table card mb-3">
                <div className="table-responsive card-body">
                  
                  <table className="table mb-0">
                    <tbody>
                      {(quotes || []).map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">
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
                                  src={item?.productId?.productImage}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <Link
                                to={`/app/product-detail/${item?.productId?._id}`}
                              >
                                {item?.productId?.unitName}
                              </Link>
                            </td>
                            <td>
                              <div className="quantity">
                                <input
                                  className="qty-text"
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
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card cart-amount-area">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <h5 className="total-price mb-0"></h5>
                  {quotes ? <Link className="comman_btn" to="/app/checkout">
                    Checkout Now
                  </Link> 
                  :
                  <Link className="comman_btn" to="/app/checkout">
                  Start Shopping
                </Link>
                  }
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

export default AppQuotes;
