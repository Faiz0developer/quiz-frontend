import React from "react";
import ReactDOM from "react-dom";

import "../../styles/QuizNAmeMode.css";

const BackDrop = (props) => {
  return (
    <div className="backdrop">
      <div className="loading-container bg-[#16A34A]">
        <div className="loading-text">
          <span>C</span>
          <span>R</span>
          <span>E</span>
          <span>A</span>
          <span>T</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
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
    </React.Fragment>
  );
};

export default QuizNameModel;
