import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import workspaceReducer from "../slice/workspaceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    workspace: workspaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
