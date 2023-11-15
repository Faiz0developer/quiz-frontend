import { createSlice } from "@reduxjs/toolkit";

const initialState={
    quizName:'',
    category:'',
}

export const quizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers:{
        getQuizDetials(state,action){
            state.quizName = action.payload.quizName
            state.category = action.payload.category
        }
    }
})

export const {getQuizDetials} = quizSlice.actions;
export default quizSlice.reducer