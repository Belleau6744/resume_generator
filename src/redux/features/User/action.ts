import { createAction } from '@reduxjs/toolkit';

export const setUserAuthStatus = createAction<boolean>('user/setUserAuthStatus');

export const setUserID = createAction<string | number>('user/setUserID');