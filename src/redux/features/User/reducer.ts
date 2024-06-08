import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { UserRole } from '../../../types/dbStructType';
import { setUserAuthStatus, setUserID, setUserRole } from './action';
import { UserState } from "./types";

const initialState: UserState = { 
    isSignedIn: false, 
    userID: undefined,
    userRole: undefined
}

const handleSetUserAuthStatus = (state: UserState, action: PayloadAction<boolean>) => {
    state.isSignedIn = action.payload;
}

const handleSetUserID = (state: UserState, action: PayloadAction<string>) => {
    state.userID = action.payload;
}

const handleSetUserRole = (state: UserState, action: PayloadAction<UserRole>) => {
    state.userRole = action.payload;
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUserAuthStatus, handleSetUserAuthStatus)
        .addCase(setUserID, handleSetUserID)
        .addCase(setUserRole, handleSetUserRole)
})