import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CommentsType, ResumeDefinition } from "@types";
import { saveResume } from "firebase/db_actions";
import { useNavigate } from "react-router-dom";

type ConfirmSubmitModalProps = {
    isConfirmSubmitOpen: boolean;
    content: string;
    setConfirmDialog: React.Dispatch<React.SetStateAction<{
        open: boolean;
        status: string;
    }>>;
    commentInput: CommentsType;
    setUserResume: (value: React.SetStateAction<ResumeDefinition>) => void;
    setSubmissionStatus: React.Dispatch<React.SetStateAction<{
        open: boolean;
        status?: "error" | "success";
        reason: "approve" | "revise";
    }>>;
    resumeID: string;
}

const ConfirmApproveModal = ({ isConfirmSubmitOpen, resumeID, setSubmissionStatus, commentInput, content, setConfirmDialog, setUserResume }: ConfirmSubmitModalProps) => {
    const nav = useNavigate();

    /**
     * This function handles the confirmEditing modal's action
     * @param resumeID Resume to be edited
     * @param status Approval or cancellation of the editing
     */
    const handleCloseApprove = (status: 'continue' | 'cancel') => {
        if (status === 'continue') {
            setUserResume(prev => {
                const newResume: ResumeDefinition = {...prev, comments: commentInput, status: 'approved'};
                saveResume(newResume, resumeID).then(() => {
                    setSubmissionStatus({open: true, status: 'success', reason: 'approve'});
                });
                setConfirmDialog({ open: false, status: ''});
                return newResume;
            });
            nav('/');
        } else if (status === 'cancel') {
            setConfirmDialog({ open: false, status: ''});
        }
    }

    return (
        <Dialog open={isConfirmSubmitOpen}>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                <Alert severity='info'>{content}</Alert>
                <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant='outlined' color='error' onClick={() => handleCloseApprove('cancel')}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => handleCloseApprove('continue')}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmApproveModal;