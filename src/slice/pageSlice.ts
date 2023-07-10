import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PageSettingsType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

export type CoverPictureType = {
  url: string;
  verticalPosition: number;
};

export type ContentType = {
  type: string;
  content: unknown[];
};

export interface PageState {
  id: string;
  reference: string;
  title: string;
  icon: string;
  coverPicture: CoverPictureType;
  content: any;
  favorite: string[];
  pageSettings: PageSettingsType;
  path: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt?: Date;
}

const storedPageInfo = localStorage.getItem("pageInfo");

const initialState: { pageInfo: PageState | null } = {
  pageInfo: storedPageInfo ? JSON.parse(storedPageInfo) : null,
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageState>) => {
      state.pageInfo = action.payload;
      localStorage.setItem("pageInfo", JSON.stringify(action.payload));
    },
    clearPage: (state) => {
      state.pageInfo = null;
      localStorage.removeItem("pageInfo");
    },
  },
});

export const { setPage, clearPage } = pageSlice.actions;

export default pageSlice.reducer;
