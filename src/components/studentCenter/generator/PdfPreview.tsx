import { Button } from "@mui/material";
import { ResumeFormType } from "@types";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DownloadIcon from "../../../assets/Icons/DownloadIcon";
import GridIcon from "../../../assets/Icons/GridIcon";
import PdfLayoutsPreview from "./Layout/PdfLayoutsPreview";
import PdfTemplate1 from "./Layout/resumeLayouts/template_1/resume/PdfTemplate1";
import PdfTemplate2 from "./Layout/resumeLayouts/template_2/resume/PdfTempalte2";
import PdfTemplate3 from "./Layout/resumeLayouts/template_3/resume/PdfTemplate3";
import PdfTemplate4 from "./Layout/resumeLayouts/template_4/resume/PdfTemplate4";

const Title = styled.h1``;

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
    display: flex;
    width: 100%;
    justify-content: center;
`;

type PdfPreviewProps = {
    userID: string;
}

const PdfPreview = ({ userID }: PdfPreviewProps) => {
    const [ currentResume , setCurrentResume ] = useState<ResumeFormType>();
    const [ previewingLayout, setPreviewingLayout ] = useState<boolean>(false);
    const [ layoutID, setLayoutID ] = useState<string>('');
    const { resumeID } = useParams();

    const db = getDatabase();
    const dbRef = ref(db, `users/${userID}/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setCurrentResume(snapshot.val().content);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateLayoutID = (value) => {
        setLayoutID(value);
        setPreviewingLayout(false);
    }

    const handleDownloadResume = () => {
        // TODO Implement
        // captureAndPrint(currentResume);
    };

    useEffect(() => {
        console.log(currentResume);
    }, [currentResume]);

    useEffect(() => {
        console.log(layoutID);
    }, [layoutID]);

    const CurrentLayout = useMemo(() => {
        switch(layoutID) {
            case '1':
                return <PdfTemplate1 resume={currentResume} />
            case '2':
                return <PdfTemplate2 resume={currentResume} />
            case '3':
                return <PdfTemplate3 resume={currentResume} />
            case '4':
                return <PdfTemplate4 resume={currentResume} />
            default:
                return <PdfTemplate1 resume={currentResume} />
        }
    }, [currentResume, layoutID]);

    return (
        <PageContainer id='page-container' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
            {previewingLayout ? (
                <PdfLayoutsPreview setLayoutID={updateLayoutID} />
            ) : (
                <>
                    <Heading>
                        <Title>Here is a preview of your resume</Title>
                        <div style={{ display: 'flex', width: '60%', justifyContent: 'space-around' }}>
                            <Button variant='contained' color='info' onClick={() => setPreviewingLayout(true)} endIcon={<GridIcon fill="white" />}>Change Layout</Button>
                            <Button variant='contained' color='success' onClick={handleDownloadResume} endIcon={<DownloadIcon fill="white" />}>Download PDF</Button>
                        </div>
                    </Heading>
                    {CurrentLayout}
                </>
            )}
        </PageContainer>
    )
};

export default PdfPreview;