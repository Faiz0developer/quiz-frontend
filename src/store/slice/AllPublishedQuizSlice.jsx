import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    publishedQuiz:[]
}

export const allpublishedquizSlice = createSlice({
    name:'allPublishedQuiz',
    initialState,
    reducers:{
        getAllPublishedQuiz(state,action){
            console.log(action.payload)
        }
    }
})

export const {getAllPublishedQuiz} = allpublishedquizSlice.actions;

export default allpublishedquizSlice.reducer;