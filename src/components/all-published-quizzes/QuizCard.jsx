import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublishedQuiz } from "../../store/slice/AllPublishedQuizSlice";

const QuizCard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(false);
  const [allPublishedQuiz, setAllPublishedQuiz] = useState();
  // const allPublishedQuiz = useSelector(
  //   (state) => state.allPublishedQuiz.publishedQuiz
  // );

  useEffect(() => {
    const fetchAllQuizdata = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:3002/quiz/allpublishedquiz",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllPublishedQuiz(res.data.data);
        if (res.data.status === "success") {
          dispatch(getAllPublishedQuiz(res.data.data));
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllQuizdata();
  }, [token]);
  return (
    <div className="pb-5 px-10 pt-10">
      <h1 className="text-4xl font-[sans] text-[#1E293B]">Attempt Quiz</h1>
      <div className="quiz-cards-container">
        {allPublishedQuiz?.map((quiz) => {
          
          return (
            <React.Fragment key={quiz._id}>
              {isLoading ? (<div className="animated-background h-32"></div>
              ) : ( 
                 <div className="quiz-card-contianer relative">
                  <div className="quiz-name-card">
                    <h1 className="text-xl">{quiz.name}</h1>
                  </div>
                  <div
                    className="quiz-card"
                    onClick={() => console.log("working")}
                  >
                    <h1 className="text-xl">{quiz.name}</h1>
                    <h3>
                      Category: <span>{quiz.category}</span>
                    </h3>
                    <h4>
                      Passing Percentage: <span>{quiz.passingPercentage}%</span>
                    </h4>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCard;
