import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";

const PrivacyPolicies = () => {
  const [data, setData] = useState("");
  const TermsCond = `${process.env.REACT_APP_APIENDPOINTNEW}user/welcome/privacyPolicy`;
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
          <h1> Privacy Policy</h1>
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

export default PrivacyPolicies;
