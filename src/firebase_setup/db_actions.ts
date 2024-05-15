import { getDatabase, ref, update } from "firebase/database";

// TODO
export const initUserDBSpace = (str: string) => {
    console.log(str);
    // const db = getDatabase();
    // const updates: {[path: string]: object} = {};
    // updates[`/users/${str}`] = {
    //     "wtv": ''
    // };

    // return update(ref(db), updates);
};

/**
 * 
 * @param data Object to replace data
 * @param updatePath String path for data
 * @returns 
 */
export const writeNewPost = (data: object, updatePath: string) => {
    const db = getDatabase();
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates[updatePath] = data;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return update(ref(db), updates);
  }