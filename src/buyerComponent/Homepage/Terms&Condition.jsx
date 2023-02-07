import axios from "axios";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { useEffect } from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";

const TermsCondition = () => {
  const [data, setData] = useState("");
  const TermsCond = `${process.env.REACT_APP_APIENDPOINTNEW}user/welcome/tAndC`;
  useEffect(() => {
    axios.get(TermsCond).then((res) => {
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
          <h1> Terms & Condition</h1>
          <p>
            <span
              dangerouslySetInnerHTML={createMarkup(data[0]?.description)}
            ></span>{" "}
          </p>
        </>
      </div>
      <Footer />
    </div>
  );
};

export default TermsCondition;
