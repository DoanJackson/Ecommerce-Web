import { createSlice } from "@reduxjs/toolkit";

const initialUserState = { email: "", name: "", role: "" };
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    SetDataUser(state, actions) {
      state.email = actions.payload.email;
      state.name = actions.payload.name;
      state.role = actions.payload.role;
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
