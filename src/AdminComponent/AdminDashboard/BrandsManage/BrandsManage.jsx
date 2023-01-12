import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import profile from "../../../assets/img/profile_img1.png";
import { useForm } from "react-hook-form";
import Starlogo from "../../../assets/img/logo.png";
import { useState } from "react";
import axios from "axios";
import ProfileBar from "../ProfileBar";
import Swal from "sweetalert2";
import { Button } from "rsuite";

const BrandsManage = () => {
  const brandsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/getBrands`;
  const editBrands = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/editBrand`;
  const addBrands = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/addBrand`;
  const [searchTerm, setSearchTerm] = useState("");
  const [change, setChange] = useState("");
  const [allBrands, setAllBrands] = useState([]);
  const [brandName, setBrandName] = useState();
  const [brandId, setBrandId] = useState();
  const [files, setFiles] = useState([]);
  const [editBrandName, setEditBrandsName] = useState();
  const [sideBar, setSideBar] = useState(true);
  const [loader, setLoader] = useState(false);

  const [Index, setIndex] = useState();
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  useEffect(() => {
    const getBrands = async () => {
      await axios.get(brandsApi).then((res) => {
        setAllBrands(res?.data.results);

        return res.data;
      });
    };

    getBrands();
  }, [change]);

  console.log(allBrands[Index]?.brandName);
  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const saveBrands = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("brandImage", files?.brandImg);
    formData.append("brandName", brandName.trim());

    await axios.post(addBrands, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Brand Added Successfully") {
        document.getElementById("resetBrand").click();
        setChange(!change);
      }
      if (res?.data.message === "Invalid Image format") {
        Swal.fire({
          title: "Invalid Image format!",
          icon: "warning",
          confirmButtonText: "ok",
        });
        document.getElementById("resetSubCat").click();
      }
      if (res?.data.message === "Please provide brand name") {
        setLoader(false);
        Swal.fire({
          title: "Please provide brand name",
          icon: "error",
          focusConfirm: false,
        });
      }
      if (res?.data.message === "Error in adding brand") {
        setLoader(false)
        Swal.fire({
          title: "Error in adding brand",
          icon: "error",
          focusConfirm: false,
        });
      }
    }).catch((error)=>{
      if(error){
        Swal.fire({
          title: "Error in adding brand",
          icon: "error",
          focusConfirm: false,
        });
      }
    })
  };

  const EditBrands = (index) => {
    setBrandId(allBrands[index]?._id);
    setIndex(index);
    let defalutValues = {};
    defalutValues.BrandName = allBrands[index]?.brandName;
    defalutValues.brandImage = allBrands[index]?.brandImage;

    reset({ ...defalutValues });
  };
  console.log(files?.newBrandImg, editBrandName);

  const onSubmit = async (data) => {
    setLoader(true)
    const formData = new FormData();
    formData.append("brandImage", files?.newBrandImg);
    formData.append("brandName", data.BrandName);
    await axios.post(editBrands + "/" + brandId, formData).then((res) => {
      console.log(res);
      if (res?.data.message === "Modified Successfullt") {
        window.location.reload();
        setChange(!change);
        setLoader(false)
      }
      if (res?.data.message === "Invalid Image format") {
        setLoader(false);
        Swal.fire({
          title: "Invalid Image format!",
          icon: "warning",
          confirmButtonText: "ok",
        });
        document.getElementById("resetSubCat").click();
      }
    });
  };
  document.getElementById("brandUp")?.addEventListener("change", function () {
    if (this.files[0]) {
      var picture = new FileReader();
      picture.readAsDataURL(this.files[0]);
      picture.addEventListener("load", function (event) {
        document
          .getElementById("brandImg")
          .setAttribute("src", event.target.result);
      });
    }
  });
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
                  className="bg-white"
                  to="/brandsManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "#3e4093",
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
          <div className="col-12 design_outter_comman recent_orders shadow">
            <div className="row comman_header justify-content-between">
              <div className="col-auto">
                <h2 className="main_headers">Brands Management</h2>
              </div>
              <div className="col-3">
                <form className="form-design" action="">
                  <div className="form-group mb-0 position-relative icons_set">
                    <input
                      type="text"
                      className="form-control bg-white"
                      placeholder="Search"
                      name="name"
                      id="name"
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="row category_management justify-content-center">
              <div className="col-12">
                <div className="row mx-0">
                  <div className="col-12 design_outter_comman recent_orders shadow">
                    <div className="row">
                      <div className="col-12 user-management-tabs px-0">
                        <div className="row mx-0">
                          <div className="col-12">
                            <form
                              className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                              action=""
                            >
                              <div className="form-group mb-0 col-5">
                                <label htmlFor="">Brand Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Brand"
                                  onChange={(e) => {
                                    setBrandName(e.target.value);
                                  }}
                                />
                              </div>
                              <div className="form-group mb-0 col choose_fileAdmin position-relative">
                                <span>Brand Image </span>{" "}
                                <label htmlFor="upload_video">
                                  <i class="fa fa-camera me-1"></i>
                                  Choose File
                                </label>{" "}
                                <input
                                  type="file"
                                  className="form-control "
                                  defaultValue=""
                                  accept="image/*"
                                  name="brandImg"
                                  id="upload_video"
                                  onChange={(e) =>
                                    onFileSelection(e, "brandImg")
                                  }
                                />
                              </div>
                              <div className="form-group mb-0 col-auto">
                                <Button
                                  loading={loader}
                                  appearance="primary"
                                  style={{
                                    backgroundColor: "#eb3237",
                                    fontSize: "20px",
                                    position: "relative",
                                    top: "-2px",
                                  }}
                                  className="comman_btn"
                                  onClick={saveBrands}
                                >
                                  Save
                                </Button>
                                <button
                                  className="comman_btn d-none"
                                  id="resetBrand"
                                  type="reset"
                                >
                                  Reset
                                </button>
                              </div>
                            </form>
                            <div className="row">
                              <div className="col-12 comman_table_design px-0 ">
                                <div className="table-responsive">
                                  <table className="table mb-0">
                                    <thead>
                                      <tr
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        <th>S.No.</th>
                                        <th>Date</th>
                                        <th>Brand Name</th>
                                        <th>Media</th>
                                        <th>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {(allBrands || [])
                                        .filter((item) => {
                                          if (searchTerm == "") {
                                            return item;
                                          } else if (
                                            item?.brandName
                                              .toLowerCase()
                                              .includes(
                                                searchTerm.toLowerCase()
                                              )
                                          ) {
                                            return item;
                                          }
                                        })
                                        .map((item, index) => (
                                          <tr className="" key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                              {item?.updatedAt.slice(0, 10)}
                                            </td>
                                            <td>{item?.brandName}</td>
                                            <td>
                                              <img
                                                width={50}
                                                src={item?.brandImage}
                                              ></img>
                                            </td>

                                            <td>
                                              <Link
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop "
                                                className="comman_btn2 text-white text-decoration-none"
                                                key={index}
                                                onClick={() => {
                                                  EditBrands(index);
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
                Edit Brand
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design px-3 py-2 help-support-form row align-items-end justify-content-center"
                action=""
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group col-auto">
                  <label htmlFor="">brand Image</label>
                  <div className="account_profile position-relative">
                    <div className="circle">
                      <img
                        className="profile-pic"
                        id="brandImg"
                        width={250}
                        src={allBrands[Index]?.brandImage}
                      />
                    </div>
                    <div className="p-image">
                      <i className="uploadFile fa fa-camera" />
                      <input
                        className="file-uploads"
                        type="file"
                        id="brandUp"
                        accept="image/*"
                        name="newBrandImg"
                        {...register("newBrandImg")}
                        onChange={(e) => onFileSelection(e, "newBrandImg")}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="">Brand Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="BrandName"
                    {...register("BrandName")}
                  />
                </div>
                <div className="form-group mb-0 col-auto mt-3">
                  <Button
                   loading={loader}
                   appearance="primary"
                   style={{
                     backgroundColor: "#eb3237",
                     fontSize: "20px",
                     position: "relative",
                     top: "-2px",
                   }}
                  className="comman_btn" type="submit">
                    Save
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsManage;
