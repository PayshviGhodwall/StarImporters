import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
const ViewQuoteReq = () => {
  const [sideBar, setSideBar] = useState(true);
  let location = useLocation();
  const QuoteView = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/singleUserQuote`;
  const updateOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/updateOrder`;
  const [quote, setQuote] = useState([]);
  
  const navigate = useNavigate();

  let id = location?.state?.id;

  useEffect(() => {
    QuoteDetails();
  }, []);

  const QuoteDetails = async () => {
    await axios.get(QuoteView + "/" + id).then((res) => {
      setQuote(res?.data.results);
    });
  };


  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div className={sideBar ? "admin_main" : "expanded_main"}>
      <div className={sideBar ? "siderbar_section" : "d-none"}>
        <div className="siderbar_inner">
          <div className="sidebar_logo">
            <Link to="" className="">
              <img src={Starlogo} alt="Logo" />{" "}
            </Link>
          </div>
          <div className="sidebar_menus">
            <ul className="list-unstyled ps-1 m-0">
              <li>
                <Link
                  className=""
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "2px" }}
                    className="fa fa-home"
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/UserManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-user"
                  ></i>{" "}
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Inventory"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "6px", top: "3px" }}
                    class="far fa-building"
                  ></i>{" "}
                  Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                > 
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-ship"
                  ></i>{" "}
                  Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className="bg-white"
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "#3e4093",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-cog"
                  ></i>{" "}
                  CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{ textDecoration: "none", fontSize: "18px" }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "3px" }}
                    class="fa fa-sign-out-alt"
                  ></i>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="admin_main_inner">
        <div className="admin_header shadow">
          <div className="row align-items-center mx-0 justify-content-between w-100">
            <div className="col">
              {sideBar ? (
                <div>
                  <h1
                    className="mt-2 text-white"
                    onClick={() => {
                      console.log("yello");
                      setSideBar(!sideBar);
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "4px" }}
                      className="fa fa-bars"
                    ></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar);
                      }}
                    >
                      X
                    </button>
                  </h3>
                </div>
              )}
            </div>
            <div className="col-auto d-flex ml-5">
              <ProfileBar />
            </div>
          </div>
        </div>
        <div className="admin_panel_data height_adjust">
          <div className="row category_management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Quotation Request Details</h2>
                    </div>
                    
                  </div>
                  <div className="row p-4 py-5">
                    <div className="col-12 mb-4">
                      <div className="row mx-0 border rounded py-4 px-3 position-relative">
                        <span className="small_header">Request Details </span>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Request Date:</span>
                            <div className="col">
                              <strong>{quote?.createdAt?.slice(0, 10)}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Request Id:</span>
                            <div className="col">
                              <strong>{quote?.quoteId}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Total Products:</span>
                            <div className="col">
                              <strong>{quote?.products?.length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <div className="cart_table">
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>
                                  Items{" "}
                                  <a
                                    className="filter_table"
                                    href="javscript:;"
                                  />
                                </th>
                                <th>Quantity</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(quote?.products || [])?.map((item, index) => (
                                <tr>
                                  <td>
                                    <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                      <div className="col-auto">
                                        <span className="cart_product">
                                          <img
                                            src={item?.productId?.productImage}
                                            alt=""
                                          />
                                        </span>
                                      </div>
                                      <div className="col">
                                        <div className="cart_content ">
                                          <h3 className="fs-5">
                                            {item?.productId?.unitName}
                                          </h3>
                                          <p>
                                            Barcode :{" "}
                                            {item?.productId?.pBarcode[0]}
                                          </p>
                                          <span className="ordertext my-2 d-block ">
                                            <label className=" mb-2 fw-bold">
                                              Add Price :
                                            </label>
                                            <input
                                              type="number"
                                              className="form-control fs-6"
                                              style={{ width: "80px" }}
                                              onChange={(e) => {
                                                let price = e.target.value;
                                               setQuote((quote)=>
                                                 quote?.products?.map((item,ind)=>(
                                                  index === ind ? { ...item, price: item?.price * price } : item
                                                 ))
                                               )
                                              }}
                                              
                                            ></input>
                                            
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="quantity_text fs-5 fw-bold">
                                      {item?.quantity}
                                    </span>
                                  </td>
                                  <td>
                                    <span className="quantity_text fs-5 fw-bold">
                                      {item?.price}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="text-center">
                            <button className="comman_btn">Share</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuoteReq;
