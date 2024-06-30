import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

type ConfirmSubmitModalProps = {
    isConfirmSubmitOpen: boolean;
    content: string;
    onClose: (status: 'continue' | 'cancel') => void;
}

const ConfirmApproveModal = ({ isConfirmSubmitOpen, onClose, content }: ConfirmSubmitModalProps) => {
    return (
        <Dialog open={isConfirmSubmitOpen}>
            <DialogTitle>Confirm submission</DialogTitle>
            <DialogContent>
                <Alert severity='info'>{content}</Alert>
                <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant='outlined' color='error' onClick={() => onClose('cancel')}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={() => onClose('continue')}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmApproveModal;