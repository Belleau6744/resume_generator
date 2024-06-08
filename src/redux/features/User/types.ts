import { UserRole } from "../../../types/dbStructType";

export type UserState = {
    isSignedIn: boolean;
    userID: string | undefined;
    userRole: UserRole | undefined;
}