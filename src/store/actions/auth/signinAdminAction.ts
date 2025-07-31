import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const signinAdminAction = createAsyncThunk(
  "/restaurant/signinAdmin",
  async (
    {email, password}
    : {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`${adminEndPoint.AUTH}/login`, {email, password});
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to sign in admin"
      );
    }
  }
);
