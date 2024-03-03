import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface UserState {
  loading: boolean;
  user: any;
}

const initialState: UserState = {
  loading: true,
  user: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, payload: PayloadAction<UserState["user"]>) => {
      state.user = payload.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUserState = (state: RootState) => state.userSlice;
export const getUser = (state: RootState) => state.userSlice.user;

export default userSlice.reducer;
