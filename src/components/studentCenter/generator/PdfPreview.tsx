import { Button } from "@mui/material";
import { ResumeContentType } from "@types";
import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { captureAndPrint } from "utils/pdfUtils";
import DownloadIcon from "../../../assets/Icons/DownloadIcon";
import GridIcon from "../../../assets/Icons/GridIcon";
import PdfLayoutsPreview from "./Layout/PdfLayoutsPreview";
import PdfTemplate1 from "./Layout/resumeLayouts/template_1/resume/PdfTemplate1";
import PdfTemplate2 from "./Layout/resumeLayouts/template_2/resume/PdfTempalte2";

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

const Layouts = {
    '1': PdfTemplate1,
    '2': PdfTemplate2
}

const PdfPreview = () => {
    const [ currentResume , setCurrentResume ] = useState<ResumeContentType>();
    const [ previewingLayout, setPreviewingLayout ] = useState<boolean>(false);
    const [ layoutID, setLayoutID ] = useState<string>('1');
    const { resumeID } = useParams();

    const db = getDatabase();
    const dbRef = ref(db, `content/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                setCurrentResume(snapshot.val().content);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateLayoutID = (value) => {
        setLayoutID(value);
        setPreviewingLayout(false);
    }

    const handleDownloadResume = useCallback(() => {
        captureAndPrint(currentResume, Layouts[layoutID]);
    }, [currentResume, layoutID]);

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
            default:
                setLayoutID('1');
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