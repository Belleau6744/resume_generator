import { styled } from "styled-components";
import { ExperienceSectionProps } from "../../../types";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    gap: 8px;
`;

const Container = styled.div`    
    padding-top: 8px;
`;

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
    padding-bottom: 3px;
`;

const SubSectionTitle = styled.div`
    font-weight: 600;
    font-size: 0.7rem;
    padding: 0 5px;
    width: fit-content;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
`;

const ExperienceSection = ({experience}: ExperienceSectionProps) => {
    return (
        <Container>
            <SectionTitle>Experience</SectionTitle>
            <ContentWrapper style={{ marginBottom: '3px', width: '100%' }}>
                {experience?.workingExperience && Object.values(experience.workingExperience).map((item, index) => {
                    return (
                        <div style={{ borderBottom: '1px ', width: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 700 }} key={index}>{item.jobTitle}</div>
                                    <div>{item.organizationName}</div>
                                </div>
                                <div style={{ display: 'flex', color: '#667085' }}>
                                    <div>&nbsp;&nbsp;</div>
                                    <div>{item.startDate}</div>
                                    <div>&nbsp;- {item.stillWorking === false ? item.endDate : ''}</div>
                                </div>
                            </div>
                            <ul style={{ marginTop: '3px'}}>
                                {item && Array.isArray(item.taskDescription) && item?.taskDescription.map(task => {
                                    return <li><div style={{ fontSize: '0.6rem' }}>{task}</div></li>
                                })}
                            </ul>
                        </div>
                    )
                })}
            </ContentWrapper>
            <ContentWrapper>
                <div>
                    <SubSectionTitle>Projects</SubSectionTitle>
                    <ul style={{ marginTop: '3px'}}>
                        {experience?.projectExperience && Object.values(experience.projectExperience).map((item, index) => {
                            return (
                                <li key={index}><div style={{ fontSize: '0.6rem' }}>{item.description}</div></li>
                            )
                        })}
                    </ul>
                </div>
                <div>
                    <SubSectionTitle>Volunteering</SubSectionTitle>
                    <ul style={{ marginTop: '3px'}}>
                        {experience?.volunteerExperience && Object.values(experience.volunteerExperience).map((item, index) => {
                            return (
                                <li key={index}><div style={{ fontSize: '0.6rem' }}>{item.description}</div></li>
                            )
                        })}
                    </ul>
                </div>
            </ContentWrapper>
        </Container>
    )
}

export default ExperienceSection;