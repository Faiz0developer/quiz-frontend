import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineCheck } from "react-icons/ai";
import { BsShieldLockFill } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "../styles/VerifyOtp.css";
import OTPModel from "../components/model-ui/SuccessfullModel";
// import OTPModel from "../components/OTPModel";

const VerifyOtpPage = () => {
  // const [notResendOTP, setNotResendOTP] = useState(true);
  // const paraRef = useRef()
  const [otpFields, setOtpFields] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const registerDetails = useSelector((state) => state.register);
  console.log(registerDetails);

  const userEmail = registerDetails.email.split("");
  userEmail.splice(3, 15, "*", "*", "*", "*", "*");
  const paddedEmail = userEmail.join("");
  console.log(paddedEmail);

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setOtpFields({ ...otpFields, [name]: value });
  };

  const verifyOTPHandler = async () => {
    const userOtp = {
      otp: `${otpFields.a}${otpFields.b}${otpFields.c}${otpFields.d}${otpFields.e}${otpFields.f}`,
    };

    try {
      const res = await axios.post(
        `http://localhost:3002/auth/verify-registration-otp/${registerDetails.token}`,
        userOtp,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = res;
      if (data.status === "success") {
        setIsVerified(true);
      }
    } catch (error) {
      if (error.response.data.status === "error") {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const resendOTPHandler = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/auth/resend-registration-otp/${registerDetails.token}`
      );

      const { data } = res;
      console.log(data);
      let timer = 150;
      const time = setInterval(() => {
        const min = String(Math.trunc(timer / 60)).padStart(2, 0);
        const sec = String(timer % 60).padStart(2, 0);
        const otptext = document.querySelector(".otp-timer");
        if (otptext) {
          otptext.textContent = `${min}:${sec}`;
        }
        // document.querySelector(".resendOtpButton").disabled = true;
        const disabledButton = document.querySelector(".resendOtpButton");
        if (disabledButton) {
          disabledButton.disabled = true;
        }
        timer--;
        if (timer === 0) {
          clearInterval(time);
          if (otptext) {
            otptext.textContent = "00:00";
          }
          if (disabledButton) {
            disabledButton.disabled = false;
          }
          // document.querySelector(".otp-timer").textContent = "00:00";
          // document.querySelector(".resendOtpButton").disabled = false;
          // setNotResendOTP(false);
        }
      }, 1000);
      if (data.status === "success") {
        toast.success("Email sent", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.response.data.status === "error") {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className="bg-[#155E75]">
      <div className="flex flex-col justify-center items-center px-4 text-[#fff] py-20 gap-6">
        <BsShieldLockFill className="text-[100px]" />
        <div className="p-2">
          <h1 className="text-center text-2xl min-[350px]:text-3xl mb-3">
            OTP Verification
          </h1>
          <p className="text-lg py-2 text-center">
            Enter OTP sent to{" "}
            <span className="font-medium text-[#94A3B8]">{paddedEmail}</span>{" "}
          </p>
        </div>
        <div className="input-container flex gap-2 min-[350px]:gap-4 sm:gap-6 p-2">
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.a}
            name="a"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.b}
            name="b"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.c}
            name="c"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.d}
            name="d"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.e}
            name="e"
          />
          <input
            type="text"
            onChange={inputHandler}
            value={otpFields.f}
            name="f"
          />
        </div>
        <div className="flex flex-col items-center p-3">
          <h3 className="text-[#9CA3AF] text-lg">Didn't recieve an OTP?</h3>
          <div className="flex items-center gap-1 mt-1 w-[170px]">
            <button
              className="resendOtpButton font-medium text-lg text-[#16A34A] px-1"
              onClick={resendOTPHandler}
              // disabled
            >
              Resend OTP?
            </button>
            <p className="otp-timer px-1"></p>
          </div>
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
        <div className="w-1/2 md:w-1/4 relative">
          <button
            className={`btn w-full`}
            onClick={verifyOTPHandler}
          >
            Verify
          </button>
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
      {isVerified && <OTPModel successMessage="Your Account have been created." subTitle="Now login to your account" />}
    </div>
  );
};

export default VerifyOtpPage;