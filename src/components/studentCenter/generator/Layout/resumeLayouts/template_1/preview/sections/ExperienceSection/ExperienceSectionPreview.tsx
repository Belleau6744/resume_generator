import { Skeleton } from "@mui/material";
import styled from "styled-components";
import { SectionContainer } from "../utils";

const ExperienceSectionPreview = () => { 

    return (
        <ExperienceContainer>
            <SectionTitle>Experience</SectionTitle>
            <WorkingExperienceWrapper>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
            </WorkingExperienceWrapper>
            <ProjectExperienceWrapper>
                <SubSectionTitle>Projects</SubSectionTitle>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
            </ProjectExperienceWrapper>
            <VolunteerExperienceWrapper>
                <SubSectionTitle>Volunteering</SubSectionTitle>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={180} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={222} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={200} height={10} /></div>
                    </div>
                </div>
            </VolunteerExperienceWrapper>
        </ExperienceContainer>
    )
}

const SubSectionTitle = styled.div`
    font-weight: 600;
    font-size: 0.7rem;
    border-bottom: 1px solid black;
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