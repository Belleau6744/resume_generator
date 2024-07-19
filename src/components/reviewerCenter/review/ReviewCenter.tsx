import RateReview from '@mui/icons-material/RateReview';
import Verified from '@mui/icons-material/Verified';
import { Alert, Button, Snackbar, SpeedDial } from "@mui/material";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { CommentsType, CommentType, ResumeDefinition } from "@types";
import { STRINGS_ENG } from 'assets/stringConstants';
import dayjs from "dayjs";
import { child, get, getDatabase, ref } from "firebase/database";
import { _ } from 'lodash';
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getDateString } from 'utils/dateUtils';
import { v4 as uuidv4 } from 'uuid';
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

const ButtonContainer = styled.div`
    display: flex;
    padding: 30px 0;
    border-radius: 6px;
    justify-content: space-around;
`;

const ReviewCenter = () => {
    const { resumeID } = useParams();
    const dbRef = ref(getDatabase());
    const [ userResume, setUserResume ] = useState<ResumeDefinition>();
    const [ originalCommentInput, setOriginalCommentInput ] = useState<CommentsType>();
    const [ currentCommentInput, setCurrentCommentInput ] = useState<CommentsType>();
    const [ confirmDialog, setConfirmDialog ] = useState<{open: boolean, status: string}>({open: false, status: ''});
    const [ submissionStatus, setSubmissionStatus ] = useState<{ open: boolean, status?: 'error' | 'success', reason: 'approve' | 'revise' }>({ open: false, status: undefined, reason: 'approve'});
    const [ isConfirmRevisionOpen, setIsConfirmRevisionOpen ] = useState<boolean>(false);

    /**
     * If form is dirty - Unsaved changes are present
     */
    const isDirty = useMemo(() => {
        return !(_.isEqual(currentCommentInput, originalCommentInput))
    }, [currentCommentInput, originalCommentInput]);

    const handleSubmitComments = () => {
        setIsConfirmRevisionOpen(true);
    }

    const handleCreateNewComment = () => {
        const newComment: CommentType = {
            date: getDateString(dayjs(new Date())),
            content: ''
        }
        setCurrentCommentInput(prev => ({...prev, [uuidv4()]: newComment}))
    }

    const handleApproveResume = () => {
        if (isDirty) {
            setConfirmDialog({open: true, status: "You are going to approve a resume that has comments"});
        } else {
            setConfirmDialog({open: true, status: "You are going to approve this resume"});
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
        if (userResume?.comments) {
            setOriginalCommentInput(userResume.comments);
            setCurrentCommentInput(userResume.comments);
        }
    }, [userResume]);
    
    const actions = [
        { icon: <RateReview />, name: 'Add new comment', onClick: handleCreateNewComment},
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
            <div style={{ display: 'flex', flexDirection: 'column', width: '75%', padding: '0 30px 0 20px'}}>
                <ResumeContent content={userResume?.content}/>
                <div style={{ background: '#cfcfcf' }}>
                    <ButtonContainer>
                        <Button size='large' sx={{display: 'flex', gap: '5px', alignItems: 'center'}} color='info' variant="contained" onClick={handleSubmitComments} disabled={!isDirty}><RateReview/>Request Revision</Button>
                        <Button size='large' sx={{display: 'flex', gap: '5px', alignItems: 'center'}} color='success' variant="contained" onClick={handleApproveResume}><Verified/>Approve Resume</Button>
                    </ButtonContainer>
                    {!isDirty && <Alert sx={{ margin: '10px 50px' }} severity="info" title='Comments should be added to request a revision'>Comments should be added to request a revision</Alert>}
                </div>
            </div>
            <CommentField originalCommentInput={originalCommentInput} commentInput={currentCommentInput} setCommentInput={setCurrentCommentInput}/>
            <ConfirmApproveModal 
                setSubmissionStatus={setSubmissionStatus} 
                resumeID={resumeID} 
                isConfirmSubmitOpen={confirmDialog.open} 
                content={confirmDialog.status}
                setUserResume={setUserResume}
                commentInput={currentCommentInput}
                setConfirmDialog={setConfirmDialog}
            />
            <ConfirmRevisionModal 
                isConfirmRevisionOpen={isConfirmRevisionOpen}
                setIsConfirmRevisionOpen={setIsConfirmRevisionOpen}
                commentInput={currentCommentInput}
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
                ariaLabel="Create comment speeddial"
                sx={{ position: 'fixed', bottom: 40, right: 50 }}
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