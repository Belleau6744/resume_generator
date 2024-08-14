import { Card, CardContent, CardHeader, Divider, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
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

    const commentValue = useMemo(() => {
        return currentResume.comments;
    }, [currentResume.comments]);

    return (
        <Container $isCommentSectionOpen={isCommentSectionOpen}>
            <Typography padding={'5px 10px'} variant="h4" color={"white"}>Comments</Typography>
            {commentValue && Object.entries(commentValue).map((value) => {
                const id = value[0];
                const date = value[1].date;
                const content = value[1].content;
                return (
                    <Card 
                        variant="elevation" 
                        sx={{
                            marginBottom: '10px',
                            background: '#dfdfdf',    
                            color: 'rgba(0, 0, 0, 0.87)'
                        }}
                        key={id}
                    >
                        <CardHeader color="black" title={date} />
                        <Divider />
                        <CardContent>
                            <TextField 
                                sx={{color: 'rgba(0, 0, 0, 0.87)'}}
                                InputProps={{
                                    readOnly: true, 
                                    sx: { color: 'rgba(0, 0, 0, 0.87)' }
                                }}
                                InputLabelProps={{
                                    sx:{ color:  'rgba(0, 0, 0, 0.87)' }
                                }}
                                variant="standard"
                                id={`${id}_${date}`}
                                value={content}
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