'use client'
import { createSlice } from "@reduxjs/toolkit";


const postSlice =  createSlice({
    name:'postData',
    initialState:{postdata:[]},
    reducers:{
        storeData(state,action){
            console.log(action,"action")

            state.postdata = action.payload
        },
        UpdateData(state,action){
            console.log(action,"action")
            // state.log = action.payload
        },
        InsertData(state,action){
            console.log(action,"action")
            state.postdata =[...state.postdata, action.payload]
        }
    }
})

export default postSlice.reducer
export const {storeData} =  postSlice.actions;
export const {UpdateData} =  postSlice.actions;
export const {InsertData} =  postSlice.actions;