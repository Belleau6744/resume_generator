import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material";
import { CommentsType } from "@types";
import { useMemo, useState } from "react";
import styled from "styled-components";
import ConfirmRemoveCommentModal from './ConfirmRemoveCommentModal';

const Container = styled.div`
    flex: 1;
`;

type CommentFieldProps = {
    setCommentInput: React.Dispatch<React.SetStateAction<CommentsType>>;
    commentInput: CommentsType;
    originalCommentInput: CommentsType;
}


const CommentField = ({ setCommentInput, commentInput, originalCommentInput }: CommentFieldProps) => {
    const [ deleteCommentModal, setDeleteCommentModal ] = useState<{ open: boolean, commentID?: string}>({ open: false });

    const separateIdAndDate = (IdDate: string): string[] => {
        return IdDate.split("_");
    }

    const previousCommentsMap = useMemo(() => {
        const previousComments: Record<string, boolean> = {};
        commentInput && Object.keys(commentInput).forEach(item => {
            if (originalCommentInput && Object.keys(originalCommentInput).includes(item)) {
                previousComments[item] = true;
            } else {
                previousComments[item] = false
            }
        })
        return previousComments;
    }, [commentInput, originalCommentInput]);

    const handleDeleteComment = (id: string) => {
        setDeleteCommentModal({ open: true, commentID: id});
    }

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const IdDate = separateIdAndDate(event.target.id);
        console.log(IdDate);
        setCommentInput(prev => ({
            ...prev,
            [IdDate[0]]: {
                date: IdDate[1],
                content: event.target.value
            },
        }));
    }

    return (
        <Container>
            <Typography padding={'5px 10px'} variant="h4">Comments</Typography>
            <ConfirmRemoveCommentModal 
                deleteCommentModal={deleteCommentModal}
                setDeleteCommentModal={setDeleteCommentModal}
                setCommentInput={setCommentInput}
            />
            {commentInput && Object.entries(commentInput).map((value) => {
                const id = value[0];
                const date = value[1].date;
                const content = value[1].content;
                const isPreviousComment = previousCommentsMap[id];
                return (
                    <Card 
                        variant="elevation" 
                        sx={{
                            marginBottom: '10px',
                            background: `${isPreviousComment ?
                                '#dfdfdf' : 
                                '#4f93d8'}`,
                            color: `${isPreviousComment ? 
                                'rgba(0, 0, 0, 0.87)': 
                                '#FFFFFF'}`
                        }}
                        key={id}
                    >
                        <CardHeader color="black" title={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>{date}<Button size='small' onClick={() => handleDeleteComment(id)}><ClearOutlinedIcon color="action" /></Button></div>} />
                        <Divider />
                        <CardContent>
                            <TextField 
                                sx={{color: `${isPreviousComment ? 
                                    'rgba(0, 0, 0, 0.87)': 
                                    '#FFFFFF'}` }} 
                                InputProps={{
                                    readOnly: isPreviousComment, 
                                    sx: { color: `${isPreviousComment ? 'rgba(0, 0, 0, 0.87)' : '#FFFFFF'}` }
                                }}
                                InputLabelProps={{
                                    sx:{ color: `${isPreviousComment ? 'rgba(0, 0, 0, 0.87)': '#FFFFFF'}` }
                                }}
                                variant="standard"
                                id={`${id}_${date}`}
                                onChange={handleOnChange}
                                value={content}
                                placeholder="Add your comments here"
                                fullWidth
                                multiline/>
                        </CardContent>
                    </Card>
                )
            })}
        </Container>
    )
}

export default CommentField;