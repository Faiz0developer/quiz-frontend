import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../styles/favoriteQuestion.css";
import FavoriteQuestion from "../components/FavoriteQuestion";
import { FallingLines } from "react-loader-spinner";

const FavoriteQuestionPage = () => {
  const token = useSelector((state) => state.token.token);
  const [favQuestionData, setFavQuestionData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFavQuestionsData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:3002/favquestion", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setFavQuestionData(res.data.data.favQues);
      } catch (error) {
        console.log(error);
      }
    };
    getFavQuestionsData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div class="my-quiz-loader-wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <span>Loading</span>
          </div>
        </div>
      ) : (
        <div className="pt-10">
          <h1 className="heading">Favorite Questions Collection</h1>
          <div className="p-4">
            {favQuestionData?.length ? (
              <>
                {favQuestionData?.map((favQuestion, index) => {
                  return (
                    <FavoriteQuestion
                      favQuestion={favQuestion}
                      index={index}
                      setFavQuestionData={setFavQuestionData}
                      favQuestionData={favQuestionData}
                    />
                  );
                })}
              </>
            ) : (
                <div className="flex flex-col h-[30vh] items-center mt-20">
                <p className="text-center text-xl">Collection is empty.</p>
                <FallingLines
                  color="#4fa94d"
                  width="100"
                  visible={true}
                  ariaLabel="falling-lines-loading"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteQuestionPage;
