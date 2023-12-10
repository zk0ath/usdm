import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";

interface initialStateType {
  isAccountExist: boolean;
  publicKey: any;
}

export const getData = createAsyncThunk("data/getData", async () => {
  fetch("");
  return "taha";
});

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    isAccountExist: false,
    publicKey: null,
  },
  reducers: {
    setIsAccountExist: (
      state: initialStateType,
      action: PayloadAction<boolean>
    ) => {
      state.isAccountExist = action.payload;
    },
    setPublicKey: (state: initialStateType, action: PayloadAction<any>) => {
      state.publicKey = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {},
});

export const { setIsAccountExist, setPublicKey } = dataSlice.actions;

export default dataSlice.reducer;
