import React, { useState } from "react";
import ReactDOM from "react-dom";

import "../../styles/QuizNAmeMode.css";

const BackDrop = (props) => {
  return <div className="backdrop" />;
};

const ModalOverlay = () => {
  const [questionNumber, setQuestionNumber] = useState("");
  const [question, setQuestion] = useState("");
  return (
    <div className="modal w-[50%] h-[500px] left-[30%] top-[10vh]">
      <div className="flex flex-col gap-1">
        <label>Question Number</label>
        <input
          type="number"
          className="bg-[#CBD5E1] h-12 w-1/4"
          onChange={(e) => setQuestionNumber(e.target.value)}
          value={questionNumber}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Question</label>
        <textarea
          rows={4}
          cols={50}
          className="bg-[#CBD5E1]"
          placeholder="Question"
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
        />
      </div>
    </div>
  );
};

const CreateQuiz = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("overlay_root")
      )}
    </React.Fragment>
  );
};

export default CreateQuiz;

// import React, { useState } from "react";

// const CreateQuiz = () => {
//   const [quizName, setQuizName] = useState("");
//   const [questionNumber, setQuestionNumber] = useState("");
//   const [question, setQuestion] = useState("");

//   const createQuizHandler = (e) => {
//     e.preventDefault();
//     const quiz = {
//       name: quizName,
//       questionList: [{ question_number: questionNumber, question: question }],
//     };
//     console.log(quiz);
//     console.log(quizName);
//     console.log(questionNumber);
//     console.log(question);
//   };
//   return (
//     <div className="py-3">
//       <div className="my-20">
//         <img src="https://i.gifer.com/P54U.gif" alt="" width={200}/>
//         <form onSubmit={createQuizHandler}>
//           <div className="flex flex-col">
//             <label>Quiz Name</label>
//             <input
//               type="text"
//               className="bg-[#CBD5E1] h-12"
//               placeholder="Quiz Name"
//               onChange={(e) => setQuizName(e.target.value)}
//               value={quizName}
//             />
//             <label>Question Number</label>
//             <input
//               type="number"
//               className="bg-[#CBD5E1] h-12"
//               onChange={(e) => setQuestionNumber(e.target.value)}
//               value={questionNumber}
//             />
//             <label>Question</label>
//             <input
//               type="text"
//               className="bg-[#CBD5E1] h-12"
//               placeholder="Question"
//               onChange={(e) => setQuestion(e.target.value)}
//               value={question}
//             />
//           </div>
//           <button className="bg-[#713F12] text-[#fff] px-3 py-2">
//             Create Quiz
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateQuiz;
