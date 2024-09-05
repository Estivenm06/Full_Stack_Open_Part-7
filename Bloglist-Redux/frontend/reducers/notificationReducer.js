import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    newnotification: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    hidenotification: (state, action) => {
      return null;
    },
  },
});

export const setNotification = (payload, timeout, type) => {
  return async (dispatch) => {
    console.log(payload);
    dispatch(newnotification({ payload: payload, type: type }));
    setTimeout(() => {
      dispatch(hidenotification());
    }, timeout);
  };
};

export const { newnotification, hidenotification } = notificationSlice.actions;
export default notificationSlice.reducer;
