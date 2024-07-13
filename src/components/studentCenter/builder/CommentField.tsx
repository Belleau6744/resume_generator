import { TextField, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { useResumeContext } from "./useResumeContext";

const Container = styled.div<{ $isCommentSectionOpen: boolean }>`
    ${props => props.$isCommentSectionOpen ? 
    css`
        flex: 1;
        max-width: 25%;
    ` : 
    css`
        width: 0;
        overflow: hidden;
        display: none;
    `
    }
`;

const CommentField = () => {
    const {
        currentResume,
        isCommentSectionOpen
    } = useResumeContext();

    useEffect(() => {
        console.log('commentfield: ', isCommentSectionOpen);
    }, [isCommentSectionOpen]);

    const commentValue = useMemo(() => {
        return currentResume.comment;
    }, [currentResume.comment]);

    return (
        <Container $isCommentSectionOpen={isCommentSectionOpen}>
            <Typography padding={'5px 10px'} variant="h4">Comments</Typography>
            <TextField aria-readonly variant="standard" value={commentValue} InputProps={{readOnly: true}} placeholder="Add your comments here" fullWidth multiline/>
        </Container>
    )
}

export default CommentField;