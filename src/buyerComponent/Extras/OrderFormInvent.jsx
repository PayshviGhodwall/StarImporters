import axios from "axios";import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { orderFromProducts } from "../../atom";
import { Button } from "rsuite";

const OrderFormInvent = () => {
  const [loader, setLoader] = useState(false);
  axios.defaults.headers.common["x-auth-token-vendor"] =
    localStorage.getItem("vendorLog");
  const [products, setProducts] = useState([]);
  const vendorProducts = `${process.env.REACT_APP_APIENDPOINTNEW}vendor/vendorProducts`;
  const [quantities, setQuantities] = useState([]);
  const orderProducts = useRecoilValue(orderFromProducts);
  const setOrderProducts = useSetRecoilState(orderFromProducts);
  const [selectedProd, setSelectedProd] = useState(orderProducts ?? []);
  let navigate = useNavigate();
  console.log(orderProducts, "recoild");

  useEffect(() => {
    setOrderProducts(selectedProd);
  }, [selectedProd]);

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

  console.log(products, quantities);
  const SetSelection = (id, i, e) => {
    let checked = e.target.checked;
    let prod = [...products];
    prod[i].IsSelected = checked;

    setProducts(prod);
  };

  const SelectFlavours = (id, i, e, uName, flv, bar, comment, index, ind) => {
    let checked = e.target.checked;
    let prod = [...products];
    prod[index].type[ind].IsSelected = checked;
    let found = false;
    setProducts(prod);

    let prods = [...selectedProd];
    let quantity = 1;

    if (checked) {
      // Increase quantity by 1 or add new product
      let foundIndex = prods.findIndex((obj) => obj?.flavourId === i);
      if (foundIndex !== -1) {
        // Create a new object to update quantity
        let updatedProduct = { ...prods[foundIndex] };
        updatedProduct.newQuantity = 1;
        prods[foundIndex] = updatedProduct;
      } else {
        prods.push({
          productId: id,
          flavourId: i,
          unitName: uName,
          flavour: flv,
          barcodes: bar,
          comment: comment,
          quantity: quantity,
        });
      }
      setSelectedProd(prods);
    } else {
      // Decrease quantity by 1 or remove product
      let foundIndex = prods.findIndex((obj) => obj?.flavourId === i);
      if (foundIndex !== -1) {
        // Create a new object to update quantity
        let updatedProduct = { ...prods[foundIndex] };
        updatedProduct.newQuantity -= 1;
        if (updatedProduct.quantity <= 0) {
          // If quantity becomes 0 or less, remove the product
          prods.splice(foundIndex, 1);
        } else {
          prods[foundIndex] = updatedProduct;
        }
        setSelectedProd(prods);
      }
    }
  };

  const handleChange = (id, e) => {
    let value = +e.target.value;
    let selected = [...selectedProd];

    let updatedSelected = selected.map((obj) => {
      if (obj?.flavourId === id) {
        return { ...obj, newQuantity: value }; // Create a new object with updated quantity
      }
      return obj;
    });
    setSelectedProd(updatedSelected);
  };

  const AddinOrder = () => {
    setLoader(true);
    let selected = [...selectedProd];

    let updatedProd = selected.map((itm) => {
      return {
        ...itm,
        quantity: itm.quantity + (itm.newQuantity ? itm.newQuantity : 0),
      };
    });
    console.log(updatedProd);
    setSelectedProd(updatedProd);
    setTimeout(() => {
      navigate("/app/OrderForm/:star");
      setLoader(false);
    }, 5000);
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
                    <Button
                      appearance="primary"
                      loading={loader}
                      className="comman_btn  mb-4"
                      onClick={() => AddinOrder()}
                    >
                      Add In Order list
                    </Button>
                    <div className="table-responsive">
                      <table
                        className="table mb-4"
                        style={{
                          overflowX: "scroll",
                          maxWidth: "99%",
                        }}
                      >
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
                                {item?.unitName}

                                {item?.IsSelected && (
                                  <table
                                    className="table"
                                    style={{
                                      overflow: "visible",
                                    }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>Select</th>
                                        <th>Qty (In Units)</th>

                                        <th>Barcode</th>
                                        <th>Flavor</th>
                                        <th>Promotion</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {item?.type?.map((itm, ind) => (
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
                                                onChange={(e) => {
                                                  SelectFlavours(
                                                    item?._id,
                                                    itm?._id,
                                                    e,
                                                    item?.unitName,
                                                    itm?.flavour,
                                                    itm?.barcode[0],
                                                    item?.promoComment,
                                                    index,
                                                    ind
                                                  );
                                                }}
                                                value=""
                                                id={itm?._id}
                                              />
                                              <label
                                                class="form-check-label"
                                                for={itm?._id}
                                              ></label>
                                            </div>
                                          </td>
                                          <td className="border  ">
                                            <span className="fs-5 ">
                                              <input
                                                type="number"
                                                style={{
                                                  width: "100px",
                                                }}
                                                maxLength="4"
                                                id={itm._id}
                                                disabled={!itm?.IsSelected}
                                                name="price"
                                                defaultValue={1}
                                                className="border text-center  rounded"
                                                onChange={(e) => {
                                                  handleChange(itm?._id, e);
                                                }}
                                              ></input>
                                            </span>
                                          </td>
                                          <td className="border">
                                            {itm?.barcode[0]}
                                          </td>
                                          <td className="border">
                                            {itm?.flavour}
                                          </td>

                                          <td className="border">
                                            {item?.promoComment}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
