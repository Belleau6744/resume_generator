import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { Experience } from "../../../../types/resumeTypes";
import TabPanelWorkingExperience from "./Working/TabPanelWorkingExperience";

type ExperienceBuilderProps = {
    content: Experience;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                <Tab label={'Volunteering'} />
                <Tab label={'Project'} />
            </Tabs>
        </Box>
        <TabPanelWorkingExperience index={0} value={tabValue} workingExperience={content.workingExperience} setCurrentResume={setCurrentResume} />

        </Container>
    )
};

export default ExperienceBuilder;