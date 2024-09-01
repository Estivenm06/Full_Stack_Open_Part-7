import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    newnotification: (state, action) => {
      return action.payload;
    },
    hidenotification: (state, action) => {
      return null;
    },
  },
});

export const setNotification = (payload, timeout, style) => {
  return async (dispatch) => {
    dispatch(newnotification({ payload: payload, style: style }));
    setTimeout(() => {
      dispatch(hidenotification());
    }, timeout);
  };
};

export const { newnotification, hidenotification } = notificationSlice.actions;
export default notificationSlice.reducer;
