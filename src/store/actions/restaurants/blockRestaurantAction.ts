import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const blockRestaurantAction = createAsyncThunk(
  "restaurant/blockRestaurant",
  async ({ id, isActive }: { id: string; isActive: boolean }, thunkAPI) => {
    try {
      await api.patch(adminEndPoint.BLOCKRESTAURANT(id, isActive));;
      return { id, isActive };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);