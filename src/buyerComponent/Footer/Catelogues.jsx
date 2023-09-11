import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import $ from "jquery";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";

// import HTMLFlipBook from "react-pageflip";
// const Page = React.forwardRef((props, ref) => {
//   return (
//     <div className="" ref={ref}>
//       <p>{props.children}</p>
//       <p>Page number: {props.number}</p>
//     </div>
//   );
// });

import Starlogo from "../../assets/img/logo.png";
import { Link } from "react-router-dom";

const Catelogues = () => {
  const allPdf = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getCatalog`;
  // var pages = document.getElementsByClassName("page");
  const [allPdfs, setAllPdfs] = useState([]);
  const handle = useFullScreenHandle();

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

  // $(document).ready(function () {
  //   "use strict";
  //   var controll = $(".sliderC .fa"),
  //     slide = $(".sliderC ul li"),
  //     open = 0,
  //     i = 11;

  //   controll.on("click", function () {
  //     $(this).addClass("active").siblings().removeClass("active");
  //   });

  //   slide.each(function () {
  //     $(this).css("z-index", -$(this).index());
  //   });
  //   controll.on("click", function () {
  //     if ($(this).is(":last-of-type")) {
  //       i++;
  //       slide.eq(open).addClass("open").css("z-index", i);
  //       open++;
  //       if (slide.last().hasClass("open")) {
  //         $(this).hide();
  //       } else {
  //         $(this).siblings(".fa").show();
  //       }
  //     }
  //     if ($(this).is(":first-of-type") && slide.first().hasClass("open")) {
  //       i++;
  //       open--;
  //       slide.eq(open).removeClass("open").css("z-index", i);
  //       if (!slide.first().hasClass("open")) {
  //         $(this).hide();
  //       } else {
  //         $(this).siblings(".fa").show();
  //       }
  //     }
  //   });
  //   controll.last().click();
  // });

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
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer">Home</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer/All-Catalogs">Catalogs</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/events/catelog&flyer/All-Flyers">Monthly Flyers</Link>
                </li>
                <li>
                  <Link className="text-decoration-none text-dark" to="/app/about-us">About Us</Link>
                </li>
              </ul>
            </nav>
          </header>
          <div className="bg-white">
            <iframe
              src="https://8f920893-trial.flowpaper.com/fileexamplePDF500kB/"
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

export default Catelogues;
