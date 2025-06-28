import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearAuth } = adminSlice.actions;
export default adminSlice.reducer;
