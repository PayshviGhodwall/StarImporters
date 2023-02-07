import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import DOMPurify from "dompurify";

const AboutUs = () => {
  const [data, setData] = useState("");
  const about = `${process.env.REACT_APP_APIENDPOINTNEW}user/welcome/aboutUs`;
  useEffect(() => {
    axios.get(about).then((res) => {
      setData(res.data?.results);
    });
  }, []);
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div>
      <Navbar />
      <div className=" bg-whitem-2 p-5" style={{ marginTop: "8rem" }}>
        <>
          <h1>ABOUT US</h1>
          <p>
            <span dangerouslySetInnerHTML={createMarkup(data[0]?.description)}>
            </span>{" "}
          </p>
        </>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
