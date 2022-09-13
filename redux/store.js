import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./activitySlice";

export const store = configureStore({
  reducer: {
    userData: counterReducer,
  },
});
