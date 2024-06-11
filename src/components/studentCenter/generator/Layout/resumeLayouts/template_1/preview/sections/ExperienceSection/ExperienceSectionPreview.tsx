import { Skeleton } from "@mui/material";
import styled from "styled-components";
import { SectionContainer } from "../utils";

const ExperienceSectionPreview = () => { 

    return (
        <ExperienceContainer>
            <SectionTitle>Experience</SectionTitle>
            <WorkingExperienceWrapper>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
            </WorkingExperienceWrapper>
            <ProjectExperienceWrapper>
                <SubSectionTitle>Projects</SubSectionTitle>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
            </ProjectExperienceWrapper>
            <VolunteerExperienceWrapper>
                <SubSectionTitle>Volunteering</SubSectionTitle>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <Skeleton variant="rectangular" animation={false} width={230} height={10} />
                    <ul style={{ padding: '0', margin: '0', marginTop: '5px', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '5px' }}>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                        <li style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton variant="rectangular" animation={false} width={222} height={10} /></li>
                    </ul>
                </div>
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
    font-weight: 700;
    font-size: 0.8rem;
    border-bottom: 1px solid black;
    margin-bottom: 5px;
`;

const ExperienceContainer = styled(SectionContainer)`
    height: 100%;
    padding-left: 20px;
    
`;
const ProjectExperienceWrapper = styled(SectionContainer)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
`;
const VolunteerExperienceWrapper = styled(SectionContainer)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
`;
const WorkingExperienceWrapper = styled(SectionContainer)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
`;

export default ExperienceSectionPreview;