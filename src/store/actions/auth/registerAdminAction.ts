import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerAdminAction = createAsyncThunk(
  "restaurant/registerAdmin",
  async (
    {email, password}
    : {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(adminEndPoint.REGISTER, {email, password});
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tables"
      );
    }
  }
);
