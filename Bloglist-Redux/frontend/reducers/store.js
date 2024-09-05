import { configureStore } from "@reduxjs/toolkit";
import notificationSlice from "./notificationReducer";
import BlogSlice, { setBlog } from "./bloglistReducer";
import loginSlice from "./loginReducer";
import blogService from "../src/services/blogs";
import userSlice from './usersReducer'

export const store = configureStore({
  reducer: {
    blogslist: BlogSlice,
    notification: notificationSlice,
    login: loginSlice,
    users: userSlice,
  },
});

blogService.getAll().then((res) => store.dispatch(setBlog(res)));

store.subscribe(() => console.log(store.getState()));

export default store;
