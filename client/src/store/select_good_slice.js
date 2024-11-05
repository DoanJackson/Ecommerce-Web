import { createSlice } from "@reduxjs/toolkit";

const initialShowDetail = { isShow: false, idGood: "" };
const showDetailSlice = createSlice({
  name: "showDetail",
  initialState: initialShowDetail,
  reducers: {
    show(state, actions) {
      state.isShow = true;
      state.idGood = actions.payload.id;
    },
    unShow(state) {
      state.isShow = false;
      state.idGood = "";
    },
  },
});

export const showDetailActions = showDetailSlice.actions;
export default showDetailSlice;
