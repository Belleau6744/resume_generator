import { configureStore } from '@reduxjs/toolkit';
import { UserState } from './features/User/types';
import { Features } from './features';

export type StoreState = {
    user: UserState;
}

export const reducer = {
    user: Features.UserFeature.reducer.userReducer
}

export const store = configureStore({
    reducer,
    // TODO Uncomment next line to hide actions from devTool
    // devTools: false
})