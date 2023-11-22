import React from "react";
import "../styles/AllPublishQuiz.css";
import { useSelector } from "react-redux";
import QuizCard from "../components/all-published-quizzes/QuizCard";

const AllPublishedQuizzesPage = () => {
  const allPublishedQuiz = useSelector(
    (state) => state.allPublishedQuiz.publishedQuiz
  );
  console.log(allPublishedQuiz);
  return (
    <div className="py-10">
      <div className="quiz-hero">
        <div className="mt-16">
          <h1 className="text-6xl lg:text-7xl text-[#134E4A] p-2">Test Your Skills</h1>
          <p className="mt-2 text-xl px-2 text-[#fff]">Choose your favorite quiz and play with your skills</p>
          <div className="px-2 text-[#064E3B]">
          <p>Providing two category of quiz - </p>
          <p>Exam - <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, quibusdam!</span></p>
          <p>Test - <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, inventore.</span></p>
          </div>
        </div>
        <div className="img-container">
          <img
            src="https://play-lh.googleusercontent.com/-dGSUTdes6YTUtZfrtFfTsRPiIMCB8e2ykbhXDCg36qnvxdG_B6G51tNlvm66nPNrg"
            alt=""
            className="object-cover"
            width={400}
          />
        </div>
        {/* <div></div> */}
      </div>
      <QuizCard />
    </div>
  );
};

export default AllPublishedQuizzesPage;
