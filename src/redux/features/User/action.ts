import { createAction } from '@reduxjs/toolkit';

export const setUserAuthStatus = createAction<boolean>('user/setUserAuthStatus');