import React from "react";
import { Link } from "react-router-dom";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppMyOrder() {
  return (
    <>
      <div className="star_imp_app">
        <AppHeader />
        <div className="my_order_new">
          <div className="container">
            <div className="row">
              <div className="col-12 mb-3">
                <Link
                  to="/app/order-detail"
                  className="my_orderbox position-relative shadow"
                >
                  <div className="left_part">
                    <div className="status_order d-block">Status: Pending</div>
                    <div className="order_id d-block mb-1">
                      Order ID: <strong>12312</strong>
                    </div>
                    <div className="date_box">
                      Sep 21, 2022 | <span>03:45 PM</span>
                    </div>
                  </div>
                  <div className="items_box">
                    <h2>Items :</h2>
                    <ul className="list-unstyled mb-0">
                      <li>BLVK Frznberry</li>
                      <li>Cherry Pineapple</li>
                      <li>4K's Wraps</li>
                      <li>Elf Bar 5000Puff</li>
                    </ul>
                  </div>
                </Link>
              </div>
              <div className="col-12 mb-3">
                <Link
                  to="/app/order-detail"
                  className="my_orderbox position-relative shadow"
                >
                  <div className="left_part">
                    <div className="status_order d-block">Status: Pending</div>
                    <div className="order_id d-block mb-1">
                      Order ID: <strong>12312</strong>
                    </div>
                    <div className="date_box">
                      Sep 21, 2022 | <span>03:45 PM</span>
                    </div>
                  </div>
                  <div className="items_box">
                    <h2>Items :</h2>
                    <ul className="list-unstyled mb-0">
                      <li>BLVK Frznberry</li>
                      <li>Cherry Pineapple</li>
                      <li>4K's Wraps</li>
                      <li>Elf Bar 5000Puff</li>
                    </ul>
                  </div>
                </Link>
              </div>
              <div className="col-12 mb-3">
                <Link
                  to="/app/order-detail"
                  className="my_orderbox position-relative shadow"
                >
                  <div className="left_part">
                    <div className="status_order d-block">Status: Pending</div>
                    <div className="order_id d-block mb-1">
                      Order ID: <strong>12312</strong>
                    </div>
                    <div className="date_box">
                      Sep 21, 2022 | <span>03:45 PM</span>
                    </div>
                  </div>
                  <div className="items_box">
                    <h2>Items :</h2>
                    <ul className="list-unstyled mb-0">
                      <li>BLVK Frznberry</li>
                      <li>Cherry Pineapple</li>
                      <li>4K's Wraps</li>
                      <li>Elf Bar 5000Puff</li>
                    </ul>
                  </div>
                </Link>
              </div>
              <div className="col-12 mb-3">
                <Link
                  to="/app/order-detail"
                  className="my_orderbox position-relative shadow"
                >
                  <div className="left_part">
                    <div className="status_order d-block">Status: Pending</div>
                    <div className="order_id d-block mb-1">
                      Order ID: <strong>12312</strong>
                    </div>
                    <div className="date_box">
                      Sep 21, 2022 | <span>03:45 PM</span>
                    </div>
                  </div>
                  <div className="items_box">
                    <h2>Items :</h2>
                    <ul className="list-unstyled mb-0">
                      <li>BLVK Frznberry</li>
                      <li>Cherry Pineapple</li>
                      <li>4K's Wraps</li>
                      <li>Elf Bar 5000Puff</li>
                    </ul>
                  </div>
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

export default AppMyOrder;
