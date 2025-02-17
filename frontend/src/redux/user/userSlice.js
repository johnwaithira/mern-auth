import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    isLoading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.isLoading = true;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signinFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        signoutStart: (state) => {
            state.isLoading = true;
        },
        signoutSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        signoutFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateStart: (state) => {
            state.isLoading = true;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }, deleteStart: (state) => {
            state.isLoading = true;
        },
        deleteSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        deleteFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const { signinStart, signinSuccess, signinFailure, signoutStart, signoutSuccess, signoutFailure, updateStart, updateFailure, updateSuccess, deleteFailure, deleteStart, deleteSuccess } = userSlice.actions;

export default userSlice.reducer;
