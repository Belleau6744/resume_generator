export const getUserID = (resumeID: string) => {
    return resumeID.split("_")[0]
}