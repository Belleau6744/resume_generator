import { getDatabase, ref, update } from "firebase/database";
import { MockCVContent } from "../utils/MockData";

// TODO
export const initStudentDBSpace = (str: string) => {
    const db = getDatabase();
    const updates: {[path: string]: object} = {};
    updates[`/students/${str}/`] = {
        "resumes": {}
    }
    return update(ref(db), updates);
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


  
export const resetDB = () => {
    writeNewPost(MockCVContent, '/students/');
}