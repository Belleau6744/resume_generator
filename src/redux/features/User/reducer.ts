import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { UserState } from "./types";
import { setUserAuthStatus } from './action';

const initialState: UserState = { 
    isSignedIn: false, 
    userID: undefined
}

const handleSetUserAuthStatus = (state: UserState, action: PayloadAction<boolean>) => {
    state.isSignedIn = action.payload;
}

export const userReducer = createReducer(initialState, (builder) => {
    builder.addCase(setUserAuthStatus, handleSetUserAuthStatus)
})