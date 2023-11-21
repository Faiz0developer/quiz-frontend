import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { MdQuiz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GiCardQueenDiamonds } from "react-icons/gi";

import myImg from "../../../assets/quiz4.mp4";
import "../../../styles/header.css";
import { getUserData } from "../../../store/slice/userSlice";
import { myQuizData } from "../../../store/slice/getQuizSlice";
import { getAllPublishedQuiz } from "../../../store/slice/AllPublishedQuizSlice";
// import icon from '../../../assets/qa_2190535.png'
// import SideBAr from "./SideBAr";

const Header = ({ setIsSideBarVisibe, isSideBarVisibe }) => {
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
    if (flag === "myQuiz") {
      try {
        const res = await axios.get("http://localhost:3002/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // setQuizData(res.data.data)
        if (res.data.status === "success") {
          dispatch(myQuizData(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
    if(flag==='AllQuiz'){
      try {
        const res = await axios.get("http://localhost:3002/quiz/allpublishedquiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        if (res.data.status === "success") {
          dispatch(getAllPublishedQuiz(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <header className="bg-[#155E75] flex justify-between px-6 items-center">
      {/* <div className="flex gap-6"> */}
      <video
        src={myImg}
        width="80"
        // height="150"
        autoPlay
        muted
      />
      {/* <div> */}
      <ul className="flex items-center text-[#fff] gap-6 ">
        <li className="border-b-2 py-2">
          <i className="fa-solid fa-house mr-1"></i>
          <Link to="/">Home</Link>{" "}
        </li>
        <li className="flex gap-1 justify-center py-2">
          <MdQuiz className="mt-0.5 text-xl" />
          {/* <img src={icon} alt="quiz-icon" width={25} /> */}
          <Link to="/create-quiz-home">Create Quiz</Link>{" "}
        </li>

        <li
          className="flex gap-1 justify-center items-center py-2 cursor-pointer"
          onClick={() => getMyQuizzesHander("myQuiz")}
        >
          <GiCardQueenDiamonds />
          <Link to="/my-quizzes">My Quizzes</Link>{" "}
        </li>
        <li onClick={() => getMyQuizzesHander("AllQuiz")}>
          <i className="fa-brands fa-readme mr-1"></i>
          <Link to="/all-published-quiz">All Quizzes</Link>{" "}
        </li>
        <li>
          <i className="fa-brands fa-readme mr-1"></i>
          <Link to="/report">Report</Link>{" "}
        </li>
      </ul>
      {/* </div> */}
      {/* </div> */}
      <div
        className={`flex justify-center items-center h-12 w-12 rounded-full bg-[#94A3B8] cursor-pointer`}
        onClick={getUseerDataHandler}
      >
        <i
          className="fa-solid fa-user-tie text-3xl"
          // style={{ color: "#ffffff" }}
        ></i>
      </div>
    </header>
  );
};

export default Header;
