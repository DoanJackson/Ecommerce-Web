import { createSlice } from "@reduxjs/toolkit";

const initialFormState = { logForm: true };
const formSlice = createSlice({
  name: "formChange",
  initialState: initialFormState,
  reducers: {
    changeForm(state) {
      state.logForm = !state.logForm;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;
