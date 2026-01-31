import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  isAuthenticated: false,
  loading: true // important for initial app load
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser(state) {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
    }
  }
});

export const { loginUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
