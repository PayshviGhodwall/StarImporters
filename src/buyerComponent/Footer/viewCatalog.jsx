import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import $ from "jquery";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import Starlogo from "../../assets/img/logo.png";
import { Link, useLocation } from "react-router-dom";

const ViewCatalog = () => {
  const allPdf = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getCatalog`;
  // var pages = document.getElementsByClassName("page");
  const [allPdfs, setAllPdfs] = useState([]);
  const handle = useFullScreenHandle();
  let location = useLocation();
  useEffect(() => {
    getPdfs();
  }, []);

  const getPdfs = async () => {
    const { data } = await axios.get(allPdf);
    console.log(data);
    if (!data.error) {
      setAllPdfs(data?.results?.catalog);
    }
  };

  return (
    <div>
      <section class="">
        <div className="">
          <header class="site-header shadow">
            <div class="site-identity">
              <Link className="bg-white" to="/app/home">
                <img
                  style={{
                    width: "8rem",
                    height: "4rem",
                  }}
                  src={Starlogo}
                  alt="Site Name"
                />
              </Link>
              <h1>Star Importers & Wholesalers</h1>
            </div>
            <nav class="site-navigation">
              <ul class="nav">
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer/All-Catalogs">
                    Catalogs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/events/catelog&flyer/All-Flyers">
                    Monthly Flyers
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-decoration-none text-dark"
                    to="/app/about-us">
                    About Us
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="bg-white">
            <iframe
              src={
                location?.state
                  ? location?.state
                  : "https://8f920893-trial.flowpaper.com/fileexamplePDF500kB/"
              }
              width="100%"
              height="630"
              allowFullScreen></iframe>
          </div>
        </div>
        <div
          className=""
          style={{
            marginTop: "10rem",
          }}>
          {/* <small className="" onClick={handle.enter}>
                  <i class="fas fa-expand"></i>
                </small> */}
          {/* <div className=" ">
            <FullScreen handle={handle}>
              <div className="bg-white">
                <HTMLFlipBook width={400} height={500}>
                  {allPdfs[0]?.image?.map((itm, ids) => (
                    <li>
                      <Page number={ids + 1}>
                        {" "}
                        <img src={itm}></img>
                      </Page>
                    </li>
                  ))}
                </HTMLFlipBook>
              
              </div>
             
            </FullScreen>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default ViewCatalog;
