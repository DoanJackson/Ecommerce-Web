import { createSlice } from "@reduxjs/toolkit";

// users.email,users.name,client.age,client.address, client.balance, client.telphone,client.roleclient
const initialUserInforState = {
  email: "",
  name: "",
  age: 0,
  address: "",
  balance: "",
  telphone: "",
  roleclient: "",
};
const userInforSlice = createSlice({
  name: "userInfor",
  initialState: initialUserInforState,
  reducers: {
    changeData(state, actions) {
      const data = actions.payload;
      Object.assign(state, data);
    },
    changeRole(state, actions) {
      state.roleclient = actions.payload;
    },
  },
});
export const userInforActions = userInforSlice.actions;
export default userInforSlice;
