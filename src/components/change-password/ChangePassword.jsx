import React, { useState } from "react";
import ChangePasswordInput from "./ChangePasswordInput";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const [changePasswordDetails, setChangePasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setChangePasswordDetails({ ...changePasswordDetails, [name]: value });
  };

  const changePasswordHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(
        "http://localhost:3002/user/changepassword",
        changePasswordDetails,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
      if (res.data.status === "success") {
        setChangePasswordDetails({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/create-new-quiz");
        }, 3000);
      }
    } catch (error) {
      const { data } = error.response;
      console.log(data);
      if (error.response.data.status === "error") {
        toast.error(
          `${
            data.data.length ? data.data[0].msg : error.response.data.message
          }`,
          {
            position: "top-center",
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
      }
    }
  };

  return (
    // <div className="px-10 py-12">
    <div className="pass-content">
      <div className="left-container">
        <h1 className="">Change Password</h1>
        <p className="">Password must contain:</p>
        <ul className="text-[#6B7280]">
          <li>At least 8 characters</li>
          <li>At least 1 uppercase letter (A-Z)</li>
          <li>At least 1 lowercase letter (a-z)</li>
          <li>At least 1 number (0-9)</li>
          <li>At least 1 special character (@,#,*,$,&)</li>
        </ul>
      </div>
      <div className="right-container">
        <ChangePasswordInput
          placeholder="Current Password"
          name="currentPassword"
          value={changePasswordDetails.currentPassword}
          onChange={inputHandler}
        />
        <ChangePasswordInput
          placeholder="New Password"
          name="newPassword"
          value={changePasswordDetails.newPassword}
          onChange={inputHandler}
        />
        <ChangePasswordInput
          placeholder="Re-type New Password"
          name="confirmPassword"
          value={changePasswordDetails.confirmPassword}
          onChange={inputHandler}
        />
        <div className="mt-6 relative">
          <button
            className="btn w-full text-[#fff]"
            onClick={changePasswordHandler}
          >
            Save
          </button>
          {isLoading && (
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
          )}
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
        <h2 className="text-center text-[#475569]">
          <span
            className="cursor-pointer hover:text-[#991B1B]"
            onClick={() => navigate("/create-new-quiz")}
          >
            Cancel
          </span>
        </h2>
      </div>
    </div>
    // </div>
  );
};

export default ChangePassword;
