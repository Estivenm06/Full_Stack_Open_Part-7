import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "set_notification":
      return action.payload;
    case "delete_notification":
      return null;
    default:
      return state;
  }
};

export const createNotification = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <createNotification.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </createNotification.Provider>
  );
};
