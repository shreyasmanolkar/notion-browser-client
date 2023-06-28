import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout as userLogout } from "./userSlice";

export type PageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
  title: string;
  createdAt: Date;
};

export interface WorkspaceState {
  id: string;
  name: string;
  icon: string;
  members: string[];
  pages: PageType[];
}

const storedWorkspaceInfo = localStorage.getItem("workspaceInfo");

const initialState: { workspaceInfo: WorkspaceState | null } = {
  workspaceInfo: storedWorkspaceInfo ? JSON.parse(storedWorkspaceInfo) : null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspace: (state, action: PayloadAction<WorkspaceState>) => {
      state.workspaceInfo = action.payload;
      localStorage.setItem("workspaceInfo", JSON.stringify(action.payload));
    },
    clearWorkspace: (state) => {
      state.workspaceInfo = null;
      localStorage.removeItem("workspaceInfo");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogout, (state) => {
      state.workspaceInfo = null;
      localStorage.removeItem("workspaceInfo");
      localStorage.removeItem("workspaceListState");
    });
  },
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;
