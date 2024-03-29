import { setToast } from "./../toastSlice";
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
import { BigNumber, ethers } from "ethers";
import { RootState } from "../../store";
interface initialStateType {
  isAccountExist: boolean;
  publicKey: any;
  isInformationDialog: boolean;
  balance: number;
  allowanceBalance: number;
  amount: number;
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

        const balance: BigNumber = await contract.balanceOf(address);
        const allowanceBalance: BigNumber = await contract.allowance(
          address,
          receiveUsdcAddress
        );

        let balanceNumber = balance.toNumber();
        let allowanceBalanceNumber = allowanceBalance.toNumber();
        const obj = { balanceNumber, allowanceBalanceNumber };
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
    { dispatch, getState, rejectWithValue }
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

        // provider.getGasPrice();
        const currentGasPrice = await provider.getGasPrice();
        const adjustedGasPrice = currentGasPrice.mul(2);

        const amountFull = await ethers.utils.parseUnits(amount.toString(), 6);
        const state: RootState = getState() as RootState;

        try {
          const data = await contract.receiveUSDC(amountFull, {
            gasLimit: 310000,
            gasPrice: adjustedGasPrice,
            nonce: null,
          });
          let result = await data.wait();
          const myUsdcContract = new ethers.Contract(myusdc, usdcMockABI, signer);
          const newAllowanceBalance = await myUsdcContract.allowance(
            account,
            receiveUsdcAddress
          );
          let newAllowanceBalanceNumber = newAllowanceBalance.toNumber();
          dispatch(
            setToast({ message: "Transaction is successfull", type: "success" })
          );
          const acc: string[] | any = await (window as any).mina.getAccounts()
          const url = "http://localhost:3000/startTransfer";
          const body = {
            txHash: result.transactionHash,
            minaPublickKey: acc[0],
          };
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          return newAllowanceBalanceNumber;
        } catch (error) {
          dispatch(setToast({ message: "Error occurred", type: "error" }));
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
    { dispatch, rejectWithValue }
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

        const newAllowanceBalance = await myUsdcContract.allowance(
          account,
          receiveUsdcAddress
        );
        let newAllowanceBalanceNumber = newAllowanceBalance.toNumber();
        dispatch(setToast({ message: "Approved", type: "success" }));
        return newAllowanceBalanceNumber;

        // return balance;
      }
    } catch (error) {
      dispatch(setToast({ message: "Error occurred", type: "error" }));
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
  amount: 0,
  isSendingContract: false,
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

    setAmount: (state: initialStateType, action: PayloadAction<any>) => {
      state.amount = action.payload;
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
        const { balanceNumber, allowanceBalanceNumber } = action.payload;
        state.balance = balanceNumber;
        state.allowanceBalance = allowanceBalanceNumber;
        state.isSendingContract = false;
      })
      .addCase(approve.fulfilled, (state, action: any) => {
        state.allowanceBalance = action.payload;
        state.isSendingContract = false;
      })
      .addCase(sendContract.fulfilled, (state, action: any) => {
        state.allowanceBalance = action.payload;
        state.isSendingContract = true;
      })
      .addCase(sendContract.rejected, (state) => {
        state.isSendingContract = true;
        // toast.error("User rejected");
      });
  },
});

export const {
  setIsAccountExist,
  setPublicKey,
  setIsInformationDialogOpen,
  setResetBalance,
  setAmount,
} = dataSlice.actions;

export const selectBalance = (state: RootState) =>
  ethers.BigNumber.from(state.dataSlice.balance);
export const selectAllowanceBalance = (state: RootState) =>
  ethers.BigNumber.from(state.dataSlice.allowanceBalance);
export const selectAmount = (state: RootState) =>
  ethers.BigNumber.from(state.dataSlice.amount);

export default dataSlice.reducer;
