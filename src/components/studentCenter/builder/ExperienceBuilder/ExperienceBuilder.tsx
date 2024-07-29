import RateReviewIcon from '@mui/icons-material/RateReview';
import { Alert, Box, Button, Tab, Tabs } from "@mui/material";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { useResumeContext } from "../useResumeContext";
import TabPanelProjectExperience from "./Project/TabPanelProjectExperience";
import TabVolunteeringExperience from "./Volunteering/TabVolunteeringExperience";
import TabPanelWorkingExperience from "./Working/TabPanelWorkingExperience";

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
`;

const ExperienceBuilder = () => {
    const {
        isDirty,
        handleSaveResume,
        currentResume,
        handleCommentSectionToggle,
        resetResume
    } = useResumeContext();
    const [tabValue, setTabValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const content = useMemo(() => {
        return currentResume.content.experience;
    }, [currentResume.content.experience])
    
    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <SectionTitle>Experience</SectionTitle>
                <Button onClick={handleCommentSectionToggle} variant="contained" size="medium" color="warning" sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RateReviewIcon />
                    View Comments
                </Button>
            </div>
                <Box sx={{ borderColor: 'divider', borderBottom: 1, marginTop: '20px'}}>
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label={'Working'} />
                        <Tab label={'Project'} />
                        <Tab label={'Volunteering'} />
                    </Tabs>
                </Box>
            <TabPanelWorkingExperience index={0} value={tabValue} workingExperience={content?.workingExperience} />
            <TabPanelProjectExperience index={1} value={tabValue} projectExperience={content?.projectExperience} />
            <TabVolunteeringExperience index={2} value={tabValue} volunteeringExperience={content?.volunteerExperience} />
            <BottomWrapper>
                <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                <div style={{ display: 'flex', gap:'20px' }}>
                    <Button disabled={!isDirty} size='large' color="charcoal" type="button" variant='outlined' onClick={resetResume}>Reset</Button>
                    <Button type="button" size='large' color='success' variant='contained' onClick={handleSaveResume}>Save</Button>
                </div>
            </BottomWrapper>
        </Container>
    )
};

export default ExperienceBuilder;