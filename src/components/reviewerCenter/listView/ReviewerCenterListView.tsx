import RateReviewIcon from '@mui/icons-material/RateReview';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { ResumeGroup, UsersType } from "@types";
import { STRINGS_ENG } from "assets/stringConstants";
import BackgroundComponent from "components/Background";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { capitalizeEveryWord } from "utils/stringUtils";
import { getUserID } from "utils/userUtils";

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 40px;
    border-radius: 12px;
    margin: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;

const ReviewerCenterListView = () => {
    const [ resumesToReviewList, setResumesToReviewList ] = useState<ResumeGroup>();
    const [ usersList, setUsersList ] = useState<UsersType>();
    const nav = useNavigate();

    /**
     * FETCHING - User resumes IDs
     */
    const db = getDatabase();
    const dbRef = ref(db, `content/resumes`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            const filteredGroup: ResumeGroup = {};
            const resumeList = snapshot.val() as ResumeGroup;
            Object.keys(resumeList).forEach(elementID => {
                if (resumeList[elementID].status === 'submitted') {
                    filteredGroup[elementID] = resumeList[elementID];
                }
            });
            setResumesToReviewList(filteredGroup);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const dbRef = ref(db, `content/users`);
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                setUsersList(snapshot.val());
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleReviewResume = useCallback((resumeID) => {
        nav(`/review/${resumeID}`);
    }, [nav]);


    return (
        <BackgroundComponent>
            <div style={{ height: '100%', minHeight: '96vh' }}>
                <Container>
                    <Typography variant="h4" padding={'20px'} fontWeight={800} color={"#34495E"}>{STRINGS_ENG.resume_to_review_title.toLocaleUpperCase()}</Typography>
                    <Table aria-label="simple table">
                        <TableHead >
                            <TableRow sx={{ background: '#2C3E50' }}>
                                <TableCell align="center" sx={{ fontWeight: '800', color: 'white' }}>First Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '800', color: 'white'}}>Last Name</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '800', width: '80px', color: 'white' }}>Status</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '800', width: '80px', color: 'white' }}>Submission Date</TableCell>
                                <TableCell align="center" sx={{ fontWeight: '800', width: '80px', color: 'white' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {resumesToReviewList && Object.entries(resumesToReviewList).map((resumeContent, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* <TableCell align="center">{value.id}</TableCell> */}
                                        <TableCell align="center" sx={{ width: '100px' }}>{usersList && capitalizeEveryWord(usersList[getUserID(resumeContent[0])].firstName)}</TableCell>
                                        <TableCell align="center" sx={{ width: '100px' }}>{usersList && capitalizeEveryWord(usersList[getUserID(resumeContent[0])].lastName)}</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: '800', width: '80px' }}>{capitalizeEveryWord(resumeContent[1].status)}</TableCell>
                                        <TableCell align="center" sx={{ width: '80px' }}>{resumeContent[1].submissionDate}</TableCell>
                                        <TableCell align="center" size='small' sx={{ margin: '0', padding: '10px', border: '0', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                                            <Button startIcon={<RateReviewIcon />} variant="contained" color="primary" onClick={() => handleReviewResume(resumeContent[0])}>
                                                Review
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Container>
        </div>
        </BackgroundComponent>
    )
};

export default ReviewerCenterListView;