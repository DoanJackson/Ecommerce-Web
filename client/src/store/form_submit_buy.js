import { createSlice } from "@reduxjs/toolkit";

const initialFormBuyState = {
  address: { city: { name: "", id: "" }, district: { name: "", id: "" } },
  quantity: 1,
};
const formBuySlice = createSlice({
  name: "formBuy",
  initialState: initialFormBuyState,
  reducers: {
    setQuantity(state, actions) {
      state.quantity = actions.payload;
    },
    setcity(state, actions) {
      state.address.city = {
        name: actions.payload.name,
        id: actions.payload.id,
      };
    },
    setDistrict(state, actions) {
      state.address.district = {
        name: actions.payload.name,
        id: actions.payload.id,
      };
    },
    reset(state) {
      Object.assign(state, initialFormBuyState);
    },
  },
});

export const formBuyActions = formBuySlice.actions;
export default formBuySlice;
