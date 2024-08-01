import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const GeneratedQr = () => {
  const apiUrl = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/viewAgent`;

  let { id } = useParams();
  const [user, setUser] = useState([]);
  let location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");
  let profileImage = queryParams?.get("profileImage");
  const QrEmail = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/sendOneCard/`;

  const getUser = async () => {
    const { data } = await axios.get(apiUrl + "/" + id);
    if (!data.error) {
      setUser(data.results?.agent);
      let datas = data?.results.agent?.qrcode;
      document.getElementById("qrImage").src = datas;
    }
  };

  console.log(user);
  useEffect(() => {
    getUser();
  }, []);

  const printDoc = async () => {
    window.print();
  };

  const sendQrEmail = async () => {
    await axios.get(QrEmail + id).then((res) => {
      if (res?.data.error) {
        Swal.fire({
          title: res?.data.message,
          icon: "warning",
          showCloseButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          title: res?.data.message,
          icon: "success",
          showCloseButton: true,
          timer: 3000,
        });
      }
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
        <a
          className="comman_btn mb-2 print_btn"
          // onClick={() => downloadImage()}
          href={user?.visitorCardUrl}
        >
          Download
        </a>
        <button
          className="comman_btn mb-2 mx-2 print_btn"
          onClick={() => printDoc()}
        >
          Print
        </button>
        <a
          target="_blank"
          style={{
            backgroundColor: "#eb3237",
            fontSize: "20px",
            position: "relative",
            top: "-2px",
          }}
          appearance="primary"
          className="comman_btn2 mx-2 print_btn"
          onClick={sendQrEmail}
        >
          Send QR to email
        </a>
        <div
          style={{
            borderRadius: "20px",

            width: "500px",
            border: "1px solid #3e4093",
          }}
          className=" h-100 px-5 py-1 bg-white"
          id="qrDiv"
        >
          <div className="text-center mt-4">
            <div>
              <img
                className=""
                onClick={() =>
                  (window.location.href = "https://www.starimporters.com/")
                }
                src={require("../../../assets/img/logo.png")}
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
            <div className="row mt-3">
              <div className="col-7 mb-3">
                <img
                  className="border mb-2"
                  id="proImage"
                  src={
                    user?.image?.length > 5
                      ? user?.image
                      : require("../../../assets/img/profileDummy.png")
                  }
                  style={{
                    width: "clamp(60px, 50%, 120px)",
                    borderRadius: "12px",
                    maxWidth: "80px",
                    maxHeight: "70px",
                    borderRadius: "100px",
                  }}
                />
              </div>
              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">Status</label>
                <h1 className="fs-6">
                  {user?.status ? "Active" : "In-active"}
                </h1>
              </div>
              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">ACCOUNT TYPE</label>
                <h1 className="fs-6">
                  {user?.subUser ? "Sub-account" : "Main Account"}
                </h1>
              </div>

              <div className="col-6 text-start mb-3">
                <label className="text-danger fw-bold">COMPANY NAME</label>
                <h1 className="fs-6">
                  {" "}
                  {user?.subUser
                    ? user?.subUser?.companyName
                    : user?.user?.companyName}
                </h1>
              </div>

              <div className="col-6 text-end mb-3">
                <label className="text-danger fw-bold">ACCOUNT NUMBER</label>
                <h1 className="fs-6">
                  {" "}
                  {user?.subUser
                    ? user?.subUser?.accountNumber
                    : user?.user?.accountNumber ?? "Not Added"}
                </h1>
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
                  src={user?.qrcode}
                  alt="Qr"
                  id="qrImage"
                  width={140}
                />
              </div>
              <div className="col-12 text-center">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    window.open("https://www.starimporters.com", "_blank");
                  }}
                >
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
