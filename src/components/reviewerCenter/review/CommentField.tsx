import { TextField, Typography } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
`;

type CommentFieldProps = {
    setCommentInput: React.Dispatch<React.SetStateAction<string>>;
    commentInput: string;
}

const CommentField = ({ setCommentInput, commentInput }: CommentFieldProps) => {


    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCommentInput(event.target.value);
    }

    return (
        <Container>
            <Typography padding={'5px 10px'} variant="h4">Comments</Typography>
            <TextField onChange={handleOnChange} value={commentInput} placeholder="Add your comments here" fullWidth multiline>TEST</TextField>
        </Container>
    )
}

export default CommentField;