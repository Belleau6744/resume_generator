import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type ConfirmEditingModalProps = {
    open: boolean;
    resumeID: string;
    onClose: (resumeID: string, status: 'continue' | 'cancel') => void;
    setIsConfirmEditingOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ConfirmEditingModal = ({ open, onClose, resumeID, setIsConfirmEditingOpen }: ConfirmEditingModalProps) => {

    return (
        <Dialog open={open}>
                <DialogTitle>Confirm Editing</DialogTitle>
                <DialogContent>
                    <Alert severity='warning'>
                        By editing your resume, it will reset its status. It will remove it from the submitted list and mark it back as unapproved
                    </Alert>
                    <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                        <Button variant='outlined' color='error' onClick={() => {
                            setIsConfirmEditingOpen(false);
                            onClose(resumeID, 'cancel')
                            }}>
                                Cancel
                        </Button>

                        <Button variant='contained' color='info' onClick={() => {
                            setIsConfirmEditingOpen(false);
                            onClose(resumeID, 'continue');
                            }}>
                                Continue
                        </Button>
                    </div>
                </DialogContent>
        </Dialog>
    )
}

export default ConfirmEditingModal;