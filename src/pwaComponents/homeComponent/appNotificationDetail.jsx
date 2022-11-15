import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppNotificationDetail() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="notification-area pt-3 pb-2">
              <div className="list-group-item d-flex py-3">
                <span className="noti-icon">
                  <i className="fa-solid fa-check"></i>
                </span>
                <div className="noti-info">
                  <h6>Suha just uploaded a new product!</h6>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Vero laboriosam nihil magnam accusantium sint voluptatibus
                    illo earum corporis similique libero praesentium excepturi
                    nostrum eos soluta, cum, quis quo perferendis in?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AppFooter />
      </div>
    </>
  );
}

export default AppNotificationDetail;
