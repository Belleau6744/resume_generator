import { UserRole } from "@types";

export type UserState = {
    isSignedIn: boolean;
    firstName: string;
    lastName: string;
    userID: string | undefined;
    userRole: UserRole | undefined;
}