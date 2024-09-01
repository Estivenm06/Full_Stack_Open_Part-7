import { createSlice } from "@reduxjs/toolkit";
import loginService from "../src/services/login";
import blogService from "../src/services/blogs";

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    logIn: (state, action) => {
      return action.payload;
    },
    logOut: (state, action) => {
      return null;
    },
    check: (state, action) => {
      return action.payload;
    },
  },
});

export const loginWith = (credentials) => {
  return async (dispatch) => {
    const response = await loginService.login(credentials);
    window.localStorage.setItem("loggedUserBlog", JSON.stringify(response));
    blogService.setToken(response.token);
    dispatch(logIn(response));
  };
};

export const logoutWith = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("loggedUserBlog");
    dispatch(logOut);
  };
};

export const checkIflogged = () => {
  return async (dispatch) => {
    const localStorage = window.localStorage.getItem("loggedUserBlog");
    if (localStorage) {
      const user = JSON.parse(localStorage);
      blogService.setToken(user.token);
    }
    dispatch(check(JSON.parse(localStorage)));
  };
};

export const { logIn, logOut, check } = loginSlice.actions;
export default loginSlice.reducer;
