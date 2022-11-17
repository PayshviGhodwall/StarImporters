import React, { useState, KeyboardEventHandler } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { useForm } from "react-hook-form";
import Starlogo from "../../../assets/img/logo.png";
import axios from "axios";
import { useEffect } from "react";
import ProfileBar from "../ProfileBar";
import Swal from "sweetalert2";

const EditInventory = () => {
  const [files, setFiles] = useState([]);
  const [productImage, setProductImage] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [change, setChange] = useState();
  const [Nchnge, setNchnge] = useState();
  const [barcodes, setBarcodes] = useState([]);
  const [productBarcode, setProductBarcode] = useState([]);
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/singleProduct`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/getCategories`;
  const SubCategoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/subCategoryList`;
  const brandsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/getBrands`;
  const uploadImage = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/imageUpload`;
  const [formValues, setFormValues] = useState([
    { productType: [], flavour: [], flavourImage: [], barcode: [] },
  ]);
  const EditProduct =
    "http://ec2-3-210-230-78.compute-1.amazonaws.com:7000/api/admin/inventory/updateProduct";
  const location = useLocation();
  let id = location.state?.id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
 useEffect(()=>{
  GetProducts();

 },[Nchnge])

  useEffect(() => {
    const getBrands = async () => {
      await axios.get(categoryApi).then((res) => {
        setCategories(res?.data.results);
      });
      await axios.get(brandsApi).then((res) => {
        setBrands(res?.data.results);
      });
    };

    getBrands();
  }, [change]);

  
  console.log(formValues , "frm");

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const GetProducts = async () => {
    await axios.get(getProducts + "/" + id).then((res) => {
      setAllProducts([res?.data.results]);
    setFormValues(res?.data.results.type);

    });
  };
  const NewSubCategory = async (e) => {
    let categoryId = e.target.value;
    await axios
      .post(SubCategoryApi, {
        categoryId: categoryId,
      })
      .then((res) => {
        setSubCategories(res?.data.results);
      });
  };

  const productImageSelection = (e) => {
    const formData = new FormData();
    formData.append("productImage", e.target.files[0]);

    axios.post(uploadImage, formData).then((res) => {
      console.log(res?.data.results);
      setProductImage(res?.data.results.productImage);
    });
  };
  const onFileSelection = (e, key) => {
    console.log(e);
    setFiles({ ...files, [key]: e.target.files[0] });
  };
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  const removeTag = (ind, i) => {
    console.log(ind, i);
    let newForm = { ...formValues };
    newForm[i]?.barcode.splice(ind, 1);
    setChange(!change)
  };

  const onSubmit = async (data) => {
    await axios
      .post(EditProduct + "/" + id, {
        unitName: data?.productName,
        category: data?.category,
        subCategory: data?.subCategory,
        pBarcode: data?.pBarcode,
        brand: data?.brands,
        description: data?.desc,
        productImage: productImage,
        type:formValues

      })
      .then((res) => {
        if (res?.data.message == "Successfully Updated") {
          Swal.fire({
            title: "Details Successfully Updated",
            icon: "success",
            button: "Ok",
          });
        }
        setNchnge(Nchnge)
      });
  };

  function handleKeyDown(i, e) {
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setBarcodes([...barcodes, value.replace(/(\r\n|\n|\r)/gm, "")]);
    let newFormValues = { ...formValues };
    newFormValues[i][e.target.name] = [
      ...(formValues[i]?.barcode || []),
      value.replace(/(\r\n|\n|\r)/gm, ""),
    ];
    e.target.value = "";
  }
  const flavourImageSelection = async (e, index) => {
    const formData = new FormData();
    formData.append("flavourImage", e.target.files[0]);

    await axios.post(uploadImage, formData).then((res) => {
      let data = res.data?.results;
      let newFormValues = [...formValues];
      newFormValues[index][e.target.name] = data?.flavourImage;
      setFormValues(newFormValues);
    });
  };
  function handleKeyDown(i, e) {
    // If user did not press enter key, return
    if (e.key !== "Enter") return;
    // Get the value of the input
    const value = e.target.value;
    // If the value is empty, return
    if (!value.trim()) return;
    // Add the value to the tags array
    setBarcodes([...barcodes, value.replace(/(\r\n|\n|\r)/gm, "")]);
    let newFormValues = { ...formValues };
    newFormValues[i][e.target.name] = [
      ...(formValues[i]?.barcode || []),
      value.replace(/(\r\n|\n|\r)/gm, ""),
    ];
    e.target.value = "";
  }

  function ProhandleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setProductBarcode([...productBarcode, value.replace(/(\r\n|\n|\r)/gm, "")]);
    let newBarcode = { ...productBarcode };
    newBarcode[e.target.name] = [
      ...(productBarcode || []),
      value.replace(/(\r\n|\n|\r)/gm, ""),
    ];
    e.target.value = "";
  }

  const proRemoveTag = (ind) => {
    console.log(ind, "jiji");
    (productBarcode || []).splice(ind, 1);
    setChange(!change);
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
                            style={{ height: "200px" }}
                            src={allProducts[0]?.productImage}
                          />
                        </div>
                        <div className="p-image">
                          <i className="  fas fa-camera" />
                          <input
                            className="file-uploadIN"
                            type="file"
                            accept="image/*"
                            name="productImage"
                            onChange={(e) => productImageSelection(e)}
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
                        name="productName"
                        {...register("productName")}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Category</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="category"
                        {...register("category")}
                        onChange={(e) => NewSubCategory(e)}
                      >
                        <option>
                          {allProducts[0]?.category?.categoryName}
                        </option>

                        {categories?.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item?.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Sub Category</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="subCategory"
                        {...register("subCategory")}
                      >
                        <option selected="">
                          {allProducts[0]?.subCategory?.subCategoryName}
                        </option>
                        {(subCategories || []).map((item, index) => (
                          <option value={item.subcategories?._id} key={index}>
                            {item?.subcategories?.subCategoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Barcode</label>
                      <div className="tags-input-container">
                        {/* {(productBarcode || [])?.map((tag, ind) => (
                          <div className="tag-item" key={ind}>
                            <span className="tag-text">{tag}</span>
                            <span
                              className="close"
                              onClick={() => proRemoveTag(ind)}
                            >
                              &times;
                            </span>
                          </div>
                        ))} */}
                        <input
                          type="text"
                          className="tags-input mb-0"
                          defaultValue={allProducts[0]?.pBarcode}
                          name="pBarcode"
                          {...register("pBarcode")}

                          // onKeyDown={(e) => ProhandleKeyDown(e)}
                        />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={allProducts[0]?.description}
                        name="desc"
                        {...register("desc")}
                      />
                    </div>
                    <div className="form-group col-4  ">
                      <label htmlFor="">Brands</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="brands"
                        {...register("brands")}
                      >
                        <option selected="">
                          {allProducts[0]?.brand?.brandName}
                        </option>
                        {(brands || [])?.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item?.brandName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-12 mt-2 mb-4">
                      <form className="">
                        <div className="row flavour_box align-items-end mx-0 py-4 px-3">
                          {(formValues || []).map((item, index) => (
                            <div className="form-group mb-0 col-12" key={index}>
                              <div className="row">
                                <div className="form-group col-3">
                                  <label htmlFor="">Type</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="productType"
                                    defaultValue={item?.productType}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">Flavour</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="flavour"
                                    defaultValue={item?.flavour}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>{" "}
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">Barcode</label>
                                  <div className="tags-input-container">
                                    {(item?.barcode || [])?.map((tag, ind) => (
                                      <div className="tag-item" key={ind}>
                                        <span className="tag-text">{tag}</span>
                                        <span
                                          className="close"
                                          onClick={() => removeTag(ind, index)}
                                        >
                                          &times;
                                        </span>
                                      </div>
                                    ))}

                                    <input
                                      type="text"
                                      className="tags-input mb-0"
                                      name="barcode"
                                      onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group mb-2 col-3 mt-1  position-relative">
                                  <label className="">Flavour Image </label>
                                  <div className="flavourImage position-relative d-inline-block">
                                    <div className="imageSection d-inline-flex">
                                      <img
                                        className="flavour-pic"
                                        style={{ height: "200px" }}
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
                                        onChange={(e) =>
                                          flavourImageSelection(e, index)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                    <div className="form-group mb-0 col-12 text-center mt-2">
                      <button className="comman_btn" onClick={onSubmit}>
                        Save
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
  );
};

export default EditInventory;
