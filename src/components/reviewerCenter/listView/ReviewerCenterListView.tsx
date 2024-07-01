import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeGroup, UsersType } from "@types";
import FeedbackIcon from "assets/Icons/FeedbackIcon";
import { STRINGS_ENG } from "assets/stringConstants";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { capitalizeEveryWord } from "utils/stringUtils";
import { getUserID } from "utils/userUtils";

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
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
        <Container>
            <Table aria-label="simple table">
                <TableHead >
                    <TableRow sx={{ fontWeight: '800', fontSize: '1.8rem'}}>
                        <TableCell><div style={{ paddingBottom: '12px' }}>{STRINGS_ENG.resume_to_review_title.toLocaleUpperCase()}</div></TableCell>
                    </TableRow>
                    <TableRow sx={{ background: '#BEBEBE' }}>
                        {/* <TableCell align="center" sx={{ fontWeight: '800' }}>ID</TableCell> */}
                        <TableCell align="center" sx={{ fontWeight: '800' }}>First Name</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800'}}>Last Name</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800', width: '80px' }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800', width: '80px' }}>Submission Date</TableCell>
                        <TableCell align="center" size='small' sx={{ fontWeight: '800', width: '0', margin: '0', padding: '10px', border: '0' }}>Review</TableCell>
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
                                    <IconButton onClick={() => handleReviewResume(resumeContent[0])}>
                                        <FeedbackIcon width={20} height={20}/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>

        </Container>
    )
};

export default ReviewerCenterListView;