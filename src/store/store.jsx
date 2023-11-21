import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slice/tokenSlice";
import quizReducer from "./slice/quizSlice";
import registerReducer from "./slice/registerSlice";
import userReducer from "./slice/userSlice";
import myQuizReducer from "./slice/getQuizSlice";
import allpublishedquizReducer from "./slice/AllPublishedQuizSlice";

export const store = configureStore({
    reducer:{
        token:tokenReducer,
        quiz:quizReducer,
        register:registerReducer,
        user:userReducer,
        myQuiz:myQuizReducer,
        allPublishedQuiz:allpublishedquizReducer
    }
})