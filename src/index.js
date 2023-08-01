import React from "react";
import App from "./App";
import "@coreui/coreui/dist/css/coreui.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "swiper/css/bundle";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom";
// import { render } from "react-dom"; // add this

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
