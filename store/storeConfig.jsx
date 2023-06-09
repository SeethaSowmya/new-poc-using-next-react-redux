'use client'

import logSlice from "./logSlice";
import postSlice from "./postSlice";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
// import userSlice from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";
// import { createStore } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
// const rootReducer = combineReducers({
//   log:logSlice,
// });

// const persistedReducers = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer:persistedReducers,
// });

const store = configureStore({
    reducer:{
      logstate:logSlice,
      postData:postSlice
    }
})

export default store
