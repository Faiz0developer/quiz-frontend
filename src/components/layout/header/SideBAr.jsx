import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  MdKey,
  MdOutlineDoNotDisturbOn,
  MdOutlineFavorite,
  MdOutlinePowerSettingsNew,
  MdOutlineSettings,
} from "react-icons/md";

import "../../../styles/sidebar.css";
import myImg from "../../../assets/quizLogo.png";
import SidebarMenu from "../../ui/SidebarMenu";
import { setToken } from "../../../store/slice/tokenSlice";
import LogoutModel from "../../LogoutModel";
// import LogoutModel from "../../LogoutModel";

const SideBAr = ({ setIsSideBarVisibe, isSideBarVisibe, setLoggingOut }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  // const [loggingOut, setLoggingOut] = useState(false);
  const [onLogout, setOnLogout] = useState(false);
  const [onDeactivate, setOnDeactivate] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const clickHandler = (flag) => {
    if (flag === "name") {
      navigate("/change-name");
      setIsSideBarVisibe(false);
    } else if (flag === "password") {
      navigate("/change-password");
      setIsSideBarVisibe(false);
    } else if (flag === "logout") {
      setOnLogout(true);
    } else if (flag === "deactivate") {
      setOnDeactivate(true);
    }
  };

  const logoutHandler = async () => {
    setIsSideBarVisibe(false);
    try {
      setLoggingOut(true);
      const res = await axios.post(
        "http://localhost:3002/user/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoggingOut(false);
      if (res.data.status === "success") {
        dispatch(setToken(""));
        // setTimeout(() => {
          navigate("/");
        // }, 3000);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar">
      <div>
        <div className="flex justify-between py-4 items-center border-b-2 border-[#fff] px-3.5">
          <div className="flex items-center">
            <div
              className={`flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#94A3B8]`}
            >
              <i
                className="fa-solid fa-user-tie text-xl sm:text-3xl"
                // style={{ color: "#ffffff" }}
              ></i>
            </div>
            {/* <h1 className="ml-2 text-lg text-[#475569]">{user.name}</h1> */}
          </div>
          <div
            className="h-8 w-8 text-center bg-[#F1F5F9] rounded cursor-pointer hover:bg-[#CBD5E1]"
            onClick={() => setIsSideBarVisibe(false)}
          >
            {/* <i class="fa-solid fa-xmark mt-2" style={{color:'#94A3B8'}}></i> */}
            <h1 className="mt-0.5 text-lg text-[#94A3B8] hover:text-[#0F172A]">
              X
            </h1>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-10 relative">
          <div className="px-3.5 pb-3">
            <h1 className="text-xl text-[#fff] uppercase">{user.name}</h1>
            <h1 className="text-[#64748B] text-sm sm:text-base">{user.email}</h1>
          </div>
          {/* <div className="flex justify-between items-center bg-[#1E293B] py-2 px-3.5">
            <div className="flex flex-col w-[75%]">
              <h1 className="text-[#fff]">Change Name</h1>
              <span className="text-[#94A3B8] text-sm">Manage your name</span>
            </div>
            <IoIosArrowForward className="text-[#94A3B8]"/>
          </div> */}
          {/* <div className="flex justify-between items-center bg-[#1E293B] py-2 px-3.5 cursor-pointer" onClick={changePasswordHandler}>
            <div className="flex flex-col w-[75%]">
              <h1 className="text-[#fff]">Change Password</h1>
              <span className="text-[#94A3B8] text-xs">Manage your password</span>
            </div>
            <IoIosArrowForward className="text-[#94A3B8]"/>
          </div> */}
          {/* <div className="flex justify-between items-center bg-[#1E293B] py-2 px-3.5">
            <div className="flex flex-col w-[75%]">
              <h1 className="text-[#fff]">Favourite</h1>
              <span className="text-[#94A3B8] text-xs">Favorite Questions</span>
            </div>
            <IoIosArrowForward className="text-[#94A3B8]"/>
          </div> */}
          {/* <div className="flex justify-between items-center bg-[#1E293B] py-2 px-3.5">
            <div className="flex flex-col w-[75%]">
              <h1 className="text-[#fff]">Deactivate Account</h1>
              <span className="text-[#94A3B8] text-xs">Deactivate your account</span>
            </div>
            <IoIosArrowForward className="text-[#94A3B8]"/>
          </div> */}
          {/* () => navigate('/change-name') */}
          <SidebarMenu
            icon=<MdOutlineSettings className="text-[#fff]" />
            heading="Change Name"
            subHeading="Manage your name"
            onClickHandler={() => clickHandler("name")}
          />
          <SidebarMenu
            icon=<MdKey className="text-[#fff]" />
            heading="Change Password"
            subHeading="Manage your password"
            onClickHandler={() => clickHandler("password")}
          />
          <SidebarMenu
            icon=<MdOutlineFavorite className="text-[#fff]" />
            heading="Favourite"
            subHeading="Favorite Questions"
          />
          <SidebarMenu
            icon=<MdOutlineDoNotDisturbOn className="text-[#fff]" />
            heading="Deactivate Account"
            subHeading="Deactivate your account"
            onClickHandler={() => clickHandler("deactivate")}
          />
          {onDeactivate && (
            <div className="absolute ml-2 flex flex-col items-center bottom-[-130px] z-50 w-[95%] bg-[#fff] rounded-md p-4">
              <h1 className="text-xl">Are you sure?</h1>
              <div className="w-full">
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#DC2626] text-lg mt-1"
                  // onClick={logoutHandler}
                >
                  Yes
                </p>{" "}
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#22C55E] text-lg"
                  onClick={() => setOnDeactivate(false)}
                >
                  No
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col relative items-center gap-2 py-10 z-20">
          {onLogout ? (
            <div className="absolute flex flex-col items-center w-[95%] bg-[#fff] rounded-md p-4">
              <h1 className="text-xl">Are you sure?</h1>
              <div className="w-full">
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#DC2626] text-lg mt-1"
                  onClick={logoutHandler}
                >
                  Yes
                </p>{" "}
                <p
                  className="text-center rounded cursor-pointer hover:bg-[#22C55E] text-lg"
                  onClick={() => setOnLogout(false)}
                >
                  No
                </p>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-1 text-red-800 cursor-pointer"
              onClick={() => clickHandler("logout")}
            >
              {/* <IoIosLogOut /> */}
              <MdOutlinePowerSettingsNew />
              <h1 className="text-lg hover:text-red-700">Logout</h1>
            </div>
          )}

          {/* <img src={myImg} alt="" width={100} /> */}
        </div>
      </div>
      {/* { loggingOut && isSideBarVisibe || <LogoutModel/> } */}
    </div>
  );
};

export default SideBAr;
