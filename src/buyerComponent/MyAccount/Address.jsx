import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";

const Address = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("UserData"));
    setUsers(data);
  }, []);

  return (
    <div className="main_myaccount">
      <div class="myacct_data_inner">
        <div class="row">
          <div class="col-12 data_head mb-4">
            <h2>Address Book</h2>
          </div>
          <div class="col-12">
            <div class="addrees_box">
              <p>
                {" "}
                {users?.addressLine1 +
                  " " +
                  users?.addressLine2 +
                  " " +
                  users?.city +
                  " " +
                  users?.state +
                  "-" +
                  users?.zipcode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
