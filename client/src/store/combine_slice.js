// import form_slice from "./change_form";
import user_slice from "./user_slice";
import { combineReducers } from "@reduxjs/toolkit";

const reducerManager = {
  reducers: {
    userInitial: user_slice,
  },
  add: function (key, reducer) {
    if (!this.reducers[key]) {
      this.reducers[key] = reducer;
      this.combine();
    }
  },
  remove: function (key) {
    if (this.reducers[key]) {
      delete this.reducers[key];
      this.combine();
    }
  },
  combine: function () {
    this.combined = combineReducers(this.reducers);
  },
  has: function (key) {
    return Boolean(this.reducers[key]);
  },
};
reducerManager.combine();
export default reducerManager;
