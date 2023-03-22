import React, { useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";
import moment from "moment";

function AppRequestDetail() {
  const getQuoteDetails = `${process.env.REACT_APP_APIENDPOINTNEW}user/quotes/singleRequest`;
  const [quoteDetails, setQuoteDetails] = useState([]);

  let location = useLocation();
  let id = location?.state?.id;

  useEffect(() => {
    const GetQuote = async () => {
      await axios
        .post(getQuoteDetails, {
          quoteId: id,
        })
        .then((res) => {
          setQuoteDetails(res?.data.results);
        });
    };
    GetQuote();
  }, []);
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="my_order_new">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded py-3 px-1 position-relative bg-white shadow">
                  <span className="small_header">Request Details:</span>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Request Date :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">
                          {moment(quoteDetails?.createdAt?.slice(0, 10)).format(
                            "MM/DD/YYYY"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Request Id :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">
                          {quoteDetails?.quoteId}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mb-1">
                    <div className="row">
                      <div className="col-6">
                        <span className="data_main">Total Products :</span>
                      </div>
                      <div className="col-6">
                        <span className="data_submain">
                          {quoteDetails?.products?.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="row mx-0 border rounded position-relative bg-white shadow cart-table">
                  <div className="table-responsive card-body">
                    <table className="table mb-0">
                      <tbody>
                        {(quoteDetails?.products || [])?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="cart_icon">
                                <img
                                  className=""
                                  src={item?.flavour?.flavourImage}
                                  alt=""
                                />
                              </div>
                            </td>
                            <td>
                              <div className="order_items">
                                <Link
                                  to={`/app/product-detail/${item?.productId?._id}`}
                                >
                                  {item?.productId?.unitName}
                                </Link>
                                {/* <div className="bar_code mt-1">
                                  Bar Code:{" "}
                                  <span>
                                    {item?.flavour.barcode.map((item) => (
                                      <li>{item}</li>
                                    ))}
                                  </span>
                                </div> */}
                                <div className="bar_code mt-1 d-flex">
                                  Price: $<span>{item?.price}</span>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="quantity">
                                <input
                                  className="qty-text"
                                  type="text"
                                  value={item?.quantity}
                                  disabled
                                />
                              </div>
                            </td>
                            <td>
                              <div className="quantity">
                                <input
                                  className="qty-text2"
                                  type="text"
                                  disabled
                                  value={"$" + item?.quantity * item?.price}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AppRequestDetail;
