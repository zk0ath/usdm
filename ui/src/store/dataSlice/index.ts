import {
  myusdc,
  receiveUsdcABI,
  receiveUsdcAddress,
  usdcMockABI,
} from "@/helpers/usdc-mock-abi";
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
  allowanceBalance: any;
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
        const contract = new ethers.Contract(myusdc, usdcMockABI, provider);

        const balance = await contract.balanceOf(address);
        const allowanceBalance = await contract.allowance(
          address,
          receiveUsdcAddress
        );
        const obj = { balance, allowanceBalance };
        return obj;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const sendContract = createAsyncThunk(
  "data/sendContract",
  async (
    params: { amount: number | string; account: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { amount, account } = params;
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);

        const contract = new ethers.Contract(
          receiveUsdcAddress,
          receiveUsdcABI,
          signer
        );

        provider.getGasPrice();

        const count = await ethers.utils.parseUnits(amount.toString(), 6);

        try {
          const data = await contract.receiveUSDC(count, {
            gasLimit: 310000,
            gasPrice: provider.getGasPrice(),
            nonce: null,
          });
          await data.wait();
        } catch (error) {
          console.log(error, "hata");
        }

        // return balance;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const approve = createAsyncThunk(
  "data/approve",
  async (
    params: { amount: number | string; account: string | undefined },
    { rejectWithValue }
  ) => {
    try {
      const { amount, account } = params;
      if (window?.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner(account);
        const myUsdcContract = new ethers.Contract(myusdc, usdcMockABI, signer);
        const count = await ethers.utils.parseUnits(amount.toString(), 6);

        const tx = await myUsdcContract.approve(receiveUsdcAddress, count);
        await tx.wait();

        // return balance;
      }
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const initialState = {
  isAccountExist: false,
  publicKey: null,
  isInformationDialog: false,
  balance: 0,
  allowanceBalance: 0,
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
      .addCase(getContract.fulfilled, (state, action: any) => {
        const { balance, allowanceBalance } = action.payload;
        state.balance = balance;
        state.allowanceBalance = allowanceBalance;
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
