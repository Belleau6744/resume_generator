import { StoreState } from "../../store";

export const isUserSignedIn = (state: StoreState) => {
    return state.user.isSignedIn;
}

export const getUserRole = (state: StoreState) => {
    return state.user.userRole;
}

export const getUserID = (state: StoreState) => {
    return state.user.userID;
}