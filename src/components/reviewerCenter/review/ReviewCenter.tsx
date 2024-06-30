import RateReview from '@mui/icons-material/RateReview';
import Verified from '@mui/icons-material/Verified';
import { Alert, Snackbar, SpeedDial } from "@mui/material";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { ResumeDefinition } from "@types";
import { STRINGS_ENG } from 'assets/stringConstants';
import { child, get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentField from "./CommentField";
import ConfirmApproveModal from './ConfirmApproveModal';
import ConfirmRevisionModal from './ConfirmRevisionModal';
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
    const dbRef = ref(getDatabase());
    const [userResume, setUserResume] = useState<ResumeDefinition>();
    const [ commentInput, setCommentInput ] = useState<string>('');
    const [ confirmDialog, setConfirmDialog ] = useState<{open: boolean, status: string}>({open: false, status: ''});
    const [ submissionStatus, setSubmissionStatus ] = useState<{ open: boolean, status?: 'error' | 'success', reason: 'approve' | 'revise' }>({ open: false, status: undefined, reason: 'approve'});
    const [ isConfirmRevisionOpen, setIsConfirmRevisionOpen ] = useState<boolean>(false);

    const handleSubmitComments = () => {
        setIsConfirmRevisionOpen(true);
    }

    const handleApproveResume = () => {
        if (commentInput === '') {
            setConfirmDialog({open: true, status: "You are going to approve this resume"});
        } else {
            setConfirmDialog({open: true, status: "You are going to approve a resume that has comments"});
        }
    }

    /**
     * Update the snackbar status when closes from timeout
     */
    const handleCloseDeletionStatus = () => {
        setSubmissionStatus({open: false, reason: 'approve'})
    }

    /**
     * Return a text matching the Deletion Status
     */
    const getDeletionStatusString = (status: 'success' | 'error', reason: 'approve' | 'revise') => {
        if (reason === 'approve') {
            if (status === 'success') {
                return STRINGS_ENG.resume_approval_status.success;
            } else if (status === 'error') {
                return STRINGS_ENG.resume_approval_status.error;
            } else {
                return '';
            }
        } else if (reason === 'revise') {
            if (status === 'success') {
                return STRINGS_ENG.resume_ask_revision_status.success;
            } else if (status === 'error') {
                return STRINGS_ENG.resume_ask_revision_status.error;
            }
        }
    };

    /**
     * Update comment content from DB update
     */
    useEffect(() => {
        if (userResume?.comment) {
            setCommentInput(userResume?.comment);
        }
    }, [userResume]);
    
    const actions = [
        { icon: <RateReview />, name: 'Request Revisions', onClick: handleSubmitComments},
        { icon: <Verified />, name: 'Approve', onClick: handleApproveResume},
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
            <ConfirmApproveModal 
                setSubmissionStatus={setSubmissionStatus} 
                resumeID={resumeID} 
                isConfirmSubmitOpen={confirmDialog.open} 
                content={confirmDialog.status}
                setUserResume={setUserResume}
                commentInput={commentInput}
                setConfirmDialog={setConfirmDialog}
            />
            <ConfirmRevisionModal 
                isConfirmRevisionOpen={isConfirmRevisionOpen}
                setIsConfirmRevisionOpen={setIsConfirmRevisionOpen}
                commentInput={commentInput}
                setUserResume={setUserResume}
                setSubmissionStatus={setSubmissionStatus}
                resumeID={resumeID}
            />

            <Snackbar open={submissionStatus.open} autoHideDuration={2000} onClose={handleCloseDeletionStatus}>
                <Alert
                    onClose={handleCloseDeletionStatus}
                    severity={submissionStatus.status}
                    variant="filled"
                    sx={{ width: '100%' }}
                >{getDeletionStatusString(submissionStatus.status, submissionStatus.reason)}</Alert>
             </Snackbar>

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