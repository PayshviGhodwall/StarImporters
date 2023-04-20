import React, { useEffect, useState } from "react";
import AppHeader from "./appHeader";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link, useLocation } from "react-router-dom";
import {
  homeSearch,
  searchByBarcode,
} from "../httpServices/homeHttpService/homeHttpService";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { browserName, CustomView } from "react-device-detect";

function AppProductBySearch() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [scan, setScan] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  let deviceId = localStorage.getItem("device");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  let preSearch = location?.state?.search;
  useEffect(() => {
    getProductList();
  }, [search, scan]);

  const getProductList = async () => {
    const { data } = await homeSearch({
      search: search.replace(".", "") ? search.replace(".", "") : preSearch,
    });
    if (!data.error) {
      setProduct(data.results);
    }
  };
  console.log(search);

  if (!browserSupportsSpeechRecognition) {
    return console.log("Browser doesn't support speech recognition.");
  }

  const modalClose = () => {
    var audio = new Audio("../assets/img/voice.mp3");
    document.getElementById("close")?.click();
    setSearch(transcript);
    resetTranscript();
    audio.play();
  };

  // if (!listening && transcript) {
  //   modalClose();
  // }

  const onDetected = async (result) => {
    if (result.codeResult.code) {
      const { data } = await searchByBarcode({
        barcode: result.codeResult.code,
      });
      if (!data.error) {
        if (data.results.length)
          navigate(`/app/product-detail/${data.results[0]._id}`);
        window.location.reload();
      }
    }

    setScan(false);
  };
  const cameraScan = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("scanBarcode");
      if (Dd) {
        const { data } = await searchByBarcode({
          barcode: Dd,
        });
        if (!data.error) {
          if (data.results.length)
            navigate(`/app/product-detail/${data.results[0]._id}`);
          // navigate(`/app/product-by-search/${data.results[0]._id}`)
          window.location.reload();
        }
      }
    }
  };
  const microphoneSearch = async () => {
    if (window.flutter_inappwebview) {
      let Dd = await window.flutter_inappwebview.callHandler("micSearch");
      console.log(Dd, "hyiioioio");
      if (Dd) {
        setSearch(Dd);
      }
    }
  };

  // if (scan) {
  //   return (
  //     <div>
  //       <Scanner onDetected={onDetected} />
  //     </div>
  //   );
  // } else
  return (
    <>
      <AppHeader />
      <div className="page-content-wrapper">
        <div className="container">
          <div
            className={
              browserName === "WebKit" || browserName === "Chrome WebView"
                ? "search-form pt-3 "
                : "search-new pt-3 "
            }
          >
            <form>
              <input
                className="form-control"
                type="search"
                defaultValue={preSearch}
                placeholder="Search in Star Importers"
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            {browserName === "WebKit" || browserName === "Chrome WebView" ? (
              <div className="alternative-search-options">
                <button
                  className="comman_btn text-white ms-1"
                  onClick={microphoneSearch}
                >
                  <i className="fa-solid fa-microphone"></i>
                </button>
                <Link
                  className="comman_btn2 ms-1"
                  to=""
                  onClick={() => cameraScan()}
                >
                  <i className="fa fa-qrcode"></i>
                </Link>
              </div>
            ) : null}
          </div>

          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                <h6> Showing results for "{search ? search : preSearch}"</h6>
              </div>
              {product.length ? (
                <div className="row g-2">
                  {(product || [])?.map((item, index) => {
                    return (
                      <div className="col-6 col-md-4" key={index}>
                        <div className="card product-card">
                          <div className="card-body">
                            <Link
                              className="product-thumbnail d-block"
                              to={`/app/product-detail/${item._id}`}
                            >
                              <img
                                className="mb-2"
                                src={
                                  item?.type.flavourImage
                                    ? item?.type.flavourImage
                                    : item?.productImage ||
                                      require("../../assets/img/product.jpg")
                                }
                                alt=""
                              />
                            </Link>
                            <Link
                              className="product-title"
                              to={`/app/product-detail/${item._id}`}
                            >
                              {item.unitName + "-" + item?.type.flavour}
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <img className="no-data" src="../assets/img/no-data.gif" />
                  <h1 className="text-center"> No Results</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade voice_search"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body py-4">
              <div class="row voice_search_ouuter">
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="close"
                ></button>
                <div class="col-12">
                  <div class="voice_box">
                    {!listening && !transcript ? (
                      <p>Didn't hear that. Try again.</p>
                    ) : (
                      <p>{transcript ? transcript : "Listening..."}</p>
                    )}
                  </div>
                </div>
                <div class="col-12">
                  {/* please use "didnt_hear" class name on hear class place"  */}
                  <div
                    class={
                      !listening && !transcript
                        ? "voice_box_btn didnt_hear"
                        : "voice_box_btn hear"
                    }
                    onClick={SpeechRecognition.startListening}
                  >
                    <a href="javscript::">
                      <i class="fa-solid fa-microphone"> </i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppProductBySearch;
