import React, { useState } from "react";

const ChildComp = ({ comp, setComp,questionDetails, setQuestionDetails }) => {
    const [update, setUpdate] = useState(false)
  
  console.log(comp);

  const inputHandler = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setQuestionDetails({ ...questionDetails, [name]: value });
  };

  const addCustomContainerHandler = () => {
    setComp([...comp, comp.length]);
    setQuestionDetails({questionNumber: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",})
    console.log(questionDetails)
    setUpdate(true)
  };


  return (
    // <div>
    <div className="create-question-list-content">
      <div className="flex flex-col gap-1 mt-4">
        {/* <label>Question</label> */}
        {update ? <h1>{questionDetails.question}</h1>:
        <textarea
          rows={2}
          cols={50}
          // className="name-input"
          placeholder="Question"
          // onChange={(e) => setQuestion(e.target.value)}
          onChange={inputHandler}
          value={questionDetails.question}
          name="question"
        />
    }
      </div>
      <div>
        <div
          className={`flex items-center justify-between mt-2 py-2 rounded-md gap-2`}
        >
          <input
            type="radio"
            // className={`${isSelected === 1 ? "inputRadio" : ""}  `}
            name="question_options"
            // value="1"
            // onChange={radioInputHandler}
          />
          <div className="flex items-center gap-1 w-full">
            {/* <h1>Option 1:</h1> */}
            <input
              type="text"
              className="name-input w-full"
              onChange={inputHandler}
              value={questionDetails.option1}
              name="option1"
              placeholder="Option 1"
            />
          </div>
          {/* <input type="radio" className="mr-6" name="question_options"/> */}
        </div>
        <div
          className={`flex items-center justify-between mt-2 py-2 rounded-md gap-2`}
        >
          <input
            type="radio"
            // className={`${isSelected === 1 ? "inputRadio" : ""}  `}
            name="question_options"
            //   value="1"
            // onChange={radioInputHandler}
          />
          <div className="flex items-center gap-1 w-full">
            {/* <h1>Option 1:</h1> */}
            <input
              type="text"
              className="name-input w-full"
              onChange={inputHandler}
              value={questionDetails.option2}
              name="option2"
              placeholder="Option 2"
            />
          </div>
          {/* <input type="radio" className="mr-6" name="question_options"/> */}
        </div>
        <div
          className={`flex items-center justify-between mt-2 py-2 rounded-md gap-2`}
        >
          <input
            type="radio"
            // className={`${isSelected === 1 ? "inputRadio" : ""}  `}
            name="question_options"
            //   value="1"
            // onChange={radioInputHandler}
          />
          <div className="flex items-center gap-1 w-full">
            {/* <h1>Option 1:</h1> */}
            <input
              type="text"
              className="name-input w-full"
              onChange={inputHandler}
              value={questionDetails.option3}
              name="option3"
              placeholder="Option 3"
            />
          </div>
          {/* <input type="radio" className="mr-6" name="question_options"/> */}
        </div>
        <div
          className={`flex items-center justify-between mt-2 py-2 rounded-md gap-2`}
        >
          <input
            type="radio"
            // className={`${isSelected === 1 ? "inputRadio" : ""}  `}
            name="question_options"
            //   value="1"
            // onChange={radioInputHandler}
          />
          <div className="flex items-center gap-1 w-full">
            {/* <h1>Option 1:</h1> */}
            <input
              type="text"
              className="name-input w-full"
              onChange={inputHandler}
              value={questionDetails.option4}
              name="option4"
              placeholder="Option 4"
            />
          </div>
          {/* <input type="radio" className="mr-6" name="question_options"/> */}
        </div>
      </div>
      <button onClick={addCustomContainerHandler}>Add</button>
      {/* </div> */}
    </div>
  );
};

export default ChildComp;
