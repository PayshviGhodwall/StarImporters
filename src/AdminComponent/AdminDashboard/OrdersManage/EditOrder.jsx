import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
import Select from "react-select";

const EditOrder = () => {
  const [sideBar, setSideBar] = useState(true);
  let location = useLocation();
  const orderView = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderDetail`;
  const updateOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/updateOrder`;
  const inventorySearch = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/searchInventory`;
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const navigate = useNavigate();
  let User = JSON.parse(localStorage.getItem("AdminData"));
  let id = location?.state?.id;
  const [options, setOptions] = useState([]);

  useEffect(() => {
    OrderDetails();
  }, []);
  useEffect(() => {
    createOptions();
  }, [searchKey]);

  const OrderDetails = async () => {
    await axios.get(orderView + "/" + id).then((res) => {
      setOrders(res?.data.results);
    });
  };

  const createOptions = async () => {
    await axios
      .post(inventorySearch, {
        search: searchKey,
      })
      .then((res) => {
        if (!res.error) {
          let data = res?.data.results.results;
          const optionList = data?.map((item, index) => ({
            value: item?._id,
            label: item?.unitName,
          }));
          setOptions(optionList);
        }
      });
  };

  const handleChange = (i, e) => {
    // let newProducts = { ...quote };
    // newProducts.products[i].price = e.target.value;
    // setQuote(newProducts);
  };
  const handleChange2 = (selected) => {
    setSelectedProduct({
      usersSelected: selected,
    });
  };
  const handleInputChange = (inputValue) => {
    setSearchKey(inputValue);
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
            {User?.type === "SubAdmin" ? (
              <ul className="list-unstyled ps-1 m-0">
                <li
                  className={
                    User?.access?.includes("Dashboard") ? "" : "d-none"
                  }
                >
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
                <li
                  className={
                    User?.access?.includes("User Management") ? "" : "d-none"
                  }
                >
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
                <li
                  className={
                    User?.access?.includes("Category Sub-Category Management")
                      ? ""
                      : "d-none"
                  }
                >
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
                <li
                  className={
                    User?.access?.includes("Inventory Management")
                      ? ""
                      : "d-none"
                  }
                >
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
                <li
                  className={
                    User?.access?.includes("Brands Management") ? "" : "d-none"
                  }
                >
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
                <li
                  className={
                    User?.access?.includes("Sub-Admin") ? "" : "d-none"
                  }
                >
                  <Link
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Orders Request") ? "" : "d-none"
                  }
                >
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
                <li className={User?.access?.includes("CMS") ? "" : "d-none"}>
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
            ) : (
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
                    style={{ textDecoration: "none", fontSize: "18px" }}
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
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
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
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}
                  >
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"
                    ></i>{" "}
                    Sub-Admin Management
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
            )}
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
                      <h2>Edit Order Details</h2>
                    </div>

                    <div className="col-auto">
                      <button
                        class="dropdown-btns comman_btn2 p-2 rounded"
                        title="Close"
                        onClick={() =>
                          navigate("/OrderRequest/ViewOrder", {
                            state: { id: id },
                          })
                        }
                      >
                        <i class="fa fa-close fs-5"></i>
                      </button>
                    </div>
                  </div>
                  <div className="row p-4 py-5">
                    <div className="col-12 mb-4">
                      <div className="row mx-0 border rounded py-4 px-3 position-relative">
                        <span className="small_header">Order Details</span>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Date:</span>
                            <div className="col">
                              <strong>{orders?.createdAt?.slice(0, 10)}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Id:</span>
                            <div className="col">
                              <strong>{orders?.orderId}</strong>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Total Products:</span>
                            <div className="col">
                              <strong>{orders?.products?.length}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4 ">
                      <div className="cart_table border rounded">
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
                              </tr>
                            </thead>
                            <tbody>
                              {(orders?.products || [])?.map((item, index) => (
                                <tr>
                                  <td>
                                    <div className="row align-items-center flex-lg-wrap flex-md-nowrap flex-nowrap">
                                      <div className="col-auto">
                                        <span className="cart_product">
                                          <img
                                            src={
                                              item?.flavour?._id
                                                ? item?.flavour?.flavourImage
                                                : item?.productId?.productImage
                                            }
                                            alt=""
                                          />
                                        </span>
                                      </div>
                                      <div className="col">
                                        <div className="cart_content ">
                                          <h3 className="fs-5">
                                            {item?.flavour?._id
                                              ? item?.productId?.unitName +
                                                "-" +
                                                item?.flavour?.flavour
                                              : item?.productId?.unitName}
                                          </h3>
                                          <p>
                                            Barcodes:{" "}
                                            {item?.flavour?.barcode.map(
                                              (item) => (
                                                <li>{item},</li>
                                              )
                                            )}
                                          </p>
                                          <span className="ordertext my-2 d-block ">
                                            Ordered On:{" "}
                                            {item?.productId?.createdAt?.slice(
                                              0,
                                              10
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <span className="mx-5">
                                      <input
                                        type="number"
                                        name="price"
                                        defaultValue={item?.quantity}
                                        className="form-control fs-6 w-50 mx-5 bg-light"
                                        onChange={(e) => {
                                          handleChange(index, e);
                                        }}
                                      ></input>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <div>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop65"
                                className="comman_btn2 mx-4 rounded"
                              >
                                Add More
                              </button>
                            </div>
                          </table>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="row mx-0 border rounded pt-4 p-3 position-relative">
                        <span className="small_header">Shipment Details</span>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Buyer Name:</span>
                            <div className="col">
                              <input
                                type="text"
                                defaultValue={orders?.userId?.firstName}
                                className="border p-2 rounded bg-light"
                              />
                              <input
                                type="text"
                                defaultValue={orders?.userId?.lastName}
                                className="border p-2 rounded bg-light"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Email:</span>
                            <div className="col">
                              <input
                                type="email"
                                defaultValue={orders?.userId?.email}
                                className="border p-2 rounded bg-light"
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Mobile Number:</span>
                            <div className="col">
                              <input
                                type="number"
                                defaultValue={orders?.userId?.phoneNumber}
                                className="border p-2 rounded bg-light"
                                name=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Shipment Location:</span>
                            <div className="col">
                              <strong></strong>
                              <input
                                type="text"
                                defaultValue={orders?.userId?.addressLine1}
                                className="border p-2 rounded bg-light"
                              />
                              <input
                                type="text"
                                defaultValue={orders?.userId?.city}
                                className="border p-2 rounded bg-light"
                              />
                              <input
                                type="text"
                                defaultValue={orders?.userId?.state}
                                className="border p-2 rounded bg-light"
                              />
                              <input
                                type="text"
                                defaultValue={orders?.userId?.zipcode}
                                className="border p-2 rounded bg-light"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 my-3 d-flex align-items-stretch">
                          <div className="row view-inner-box border mx-0 w-100">
                            <span>Order Type:</span>
                            <div className="col">
                              <strong>{orders?.type}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <button className="comman_btn ">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade comman_modal"
        id="staticBackdrop65"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Add Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="Modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body shadow">
              <form className="form-design row p-2" action="">
                <div className="form-group col-12  ">
                  <label htmlFor="">Product Name </label>
                  <Select
                    defaultValue=""
                    name="users"
                    options={options}
                    className="basic-multi-select z-3"
                    classNamePrefix="select"
                    onChange={handleChange2}
                    onInputChange={handleInputChange}
                  />
                </div>

                <div className="form-group col-6">
                  <label htmlFor="">Email Address </label>
                  <input
                    type="email"
                    className="form-control-sub border border-secondary"
                    name="Eemail"
                    defaultValue=""
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="EditPass">Sub-Admin Password </label>
                  <input
                    type="password"
                    className="form-control-sub border border-secondary"
                    id="EditPass"
                    defaultValue=""
                    name="Epassword"
                    disabled
                    placeholder="********"
                  />
                </div>
                <div className="form-group mb-0 col-12 text-center ">
                  <button className="comman_btn2">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
