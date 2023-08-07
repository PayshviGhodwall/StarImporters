import axios from "axios";
import { saveAs } from "file-saver";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
import Select from "react-select";
import Swal from "sweetalert2";
import ViewProduct from "../ViewProduct";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderPageData } from "../../../atom";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

export const DaysOption = [
  { value: "SUNDAY", label: "Sunday" },
  { value: "MONDAY", label: "Monday" },
  {
    value: "TUESDAY",
    label: "Tuesday",
  },
  {
    value: "WEDNESDAY",
    label: "Wednesday",
  },
  { value: "THURSDAY", label: "Thursday" },
  { value: "FRIDAY", label: "Friday" },
  { value: "SATURDAY", label: "Saturday" },
];

const Option = (props) => {
  return (
    <div>
      <components.Option {...props} className="d-flex ">
        <input
          type="checkbox"
          className="border border-secondary"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label className="mx-2 mt-1">{props.label}</label>
      </components.Option>
    </div>
  );
};

const OrderReq = () => {
  const orderList = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderList`;
  const quoteList = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/getAllQuotations`;
  const exportAllOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/exportAllOrders`;
  const exportAllQuotes = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/exportAllQuotes`;
  const inventorySearch = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/searchInventory`;
  const UserSearch = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/findUser`;
  const searchOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/searchOrders`;
  const quoteOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/quotations/searchQuotes`;
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/singleProduct`;
  const createOrder = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/createOrder`;
  const getUserDetails = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getUserAddress`;
  const editCities = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/editCity`;
  const viewCities = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/viewCity`;
  const [selectedCity, setSelectedCity] = useState();
  const [selectEditOptions, setSelectEditOptions] = useState([]);
  const [city, setCity] = useState();
  const [orders, setOrders] = useState([]);
  const [quoteReq, setQuoteReq] = useState([]);
  const [sideBar, setSideBar] = useState(true);
  const [addForm, setAddForm] = useState(true);
  const [values, setValues] = useState({ from: "", to: "" });
  const [options, setOptions] = useState([]);
  const [UsersOptions, setUsersOptions] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState({ products: [] });
  const [selectedUser, setSelectedUser] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchUserKey, setSearchUserKey] = useState("");
  const [product, setProducts] = useState({});
  const [addType, setAddType] = useState("");
  const [address, setAddress] = useState("");
  const [maxPage, setMaxPage] = useState(1);
  const pageData = useRecoilValue(orderPageData);
  const setPageData = useSetRecoilState(orderPageData);
  const [activePage, setActivePage] = useState(pageData[0]?.page);
  const apiCities = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getCities`;
  const [cities, setCities] = useState([]);
  const [citySearch, setCitySearch] = useState([]);
  const [formValues, setFormValues] = useState([
    {
      productName: [],
      flavour: [],
      Quantity: [],
    },
  ]);

  const handleChangeEdit = (selected) => {
    setSelectEditOptions({
      optionSelected: selected,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const navigate = useNavigate();
  let User = JSON.parse(localStorage.getItem("AdminData"));

  const fileDownload = (url, name) => {
    saveAs(url, name);
  };

  const getCities = async (state) => {
    const { data } = await axios.get(apiCities);
    if (!data.error) {
      setCities(data?.results.delivery);
    }
  };

  const CitySearch = (val) => {
    setCitySearch(val);
    const query = val;
    var updatedList = [...cities];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item?.city.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setCities(updatedList);
    if(val<=2){
      getCities()
    }
  };
 
  const onSubmitDays = async (data) => {
    const res = await axios.post(editCities + "/" + city, {
      day: (selectEditOptions?.optionSelected || [])?.map(
        (item) => item?.value
      ),
      state: data?.state,
    });
    console.log(res);
    if (!res.data.error) {
      getCities();
      document.getElementById("modalClose1").click();
      Swal.fire({
        title: res?.data.message,
        icon: "success",
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    OrderRequest();
    QuoteRequest();
  }, [activePage]);

  useEffect(() => {
    createOptions();
  }, [searchKey]);

  useEffect(() => {
    createOptionUsers();
  }, [searchUserKey]);

  const OrderRequest = async () => {
    await axios.post(orderList, { page: activePage }).then((res) => {
      setOrders(res?.data.results?.orders);
      setMaxPage(res?.data.results?.toatalPages);
    });
  };
  const QuoteRequest = async () => {
    await axios.post(quoteList).then((res) => {
      setQuoteReq(res?.data.results);
    });
  };

  const createOptions = async () => {
    setActivePage(1);
    await axios
      .post(inventorySearch, {
        search: searchKey,
      })
      .then((res) => {
        if (!res.error) {
          let data = res?.data.results.results;
          // setProducts(data);
          const optionList = data?.map((item, index) => ({
            value: item?._id,
            label: item?.unitName,
          }));
          setOptions(optionList);
        }
      });
  };
  const GetProducts = async (id) => {
    await axios.get(getProducts + "/" + id).then((res) => {
      let data = res?.data.results;
      setProducts((p) => ({ ...p, [id]: data }));
    });
  };

  const handleChange2 = (selected, index) => {
    GetProducts(selected?.value);
    let newFormValues = [...formValues];
    newFormValues[index].productName = selected;
    setFormValues(newFormValues);
  };
  const handleInputChange = (inputValue) => {
    setSearchKey(inputValue);
  };
  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const createOptionUsers = async () => {
    await axios
      .post(UserSearch, {
        search: searchUserKey,
      })
      .then((res) => {
        if (!res.error) {
          let data = res?.data.results.users;
          const optionList = data?.map((item, index) => ({
            value: item?._id,
            label: item?.firstName + "-" + item?.email,
          }));
          setUsersOptions(optionList);
        }
      });
  };
  const handleChangeUser = async (selected) => {
    setSelectedUser({
      userSelected: selected,
    });
    await axios.post(getUserDetails + "/" + selected?.value).then((res) => {
      let data = res?.data.results;
      setAddress(data?.address);
    });
  };
  const handleInputChangeUser = (inputValue) => {
    setSearchUserKey(inputValue);
  };

  const onOrderSearch = async (e) => {
    e.preventDefault();
    await axios
      .post(orderList, {
        from: values.from,
        to: values.to,
        page:1,
      })
      .then((res) => {
        setOrders(res?.data.results?.orders);
      });
  };

  const AddOrder = async (e) => {
    e.preventDefault();
    const dataArray = formValues?.map(function (item) {
      return {
        productId: item?.productName.value,
        quantity: item?.Quantity,
        flavour: JSON.parse(item?.flavour),
      };
    });

    await axios
      .post(createOrder, {
        userId: selectedUser?.userSelected.value,
        type: addType,
        products: dataArray,
        address: address.addressLine1,
      })
      .then((res) => {
        if (!res.error) {
          OrderRequest();
          document.getElementById("Exit").click();
          Swal.fire({
            title: "Order Added Successfully!",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            title: "Please Fill All Details Carefully!",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
  };

  let handleChangeFlavour = (e, i) => {
    let val = e.target.value;
    let newFormValues = [...formValues];
    newFormValues[i].flavour = val;
    setFormValues(newFormValues);
  };
  let handleChangeQuantity = (e, i) => {
    let val = e.target.value;
    let newFormValues = [...formValues];
    newFormValues[i].Quantity = val;
    setFormValues(newFormValues);
  };
  const onQuoteSearch = async (e) => {
    e.preventDefault();
    await axios
      .post(quoteList, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        setQuoteReq(res?.data.results);
      });
  };
  const exportOrder = async (e) => {
    e.preventDefault();
    await axios
      .post(exportAllOrder, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        if (!res?.error) {
          fileDownload(res?.data.results?.file);
        }
      });
  };

  const exporQuotation = async (e) => {
    e.preventDefault();
    await axios
      .post(exportAllQuotes, {
        from: values.from,
        to: values.to,
      })
      .then((res) => {
        if (!res?.error) {
          fileDownload(res?.data.results?.file, "request");
        }
      });
  };

  const OrderSearch = async (e) => {
    setActivePage(1);
    let string = e.target.value;
    string !== ""
      ? await axios
          .post(searchOrder, {
            search: e.target.value,
          })
          .then((res) => {
            if (!res.error) {
              setOrders(res?.data.results.order);
            }
          })
      : OrderRequest();
  };

  const QuoteSearch = async (e) => {
    let string = e.target.value;
    string !== ""
      ? await axios
          .post(quoteOrder, {
            search: e.target.value,
          })
          .then((res) => {
            if (!res.error) {
              setQuoteReq(res?.data.results.quotes);
            }
          })
      : QuoteRequest();
  };

  const addFormFields = (e) => {
    setFormValues([
      ...formValues,
      {
        productName: [],
        flavour: [],
        Quantity: [],
      },
    ]);
  };

  const editDays = async (id) => {
    setCity(id);
    const { data } = await axios.get(viewCities + "/" + id);
    if (!data.error) {
      setSelectedCity(data?.results?.delivery);
      let days = data?.results.delivery.day;
      setSelectEditOptions({
        optionSelected: days?.map((item) => ({
          label: item,
          value: item,
        })),
      });
    }
  };
  console.log(selectedCity);

  const removeFormFields = (index) => {
    let newFormValues = [...formValues];
    newFormValues?.splice(index, 1);
    setFormValues(newFormValues);
  };

  var today = new Date().toISOString().split("T")[0];
  document.getElementById("orderTo")?.setAttribute("max", today);
  document.getElementById("orderFrom")?.setAttribute("max", today);
  document.getElementById("reqFrom")?.setAttribute("max", today);
  document.getElementById("reqTo")?.setAttribute("max", today);

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
              <ul
                className="list-unstyled ps-1 m-0"
                onClick={() => {
                  setPageData([{ page: 1 }]);
                }}>
                <li
                  className={
                    User?.access?.includes("Dashboard") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/AdminDashboard"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "2px" }}
                      className="fa fa-home"></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("User Management") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/UserManage"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-user"></i>{" "}
                    User Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Category Sub-Category Management")
                      ? ""
                      : "d-none"
                  }>
                  <Link
                    className=""
                    to="/CategorySub"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-layer-group"></i>{" "}
                    Category &amp; Sub Category
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Inventory Management")
                      ? ""
                      : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Inventory"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "6px", top: "3px" }}
                      class="far fa-building"></i>{" "}
                    Inventory Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Brands Management") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/brandsManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-ship"></i>{" "}
                    Brands Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Sub-Admin") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>

                <li
                  className={User?.access?.includes("Puller") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Puller-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-users-gear"></i>{" "}
                    Puller Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Gallery Management") ? "" : "d-none"
                  }>
                  <Link
                    className=""
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"></i>{" "}
                    Gallery Management
                  </Link>
                </li>
                <li
                  className={
                    User?.access?.includes("Orders Request") ? "" : "d-none"
                  }>
                  <Link
                    className="bg-white"
                    to="/OrderRequest"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-layer-group"></i>{" "}
                    Order Management
                  </Link>
                </li>
                <li className={User?.access?.includes("CMS") ? "" : "d-none"}>
                  <Link
                    className=""
                    to="/Cms"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-cog"></i>{" "}
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/AdminLogin"
                    onClick={handleClick}
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-sign-out-alt"></i>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul
                className="list-unstyled ps-1 m-0"
                onClick={() => {
                  setPageData([{ page: 1 }]);
                }}>
                <li>
                  <Link
                    className=""
                    to="/AdminDashboard"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "2px" }}
                      className="fa fa-home"></i>{" "}
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/UserManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-user"></i>{" "}
                    User Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/CategorySub"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-layer-group"></i>{" "}
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
                    }}>
                    <i
                      style={{ position: "relative", left: "6px", top: "3px" }}
                      class="far fa-building"></i>{" "}
                    Inventory Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/brandsManage"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-ship"></i>{" "}
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
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-user-cog"></i>{" "}
                    Sub-Admin Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Puller-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-users-gear"></i>{" "}
                    Puller Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Gallery-Management"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fas fa-image"></i>{" "}
                    Gallery Management
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
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-layer-group"></i>{" "}
                    Order Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Cms"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-cog"></i>{" "}
                    Content Management
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/Contact&Support"
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa-solid fa-handshake-angle"></i>{" "}
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link
                    className=""
                    to="/AdminLogin"
                    onClick={handleClick}
                    style={{ textDecoration: "none", fontSize: "18px" }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "3px" }}
                      class="fa fa-sign-out-alt"></i>
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
                    }}>
                    <i
                      style={{ position: "relative", left: "4px", top: "4px" }}
                      className="fa fa-bars"></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
                        console.log(e);
                        setSideBar(!sideBar);
                      }}>
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
            <div className="col-12 text-end mb-4">
              {addForm ? (
                <a
                  className="comman_btn2 text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => setAddForm(!addForm)}>
                  Add Order
                </a>
              ) : (
                <a
                  className="comman_btn2 text-decoration-none"
                  style={{ cursor: "pointer" }}
                  id="Exit"
                  onClick={() => {
                    setAddForm(!addForm);
                  }}>
                  Exit
                </a>
              )}
            </div>
            <div className="row">
              <div
                className={
                  addForm
                    ? "d-none"
                    : "col-12 design_outter_comman  shadow mb-5 "
                }>
                <div className="row comman_header justify-content-between ">
                  <div className="col-auto">
                    <h2>Add New Order</h2>
                  </div>
                  <div className="col-auto">
                    <button
                      className="comman_btn2"
                      onClick={() => navigate("/Inventory/View")}>
                      View Inventory
                    </button>
                  </div>
                </div>

                <form
                  className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                  action=""
                  noValidate>
                  <div className="form-group col-6">
                    <label htmlFor="">Select User</label>
                    <Select
                      name="users"
                      options={UsersOptions}
                      value={selectedUser?.userSelected}
                      className="basic-multi-select z-3"
                      classNamePrefix="select"
                      onChange={handleChangeUser}
                      onInputChange={handleInputChangeUser}
                      isClearable
                      required
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="">Select Delivery Type</label>
                    <select
                      type="text"
                      className="form-select"
                      name="userName"
                      onChange={(e) => {
                        setAddType(e.target.value);
                      }}
                      required>
                      <option>Select Delivery</option>
                      <option value="Shipment">Shipment</option>
                      <option value="Delivery">Delivery</option>
                      <option value="In-Store Pickup">In-Store Pickup</option>
                    </select>
                  </div>

                  <div className="form-group col-12 mt-2 p-1">
                    <form className=" ">
                      <div className="row flavour_box align-items-end mx-0 py-3 px-4">
                        {(formValues || [])?.map((item, index) => (
                          <div className="form-group mb-0 col-12 border rounded p-3 mb-2">
                            <div className="row" key={index}>
                              <div className="form-group col-4">
                                <label htmlFor="">Select Product</label>
                                <Select
                                  name="users"
                                  options={options}
                                  value={item?.productName || ""}
                                  className="basic-multi-select z-3"
                                  classNamePrefix="select"
                                  onChange={(value) =>
                                    handleChange2(value, index)
                                  }
                                  onInputChange={handleInputChange}
                                  isClearable
                                  required
                                />
                              </div>
                              <div className="form-group col-4">
                                <label htmlFor="">Select Flavour</label>
                                <select
                                  type="text"
                                  className="form-select"
                                  name="productName"
                                  value={item?.flavour || ""}
                                  onChange={(value) =>
                                    handleChangeFlavour(value, index)
                                  }
                                  required>
                                  <option selected="" value="">
                                    Select Any Flavour
                                  </option>

                                  {product[
                                    formValues[index]?.productName?.value
                                  ]?.type?.map((item, ind) => (
                                    <option
                                      value={JSON.stringify(item)}
                                      key={ind}>
                                      {item?.flavour}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group mb-0 col-3">
                                <label htmlFor="">Add Quanitity</label>
                                <input
                                  type="number"
                                  className="form-New-select border "
                                  name="flavourPrice"
                                  value={item?.Quantity || ""}
                                  onChange={(e) =>
                                    handleChangeQuantity(e, index)
                                  }
                                  required
                                />
                              </div>

                              <div className="form-group col-1  rmv_btn">
                                <button
                                  className="comman_btn "
                                  type="button"
                                  disabled={
                                    formValues?.length <= 1 ? true : false
                                  }
                                  onClick={() => removeFormFields(index)}>
                                  <i className="fa fa-minus mt-1 mx-1" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="form-group  col-12 text-center mb-3 mb-0">
                          <button
                            className="comman_btn add_btn"
                            type="button"
                            onClick={() => addFormFields()}>
                            <i className="fa fa-plus mt-1 mx-1" /> Add More
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="form-group mb-0 col-12 text-center ">
                    <button
                      className="comman_btn2"
                      type="submit"
                      onClick={AddOrder}>
                      Save Product
                    </button>
                    <button className="comman_btn2 d-none" type="reset">
                      Save Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman  shadow">
                  <div className="row">
                    <div className="col-12 user-management-tabs px-0">
                      <nav>
                        <div
                          className="nav nav-tabs order_tab"
                          id="nav-tab"
                          role="tablist">
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true">
                            Order
                            <span className="circle_count">
                              {orders?.length ? orders?.length : 0}
                            </span>
                          </button>
                          <button
                            className="nav-link"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false">
                            Quotation Request
                            <span className="circle_count">
                              {quoteReq?.length ? quoteReq?.length : 0}
                            </span>
                          </button>
                          <button
                            className="nav-link"
                            id="nav-day-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-day"
                            type="button"
                            role="tab"
                            aria-controls="nav-day"
                            aria-selected="false">
                            Delivery Days
                          </button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab">
                          <div className="row mx-0">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action="">
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">From</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="from"
                                    id="orderFrom"
                                    value={values.from}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">To</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="to"
                                    id="orderTo"
                                    value={values.to}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-1 text-center">
                                  <button
                                    className="comman_btn rounded"
                                    onClick={onOrderSearch}>
                                    Search
                                  </button>
                                </div>
                                <div className="col-2 text-center">
                                  <button
                                    className="comman_btn2 rounded"
                                    onClick={exportOrder}>
                                    Export <i class="fa fa-download"></i>
                                  </button>
                                </div>
                                <div className=" d -flex col-3">
                                  <form className="form-design" action="">
                                    <div className="form-group mb-0 position-relative icons_set">
                                      <input
                                        type="text"
                                        className="form-control bg-white "
                                        placeholder="Search by Order ID/Customer Name"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                          OrderSearch(e);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </form>
                              <div className="row recent_orders_order">
                                {orders?.length ? (
                                  <div className="col-11 d-flex justify-content-between py-2 mx-5">
                                    <span className="totalPage">
                                      ( Total Pages : {maxPage} )
                                    </span>
                                    <ul id="pagination">
                                      <li>
                                        <a
                                          class="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePage <= 1
                                              ? setActivePage(1)
                                              : setActivePage(activePage - 1)
                                          }>
                                          «
                                        </a>
                                      </li>

                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#" className="active">
                                          {activePage ? activePage : 1}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>

                                      <li>
                                        <a
                                          className="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePage === maxPage
                                              ? setActivePage(maxPage)
                                              : setActivePage(activePage + 1)
                                          }>
                                          »
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                ) : null}
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{
                                            backgroundColor: "#f2f2f2",
                                          }}>
                                          <th>Date</th>
                                          <th>Company Name</th>
                                          <th>Mobile Number</th>
                                          <th>Email</th>
                                          <th>Order ID</th>
                                          <th>Status</th>
                                          <th>Order Details</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(orders || [])?.map((item, index) => (
                                          <tr key={index}>
                                            <td>
                                              {moment(
                                                item?.createdAt?.slice(0, 10)
                                              ).format("MM/DD/YYYY")}
                                            </td>
                                            <td>
                                              {item?.userId?.companyName ||
                                                item?.user?.companyName}
                                            </td>
                                            <td>
                                              {item?.userId?.phoneNumber ||
                                                item?.user?.phoneNumber}
                                            </td>
                                            <td>
                                              {item?.userId?.email ||
                                                item?.user?.email}
                                            </td>
                                            <td>{item?.orderId}</td>
                                            <td>{item?.status}</td>
                                            <td>
                                              <button
                                                className="comman_btn table_viewbtn"
                                                onClick={() => {
                                                  setPageData([
                                                    { page: activePage },
                                                  ]);
                                                  navigate(
                                                    `/OrderRequest/ViewOrder/${item?._id}`,
                                                    {
                                                      state: {
                                                        id: item?._id,
                                                      },
                                                    }
                                                  );
                                                }}>
                                                View
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {orders?.length ? (
                                  <div className="col-11 d-flex justify-content-between py-2 mx-5">
                                    <span className="totalPage">
                                      ( Total Pages : {maxPage} )
                                    </span>
                                    <ul id="pagination">
                                      <li>
                                        <a
                                          class="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePage <= 1
                                              ? setActivePage(1)
                                              : setActivePage(activePage - 1)
                                          }>
                                          «
                                        </a>
                                      </li>

                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#" className="active">
                                          {activePage ? activePage : 1}
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>
                                      <li>
                                        <a href="#">.</a>
                                      </li>

                                      <li>
                                        <a
                                          className="fs-5"
                                          href="#"
                                          onClick={() =>
                                            activePage === maxPage
                                              ? setActivePage(maxPage)
                                              : setActivePage(activePage + 1)
                                          }>
                                          »
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-profile"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab">
                          <div className="row mx-0 ">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action="">
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">From</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="from"
                                    id="reqFrom"
                                    value={values.from}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">To</label>
                                  <input
                                    type="date"
                                    className="form-control"
                                    name="to"
                                    id="reqTo"
                                    value={values.to}
                                    onChange={handleDate}
                                  />
                                </div>
                                <div className="form-group mb-0 col-1 text-center">
                                  <button
                                    className="comman_btn rounded"
                                    onClick={onQuoteSearch}>
                                    Search
                                  </button>
                                </div>
                                <div className="col-2 text-center">
                                  <button
                                    className="comman_btn2 rounded"
                                    onClick={exporQuotation}>
                                    Export <i class="fa fa-download"></i>
                                  </button>
                                </div>
                                <div className=" d -flex col-3">
                                  <form className="form-design" action="">
                                    <div className="form-group mb-0 position-relative icons_set">
                                      <input
                                        type="text"
                                        className="form-control bg-white "
                                        placeholder="Search by Quote
                                         ID/Customer Name"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                          QuoteSearch(e);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </form>
                              <div className="row recent_orders_order  ">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{
                                            backgroundColor: "#f2f2f2",
                                          }}>
                                          <th>Date</th>
                                          <th>User Name</th>
                                          <th>Mobile Number</th>
                                          <th>Email</th>
                                          <th>Request Id</th>
                                          <th>Status</th>
                                          <th>QUOTATION REQUEST</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(quoteReq || [])?.map(
                                          (item, index) => (
                                            <tr key={index}>
                                              <td>
                                                {moment(
                                                  item?.createdAt?.slice(0, 10)
                                                ).format("MM/DD/YYYY")}
                                              </td>
                                              <td>
                                                {item?.userId?.firstName ||
                                                  item?.user?.firstName}
                                              </td>
                                              <td>
                                                {item?.userId?.phoneNumber ||
                                                  item?.user?.phoneNumber}
                                              </td>
                                              <td>
                                                {item?.userId?.email ||
                                                  item?.user?.email}
                                              </td>
                                              <td>{item?.quoteId}</td>

                                              <td>{item?.status}</td>
                                              <td>
                                                <button
                                                  className="comman_btn table_viewbtn"
                                                  onClick={() => {
                                                    navigate(
                                                      "/OrderRequest/ViewQuotationRequest",
                                                      {
                                                        state: {
                                                          id: item?._id,
                                                        },
                                                      }
                                                    );
                                                  }}>
                                                  View
                                                </button>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-day"
                          role="tabpanel"
                          aria-labelledby="nav-day-tab">
                          <div className="row mx-0 ">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action="">
                                <div className=" d -flex col-3">
                                  <form className="form-design" action="">
                                    <div className="form-group mb-0 position-relative icons_set">
                                      <input
                                        type="text"
                                        className="form-control bg-white "
                                        placeholder="Search by City"
                                        name="name"
                                        id="name"
                                        onChange={(e) => {
                                          CitySearch(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </form>
                                </div>
                              </form>
                              <div className="row recent_orders_order  ">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{
                                            backgroundColor: "#f2f2f2",
                                          }}>
                                          <th>State</th>
                                          <th>City</th>
                                          <th>Days</th>
                                          <th>Edit</th>
                                        </tr>
                                      </thead>
                                      <tbody key={citySearch}>
                                        {(cities || [])
                                          ?.filter(
                                            (items) =>
                                              items?.state === "GEORGIA"
                                          )
                                          .map((item, index) => (
                                            <tr key={index}>
                                              <td className="border">
                                                {item?.state}
                                              </td>
                                              <td className="border">
                                                {item?.city}
                                              </td>
                                              <td className="border">
                                                {item?.day?.map((itm, ind) => (
                                                  <p>{itm}</p>
                                                ))}
                                              </td>

                                              <td className="border">
                                                <button
                                                  className="comman_btn table_viewbtn"
                                                  data-bs-toggle="modal"
                                                  id="modal-toggle"
                                                  data-bs-target="#staticBackdrop33"
                                                  href="javscript:;"
                                                  onClick={() => {
                                                    editDays(item?._id);
                                                  }}>
                                                  Edit
                                                </button>
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
                      </div>
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
        id="staticBackdropView1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Sub Category
              </h5>
              <button
                type="button"
                className="btn-close"
                id="subCateModal"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body shadow">
              <ViewProduct />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal comman_modal_form forms_modal"
        id="staticBackdrop33"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0  rounded-top">
            <div className="modal-body">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="modalClose1"
                onClick={() => {
                  document.getElementById("resetBtn").click();
                }}
              />

              <div>
                <div className="container">
                  <div className="row justify-content-center p-2">
                    <div className="col-11 text-center mt-2">
                      <form onSubmit={handleSubmit(onSubmitDays)}>
                        <div className="form-floating col-12 mb-4 select_dropdown ">
                          <select
                            className="form-select border border-secondary signup_fields fw-bolder"
                            id="floatingSelect1"
                            aria-label="Floating label select example"
                            name="state"
                            disabled
                            {...register("state", {
                              onChange: (e) => {
                                getCities(e.target.value);
                              },
                            })}>
                            <option value="Georgia" selected="Georgia">
                              Georgia
                            </option>
                          </select>

                          <label
                            htmlFor="floatingSelect6"
                            className="mx-2 fw-bolder">
                            State/Province
                          </label>
                        </div>

                        <div className="form-floating col-12 mb-4 select_dropdown ">
                          <select
                            className="form-select border border-secondary signup_fields fw-bolder"
                            id="floatingSelect1"
                            aria-label="Floating label select example"
                            name="city"
                            disabled
                            {...register("city", {
                              onChange: (e) => {
                                setSelectedCity(e.target.value);
                              },
                            })}>
                            <option value={selectedCity?._id}>
                              {selectedCity?.city}
                            </option>
                          </select>

                          <label
                            htmlFor="floatingSelect6"
                            className="mx-2 fw-bolder">
                            City
                          </label>
                        </div>

                        <div className="form-floating col-12 mb-4 select_dropdown ">
                          <label htmlFor="" className="mx-2 fw-bolder">
                            Day
                          </label>
                          <ReactSelect
                            options={DaysOption}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            components={{
                              Option,
                            }}
                            onChange={handleChangeEdit}
                            allowSelectAll={true}
                            value={selectEditOptions?.optionSelected}
                          />
                          {console.log(selectEditOptions)}
                        </div>
                        <div>
                          <button className="comman_btn2 " type="submit">
                            Save
                          </button>
                          <button
                            className="comman_btn2 d-none"
                            type="reset"
                            id="resetBtn">
                            Reset
                          </button>
                        </div>
                      </form>
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

export default OrderReq;
