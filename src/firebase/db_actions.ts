import { ResumeDefinition } from "@types";
import dayjs from "dayjs";
import { get, getDatabase, ref, update } from "firebase/database";
import { getDateString } from "utils/dateUtils";
import { getUserID } from "utils/userUtils";
import { MockDBContent } from "../utils/MockData";

/**
 * 
 * @param str 
 * @returns 
 */
export const initStudentDBSpace = (user_id: string, firstName: string, lastName: string) => {
    const db = getDatabase();
    const usersRef = ref(db, 'content/users');
    const updates = {};
    updates[`${user_id}`] = {
        userRole: 'student',
        firstName: firstName,
        lastName: lastName
    };
    return update(usersRef, updates);
};

/**
 * 
 * @param str 
 * @returns 
 */
export const initReviewerDBSpace = (user_id: string, firstName: string, lastName: string) => {
    const db = getDatabase();
    const usersRef = ref(db, 'users');
    const updates = {};
    updates[`${user_id}`] = {
        userRole: 'reviewer',
        firstName: firstName,
        lastName: lastName
    }
    return update(usersRef, updates);
};

export const saveResume = async (resume: ResumeDefinition, resumeID: string, ) => {
    const db = getDatabase();
    const updates = {};
    const userID = getUserID(resumeID);
    updates[`content/resumes/${resumeID}`] = resume;
    const userResumeIDsRef = ref(db, `content/users/${userID}`);

    try {
        const snapshot = await get(userResumeIDsRef);
        let resumeIDs: string[] = snapshot.val();
        if (!Array.isArray(resumeIDs)) {
            resumeIDs = [];
        }
        if (!resumeIDs.includes(resumeID)) {
            resumeIDs.push(resumeID);
            updates[`content/users/${userID}/resumeIDs`] = resumeIDs;
        } 
    } catch (e) {
        console.log("Error adding resume ID");
    }

    return update(ref(db), updates);
}

export const submitResume = (resumeID: string) => {
    const db = getDatabase();
    const updates = {};
    updates[`content/resumes/${resumeID}/status`] = 'submitted';
    updates[`content/resumes/${resumeID}/submissionDate`] = getDateString(dayjs(new Date()));
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
    writeNewPost(MockDBContent, 'content');
}
