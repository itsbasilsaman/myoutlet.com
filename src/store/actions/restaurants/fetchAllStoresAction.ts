import { adminEndPoint } from "@/constants/endPointsUrl";
import api from "@/lib/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface FetchRestaurantPayload {
    page?: number;
    limit?: number;
}

export const fetchAllRestaurants = createAsyncThunk(
    "restaurant/fetchAllRestaurants",
    async (payload: FetchRestaurantPayload, { rejectWithValue }) => {
        try {
            const response = await api.get(`${adminEndPoint.STORE}/all`, {
                params: {
                    page: payload.page,
                    limit: payload.limit,
                },
            });
            return response.data;
        } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            return rejectWithValue(
                err.response?.data?.message || "Failed to fetch restaurants"
            );
        }
    }
);