import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LineWave, RotatingLines, ThreeDots } from "react-loader-spinner";

import "../styles/login.css";
import EyeButton from "../ui/EyeButton";
import myImg from "../assets/Q-removebg-preview.png";
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
          position: "bottom-center",
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
    <div className="bg-[#FEF9C3] flex justify-center items-center h-[100vh]">
      <div className="content w-[90%] min-[350px]:w-[80%] min-[500px]:w-[60%] md:w-[40%] lg:w-[30%] p-4 rounded-md">
        <div className="flex justify-center">
          {/* <video src={myImg} width="150" autoPlay muted /> */}
          <img src={myImg} alt="" width={200} />
        </div>

        {/* <div className="mb-10">
          <h1 className="text-center text-[#FAFAF9] text-xl md:text-2xl font-medium">
            SIGN IN
          </h1>
        </div> */}

        <div className="flex items-center justify-center gap-3 w-full">
          <div className="bg-[#9c4a45] h-0.5 w-[35%] min-[772px]:w-[37%] mt-2"></div>
          <h1 className="text-center text-[#9c4a45] text-xl md:text-2xl w-[30%] min-[772px]:w-[26%]">
            Sign in
          </h1>
          <div className="bg-[#9c4a45] h-0.5 w-[35%] min-[772px]:w-[37%] mt-2"></div>
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
                className="cursor-pointer text-[#a35d59] hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </h1>
          </div>
          <div className="mt-6 relative">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-text bg-[#fdba74]">
                  <span>L</span>
                  <span>O</span>
                  <span>A</span>
                  <span>D</span>
                  <span>I</span>
                  <span>N</span>
                  <span>G</span>
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              </div>
            ) : (
              <button
                className={`btn w-full text-[#fff] ${
                  isLoading ? "border-color" : ""
                }`}
              >
                Login
              </button>
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
            <h1 className="text-center mt-3 text-[#2e2c2c]">
              Not registered?{" "}
              <span
                className="text-[#a35d59] hover:underline cursor-pointer"
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
