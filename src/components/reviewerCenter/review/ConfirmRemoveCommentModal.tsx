import { Alert, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { CommentsType } from "@types";

type ConfirmSubmitModalProps = {
    deleteCommentModal: {
        open: boolean;
        commentID?: string;
    };
    setDeleteCommentModal: React.Dispatch<React.SetStateAction<{
        open: boolean;
        commentID?: string;
    }>>;
    setCommentInput: React.Dispatch<React.SetStateAction<CommentsType>>;
}

const ConfirmRemoveCommentModal = ({ deleteCommentModal, setDeleteCommentModal, setCommentInput }: ConfirmSubmitModalProps) => {
    
    const handleCloseDelete = (status: 'delete' | 'cancel') => {
        if (status === 'delete') {            
            setCommentInput(prev => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const {[deleteCommentModal.commentID]: _, ...updatedComments} = prev;
                return { ...updatedComments };
            });
            setDeleteCommentModal({open: false, commentID: ''});
        } else if (status === 'cancel') {
            setDeleteCommentModal({open: false, commentID: ''});
        }
    }

    return (
        <Dialog open={deleteCommentModal.open}>
            <DialogTitle>Confirm Removal</DialogTitle>
            <DialogContent>
                <Alert severity='warning'>{'You are about to delete a comment'}</Alert>
                <div style={{ display: 'flex', paddingTop: '12px', width: '100%', justifyContent: 'flex-end', gap: '12px' }}>
                    <Button variant='outlined' onClick={() => handleCloseDelete('cancel')}>Cancel</Button>
                    <Button variant='contained' color='error' onClick={() => handleCloseDelete('delete')}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmRemoveCommentModal;