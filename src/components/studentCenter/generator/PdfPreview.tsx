import { Button } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DownloadIcon from "../../../assets/Icons/DownloadIcon";
import { ResumeFormType } from "../../../types/resumeTypes";
import PdfTemplate from "./template_1/PdfTemplate";

const Title = styled.h1`
    
`;

const Heading = styled.div`
    background: white;
    margin: 20px 0 80px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    justify-content: center;
    width: 100%;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const PageContainer = styled.div`
`

type PdfPreviewProps = {
    userID: string;
}

const PdfPreview = ({ userID }: PdfPreviewProps) => {
    const [ currentResume , setCurrentResume ] = useState<ResumeFormType>();
    const { resumeID } = useParams();

    const db = getDatabase();
    const dbRef = ref(db, `users/${userID}/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setCurrentResume(snapshot.val().content);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDownloadResume = () => {
        // TODO Implement
        // captureAndPrint(currentResume);
    };

    return (
        <PageContainer id='page-container' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
            <Heading>
                <Title>Here is a preview of your resume</Title>
                <Button variant='contained' color='primary' onClick={handleDownloadResume} endIcon={<DownloadIcon />}>Download PDF</Button>
            </Heading>
            <PdfTemplate resume={currentResume} />
        </PageContainer>
    )
};

export default PdfPreview;