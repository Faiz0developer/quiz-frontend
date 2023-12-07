import axios from "axios";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const FavoriteQuestion = ({
  favQuestion,
  index,
  setFavQuestionData,
  favQuestionData,
}) => {
  const token = useSelector((state) => state.token.token);
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

  const deleteFavQuestionHandler = (id) => {
    setIsDeleteConfirm(favQuestionData.some((favQues) => favQues._id === id));
  };

  const removeFavQuestionHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3002/favquestion/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.data.status === "success") {
        setFavQuestionData((prevData) => {
          return prevData.filter((favquest) => favquest._id !== id);
        });
        setIsDeleteConfirm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div key={favQuestion._id} className="fav-ques-card">
        <div className="flex flex-col justify-between mt-1 px-2">
          <div className={`heart mr-1 fvrt`}></div>
          {isDeleteConfirm || (
            <MdDelete
              className="text-xl hover:text-[#DC2626] cursor-pointer"
              onClick={() => deleteFavQuestionHandler(favQuestion._id)}
            />
          )}
        </div>
        <div className="w-[93%] relative">
          <h1 className="text-lg font-semibold">
            {index + 1}) {favQuestion.question}
          </h1>
          <ul>
            <li>a) {favQuestion.options[1]}</li>
            <li>b) {favQuestion.options[2]}</li>
            <li>c) {favQuestion.options[3]}</li>
            <li>d) {favQuestion.options[4]}</li>
          </ul>
          {isDeleteConfirm && (
            <div className="btn-container">
              <button
                className="bottom-btns hover:text-[#16A34A]"
                onClick={() => setIsDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bottom-btns hover:text-[#DC2626]"
                onClick={() => removeFavQuestionHandler(favQuestion._id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
  );
};

export default FavoriteQuestion;
