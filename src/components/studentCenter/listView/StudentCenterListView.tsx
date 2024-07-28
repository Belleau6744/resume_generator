
import AddIcon from '@mui/icons-material/Add';
import { Button, capitalize } from "@mui/material";
import { ResumeGroup } from "@types";
import BackgroundComponent from 'components/Background';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { STRINGS_ENG } from "../../../assets/stringConstants";
import { capitalizeEveryWord } from "../../../utils/stringUtils";
import "../../style.css";
import ResumeTable from "./ResumeTable";

type ListViewProps = {
    userID?: string;
}

const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const PageHeader = styled.h1`
    color: #34495E;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 40px;
`;

const Container = styled.div`
    background: white;
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 12px;
    padding: 40px;
    margin: 40px;
    padding-top: 40px;
    min-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: black;
`;

const StudentCenterListView = (props: ListViewProps) => {
    const { userID } = props;
    const nav = useNavigate();
    const [resumeIDs, setResumeIDs] = useState<string[]>([]);
    const [userResumes, setUserResumes] = useState<ResumeGroup>();
    

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

    return (
        <BackgroundComponent>
            <div style={{ height: '100vh' }}>
            <Container data-test-id={'student-center-list-view'}>        
                <HeaderSection>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 15px' }}>
                        <PageHeader>{capitalize(STRINGS_ENG.resumes)}</PageHeader>  
                        {userResumes ? (<Button variant="outlined" color="info" onClick={handleNewResume} startIcon={<AddIcon/>}>{capitalizeEveryWord(STRINGS_ENG.new_resume)}</Button>) : (<></>)}
                    </div>
                </HeaderSection>
                <ContentContainer>
                    {userResumes ? 
                    <ResumeTable userResumes={userResumes} />
                    : (
                        <div style={{ color: 'white', fontSize: '2rem', fontWeight: '800', flexWrap:'nowrap', background: 'gray', width: '500px', height: '400px', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column', gap: '12px'}}>
                            {capitalize(STRINGS_ENG.create_first_resume)}
                            <Button color="info" onClick={handleNewResume}>{capitalizeEveryWord(STRINGS_ENG.new_resume)}</Button>
                        </div>
                    )}
                </ContentContainer>
            </Container>
            </div>
        </BackgroundComponent>
        
        
    )
};

export default StudentCenterListView;