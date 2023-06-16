import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageType = {
  id: string;
  reference: string;
  path: string | null;
  icon: string;
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
});

export const { setWorkspace, clearWorkspace } = workspaceSlice.actions;

export default workspaceSlice.reducer;