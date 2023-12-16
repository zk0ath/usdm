import { usdcMockABI } from "@/helpers/usdc-mock-abi";
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  ActionReducerMapBuilder,
} from "@reduxjs/toolkit";
import { ethers } from "ethers";

interface initialStateType {
  isAccountExist: boolean;
  publicKey: any;
  isInformationDialog: boolean;
  balance: any;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

export const getContract = createAsyncThunk(
  "data/getContract",
  async (_, { rejectWithValue }) => {
    try {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          "0xa93310154d44C724A8c2E7ec52f44AEeEE617cFA",
          usdcMockABI,
          provider
        );
        const balance = await contract.balanceOf(
          "0x4dBE39332d4E04D9D7b6c4bD3b4F4012148F5BCd"
        );
        return balance;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    isAccountExist: false,
    publicKey: null,
    isInformationDialog: false,
    balance: 0,
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

    setIsInformationDialogOpen: (
      state: initialStateType,
      action: PayloadAction<any>
    ) => {
      state.isInformationDialog = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<any>) => {
    builder
      .addCase(getContract.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(getContract.rejected, (state) => {});
  },
});

export const { setIsAccountExist, setPublicKey, setIsInformationDialogOpen } =
  dataSlice.actions;

export default dataSlice.reducer;
