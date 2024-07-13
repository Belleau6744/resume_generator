
import { Button, capitalize } from "@mui/material";
import { ResumeGroup } from "@types";
import HelpIcon from "assets/Icons/HelpIcon";
import { getDatabase, onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { STRINGS_ENG } from "../../../assets/stringConstants";
import { capitalizeEveryWord } from "../../../utils/stringUtils";
import FAQModal from './FAQModal';
import ResumeTable from "./ResumeTable";

type ListViewProps = {
    userID?: string;
}

const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
    const [userResumes, setUserResumes] = useState<ResumeGroup>();
    const [isHelpModalOpened, setIsHelpModalOpened] = useState<boolean>(false);

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

    const handleClickHelpModal = () => {
        setIsHelpModalOpened(true);
    }
    const handleCloseHelpDialog = () => {
        setIsHelpModalOpened(false);
    }

    return (
        <Container data-test-id={'student-center-list-view'}>
            <FAQModal handleCloseHelpDialog={handleCloseHelpDialog} isHelpModalOpened={isHelpModalOpened} />
            <HeaderSection>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                <Button onClick={handleClickHelpModal} sx={{ display: 'flex', alignItems: 'center', gap: '5px' }} variant="outlined" size="large" color="info"><HelpIcon width={15}  fill={'rgba(5, 138, 209, 0.79)'} height={15}/>Help</Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
                    <PageHeader>{capitalize(STRINGS_ENG.resumes)}</PageHeader>  
                    {userResumes ? (<NewResumeButton onClick={handleNewResume}>{capitalizeEveryWord(STRINGS_ENG.new_resume)}</NewResumeButton>) : (<></>)}
                </div>
            </HeaderSection>
            <ContentContainer>
                {userResumes ? 
                <ResumeTable userResumes={userResumes} />
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