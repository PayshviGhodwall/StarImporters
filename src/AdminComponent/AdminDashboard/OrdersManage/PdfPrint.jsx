import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PdfPrint = () => {
  const orderView = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/order/getOrderDetail`;
  const [orders, setOrders] = useState([]);
  let id = useParams();
  console.log(id);
  useEffect(() => {
    OrderDetails();
  }, []);

  const OrderDetails = async () => {
    await axios.get(orderView + "/" + id).then((res) => {
      setOrders(res?.data.results);
    });
  };
  return (
    <div>
      <section className="m-0">
        <table
          width="100%"
          style={{ margin: "0 auto", border: 0, borderSpacing: 0 }}
        >
          <tbody>
            <tr>
              <td
                style={{ padding: 0, borderSpacing: 0, verticalAlign: "top" }}
              >
                <table
                  width="100%"
                  style={{ margin: "0 auto", border: 0, borderSpacing: 0 }}
                >
                  <tbody>
                    <tr>
                      <td style={{ paddingBottom: 25 }}>
                        <table
                          width="100%"
                          style={{
                            margin: "0 auto",
                            border: 0,
                            borderSpacing: 0,
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  width: "20%",
                                  textAlign: "start",
                                  borderSpacing: 0,
                                  verticalAlign: "top",
                                }}
                              >
                                <table
                                  width="100%"
                                  style={{
                                    margin: "0 auto",
                                    border: 0,
                                    borderSpacing: 0,
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          color: "#000",
                                          textAlign: "left",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        EIN :{" "}
                                        <span
                                          style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#000",
                                            textAlign: "left",
                                            textTransform: "uppercase",
                                            borderSpacing: 0,
                                          }}
                                        >
                                          {" "}
                                          582113879
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          color: "#000",
                                          textAlign: "left",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        SALES TAX :{" "}
                                        <span
                                          style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#000",
                                            textAlign: "left",
                                            textTransform: "uppercase",
                                            borderSpacing: 0,
                                          }}
                                        >
                                          {" "}
                                          308259392
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          color: "#000",
                                          textAlign: "left",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        STI :{" "}
                                        <span
                                          style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#000",
                                            textAlign: "left",
                                            textTransform: "uppercase",
                                            borderSpacing: 0,
                                          }}
                                        >
                                          {" "}
                                          20009110633
                                        </span>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          color: "#000",
                                          textAlign: "left",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        DID :{" "}
                                        <span
                                          style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            color: "#000",
                                            textAlign: "left",
                                            textTransform: "uppercase",
                                            borderSpacing: 0,
                                          }}
                                        >
                                          {" "}
                                          10146001
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td
                                style={{
                                  width: "60%",
                                  textAlign: "center",
                                  borderSpacing: 0,
                                  verticalAlign: "top",
                                }}
                              >
                                <table
                                  width="100%"
                                  style={{
                                    margin: "0 auto",
                                    border: 0,
                                    borderSpacing: 0,
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 23,
                                          fontWeight: 700,
                                          color: "#000",
                                          textAlign: "center",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        STAR IMPORTERS AND WHOLESALERS INC.{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          color: "#000",
                                          textAlign: "center",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        2166 MOUNTAIN INDUSTRIAL BLVD{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          color: "#000",
                                          textAlign: "center",
                                          textTransform: "uppercase",
                                          paddingBottom: 15,
                                          borderSpacing: 0,
                                        }}
                                      >
                                        {" "}
                                        TUCKER,GA 30084{" "}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td
                                style={{
                                  width: "20%",
                                  textAlign: "end",
                                  borderSpacing: 0,
                                  verticalAlign: "top",
                                }}
                              ></td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "5px 0 8px",
                          border: "2px solid #000",
                          backgroundColor: "#f2f2f2",
                        }}
                      >
                        <table
                          width="100%"
                          style={{
                            margin: "0 auto",
                            border: 0,
                            borderSpacing: 0,
                          }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: 5 }}>
                                <table
                                  width="100%"
                                  style={{
                                    margin: "0 auto",
                                    border: 0,
                                    borderSpacing: 0,
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 20,
                                          fontWeight: 700,
                                          color: "#eb3237",
                                          textAlign: "center",
                                          textTransform: "uppercase",
                                          borderSpacing: 0,
                                        }}
                                      >
                                        - Order Details -
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <table
                                  width="100%"
                                  style={{
                                    margin: "0 auto",
                                    border: 0,
                                    borderSpacing: 0,
                                  }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          width: "20%",
                                          textAlign: "center",
                                          borderSpacing: 0,
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 18,
                                                  fontWeight: 600,
                                                  color: "#000",
                                                  textAlign: "center",
                                                  borderSpacing: 0,
                                                }}
                                              >
                                                {" "}
                                                Packing List :{" "}
                                                <span
                                                  style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#3e4093",
                                                    textAlign: "center",
                                                    borderSpacing: 0,
                                                  }}
                                                >
                                                  M938569
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          width: "20%",
                                          textAlign: "center",
                                          borderSpacing: 0,
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 18,
                                                  fontWeight: 600,
                                                  color: "#000",
                                                  textAlign: "center",
                                                  borderSpacing: 0,
                                                }}
                                              >
                                                {" "}
                                                Account :{" "}
                                                <span
                                                  style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#3e4093",
                                                    textAlign: "center",
                                                    borderSpacing: 0,
                                                  }}
                                                >
                                                  #6618728
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          width: "20%",
                                          textAlign: "center",
                                          borderSpacing: 0,
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 18,
                                                  fontWeight: 600,
                                                  color: "#000",
                                                  textAlign: "center",
                                                  borderSpacing: 0,
                                                }}
                                              >
                                                {" "}
                                                Order Date :{" "}
                                                <span
                                                  style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#3e4093",
                                                    textAlign: "center",
                                                    borderSpacing: 0,
                                                  }}
                                                >
                                                  22/12/2022
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          width: "20%",
                                          textAlign: "center",
                                          borderSpacing: 0,
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 18,
                                                  fontWeight: 600,
                                                  color: "#000",
                                                  textAlign: "center",
                                                  borderSpacing: 0,
                                                }}
                                              >
                                                {" "}
                                                Order Id :{" "}
                                                <span
                                                  style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#3e4093",
                                                    textAlign: "center",
                                                    borderSpacing: 0,
                                                  }}
                                                >
                                                  WOW10002
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          width: "20%",
                                          textAlign: "center",
                                          borderSpacing: 0,
                                          verticalAlign: "top",
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 18,
                                                  fontWeight: 600,
                                                  color: "#000",
                                                  textAlign: "center",
                                                  borderSpacing: 0,
                                                }}
                                              >
                                                {" "}
                                                Total Product :{" "}
                                                <span
                                                  style={{
                                                    fontSize: 18,
                                                    fontWeight: 700,
                                                    color: "#3e4093",
                                                    textAlign: "center",
                                                    borderSpacing: 0,
                                                  }}
                                                >
                                                  3
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: 25 }}>
                        <table
                          width="100%"
                          style={{
                            margin: "0 auto",
                            border: 0,
                            borderSpacing: 0,
                          }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ paddingBottom: 15 }}>
                                <table
                                  className="table"
                                  width="100%"
                                  style={{
                                    margin: "0 auto",
                                    border: 0,
                                    borderSpacing: 0,
                                  }}
                                >
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontSize: 18,
                                          fontWeight: 600,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        Part Number
                                      </th>
                                      <th
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontSize: 18,
                                          fontWeight: 600,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        Image
                                      </th>
                                      <th
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontSize: 18,
                                          fontWeight: 600,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        Description
                                      </th>
                                      <th
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontSize: 18,
                                          fontWeight: 600,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        Ordered
                                      </th>
                                      <th
                                        style={{
                                          backgroundColor: "#f2f2f2",
                                          fontSize: 18,
                                          fontWeight: 600,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        Pick Qty
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        E-PART OOZE TWIST BATTERY DISPLAY 24CT -
                                        PRE HEAT (YELLOW) 1/12
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        24
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        E-PART OOZE TWIST SLIM PEN 320MAH
                                        BATTERY 1CT ASSORTED COLOR 1/50/300
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        1,000
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        LGT 1CT EAGLE TORCH PT101N SINGLE ANGLE
                                        1/15/180
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        360
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        <table
                                          width="100%"
                                          style={{
                                            margin: "0 auto",
                                            border: 0,
                                            borderSpacing: 0,
                                          }}
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  textAlign: "start",
                                                  color: "#000",
                                                }}
                                              >
                                                {" "}
                                                857493007265
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        LGT 1CT EAGLE TORCH PT116BN SINGLE ANGLE
                                        NEON 1/20/400
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        800
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        814859012301
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        SCALE AWS-600 600X0.1g 1/50
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        100
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        814859012301
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        SCALE AWS-600 600X0.1g 1/50
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        100
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        814859012301
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        SCALE AWS-600 600X0.1g 1/50
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        100
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        814859012301
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        SCALE AWS-600 600X0.1g 1/50
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        100
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderBottom: 0,
                                        }}
                                      >
                                        {" "}
                                        814859012301
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          borderBottom: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        SCALE AWS-600 600X0.1g 1/50
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      >
                                        100
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                          borderBottom: 0,
                                        }}
                                      />
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                        }}
                                      />
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: 12,
                                          borderLeft: 0,
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {" "}
                                        <span
                                          style={{
                                            display: "block",
                                            backgroundColor: "#f2f2f2",
                                            borderRadius: 10,
                                            padding: "17px 20px",
                                          }}
                                        >
                                          <img
                                            style={{
                                              display: "block",
                                              maxWidth: 55,
                                              margin: "0 auto",
                                            }}
                                            src="product.png"
                                            alt=""
                                          />
                                        </span>{" "}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "start",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                        }}
                                      >
                                        SHIPPING &amp; HANDLEING/SAIA2127633
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                        }}
                                      >
                                        1
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 500,
                                          textAlign: "center",
                                          color: "#000",
                                          border: "2px solid #000",
                                          padding: "10px 20px",
                                          borderLeft: 0,
                                        }}
                                      />
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PdfPrint;
