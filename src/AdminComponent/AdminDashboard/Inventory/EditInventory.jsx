import React, { useState, KeyboardEventHandler } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { useForm } from "react-hook-form";
import Starlogo from "../../../assets/img/logo.png";
import axios from "axios";
import { useEffect } from "react";
import ProfileBar from "../ProfileBar";
import Swal from "sweetalert2";
import { Toggle } from "rsuite";
import CheckIcon from "@rsuite/icons/Check";
import CloseIcon from "@rsuite/icons/Close";
import { get } from "jquery";

const EditInventory = () => {
  const [files, setFiles] = useState([]);
  const [productImage, setProductImage] = useState();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sideBar, setSideBar] = useState(true);
  const [brands, setBrands] = useState([]);
  const [change, setChange] = useState();
  const [Nchnge, setNchnge] = useState();
  const [barcodes, setBarcodes] = useState([]);
  const [flavourPS, setFlavourPS] = useState();
  const [priceStatus, setPriceStatus] = useState();
  const [productBarcode, setProductBarcode] = useState([]);
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/singleProduct`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/getCategories`;
  const SubCategoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/subCategoryList`;
  const brandsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/getBrands`;
  const uploadImage = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/imageUpload`;
  const flavourPriceApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/flavourPriceStatus`;
  const typeDisable = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/flavourStatus`;
  const productPriceStatus = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/flavourStatus`;
  const deleteImg = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/deleteImage`;
  const deleteFlavourImg = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/deleteImg`;

  const navigate = useNavigate();
  const [formValues, setFormValues] = useState([
    {
      productType: [],
      flavour: [],
      flavourImage: [],
      barcode: [],
      flavourPrice: Number,
    },
  ]);
  const EditProduct = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/updateProduct`;
  const location = useLocation();
  let id = location.state?.id;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();
  useEffect(() => {
    GetProducts();
  }, [Nchnge]);

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

  console.log(formValues, "frm");

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const GetProducts = async () => {
    await axios.get(getProducts + "/" + id).then((res) => {
      setAllProducts([res?.data.results]);
      setFormValues(res?.data.results.type);
      setProductBarcode(res?.data.results?.pBarcode);
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
    setChange(!change);
  };

  const onSubmit = async (data) => {
    await axios
      .post(EditProduct + "/" + id, {
        unitName: data?.productName,
        category: data?.category,
        subCategory: data?.subCategory,
        pBarcode: productBarcode,
        productPrice: data?.productPrice,
        brand: data?.brands,
        description: data?.desc,
        productPriceStatus: data?.productPriceStatus,
        productImage: productImage,
        type: formValues,
      })
      .then((res) => {
        if (res?.data.message == "Successfully Updated") {
          navigate("/Inventory");

          Swal.fire({
            title: "Details Successfully Updated",
            icon: "success",
            button: "Ok",
          });
        }
        if (
          res?.data.message ==
          "Trouble in updating please provide right credential"
        ) {
          Swal.fire({
            title: "Please provide right details",
            icon: "error",
            button: "Ok",
          });
        }

        setNchnge(Nchnge);
      });
  };
  const flavourPriceStatus = async (index) => {
    await axios
      .post(flavourPriceApi + "/" + allProducts[0]?._id, {
        flavourId: allProducts[0].type[index]?._id,
      })
      .then((res) => {
        if (
          res?.data.message === "Flavour Price Status is changed Successfully"
        ) {
          navigate("/Inventory");

          Swal.fire({
            title: "Price Successfully Enabled",
            icon: "success",
            button: "Ok",
          });
        }
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
    if (e.key !== "Tab") return;
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

  const TypeStatus = async (index) => {
    console.log("fdsfd");
    await axios
      .post(typeDisable + "/" + allProducts[0]?._id, {
        flavourId: allProducts[0]?.type[index]?._id,
      })
      .then((res) => {
        if (res.data.message === "Flavour is changed Successfully") {
          navigate("/Inventory");
          Swal.fire({
            title: "Flavour Status Changed!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };

  const addFormFields = (e) => {
    setFormValues([
      ...formValues,
      {
        productType: "",
        flavour: [],
        flavourImage: [],
        barcode: [],
        flavourPrice: "",
        flavourStatus: true,
      },
    ]);
  };
  const deleteImage = async () => {
    await axios
      .post(deleteImg + "/" + id, {
        productImage: true,
      })
      .then((res) => {
        GetProducts();
      });
  };
  const deleteFlavourImage = async (flavourId) => {
    await axios
      .post(deleteImg + "/" + id, {
        flavourId: flavourId,
      })
      .then((res) => {
        GetProducts();
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
                  className=" "
                  to="/AdminDashboard"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
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
                    style={{ position: "relative", left: "4px", top: "4px" }}
                    class="fa fa-user"
                  ></i>{" "}
                  User Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/CategorySub"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Category &amp; Sub Category
                </Link>
              </li>
              <li>
                <Link
                  className="bg-white"
                  to="/Inventory"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",

                    color: "#3e4093",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
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
                    style={{ position: "relative", left: "4px", top: "4px" }}
                    class="fa fa-ship"
                  ></i>{" "}
                  Brands Management
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/OrderRequest"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
                    class="fa fa-layer-group"
                  ></i>{" "}
                  Order request
                </Link>
              </li>
              <li>
                <Link
                  className=""
                  to="/Cms"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
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
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                  }}
                >
                  <i
                    style={{ position: "relative", left: "4px", top: "4px" }}
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
                      {allProducts[0]?.productImage ? (
                        <i
                          class="fa fa-trash mx-2 text-danger "
                          aria-hidden="true"
                          onClick={deleteImage}
                        ></i>
                      ) : null}

                      <div className="account_profile position-relative d-inline-block">
                        <div className=" d-inline-flex">
                          <img
                            className="profile-pic"
                            style={{ height: "200px" }}
                            src={
                              productImage
                                ? productImage
                                : allProducts[0]?.productImage
                            }
                          />
                        </div>
                        <div
                          className="p-image "
                          style={{ right: "-13px", borderRadius: "50px" }}
                        >
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

                    <div className="form-group col-3">
                      <label htmlFor="">Product Name</label>
                      <input
                        type="text"
                        defaultValue={allProducts[0]?.unitName}
                        className="form-control"
                        name="productName"
                        {...register("productName")}
                      />
                    </div>
                    <div className="form-group col-3">
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
                    <div className="form-group col-3">
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

                    <div className="form-group col-3  ">
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
                    <div className="form-group col-lg-12 col-md-10   mt-2 mb-4">
                      <form className="">
                        <div className="row flavour_box align-items-end mx-0 py-4 px-3">
                          {(formValues || []).map((item, index) => (
                            <div
                              className="form-group mb-0 col-lg-12 col-md-12"
                              key={index}
                            >
                              <div className="row">
                                <div className="form-group col-lg-3 col-md-3">
                                  <label htmlFor="">Type</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="productType"
                                    defaultValue={item?.productType}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-0 col-lg-3 col-md-2">
                                  <label htmlFor="">Flavour</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="flavour"
                                    defaultValue={item?.flavour}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>{" "}
                                <div className="form-group col-3">
                                  <label htmlFor="">Size</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="size"
                                    placeholder="Enter size"
                                    defaultValue={item?.size}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="" className="d-flex">
                                    Price:
                                    <Toggle
                                      key={item?.flavourPriceStatus}
                                      size="sm"
                                      className="mx-2"
                                      color="#3e4093"
                                      defaultChecked={item?.flavourPriceStatus}
                                      checkedChildren="enable"
                                      unCheckedChildren="disable"
                                      onChange={() => {
                                        flavourPriceStatus(index);
                                      }}
                                    />
                                  </label>

                                  <input
                                    type="number"
                                    className="form-control"
                                    name="flavourPrice"
                                    placeholder="Enter Price"
                                    defaultValue={item?.flavourPrice}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-0 col-lg-5 col-md-5">
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
                                <div className="form-group col-4">
                                  <label htmlFor="">Description</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="description"
                                    placeholder="Enter Product Description"
                                    defaultValue={item?.description}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-2  col-lg-2 col-md-2 mt-1 ">
                                  <label className="mx-2">Flavour Image</label>

                                  <div className="flavourImage position-relative d-inline-block">
                                    <div className="imageSection d-inline-flex">
                                      {item?.flavourImage?.length ? (
                                        <i
                                          class="fa fa-trash  text-danger "
                                          aria-hidden="true"
                                          onClick={() =>
                                            deleteFlavourImage(item?._id)
                                          }
                                        ></i>
                                      ) : null}

                                      <img
                                        className="flavour-pic"
                                        style={{
                                          height: "200px",
                                          width: "130px",
                                          marginLeft: "0",
                                        }}
                                        src={item?.flavourImage}
                                      />
                                    </div>
                                    <div className="p-image">
                                      <i
                                        style={{
                                          position: "relative",
                                          left: "5px",
                                          top: "1px",
                                          color: "#000",
                                        }}
                                        className=" fas fa-camera"
                                      />

                                      <input
                                        className=""
                                        style={{
                                          pointer: "cursor",
                                          left: "-5px",
                                          position: "relative",
                                          opacity: "10%",
                                        }}
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
                                <div className="form-group mb-2 mt-1 col-lg-1 col-md-1  position-relative">
                                  <label className=""> Status </label>
                                  <div className="">
                                    <label class="switchUser">
                                      <input
                                        type="checkbox"
                                        defaultChecked={item?.flavourStatus}
                                        onClick={() => {
                                          TypeStatus(index);
                                        }}
                                      />
                                      <span class="sliderUser round"></span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>

                    <div className="form-group mb-0 col-12 text-center mt-2">
                      <button
                        className="comman_btn  mx-2"
                        type="button"
                        onClick={() => addFormFields()}
                      >
                        <i className="fa fa-plus mt-1 mx-1" /> Add More Flavours
                      </button>
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
