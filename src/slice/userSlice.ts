import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type workspaceType = {
  workspaceId: string;
  favorites: string[];
};

export interface UserState {
  id: string;
  name: string;
  email: string;
  isDarkMode: boolean;
  profilePicture: {
    url: string;
  };
  workspaces: workspaceType[];
}

const storedUserInfo = localStorage.getItem("userInfo");

const initialState: { userInfo: UserState | null } = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
