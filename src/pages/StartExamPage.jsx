import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/StartQuiz.css";
import StartQuizCard from "../components/StartQuizCard";
import myImg from "../assets/Q-removebg-preview.png";
import { ToastContainer, toast } from "react-toastify";

const StartExamPage = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const startQuizData = useSelector((state) => state.StartQuiz.startQuiz);
  const [attemptedQuestion, setAttemptedQuestion] = useState({});
  const [result, setResult] = useState();
  console.log(startQuizData);

  const submitQuizHandler = async (id) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/exam",
        { quizId: id, attemptedQuestion },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.data.status === "success") {
        setResult(res.data.data.result);
        toast.success(`${res.data.data.result}. Check complete result in Report section`, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      setTimeout(()=>{
        navigate("/");
      },5000)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="absolute z-50 -top-[100px] w-full bg-[#FEF9C3]">
        <img src={myImg} alt="" width={100} className="ml-10" />
        <div className="start-quiz-container">
          <div className="w-[90%] py-4">
            <h1 className="text-center text-4xl text-[#064E3B]">
              {startQuizData.name}
            </h1>
            <div className="flex flex-col sm:flex-row items-center sm:justify-around mt-4 text-xl">
              <h2>
                Category:{" "}
                <span className="text-[#475569]">{startQuizData.category}</span>
              </h2>
              <h2>
                Passing Percentage:{" "}
                <span className="text-[#475569]">
                  {startQuizData.passingPercentage}%
                </span>
              </h2>
            </div>
          </div>
          <div className="start-quiz-card-container">
            {startQuizData.questionList.map((question, index) => {
              return (
                <StartQuizCard
                  question={question}
                  index={index}
                  attemptedQuestion={attemptedQuestion}
                  setAttemptedQuestion={setAttemptedQuestion}
                />
              );
            })}
          </div>
          <button
            onClick={() => submitQuizHandler(startQuizData._id)}
            className="submit-btn"
          >
            Submit
          </button>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      {/* <div className="h-[100vh] relative"> */}
      {/* <div className="absolute w-[200px] h-[200px] left-1/2 top-[] z-50 bg-[#fff]">
        <h1>Result</h1>
        <h2>PASS</h2>
        </div>
      </div> */}
    </>
  );
};

export default StartExamPage;
