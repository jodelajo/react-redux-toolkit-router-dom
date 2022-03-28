import { configureStore } from "@reduxjs/toolkit";
// import friendsListReducer from "../features/friendsList";
import userReducer from '../features/user'

export const store = configureStore({
  reducer: {
    user: userReducer
  },
});