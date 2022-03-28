import {  createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
    status: "idle",
    error: null,
    userState: {email: "", password: ""},
    
}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: initialStateValue},
    reducers: {
        userLoading: (state) => {
            state.value.status = "loading";
          },
          
          loginFailed: (state, action) => {
            state.value.status = "failed";
            state.value.error = action.payload;
          },
        loginUser: (state,action) => {
            state.value.userState = action.payload
            state.value.status = "success"
            console.log('state', state.value)
        },
        registerUser: (state, action) => {
            state.value.userState = action.payload
            state.value.status = "success"
            console.log('state', state.value)
        },
        logoutUser: (state) => {
            state.value.userState = initialStateValue.userState
            state.value.status = "success"
        }
    }
})

export const { loginUser, userLoading, loginFailed, logoutUser } = userSlice.actions

export default userSlice.reducer