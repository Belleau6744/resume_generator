import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ResumeDefinition } from "@types";
import { saveResume } from "firebase/db_actions";
import React from "react";
import { useNavigate } from "react-router-dom";

type ConfirmRevisionModalProps = {
    isConfirmRevisionOpen: boolean;
    setIsConfirmRevisionOpen: React.Dispatch<React.SetStateAction<boolean>>;
    commentInput: string;
    setUserResume: (value: React.SetStateAction<ResumeDefinition>) => void;
    setSubmissionStatus: React.Dispatch<React.SetStateAction<{
        open: boolean;
        status?: "error" | "success";
        reason: "approve" | "revise";
    }>>;
    resumeID: string;
}

const ConfirmRevisionModal = ({ isConfirmRevisionOpen, setUserResume, commentInput, resumeID, setSubmissionStatus, setIsConfirmRevisionOpen}: ConfirmRevisionModalProps) => {
    const nav = useNavigate();

    const handleCloseRevision = (status: 'continue' | 'cancel') => {
        if (status === 'continue') {
            setUserResume(prev => {
                const newResume: ResumeDefinition = {...prev, comment: commentInput, status: 'reviewed'};
                saveResume(newResume, resumeID).then(() => {
                    setSubmissionStatus({open: true, status: 'success', reason: 'revise'});
                });
                setIsConfirmRevisionOpen(false);
                return newResume;
            });
            nav('/');
        } else if (status === 'cancel') {
            setIsConfirmRevisionOpen(false);
        }
    }

    return (
        <Dialog open={isConfirmRevisionOpen}>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                <Alert severity='info'>{"You are going to submit this resume for revision"}</Alert>
                <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant='outlined' color='error' onClick={() => handleCloseRevision('cancel')}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => handleCloseRevision('continue')}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmRevisionModal;