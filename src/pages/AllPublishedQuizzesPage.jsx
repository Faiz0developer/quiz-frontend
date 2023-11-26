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
          <h1 className="text-5xl min-[500px]:text-6xl lg:text-7xl text-[#134E4A] px-2 pt-0 min-[800px]:pt-2 text-center">
            Test Your Skills
          </h1>
          <p className="mt-2 text-xl px-2 text-[#334155] text-center">
            Choose your favorite quiz <br />  and play with your skills
          </p>
          {/* <div className="px-2 text-[#064E3B]">
            <p>Providing two category of quiz - </p>
            <p>
              Exam -{" "}
              <span>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil,
                quibusdam!
              </span>
            </p>
            <p>
              Test -{" "}
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio,
                inventore.
              </span>
            </p>
          </div> */}
        </div>
        <div className="img-container">
          <img
            src="https://play-lh.googleusercontent.com/-dGSUTdes6YTUtZfrtFfTsRPiIMCB8e2ykbhXDCg36qnvxdG_B6G51tNlvm66nPNrg"
            alt=""
            className="object-cover"
            width={300}
          />
        </div>
      </div>
      <QuizCard />
    </div>
  );
};

export default AllPublishedQuizzesPage;
