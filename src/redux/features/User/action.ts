import { createAction } from '@reduxjs/toolkit';
import { UserRole } from "@types";

export const setUserAuthStatus = createAction<boolean>('user/setUserAuthStatus');

export const setUserRole = createAction<UserRole>('user/setUserRole');

export const setUserFirstName = createAction<string>('user/setFirstName');

export const setUserLastName = createAction<string>('user/lastName');

export const setUserID = createAction<string>('user/setUserID');