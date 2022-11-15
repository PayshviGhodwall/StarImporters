import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppCheckout() {
  return (
    <>
      <div class="star_imp_app">
        <AppHeader />
        <div class="page-content-wrapper">
          <div class="container">
            <div class="checkout-wrapper-area py-3">
              <div class="billing-information-card mb-3">
                <div class="card billing-information-title-card ">
                  <div class="card-body">
                    <h6 class="text-center mb-0 text-white">
                      Billing Information
                    </h6>
                  </div>
                </div>
                <div class="card user-data-card">
                  <div class="card-body">
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-user"></i>
                        <span>Full Name</span>
                      </div>
                      <div class="data-content">Ajay Sharma</div>
                    </div>
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-envelope"></i>
                        <span>Email Address</span>
                      </div>
                      <div class="data-content">Ajay@example.com</div>
                    </div>
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-phone"></i>
                        <span>Phone</span>
                      </div>
                      <div class="data-content">+880 000 111 222</div>
                    </div>
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-location-crosshairs"></i>
                        <span>Shipping Address</span>
                      </div>
                      <div class="data-content">28/C Green Road, BD</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="shipping-method-choose mb-3">
                <div class="card shipping-method-choose-title-card">
                  <div class="card-body">
                    <h6 class="text-center mb-0 text-white">
                      Shipping Method Choose
                    </h6>
                  </div>
                </div>
                <div class="card shipping-method-choose-card">
                  <div class="card-body">
                    <div class="shipping-method-choose">
                      <ul class="ps-0">
                        <li>
                          <input
                            id="fastShipping"
                            type="radio"
                            name="selector"
                            checked
                          />
                          <label for="fastShipping">
                            In-Store Pickup{" "}
                            <span>1 days delivary for $1.0</span>
                          </label>
                          <div class="check"></div>
                        </li>
                        <li>
                          <input
                            id="normalShipping"
                            type="radio"
                            name="selector"
                          />
                          <label for="normalShipping">
                            Delivery <span>3-7 days delivary for $0.4</span>
                          </label>
                          <div class="check"></div>
                        </li>
                        <li>
                          <input id="courier" type="radio" name="selector" />
                          <label for="courier">
                            Shipment <span>5-8 days delivary for $0.3</span>
                          </label>
                          <div class="check"></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Link class="comman_btn mt-3" to="/app/thankyou">
                  Procced
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default AppCheckout;
