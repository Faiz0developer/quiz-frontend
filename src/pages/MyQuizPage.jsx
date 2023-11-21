import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import "../styles/myQuiz.css";
import { MdDoubleArrow } from "react-icons/md";

const MyQuizPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const myQuizzes = useSelector((state) => state.myQuiz.quizData);
  console.log(myQuizzes);

  const singleQuizDataHandler = (quizId) => {
    navigate(`/my-quizzes/${quizId}`);
  };

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  const quizData = myQuizzes.filter(
    (myQuiz) =>
      myQuiz.name.toLowerCase().includes(searchInput) ||
      myQuiz.category.toLowerCase().includes(searchInput)
  );

  return (
    <div className="px-2 py-4">
      <div className="px-4 my-8">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-evenly">
          <div className="search-input">
            <input
              type="search"
              className="bg-[#64748B] h-full focus:outline-none"
              placeholder="Search"
              onChange={searchInputHandler}
              value={searchInput}
            />
            <CiSearch className="icon" />
          </div>
          <div className="dropDown before:top-[40%] after:top-[55%]">
            <select name="" id="" onChange={searchInputHandler}>
              <option value="Category">Category</option>
              <option value="exam" className="p-2">
                Exam
              </option>
              <option value="test">Test</option>
            </select>
          </div>
        </div>
      </div>
      <div className="px-4 my-8">
        {quizData.length ? (
          <>
            {quizData.map((myQuiz) => {
              return (
                <div
                  className="tooltip flex items-center gap-4 sm:gap-10 relative mt-2 py-4 px-4 cursor-pointer bg-[#fff] rounded "
                  onClick={() => singleQuizDataHandler(myQuiz._id)}
                  key={myQuiz._id}
                >
                  <h1
                    className={`tooltipText ${
                      myQuiz.isPublished ? "text-[#16A34A]" : "text-[#EF4444]"
                    }`}
                  >
                    {myQuiz.isPublished ? "Published" : "Not Published"}
                  </h1>
                  <h1 className="text-lg sm:text-xl text-[#164E63] truncate md:w-[250px]">
                    {myQuiz.name}
                  </h1>
                  <div className="truncate">
                    <p className="text-[#334155] truncate">
                      Category: <span>{myQuiz.category}</span>
                    </p>
                    <p className="text-[#334155] italic truncate">
                      Created at:{" "}
                      <span className="text-[#334155]">{`${new Date(
                        myQuiz.createdAt
                      ).getDate()}-${
                        month[new Date(myQuiz.createdAt).getMonth()]
                      }-${new Date(myQuiz.createdAt).getFullYear()}`}</span>
                    </p>
                  </div>
                  <MdDoubleArrow className="get-icon get-icon-1"/>
                  <MdDoubleArrow className="get-icon get-icon-2"/>
                </div>
              );
            })}
          </>
        ) : (
          <p>No Quiz Found</p>
        )}
      </div>
    </div>
  );
};

export default MyQuizPage;
