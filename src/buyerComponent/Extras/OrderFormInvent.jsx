import axios from "axios";import React, { useEffect, useState } from "react";
const OrderFormInvent = () => {
  axios.defaults.headers.common["x-auth-token-vendor"] =
    localStorage.getItem("vendorLog");
  const [products, setProducts] = useState([]);
  const vendorProducts = `${process.env.REACT_APP_APIENDPOINTNEW}vendor/vendorProducts`;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async (key) => {
    try {
      const response = await axios.get(vendorProducts, {
        search: key,
      });
      let data = response?.data.results.products;
      setProducts(data);
    } catch (error) {
      // Handle errors
      console.error("Error fetching products:", error);
    }
  };

  console.log(products);
  const SetSelection = (id, i, e) => {
    let checked = e.target.checked;
    let prod = [...products];
    prod[i].IsSelected = checked;

    setProducts(prod);
  };

  return (
    <div>
      <div className="">
        <div className="container marginTop p-4">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <form className=" mt-3 bg-white p-4 mb-5 shadow">
                <div className="row">
                  <div>
                    <table className="table mb-4">
                      <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                          <th>Select</th>

                          <th>Product Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(products || [])?.map((item, index) => (
                          <tr key={index} className="border ">
                            <td className=" d-flex justify-content-center">
                              <div class="form-check">
                                <input
                                  style={{
                                    width: "1.5rem",
                                    height: "1.5rem",
                                  }}
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  onChange={(e) => {
                                    SetSelection(item?._id, index, e);
                                  }}
                                  id="flexCheckDefault"
                                />
                                <label
                                  class="form-check-label"
                                  for="flexCheckDefault"
                                ></label>
                              </div>
                            </td>
                            <td className="border">
                              {item?.product?.unitName}

                              {item?.IsSelected && (
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Select</th>
                                      <th>Flavor</th>
                                      <th>Qnty (In Units)</th>
                                      <th>Promotion</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item?.type?.map((itm) => (
                                      <tr>
                                        <td>
                                          <div class="form-check">
                                            <input
                                              style={{
                                                width: "1.5rem",
                                                height: "1.5rem",
                                              }}
                                              class="form-check-input"
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              class="form-check-label"
                                              for="flexCheckDefault"
                                            ></label>
                                          </div>
                                        </td>
                                        <td className="border">
                                          {itm?.flavour}
                                        </td>
                                        <td className="border  ">
                                          <span className="fs-5 ">
                                            <input
                                              type="number"
                                              style={{
                                                width: "100px",
                                              }}
                                              maxLength="4"
                                              name="price"
                                              defaultValue={1}
                                              className="border text-center bg-light rounded"
                                              // onChange={(e) => {
                                              //   handleChange(item?.flavourId, e);
                                              // }}
                                            ></input>
                                          </span>
                                        </td>
                                        <td className="border">
                                          {item?.comment}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </td>

                            {/* <td className="border text-danger">
                              {" "}
                              <a
                                onClick={() =>
                                  removeProduct(
                                    item?.productId,
                                    item?.flavourId
                                  )
                                }
                              >
                                Remove
                              </a>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* {products?.length > 0 && (
                    <div className="col-12 text-center mb-2 ">
                      <Button
                        appearance="primary"
                        className="comman_btn mx-2 fw-bold d-none"
                        id="resetBtn"
                        type="reset"
                        style={{ backgroundColor: "#3e4093", color: "#fff" }}
                      >
                        Cancel
                      </Button>
                      <Button
                        loading={loader}
                        appearance="primary"
                        className="comman_btn mx-2 fw-bold"
                        type="submit"
                        style={{ backgroundColor: "#3e4093", color: "#fff" }}
                      >
                        Create Order
                      </Button>
                    </div>
                  )} */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderFormInvent;
