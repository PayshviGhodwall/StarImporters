
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import Animate from "../../Animate";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
const Cart = () => {

  const getCartProducts = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/getCart`;
  const productRemove = `${process.env.REACT_APP_APIENDPOINTNEW}user/cart/removeProducts`;
  const [product, setProduct] = useState([]);
  const [token, setToken] = useState();
  const [count, setCount] = useState(1);
  const [NState, setNState] = useState(false);
  const [open, setOpen] = React.useState(false);


  const navigate = useNavigate();
  axios.defaults.headers.common["x-auth-token-user"] =
    localStorage.getItem("token-user");
  const getCart = async () => {
    await axios.get(getCartProducts).then((res) => {
      setProduct(res?.data.results.products);
    });
  };

  console.log(product);
  useEffect(() => {
    setToken(localStorage.getItem("token-user"));
    getCart();
  }, []);

  const RemoveProduct = async (index) => {
    await axios
      .post(productRemove, {
        productId: product[index].productId?._id,
      })
      .then((res) => {
        if (res.data?.message === "Product has been removed") {
          getCart();
          setNState(true);
        }
      });
  };
  return (
    
    <div>
      <Navbar NState={NState} />
      <Animate>

      <section
        className="cart_page py-5"
        style={{ backgroundColor: "#eef3ff" }}
      >
        {token ? (
          <div className="container user-management-tabs px-0">
            <nav className="w-100">
              <div className="nav nav-tabs  " id="nav-tab" role="tablist">
                <button
                  className="nav-link active"
                  style={{ width: "50%" }}
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#nav-home"
                  type="button"
                  onClick={() => {
                    navigate("/Cart");
                  }}
                >
                  <i
                    className="fa fa-cart-arrow-down"
                    style={{ fontSize: "15px" }}
                  />
                  MY CART
                </button>
                <button
                  className="nav-link "
                  id="nav-profile-tab"
                  data-bs-toggle="tab"
                  style={{ width: "50%" }}
                  onClick={() => {
                    navigate("/MyQuotes");
                  }}
                >
                  <i
                    className="fa fa-clipboard-list"
                    style={{ fontSize: "15px" }}
                  />
                  MY QUOTATIONS
                </button>
              </div>
            </nav>
                      <div className="container bg-white ">
              <div className="row p-4">
                <div className="col-12 bg-white">
                  <div className="row">
                    <div className="col-12">
                      <div className="cart_table">
                        {product.length ? (
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Product Details</th>
                                  <th>Quantity</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(product || []).map((item, index) => (
                                  <tr
                                    key={index}
                                    style={{ backgroundColor: "#eef3ff" }}
                                  >
                                    <td>
                                      <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-wrap">
                                        <div className="col-auto">
                                          <span className="cart_product bg-white">
                                            <img
                                              src={
                                                item?.productId?.productImage
                                              }
                                              alt=""
                                            />
                                          </span>
                                        </div>
                                        <div className="col">
                                          <div className="cart_content">
                                            <Link className="text-decoration-none text-dark">
                                              {" "}
                                              <h3 className="fs-5">
                                                {item?.productId?.unitName}{" "}
                                              </h3>
                                            </Link>
                                            <p>
                                              Lorem ipsum dolor sit, amet
                                              consectetur adipisicing elit.
                                              Facere similique odio sed
                                              accusantium.
                                            </p>
                                            <div className="rate_main d-flex align-items-center my-md-3 my-2">
                                              <div className="rating_box">
                                                <a href="javasript:;">
                                                  <i className="fas fa-star" />
                                                </a>
                                                <a href="javasript:;">
                                                  <i className="fas fa-star" />
                                                </a>
                                                <a href="javasript:;">
                                                  <i className="fas fa-star" />
                                                </a>
                                                <a href="javasript:;">
                                                  <i className="fas fa-star" />
                                                </a>
                                                <a href="javasript:;">
                                                  <i className="fa fa-star" />
                                                </a>
                                              </div>
                                              <span>(216)</span>
                                            </div>
                                            <a
                                              className="text-decoration-none"
                                              style={{
                                                marginTop: "-3px",
                                                color: "#eb3237",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                RemoveProduct(index);
                                              }}
                                            >
                                              <i
                                                class="fa fa-trash"
                                                aria-hidden="true"
                                              ></i>{" "}
                                              Remove
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="number">
                                        <input
                                          type="text"
                                          className="border bg-white rounded"
                                          style={{ width: "70px" }}
                                          defaultValue={item?.quantity}
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <div className="col-12 text-center mb-3 mt-5">
                              <Link
                                className="comman_btn text-decoration-none"
                                to="/Cart/Checkout"
                              >
                                Checkout
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="col-lg-6 text-center"
                            style={{ marginLeft: "320px" }}
                          >
                            <div class="empty-cart">
                              <svg
                                viewBox="656 573 264 182"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xlink="http://www.w3.org/1999/xlink"
                              >
                                <rect
                                  id="bg-line"
                                  stroke="none"
                                  fill-opacity="0.2"
                                  fill="#FFE100"
                                  fill-rule="evenodd"
                                  x="656"
                                  y="624"
                                  width="206"
                                  height="38"
                                  rx="19"
                                ></rect>
                                <rect
                                  id="bg-line"
                                  stroke="none"
                                  fill-opacity="0.2"
                                  fill="#FFE100"
                                  fill-rule="evenodd"
                                  x="692"
                                  y="665"
                                  width="192"
                                  height="29"
                                  rx="14.5"
                                ></rect>
                                <rect
                                  id="bg-line"
                                  stroke="none"
                                  fill-opacity="0.2"
                                  fill="#FFE100"
                                  fill-rule="evenodd"
                                  x="678"
                                  y="696"
                                  width="192"
                                  height="33"
                                  rx="16.5"
                                ></rect>
                                <g
                                  id="shopping-bag"
                                  stroke="none"
                                  stroke-width="1"
                                  fill="none"
                                  fill-rule="evenodd"
                                  transform="translate(721.000000, 630.000000)"
                                >
                                  <polygon
                                    id="Fill-10"
                                    fill="#FFA800"
                                    points="4 29 120 29 120 0 4 0"
                                  ></polygon>
                                  <polygon
                                    id="Fill-14"
                                    fill="#FFE100"
                                    points="120 29 120 0 115.75 0 103 12.4285714 115.75 29"
                                  ></polygon>
                                  <polygon
                                    id="Fill-15"
                                    fill="#FFE100"
                                    points="4 29 4 0 8.25 0 21 12.4285714 8.25 29"
                                  ></polygon>
                                  <polygon
                                    id="Fill-33"
                                    fill="#FFA800"
                                    points="110 112 121.573723 109.059187 122 29 110 29"
                                  ></polygon>
                                  <polygon
                                    id="Fill-35"
                                    fill-opacity="0.5"
                                    fill="#FFFFFF"
                                    points="2 107.846154 10 112 10 31 2 31"
                                  ></polygon>
                                  <path
                                    d="M107.709596,112 L15.2883462,112 C11.2635,112 8,108.70905 8,104.648275 L8,29 L115,29 L115,104.648275 C115,108.70905 111.7365,112 107.709596,112"
                                    id="Fill-36"
                                    fill="#FFE100"
                                  ></path>
                                  <path
                                    d="M122,97.4615385 L122,104.230231 C122,108.521154 118.534483,112 114.257931,112 L9.74206897,112 C5.46551724,112 2,108.521154 2,104.230231 L2,58"
                                    id="Stroke-4916"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <polyline
                                    id="Stroke-4917"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    points="2 41.5 2 29 122 29 122 79"
                                  ></polyline>
                                  <path
                                    d="M4,50 C4,51.104 3.104,52 2,52 C0.896,52 0,51.104 0,50 C0,48.896 0.896,48 2,48 C3.104,48 4,48.896 4,50"
                                    id="Fill-4918"
                                    fill="#000000"
                                  ></path>
                                  <path
                                    d="M122,87 L122,89"
                                    id="Stroke-4919"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <polygon
                                    id="Stroke-4922"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    points="4 29 120 29 120 0 4 0"
                                  ></polygon>
                                  <path
                                    d="M87,46 L87,58.3333333 C87,71.9 75.75,83 62,83 L62,83 C48.25,83 37,71.9 37,58.3333333 L37,46"
                                    id="Stroke-4923"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M31,45 C31,41.686 33.686,39 37,39 C40.314,39 43,41.686 43,45"
                                    id="Stroke-4924"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M81,45 C81,41.686 83.686,39 87,39 C90.314,39 93,41.686 93,45"
                                    id="Stroke-4925"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M8,0 L20,12"
                                    id="Stroke-4928"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M20,12 L8,29"
                                    id="Stroke-4929"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M20,12 L20,29"
                                    id="Stroke-4930"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M115,0 L103,12"
                                    id="Stroke-4931"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M103,12 L115,29"
                                    id="Stroke-4932"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                  <path
                                    d="M103,12 L103,29"
                                    id="Stroke-4933"
                                    stroke="#000000"
                                    stroke-width="3"
                                    stroke-linecap="round"
                                  ></path>
                                </g>
                                <g
                                  id="glow"
                                  stroke="none"
                                  stroke-width="1"
                                  fill="none"
                                  fill-rule="evenodd"
                                  transform="translate(768.000000, 615.000000)"
                                >
                                  <rect
                                    id="Rectangle-2"
                                    fill="#000000"
                                    x="14"
                                    y="0"
                                    width="2"
                                    height="9"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    fill="#000000"
                                    transform="translate(7.601883, 6.142354) rotate(-12.000000) translate(-7.601883, -6.142354) "
                                    x="6.60188267"
                                    y="3.14235449"
                                    width="2"
                                    height="6"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    fill="#000000"
                                    transform="translate(1.540235, 7.782080) rotate(-25.000000) translate(-1.540235, -7.782080) "
                                    x="0.54023518"
                                    y="6.28207994"
                                    width="2"
                                    height="3"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    fill="#000000"
                                    transform="translate(29.540235, 7.782080) scale(-1, 1) rotate(-25.000000) translate(-29.540235, -7.782080) "
                                    x="28.5402352"
                                    y="6.28207994"
                                    width="2"
                                    height="3"
                                    rx="1"
                                  ></rect>
                                  <rect
                                    fill="#000000"
                                    transform="translate(22.601883, 6.142354) scale(-1, 1) rotate(-12.000000) translate(-22.601883, -6.142354) "
                                    x="21.6018827"
                                    y="3.14235449"
                                    width="2"
                                    height="6"
                                    rx="1"
                                  ></rect>
                                </g>
                                <polygon
                                  id="plus"
                                  stroke="none"
                                  fill="#7DBFEB"
                                  fill-rule="evenodd"
                                  points="689.681239 597.614697 689.681239 596 690.771974 596 690.771974 597.614697 692.408077 597.614697 692.408077 598.691161 690.771974 598.691161 690.771974 600.350404 689.681239 600.350404 689.681239 598.691161 688 598.691161 688 597.614697"
                                ></polygon>
                                <polygon
                                  id="plus"
                                  stroke="none"
                                  fill="#EEE332"
                                  fill-rule="evenodd"
                                  points="913.288398 701.226961 913.288398 699 914.773039 699 914.773039 701.226961 917 701.226961 917 702.711602 914.773039 702.711602 914.773039 705 913.288398 705 913.288398 702.711602 911 702.711602 911 701.226961"
                                ></polygon>
                                <polygon
                                  id="plus"
                                  stroke="none"
                                  fill="#FFA800"
                                  fill-rule="evenodd"
                                  points="662.288398 736.226961 662.288398 734 663.773039 734 663.773039 736.226961 666 736.226961 666 737.711602 663.773039 737.711602 663.773039 740 662.288398 740 662.288398 737.711602 660 737.711602 660 736.226961"
                                ></polygon>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#A5D6D3"
                                  fill-rule="evenodd"
                                  cx="699.5"
                                  cy="579.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#CFC94E"
                                  fill-rule="evenodd"
                                  cx="712.5"
                                  cy="617.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#8CC8C8"
                                  fill-rule="evenodd"
                                  cx="692.5"
                                  cy="738.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#3EC08D"
                                  fill-rule="evenodd"
                                  cx="884.5"
                                  cy="657.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#66739F"
                                  fill-rule="evenodd"
                                  cx="918.5"
                                  cy="681.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#C48C47"
                                  fill-rule="evenodd"
                                  cx="903.5"
                                  cy="723.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="none"
                                  fill="#A24C65"
                                  fill-rule="evenodd"
                                  cx="760.5"
                                  cy="587.5"
                                  r="1.5"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="#66739F"
                                  stroke-width="2"
                                  fill="none"
                                  cx="745"
                                  cy="603"
                                  r="3"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="#EFB549"
                                  stroke-width="2"
                                  fill="none"
                                  cx="716"
                                  cy="597"
                                  r="3"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="#FFE100"
                                  stroke-width="2"
                                  fill="none"
                                  cx="681"
                                  cy="751"
                                  r="3"
                                ></circle>
                                <circle
                                  id="oval"
                                  stroke="#3CBC83"
                                  stroke-width="2"
                                  fill="none"
                                  cx="896"
                                  cy="680"
                                  r="3"
                                ></circle>
                                <polygon
                                  id="diamond"
                                  stroke="#C46F82"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  fill="none"
                                  points="886 705 889 708 886 711 883 708"
                                ></polygon>
                                <path
                                  d="M736,577 C737.65825,577 739,578.34175 739,580 C739,578.34175 740.34175,577 742,577 C740.34175,577 739,575.65825 739,574 C739,575.65825 737.65825,577 736,577 Z"
                                  id="bubble-rounded"
                                  stroke="#3CBC83"
                                  stroke-width="1"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  fill="none"
                                ></path>
                              </svg>

                              <h3>Your Shopping Cart is Empty!</h3>
                              <p className="mt-3"> 
                                Looks like you have not made your choice yet! {"    "}
                                <button
                                  className="comman_btn2 rounded p-2"
                                  onClick={() => {
                                    navigate("/");
                                  }}
                                >
                                  Explore More
                                </button>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container bg-white">
            <div className="row p-4">
              <div className="col-12 text-center mb-4">
                <p className="fs-2">Please Login To Access Cart!</p>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
      </Animate>

    </div>
  );
};

export default Cart;
