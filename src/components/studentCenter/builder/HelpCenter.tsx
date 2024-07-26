import { Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const HelpCenter = () => {
    return (
        <Container>
            <Typography variant="h4" color={"#34495E"} fontWeight={800}>Resume Writing Tips</Typography>
            <List>
                <ListItemButton target="_blank" href="https://www.jobbank.gc.ca/findajob/resources/write-good-resume">
                    <ListItemText
                        primary="How to write a good resume"
                        secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                            Government of Canada
                            </Typography>
                            {" — Job Bank"}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>
                <Divider variant="fullWidth" component="div"/>
                <ListItemButton target="_blank" href="https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume-with-examples">
                    <ListItemText
                        primary="How To Make a Comprehensive Resume (With Examples)"
                        secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                            Indeed
                            </Typography>
                            {" — Career Guide"}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>
                <Divider variant="fullWidth" component="div"/>
                <ListItemButton target="_blank" href="https://hbr.org/2014/12/how-to-write-a-resume-that-stands-out">
                    <ListItemText
                        primary="How to Write a Résumé That Stands Out"
                        secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                            Harvard Business Review
                            </Typography>
                            {" — Amy Gallo"}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>
            </List>
            <Typography variant="h4" color={"#34495E"} fontWeight={800}>Interview Preparation Tips</Typography>
            <List>
                <ListItemButton target="_blank" href="https://ca.indeed.com/career-advice/interviewing/how-to-prepare-for-a-job-interview">
                    <ListItemText
                        primary="How to Prepare for a Job Interview (With 12 Steps)"
                        secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                            Indeed
                            </Typography>
                            {" — Career Guide"}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>
                <Divider variant="fullWidth" component="div"/>
                <ListItemButton target="_blank" href="https://career.uconn.edu/resources/interviewing-guide/">
                    <ListItemText
                        primary="Interview Preparation Guide and Worksheets"
                        secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                            >
                            UCONN
                            </Typography>
                            {" — University of Connecticut"}
                        </React.Fragment>
                        }
                    />
                </ListItemButton>
            </List>            
        </Container>
    )
}

export default HelpCenter;