import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Starlogo from "../../../assets/img/logo.png";
import ProfileBar from "../ProfileBar";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
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
export const colourOptions = [
  { value: "Dashboard", label: "Dashboard" },
  { value: "User Management", label: "User Management" },
  {
    value: "Category Sub-Category Management",
    label: "Category & Sub Category",
  },
  { value: "Brands Maanagement", label: "Brands Management" },
  { value: "Inventory Management", label: "Inventory Management" },
  { value: "Orders Request", label: "Order Request" },
  { value: "CMS", label: "CMS" },
  { value: "None", label: "None" },
  { value: "None", label: "None" },
];

const SubAdmin = () => {
  const [allSubAdmins, setAllSubAdmins] = useState([]);
  const [sideBar, setSideBar] = useState(true);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectEditOptions, setSelectEditOptions] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const addSubAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/addSubAdmin`;
  const SubAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getSubAdmins`;
  const disableAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/disableSubAdmin`;
  const EditAdmin = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/editSubAdmin`;
  let User = JSON.parse(localStorage.getItem("AdminData"));
  const [maxPage, setMaxPage] = useState(1);
  const [SubAdminId, setSubAdminID] = useState();
  const [Edit, setEdit] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getSubAdmins();
  }, []);
  const getSubAdmins = async () => {
    await axios.post(SubAdmin).then((res) => {
      setAllSubAdmins(res?.data.results?.subAdmins);
      setMaxPage(res?.data.results.totalPages);
    });
  };
  const onSubmit = async (data) => {
    console.log(data, selectOptions);
    await axios
      .post(addSubAdmin, {
        fullName: data?.subAdminName?.trim(),
        email: data?.email?.trim(),
        access: (selectOptions.optionSelected || [])?.map(
          (item) => item?.value
        ),
        password: data?.password,
        type: "SubAdmin",
      })
      .then((res) => {
        if (!res.error) {
          getSubAdmins();
          document.getElementById("resetF").click();
          setSelectOptions({ optionSelected: [] });
          Swal.fire({
            title: res?.data?.message,
            text: "",
            icon: "success",
            confirmButtonText: "ok",
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          Swal.fire({
            title: err.response?.data?.message,
            text: "",
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      });
  };
  const onEditSave = async (e) => {
    e.preventDefault();
    console.log(Edit);
    await axios
      .post(EditAdmin + "/" + allSubAdmins[SubAdminId]?._id, {
        fullName: Edit?.name?.trim(),
        email: Edit?.email?.trim(),
        access: (selectEditOptions.optionSelected || [])?.map(
          (item) => item?.value
        ),
        password: Edit?.password,
        type: "SubAdmin",
      })
      .then((res) => {
        if (!res.error) {
          getSubAdmins();
          document.getElementById("Modal").click();
          Swal.fire({
            title: res?.data?.message,
            text: "",
            icon: "success",
            confirmButtonText: "ok",
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          Swal.fire({
            title: err.response?.data?.message,
            text: "",
            icon: "error",
            confirmButtonText: "ok",
          });
        }
      });
  };
  const handleChange = (selected) => {
    setSelectOptions({
      optionSelected: selected,
    });
  };
  const handleChangeEdit = (selected) => {
    setSelectEditOptions({
      optionSelected: selected,
    });
  };
  const SubAdminStatus = async (id) => {
    const { data } = await axios.post(disableAdmin + "/" + id);

    if (!data?.error) {
      getSubAdmins();
      Swal.fire({
        title: " Buyer Status Changed!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };
  const EditSubAdmin = (index) => {
    setSubAdminID(index);
    // setSelectEditOptions(...selectEditOptions, {
    //   optionSelected: (selectEditOptions.optionSelected || [])?.map((item) => ({
    //     label: item?.value,
    //     value: item?.value,
    //   })),
    // });
  };
  const togglePassword = () => {
    let x = document.getElementById("floatingPassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
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
            {User.type === "SubAdmin" ? (
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
                    User?.access?.includes("Brands Maanagement") ? "" : "d-none"
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
                    className="bg-white"
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
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
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}
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
                    className="bg-white"
                    to="/Admin/SubAdmin"
                    style={{
                      textDecoration: "none",
                      fontSize: "18px",
                      color: "#3e4093",
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
                    className=""
                    to="/OrderRequest"
                    style={{ textDecoration: "none", fontSize: "18px" }}
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
                      setSideBar(!sideBar);
                    }}
                  >
                    <i className="fa fa-bars"></i>
                  </h1>
                </div>
              ) : (
                <div>
                  <h3 className="">
                    <button
                      onClick={(e) => {
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
          <div className="row inventory-management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman shadow mb-4">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2> Add Sub-Admin</h2>
                    </div>
                  </div>
                  <form
                    className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group col-4">
                      <label htmlFor="">
                        Sub-Admin Name{" "}
                        {errors.subAdminName && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.subAdminName?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="text"
                        className={classNames(
                          "form-control-sub border border-secondary",
                          {
                            "is-invalid": errors.subAdminName,
                          }
                        )}
                        name="subAdminName"
                        placeholder="Enter Name"
                        {...register("subAdminName", {
                          required: "Admin Name is required!",
                          pattern: {
                            value: /^[^*|\":<>[\]{}`\\()';@"&$]+$/,
                            message: "Special Character not allowed",
                          },
                        })}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Select Module</label>
                      <ReactSelect
                        options={colourOptions}
                        isMulti
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                        components={{
                          Option,
                        }}
                        onChange={handleChange}
                        allowSelectAll={true}
                        value={selectOptions?.optionSelected}
                      />
                    </div>
                    <div
                      className="form-group col-4 
                    "
                    >
                      <label htmlFor="">
                        Email Address{" "}
                        {errors.email && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.email?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="email"
                        className={classNames(
                          "form-control-sub border border-secondary",
                          {
                            "is-invalid": errors.email,
                          }
                        )}
                        name="email"
                        placeholder="Enter Product Name"
                        {...register("email", {
                          required: "Email is required!",
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Invalid email address",
                          },
                        })}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">
                        Sub-Admin Password{" "}
                        {errors.password && (
                          <small className="errorText mx-1 fw-bold">
                            *{errors.password?.message}
                          </small>
                        )}
                      </label>
                      <input
                        type="password"
                        className={classNames(
                          "form-control-sub border border-secondary",
                          {
                            "is-invalid": errors.password,
                          }
                        )}
                        name="password"
                        id="floatingPassword"
                        placeholder="************"
                        {...register("password", {
                          required: "Password is required!",
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters (ex:Starlove12@)",
                          },
                        })}
                      />
                      <span
                        onClick={togglePassword}
                        className="fa fa-fw fa-eye field-icon toggle-password3"
                      />
                    </div>
                    <div className="form-group mb-0 col-12 text-center ">
                      <button className="comman_btn" type="submit">
                        Save Admin
                      </button>
                      <button
                        className="comman_btn d-none"
                        type="reset"
                        id="resetF"
                      >
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Sub-Admin Management</h2>
                    </div>

                    <div className="col-3">
                      <form className="form-design" action="">
                        <div className="form-group mb-0 position-relative icons_set">
                          <input
                            type="text"
                            className="form-control bg-white "
                            placeholder="Search"
                            name="name"
                            id="name"
                            // onChange={(e) => {
                            //   InventSearch(e);
                            // }}
                          />
                          <i className="far fa-search" />
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 comman_table_design px-0">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr style={{ backgroundColor: "#f2f2f2" }}>
                              <th>S.No.</th>
                              <th>Date</th>
                              <th>Sub-Admin Name</th>
                              <th className="text-center mx-3">Modules</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(allSubAdmins || [])?.map((item, index) => (
                              <tr key={index} className="border ">
                                <td className="border">
                                  {(activePage - 1) * 20 + (index + 1)}.
                                </td>
                                <td className="border">
                                  {item?.createdAt?.slice(1, 10)}
                                </td>
                                <td className="border">{item?.fullName}</td>
                                <td className=" border ">
                                  <ol>
                                    {item?.access?.map((li, ind) => (
                                      <li key={ind}>{li}</li>
                                    ))}
                                  </ol>
                                </td>

                                <td className=" border">
                                  {" "}
                                  <div className="">
                                    <label class="switchUser">
                                      <input
                                        type="checkbox"
                                        id={index + 1}
                                        defaultChecked={item?.status}
                                        onClick={() => {
                                          SubAdminStatus(item?._id);
                                        }}
                                      />
                                      <span class="sliderUser round"></span>
                                    </label>
                                  </div>
                                </td>

                                <td>
                                  <Link
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropAdmin"
                                    className="comman_btn2 text-white text-decoration-none"
                                    key={index}
                                    onClick={() => {
                                      EditSubAdmin(index);
                                    }}
                                  >
                                    Edit
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                              }
                            >
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
                              {activePage}
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
                              }
                            >
                              »
                            </a>
                          </li>
                        </ul>
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
        id="staticBackdropAdmin"
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
                Edit Sub-Admin
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="Modal"
                aria-label="Close"
                onClick={() => getSubAdmins()}
              />
            </div>
            <div className="modal-body shadow">
              <form className="form-design row p-2" action="">
                <div className="form-group col-6 w-50 ">
                  <label htmlFor="">Sub-Admin Name </label>
                  <input
                    type="text"
                    className="form-control-sub border border-secondary"
                    name="EsubAdminName"
                    defaultValue={allSubAdmins[SubAdminId]?.fullName}
                    placeholder="Enter Name"
                    onChange={(e) => setEdit({ name: e.target.value })}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Select Module</label>
                  <ReactSelect
                    options={colourOptions}
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
                </div>
                <div className="form-group col-6">
                  <label htmlFor="">Email Address </label>
                  <input
                    type="email"
                    className="form-control-sub border border-secondary"
                    name="Eemail"
                    defaultValue={allSubAdmins[SubAdminId]?.email}
                    placeholder="Enter Product Name"
                    onChange={(e) => setEdit({ email: e.target.value })}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="EditPass">Sub-Admin Password </label>
                  <input
                    type="password"
                    className="form-control-sub border border-secondary"
                    id="EditPass"
                    defaultValue={allSubAdmins[SubAdminId]?.password}
                    name="Epassword"
                    disabled
                    placeholder="********"
                    onChange={(e) => setEdit({ password: e.target.value })}
                  />
                </div>
                <div className="form-group mb-0 col-12 text-center ">
                  <button className="comman_btn2" onClick={onEditSave}>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdmin;