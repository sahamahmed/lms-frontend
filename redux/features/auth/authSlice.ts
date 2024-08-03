import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  isAuth: false,
  token: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        userRegistration: (state, action) => {
            state.token = action.payload.token
        },

        userLogin: (state, action) => {
            state.token = action.payload.accesstoken
            state.isAuth = true
            state.user = action.payload.user
        },
        
        userLogout: (state) => {
            state.token = ""
            state.isAuth = false
            state.user = ""
        },
        updateToken : (state, action) => {
            state.token = action.payload.token
        },
        updateUser: (state, action) => {
            state.user = action.payload.user
        },

    }
})


export const {userRegistration, userLogin, userLogout, updateToken, updateUser} = authSlice.actions

export default authSlice.reducer