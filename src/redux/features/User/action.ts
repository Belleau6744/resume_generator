import { createAction } from '@reduxjs/toolkit';
import { UserRole } from "@types";

export const setUserAuthStatus = createAction<boolean>('user/setUserAuthStatus');

export const setUserRole = createAction<UserRole>('user/setUserRole');

export const setUserID = createAction<string>('user/setUserID');