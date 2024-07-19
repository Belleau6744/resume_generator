import RateReviewIcon from '@mui/icons-material/RateReview';
import { Box, Button, Card, CardContent, CardHeader, Drawer, List, ListItem, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import { CommentsType, ResumeContentType, ResumeDefinition } from "@types";
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
    const [ currentResumeContent , setCurrentResumeContent ] = useState<ResumeContentType>();
    const [ currentResumeComments, setCurrentResumeComments ] = useState<CommentsType>();
    const [ previewingLayout, setPreviewingLayout ] = useState<boolean>(false);
    const [ isCommentDrawerOpen, setIsCommentDrawerOpen ] = useState<boolean>(false);
    const [ layoutID, setLayoutID ] = useState<string>('1');
    const { resumeID } = useParams();

    const db = getDatabase();
    const dbRef = ref(db, `content/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                const resume = snapshot.val() as ResumeDefinition;
                setCurrentResumeContent(resume.content);
                setCurrentResumeComments(resume.comments);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateLayoutID = (value) => {
        setLayoutID(value);
        setPreviewingLayout(false);
    }

    const handleDownloadResume = useCallback(() => {
        captureAndPrint(currentResumeContent, Layouts[layoutID]);
    }, [currentResumeContent, layoutID]);

    const CurrentLayout = useMemo(() => {
        switch(layoutID) {
            case '1':
                return <PdfTemplate1 resume={currentResumeContent} />
            case '2':
                return <PdfTemplate2 resume={currentResumeContent} />
            default:
                setLayoutID('1');
        }
    }, [currentResumeContent, layoutID]);

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsCommentDrawerOpen(newOpen);
      };

    const DrawerList = useMemo(() => {
        return (
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
              <List sx={{ maxHeight: '90vh', overflow: 'auto'}}>
                {currentResumeComments && Object.entries(currentResumeComments).map((value) => (
                <>
                  <ListItem alignItems='center' sx={{display: 'flex', justifyContent: 'center'}} key={value[0]}>
                    <Card 
                        variant="elevation" 
                        sx={{
                            marginBottom: '10px',
                            background: '#dfdfdf',    
                            color: 'rgba(0, 0, 0, 0.87)'
                        }}
                        key={value[0]}
                    >
                        <CardHeader color="black" title={value[1].date} />
                        <Divider />
                        <CardContent>
                            <TextField 
                                sx={{color: 'rgba(0, 0, 0, 0.87)'}}
                                InputProps={{
                                    readOnly: true, 
                                    sx: { color: 'rgba(0, 0, 0, 0.87)' }
                                }}
                                InputLabelProps={{
                                    sx:{ color:  'rgba(0, 0, 0, 0.87)' }
                                }}
                                variant="standard"
                                id={`${value[0]}_${value[1].date}`}
                                value={value[1].content}
                                fullWidth
                                multiline/>
                        </CardContent>
                    </Card>
                  </ListItem>
                  <Divider />
                  </>
                ))}
              </List>
            </Box>
          )
    }, [currentResumeComments]);

    return (
        <PageContainer id='page-container' style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%', height: '100%'}}>
            {previewingLayout ? (
                <PdfLayoutsPreview setLayoutID={updateLayoutID} />
            ) : (
                <>
                    <Heading>
                        <Title>Here is a preview of your resume</Title>
                        <Drawer anchor='right' open={isCommentDrawerOpen}  onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                        <div style={{ display: 'flex', width: '60%', justifyContent: 'space-around' }}>
                            <Button variant='contained' color='info' onClick={() => setPreviewingLayout(true)} endIcon={<GridIcon fill="white" />}>Change Layout</Button>
                            <Button variant='contained' color="warning" onClick={toggleDrawer(true)} endIcon={<RateReviewIcon fill="white" />}>View Comments</Button>
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