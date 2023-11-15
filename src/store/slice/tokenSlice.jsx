import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:'',
    name:""
}

export const tokenSlice = createSlice({
    name:'token',
    initialState,
    reducers:{
        setToken(state,action){
            state.token=action.payload.token
            state.name=action.payload.name
        }
    }
})

export const {setToken} = tokenSlice.actions

export default tokenSlice.reducer