import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Homepage/Navbar";
import Footer from "./Footer";
import $ from "jquery";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="" ref={ref}>
      <p>{props.children}</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

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

  $(document).ready(function () {
    "use strict";
    var controll = $(".sliderC .fa"),
      slide = $(".sliderC ul li"),
      open = 0,
      i = 11;

    controll.on("click", function () {
      $(this).addClass("active").siblings().removeClass("active");
    });

    slide.each(function () {
      $(this).css("z-index", -$(this).index());
    });
    controll.on("click", function () {
      if ($(this).is(":last-of-type")) {
        i++;
        slide.eq(open).addClass("open").css("z-index", i);
        open++;
        if (slide.last().hasClass("open")) {
          $(this).hide();
        } else {
          $(this).siblings(".fa").show();
        }
      }
      if ($(this).is(":first-of-type") && slide.first().hasClass("open")) {
        i++;
        open--;
        slide.eq(open).removeClass("open").css("z-index", i);
        if (!slide.first().hasClass("open")) {
          $(this).hide();
        } else {
          $(this).siblings(".fa").show();
        }
      }
    });
    controll.last().click();
  });

  return (
    <div>
      <Navbar />
      <section class=" px-5 pb-5 mb-5">
        <div className="container bg-white  p-5  shadow"
        style={{
          marginTop:'10rem'
        }}
        >
            <small className="" onClick={handle.enter}>
                  <i class="fas fa-expand"></i>
                </small>
          <div className=" ">
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
              {/* <div class="sliderC bg-white d-none">
                <ul className="mt-5">
                  {allPdfs[0]?.image?.map((itm, ids) => (
                    <li className="shadow">
                      <img src={itm}></img>
                    </li>
                  ))}
                </ul>
                <div className="">
                  <i class="fa fa-chevron-left fa-2x"></i>
                  <i class="fa fa-chevron-right active fa-2x"></i>
                </div>
              </div> */}
            </FullScreen>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Catelogues;
