import React, { useState } from "react";
import ChildComp from "./ChildComp";

const QuestionListCard = ({ questionDetails, setQuestionDetails }) => {
  const [comp, setComp] = useState([0]);

  return comp.map((myComp) => (
    <ChildComp
      key={myComp}
      comp={comp}
      setComp={setComp}
      questionDetails={questionDetails}
      setQuestionDetails={setQuestionDetails}
    />
  ));
};

export default QuestionListCard;
