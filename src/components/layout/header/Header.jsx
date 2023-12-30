import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { MdQuiz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { GiCardQueenDiamonds, GiHook } from "react-icons/gi";
import { TfiAlignJustify } from "react-icons/tfi";

import myImg from "../../../assets/Q-removebg-preview.png";
import "../../../styles/header.css";
import { getUserData } from "../../../store/slice/userSlice";
import { myQuizData } from "../../../store/slice/getQuizSlice";
import { getAllPublishedQuiz } from "../../../store/slice/AllPublishedQuizSlice";
import { IoMdHome } from "react-icons/io";
import { AiOutlineIdcard, AiTwotoneAppstore } from "react-icons/ai";
// import icon from '../../../assets/qa_2190535.png'
// import SideBAr from "./SideBAr";

const Header = ({
  setIsSideBarVisibe,
  isSideBarVisibe,
  setIsMobileView,
  isMobileView,
}) => {
  // const [isMobileView, setIsMobileView] = useState(false);
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  // const [quizData,setQuizData] = useState()
  // const [isSideBarVisibe,setIsSideBarVisibe] = useState(false)
  // const userName = useSelector((state) => state.token.name);
  // const userNameArr = userName.split(" ");

  const getUseerDataHandler = async () => {
    setIsSideBarVisibe(true);
    try {
      // console.log(token)
      const res = await axios.get("http://localhost:3002/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      // console.log(data)
      if (data.status === "success") {
        dispatch(getUserData(data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMyQuizzesHander = async (flag) => {
    setIsMobileView(false);
    // if (flag === "myQuiz") {
    //   try {
    //     const res = await axios.get("http://localhost:3002/quiz", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // setQuizData(res.data.data)
    //     if (res.data.status === "success") {
    //       dispatch(myQuizData(res.data.data));
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // if (flag === "AllQuiz") {
    //   try {
    //     const res = await axios.get(
    //       "http://localhost:3002/quiz/allpublishedquiz",
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );
    //     if (res.data.status === "success") {
    //       dispatch(getAllPublishedQuiz(res.data.data));
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <header className="relative  flex justify-between px-6 items-center">
      <div className="header-container ">
        {/* <img src={myImg} alt="" width={100}/> */}
        {/* <video
          src={myImg}
          width="80"
          // height="150"
          autoPlay
          muted
        /> */}
        <div className="small-screen">
          <TfiAlignJustify
            className="text-xl cursor-pointer"
            onClick={() => setIsMobileView(!isMobileView)}
          />
          <GiHook className={`${isMobileView ? "hook-1" : "hook"}`} />
          {isMobileView && (
            <div className="mobile-view">
              {isMobileView && <div className="hole"></div>}
              <ul className="relative flex flex-col items-center text-[#fff] gap-6 mt-3">
                <li className="li-1" onClick={() => getMyQuizzesHander("home")}>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>{" "}
                </li>
                <li
                  className="li-2"
                  onClick={() => getMyQuizzesHander("create-quiz")}
                >
                  <NavLink to="/create-quiz-home">Create Quiz</NavLink>{" "}
                </li>
                <li
                  className="li-3"
                  onClick={() => getMyQuizzesHander("myQuiz")}
                >
                  <NavLink to="/my-quizzes">My Quizzes</NavLink>{" "}
                </li>
                <li
                  onClick={() => getMyQuizzesHander("AllQuiz")}
                  className="li-4"
                >
                  <NavLink to="/all-published-quiz">All Quizzes</NavLink>{" "}
                </li>
                <li
                  className="li-5"
                  onClick={() => getMyQuizzesHander("report")}
                >
                  <NavLink to="/report">Report</NavLink>{" "}
                </li>
              </ul>
            </div>
          )}
        </div>
        <img src={myImg} alt="" width={100} className="min-[1000px]:ml-20"/>
      </div>

      <div className="big-screen ml-10">
        <ul className="flex items-center text-[#0F172A] gap-2 ">
          <li>
            {/* <i className="fa-solid fa-house mr-1"></i> */}
            {/* <IoMdHome className="text-xl" /> */}
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <IoMdHome className="text-xl" /> Home
            </NavLink>{" "}
          </li>
          <li>
            <NavLink
              to="/create-quiz-home"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <MdQuiz className="text-xl" /> Create Quiz
            </NavLink>{" "}
          </li>
          <li
            onClick={() => getMyQuizzesHander("myQuiz")}
          >
            <NavLink
              to="/my-quizzes"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <GiCardQueenDiamonds className="text-xl" /> My Quizzes
            </NavLink>{" "}
          </li>
          <li onClick={() => getMyQuizzesHander("AllQuiz")}>
            <NavLink
              to="/all-published-quiz"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <AiTwotoneAppstore className="text-xl" /> Take the quiz
            </NavLink>{" "}
          </li>
          {/* <li><Link><MdQuiz className="text-xl" />Quiz</Link></li> */}
          <li>
            <NavLink
              to="/report"
              className={({ isActive }) => (isActive ? "active-1" : "")}
            >
              <AiOutlineIdcard className="text-xl" /> Report
            </NavLink>{" "}
          </li>
        </ul>
      </div>

      <div
        className={`flex justify-center items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#94A3B8] cursor-pointer`}
        onClick={getUseerDataHandler}
      >
        <i
          className="fa-solid fa-user-tie text-xl sm:text-3xl"
          // style={{ color: "#ffffff" }}
        ></i>
      </div>
    </header>
  );
};

export default Header;
