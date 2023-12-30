import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

import "../styles/singleQuestion.css";

const SingleQuizPage = ({ setPublishing }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token.token);
  const myQuizzes = useSelector((state) => state.myQuiz.quizData);
  const param = useParams();
  const [isPublished, setIsPublished] = useState(false);
  const [data, setData] = useState()

  const publishQuizHandler = async (quizId) => {
    const publishQuizId = {
      quizId,
    };
    try {
      setPublishing(true);
      const res = await axios.patch(
        "http://localhost:3002/quiz/publish",
        publishQuizId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPublishing(false);
      if (res.data.status === "success") {
        setIsPublished(true);
        setTimeout(() => {
          setIsPublished(false);
          navigate("/my-quizzes");
        }, [2000]);
      }
      console.log(res);
      // if(res.)
    } catch (error) {
      setPublishing(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchParticularQuizData = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/quiz/${param.quizId}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log(res)
      if(res.data.status === 'success'){
        setData(res.data.data)
      }
      } catch (error) {
        console.log(error)
      }
    }

    fetchParticularQuizData()
  },[])

  // const data = myQuizzes.find((myQuiz) => myQuiz._id === param.quizId);
  return (
    <div className="relative flex flex-col py-10 px-3 sm:px-6 md:px-10">
      <div className="quiz-content">
        <div className="flex justify-between pb-6 px-0 md:px-4 text-[#164E63] text-sm sm:text-lg">
          <div>
            <h1>
              Quiz Name: <span className="text-[#0E7490]">{data?.name}</span>
            </h1>
            <h1>
              Category: <span className="text-[#0E7490]">{data?.category}</span>
            </h1>
            <h1>
              Published:{" "}
              {data?.isPublished ? (
                <span className="text-[#0E7490]">Yes</span>
              ) : (
                <span className="text-[#0E7490]">No</span>
              )}
            </h1>
          </div>
          <div>
            <h1>
              Passing Percentage:{" "}
              <span className="text-[#0E7490]">{data?.passingPercentage}%</span>
            </h1>
            {data?.isPublicQuiz ? (
              <h1 className="text-[#0E7490]">Public Quiz</h1>
            ) : (
              <h1 className="text-[#0E7490]">Private Quiz</h1>
            )}
          </div>
        </div>

        <div>
          {data?.questionList.map((questionPack) => {
            return (
              <div key={questionPack._id} className="question-pack">
                <h1 className="font-semibold">
                  <span>{questionPack.questionNumber}. </span>{" "}
                  {questionPack.question}
                </h1>
                <div className="px-0 sm:px-4">
                  <p>1) {questionPack.options[1]}</p>
                  <p>2) {questionPack.options[2]}</p>
                  <p>3) {questionPack.options[3]}</p>
                  <p>4) {questionPack.options[4]}</p>
                </div>
                <h1 className="pt-1 text-[#14532D] font-semibold">
                  <span>answer: </span>{" "}
                  {data?.answers[questionPack.questionNumber]}
                </h1>
              </div>
            );
          })}
        </div>
        
        {data?.isPublished || (
          <div className="flex justify-center gap-3 pt-4 mt-4 h-[60px]">
            {" "}
            <button className="btns update-btn uppercase">Update</button>
            <button
              className="btns uppercase"
              onClick={() => publishQuizHandler(data?._id)}
            >
              Publish
            </button>
          </div>
        )}
      </div>

      {isPublished && (
        <div className=" fixed top-0 left-0 w-full h-full bg-[#0000001a] z-10 absolute flex">
          <div className="publish">
            <h1>Published</h1>{" "}
            <span>
              <FaCheck />
            </span>{" "}
          </div>
        </div>
      )}
      
      <h1 className="text-center mt-6"><span className="back-btn" onClick={() => navigate('/my-quizzes')}>back</span></h1>
    </div>
  );
};

export default SingleQuizPage;
