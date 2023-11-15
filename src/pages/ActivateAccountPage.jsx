import React, { useState } from "react";
import { BsShieldLockFill } from "react-icons/bs";
import EyeButton from "../ui/EyeButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
// import { useNavigate } from "react-router-dom";
import OTPModel from "../components/model-ui/SuccessfullModel";

const ActivateAccountPage = () => {
  const [activationDetails, setActivationDetails] = useState({
    email: "",
    key: "",
  });

  const [isActivating, setIsActivating] = useState(false);
  const [isActivate, setIsActivate] = useState(false);

  // const navigate = useNavigate();

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setActivationDetails({ ...activationDetails, [name]: value });
  };

  const activateAccountHandler = async () => {
    try {
      setIsActivating(true);
      const res = await axios.post(
        "http://localhost:3002/auth/activateaccount",
        activationDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = res;
      setIsActivating(false);
      if (data.status === "success") {
        setIsActivate(true);
        // navigate("/");
      }
    } catch (error) {
      const { data } = error.response;
      if (data.status === "error") {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsActivating(false);
      }
    }
  };
  return (
    <div className="bg-[#155E75] flex justify-center items-center ">
      <div className="px-4 text-[#fff] py-28 w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%]">
        <div className="flex justify-center mb-10">
          <BsShieldLockFill className="text-[100px]" />
        </div>
        <div className="p-2 mt-4">
          <h1 className="text-center text-2xl min-[500px]:text-3xl mb-3">
            Activate Your Account
          </h1>
        </div>
        <div className="inputs flex flex-col gap-6 py-6 ">
          <input
            type="email"
            onChange={inputHandler}
            value={activationDetails.email}
            name="email"
            placeholder="Email"
          />
          <EyeButton
            placeholder="Key"
            onChange={inputHandler}
            value={activationDetails.key}
            name="key"
          />
        </div>
        <div className="relative flex justify-center mt-8">
          <button className={`btn w-full`} onClick={activateAccountHandler}>
            Activate Account
          </button>
          {isActivating ? (
            <div className="loader">
              <RotatingLines
                strokeColor="grey"
                // strokeColor="#064E3B"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </div>
          ) : (
            ""
          )}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
      {isActivate && (
        <OTPModel
          successMessage="Account has been activated."
          subTitle="Now login to your account"
          optionalMessage = 'Now you have one more try for login. If again failed, account will be blocked for 24 hours'
        />
      )}
    </div>
  );
};

export default ActivateAccountPage;
