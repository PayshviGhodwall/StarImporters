import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AppWelcome() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nt, setNt] = useState(true);
  const getNotified = `${process.env.REACT_APP_APIENDPOINTNEW}user/addNotify`;
  const [countdownDate, setCountdownDate] = useState(
    new Date("02/05/2023").getTime()
  );
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setInterval(() => setNewTime(), 1000);
  }, []);
  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();

      const distanceToDate = countdownDate - currentTime;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      days = `${days}`;
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      } else if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      } else if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ days: days, hours: hours, minutes, seconds });
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(getNotified, {
        name: name,
        email: email,
      })
      .then((res) => {
        if (!res.error) {
          setNt(!nt);
        }
      });
  };
  return (
    <div className="star_imp_app">
      <div class="login-wrapperWelcome d-flex align-items-center justify-content-center text-center">
        <div class="background-shape"></div>
        <div class="container">
          <div class="row justify-content-center">
            <div className="col-11 col-lg-8 mb-5">
              <div className="logo_comman">
                <img
                  className="big-logo"
                  src="../assets/img/logo1.png"
                  alt=""
                />
              </div>
            </div>
            <div class="col-11 col-lg-8 thankyou_text">
              <h2>WELCOME TO STAR IMPORTERS</h2>
              <p>Our new website is on its way.</p>
              <div
                className="countdown d-flex justify-content-center mb-5"
                data-count="2023/1/1"
              >
                <div className="p-2 border text-white mx-2">
                  <h3>{state.days || "0"}</h3>
                  <h4>D</h4>
                </div>
                <div className="p-2 border text-white mx-2">
                  <h3>{state.hours || "00"}</h3>
                  <h4>H</h4>
                </div>
                <div className="p-2 border text-white mx-2">
                  <h3>{state.minutes || "00"}</h3>
                  <h4>M</h4>
                </div>
                <div className="p-2 border text-white mx-2">
                  <h3>{state.seconds || "00"}</h3>
                  <h4>S</h4>
                </div>
              </div>
              <div className="mt-5 col-12">
                {nt ? (
                  <form className="form-design">
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        required=""
                        className="form-control  welcomeForm2"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        type="email"
                        required=""
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control welcomeForm"
                        placeholder="Enter Email"
                      />
                    </div>
                    <button
                      className="btn btn-dark rounded-0 w-100 border"
                      name="submit"
                      onClick={onSubmit}
                    >
                      Get Notified
                    </button>
                  </form>
                ) : (
                  <div className="text-center text-success fw-bold">
                    <i class="fa-solid fa-circle-check"></i> Your email has been
                    submitted!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppWelcome;
