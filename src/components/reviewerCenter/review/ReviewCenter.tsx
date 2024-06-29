import { ResumeDefinition, ResumeGroup } from "@types";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentField from "./CommentField";
import ResumeContent from "./resumeContent/ResumeContent";

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    min-width: 700px;
    display: flex;
    justify-content: flex-start;
    padding-top: 24px;
    color: black;
`;

const ReviewCenter = () => {
    const { resumeID } = useParams();
    const [userResume, setUserResume] = useState<ResumeDefinition>();

    /**
     * FETCHING - User resumes IDs
     */
    const db = getDatabase();
    const dbRef = ref(db, `content/resumes`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setUserResume((snapshot.val() as ResumeGroup)[resumeID]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ResumeContent content={userResume?.content}/>
            <CommentField/>
        </Container>
    )
}
export default ReviewCenter;