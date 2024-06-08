import styled from "styled-components";
import { SectionContainer } from "../utils";
import { Skeleton } from "@mui/material";

const ExperienceSectionPreview = () => { 

    return (
        <ExperienceContainer>
            <SectionTitle>Experience</SectionTitle>
            <WorkingExperienceWrapper>
                <div style={{ borderBottom: '1px '}}>
                    <Skeleton variant="rectangular" width={100} height={20} />
                    <div style={{ display: 'flex', color: '#667085' }}>
                        <Skeleton variant="rectangular" width={100} height={20} />
                    </div>
                    <ul style={{ marginTop: '3px'}}>
                        <li><Skeleton variant="rectangular" width={100} height={60} /></li>
                    </ul>
                </div>
                <div style={{ borderBottom: '1px '}}>
                    <Skeleton variant="rectangular" width={100} height={60} />
                    <div style={{ display: 'flex', color: '#667085' }}>
                        <Skeleton variant="rectangular" width={100} height={20} />
                    </div>
                    <ul style={{ marginTop: '3px'}}>
                        <li><Skeleton variant="rectangular" width={100} height={20} /></li>
                    </ul>
                </div>
            </WorkingExperienceWrapper>

            {/* TODO MOVE THIS SECTION */}
            <ProjectExperienceWrapper>
                <SubSectionTitle>Projects</SubSectionTitle>
                <ul style={{ marginTop: '3px'}}>
                    <li><Skeleton variant="rectangular" width={100} height={20} /></li>
                </ul>
            </ProjectExperienceWrapper>
            <VolunteerExperienceWrapper>
                <SubSectionTitle>Volunteering</SubSectionTitle>
                <ul style={{ marginTop: '3px'}}>
                    <li><Skeleton variant="rectangular" width={100} height={20} /></li>
                </ul>
            </VolunteerExperienceWrapper>
        </ExperienceContainer>
    )
}

const SubSectionTitle = styled.div`
    font-weight: 600;
    font-size: 0.7rem;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
`;

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
    border-bottom: 2px solid black;
    margin-bottom: 5px;
`;

const ExperienceContainer = styled(SectionContainer)`
    padding-left: 20px;
    height: 100%;
`;
const ProjectExperienceWrapper = styled(SectionContainer)``;
const VolunteerExperienceWrapper = styled(SectionContainer)``;
const WorkingExperienceWrapper = styled(SectionContainer)``;

export default ExperienceSectionPreview;