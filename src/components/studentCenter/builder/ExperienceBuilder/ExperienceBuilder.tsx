import { Alert, Box, Button, Tab, Tabs } from "@mui/material";
import { Experience, ResumeType } from "@types";
import { useState } from "react";
import styled from "styled-components";
import TabPanelProjectExperience from "./Project/TabPanelProjectExperience";
import TabVolunteeringExperience from "./Volunteering/TabVolunteeringExperience";
import TabPanelWorkingExperience from "./Working/TabPanelWorkingExperience";

type ExperienceBuilderProps = {
    content: Experience;
    isDirty: boolean;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

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

const ExperienceBuilder = ({ content, setCurrentResume, isDirty }: ExperienceBuilderProps) => {
    const [tabValue, setTabValue] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
      };
    
    // workingExperience: WorkingExperience;
    // volunteerExperience: VolunteerExperience;
    // projectExperience: ProjectExperience;
    
    return (
        <Container>
            <SectionTitle>Education</SectionTitle>
                <Box sx={{ borderColor: 'divider', borderBottom: 1, marginTop: '20px'}}>
                    <Tabs value={tabValue} onChange={handleChange}>
                        <Tab label={'Working'} />
                        <Tab label={'Project'} />
                        <Tab label={'Volunteering'} />
                    </Tabs>
                </Box>
            <TabPanelWorkingExperience index={0} value={tabValue} workingExperience={content.workingExperience} setCurrentResume={setCurrentResume} />
            <TabPanelProjectExperience index={1} value={tabValue} projectExperience={content.projectExperience} setCurrentResume={setCurrentResume} />
            <TabVolunteeringExperience index={2} value={tabValue} volunteeringExperience={content.volunteerExperience} setCurrentResume={setCurrentResume} />
            <BottomWrapper>
                <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                <Button type="button" size='large' color='success' variant='contained'>Save</Button>
            </BottomWrapper>
        </Container>
    )
};

export default ExperienceBuilder;