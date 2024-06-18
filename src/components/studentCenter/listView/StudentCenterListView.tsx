import { capitalize, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeGroup } from "@types";
import { getDatabase, onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from "../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../assets/Icons/EditIcon";
import OpenIcon from "../../../assets/Icons/OpenIcon";
import SendIcon from "../../../assets/Icons/SendIcon";
import { STRINGS_ENG } from "../../../assets/stringConstants";
import { capitalizeEveryWord } from "../../../utils/stringUtils";

type ListViewProps = {
    userID?: string;
}

const HeaderSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
`;

const NewResumeButton = styled.button`
    background: #2185d0;
    color: #FFFFFF;
    font-size: 1.3rem;
    font-weight: 700;
    padding: 15px 40px;
`;

const PageHeader = styled.h1`
    color: rgba(0, 96, 133, 1);
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    min-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;

const StudentCenterListView = (props: ListViewProps) => {
    const { userID } = props;
    const nav = useNavigate();
    const [resumeIDs, setResumeIDs] = useState<string[]>([]);
    const [userResumes, setUserResumes] = useState<ResumeGroup>({});

    /**
     * FETCHING - User resumes IDs
     */
    const db = getDatabase();
    const dbRef = ref(db, `content/users/${userID}/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setResumeIDs(snapshot.val().resumeIDs);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * FETCHING - User resumes content
     */
    useEffect(() => {
        const dbRef = ref(db, `content/resumes/`);
        onValue(dbRef, (snapshot) => {
            const filteredGroup: ResumeGroup = {};
            const resumeList = snapshot.val();
            resumeIDs.forEach(id => {
                if (resumeList[id]) {
                    filteredGroup[id] = resumeList[id];
                }
            });
            setUserResumes(filteredGroup);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resumeIDs]);

    const handleNewResume = useCallback(() => {
        const resumeID = `${userID}_${uuidv4()}`;
        nav(`/builder/${resumeID}`)
    }, [nav, userID]);

    const handleEditResume = useCallback((resumeID: string) => {
        nav(`/builder/${resumeID}`)
    }, [nav]);

    const handlePreviewResume = useCallback((resumeID: string) => {
        nav(`/preview/${resumeID}`);
    }, [nav]);

    const handleSubmitResume = (resumeID: string) => {
        // TODO
        console.log('submit: ', resumeID);
    }
    
    const handleDeleteResume = (resumeID: string) => {
        // TODO
    }

    
    const ResumeTable = useMemo(() => {
        return (
            <Table aria-label="simple table">
                <TableHead sx={{ background: '#BEBEBE' }}>
                    <TableRow>
                        {/* <TableCell align="center" sx={{ fontWeight: '800' }}>ID</TableCell> */}
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Creation Date</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Edit</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Submit</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Preview</TableCell>
                        <TableCell align="center" sx={{ fontWeight: '800' }}>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userResumes && Object.entries(userResumes).map((resumeContent, index) => {
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {/* <TableCell align="center">{value.id}</TableCell> */}
                                <TableCell align="center">{resumeContent[1].creationDate}</TableCell>
                                <TableCell align="center">{resumeContent[1].status}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleEditResume(resumeContent[0])}>
                                        <EditIcon/>    
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleSubmitResume(resumeContent[0])}>
                                        <SendIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handlePreviewResume(resumeContent[0])}>
                                        <OpenIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleDeleteResume(resumeContent[0])}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        );
    }, [userResumes, handleEditResume, handlePreviewResume]);    

    return (
        <Container data-test-id={'student-center-list-view'}>
            <HeaderSection>
                <PageHeader>{capitalize(STRINGS_ENG.resumes)}</PageHeader>  
                {userResumes ? (<NewResumeButton onClick={handleNewResume}>{capitalizeEveryWord(STRINGS_ENG.new_resume)}</NewResumeButton>) : (<></>)}
            </HeaderSection>
            <ContentContainer>
                {userResumes ? 
                (ResumeTable)
                : (
                    <div style={{ color: 'white', fontSize: '2rem', fontWeight: '800', flexWrap:'nowrap', background: 'gray', width: '500px', height: '400px', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column', gap: '12px'}}>
                        {capitalize(STRINGS_ENG.create_first_resume)}
                        <NewResumeButton onClick={handleNewResume}>{capitalizeEveryWord(STRINGS_ENG.new_resume)}</NewResumeButton>
                    </div>
                )}
            </ContentContainer>
        </Container>
    )
};

export default StudentCenterListView;