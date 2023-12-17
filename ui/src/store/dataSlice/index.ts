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
  async (address: string, { rejectWithValue }) => {
    try {
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          "0xa93310154d44C724A8c2E7ec52f44AEeEE617cFA",
          usdcMockABI,
          provider
        );
        console.log("address: " + address);

        const balance = await contract.balanceOf(address);
        return balance;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState: initialStateType = {
  isAccountExist: false,
  publicKey: null,
  isInformationDialog: false,
  balance: 0,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
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
    setResetBalance: (state: initialStateType) => {
      state.balance = 0;
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

export const {
  setIsAccountExist,
  setPublicKey,
  setIsInformationDialogOpen,
  setResetBalance,
} = dataSlice.actions;

export default dataSlice.reducer;
