import React, { useState } from "react";
// import { HiArrowCircleRight } from "react-icons/hi";
// import { useNavigate } from "react-router-dom";

import "../../styles/createQuiz.css";
import QuizNameModel from "./QuizNameModel";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const navigate = useNavigate();

  return (
    <div className="py-3">
      <div className="flex flex-col items-center my-20">
        <img
          src="https://usagif.com/wp-content/uploads/2021/4fh5wi/welcome-19.gif"
          alt=""
        />
        <h1 className="text-3xl text-[#164E63] px-2 pt-6">
          Create Mutiple choice quizzes
        </h1>
        <img
          src="https://website-static.testsigma.com/assets/newhome/testsigma-new-era-smart-test-automation-tool.gif"
          alt=""
        />
        <div>
          <button
            // className="quiz-button px-4 py-2 bg-[#164E63] rounded-md"
            className="quiz-button"
            onClick={() => setIsModalOpen(true)}
          >
            Create Quiz
            {/* <h1 className="text-xl text-[#D97706] ">Create a quiz</h1> */}
            {/* <HiArrowCircleRight
              className="text-3xl cursor-pointer hover:border-[#94A3B8] border-2 rounded-full"
              
            /> */}
          </button>
          {isModalOpen && (
            <QuizNameModel />
            // <div className="quiz-name-modal">
            //   <div className="flex flex-col gap-1">
            //     <label>Quiz Name</label>
            //     <input type="text" className="" placeholder="Quiz Name" />
            //   </div>
            //   <div className="flex flex-col gap-1 mt-8">
            //     <label>Category</label>
            //     <select name="" id="">
            //       <option value="exam">Exam</option>
            //       <option value="test">Test</option>
            //     </select>
            //   </div>
            //   <button onClick={() => navigate("/create-new-quiz")}>Save</button>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
