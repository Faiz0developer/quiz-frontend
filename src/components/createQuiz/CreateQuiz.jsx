// import React, { useState } from "react";
// import ReactDOM from "react-dom";

// import "../../styles/QuizNAmeMode.css";

// const BackDrop = (props) => {
//   return <div className="backdrop" />;
// };

// const ModalOverlay = () => {
//   const [questionNumber, setQuestionNumber] = useState("");
//   const [question, setQuestion] = useState("");
//   return (
//     <div className="modal w-[50%] h-[500px] left-[30%] top-[10vh]">
//       <div className="flex flex-col gap-1">
//         <label>Question Number</label>
//         <input
//           type="number"
//           className="bg-[#CBD5E1] h-12 w-1/4"
//           onChange={(e) => setQuestionNumber(e.target.value)}
//           value={questionNumber}
//         />
//       </div>
//       <div className="flex flex-col gap-1">
//         <label>Question</label>
//         <textarea
//           rows={4}
//           cols={50}
//           className="bg-[#CBD5E1]"
//           placeholder="Question"
//           onChange={(e) => setQuestion(e.target.value)}
//           value={question}
//         />
//       </div>
//     </div>
//   );
// };

// const CreateQuiz = () => {
//   return (
//     <React.Fragment>
//       {ReactDOM.createPortal(
//         <BackDrop />,
//         document.getElementById("backdrop_root")
//       )}
//       {ReactDOM.createPortal(
//         <ModalOverlay />,
//         document.getElementById("overlay_root")
//       )}
//     </React.Fragment>
//   );
// };

// export default CreateQuiz;

import React, { useState } from "react";
import { useSelector } from "react-redux";

const CreateQuiz = () => {
  // const [quizName, setQuizName] = useState("");
  // const [questionNumber, setQuestionNumber] = useState("");
  // const [question, setQuestion] = useState("");
  const quizDetails = useSelector((state) => state.quiz);
  let quizObject = {};
  const [quiz, setQuiz] = useState();
  const [isSelected, setIsSelected] = useState(0);
  const [answer, setAnswer] = useState();
  const [questionDetails, setQuestionDetails] = useState({
    questionNumber: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [answers, setAnswers] = useState({});
  let questionData = {};
  const [questionList, setQuestionList] = useState([questionData]);

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setQuestionDetails({ ...questionDetails, [name]: value });
  };

  const radioInputHandler = (e) => {
    const value = e.target.value;
    // console.log(e.target.value)
    setAnswer(value);
    setIsSelected(+value);
  };

  // let answers ={}

  const addQuestionHandler = () => {
    questionData = {
      questionNumber: questionDetails.questionNumber,
      question: questionDetails.question,
      options: {
        1: questionDetails.option1,
        2: questionDetails.option2,
        3: questionDetails.option3,
        4: questionDetails.option4,
      },
    };
    setQuestionList([...questionList, questionData]);
    setAnswers({ ...answers, [questionDetails.questionNumber]: answer });
    setQuestionDetails({
      questionNumber: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    // console.log(questionDetails);
    // console.log(answers)
  };

  const saveQuizDataHandler = () => {
    quizObject = {
      name: quizDetails.quizName,
      category: quizDetails.category,
      questionList,
      answers,
    };

    console.log(quizObject);
    // console.log(typeof isSelected)
  };

  return (
    <div className="py-3 px-6">
      <div className="flex flex-col items-center my-12 p-4">
        {/* <img src="https://i.gifer.com/P54U.gif" alt="" width={200} /> */}
        <div className="flex justify-between w-11/12 p-4 border-b-2">
          <h1 className="text-[#94A3B8] text-xl">
            Quiz Name:{" "}
            <span className="text-[#164E63]">{quizDetails.quizName} </span>
          </h1>
          <h1 className="text-[#94A3B8] text-xl">
            Category:{" "}
            <span className="text-[#164E63]">{quizDetails.category} </span>
          </h1>
        </div>

        <div className="w-11/12 p-4 bg-[#FFEDD5]">
          {/* <div> */}
          <div className="flex flex-col gap-1">
            <label>Question Number</label>
            <input
              type="number"
              className="bg-[#E5E5E5] h-12 w-[15%] rounded-md px-2 inputFocus"
              // onChange={(e) => setQuestionNumber(e.target.value)}
              onChange={inputHandler}
              value={questionDetails.questionNumber}
              name="questionNumber"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <label>Question</label>
            <textarea
              rows={4}
              cols={50}
              className="bg-[#E5E5E5] rounded-md p-2 inputFocus"
              placeholder="Question"
              // onChange={(e) => setQuestion(e.target.value)}
              onChange={inputHandler}
              value={questionDetails.question}
              name="question"
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <h1>Provide 4 options and mark right answer</h1>
            <div>
              <div
                className={`flex items-center justify-between mt-2 pl-5 pr-3 py-2 rounded-md ${
                  isSelected === 1 ? "bg-[#4ADE80]" : ""
                }`}
              >
                <input
                  type="radio"
                  className={`${isSelected === 1 ? "inputRadio" : ""}  `}
                  name="question_options"
                  value="1"
                  onChange={radioInputHandler}
                />
                <div className="flex items-center gap-1 w-full">
                  <h1>Option 1:</h1>
                  <input
                    type="text"
                    className="option-input w-[80%] ml-1 inputFocus"
                    onChange={inputHandler}
                    value={questionDetails.option1}
                    name="option1"
                    placeholder="Option 1"
                  />
                </div>
                {/* <input type="radio" className="mr-6" name="question_options"/> */}
              </div>
              <div
                className={`flex items-center justify-between mt-2 pl-5 pr-3 py-2 rounded-md ${
                  isSelected === 2 ? "bg-[#4ADE80]" : ""
                }`}
              >
                <input
                  type="radio"
                  className={`${isSelected === 2 ? "inputRadio" : ""}  `}
                  name="question_options"
                  value="2"
                  onChange={radioInputHandler}
                />
                <div className="flex items-center gap-1 w-full">
                  <h1>Option 2:</h1>
                  <input
                    type="text"
                    className="option-input w-[80%] inputFocus"
                    onChange={inputHandler}
                    value={questionDetails.option2}
                    name="option2"
                    placeholder="Option 2"
                  />
                </div>
              </div>
              <div
                className={`flex items-center justify-between mt-2 pl-5 pr-3 py-2 rounded-md ${
                  isSelected === 3 ? "bg-[#4ADE80]" : ""
                }`}
              >
                <input
                  type="radio"
                  className={`${isSelected === 3 ? "inputRadio" : ""}  `}
                  name="question_options"
                  value="3"
                  onChange={radioInputHandler}
                />
                <div className="flex items-center gap-1 w-full">
                  <h1>Option 3:</h1>
                  <input
                    type="text"
                    className="option-input w-[80%] inputFocus"
                    onChange={inputHandler}
                    value={questionDetails.option3}
                    name="option3"
                    placeholder="Option 3"
                  />
                </div>
              </div>
              <div
                className={`flex items-center justify-between mt-2 pl-5 pr-3 py-2 rounded-md ${
                  isSelected === 4 ? "bg-[#4ADE80]" : ""
                }`}
              >
                <input
                  type="radio"
                  className={`${isSelected === 4 ? "inputRadio" : ""}  `}
                  name="question_options"
                  value="4"
                  onChange={radioInputHandler}
                />
                <div className="flex items-center gap-1 w-full">
                  <h1>Option 4:</h1>
                  <input
                    type="text"
                    className="option-input w-[80%] inputFocus"
                    onChange={inputHandler}
                    value={questionDetails.option4}
                    name="option4"
                    placeholder="Option 4"
                  />
                </div>
              </div>
              {/* <div className="flex items-center gap-2 my-2">
                  <h1>Option 2:</h1>
                  <input
                    type="text"
                    className="bg-[#E5E5E5] h-12 rounded-md px-2"
                  />
                </div>
                <div className="flex items-center gap-2 my-2">
                  <h1>Option 3:</h1>
                  <input
                    type="text"
                    className="bg-[#E5E5E5] h-12 rounded-md px-2"
                  />
                </div>
                <div className="flex items-center gap-2 my-2">
                  <h1>Option 4:</h1>
                  <input
                    type="text"
                    className="bg-[#E5E5E5] h-12 rounded-md px-2"
                  />
                </div> */}
            </div>
          </div>
          {/* </div> */}
          <div className="flex justify-center p-4 mt-4">
            <button className="quiz-button" onClick={addQuestionHandler}>
              Add Question
            </button>
          </div>
        </div>

        <div>
          <button className="quiz-button mr-2" onClick={saveQuizDataHandler}>
            Save
          </button>
          <button className="quiz-button">Save and Publish</button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
