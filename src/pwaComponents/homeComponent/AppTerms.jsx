import axios from "axios";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

const AppTerms = () => {
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
      <div className="star_imp_app">
        <AppHeader />
        <div className=" text-center" style={{ marginTop: "5rem" }}>
          <h5 className="mb-1">TERMS & CONDITIONS</h5>
          <p>
            <span
              dangerouslySetInnerHTML={createMarkup(data[0]?.description)}
            ></span>{" "}
          </p>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AppTerms;
