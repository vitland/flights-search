import { configureStore } from "@reduxjs/toolkit";
import flightsReducer from "../features/flights/flightsSlice";

export const store = configureStore({
  reducer: {
    flights: flightsReducer,
  },
});
