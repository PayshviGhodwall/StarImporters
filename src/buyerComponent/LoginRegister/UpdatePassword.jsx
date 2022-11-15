import React,{useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";



const UpdatePassword = (otpEmail) => {
  const navigate = useNavigate();

  const apiUrl =  `${process.env.REACT_APP_APIENDPOINTNEW}user/updatePassword`
  let email = otpEmail?.otpEmail;
  const[error,setError] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit =  (data) => {
    const password = data.password
if(data.Npassword !== data.password){
   setError("Password Does'nt Match")
}
else if(data.Npassword === password){
  setError("")
  axios.post(apiUrl,{
    email,
    password
    
  })
  .then((res)=>{
    if (res?.data.message === "Password Updated Successfully") {
      Swal.fire({
        title: "Your Password Updated Successfully",
        text: "",
        icon: "success",
        showCloseButton: true,
        focusConfirm: false,
        
      })
      setTimeout(() => {
        navigate("/")
        window.location.reload()
         
        }, 1000);
    }
  })

   
}


  }

  return (
    <div>
      <div className="row align-items-center justify-content-center text-center">
        <div className="col-md-8">
          <div className="comman_modal_heading">
            <h2 className="fs-2 fw-bold">Reset Your Password</h2>
            <p>Create a new password</p>
            <p>{error}</p>
          </div>
          <form className="forms_modal_content form-design"
          onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-floating mb-4">
              <input
                type="text"
                className="form-control shadow-none border border-secondary"
                id="floatingPassword"
                placeholder="New Password"
                name="Npassword"
                {...register("Npassword", {
                  required: "Enter Your Password",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                  },
                })}
              />
              {errors.Npassword && (
                <small className="errorText mx-1 fw-bold">
                  {errors.Npassword?.message}
                </small>
              )}
              <label htmlFor="floatingPassword" className="mx-2 fw-bolder">New Password</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control shadow-none border border-secondary"
                id="floatingPassword"
                placeholder="New Password"
                name="password"
                {...register("password", {
                  required: "Enter Your Password",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be 8 characters including one uppercase letter, one special character and alphanumeric characters",
                  },
                })}
              />
              {errors.password && (
                <small className="errorText mx-1 fw-bold">
                  {errors.password?.message}
                </small>
              )}
              <label htmlFor="floatingPassword" className="mx-2 fw-bolder">Confirm New Password</label>
            </div>
            <div className="form-group">
              <button href="javscript:;" type="submit" className="comman_btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
