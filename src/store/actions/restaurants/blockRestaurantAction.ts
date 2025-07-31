import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const blockRestaurantAction = createAsyncThunk(
  "restaurant/blockRestaurant",
  async ({ id, isActive }: { id: string; isActive: boolean }, thunkAPI) => {
    try {
      await api.patch(`${adminEndPoint.STORE}/${id}/status?isActive=${isActive}`);
      return { id, isActive };
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);