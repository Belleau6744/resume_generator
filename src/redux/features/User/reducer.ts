import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { setUserAuthStatus, setUserID } from './action';
import { UserState } from "./types";

const initialState: UserState = { 
    isSignedIn: false, 
    userID: undefined
}

const handleSetUserAuthStatus = (state: UserState, action: PayloadAction<boolean>) => {
    state.isSignedIn = action.payload;
}

const handleSetUserID = (state: UserState, action: PayloadAction<string>) => {
    state.userID = action.payload;
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserAuthStatus, handleSetUserAuthStatus)
        .addCase(setUserID, handleSetUserID)
})