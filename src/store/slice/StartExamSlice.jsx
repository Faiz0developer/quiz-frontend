import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    startQuiz:""
}

export const startExamSlice = createSlice({
    name:"startExam",
    initialState,
    reducers:{
        startQuiz(state,action){
            state.startQuiz = action.payload
        }
    }
})

export const {startQuiz} = startExamSlice.actions;
export default startExamSlice.reducer;