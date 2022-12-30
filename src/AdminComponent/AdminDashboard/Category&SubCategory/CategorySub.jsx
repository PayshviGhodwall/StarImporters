import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import Starlogo from "../../../assets/img/logo.png";
import profile from "../../../assets/img/profile_img1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import ProfileBar from "../ProfileBar";
import Swal from "sweetalert2";

const CategorySub = () => {
  const addCategory = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/addCategory`;
  const addSubCategory = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/subCategory/addSubCategory`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/getCategories`;
  const SubCategoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/subCategory/getSubCategories`;
  const editCategory = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/editCategory`;
  const editSubCategory = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/subCategory/editSubCategory`;
  const disableCategory = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/categoryStatus`;
  const [sideBar, setSideBar] = useState(true);
  const [change, setChange] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [editCateName, setEditCateName] = useState("");
  const [editSubCateName, setEditSubCateName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [category, setCategory] = useState("");
  const [categoryIndex, setCategoryIndex] = useState();
  const [subCategoryIndex, setSubCategoryIndex] = useState();

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };
  const saveCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryImage", files?.cateImg);
    formData.append("background", files?.background);
    formData.append("categoryName", categoryName.trim());

    await axios.post(addCategory, formData).then((res) => {
      if (res?.data.message === "Category added") {
        setChange(!change);
      } else if (res?.data.message === "Category is already added") {
        Swal.fire({
          title: "Category is already added!",
          icon: "error",
          button: "Ok",
        });
      } else if (res?.data.message === "Please provide category name") {
        Swal.fire({
          title: "Please provide category name",
          icon: "error",
          button: "Ok",
        });
      } else if (res?.data.message === "Please provide category Image") {
        Swal.fire({
          title: "Please provide category Image",
          icon: "error",
          button: "Ok",
        });
      }
    });
  };
  const saveSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subCategoryImage", files?.subCateImg);
    formData.append("subCategoryName", subCategory.trim());
    formData.append("categoryName", category.trim());

    await axios.post(addSubCategory, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Sub Category added") {
        setChange(!change);
      } else if (res?.data.message === "Sub Category is already exist") {
        Swal.fire({
          title: "Sub Category is already added!",
          icon: "error",
          button: "Ok",
        });
      } else if (res?.data.message === "Please provide category name") {
        Swal.fire({
          title: "Please provide category name",
          icon: "error",
          button: "Ok",
        });
      } else if (res?.data.message === "Please provide Sub category name") {
        Swal.fire({
          title: "Please provide Sub category name",
          icon: "error",
          button: "Ok",
        });
      }
    });
  };
  const getCategories = async () => {
    await axios.get(categoryApi).then((res) => {
      setAllCategories(res?.data.results);
    });
  };
  const getSubCategories = async () => {
    await axios.get(SubCategoryApi).then((res) => {
      console.log(res);
      setAllSubCategories(res?.data.results);
    });
  };
  useEffect(() => {
    getCategories();
    getSubCategories();
  }, [change]);
  const EditCategory = (index) => {
    setCategoryId(allCategories[index]?._id);
    setCategoryIndex(index);
  };
  const EditSubCategory = (index) => {
    setSubCategoryId(allSubCategories[index]?._id);
    setSubCategoryIndex(index);
  };

  const onEditSaveCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryImage", files?.newCategoryImg);
    formData.append("background", files?.background);
    formData.append("categoryName", editCateName.trim());
    await axios.post(editCategory + "/" + categoryId, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Modified Successfully") {
        getCategories();
        document.getElementById("cateModal").click();
        setEditCateName("");
        setFiles([]);
      }
    });
  };
  const onEditSaveSubCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subCategoryImage", files?.newSubCategoryImg);
    formData.append("subCategoryName", editSubCateName);
    await axios
      .post(editSubCategory + "/" + subCategoryId, formData)
      .then((res) => {
        console.log(res);
        if (res?.data.message === "Sub Category Modified") {
          setChange(!change);
          document.getElementById("subCateModal").click();
          setEditSubCateName("");
          setFiles([]);
        }
      });
  };

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  const CategoryStatus = async (index) => {
    await axios
      .post(disableCategory + "/" + allCategories[index]?._id)
      .then((res) => {
        setChange(!change);
      });
  };
  const subCategoryStatus = async (index) => {
    // await axios
    //   .post(userStatus + "/" + approvedUsers[index]?._id)
    //   .then((res) => {
    //     console.log(res);
    //   });
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
                  className=" "
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
                  className="bg-white "
                  to="/CategorySub"
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
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
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
                    <i className="fa fa-bars"></i>
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
                  <div className="row">
                    <div className="col-12 user-management-tabs px-0">
                      <nav>
                        <div
                          className="nav nav-tabs"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            Category
                          </button>
                          <button
                            className="nav-link"
                            id="nav-profile-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile"
                            aria-selected="false"
                          >
                            Sub Category
                          </button>
                        </div>
                      </nav>
                      <div className="tab-content" id="nav-tabContent">
                        <div
                          className="tab-pane fade show active"
                          id="nav-home"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <div className="row mx-0">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action=""
                              >
                                <div className="form-group mb-0 col-4">
                                  <label htmlFor="">Category Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="category"
                                    onChange={(e) => {
                                      setCategoryName(e.target.value);
                                    }}
                                  />
                                </div>
                                <div className="form-group mb-0 col choose_fileAdmin position-relative">
                                  <span>Category Image </span>{" "}
                                  <label htmlFor="upload_video">
                                    <i class="fa fa-camera me-1"></i>
                                    Choose File
                                  </label>{" "}
                                  <input
                                    type="file"
                                    className="form-control shadow-none"
                                    defaultValue=""
                                    accept="image/*"
                                    name="cateImg"
                                    id="upload_video"
                                    onChange={(e) =>
                                      onFileSelection(e, "cateImg")
                                    }
                                  />
                                </div>
                                <div className="form-group mb-0 col choose_fileAdmin position-relative">
                                  <span>Category Background </span>{" "}
                                  <label htmlFor="upload_video">
                                    <i class="fa fa-camera me-1"></i>
                                    Choose File
                                  </label>{" "}
                                  <input
                                    type="file"
                                    className="form-control shadow-none"
                                    defaultValue=""
                                    accept="image/*"
                                    name="background"
                                    id="upload_video"
                                    onChange={(e) =>
                                      onFileSelection(e, "background")
                                    }
                                  />
                                </div>
                                <div className="form-group mb-0 col-auto">
                                  <button
                                    className="comman_btn"
                                    onClick={saveCategory}
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                              <div className="row">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{ backgroundColor: "#f2f2f2" }}
                                        >
                                          <th>S.No.</th>
                                          <th>Date</th>
                                          <th>Category Name</th>
                                          <th>Category Image</th>
                                          <th>Background Image</th>
                                          <th>Status</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(allCategories || []).map(
                                          (item, index) => (
                                            <tr className="" key={index}>
                                              <td>{index + 1}</td>
                                              <td>
                                                {item?.updatedAt?.slice(0, 10)}
                                              </td>
                                              <td>{item?.categoryName}</td>

                                              <td>
                                                <img
                                                  width={80}
                                                  src={item?.categoryImage}
                                                ></img>
                                              </td>
                                              <td>
                                                <img
                                                  width={80}
                                                  src={item?.background}
                                                ></img>
                                              </td>
                                              <td>
                                                {" "}
                                                <div className="">
                                                  <label class="switchUser">
                                                    <input
                                                      type="checkbox"
                                                      id={index + 1}
                                                      defaultChecked={
                                                        item?.status
                                                      }
                                                      onClick={() => {
                                                        CategoryStatus(index);
                                                      }}
                                                    />
                                                    <span class="sliderUser round"></span>
                                                  </label>
                                                </div>
                                              </td>

                                              <td>
                                                <Link
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#staticBackdrop"
                                                  className="comman_btn2 text-white text-decoration-none"
                                                  key={index}
                                                  onClick={() => {
                                                    EditCategory(index);
                                                  }}
                                                >
                                                  Edit
                                                </Link>
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
                          id="nav-profile"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          <div className="row mx-0">
                            <div className="col-12">
                              <form
                                className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                                action=""
                              >
                                <div className="form-group col mb-0">
                                  <label htmlFor="">Category</label>
                                  <select
                                    className="form-select form-control"
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                      setCategory(e.target.value);
                                    }}
                                  >
                                    <option selected="">Select Category</option>
                                    {(allCategories || [])?.map(
                                      (item, index) => (
                                        <option key={index} value={item?._id}>
                                          {item?.categoryName}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>
                                <div className="form-group mb-0 col">
                                  <label htmlFor="">Sub Category Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="subCategory"
                                    onChange={(e) => {
                                      setSubCategory(e.target.value);
                                    }}
                                  />
                                </div>

                                <div className="form-group mb-0 col-auto">
                                  <button
                                    className="comman_btn"
                                    onClick={saveSubCategory}
                                  >
                                    Save
                                  </button>
                                </div>
                              </form>
                              <div className="row">
                                <div className="col-12 comman_table_design px-0">
                                  <div className="table-responsive">
                                    <table className="table mb-0">
                                      <thead>
                                        <tr
                                          style={{ backgroundColor: "#f2f2f2" }}
                                        >
                                          <th>S.No.</th>
                                          <th>Date</th>
                                          <th>Category Name</th>
                                          <th>Sub Category Name</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {(allSubCategories || []).map(
                                          (item, index) => (
                                            <tr className="" key={index}>
                                              <td>{index + 1}</td>
                                              <td>
                                                {item?.updatedAt?.slice(0, 10)}
                                              </td>
                                              <td>
                                                {
                                                  item.categoryName
                                                    ?.categoryName
                                                }
                                              </td>
                                              <td>{item?.subCategoryName}</td>

                                              <td>
                                                <Link
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#staticBackdrop2"
                                                  className="comman_btn2 text-white text-decoration-none"
                                                  key={index}
                                                  onClick={() => {
                                                    EditSubCategory(index);
                                                  }}
                                                >
                                                  Edit
                                                </Link>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <div
          className="modal fade comman_modal"
          id="staticBackdrop"
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
                  Edit Category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="cateModal"
                  aria-label="Close"
                  onClick={() => setChange(!change)}
                />
              </div>
              <div className="modal-body">
                <form
                  className="form-design px-3 py-2 help-support-form row align-items-end justify-content-center"
                  action=""
                >
                  <div className="form-group col-6 p-3">
                    <label htmlFor="" className="mx-3">Category Image</label>
                    <div className="account_profile position-relative">
                      <div className="circle" key={categoryIndex}>
                        <img
                          className="profile-pic"
                          width={250}
                          src={allCategories[categoryIndex]?.categoryImage}
                        />
                      </div>
                      <div className="p-image">
                        <i className="uploadFile fa fa-camera" />
                        <input
                          className="file-uploads"
                          type="file"
                          accept="image/*"
                          name="newCategoryImg"
                          onChange={(e) => onFileSelection(e, "newCategoryImg")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-6 p-3">
                    <label htmlFor="" className="mx-3">Background Image</label>
                    <div className="account_profile position-relative ">
                      <div className="circle " key={categoryIndex} >
                        <img
                          className="profile-pic"
                          width={250}
                          src={allCategories[categoryIndex]?.background}
                        />
                      </div>
                      <div className="p-image">
                        <i className="uploadFile fa fa-camera" />
                        <input
                          className="file-uploads"
                          type="file"
                          accept="image/*"
                          name="background"
                          onChange={(e) => onFileSelection(e, "background")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-12" key={categoryIndex}>
                    <label htmlFor="">Category Name</label>
                    <input
                      type="text"
                      defaultValue={allCategories[categoryIndex]?.categoryName}
                      className="form-control"
                      onChange={(e) => {
                        setEditCateName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mb-0 col-auto mt-3">
                    <button className="comman_btn" onClick={onEditSaveCategory}>
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade comman_modal"
          id="staticBackdrop2"
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
                  Edit Sub Category
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  id="subCateModal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setChange(!change)}
                />
              </div>
              <div className="modal-body">
                <form
                  className="form-design px-3 py-2 help-support-form row align-items-end justify-content-center"
                  action=""
                >
                  <div className="form-group col mb-4">
                    <label htmlFor="">Category</label>
                    <select
                      key={subCategoryIndex}
                      className="form-select form-control"
                      aria-label="Default select example"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option selected="">
                        {
                          allSubCategories[subCategoryIndex]?.categoryName
                            ?.categoryName
                        }
                      </option>
                      {(allCategories || [])?.map((item, index) => (
                        <option key={index} value={item?._id}>
                          {item?.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-12" key={subCategoryIndex}>
                    <label htmlFor="">Sub Category Name</label>
                    <input
                      type="text"
                      defaultValue={
                        allSubCategories[subCategoryIndex]?.subCategoryName
                      }
                      className="form-control"
                      onChange={(e) => {
                        setEditSubCateName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group mb-0 col-auto mt-3">
                    <button
                      className="comman_btn"
                      onClick={onEditSaveSubCategory}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default CategorySub;
