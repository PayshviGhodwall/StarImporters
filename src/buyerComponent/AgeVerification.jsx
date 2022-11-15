import React, { useState } from "react";
import "../assets/css/main.css";
import { Link, useNavigate } from "react-router-dom";

const AgeVerification = ({ ModalClose }) => {
  const [err, setErr] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
      document.cookie = "cookie=store";
      ModalClose.click();
    } 
  

  return (
    <div className="">
      <section className="age_verification">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6 verification_content">
              <h2 className="text-shadow">Confirm Your Age</h2>
              <span className="fs-4">ARE YOU 21 YEARS OLD OR OLDER?</span>
              <form>
                <div className="form-group custom_checkboxs mt-3 mb-md-4 mb-3">
                  <label
                    htmlFor=""
                    className="fs-3"
                  >
                    THIS WEBSITE REQUIRES YOU TO BE 21+ YEARS OLDER TO ENTER.
                  </label>
                </div>
                <button
                  className="comman_btn shadow mx-2"
                  type="submit"
                  onClick={handleClick}
                >
                  Yes, I am
                </button>
                <a className="comman_btn2 shadow mx-2" href="javascript:;" >
                  Exit
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgeVerification;
