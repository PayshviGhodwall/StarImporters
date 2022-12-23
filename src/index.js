import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "swiper/css/bundle";
import { RecoilRoot } from "recoil";
import { render } from "react-dom"; // add this
const root = ReactDOM.createRoot(document.getElementById("root"));

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      </RecoilRoot>
  </React.StrictMode>,  
  document.getElementById("root")
);
