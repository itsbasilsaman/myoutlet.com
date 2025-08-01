import { createSlice } from "@reduxjs/toolkit";
import { fetchAllRestaurants } from "../actions/restaurants/fetchAllStoresAction";
import { blockRestaurantAction } from "../actions/restaurants/blockRestaurantAction";
import { RestaurantType } from "@/types/restaurant";

interface RestaurantState {
  loading: boolean;
  data: RestaurantType[];
  error: string | null;
    totalPages?: number;
  totalCount?: number;
}

const initialState: RestaurantState = {
  loading: false,
  data: [],
  error: null,
  totalPages: undefined,
  totalCount: undefined,
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(blockRestaurantAction.fulfilled, (state, action) => {
        const { id, isActive } = action.payload;
        const restaurant = state.data.find((r) => r.id === id);
        if (restaurant) {
          restaurant.is_active = isActive;
        }
      });
  },
});

export default restaurantSlice.reducer;
