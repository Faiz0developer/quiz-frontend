import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:"",
    email:"",
    userId:"",
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        getUserData(state,action){
            state.name=action.payload.name;
            state.email=action.payload.email;
            state.userId=action.payload._id;
        }
    }
})

export const {getUserData} = userSlice.actions

export default userSlice.reducer