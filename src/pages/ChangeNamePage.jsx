import React, { useState } from "react";

import img from "../assets/quizLogo.png";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

const ChangeNamePage = () => {
  const [isNameTouched, setIsNameTouched] = useState(false)
  const [isLaoding, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const [newName, setNewName] = useState({
    name: "",
  });
  const changeNameHandler = async () => {
    try {
      if (newName.name !== "") {
        setIsLoading(true);
        const res = await axios.put("http://localhost:3002/user", newName, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        if (res.data.status === "success") {
          toast.success(res.data.message, {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/");
          }, 4000);
        }
      }else{
        toast.error("Please a provide name!", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="password-container">
      <div className="bg-[#155E75] px-5">
        <img src={img} alt="" width={80} />
      </div>
      <div className="flex flex-col items-center py-24 mt-10 bg-[#94A3B8]">
        <h1 className="text-center text-4xl md:text-5xl my-4 py-4 h-24">
          Change your name
        </h1>
        <div className="relative w-[75%] min-w-[470px]:w-[60%] sm:w-1/2">
        <input
          type="text"
          className={`option-input inputFocus w-full ${newName.name === "" && isNameTouched && "input-error"}`}
          placeholder="New Name"
          onChange={(e) => setNewName({ name: e.target.value })}
          value={newName.name}
          onFocus={() => setIsNameTouched(false)}
          onBlur={() => setIsNameTouched(true)}
        />
        {newName.name === "" && isNameTouched && (
        <p className="error mt-1 h-12">Field must not be empty!</p>
      )}
        </div>

        <div className="mt-6 relative w-[75%] min-w-[470px]:w-[60%] sm:w-1/2">
          <button
            className="btn w-full text-[#fff]"
            onClick={changeNameHandler}
          >
            Save
          </button>
          {isLaoding && (
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
        <h2 className="text-center text-[#475569] mt-2">
          <span
            className="cursor-pointer hover:text-[#991B1B]"
            onClick={() => navigate("/")}
          >
            Cancel
          </span>
        </h2>
      </div>
    </div>
  );
};

export default ChangeNamePage;
