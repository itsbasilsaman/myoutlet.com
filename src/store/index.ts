import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./slices/adminSlice";
import restaurantReducer from "./slices/restaurantSlice";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        restaurant: restaurantReducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;