import { configureStore } from "@reduxjs/toolkit";
import reducerManager from "./combine_slice";

const store = configureStore({
  reducer: reducerManager.combined,
});

export default store;
