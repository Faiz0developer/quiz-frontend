import axios from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useSelector } from "react-redux";

const StartQuizCard = ({ question }) => {
  const token = useSelector((state) => state.token.token);
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const [myFavQuestionColection, setMyFavQuestionCollection] = useState([]);

  useEffect(
    () =>
      setIsFav(
        myFavQuestionColection.some(
          (favQuestion) => question._id === favQuestion._id
        )
      ),
    [myFavQuestionColection, question._id]
  );
  // const isFav = () => {
  //     return myFavQuestionColection.some((favQuestion) => question._id === favQuestion._id)
  // }

  const toggleFavItem = async() => {
    if (isFav) {
      setMyFavQuestionCollection((prevData) => {
        return prevData.filter(
          (favQuestion) => question._id !== favQuestion._id
        );
      });
    } else {
      setMyFavQuestionCollection((prevItem) => {
        return [...prevItem, question];
      });
      try {
        setIsLoading(1)
        const res = await axios.post(
          "http://localhost:3002/favquestion",
          { question: question.question, options: question.options },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLoading(false)
        console.log(res);
        if(res.data.status==='success'){
            setIsLoading(2)
        }
      } catch (error) {
        console.log(error);
      }
    }
    // if (startQuizData.questionList.some((question) => question._id === id)) {
    //   console.log(`Added ${quesName}, ${id}, ${quesOptions[1]}`);
    // setIsFav(true)
    // }
  };
  //   console.log(myFavQuestionColection);
  let data
  if(isLoading===0){
    data=<p>Add to favorite</p>
  }else if(isLoading===1){
    data=<RotatingLines width="20"/>
  }else{
    data=<p>Added</p>
  }
  return (
    <div className="start-quiz-card" key={question._id}>
      <h1 className="py-4 text-2xl">
        <span>{question.questionNumber})</span> {question.question}
      </h1>
      <div
        className="quiz-options"
        value="1"
        onClick={(e) => console.log(e.target.value)}
      >
        {/* <div className="flex"> */}
        <p>1</p>
        <h5 className="p-2.5">{question.options[1]}</h5>
        {/* </div> */}
        {/* <input type="radio" /> */}
      </div>
      <div className="quiz-options">
        <p>2</p>
        <h5 className="p-2.5">{question.options[2]}</h5>
      </div>
      <div className="quiz-options">
        <p>3</p>
        <h5 className="p-2.5">{question.options[3]}</h5>
      </div>
      <div className="quiz-options">
        <p>4</p>
        <h5 className="p-2.5">{question.options[4]}</h5>
      </div>
      <div className="flex justify-end mr-4 mt-3 ">
        {/* <MdFavoriteBorder className="fav-icon text-2xl cursor-pointer hover:text-[#B91C1C]" /> */}
        <button
          className={`heart mr-1 ${isFav ? "fvrt" : "unFvrt"}`}
          onClick={() => toggleFavItem(question)}
        ></button>
        {!isFav ? <p>Add to favorite</p>:<p>Remove favorite</p> }
        
      </div>
    </div>
  );
};

export default StartQuizCard;
