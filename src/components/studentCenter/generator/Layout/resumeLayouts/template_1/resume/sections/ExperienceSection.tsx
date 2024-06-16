import styled from "styled-components";
import { ExperienceSectionProps } from "../../../types";
import { SectionContainer } from "./utils";

const ExperienceSection = ({ experience }: ExperienceSectionProps) => { 

    return (
        <ExperienceContainer>
            <SectionTitle>Experience</SectionTitle>
            <WorkingExperienceWrapper>
                {experience?.workingExperience && Object.values(experience.workingExperience).map((item, index) => {
                    return (
                        <div style={{ borderBottom: '1px '}} key={index}>
                            <div style={{ fontWeight: 700 }}>{item.jobTitle}</div>
                            <div>{item.organizationName}</div>
                            <div style={{ display: 'flex', color: '#667085' }}>
                                <div>{item.startDate}</div>
                                <div>&nbsp;- {item.stillWorking === false ? item.endDate : ''}</div>
                            </div>
                            <ul style={{ marginTop: '3px'}}>
                                {item && Array.isArray(item.taskDescription) && item?.taskDescription.map(task => {
                                    return <li><div style={{ fontSize: '0.6rem' }}>{task}</div></li>
                                })}
                            </ul>
                        </div>
                    )
                })}
            </WorkingExperienceWrapper>

            {/* TODO MOVE THIS SECTION */}
            <ProjectExperienceWrapper>
                <SubSectionTitle>Projects</SubSectionTitle>
                <ul style={{ marginTop: '3px'}}>
                    {experience?.projectExperience && Object.values(experience.projectExperience).map((item, index) => {
                        return (
                            <li key={index}><div style={{ fontSize: '0.6rem' }}>{item.description}</div></li>
                        )
                    })}
                </ul>
            </ProjectExperienceWrapper>
            <VolunteerExperienceWrapper>
                <SubSectionTitle>Volunteering</SubSectionTitle>
                <ul style={{ marginTop: '3px'}}>
                    {experience?.volunteerExperience && Object.values(experience.volunteerExperience).map((item, index) => {
                        return (
                            <li key={index}><div style={{ fontSize: '0.6rem' }}>{item.description}</div></li>
                        )
                    })}
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

export default ExperienceSection;