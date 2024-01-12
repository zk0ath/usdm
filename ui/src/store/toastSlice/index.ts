import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  type: 'success' | 'error' | 'info' | 'warning' | null;
  message: string | null;
}

const initialState: ToastState = {
  type: null,
  message: null,
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<ToastState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearToast: (state) => {
      state.type = null;
      state.message = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
