import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

import "../styles/login.css";
import EyeButton from "../ui/EyeButton";
import myImg from "../assets/quiz4.mp4";
import axios from "axios";
import { setToken } from "../store/slice/tokenSlice";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      if (userDetails.email !== "" || userDetails.password !== "") {
        setIsLoading(true);
        const res = await axios.post(
          "http://localhost:3002/auth/login",
          userDetails,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const { data } = res;
        setIsLoading(false);
        if (data.status === "success") {
          dispatch(setToken(data.data.token));
          navigate("/");
        }
      } else {
        toast.error("All fields are mandatory", {
          position: "bottom-left",
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
      console.log(error.response.data);
      const { data } = error.response.data;
      if (error.response.data.status === "error") {
        toast.error(
          `${
            Object.keys(data).length === 0
              ? error.response.data.message
              : data[0].msg
          }`,
          {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setIsLoading(false);
        if (
          error.response.data.message.startsWith("Your") &&
          error.response.data.message.endsWith("instructions")
        ) {
          setTimeout(() => {
            navigate("/activate-account");
          }, 5000);
        }
      }
    }
  };

  return (
    <div className="bg-[#155E75] flex justify-center items-center h-[100vh]">
      <div className="content w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%] p-4 rounded-md">
        <div className="flex justify-center mb-10">
          <video src={myImg} width="150" autoPlay muted />
        </div>

        {/* <div className="mb-10">
          <h1 className="text-center text-[#FAFAF9] text-xl md:text-2xl font-medium">
            SIGN IN
          </h1>
        </div> */}

        <div className="flex items-center justify-center gap-3 w-full">
          <div className="bg-[#FAFAF9] h-0.5 w-[35%] min-[772px]:w-[37%] mt-2"></div>
          <h1 className="text-center text-[#FAFAF9] text-xl md:text-2xl w-[30%] min-[772px]:w-[26%]">
            Sign in
          </h1>
          <div className="bg-[#FAFAF9] h-0.5 w-[35%] min-[772px]:w-[37%] mt-2"></div>
        </div>

        <form onSubmit={loginHandler}>
          <div className="inputs flex flex-col gap-4 mt-12">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={changeHandler}
                value={userDetails.email}
                className={`input mb-3 text-[#fff] ${
                  userDetails.email === "" && isEmailTouched && "input-error"
                }`}
                // className="input mb-3 text-[#fff]"
                onFocus={() => setIsEmailTouched(false)}
                onBlur={() => setIsEmailTouched(true)}
              />
              {userDetails.email === "" && isEmailTouched && (
                <p className="error ">
                  Email must not be empty and must contain @!
                </p>
              )}
            </div>
            <div className="relative">
              <EyeButton
                placeholder="Password"
                onChange={changeHandler}
                value={userDetails.password}
                name="password"
                onFocus={() => setIsPasswordTouched(false)}
                onBlur={() => setIsPasswordTouched(true)}
              />
              {userDetails.password === "" && isPasswordTouched && (
                <p className="error ">Password field must not be empty!</p>
              )}
            </div>
            {/* </div> */}
            {/* <div className="pt-1.5"> */}
            <h1
              className="text-right"
              // onClick={() => navigate("/forgot-password")}
            >
              <span
                className="cursor-pointer text-[#94A3B8] hover:underline hover:text-[#FECACA]"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </h1>
          </div>
          <div className="mt-6 relative">
            <button
              className={`btn w-full text-[#fff] ${
                isLoading ? "border-color" : ""
              }`}
            >
              Login
            </button>
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
            <h1 className="text-center mt-3 text-[#FFF]">
              Not Registred?{" "}
              <span
                className="text-[#94A3B8] hover:underline cursor-pointer hover:text-[#FECACA]"
                onClick={() => navigate("/user-register")}
              >
                {" "}
                Create an account!
              </span>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
