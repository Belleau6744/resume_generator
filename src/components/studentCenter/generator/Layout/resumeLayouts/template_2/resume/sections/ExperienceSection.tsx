import { Skeleton } from "@mui/material";
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

const ExperienceSection = ({experience}: ExperienceSectionProps) => {
    return (
        <Container>
            <SectionTitle>Experience</SectionTitle>
            <ContentWrapper style={{ marginBottom: '3px' }}>
                {experience?.workingExperience && Object.values(experience.workingExperience).map((item, index) => {
                    return (
                        <div style={{ borderBottom: '1px '}}>
                            <div style={{ fontWeight: 700 }} key={index}>{item.jobTitle}</div>
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
            </ContentWrapper>
            <SectionTitle style={{fontWeight: '700', fontSize: '0.8rem'}}>Project / Volunteering</SectionTitle>
            <ContentWrapper>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={300} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={330} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={330} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={330} height={10} /></div>
                    </div>
                </div>
            </ContentWrapper>
        </Container>
    )
}

export default ExperienceSection;