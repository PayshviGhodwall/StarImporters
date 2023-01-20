import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/adminMain.css";
import { Editor } from "react-draft-wysiwyg";
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

const Cms = () => {
  const [sideBar, setSideBar] = useState(true);
  const [change, setChange] = useState(false);
  const [productImage, setProductImage] = useState();
  const [disabled, setDisabled] = useState(true);
  const [slideData, setSlideData] = useState([]);
  const [headersData, setHeadersData] = useState([]);
  const [files, setFiles] = useState([]);
  const [currentPos1, setCurrentPos1] = useState("One");
  const [currentPos2, setCurrentPos2] = useState("Two");
  const [currentPos3, setCurrentPos3] = useState("Three");
  const AllSlides = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/getAllSlides`;
  const AllHeaders = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/getHeaders`;
  const EditSlide = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/editSlide`;
  const EditHeaders = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/editHeaders`;
  const getAbout = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/aboutus`;
  const getTerms = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/TAndC`;
  const getPrivacy = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/cms/privacyPolicy`;
  const editAboutUs = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editAbout`;
  const editTerms = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editTnC`;
  const editPrivacy = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin//cms/editPrivacyPolicy`;
  const { register, handleSubmit, reset } = useForm();
  const [editorTitleState, setTitleEditorState] = useState(null);
  const [editorDescState, setDescEditorState] = useState(null);
  const [editorTitle2State, setTitle2EditorState] = useState(null);
  const [editorDesc2State, setDesc2EditorState] = useState(null);
  const [editorTitle3State, setTitle3EditorState] = useState(null);
  const [editorDesc3State, setDesc3EditorState] = useState(null);
  const [editorTitle4State, setTitle4EditorState] = useState(null);
  const [editorDesc4State, setDesc4EditorState] = useState(null);
  const [editorTitle5State, setTitle5EditorState] = useState(null);
  const [editorDesc5State, setDesc5EditorState] = useState(null);
  const [editorTitle6State, setTitle6EditorState] = useState(null);
  const [editorDesc6State, setDesc6EditorState] = useState(null);
  const [editorHomeCTstate, setEditorHomeCTstate] = useState(null);
  const [editorHomeFPstate, setEditorHomeFPstate] = useState(null);
  const [editorHomePBstate, setEditorHomePBstate] = useState(null);
  const [editorHomeAboutState, setEditorHomeAboutState] = useState(null);
  const [editorHomePrivacyState, setEditorHomePrivacyState] = useState(null);
  const [editorHomeTermsState, setEditorHomeTermsState] = useState(null);

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  let User = JSON.parse(localStorage.getItem("AdminData"));

  useEffect(() => {
    getSlides();
    getHeader();
    getAboutUs();
    getTermsCondition();
    getPrivacyPolicy();
  }, [change]);

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
  const onEditorTitle4StateChange = async (editorTitle4State) => {
    await setTitle4EditorState(editorTitle4State);
  };
  const onEditorDesc4StateChange = async (editorDesc4State) => {
    await setDesc4EditorState(editorDesc4State);
  };
  const onEditorTitle5StateChange = async (editorTitle5State) => {
    await setTitle5EditorState(editorTitle5State);
  };
  const onEditorDesc5StateChange = async (editorDesc5State) => {
    await setDesc5EditorState(editorDesc5State);
  };
  const onEditorTitle6StateChange = async (editorTitle6State) => {
    await setTitle6EditorState(editorTitle6State);
  };
  const onEditorDesc6StateChange = async (editorDesc6State) => {
    await setDesc6EditorState(editorDesc6State);
  };

  const onEditorHomeAboutStateChange = async (editorHomeAboutState) => {
    await setEditorHomeAboutState(editorHomeAboutState);
  };
  const onEditorHomePrivacyStateChange = async (editorHomePrivacyState) => {
    await setEditorHomePrivacyState(editorHomePrivacyState);
  };
  const onEditorHomeTermsStateChange = async (editorHomeTermsState) => {
    await setEditorHomeTermsState(editorHomeTermsState);
  };

  const onEditorHomeCateStateChange = async (editorHomeCTstate) => {
    await setEditorHomeCTstate(editorHomeCTstate);
  };
  const onEditorHomeFeatStateChange = async (editorHomeFPstate) => {
    await setEditorHomeFPstate(editorHomeFPstate);
  };
  const onEditorHomeBrandStateChange = async (editorHomePBstate) => {
    await setEditorHomePBstate(editorHomePBstate);
  };

  const getSlides = async () => {
    await axios.get(AllSlides).then((res) => {
      setSlideData(res?.data.results);
      let results = res?.data.results;
      const contentTtState = stateFromHTML(results[0]?.title);
      const contentDsState = stateFromHTML(results[0]?.description);

      const contentTt2State = stateFromHTML(results[1]?.title);
      const contentDs2State = stateFromHTML(results[1]?.description);

      const contentTt3State = stateFromHTML(results[2]?.title);
      const contentDs3State = stateFromHTML(results[2]?.description);

      const contentTt4State = stateFromHTML(results[3]?.title);
      const contentDs4State = stateFromHTML(results[3]?.description);

      const contentTt5State = stateFromHTML(results[4]?.title);
      const contentDs5State = stateFromHTML(results[4]?.description);

      const contentTt6State = stateFromHTML(results[5]?.title);
      const contentDs6State = stateFromHTML(results[5]?.description);

      setTitleEditorState(EditorState.createWithContent(contentTtState));
      setDescEditorState(EditorState.createWithContent(contentDsState));

      setTitle2EditorState(EditorState.createWithContent(contentTt2State));
      setDesc2EditorState(EditorState.createWithContent(contentDs2State));

      setTitle3EditorState(EditorState.createWithContent(contentTt3State));
      setDesc3EditorState(EditorState.createWithContent(contentDs3State));

      setTitle4EditorState(EditorState.createWithContent(contentTt4State));
      setDesc4EditorState(EditorState.createWithContent(contentDs4State));

      setTitle5EditorState(EditorState.createWithContent(contentTt5State));
      setDesc5EditorState(EditorState.createWithContent(contentDs5State));

      setTitle6EditorState(EditorState.createWithContent(contentTt6State));
      setDesc6EditorState(EditorState.createWithContent(contentDs6State));
    });
  };

  const onFileSelection = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const getHeader = async () => {
    await axios.post(AllHeaders).then((res) => {
      setHeadersData(res?.data.results.headers[0]);
      let results = res?.data.results.headers[0];

      const contentCateState = stateFromHTML(results.categoryTitle);
      const contentFeatState = stateFromHTML(results.featuredTitle);
      const contentBrandState = stateFromHTML(results.brandTitle);

      setEditorHomeCTstate(EditorState.createWithContent(contentCateState));
      setEditorHomeFPstate(EditorState.createWithContent(contentFeatState));
      setEditorHomePBstate(EditorState.createWithContent(contentBrandState));
    });
  };

  const contentPosition = (e) => {
    setCurrentPos1(e.target.value);
  };
  const contentPosition2 = (e) => {
    setCurrentPos2(e.target.value);
  };
  const contentPosition3 = (e) => {
    setCurrentPos3(e.target.value);
  };
  const contentPosition4 = (e) => {
    setCurrentPos3(e.target.value);
  };
  const contentPosition5 = (e) => {
    setCurrentPos3(e.target.value);
  };
  const contentPosition6 = (e) => {
    setCurrentPos3(e.target.value);
  };
  const onSubmit = async (data) => {
    let title = await stateToHTML(editorTitleState.getCurrentContent());
    let Desc = await stateToHTML(editorDescState.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide1Img);
    formData.append("position", currentPos1);
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
        if (res?.data.message === "Invalid Image format") {
          Swal.fire({
            title: "Invalid Image format!",
            icon: "warning",
            confirmButtonText: "ok",
          });
        }
      });
  };
  const onSubmitSecond = async (data) => {
    let title = await stateToHTML(editorTitle2State.getCurrentContent());
    let Desc = await stateToHTML(editorDesc2State.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide2Img);
    formData.append("position", currentPos2);

    await axios
      .post(EditSlide + "/" + slideData[1]?._id, formData)
      .then((res) => {
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
    let title = await stateToHTML(editorTitle3State.getCurrentContent());
    let Desc = await stateToHTML(editorDesc3State.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide3Img);
    formData.append("position", currentPos3);

    await axios
      .post(EditSlide + "/" + slideData[2]?._id, formData)
      .then((res) => {
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

  const onSubmitFourth = async (data) => {
    let title = await stateToHTML(editorTitle4State.getCurrentContent());
    let Desc = await stateToHTML(editorDesc4State.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide4Img);
    formData.append("position", currentPos3);

    await axios
      .post(EditSlide + "/" + slideData[3]?._id, formData)
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
  const onSubmitFifth = async (data) => {
    let title = await stateToHTML(editorTitle5State.getCurrentContent());
    let Desc = await stateToHTML(editorDesc5State.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide5Img);
    formData.append("position", currentPos3);

    await axios
      .post(EditSlide + "/" + slideData[4]?._id, formData)
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
  const onSubmitSixth = async (data) => {
    let title = await stateToHTML(editorTitle6State.getCurrentContent());
    let Desc = await stateToHTML(editorDesc6State.getCurrentContent());

    const formData = new FormData();
    formData.append("title", title?.trim());
    formData.append("description", Desc?.trim());
    formData.append("banner", files?.slide6Img);
    formData.append("position", currentPos3);

    await axios
      .post(EditSlide + "/" + slideData[5]?._id, formData)
      .then((res) => {
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

  const saveHeaders = async () => {
    let categoryTitle = await stateToHTML(
      editorHomeCTstate.getCurrentContent()
    );
    let featuredTitle = await stateToHTML(
      editorHomeFPstate.getCurrentContent()
    );
    let brandTitle = await stateToHTML(editorHomePBstate.getCurrentContent());
    const formData = new FormData();
    formData.append("categoryTitle", categoryTitle?.trim());
    formData.append("brandTitle", brandTitle?.trim());
    formData.append("featuredTitle", featuredTitle?.trim());
    formData.append("bottomImage", files?.BannerImg);
    formData.append("foreground", files?.foreground);
    await axios
      .post(EditHeaders + "/" + headersData?._id, formData)
      .then((res) => {
        if (!res.error) {
          getHeader();
          Swal.fire({
            title: "Content Modified!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };

  const getAboutUs = async () => {
    await axios.get(getAbout).then((res) => {
      const contentAboutState = stateFromHTML(res?.data.results[0].description);
      setEditorHomeAboutState(EditorState.createWithContent(contentAboutState));
    });
  };
  const getPrivacyPolicy = async () => {
    await axios.get(getPrivacy).then((res) => {
      const contentPrivacyState = stateFromHTML(
        res?.data.results[0].description
      );
      setEditorHomePrivacyState(
        EditorState.createWithContent(contentPrivacyState)
      );
    });
  };
  const getTermsCondition = async () => {
    await axios.get(getTerms).then((res) => {
      const contentTermState = stateFromHTML(res?.data.results[0].description);
      setEditorHomeTermsState(EditorState.createWithContent(contentTermState));
    });
  };
  const handleClick = () => {
    localStorage.removeItem("AdminData");
    localStorage.removeItem("AdminLogToken");
    localStorage.removeItem("AdminEmail");
  };

  const onSaveAbout = async (e) => {
    let Desc = await stateToHTML(editorHomeAboutState.getCurrentContent());
    await axios
      .post(editAboutUs, {
        description: Desc?.trim(),
      })
      .then((res) => {
        if (res.data.message === "Modified Successfully") {
          Swal.fire({
            title: "Content Modified!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };

  document
    .getElementById("slideOneUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide1")
            .setAttribute("src", event.target.result);
        });
      }
    });
  document
    .getElementById("slideTwoUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide2")
            .setAttribute("src", event.target.result);
        });
      }
    });
  document
    .getElementById("slideThreeUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide3")
            .setAttribute("src", event.target.result);
        });
      }
    });
  document
    .getElementById("slideFourUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide4")
            .setAttribute("src", event.target.result);
        });
      }
    });
  document
    .getElementById("slideFiveUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide1")
            .setAttribute("src", event.target.result);
        });
      }
    });
  document
    .getElementById("slideSixUrl")
    ?.addEventListener("change", function () {
      if (this.files[0]) {
        var picture = new FileReader();
        picture.readAsDataURL(this.files[0]);
        picture.addEventListener("load", function (event) {
          document
            .getElementById("slide6")
            .setAttribute("src", event.target.result);
        });
      }
    });
  const onSaveTerms = async (e) => {
    let Desc = await stateToHTML(editorHomeTermsState.getCurrentContent());

    await axios
      .post(editTerms, {
        description: Desc,
      })
      .then((res) => {
        if (res.data.message === "Modified Successfully") {
          Swal.fire({
            title: "Content Modified!",
            icon: "success",
            button: "Ok",
          });
        }
      });
  };

  // const onSavePrivacy = async (e) => {
  //   let Desc = await stateToHTML(editorHomePrivacyState.getCurrentContent());

  //   await axios
  //     .post(editPrivacy, {
  //       description: Desc,
  //     })
  //     .then((res) => {
  //       if (
  //         res.data.message === '"Terms and Conditions" Modified Successfully'
  //       ) {
  //         Swal.fire({
  //           title: "Content Modified!",
  //           icon: "success",
  //           button: "Ok",
  //         });
  //       }
  //     });
  // };

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
                                    id="SlideOne-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideOne"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideOne"
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
                                    id="SlideTwo-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideTwo"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideTwo"
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
                                    id="SlideThree-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideThree"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideThree"
                                    aria-selected="false"
                                  >
                                    {slideData[2]?.slide}
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link labels"
                                    id="SlideFour-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideFour"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideFour"
                                    aria-selected="false"
                                  >
                                    {slideData[3]?.slide}
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link labels"
                                    id="SlideFive-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideFive"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideFive"
                                    aria-selected="false"
                                  >
                                    {slideData[4]?.slide}
                                  </button>
                                </li>
                                <li
                                  className="nav-item me-2"
                                  role="presentation"
                                >
                                  <button
                                    className="nav-link labels"
                                    id="SlideSix-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#SlideSix"
                                    type="button"
                                    role="tab"
                                    aria-controls="SlideSix"
                                    aria-selected="false"
                                  >
                                    {slideData[5]?.slide}
                                  </button>
                                </li>
                              </ul>
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="SlideOne"
                                  role="tabpanel"
                                  aria-labelledby="SlideOne-tab"
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
                                                value="One"
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
                                                value="Two"
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
                                                value="Three"
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
                                                id="slide1"
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
                                                id="slideOneUrl"
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                  id="SlideTwo"
                                  role="tabpanel"
                                  aria-labelledby="SlideTwo-tab"
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
                                                value="One"
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
                                                value="Two"
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
                                                value="Three"
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
                                                id="slide2"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[1]?.banner
                                                }
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera " />
                                              <input
                                                className="file-uploads"
                                                name="slide2Img"
                                                type="file"
                                                id="slideTwoUrl"
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                  id="SlideThree"
                                  role="tabpanel"
                                  aria-labelledby="SlideThree-tab"
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
                                                value="One"
                                                onChange={contentPosition3}
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
                                                value="Two"
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
                                                value="Three"
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
                                                id="slide3"
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
                                                id="slideThreeUrl"
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                  className="tab-pane fade "
                                  id="SlideFour"
                                  role="tabpanel"
                                  aria-labelledby="SlideFour-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmitFourth)}
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
                                                value="One"
                                                onChange={contentPosition4}
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
                                                value="Two"
                                                onChange={contentPosition4}
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
                                                value="Three"
                                                onChange={contentPosition4}
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
                                                id="slide4"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[3]?.banner
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                type="file"
                                                name="slide4Img"
                                                accept="image/*"
                                                id="slideFourUrl"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide4Img"
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
                                            editorState={editorTitle4State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitle4StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDesc4State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDesc4StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                  className="tab-pane fade "
                                  id="SlideFive"
                                  role="tabpanel"
                                  aria-labelledby="SlideFive-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmitFifth)}
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
                                                value="One"
                                                onChange={contentPosition5}
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
                                                value="Two"
                                                onChange={contentPosition5}
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
                                                value="Three"
                                                onChange={contentPosition5}
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
                                                id="slide5"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[4]?.banner
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                type="file"
                                                name="slide5Img"
                                                accept="image/*"
                                                id="slideFiveUrl"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide5Img"
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
                                            editorState={editorTitle5State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitle5StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDesc5State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDesc5StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                                  id="SlideSix"
                                  role="tabpanel"
                                  aria-labelledby="SlideSix-tab"
                                >
                                  <div className="row mx-0 border rounded py-3 px-1">
                                    <div className="col-12">
                                      <form
                                        className="form-design row"
                                        action=""
                                        onSubmit={handleSubmit(onSubmitSixth)}
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
                                                value="One"
                                                onChange={contentPosition6}
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
                                                value="Two"
                                                onChange={contentPosition6}
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
                                                value="Three"
                                                onChange={contentPosition6}
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
                                                id="slide6"
                                                src={
                                                  productImage
                                                    ? productImage
                                                    : slideData[5]?.banner
                                                }
                                                alt=""
                                              />
                                            </div>
                                            <div className="p-image">
                                              <i className="upload-button fas fa-camera" />
                                              <input
                                                className="file-uploads"
                                                type="file"
                                                name="slide6Img"
                                                accept="image/*"
                                                id="slideSixUrl"
                                                {...register("slides")}
                                                onChange={(e) =>
                                                  onFileSelection(
                                                    e,
                                                    "slide6Img"
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
                                            editorState={editorTitle6State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorTitle6StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
                                              ],
                                            }}
                                          />
                                        </div>
                                        <div className="form-group col-12">
                                          <label htmlFor="" className="labels">
                                            Paragraph
                                          </label>
                                          <Editor
                                            editorState={editorDesc6State}
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class border"
                                            toolbarClassName="toolbar-class"
                                            onEditorStateChange={
                                              onEditorDesc6StateChange
                                            }
                                            wrapperStyle={{}}
                                            editorStyle={{}}
                                            toolbarStyle={{}}
                                            toolbar={{
                                              options: [
                                                "inline",
                                                "blockType",
                                                // "fontSize",
                                                // "fontFamily",
                                                // "colorPicker",
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
                            <div className="col-lg-10 col-md-10  col-sm-10">
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
                                        : headersData?.bottomImage
                                    }
                                  />
                                </div>

                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-uploads"
                                    name="BannerImg"
                                    type="file"
                                    onChange={(e) =>
                                      onFileSelection(e, "BannerImg")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-10 col-sm-11">
                              <div className="account_profile d-inline-block">
                                <label htmlFor="" className="labels">
                                  Foreground Image:
                                </label>
                                <div className="cmsSlide">
                                  <img
                                    className="SlideCms"
                                    src={
                                      productImage
                                        ? productImage
                                        : headersData?.foreground
                                    }
                                  />
                                </div>

                                <div className="p-image">
                                  <i className="upload-button fas fa-camera" />
                                  <input
                                    className="file-uploads"
                                    name="foreground"
                                    type="file"
                                    onChange={(e) =>
                                      onFileSelection(e, "foreground")
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="form-group col-12 mb-2">
                              <label htmlFor="" className="labels d-flex">
                                CATEGORY TITLE :
                              </label>
                              <Editor
                                editorState={editorHomeCTstate}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={
                                  onEditorHomeCateStateChange
                                }
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    // "fontSize",
                                    // "fontFamily",
                                    // "colorPicker",
                                  ],
                                }}
                              />
                            </div>
                            <div className="form-group col-12 mb-2">
                              <label htmlFor="" className="labels">
                                FEATURED TITLE :
                              </label>
                              <Editor
                                editorState={editorHomeFPstate}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={
                                  onEditorHomeFeatStateChange
                                }
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    // "fontSize",
                                    // "fontFamily",
                                    // "colorPicker",
                                  ],
                                }}
                              />
                            </div>
                            <div className="form-group col-12 mb-2">
                              <label htmlFor="" className="labels">
                                BRAND TITLE :
                              </label>
                              <Editor
                                editorState={editorHomePBstate}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class border"
                                toolbarClassName="toolbar-class"
                                onEditorStateChange={
                                  onEditorHomeBrandStateChange
                                }
                                wrapperStyle={{}}
                                editorStyle={{}}
                                toolbarStyle={{}}
                                toolbar={{
                                  options: [
                                    "inline",
                                    "blockType",
                                    // "fontSize",
                                    // "fontFamily",
                                    // "colorPicker",
                                  ],
                                }}
                              />
                              <button
                                className="comman_btn  text-decoration-none mt-3"
                                onClick={saveHeaders}
                              >
                                Save
                              </button>
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
                                </div>
                                <Editor
                                  editorState={editorHomeAboutState}
                                  wrapperClassName="wrapper-class"
                                  editorClassName="editor-class border"
                                  toolbarClassName="toolbar-class"
                                  disabled={disabled}
                                  onEditorStateChange={
                                    onEditorHomeAboutStateChange
                                  }
                                  wrapperStyle={{}}
                                  editorStyle={{}}
                                  toolbarStyle={{}}
                                  toolbar={{
                                    options: [
                                      "inline",
                                      "blockType",
                                      // "fontSize",
                                      // "fontFamily",
                                      // "colorPicker",
                                    ],
                                  }}
                                ></Editor>
                                <button
                                  className="comman_btn2 mt-4"
                                  id="saveAbout"
                                  onClick={onSaveAbout}
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
                              <div className="content_management_box bg-light p-3">
                                <div className="d-flex justify-content-between ">
                                  <h2 className="fs-4">Terms & Condition</h2>
                                </div>
                                <Editor
                                  editorState={editorHomeTermsState}
                                  wrapperClassName="wrapper-class"
                                  editorClassName="editor-class border"
                                  toolbarClassName="toolbar-class"
                                  disabled={disabled}
                                  onEditorStateChange={
                                    onEditorHomeTermsStateChange
                                  }
                                  wrapperStyle={{}}
                                  editorStyle={{}}
                                  toolbarStyle={{}}
                                  toolbar={{
                                    options: [
                                      "inline",
                                      "blockType",
                                      // "fontSize",
                                      // "fontFamily",
                                      // "colorPicker",
                                    ],
                                  }}
                                ></Editor>

                                <button
                                  className="comman_btn2 mt-4"
                                  id="saveAbout"
                                  onClick={onSaveTerms}
                                >
                                  Save
                                </button>
                              </div>
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
                              <div className="content_management_box bg-light p-3">
                                <div className="d-flex justify-content-between ">
                                  <h2 className="fs-4">Privacy Policy</h2>
                                </div>
                                <Editor
                                  editorState={editorHomePrivacyState}
                                  wrapperClassName="wrapper-class"
                                  editorClassName="editor-class border"
                                  toolbarClassName="toolbar-class"
                                  disabled={disabled}
                                  onEditorStateChange={
                                    onEditorHomePrivacyStateChange
                                  }
                                  wrapperStyle={{}}
                                  editorStyle={{}}
                                  toolbarStyle={{}}
                                  toolbar={{
                                    options: [
                                      "inline",
                                      "blockType",
                                      // "fontSize",
                                      // "fontFamily",
                                      // "colorPicker",
                                    ],
                                  }}
                                ></Editor>

                                <button
                                  className="comman_btn2 mt-4"
                                  id="saveAbout"
                                  onClick={onSaveTerms}
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
