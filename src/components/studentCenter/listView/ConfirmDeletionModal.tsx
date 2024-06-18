import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type ConfirmDeleteModalProps = {
    isConfirmDeleteOpen: boolean;
    setIsConfirmDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
    setResumeToSubmit: React.Dispatch<React.SetStateAction<string>>
    setDeletionStatus: React.Dispatch<React.SetStateAction<{
        open: boolean;
        status?: "error" | "success";
    }>>
    resumeToDelete: string;
}

const ConfirmDeletionModal = ({ isConfirmDeleteOpen }: ConfirmDeleteModalProps) => {
    const cancelDeletion = () => {
        // TODO
    }

    const confirmDeletion = () => {
        // TODO
    }

    return (
        <Dialog open={isConfirmDeleteOpen}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Alert severity='info'>
                        This will submit your resume for review. A reviewer will add his comments in the next 24h-48h.
                    </Alert>
                    <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                        <Button variant='outlined' color='info' onClick={cancelDeletion}>Cancel</Button>
                        <Button variant='contained' color='error' onClick={confirmDeletion}>Delete</Button>
                    </div>
                </DialogContent>
             </Dialog>
    )
}
export default ConfirmDeletionModal;