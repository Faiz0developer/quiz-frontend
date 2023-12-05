import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublishedQuiz } from "../../store/slice/AllPublishedQuizSlice";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { startQuiz } from "../../store/slice/StartExamSlice";

const QuizCard = ({ setSearchInput, searchInput }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(false);
  const [allPublishedQuiz, setAllPublishedQuiz] = useState();
  const navigate = useNavigate()

  console.log(searchInput);
  // const allPublishedQuiz = useSelector(
  //   (state) => state.allPublishedQuiz.publishedQuiz
  // );

  useEffect(() => {
    const fetchAllQuizdata = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "http://localhost:3002/quiz/allpublishedquiz",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // setIsLoading(false);
        setAllPublishedQuiz(res.data.data);
        if (res.data.status === "success") {
          dispatch(getAllPublishedQuiz(res.data.data));
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllQuizdata();
  }, [token]);

  const AllQuizData =
    searchInput === "all" || searchInput === undefined
      ? allPublishedQuiz
      : allPublishedQuiz?.filter(
          (allQuiz) =>
            allQuiz.name.toLowerCase().includes(searchInput) ||
            // allQuiz.name.toUpperCase().includes(searchInput) ||
            allQuiz.category.toLowerCase().includes(searchInput)
            // allQuiz.category.toUpperCase().includes(searchInput)
        );

        const startExam =async(quizId) =>{
          try {
            const res = await axios.get(`http://localhost:3002/exam/${quizId}`,{
              headers:{
                Authorization: `Bearer ${token}`
              }
            })
            if(res.data.status === 'success'){
              dispatch(startQuiz(res.data.data))
               navigate('/start-exam') 
            }
          } catch (error) {
            console.log(error)
          }
          // console.log(quizId)
        }

  return (
    <div className="pb-5 px-10 pt-10">
      <h1 className="text-4xl font-[sans] text-[#1E293B] text-center">
        Take Quiz
      </h1>
      {/* {isLoading ? (
        <div class="my-quiz-loader-wrapper mt-20">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <span>Loading</span>
        </div>
      ) : (
        <> */}
          {AllQuizData?.length ? (
            <div className="quiz-cards-container">
              {AllQuizData?.map((quiz) => {
                return (
                  <React.Fragment key={quiz._id}>
                    {isLoading ? (
                      <div className="animated-background h-32"></div>
                    ) : (
                      <div className="quiz-card-contianer relative">
                        <div className="quiz-name-card">
                          <h1 className="text-xl">{quiz.name}</h1>
                        </div>
                        <div className="bottom-line"></div>
                        <div
                          className="quiz-card"
                          // onClick={()=>startExam(quiz._id)}
                        >
                          <h1 className="text-xl">{quiz.name}</h1>
                          <h3>
                            Category: <span>{quiz.category}</span>
                          </h3>
                          <h4>
                            Passing Percentage:{" "}
                            <span>{quiz.passingPercentage}%</span>
                          </h4>
                          <button className="start-quiz-btn" onClick={()=>startExam(quiz._id)}>Start Exam</button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center mt-20">
              <p className="text-center text-xl">No Quiz Found</p>
              <FallingLines
                color="#4fa94d"
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </div>
          )}
        {/* </> */}
      {/* )} */}
    </div>
  );
};

export default QuizCard;
