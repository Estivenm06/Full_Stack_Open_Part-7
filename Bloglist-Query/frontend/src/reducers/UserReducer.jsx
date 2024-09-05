import { createContext, useReducer } from "react";

const userReducer = (state = null, action) => {
  console.log(action);
  switch (action.type) {
    case "login":
      return action.payload;
    case "check":
      return action.payload;
    default:
      return state;
  }
};

export const createUser = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <createUser.Provider value={[user, userDispatch]}>
      {props.children}
    </createUser.Provider>
  );
};
