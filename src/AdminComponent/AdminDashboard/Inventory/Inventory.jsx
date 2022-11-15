import React, { useState, KeyboardEventHandler } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { useForm } from "react-hook-form";
import Starlogo from "../../../assets/img/logo.png";
import axios from "axios";
import { useEffect } from "react";
import ProfileBar from "../ProfileBar";

const Inventory = () => {
  const [productImage, setProductImage] = useState();
  const [flavourImages, setFlavourImages] = useState([]);
  const [barcodes, setBarcodes] = useState([]);
  const [values, setValues] = useState({ from: "", to: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [change, setChange] = useState();
  const [Index, setIndex] = useState(0);
  const [formValues, setFormValues] = useState([
    { productType: [], flavour: [], flavourImage: [], barcode: [] },
  ]);
  const addProduct = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/addProduct`;
  const getProducts = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/allProducts`;
  const categoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/category/getCategories`;
  const SubCategoryApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/subCategoryList`;
  const brandsApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/brands/getBrands`;
  const uploadImage = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/imageUpload`;

  console.log(formValues);

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
      await axios.get(categoryApi).then((res) => {
        setCategories(res?.data.results);
      });
      await axios.post(SubCategoryApi,{
        category:"Tobacco"
      }).then((res) => {
        setSubCategories(res?.data.results);
      });
      await axios.get(brandsApi).then((res) => {
        setBrands(res?.data.results);
      });
    };

    getBrands();
    GetProducts();
  }, [change,formValues]);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const GetProducts = async () => {
    await axios.post(getProducts).then((res) => {
      setAllProducts(res.data?.results);
    });
  };
  const NewSubCategory =async (e) =>{
    let categoryId = e.target.value
    await axios.post(SubCategoryApi,{
      category:categoryId
    }).then((res) => {
      setSubCategories(res?.data.results);
    });
  }

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = (e) => {
    setFormValues([
      ...formValues,
      { productType: [], flavour: [], flavourImage: [], barcode: [] },
    ]);
  };
  const removeFormFields = (index) => {
    console.log(index - 1);
    let newFormValues = [...formValues];
    newFormValues?.splice(index, 1);
    setFormValues(newFormValues);
  };

  const productImageSelection = (e) => {
    const formData = new FormData();
    formData.append("productImage", e.target.files[0]);

    axios.post(uploadImage, formData).then((res) => {
      console.log(res?.data.results);
      setProductImage(res?.data.results.productImage)
    });
  };
  const flavourImageSelection = async(e,index) => {
    const formData = new FormData();
    formData.append("flavourImage", e.target.files[0]);

   await axios.post(uploadImage, formData).then((res) => {
    let data = res.data?.results
    let newFormValues = [...formValues];
    newFormValues[index][e.target.name] = data?.flavourImage;
    setFormValues(newFormValues);
    
    });
  };
console.log(productImage,flavourImages);
  const onSubmit = async (data) => {
    console.log(data);

    await axios
      .post(addProduct, {
        productImage:productImage,
        unitName: data?.productName,
        category: data?.category,
        quantity: data?.quantity,
        subCategory: data?.subCategory,
        brand: data?.brands,
        type: formValues,
        // barcode: barcode,
        // productType: type,
        // flavour: flavour,
        // flavourImage:"ok",
        description: "hiidifdi",
      })
      .then((res) => {
        console.log(res);
        setChange(!change)
      });
  };
  const onSearch = async (e) => {
    e.preventDefault();
    const res = await axios.post(getProducts, {
      from: values.from,
      to: values.to,
    });
    setAllProducts(res?.data.results);
    return res.data;
  };

  const handleDate = (e) => {
    const value = e.target.value;
    setValues({
      ...values,
      [e.target.name]: value,
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

  const removeTag = (ind, i) => {
    console.log(ind, i);
    let newForm = { ...formValues };
    newForm[i]?.barcode.splice(ind,1)
    setChange(!change)
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
            <div className="col-12 text-end mb-4">
              <a href="javascript:;" className="comman_btn2">
                Import Inventory
              </a>
            </div>
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman shadow mb-4">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Add New Inventory</h2>
                    </div>
                  </div>
                  <form
                    className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-group col-4">
                      <label htmlFor="">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="productName"
                        {...register("productName", {
                          required: "Product Name is Required*",
                        })}
                      />
                    </div>
                    <div className="form-group col-4 choose_fileInvent position-relative">
                      <span>Product Image </span>
                      <label htmlFor="upload_video" className="inputText">
                        <i className="fa fa-camera me-1" />
                        Choose File
                      </label>{" "}
                      <input
                        type="file"
                        className="form-control "
                        defaultValue=""
                        name="productImage"
                        onChange={(e)=> productImageSelection(e)}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Category</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="category"
                        {...register("category", {
                          required: "category is Required*",
                        })}
                        onChange={(e)=> NewSubCategory(e)}
                      >
                        <option selected="">Select Category</option>

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
                        {...register("subCategory", {
                          required: "SubCategory is Required*",
                        })}
                      >
                        <option selected="">Select Sub Category</option>
                        {(subCategories || [])?.map((item, index) => (
                          <option value={item?._id} key={index}>
                            {item.subcategories?.subCategoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        name="quantity"
                        {...register("quantity", {
                          required: "quantity is Required*",
                        })}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label htmlFor="">Brands</label>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="brands"
                        {...register("brands", {
                          required: "Brands is Required*",
                        })}
                      >
                        <option selected="">Select Brands</option>
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
                          {(formValues || [])?.map((element, index) => (
                            <div className="form-group mb-0 col-12">
                              <div className="row" key={index}>
                                <div className="form-group col-2">
                                  <label htmlFor="">Type</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="productType"
                                    defaultValue={element.productType || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>
                                <div className="form-group mb-0 col-2">
                                  <label htmlFor="">Flavour</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="flavour"
                                    defaultValue={element.flavour || ""}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                </div>{" "}
                                <div className="form-group mb-0 col-3">
                                  <label htmlFor="">Barcode</label>
                                  <div className="tags-input-container">
                                    {(formValues[index]?.barcode || [])?.map(
                                      (tag, ind) => (
                                        <div className="tag-item" key={ind}>
                                          <span className="tag-text">
                                            {tag}
                                          </span>
                                          <span
                                            className="close"
                                            onClick={() =>
                                              removeTag(ind, index)
                                            }
                                          >
                                            &times;
                                          </span>
                                        </div>
                                      )
                                    )}

                                    <input
                                      type="text"
                                      className="tags-input mb-0"
                                      placeholder="Enter Barcodes"
                                      name="barcode"
                                      onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group mb-0 col-3 mt-1 choose_fileInvent position-relative">
                                  <span>Flavour Image </span>{" "}
                                  <label
                                    htmlFor="upload_video"
                                    className="inputText"
                                  >
                                    <i className="fa fa-camera me-1" />
                                    Choose File
                                  </label>{" "}
                                  <input
                                    type="file"
                                    className="form-control"
                                    id="flavourImage"
                                    name="flavourImage"
                                    defaultValue={element.flavourImage || ""}
                                    onChange={(e)=> flavourImageSelection(e ,index)}
                                  />
                                </div>
                                {index ? (
                                  <div className="form-group col-2  add_btn">
                                    <button
                                      className="comman_btn "
                                      type="button"
                                      onClick={() => removeFormFields(index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ) : (
                                  <div className="form-group mb-0 col-2 add_btn">
                                    <button
                                      className="comman_btn mb-4"
                                      type="button"
                                      onClick={() => addFormFields(index)}
                                    >
                                      <i className="fa fa-plus mt-1 mx-1" /> Add
                                      More
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </form>
                    </div>
                    <div className="form-group mb-0 col-12 text-center mt-2">
                      <button className="comman_btn" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row comman_header justify-content-between">
                    <div className="col-auto">
                      <h2>Inventory Management</h2>
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
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                            }}
                          />
                          <i className="far fa-search" />
                        </div>
                      </form>
                    </div>
                  </div>
                  <form
                    className="form-design py-4 px-3 help-support-form row align-items-end justify-content-between"
                    action=""
                  >
                    <div className="form-group mb-0 col-5">
                      <label htmlFor="">From</label>
                      <input
                        type="date"
                        className="form-control"
                        name="from"
                        value={values.from}
                        onChange={handleDate}
                      />
                    </div>
                    <div className="form-group mb-0 col-5">
                      <label htmlFor="">To</label>
                      <input
                        type="date"
                        className="form-control"
                        name="to"
                        value={values.to}
                        onChange={handleDate}
                      />
                    </div>
                    <div className="form-group mb-0 col-auto">
                      <button className="comman_btn" onClick={onSearch}>
                        Search
                      </button>
                    </div>
                  </form>
                  <div className="row">
                    <div className="col-12 comman_table_design px-0">
                      <div className="table-responsive">
                        <table className="table mb-0">
                          <thead>
                            <tr>
                              <th>S.No.</th>
                              <th>Date</th>
                              <th>Product Name</th>
                              <th>Product Image</th>
                              <th>Brand</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(allProducts || [])
                              .filter((User) => {
                                if (searchTerm == "") {
                                  return User;
                                } else if (
                                  User?.unitName
                                    .toLowerCase()
                                    .includes(searchTerm?.toLowerCase())
                                ) {
                                  return User;
                                }
                              })
                              .map((User, index) => (
                                <tr key={index} className="">
                                  <td>{index + 1}.</td>
                                  <td>{User?.createdAt.slice(0, 10)}</td>
                                  <td>{User?.unitName}</td>
                                  <td>
                                    <img
                                      width={40}
                                      src={User?.productImage}

                                    />
                                  </td>
                                  <td>{User?.quantity}</td>

                                  <td>
                                    <Link
                                      className="comman_btn2  text-decoration-none"
                                      to={{
                                        pathname: "/Inventory/View-Edit",
                                      }}
                                      state={{ id: User?._id }}
                                      id={index}
                                    >
                                      View
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
  );
};

export default Inventory;
