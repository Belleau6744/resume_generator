import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { submitResume } from "firebase/db_actions";
import { useCallback } from "react";

type ConfirmSubmissionModalProps = {
    isConfirmSubmitOpen: boolean;
    setIsConfirmSubmitOpen: React.Dispatch<React.SetStateAction<boolean>>
    setResumeToSubmit: React.Dispatch<React.SetStateAction<string>>
    setSubmissionStatus: React.Dispatch<React.SetStateAction<{
        open: boolean;
        status?: "error" | "success";
    }>>
    resumeToSubmit: string;
}

const ConfirmSubmissionModal = ({ isConfirmSubmitOpen, setIsConfirmSubmitOpen, resumeToSubmit, setResumeToSubmit, setSubmissionStatus }: ConfirmSubmissionModalProps) => {

    /**
     * Resume Submission Modal
     */
    const cancelSubmission = () => {
        setIsConfirmSubmitOpen(false);
        setResumeToSubmit('');
    }
    const confirmSubmission = useCallback(async () => {
        if (resumeToSubmit) {
            try {
                await submitResume(resumeToSubmit);
                setIsConfirmSubmitOpen(false);
                setSubmissionStatus(prev => ({ ...prev, status: 'success', open: true }));
            } catch (e) {
                setIsConfirmSubmitOpen(false);
                setSubmissionStatus(prev => ({ ...prev, status: 'error', open: true }))
            }
        }
    }, [resumeToSubmit, setIsConfirmSubmitOpen, setSubmissionStatus]);

    return (
        <Dialog open={isConfirmSubmitOpen}>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                <Alert severity='info'>
                    This will submit your resume for review. A reviewer will add his comments in the next 24h-48h.
                </Alert>
                <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant='outlined' color='error' onClick={cancelSubmission}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={confirmSubmission}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default ConfirmSubmissionModal;