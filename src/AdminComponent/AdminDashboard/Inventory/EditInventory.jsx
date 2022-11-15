import React, { useState, KeyboardEventHandler } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { useForm } from "react-hook-form";
import Starlogo from "../../../assets/img/logo.png";
import axios from "axios";
import { useEffect } from "react";
import ProfileBar from "../ProfileBar";

const EditInventory = () => {
  const [files, setFiles] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/singleProduct`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/getCategories`;
  const SubCategoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/subCategory/getSubCategories`;
  const brandsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/getBrands`;
  const EditProduct = ""
  const location = useLocation();
  let id = location.state?.id;
  console.log(id);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  useEffect(() => {
    const getBrands = async () => {
      await axios.get(categoryApi).then((res) => {
        setCategories(res?.data.results);
      });
      await axios.get(SubCategoryApi).then((res) => {
        setSubCategories(res?.data.results);
      });
      await axios.get(brandsApi).then((res) => {
        setBrands(res?.data.results);
      });
    };

    getBrands();
    GetProducts();
  }, []);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const GetProducts = async () => {
    await axios.get(getProducts + "/" + id).then((res) => {
      setAllProducts([res?.data.results]);
    });
  };

  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };

    const onSubmit = async (data) => {
      console.log(data);
      const formData = new FormData();
      formData.append("productImage", files?.productImage);
      formData.append("unitName", data?.productName);
      formData.append("category", data?.category);
      formData.append("quantity", data?.quantity);
      formData.append("subCategory", data?.subCategory);
      formData.append("brand", data?.brands);

      await axios.post(EditProduct, formData).then((res) => {
        console.log(res);
      });
    };

  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };
  return (
    <div className="admin_main">
      <div className="siderbar_section">
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
                  <i className="fa fa-home"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/UserManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-user"></i> User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className="bg-white"
                  to="/Inventory"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                    color: "#3e4093",
                  }}
                >
                  <i class="far fa-building"></i> Inventory Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/brandsManage"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-ship"></i> Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-layer-group"></i> Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-cog"></i> CMS
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/AdminLogin"
                  onClick={handleClick}
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    fontFamily: "'Rubik', sans-serif",
                  }}
                >
                  <i class="fa fa-sign-out-alt"></i>Logout
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
              <a className="sidebar_btn" href="javscript:;">
                <i className="far fa-bars" />
              </a>
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
                      <h2>Edit Inventory</h2>
                    </div>
                  </div>
                  <form
                    className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group col-12 text-center">
                      <label htmlFor="" className="text-center">
                        Product Image
                      </label>
                      <div className="account_profile position-relative d-inline-block">
                        <div className=" d-inline-flex">
                          <img
                            className="profile-pic"
                            style={{height:"200px"}}
                            src={allProducts[0]?.productImage}
                          />
                        </div>
                        <div className="p-image">
                          <i className="  fas fa-camera" />
                          <input
                            className="file-uploadIN"
                            type="file"
                            accept="image/*"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-group col-4">
                      <label htmlFor="">Product Name</label>
                      <input
                        type="text"
                        defaultValue={allProducts[0]?.unitName}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Category</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                      >
                        <option>{allProducts[0]?.category.categoryName}</option>
                        <option selected="" value={1}>
                          Vape
                        </option>
                        <option value={2}>Smoke</option>
                        <option value={3}>Kratom</option>
                        <option value={3}>C-Store</option>
                        <option value={3}>Smoke</option>
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Sub Category</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                      >
                        <option selected="">
                          {allProducts[0]?.subCategory.subCategoryName}
                        </option>
                        <option selected="" value={1}>
                          Blue Kratom
                        </option>
                        <option value={2}>Royal Relex</option>
                        <option value={3}>MIT-45 Kratom</option>
                        <option value={3}>Bliss Kratom</option>
                        <option value={3}>Matrix Kratom</option>
                      </select>
                    </div>
                    <div className="form-group col">
                      <label htmlFor="">Quantity</label>
                      <input
                        type="text"
                        defaultValue={allProducts[0]?.quantity}
                        className="form-control"
                      />
                    </div><div className="form-group col">
                      <label htmlFor="">Barcode</label>
                      <input
                        type="text"
                        defaultValue={allProducts[0]?.quantity}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group col">
                      <label htmlFor="">Brands</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                      >
                        <option>{allProducts[0]?.brand.brandName}</option>
                        <option value={1}>Horizon</option>
                        <option value={2}>Hyde</option>
                        <option value={3}>Monster Vape</option>
                        <option value={3}>Rare</option>
                        <option selected="" value={3}>
                          MIT-45
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-12 mt-2 mb-4">
                      <form className="">
                        <div className="row flavour_box align-items-end mx-0 py-4 px-3">
                          {(allProducts[0]?.type || []).map(
                            (item, index) => (
                              <div
                                className="form-group mb-0 col-12"
                                key={index}
                              >
                                <div className="row">
                                  <div className="form-group col-3">
                                    <label htmlFor="">Type</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="productType"
                                      defaultValue={item?.productType}
                                    />
                                  </div>
                                  <div className="form-group mb-0 col-3">
                                    <label htmlFor="">Flavour</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="flavour"
                                      defaultValue={item?.flavour}
                                    />
                                  </div>{" "}
                                  <div className="form-group mb-0 col-3">
                                    <label htmlFor="">Barcode</label>
                                    <div className="tags-input-container">
                                      {(item?.barcode || [])?.map(
                                        (tag, ind) => (
                                          <div className="tag-item" key={ind}>
                                            <span className="tag-text">
                                              {tag}
                                            </span>
                                            <span
                                              className="close"
                                              // onClick={() =>
                                              //   removeTag(ind, index)
                                              // }
                                            >
                                              &times;
                                            </span>
                                          </div>
                                        )
                                      )}

                                      <input
                                        type="text"
                                        className="tags-input mb-0"
                                        name="barcode"
                                        // onKeyDown={(e) => handleKeyDown(index, e)}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group mb-2 col-3 mt-1  position-relative">
                                    <label className="">Flavour Image </label>
                                    <div className="flavourImage position-relative d-inline-block">
                                      <div className="imageSection d-inline-flex">
                                        <img
                                          className="flavour-pic"
                                          style={{height:"200px"}}
                                          src={item?.flavourImage}
                                        />
                                      </div>
                                      <div className="p-image">
                                        <i className="upload-iconIN fas fa-camera" />
                                        <input
                                          className="file-uploadIN"
                                          type="file"
                                          accept="image/*"
                                          name="flavourImage"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="form-group mb-0 col-12 text-center mt-2">
                      <button className="comman_btn">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInventory;
