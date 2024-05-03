import { getDatabase, ref, update } from "firebase/database"

export const initUserDBSpace = (str: string) => {
    const db = getDatabase();
    const updates: {[path: string]: object} = {};
    updates[`/users/${str}`] = {
        "wtv": ''
    };

    return update(ref(db), updates);
};