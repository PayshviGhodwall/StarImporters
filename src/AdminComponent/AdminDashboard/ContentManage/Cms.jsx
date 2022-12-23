import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML, convertFromHTML } from "draft-convert";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Starlogo from "../../../assets/img/logo.png";
import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ProfileBar from "../ProfileBar";
import Swal from "sweetalert2";
import DOMPurify from "dompurify";
const Cms = () => {
  const [sideBar, setSideBar] = useState(true);
  const [change, setChange] = useState(false);
  const [productImage, setProductImage] = useState();
  const [disabled, setDisabled] = useState(true);
  const [Tdisabled, setTDisabled] = useState(true);
  const [Pdisabled, setPDisabled] = useState(true);
  const [aboutHidden, setAboutHidden] = useState(true);
  const [termsHidden, setTermsHidden] = useState(true);
  const [privacyHidden, setPrivacyHidden] = useState(true);
  const [slideData, setSlideData] = useState([]);
  const [files, setFiles] = useState([]);
  const [aboutUs, setAboutUs] = useState("");
  const [terms, setTerms] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [editedAbout, setEditedAbout] = useState("");
  const [editedTerms, setEditedTerms] = useState("");
  const [editedPrivacy, setEditedPrivacy] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const AllSlides = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/getAllSlides`;
  const EditSlide = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/editSlide`;
  const AddSlide = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/addSlide`;
  const DeleteSlide = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/deleteSlide`;
  const getAbout = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/aboutus`;
  const getTerms = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/TAndC`;
  const getPrivacy = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/privacyPolicy`;
  const editAboutUs = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editAbout`;
  const editTerms = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editTnC`;
  const editPrivacy = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editPrivacyPolicy`;
  const uploadImage = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/inventory/imageUpload`;
  const { register, handleSubmit, reset } = useForm();

  const [editorTitleState, setTitleEditorState] = useState(null);
  const [editorDescState, setDescEditorState] = useState(null);
  const [editorTitle2State, setTitle2EditorState] = useState(null);
  const [editorDesc2State, setDesc2EditorState] = useState(null);
  const [editorTitle3State, setTitle3EditorState] = useState(null);
  const [editorDesc3State, setDesc3EditorState] = useState(null);

  const [editorHomeCTstate, setEditorHomeCTstate] = useState(null);
  const [editorHomeFPstate, setEditorHomeFPstate] = useState(null);
  const [editorHomePBstate, setEditorHomePBstate] = useState(null);

  const onEditorTitleStateChange = async (editorTitleState) => {
    await setTitleEditorState(editorTitleState);
  };
  const onEditorDescStateChange = async (editorDescState) => {
    await setDescEditorState(editorDescState);
  };
  const onEditorTitle2StateChange = async (editorTitle2State) => {
    await setTitle2EditorState(editorTitle2State);
  };
  const onEditorDesc2StateChange = async (editorDesc2State) => {
    await setDesc2EditorState(editorDesc2State);
  };
  const onEditorTitle3StateChange = async (editorTitle3State) => {
    await setTitle3EditorState(editorTitle3State);
  };
  const onEditorDesc3StateChange = async (editorDesc3State) => {
    await setDesc3EditorState(editorDesc3State);
  };
  const getSlides = async () => {
    await axios.get(AllSlides).then((res) => {
      console.log(res?.data.results);
      setSlideData(res?.data.results);
      let results = res?.data.results;
      let defalutValues = {};
      defalutValues.slides = results[0]?.banner;
      defalutValues.slideTitle = results[0]?.title;
      defalutValues.slideDesc = results[0]?.description;
      defalutValues.slides = results[1]?.banner;
      defalutValues.slide2Title = results[1]?.title;
      defalutValues.slide2Desc = results[1]?.description;
      defalutValues.slide3Title = results[2]?.title;
      defalutValues.slide3Desc = results[2]?.description;

      reset({ ...defalutValues });
      const contentTtState = stateFromHTML(JSON.parse(results[0]?.title));
      const contentDsState = stateFromHTML(JSON.parse(results[0]?.description));

      const contentTt2State = stateFromHTML(JSON.parse(results[1]?.title));
      const contentDs2State = stateFromHTML(
        JSON.parse(results[1]?.description)
      );

      const contentTt3State = stateFromHTML(JSON.parse(results[2]?.title));
      const contentDs3State = stateFromHTML(
        JSON.parse(results[2]?.description)
      );
      console.log(contentTtState);

      setTitleEditorState(EditorState.createWithContent(contentTtState));
      setDescEditorState(EditorState.createWithContent(contentDsState));
      setTitle2EditorState(EditorState.createWithContent(contentTt2State));
      setDesc2EditorState(EditorState.createWithContent(contentDs2State));
      setTitle3EditorState(EditorState.createWithContent(contentTt3State));
      setDesc3EditorState(EditorState.createWithContent(contentDs3State));
    });
  };

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
    setSelectedFile(e.target.files[0]);
    // const formData = new FormData();
    // formData.append("productImage", e.target.files[0]);

    // axios.post(uploadImage, formData).then((res) => {
    //   console.log(res?.data.results);
    //   setProductImage(res?.data.results?.productImage);
    // });
  };
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  useEffect(() => {
    getSlides();
    getAboutUs();
    getTermsCondition();
    getPrivacyPolicy();
  }, [change]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const contentPosition = (e) => {
    console.log(e.target.value);
  };
  const contentPosition2 = (e) => {
    console.log(e.target.value);
  };
  const contentPosition3 = (e) => {
    console.log(e.target.value);
  };
  const onSubmitSecond = async (data) => {
    let title = await JSON.stringify(
      stateToHTML(editorTitle2State.getCurrentContent())
    );
    let Desc = await JSON.stringify(
      stateToHTML(editorDesc2State.getCurrentContent())
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", Desc);
    formData.append("banner", files?.slide2Img);
    await axios
      .post(EditSlide + "/" + slideData[1]?._id, formData)
      .then((res) => {
        console.log(res);
        if (res?.data.message === "Slide Modified Successfully") {
          getSlides();
          Swal.fire({
            title: "Slide Modified!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };
  const onSubmitThird = async (data) => {
    let title = await JSON.stringify(
      stateToHTML(editorTitle3State.getCurrentContent())
    );
    let Desc = await JSON.stringify(
      stateToHTML(editorDesc3State.getCurrentContent())
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", Desc);
    formData.append("banner", files?.slide3Img);
    await axios
      .post(EditSlide + "/" + slideData[2]?._id, formData)
      .then((res) => {
        console.log(res);
        if (res?.data.message === "Slide Modified Successfully") {
          getSlides();
          Swal.fire({
            title: "Slide Modified",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };
  const onSubmit = async (data) => {
    let title = await stateToHTML(editorTitleState.getCurrentContent());
    let Desc = await JSON.stringify(
      stateToHTML(editorDescState.getCurrentContent())
    );

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", Desc);
    formData.append("banner", files?.slide1Img);
    await axios
      .post(EditSlide + "/" + slideData[0]?._id, formData)
      .then((res) => {
        if (!res.error) {
          getSlides();
          Swal.fire({
            title: "Slide Modified!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };

  const getAboutUs = async () => {
    await axios.get(getAbout).then((res) => {
      setAboutUs(res?.data.results[0].description);
    });
  };
  const getPrivacyPolicy = async () => {
    await axios.get(getPrivacy).then((res) => {
      setPrivacy(res?.data.results[0].description);
    });
  };
  const getTermsCondition = async () => {
    await axios.get(getTerms).then((res) => {
      setTerms(res?.data.results[0].description);
    });
  };
  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };

  const onEdit = (e) => {
    e.preventDefault();
    setDisabled(!disabled);
    setAboutHidden(!aboutHidden);
  };
  const onTermEdit = (e) => {
    e.preventDefault();
    setTDisabled(!Tdisabled);
    setTermsHidden(!termsHidden);
  };
  const onPrivacyEdit = (e) => {
    e.preventDefault();
    setPDisabled(!Pdisabled);
    setPrivacyHidden(!privacyHidden);
  };
  const onSaveAbout = async (e) => {
    await axios
      .post(editAboutUs, {
        description: editedAbout,
      })
      .then((res) => {
        if ((res.data.message = '"About Us" added successfully')) {
          console.log("okk");
          setDisabled(true);
          setAboutHidden(true);
        }
      });
  };
  const onSaveTerms = async (e) => {
    await axios
      .post(editTerms, {
        description: editedTerms,
      })
      .then((res) => {
        if ((res.data.message = '"About Us" added successfully')) {
          console.log("okk");
          setTDisabled(true);
          setTermsHidden(true);
        }
      });
  };

  const onSavePrivacy = async (e) => {
    await axios
      .post(editPrivacy, {
        description: editedPrivacy,
      })
      .then((res) => {
        if ((res.data.message = '"Privacy Policy" Modified Successfully')) {
          setPDisabled(true);
          setPrivacyHidden(true);
        }
      });
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
                  className="bg-white"
                  to="/Cms"
                  style={{
                    textDecoration: "none",
                    fontSize: "18px",
                    color: "#3e4093",
                  }}
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
          <div className="row cms_management justify-content-center">
            <div className="col-12">
              <div className="row mx-0">
                <div className="col-12 design_outter_comman recent_orders shadow">
                  <div className="row">
                    <div className="col-12 user-management-cms px-0">
                      <nav>
                        <div
                          className="nav nav-tabs "
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className="nav-link active labels"
                            id="nav-home-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-home"
                            type="button"
                            role="tab"
                            aria-controls="nav-home"
                            aria-selected="true"
                          >
                            Home Slides
                          </button>
                          <button
                            className="nav-link labels"
                            id="nav-homeBann-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-homeBann"
                            type="button"
                            role="tab"
                            aria-controls="nav-homeBann"
                            aria-selected="true"
                          >
                            Home Title/Banners
                          </button>
                          <button
                            className="nav-link labels"
                            id="nav-profile1-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile1"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile1"
                            aria-selected="false"
                          >
                            About Us
                          </button>
                          <button
                            className="nav-link labels"
                            id="nav-profile2-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile2"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile2"
                            aria-selected="false"
                          >
                            T&amp;C
                          </button>
                          <button
                            className="nav-link labels"
                            id="nav-profile3-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#nav-profile3"
                            type="button"
                            role="tab"
                            aria-controls="nav-profile3"
                            aria-selected="false"
                          >
                            Privacy Policy
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
                          <div className="row mx-0 cms_home_banner">
                            <div className="col-12 p-4">
                              <ul
                                className="nav nav-tabs mb-4 bg-white"
                                id="myTab"
                                role="tablist"
                              >
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link active labels"
                                    id="home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#home"
                                    type="button"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                  >
                                    {slideData[0]?.slide}
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link labels"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                  >
                                    {slideData[1]?.slide}
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link labels"
                                    id="contact-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#contact"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact"
                                    aria-selected="false"
                                  >
                                    {slideData[2]?.slide}
                                  </button>
                                </li>
                              </ul>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="home"
                                  role="tabpanel"
                                  aria-labelledby="home-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmit)}
                                      >
                                        <div className="form-group col-12 ">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            Content Position :{" "}
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="1"
                                                onChange={contentPosition}
                                                defaultChecked
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault1"
                                              >
                                                Align Left
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="2"
                                                onChange={contentPosition}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Center
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="3"
                                                onChange={contentPosition}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Right
                                              </label>
                                            </div>
                                          </label>

                                          <label htmlFor="" className="labels">
                                            Slide Image
                                          </label>

                                          <div className="account_profile position-relative d-inline-block">
                                            <div className="cmsSlide">
                                              <img
                                                className="SlideCms"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[0]?.banner
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                type="file"
                                                name="slide1Img"
                                                accept="image/*"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide1Img"
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>

                                        <div className="form-group col-12">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            TITLE :
                                          </label>
                                          <Editor
                                            editorState={editorTitleState}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitleStateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDescState}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDescStateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12 text-start">
                                          <button
                                            className="comman_btn"
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="profile"
                                  role="tabpanel"
                                  aria-labelledby="profile-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmitSecond)}
                                      >
                                        <div className="form-group col-12 ">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            Content Position :{" "}
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="1"
                                                onChange={contentPosition2}
                                                defaultChecked
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault1"
                                              >
                                                Align Left
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="2"
                                                onChange={contentPosition2}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Center
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="3"
                                                onChange={contentPosition2}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Right
                                              </label>
                                            </div>
                                          </label>

                                          <label htmlFor="" className="labels">
                                            Slide Image
                                          </label>
                                          <div className="account_profile position-relative d-inline-block">
                                            <div className="cmsSlide">
                                              <img
                                                className="SlideCms"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[1]?.banner
                                                }
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className=" fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                name="slide2Img"
                                                type="file"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide2Img"
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group col-12">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            TITLE :
                                          </label>
                                          <Editor
                                            editorState={editorTitle2State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitle2StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDesc2State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDesc2StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12 text-start">
                                          <button
                                            className="comman_btn  text-decoration-none"
                                            type="submit"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="contact"
                                  role="tabpanel"
                                  aria-labelledby="contact-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmitThird)}
                                      >
                                        <div className="form-group col-12 ">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            Content Position :{" "}
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                value="1"
                                                onChange={contentPosition3}
                                                defaultChecked
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault1"
                                              >
                                                Align Left
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="2"
                                                onChange={contentPosition3}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Center
                                              </label>
                                            </div>
                                            <div class="form-check mx-2 fs-6 mt-1">
                                              <input
                                                class="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault2"
                                                value="3"
                                                onChange={contentPosition3}
                                              />
                                              <label
                                                class="form-check-label"
                                                for="flexRadioDefault2"
                                              >
                                                Align Right
                                              </label>
                                            </div>
                                          </label>

                                          <label htmlFor="" className="labels">
                                            Slide Image
                                          </label>
                                          <div className="account_profile position-relative d-inline-block">
                                            <div className="cmsSlide">
                                              <img
                                                className="SlideCms"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[2]?.banner
                                                }
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                name="slide3Img"
                                                type="file"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide3Img"
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>
                                        </div>
                                        <div className="form-group col-12">
                                          <label
                                            htmlFor=""
                                            className="labels d-flex"
                                          >
                                            TITLE :
                                          </label>
                                          <Editor
                                            editorState={editorTitle3State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitle3StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDesc3State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDesc3StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                "fontSize",
                                                "fontFamily",
                                                "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12 text-start">
                                          <button
                                            className="comman_btn  text-decoration-none"
                                            type="submit"
                                          >
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
                        <div
                          className="tab-pane fade"
                          id="nav-homeBann"
                          role="tabpanel"
                          aria-labelledby="nav-homeBann-tab"
                        >
                          <div className="row py-5 px-4 mx-0">
                            <div className="col-12">
                              <div className="account_profile position-relative d-inline-block">
                                <label htmlFor="" className="labels">
                                  Background :
                                </label>
                                <div className="cmsSlide">
                                  <img
                                    className="SlideCms"
                                    src={
                                      productImage
                                        ? productImage
                                        : slideData[2]?.banner
                                    }
                                  />
                                </div>
                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-uploads"
                                    name="slide3Img"
                                    type="file"
                                    {...register("slides")}
                                    onChange={(e) =>
                                      onFileSelection(e, "slide3Img")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label htmlFor="" className="labels d-flex">
                                CATEGORY TITLE :
                              </label>
                              <Editor
                                editorState={editorHomeCTstate}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorTitle3StateChange}
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "fontFamily",
                                    "colorPicker",
                                  ],
                                }}
                              />
                            </div>
                            <div className="form-group col-12">
                              <label htmlFor="" className="labels">
                                FEATURED TITLE :
                              </label>
                              <Editor
                                editorState={editorDesc3State}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorDesc3StateChange}
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "fontFamily",
                                    "colorPicker",
                                  ],
                                }}
                              />
                            </div>
                            <div className="form-group col-12">
                              <label htmlFor="" className="labels">
                                BRAND TITLE :
                              </label>
                              <Editor
                                editorState={editorDesc3State}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={onEditorDesc3StateChange}
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    "fontSize",
                                    "fontFamily",
                                    "colorPicker",
                                  ],
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-profile1"
                          role="tabpanel"
                          aria-labelledby="nav-profile1-tab"
                        >
                          <div className="row py-5 px-4 mx-0">
                            <div className="col-12">
                              <div className="  content_management_box bg-light p-3">
                                <div className="d-flex justify-content-between">
                                  <h2 className="fs-4">About Us</h2>
                                  <Link
                                    className="edit_content_btn mt-2 text-decoration-none"
                                    href="javscript:;"
                                    onClick={onEdit}
                                  >
                                    <i className="far fa-edit me-2" />
                                    Edit
                                  </Link>
                                </div>

                                <textarea
                                  className="textArea bg-light p-3 mt-1  w-100 pb-5 "
                                  disabled={disabled}
                                  id="aboutField"
                                  defaultValue={aboutUs}
                                  onChange={(e) => {
                                    setEditedAbout(e.target.value);
                                  }}
                                ></textarea>
                                <button
                                  className="comman_btn2 mt-4"
                                  id="saveAbout"
                                  onClick={onSaveAbout}
                                  hidden={aboutHidden}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-profile2"
                          role="tabpanel"
                          aria-labelledby="nav-profile2-tab"
                        >
                          <div className="row py-5 px-4 mx-0">
                            <div className="col-12">
                              <div className="row content_management_box bg-light p-3">
                                <div className="d-flex justify-content-between ">
                                  <h2 className="fs-4">Terms & Condition</h2>
                                  <Link
                                    className="edit_content_btn mt-2 text-decoration-none"
                                    href="javscript:;"
                                    onClick={onTermEdit}
                                  >
                                    <i className="far fa-edit me-2" />
                                    Edit
                                  </Link>
                                </div>
                                <textarea
                                  className="bg-light p-3 mt-1  w-100 pb-5 textArea"
                                  disabled={Tdisabled}
                                  defaultValue={terms}
                                  onChange={(e) => {
                                    setEditedTerms(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                              <button
                                className="comman_btn2 mt-4"
                                id="saveAbout"
                                onClick={onSaveTerms}
                                hidden={termsHidden}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="nav-profile3"
                          role="tabpanel"
                          aria-labelledby="nav-profile3-tab"
                        >
                          <div className="row py-5 px-4 mx-0">
                            <div className="col-12">
                              <div className="row content_management_box bg-light p-3">
                                <div className="d-flex justify-content-between">
                                  <h2 className="fs-4">Privacy Policies</h2>
                                  <Link
                                    className="edit_content_btn mt-2 text-decoration-none"
                                    onClick={onPrivacyEdit}
                                  >
                                    <i className="far fa-edit me-2" />
                                    Edit
                                  </Link>
                                </div>
                                <textarea
                                  className="bg-light p-3 mt-1 w-100 pb-5 textArea"
                                  disabled={Pdisabled}
                                  defaultValue={privacy}
                                  onChange={(e) => {
                                    setEditedPrivacy(e.target.value);
                                  }}
                                ></textarea>
                              </div>
                              <button
                                className="comman_btn2 mt-4"
                                id="saveAbout"
                                onClick={onSavePrivacy}
                                hidden={privacyHidden}
                              >
                                Save
                              </button>
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
                Edit Category
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
              >
                <div className="form-group col-12">
                  <label htmlFor="">Category Name</label>
                  <input
                    type="text"
                    defaultValue="Smoke"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-12 choose_file position-relative">
                  <span>Category Image </span>{" "}
                  <label htmlFor="upload_video">
                    <i className="fal fa-camera me-1" />
                    Choose File
                  </label>{" "}
                  <input
                    type="file"
                    className="form-control"
                    name="upload_video"
                    id="upload_video"
                  />
                </div>
                <div className="form-group mb-0 col-auto mt-3">
                  <button className="comman_btn">Save</button>
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
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form
                className="form-design px-3 py-2 help-support-form row align-items-end justify-content-center"
                action=""
              >
                <div className="form-group col-12">
                  <label htmlFor="">Sub Category Name</label>
                  <input
                    type="text"
                    defaultValue="Matrix Kratom"
                    className="form-control"
                  />
                </div>
                <div className="form-group col-12 choose_file position-relative">
                  <span>Sub Category Image </span>{" "}
                  <label htmlFor="upload_video">
                    <i className="fal fa-camera me-1" />
                    Choose File
                  </label>{" "}
                  <input
                    type="file"
                    className="form-control"
                    name="upload_video"
                    id="upload_video"
                  />
                </div>
                <div className="form-group mb-0 col-auto mt-3">
                  <button className="comman_btn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cms;
