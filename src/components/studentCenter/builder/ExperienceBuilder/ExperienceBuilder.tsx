import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { Experience } from "../../../../types/resumeTypes";
import TabPanelProjectExperience from "./Project/TabPanelProjectExperience";
import TabPanelWorkingExperience from "./Working/TabPanelWorkingExperience";

type ExperienceBuilderProps = {
    content: Experience;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

const ExperienceBuilder = ({ content, setCurrentResume }: ExperienceBuilderProps) => {
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

        </Container>
    )
};

export default ExperienceBuilder;