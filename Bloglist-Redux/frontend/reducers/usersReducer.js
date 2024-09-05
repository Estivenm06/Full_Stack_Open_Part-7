import { createSlice } from "@reduxjs/toolkit";
import loginService from '../src/services/login';

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        setUsers: (state, action) => {
            return action.payload
        }
    }
})

export const initializeUsers = () => {
    return async dispatch => {
      const users = await loginService.getAll()
      dispatch(setUsers(users))
    }
  }

export const {setUsers} = userSlice.actions
export default userSlice.reducer