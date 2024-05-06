import React, { useEffect, useState } from "react";import html2canvas from "html2canvas";
import { useParams } from "react-router-dom";
import axios from "axios";
const GeneratedQr = () => {
  const api = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/generateQRCode/`;
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getUser`;

  let { id } = useParams();
  const [user, setUser] = useState([]);

  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  const getUser = async () => {
    const res = await axios.post(apiUrl + "/" + id);
    if (!res.data.error) {
      setUser(res.data.results);
    }
  };
  useEffect(() => {
    getUser();
    GetQrCode();
  }, []);

  const GetQrCode = async () => {
    await axios.patch(api + id).then((res) => {
      let data = res?.data?.results.path;
      document.getElementById("qrImage").src = data;
    });
  };

  const captureDiv = async () => {
    const divToCapture = document.getElementById("qrDiv");
    await html2canvas(divToCapture, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png/jpeg");
      const link = document.createElement("a");
      link.download = "divImage.png";
      link.href = imgData;
      link.click();
    });
  };

  return (
    <div
      className=""
      style={{
        padding: "80px",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <button className="comman_btn mb-2 print_btn" onClick={() => captureDiv()}>
          Download
        </button>
        <button className="comman_btn mb-2 mx-2 print_btn" onClick={() => window.print()}>
          Print
        </button>
        <div
          style={{
            borderRadius: "20px",
          }}
          className="card h-100 px-5 py-1 bg-white"
          id="qrDiv"
        >
          <div className="text-center mt-4">
            <div>
              <img
                className=""
                onClick={() =>
                  (window.location.href = "https://www.starimporters.com/")
                }
                src={"https://starimporters-media.s3.amazonaws.com/1710029749556--Star%20Logo%20Tradeshow%202024.png"}
                alt="Company Logo"
                style={{
                  width: "clamp(80px, 50%, 200px)",
                }}
              />
              <h2 className=" mt-2 fw-bold  fs-4 text-center text-dark headOrder">
                Star Importers & Wholesalers
              </h2>
            </div>
          </div>
          <div className=" py-1 px-3 mt-4" style={{ borderRadius: "20px" }}>
            <div className="row">
              <div className="col-6 mb-3">
                {user?.profileImage?.length > 0 && (
                  <img
                    className=""
                    src={user?.profileImage}
                    style={{
                      width: "clamp(60px, 50%, 120px)",
                      borderRadius: "12px",
                    }}
                  />
                )}
              </div>
              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">Status</label>
                <h1 className="fs-6">
                  {user?.status ? "Active" : "Un-active"}
                </h1>
              </div>
              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">COMPANY NAME</label>
                <h1 className="fs-6">{user?.companyName}</h1>
              </div>

              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">ACCOUNT NUMBER</label>
                <h1 className="fs-6">{user?.accountNumber}</h1>
              </div>

              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">MEMBER'S NAME</label>
                <h1 className="fs-6">
                  {user?.firstName + " " + user?.lastName}
                </h1>
              </div>
              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">MEMBER'S CONTACT</label>
                <h1 className="fs-6">{user?.phoneNumber}</h1>
              </div>

              <div className="col-12 mb-3 mt-3  text-center">
                <img
                  className=""
                  onClick={() =>
                    (window.location.href = "https://www.starimporters.com/")
                  }
                  src={require("../../../assets/img/logo.png")}
                  alt="Company Logo"
                  id="qrImage"
                  width={140}
                />
              </div>
              <div className="col-12 text-center">
                <a href="https://www.starimporters.com">
                  www.starimporters.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedQr;
