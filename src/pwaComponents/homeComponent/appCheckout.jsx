import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AppFooter from "./appFooter";
import AppHeader from "./appHeader";

function AppCheckout() {
  const userApi = `${process.env.REACT_APP_APIENDPOINTNEW}user/getUserProfile`;
  const newOrder = `${process.env.REACT_APP_APIENDPOINTNEW}user/order/newOrder`;
  const [users, setUsers] = useState();
  const [delevryChoice, setDelevryChoice] = useState("In-Store Pickup");
  useEffect(() => {
    const getUser = async () => {
      await axios.get(userApi).then((res) => {
        console.log(res);
        setUsers(res?.data.results);
      });
    };
    getUser();
  }, []);
  const createOrder = async()=>{
    
    if(delevryChoice == "Shipment"){
      await axios.post(newOrder,{
        type:"Shipment",
        address:users?.addressLine[0] + users?.addressLine[1]
        
       }).then((res)=>{
        if (!res.error) {
          console.log(res?.data.message)
        }
       })
    }
    else if(delevryChoice == "Delivery") {
      await axios.post(newOrder,{
        type:"Delivery",
        address:users?.addressLine[0] + users?.addressLine[1]
        

       }).then((res)=>{
        if (!res.error) {
          console.log(res?.data.message)
        }
       })
    }
    else if(delevryChoice == "In-Store Pickup") {
      await axios.post(newOrder,{
        type:"In-Store Pickup",
        address:users?.addressLine[0] + users?.addressLine[1]

       }).then((res)=>{
        if (!res.error) {
          console.log(res?.data.message)
        }
       })
    }
   
  }
  
  console.log(users?.state);
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
                      <div class="data-content">
                        {users?.firstName + " " + users?.lastName}
                      </div>
                    </div>
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-envelope"></i>
                        <span>Email Address</span>
                      </div>
                      <div class="data-content">{users?.email}</div>
                    </div>
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-phone"></i>
                        <span>Phone</span>
                      </div>
                      <div class="data-content">{users?.phoneNumber}</div>
                    </div>

                    {
                      delevryChoice == "Shipment" || delevryChoice == "Delivery" ?
                      <div class="single-profile-data d-flex align-items-center justify-content-between">
                      <div class="title d-flex align-items-center">
                        <i class="fa-solid fa-location-crosshairs"></i>
                        
                        <span className="mt-0">Shipping Address</span>
                      </div>
                      <div class="data-content">
                        {users?.addressLine +
                          "," +
                          users?.state +
                          "-" +
                          users?.zipcode}
                      </div>
                    </div>
                    :
                    <div class="single-profile-data d-flex align-items-center justify-content-between">
                    <div class="title  ">
                      <i class="fa-solid fa-location-crosshairs"></i>
                      
                      <span className="mt-0">Store Address</span>
                    </div>
                    <div class="data-content">
                      <p>
                      <p className="mb-0">
                       2166 Mountain Industrial Blvd.
                      GA, United States,
                      Georgia,
                      78548962
                    </p>
                    
                      </p>
                    </div>
                  </div>
                    }
                   
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
                      {users?.state == "Georgia" ? (
                        <ul class="ps-0">
                          <li>
                            <input
                              id="fastShipping"
                              type="radio"
                              name="selector"
                              onClick={() => {
                                setDelevryChoice("In-Store Pickup");
                              }}
                              defaultChecked="true"
                            />
                            <label for="fastShipping">
                              In-Store Pickup{" "}
                              <span>1 days delivery  </span>
                            </label>
                            <div class="check"></div>
                          </li>
                          <li>
                            <input
                              id="normalShipping"
                              type="radio"
                              name="selector"
                              onClick={() => {
                                setDelevryChoice("Delivery");
                              }}
                            />
                            <label for="normalShipping">
                              Delivery <span>1-2 days delivery</span>
                            </label>
                            <div class="check"></div>
                          </li>
                        </ul>
                      ) : (
                        <ul class="ps-0">
                          <li>
                            <input
                              id="fastShipping"
                              type="radio"
                              name="selector"
                              onClick={() => {
                                setDelevryChoice("In-Store Pickup");
                              }}
                              defaultChecked="true"
                            />
                            <label for="fastShipping">
                              In-Store Pickup{" "}
                              <span>1 days delivery</span>
                            </label>
                            <div class="check"></div>
                          </li>
                          <li>
                            <input
                              id="courier"
                              type="radio"
                              name="selector"
                              onClick={() => {
                                setDelevryChoice("Shipment");
                              }}
                            />
                            <label for="courier">
                              Shipment <span>5-8 days delivery</span>
                            </label>
                            <div class="check"></div>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
               
                <Link class="comman_btn mt-3" to="/app/thankyou" onClick={createOrder}  >
                  Place Order
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
