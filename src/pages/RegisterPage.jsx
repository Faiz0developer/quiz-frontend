import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import EyeButton from "../ui/EyeButton";
import myImg from "../assets/quiz4.mp4";
import { useDispatch } from "react-redux";
import { userRegister } from "../store/slice/registerSlice";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [userFields, setUserFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserFields({ ...userFields, [name]: value });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        userFields.name !== "" ||
        userFields.email !== "" ||
        userFields.password !== "" ||
        userFields.confirmPassword !== ""
      ) {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:3002/auth/",
          userFields,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = res;
        setIsLoading(false);
        if (data.status === "success") {
          let timer = 150;
          const time = setInterval(() => {
            const min = String(Math.trunc(timer / 60)).padStart(2, 0);
            const sec = String(timer % 60).padStart(2, 0);
            const otptext = document.querySelector(".otp-timer");
            if (otptext) {
              otptext.textContent = `${min}:${sec}`;
            }
            const disabledButton = document.querySelector(".resendOtpButton");
            if (disabledButton) {
              disabledButton.disabled = true;
            }
            // document.querySelector(".otp-timer").textContent = `${min}:${sec}`;
            // document.querySelector(".resendOtpButton").disabled = true;
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
            }
          }, 1000);
          dispatch(userRegister(data));
          navigate("/verify-user");
        }
      }
    } catch (error) {
      console.log(error);
      const { data } = error.response.data;
      if (error.response.data.status === "error") {
        toast.error(`${data[0].msg}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setIsLoading(false);
      }
    }
  };
  return (
    <div className="bg-[#155E75] flex justify-center  items-center h-[100vh]">
      <div className=" w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%] p-4 rounded-md">
        <div className="flex flex-col items-center">
          <video src={myImg} width="150" autoPlay muted />
        </div>

        <div className="mb-10">
          <h1 className="text-center text-[#FAFAF9] text-xl md:text-2xl font-medium">
            CREATE ACCOUNT
          </h1>
        </div>
        
        <form onSubmit={signUpHandler}>
          <div className="inputs flex flex-col gap-4 mt-8">
            <input
              type="text"
              placeholder="name"
              className="text-[#fff]"
              onChange={inputHandler}
              value={userFields.name}
              name="name"
            />
            <input
              type="email"
              placeholder="email"
              className="text-[#fff]"
              onChange={inputHandler}
              value={userFields.email}
              name="email"
            />
            <EyeButton
              placeholder="Password"
              onChange={inputHandler}
              value={userFields.password}
              name="password"
            />
            <EyeButton
              placeholder="Confirm Password"
              onChange={inputHandler}
              value={userFields.confirmPassword}
              name="confirmPassword"
            />
          </div>
          <div className="mt-8 relative">
            <button className="btn w-full text-[#fff]">Create Account</button>
            {isLoading ? (
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
            <h1 className="text-center mt-4 text-[#FFF]">
              Have already an account?{" "}
              <span
                className="text-[#94A3B8] hover:underline cursor-pointer hover:text-[#FECACA]"
                onClick={() => navigate("/")}
              >
                {" "}
                Login here!
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;