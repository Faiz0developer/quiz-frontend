import React from "react";
// import { useSelector } from "react-redux";
import { MdQuiz } from 'react-icons/md';

import myImg from "../../../assets/quiz4.mp4";
import "../../../styles/header.css";
import { Link } from "react-router-dom";
// import icon from '../../../assets/qa_2190535.png'
// import SideBAr from "./SideBAr";

const Header = ({ setIsSideBarVisibe, isSideBarVisibe }) => {
  // const [isSideBarVisibe,setIsSideBarVisibe] = useState(false)
  // const userName = useSelector((state) => state.token.name);
  // const userNameArr = userName.split(" ");
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
              <MdQuiz className="mt-0.5 text-xl"/>
              {/* <img src={icon} alt="quiz-icon" width={25} /> */}
              <Link to="/create-quiz-home">Create Quiz</Link>{" "}
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
        onClick={() => setIsSideBarVisibe(true)}
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
