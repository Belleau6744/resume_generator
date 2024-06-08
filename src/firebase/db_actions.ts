import { getDatabase, ref, update } from "firebase/database";
import { ResumeType } from "../types/dbStructType";
import { MockCVContent } from "../utils/MockData";

/**
 * 
 * @param str 
 * @returns 
 */
export const initStudentDBSpace = (user_id: string) => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const updates = {};
    updates[`${user_id}`] = {
        userRole: 'student'
    };
    return update(usersRef, updates);
};

/**
 * 
 * @param str 
 * @returns 
 */
export const initReviewerDBSpace = (user_id: string) => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const updates = {};
    updates[`${user_id}`] = {
        userRole: 'reviewer'
    }
    return update(usersRef, updates);
};

export const saveResume = (resume: ResumeType, userID: string, resumeID: string, ) => {
    const db = getDatabase();
    const updates = {};
    updates[`users/${userID}/resumes/${resumeID}`] = resume;
    return update(ref(db), updates);

}

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
    writeNewPost(MockCVContent, 'users');
}