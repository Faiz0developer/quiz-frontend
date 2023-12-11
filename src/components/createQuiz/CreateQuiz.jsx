import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Carousel from "react-multi-carousel";
import { ToastContainer, toast } from "react-toastify";
import QuizNameModel from "./QuizNameModel";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const radioRef = useRef();
  const [quizDetails, setQuizDetails] = useState(false);
  const [showSelectItems, setShowSelectItems] = useState(false);
  const [name, setName] = useState();
  const [category, setCategory] = useState("exam");
  const [passingPercentage, setPassingPercentage] = useState(0);
  const [isPublicQuiz, setIsPublicQuiz] = useState(true);
  const [allUsers, setAllUsers] = useState();
  const [allowedUser, setAllowedUsers] = useState([]);

  const [questionDetails, setQuestionDetails] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    },
  ]);
  const [answers, setAnswers] = useState({});
  const [isSelected, setIsSelected] = useState("");

  const token = useSelector((state) => state.token.token);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3002/user/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        setAllUsers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [token]);

  const checkBoxHandler = (e) => {
    if (radioRef.current?.checked) {
      setIsPublicQuiz(true);
    } else {
      setIsPublicQuiz(false);
    }
  };

  const questionInputHandler = (e, index) => {
    let data = [...questionDetails];
    data[index][e.target.name] = e.target.value;
    setQuestionDetails(data);
  };

  const optionsHandler = (e, index) => {
    const value = e.target.value;
    // const numVal = +value
    // console.log(typeof numVal)
    setAnswers({ ...answers, [index + 1]: Number(value) });
    setIsSelected(String(index)+value);
  };

  const addFields = () => {
    let obj = {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    };

    setQuestionDetails([...questionDetails, obj]);
  };

  const filterUsers = allowedUser?.map((userId) =>
    allUsers?.filter((user) => user._id === userId)
  );

  let questionList;

  const createQuizHandler = async () => {
    questionList = questionDetails.map((quesDet, index) => {
      return {
        questionNumber: index + 1,
        question: quesDet.question,
        options: {
          1: quesDet.option1,
          2: quesDet.option2,
          3: quesDet.option3,
          4: quesDet.option4,
        },
      };
    });

    const quizData = {
      name,
      category,
      questionList,
      answers,
      passingPercentage: +passingPercentage,
      isPublicQuiz,
      allowedUser,
    };
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3002/quiz", quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      setIsLoading(false);
      if (res.data.status === "success") {
        toast.success(res.data.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      setTimeout(() => {
        navigate(`/my-quizzes/${res.data.data.quizId}`)
      }, 2000)
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="p-4 relative">
      <div className="create-quiz-details w-[90%] min-[650px]:w-[75%] min-[800px]:w-[60%]">
        {quizDetails ? (
          <h1 className="w-full h-[46px] p-2.5 text-3xl rounded-md text-[#064E3B]">
            {name}
          </h1>
        ) : (
          <input
            type="text"
            className="name-input w-full"
            placeholder="Quiz name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <div className="flex justify-between w-full mt-3">
          <div
            className={`${
              quizDetails
                ? "flex px-4 py-2 rounded-md"
                : "dropDown before:top-[60%] after:top-[75%] flex flex-col gap-1"
            } `}
          >
            <label>Category</label>
            {quizDetails ? (
              <h1 className="text-center text-[#064E3B]">: {category}</h1>
            ) : (
              <select
                name="category"
                id=""
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {/* <option value="Category">Category</option> */}
                <option value="exam">Exam</option>
                <option value="test">Test</option>
              </select>
            )}
          </div>
          <div
            className={`flex gap-2 ${
              quizDetails ? "px-4 py-2 rounded-md " : "flex-col "
            }`}
          >
            <label>Passing Percentage</label>
            {quizDetails ? (
              <h1 className="text-center text-[#064E3B]">
                : {passingPercentage}%
              </h1>
            ) : (
              <input
                type="number"
                className="name-input"
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(e.target.value)}
              />
            )}
          </div>
        </div>
        <div
          className={`flex items-center mt-3 w-full ${
            quizDetails ? "flex-col py-3" : "justify-around gap-8 h-[80px]"
          } `}
        >
          <div
            className={`flex items-center gap-1 ${
              quizDetails ? "px-4 py-2  rounded-md" : ""
            }`}
          >
            {quizDetails || <label>Public</label>}
            {quizDetails ? (
              <h1 className="text-[#064E3B]">
                {isPublicQuiz ? "Public Quiz" : "Private Quiz"}
              </h1>
            ) : (
              <input
                type="checkbox"
                defaultChecked
                // value={isPublicQuiz}
                ref={radioRef}
                onChange={checkBoxHandler}
                // onChange={() => setIsPublicQuiz(!isPublicQuiz)}
                className="cursor-pointer"
              />
            )}
          </div>
          {isPublicQuiz || (
            <>
              {quizDetails ? (
                <div className="allowed-user-container py-2 mt-1 w-full">
                  <h1 className="text-center">Allowed Users</h1>
                  <Carousel
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlay
                    autoPlaySpeed={5000}
                    centerMode={true}
                    className=""
                    containerClass="container-with-dots"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass="item-class"
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    // responsive={responsive}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 5,
                        partialVisibilityGutter: 40,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 464,
                        },
                        items: 3,
                        partialVisibilityGutter: 30,
                      },
                    }}
                    rewind={false}
                    rewindWithAnimation={true}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    {filterUsers.map((user) => {
                      return (
                        <div className="user-card" key={user[0]._id}>
                          <h1 className=" text-center text-[#064E3B]">
                            {user[0].name}
                          </h1>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              ) : (
                <div className="select-container">
                  <div
                    className="select-btn"
                    onClick={() => setShowSelectItems(!showSelectItems)}
                  >
                    <span>Select Users</span>
                    <span>
                      {showSelectItems ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                  {showSelectItems && (
                    <ul className="select-items">
                      {allUsers.map((user) => {
                        return (
                          <li key={user._id}>
                            <input
                              type="checkbox"
                              value={user._id}
                              onChange={(e) =>
                                setAllowedUsers([
                                  ...allowedUser,
                                  e.target.value,
                                ])
                              }
                            />
                            <label htmlFor="">{user.name}</label>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <h1 className="w-full text-right">
          <span
            className="done-btn"
            onClick={() => {
              setQuizDetails(!quizDetails);
            }}
          >
            {quizDetails ? "Update" : "Done"}
          </span>
        </h1>
      </div>

      <div className="create-question-list-container w-[90%] min-[650px]:w-[75%] min-[800px]:w-[60%]">
        {questionDetails.map((questionData, index) => {
          return (
            <div className="create-question-list-content" key={index}>
              <div className="flex flex-col gap-1 mt-4">
                <textarea
                  rows={2}
                  cols={50}
                  placeholder="Question"
                  name="question"
                  onChange={(e) => questionInputHandler(e, index)}
                  value={questionData.question}
                />
              </div>
              <div>
                <div
                  className={`flex items-center justify-between mt-2 py-2 pr-1.5 gap-2 ${
                    isSelected.includes(String(index)+1) ? "bg-[#4ADE80]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_options-${index}`}
                    value="1"
                    onChange={(e) => optionsHandler(e, index)}
                  />
                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="text"
                      className="name-input w-full"
                      name="option1"
                      placeholder="Option 1"
                      onChange={(e) => questionInputHandler(e, index)}
                      value={questionDetails.options1}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between mt-2 py-2 pr-1.5 gap-2 ${
                    isSelected.includes(String(index)+2) ? "bg-[#4ADE80]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_options-${index}`}
                    value="2"
                    onChange={(e) => optionsHandler(e, index)}
                  />
                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="text"
                      className="name-input w-full"
                      name="option2"
                      placeholder="Option 2"
                      onChange={(e) => questionInputHandler(e, index)}
                      value={questionDetails.options2}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between mt-2 py-2 pr-1.5 gap-2 ${
                    isSelected.includes(String(index)+3) ? "bg-[#4ADE80]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_options-${index}`}
                    value="3"
                    onChange={(e) => optionsHandler(e, index)}
                  />
                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="text"
                      className="name-input w-full"
                      name="option3"
                      placeholder="Option 3"
                      onChange={(e) => questionInputHandler(e, index)}
                      value={questionDetails.options3}
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center justify-between mt-2 py-2 pr-1.5 gap-2 ${
                    isSelected.includes(String(index)+4) ? "bg-[#4ADE80]" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question_options-${index}`}
                    value="4"
                    onChange={(e) => optionsHandler(e, index)}
                  />
                  <div className="flex items-center gap-1 w-full">
                    <input
                      type="text"
                      className="name-input w-full"
                      name="option4"
                      placeholder="Option 4"
                      onChange={(e) => questionInputHandler(e, index)}
                      value={questionDetails.options4}
                    />
                  </div>
                </div>
              </div>
              {/* <button onClick={() => addQuestionData(index)}>Submit</button> */}
            </div>
          );
        })}

        <div className="text-right px-4 py-2">
          <span onClick={addFields} className="done-btn border-[#D97706]">
            Add
          </span>
        </div>
      </div>
      <h1 className="text-center px-4 py-2 mt-10">
        <span onClick={createQuizHandler} className="quiz-button">
          Create Quiz
        </span>
      </h1>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <QuizNameModel />}
    </div>
  );
};

export default CreateQuiz;
