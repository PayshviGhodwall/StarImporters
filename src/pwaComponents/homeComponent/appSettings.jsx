import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppSettings() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="page-content-wrapper">
          <div className="container">
            <div className="settings-wrapper py-3">
              <div className="card settings-card">
                <div className="card-body">
                  <div className="single-settings d-flex align-items-center justify-content-between">
                    <div className="title">
                      <i className="fa-solid fa-shield"></i>
                      <span>Privacy Policy</span>
                    </div>
                    <div className="data-content">
                      <Link to="/app/privacy-policy">
                        View<i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card settings-card">
                <div className="card-body">
                  <div className="single-settings d-flex align-items-center justify-content-between">
                    <div className="title">
                      <i className="fas fa-file-contract"></i>
                      <span>Term & Condition</span>
                    </div>
                    <div className="data-content">
                      <Link to="/app/term-condition">
                        View<i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card settings-card">
                <div className="card-body">
                  <div className="single-settings d-flex align-items-center justify-content-between">
                    <div className="title">
                      <i className="fa fa-info-circle" aria-hidden="true"></i>

                      <span>About Us</span>
                    </div>
                    <div className="data-content">
                      <Link to="/app/about-us">
                        View<i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card settings-card">
                <div className="card-body">
                  <div className="single-settings d-flex align-items-center justify-content-between">
                    <div className="title">
                      <i className="fa-solid fa-key"></i>
                      <span>
                        Password<span></span>
                      </span>
                    </div>
                    <div className="data-content">
                      <Link to="/app/change-password">
                        Change<i className="fa-solid fa-angle-right"></i>
                      </Link>
                    </div>
                  </div>
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

export default AppSettings;
