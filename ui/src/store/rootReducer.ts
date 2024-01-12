import { combineReducers } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
import toastReducer from './toastSlice';

const createReducer = combineReducers({
  dataSlice,
  toast: toastReducer,
});

export default createReducer;
