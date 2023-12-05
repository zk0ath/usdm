import { combineReducers } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const createReducer = combineReducers({
  dataSlice,
});

export default createReducer;
