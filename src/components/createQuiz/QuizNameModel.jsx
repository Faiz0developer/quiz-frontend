import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import "../../styles/QuizNAmeMode.css";
import { getQuizDetials } from "../../store/slice/quizSlice";

const BackDrop = (props) => {
  return <div className="backdrop" />;
};

const ModelOverlay = ({ onClick }) => {
  const [quizDetails, setQuizDetails] = useState({
    quizName: "",
    category: "",
  });
  const navigate = useNavigate();
const dispatch = useDispatch()

  const quizFieldsHandler = (e) => {
    const value = e.target.value
    const name = e.target.name

    setQuizDetails({...quizDetails, [name]:value})
  }

  const getQuizDetails = () => {
    console.log(quizDetails)
    dispatch(getQuizDetials(quizDetails))
    navigate('/create-new-quiz')
    setQuizDetails({quizName:"", category:''})
  }

  return (
    <div className="modal w-[75%] min-[450px]:w-[60%] sm:w-[400px] h-[320px] left-[15%] min-[450px]:left-[20%] md:left-[30%] lg:left-[40%] top-[20vh]">
      <div className="flex flex-col gap-1">
        <label>Quiz Name</label>
        <input
          type="text"
          className=""
          placeholder="Quiz Name"
          onChange={quizFieldsHandler}
          name="quizName"
          value={quizDetails.quizName}
        />
      </div>
      <div className="dropDown before:top-[60%] after:top-[75%] flex flex-col gap-1 mt-8">
        <label>Category</label>
        <select name="category" id="" onChange={quizFieldsHandler} value={quizDetails.category}>
          {/* <option value="Category">Category</option> */}
          <option value="exam">Exam</option>
          <option value="test">Test</option>
        </select>
      </div>
      <button onClick={getQuizDetails}>Save</button>
    </div>
  );
};

const QuizNameModel = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("backdrop_root")
      )}
      {ReactDOM.createPortal(
        <ModelOverlay />,
        document.getElementById("overlay_root")
      )}
    </React.Fragment>
  );
};

export default QuizNameModel;
