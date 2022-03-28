import {  createSlice } from "@reduxjs/toolkit"

const initialStateValue = {
    status: "idle",
    error: null,
    userState: {email: "", password: ""}
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
        }
    }
})

export const { loginUser, userLoading, loginFailed } = userSlice.actions

export default userSlice.reducer