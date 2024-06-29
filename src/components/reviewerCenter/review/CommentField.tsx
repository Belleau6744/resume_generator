import { TextField, Typography } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
`;

const CommentField = () => {
    return (
        <Container>
            <Typography padding={'5px 10px'} variant="h4">Comments</Typography>
            <TextField placeholder="Add your comments here" fullWidth multiline>TEST</TextField>
        </Container>
    )
}

export default CommentField;