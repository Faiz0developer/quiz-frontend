import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    token:"",
    email:"",
}

export const registerSlice = createSlice({
    name:'registerUser',
    initialState,
    reducers:{
        userRegister(state,action){
            state.token = action.payload.data.token;
            state.email = action.payload.data.email;
        }
    }
})

export const {userRegister} = registerSlice.actions;

export default registerSlice.reducer