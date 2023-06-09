'use client'
import { createSlice } from "@reduxjs/toolkit";


const logSlice =  createSlice({
    name:'logstate',
    initialState:{log:false},
    reducers:{
        updateLogState(state,action){
            console.log(action,"action")
            state.log = action.payload
        }
    }
})

export default logSlice.reducer
export const {updateLogState} =  logSlice.actions;