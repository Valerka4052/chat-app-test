import { createSlice } from '@reduxjs/toolkit';
import { signUp, LogIn, LogOut, refreshUser, updateUser } from './authOperations';

export const userValidationSlice = createSlice({
    name: 'authorisation',
    initialState: {
        user: {
            name: null,
            email: null,
            id: null,
            imageURL:null,
        },
        token: null,
        isLoggedIn: false,
        isRefresh: false,
    },
    extraReducers: builder => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isRefresh = true;
            })
            .addCase(signUp.fulfilled, (state) => {
                state.isRefresh = false;
                state.isLoggedIn = false;
                // state.user.name = action.payload.name;
                // state.user.email = action.payload.email;
                // state.user.id = action.payload._id
                           })
            .addCase(LogIn.fulfilled, (state, action) => {
                // console.log('action.payload',action.payload);
                state.isRefresh = false;
                state.isLoggedIn = true;
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.imageURL = action.payload.imageURL;
                state.user.id = action.payload._id
                state.token = action.payload.token;
            })
            .addCase(LogIn.rejected, (state, action) => {
                //  console.log('action.payload',action.payload);
                state.isRefresh = false;
                state.error = action.payload;
            })
            .addCase(LogOut.fulfilled, (state) => {
                state.user.name = null;
                state.user.email = null;
                state.token = null;
                state.isRefresh = false;
                state.isLoggedIn = false;
            })
            .addCase(refreshUser.pending, (state) => {
                state.isRefresh = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                if (!action.payload) { return state }
                // console.log(action.payload);
                state.user.name = action.payload.data.name;
                state.user.email = action.payload.data.email;
                state.user.imageURL = action.payload.data.imageURL;
                state.user.id = action.payload.data._id;
                state.isRefresh = false;
                state.isLoggedIn = true;
            })
              .addCase(updateUser.pending, (state) => {
                state.isRefresh = true;
            })
                  .addCase(updateUser.fulfilled, (state, action) => {
                if (!action.payload) { return state }
                console.log(action.payload);
                state.user.imageURL = action.payload.data.imageURL;
                state.isRefresh = false;
                state.isLoggedIn = true;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefresh = false;
            })
    },
});
