import React, { useEffect, useState } from "react";
import AppHeader from "./appHeader";
import AppFooter from "./appFooter";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import { Link } from "react-router-dom";
import { homeSearch } from "../httpServices/homeHttpService/homeHttpService";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function AppProductBySearch() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    getProductList();
  }, [search]);

  const getProductList = async () => {
    const { data } = await homeSearch({ search: search.replace(".", "") });
    if (!data.error) {
      setProduct(data.results);
    }
  };

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

  if (!listening && transcript) {
    modalClose();
  }

  const modalopen = () => {
    var audio = new Audio("../assets/img/voice.mp3");
    audio.play();
    document.getElementById("close")?.click();
    setSearch(transcript);
    resetTranscript();
  };

  return (
    <>
      <AppHeader />
      <div className="page-content-wrapper">
        <div className="container">
          <div className="search-form pt-3 rtl-flex-d-row-r">
            <form>
              <input
                className="form-control"
                type="search"
                value={search}
                placeholder="Search in Star Importers"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            <div className="alternative-search-options">
              <button
                className="comman_btn text-white ms-1"
                onClick={SpeechRecognition.startListening}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
              {/* <a className="comman_btn2 ms-1" href="#">
                <i className="fa fa-qrcode"></i>
              </a> */}
            </div>
          </div>

          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between dir-rtl">
                {search ? <h6> Showing results for "{search}"</h6> : ""}
              </div>
              {search ? (
                product.length ? (
                  <div className="row g-2">
                    {product.map((item, index) => {
                      return (
                        <div className="col-6 col-md-4">
                          <div className="card product-card">
                            <div className="card-body">
                              <Link
                                className="product-thumbnail d-block"
                                to={`/app/product-detail/${item._id}`}
                              >
                                <img
                                  className="mb-2"
                                  src={item.productImage}
                                  alt=""
                                />
                              </Link>
                              <Link
                                className="product-title"
                                to="/app/product-detail"
                              >
                                {item.unitName}
                              </Link>

                              <div className="product-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <img className="no-data" src="../assets/img/no-data.gif" />
                )
              ) : (
                ""
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
