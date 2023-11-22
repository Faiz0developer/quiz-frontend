import React from "react";
import { useSelector } from "react-redux";

const QuizCard = () => {
  const allPublishedQuiz = useSelector(
    (state) => state.allPublishedQuiz.publishedQuiz
  );
  return (
    <div className="quiz-cards-container">
      {allPublishedQuiz.map((quiz) => {
        return (
          <div className="quiz-card-contianer relative" key={quiz._id}>
            <div className="quiz-name-card">
              <h1 className="text-xl">{quiz.name}</h1>
            </div>
            <div className="quiz-card" onClick={() => console.log("working")}>
              <h1 className="text-xl">{quiz.name}</h1>
              <h3>
                Category: <span>{quiz.category}</span>
              </h3>
              <h4>
                Passing Percentage: <span>{quiz.passingPercentage}%</span>
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuizCard;
