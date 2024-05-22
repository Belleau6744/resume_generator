import "@ag-grid-community/styles/ag-grid.css"; // Core CSS
import "@ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { getDatabase, onValue, ref } from 'firebase/database';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Column, Row, Table, TableBody, TableHeader } from 'react-aria-components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { UsersType } from '../../../types/dbStructType';
import ResumeRow from "./ResumeRow";

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  background: #D2D2D2;
  padding: 25px;
  border-radius: 12px;
`;

const ColumnTitle = styled.div`
display: flex;
width: 100%;
justify-content: center;
align-items: center;
`;


const ReactAriaRow = styled(Row)`
  --radius-bottom: 0 !important;
  --radius-top: 0 !important;
  border-radius: 0 !important;
`;


const StudentCenterListView = (props: ListViewProps) => {
    const { userID } = props;
    const nav = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dbContent, setDbContent] = useState<UsersType>({});

    /**
     * FETCHING 
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `users/${userID}/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setDbContent(snapshot.val());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNewResume = useCallback(() => {
        const resumeID = uuidv4();
        nav(`/builder/${resumeID}`)
    }, [nav]);
    
    const ResumeTable = useMemo(() => {
        return (
            <TableContainer>
                <Table aria-label="Files" style={{width: '100%'}} selectionMode="none">
                    <TableHeader>
                        <Column isRowHeader><ColumnTitle>Creation Date</ColumnTitle></Column>
                        <Column><ColumnTitle>Status</ColumnTitle></Column>
                        <Column><ColumnTitle>Edit</ColumnTitle></Column>
                        <Column><ColumnTitle>Get</ColumnTitle></Column>
                    </TableHeader>
                    <TableBody>
                    {dbContent?.resumes && Object.values(dbContent.resumes).map((value, index) => {
                        return (
                            <ReactAriaRow key={index}>
                                <ResumeRow creationDate={value.creationDate} id={value.id} status={value.status} />
                            </ReactAriaRow>
                            
                        )
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }, [dbContent?.resumes]);    

    return (
        <Container>
            <HeaderSection>
                <PageHeader>Resumes</PageHeader>  
                {dbContent?.resumes ? (<NewResumeButton>New Resume</NewResumeButton>) : (<></>)} 
            </HeaderSection>
            <ContentContainer>
                {dbContent?.resumes ? 
                (ResumeTable)
                : (
                    <div style={{ color: 'white', fontSize: '2rem', fontWeight: '800', flexWrap:'nowrap', background: 'gray', width: '500px', height: '400px', display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column', gap: '12px'}}>
                        Create your first resume
                        <NewResumeButton onClick={handleNewResume}>New Resume</NewResumeButton>
                    </div>
                )}
            </ContentContainer>
        </Container>
    )
};

export default StudentCenterListView;