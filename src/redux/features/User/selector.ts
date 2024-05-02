import { StoreState } from "../../store";

export const isUserSignedIn = (state: StoreState) => {
    return state.user.isSignedIn;
}