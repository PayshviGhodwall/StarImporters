import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Homepage/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import axios from "axios";
import Swal from "sweetalert2";

const BuyAgain = () => {
  const [users, setUsers] = useState();
  const products = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/purchasedProducts`;
  const addInCart = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/buyAgain`;
  const [purchasedProd, setPurchasedProd] = useState();
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);
  const [Nstate, setNstate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUsers(data);
    getProducts();
  }, []);

  const getProducts = async () => {
    await axios.post(products).then((res) => {
      setPurchasedProd(res?.data.results.products);
    });
  };

  const handleClick = (e, flavour, productId, i) => {
    const { id, checked } = e.target;
    console.log(id, checked);
    if (checked) {
      let Array = [...selected];
      Array.push({ flavour, productId });
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
    console.log(data);
    if (!data.error) {
      setNstate(!Nstate);
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
    <div className="main_myaccount">
      <Navbar NState={Nstate} />
      <section className="comman_banner _banner marginTop">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>My Account</h1>
              <div className="breadcrumbs mt-2">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="item_nanner">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6  "
                      >
                        Home <span className="arrow">&#62;</span>{" "}
                      </Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link
                        to=""
                        className="text-decoration-none text-white fs-6 mx-2"
                      >
                        My Account
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="myaccount mb-4 ">
        <div className="container-lg position-relative">
          <Profile />
        </div>
        <div className="container container-sm">
          <div className="row mt-5  justify-content-center">
            <div className="col-lg-3   col-md-3 col-sm-5 col-xs-5 ">
              <div className="row  ">
                {/* My Account Tab Menu Start */}
                <div className="myaccount_tabs bg-white p-2">
                  <Link
                    to="/MyAccount"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div
                      className="  nav flex-coloumn text-white  px-3 py-2 border  "
                      role=""
                    >
                      <h4 className="mt-1">
                        <i className="fa fa-clipboard-list" />
                        <span className="fs-6 mx-2">ORDER HISTORY</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/RequestOrder"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border   " role="tablist">
                      <h4 className="">
                        <i className="fas fa-file mt-1" />
                        <span className="fs-6 mx-2">MY QUOTATIONS</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Address"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border" role="tablist">
                      <h4 className="">
                        <i className="fa fa-map-signs" />
                        <span className="fs-6 mx-2">ADDRESS BOOK</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Account"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2  border  " role="nav-link">
                      <h4 className="">
                        <i className="fas fa-user" />
                        <span className="fs-6 mx-2">ACCOUNT SETTING</span>
                      </h4>
                    </div>
                  </Link>
                  <Link
                    to="/Favourites"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2  border  " role="tablist">
                      <h4 className="">
                        <i className="fas fa-heart" />
                        <span className="fs-6 mx-2">MY FAVOURITES</span>
                      </h4>
                    </div>
                  </Link>
                  {/* <Link
                    to="/MainMenu"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div className="nav px-3 py-2 border  " role="tablist">
                      <h4 className="">
                        <i className="fa fa-list" />
                        <span className="fs-6 mx-2">MAIN MENU</span>
                      </h4>
                    </div>
                  </Link> */}
                  <Link
                    to="/BuyAgain"
                    style={{ textDecoration: "none", fontSize: "15px" }}
                    className="nav-link"
                  >
                    <div
                      className="nav-active  text-white px-3 py-2 border  "
                      role="tablist"
                    >
                      <h4 className="">
                        <i className="fa fa-shopping-cart mt-1" />
                        <span className="fs-6 mx-2">BUY AGAIN</span>
                      </h4>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-9 col-md-9 col-sm-9">
              <div className="bg-white p-4 ">
                <div className="row">
                  {/* <div className="col-12 fs-5 fw-bold">Purchased Products</div> */}
                  <div className="row myfavourites">
                    {(purchasedProd || [])?.map((item, index) =>
                      item.products?.map((val, ind) => (
                        <div className="col-lg-4 col-md-4 mb-lg-4 mb-md-2">
                          <div className="product_parts_box">
                            <div className="partsproduct_img">
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
                              <label class="checkbox-label">
                                <input
                                  type="checkbox"
                                  key={val?.flavour?._id}
                                  // name={ind}
                                  id={val?.flavour?._id}
                                  onChange={(e) =>
                                    handleClick(
                                      e,
                                      val?.flavour,
                                      val?.productId?._id,
                                      ind
                                    )
                                  }
                                  class="checkbox-input"
                                  checked={isCheck?.includes(val?.flavour?._id)}
                                />
                                <span class="checkmark"></span>
                              </label>
                            </div>
                            <div>
                              <div class="featuredproduct_details p-2 text-center">
                                <span>
                                  {val?.productId?.unitName}
                                  {"-"}
                                  {val?.flavour ? val?.flavour?.flavour : null}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="row py-3 border rounded">
                    <div className="col-lg-5 col-md-5">
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
                    <div className="col-lg-6 col-md-6  justify-content-center">
                      <button className="Signupb" onClick={() => AddtoCart()}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BuyAgain;
