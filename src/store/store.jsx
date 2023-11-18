import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./slice/tokenSlice";
import quizReducer from "./slice/quizSlice";
import registerReducer from "./slice/registerSlice";
import userReducer from "./slice/userSlice";

export const store = configureStore({
    reducer:{
        token:tokenReducer,
        quiz:quizReducer,
        register:registerReducer,
        user:userReducer
    }
})