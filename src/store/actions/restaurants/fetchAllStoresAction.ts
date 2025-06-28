import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllRestaurants = createAsyncThunk(
    "restaurant/fetchAllRestaurants",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(adminEndPoint.GETALLSTORE);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch tables"
            );
        }
    }
);