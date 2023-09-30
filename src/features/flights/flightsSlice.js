import { createSlice } from "@reduxjs/toolkit";
import data from "../../data/data.json";

const initialState = {
  flights: data.result.flights,
  carriers: {
    bestDirect: data.result.bestPrices.DIRECT.bestFlights,
    bestTransfer: data.result.bestPrices.ONE_CONNECTION.bestFlights,
  },
  filters: {
    sortType: 1,
    transfer: { direct: false, transfer: false },
    price: { from: 0, to: 1000000 },
    carriers: [],
  },
};

const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    changeSortByType: (state, action) => {
      state.filters.sortType = action.payload;
    },
    changeSortByTransfer: (state, action) => {
      const { type, value } = action.payload;
      state.filters.transfer[type] = value;
    },
    changeFilterByPrice: (state, action) => {
      const { type, value } = action.payload;
      state.filters.price[type] = value;
    },
    changeCarriers: (state, action) => {
      const set = new Set(state.filters.carriers);
      set.has(action.payload)
        ? set.delete(action.payload)
        : set.add(action.payload);
      state.filters.carriers = [...set];
    },
  },
});

export const {
  changeSortByType,
  changeFilterByPrice,
  changeSortByTransfer,
  changeCarriers,
} = flightsSlice.actions;
export default flightsSlice.reducer;
