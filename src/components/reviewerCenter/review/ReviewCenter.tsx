import Send from '@mui/icons-material/Send';
import Verified from '@mui/icons-material/Verified';
import { SpeedDial } from "@mui/material";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { ResumeDefinition } from "@types";
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentField from "./CommentField";
import ResumeContent from "./resumeContent/ResumeContent";
import { saveResume } from 'firebase/db_actions';


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
    const dbRef = ref(getDatabase());
    const [userResume, setUserResume] = useState<ResumeDefinition>();
    const [ commentInput, setCommentInput ] = useState<string>('');
    const [ confirmDialog, setConfirmDialog ] = useState<{open: boolean, status: string}>({open: false, status: ''});

    const handleSubmitComments = () => {
        setUserResume(prev => {
            const newResume: ResumeDefinition = {...prev, comment: commentInput, status: 'reviewed'};
            saveResume(newResume, resumeID);
            return newResume;
        });
    }
    
    const handleApproveResume = () => {
        if (commentInput === '') {
            setConfirmDialog({open: true, status: "You are going to approve this resume"});
        } else {
            setConfirmDialog({open: true, status: "You are going to approve a resume that has comments"});
        }
    }

    /**
     * This function handles the confirmEditing modal's action
     * @param resumeID Resume to be edited
     * @param status Approval or cancellation of the editing
     */
    const handleCloseSubmit = (resumeID: string, status: 'continue' | 'cancel') => {
        if (status === 'continue') {
            
        }        
    }

    /**
     * Update comment content from DB update
     */
    useEffect(() => {
        setCommentInput(userResume.comment);
    }, [userResume.comment]);
    
    const actions = [
        { icon: <Send />, name: 'Send', onClick: handleSubmitComments},
        { icon: <Verified />, name: 'Verified', onClick: handleApproveResume},
      ];

    /**
     * FETCHING - User resumes IDs
     */
    
    useEffect(() => {
        get(child(dbRef, `content/resumes/${resumeID}`)).then((snapshot) => {
            if (snapshot.val()) {
                setUserResume(snapshot.val());
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container>
            <ResumeContent content={userResume?.content}/>
            <CommentField commentInput={commentInput} setCommentInput={setCommentInput}/>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 20, right: 40 }}
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    onClick={action.onClick}
                    tooltipTitle={action.name}
                />
                ))}
            </SpeedDial>
        </Container>
    )
}
export default ReviewCenter;