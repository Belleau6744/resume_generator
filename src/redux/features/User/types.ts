import { UserRole } from "@types";

export type UserState = {
    isSignedIn: boolean;
    userID: string | undefined;
    userRole: UserRole | undefined;
}