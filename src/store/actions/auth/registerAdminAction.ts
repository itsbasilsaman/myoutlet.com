import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const registerAdminAction = createAsyncThunk(
  "/restaurant/registerAdmin",
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const basicAuth = btoa("myoutlet:myoutlet.app@124");

      const response = await api.post(
        `${adminEndPoint.AUTH}/register`,
        { email, password },
        {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            skip: true,
          },
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      return rejectWithValue(
        error.response?.data?.message || "Failed to register admin"
      );
    }
  }
);
