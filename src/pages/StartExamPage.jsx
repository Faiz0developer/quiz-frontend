import React, { useState } from "react";
import { useSelector } from "react-redux";

import "../styles/StartQuiz.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import StartQuizCard from "../components/StartQuizCard";

const StartExamPage = () => {
  // const [isFav, setIsFav] = useState(false);
  // const [myFavQuestionColection, setMyFavQuestionCollection] = useState([]);
  const startQuizData = useSelector((state) => state.StartQuiz.startQuiz);
  console.log(startQuizData);

  // let isFav;

  
  // const removedfromFav = (id) => {
  //   console.log("removed", id);
  //   // setIsFav(false);
  // };
  // console.log(myFavQuestionColection)
  return (
    <div>
      <div className="start-quiz-card-container">
        {startQuizData.questionList.map((question) => {
          return (
            <StartQuizCard question={question} />
          );
        })}
      </div>
      <button>Submit</button>
    </div>
  );
};

export default StartExamPage;
