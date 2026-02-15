import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import followReducer from "./followSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    follow: followReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
