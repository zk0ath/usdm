import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

export const getData = createAsyncThunk("data/getData", async () => {
  fetch("");
  return "taha";
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    name: "taha",
    data: [],
  },
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {},
});

export const {} = dataSlice.actions;

export default dataSlice.reducer;
