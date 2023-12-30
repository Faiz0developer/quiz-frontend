import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

import "../styles/myQuiz.css";
import { MdDoubleArrow } from "react-icons/md";
import axios from "axios";
import { myQuizData } from "../store/slice/getQuizSlice";
import { FallingLines, Hourglass, Puff } from "react-loader-spinner";

const MyQuizPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  // const myQuizzes = useSelector((state) => state.myQuiz.quizData);
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();
  const [myQuizzes, setMyQuizzes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const myQuizDataFetch = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3002/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setMyQuizzes(res.data.data);
        if (res.data.status === "success") {
          dispatch(myQuizData(res.data.data));
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    myQuizDataFetch();
  }, [token]);

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

  // const quizData = myQuizzes?.filter(
  //   (myQuiz) =>
  //     myQuiz.name.toLowerCase().includes(searchInput) ||
  //     myQuiz.category.toLowerCase().includes(searchInput)
  // );
  const quizData =
    searchInput === "all"
      ? myQuizzes
      : myQuizzes?.filter(
          (myQuiz) =>
            myQuiz.name.toLowerCase().includes(searchInput) ||
            myQuiz.category.toLowerCase().includes(searchInput)
        );

  return (
    <div className="px-2 py-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="my-quiz-loader-wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      ) : (
        <>
          <div className="px-4 my-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-evenly">
              <div className="search-input">
                <input
                  type="search"
                  className="bg-[#64748B] h-full focus:outline-none"
                  placeholder="Search (small letter)"
                  onChange={searchInputHandler}
                  value={searchInput}
                />
                <CiSearch className="icon" />
                <div className="drop-down">
                <select name="" id="" onChange={searchInputHandler}>
                  <option value="all">All</option>
                  <option value="exam" className="p-2">
                    Exam
                  </option>
                  <option value="test">Test</option>
                </select>
                </div>
              </div>
              {/* <div className="dropDown before:top-[40%] after:top-[55%]">
                <select name="" id="" onChange={searchInputHandler}>
                  <option value="all">All</option>
                  <option value="exam" className="p-2">
                    Exam
                  </option>
                  <option value="test">Test</option>
                </select>
              </div> */}
            </div>
          </div>
          
          <div className="my-quiz-card-container px-4 my-12 pt-2">
            {quizData?.length ? (
              <>
                {quizData?.map((myQuiz) => {
                  return (
                    <div key={myQuiz._id} className="wrapper">
                      <div
                        className="tooltip flex items-center gap-4 sm:gap-10 relative mt-2 py-4 px-4 cursor-pointer"
                        onClick={() => singleQuizDataHandler(myQuiz._id)}
                      >
                        <h1
                          className={`tooltipText ${
                            myQuiz.isPublished
                              ? "text-[#16A34A]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          {myQuiz.isPublished ? "Published" : "Not Published"}
                        </h1>
                        <h1 className="text-lg sm:text-xl text-[#9c4a45] truncate font-semibold">
                          {myQuiz.name}
                        </h1>
                        <div className="truncate text-[#9c4a45]">
                          <p className=" truncate">
                            Category: <span>{myQuiz.category}</span>
                          </p>
                          <p className=" italic truncate">
                            Created at:{" "}
                            <span className="">{`${new Date(
                              myQuiz.createdAt
                            ).getDate()}-${
                              month[new Date(myQuiz.createdAt).getMonth()]
                            }-${new Date(
                              myQuiz.createdAt
                            ).getFullYear()}`}</span>
                          </p>
                        </div>
                        <MdDoubleArrow className="get-icon get-icon-1" />
                        <MdDoubleArrow className="get-icon get-icon-2" />
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex flex-col h-[70vh] items-center mt-20">
                <p className="text-center text-xl">No quiz to show</p>
                <FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyQuizPage;
