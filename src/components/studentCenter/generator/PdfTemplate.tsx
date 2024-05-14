import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import LocationIcon from "../../../assets/Icons/LocationIcon";
import PhoneIcon from "../../../assets/Icons/PhoneIcon";
import { ResumesType } from "../../../types/dbStructType";
import { ResumeFormType } from "../../../types/resumeTypes";
import LanguageLevelScale from "./LanguageLevelScale";

type PdfTemplateProps = {
    resumeId: string;
    userId: string | undefined;
}

const PdfTemplate = (props: PdfTemplateProps) => {
    // const { resumeId, userId } = props;
    // TODO REMOVE
    const resumeId = 'abc';
    const userId = 'CFIHxTvvnEOdIvKLt4EX9WW1dmh1';
    // TODO REMOVE

    const [ resumesList , setResumesList ] = useState<ResumesType>({});
    const [ resumeContent, setResumeContent ] = useState<ResumeFormType>();
  
    const db = getDatabase();
    const dbRef = ref(db, `students/${userId}/resumes/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
        setResumesList(snapshot.val());
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setResumeContent(Object.values(resumesList).find(resume => resume.id===resumeId)?.content);
    }, [resumeId, resumesList]);


    // TODO Handle "no user ID"
    return (
        <Container>
            <NameWrapper>
                    <div>{resumeContent?.generalInfo["First Name"]}</div>
                    <div>{resumeContent?.generalInfo["Last Name"]}</div>
                    {resumeContent?.generalInfo?.title && <div> | {resumeContent?.generalInfo?.title}</div>}
            </NameWrapper>
            {/********************************** */}
            <ColumnWrapper>
                <LeftColumn>
                    <ContactInfoContainer>    
                        <LeftColTitles>Contact</LeftColTitles>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PhoneIcon />{resumeContent?.generalInfo["Phone Number"]}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><LocationIcon />{resumeContent?.generalInfo.Address}</div>
                        
                        <div>{resumeContent?.generalInfo.Citizenship}</div>
                        <div>{resumeContent?.generalInfo["Email Address"]}</div>
                    </ContactInfoContainer>
                    <LanguageContainer>
                        <LeftColTitles>Languages</LeftColTitles>
                        {resumeContent?.generalInfo.Languages && Object.entries(resumeContent?.generalInfo.Languages).map((lang, index) => {
                            return (
                                <div>{<LanguageLevelScale key={index} language={lang[0]} level={+lang[1]} />}</div>
                            )
                        })}
                    </LanguageContainer>
                    <EducationContainer>
                        <h3>Education</h3>
                        {resumeContent?.education && Object.values(resumeContent?.education).map((item, index) => {
                            return (
                                <>
                                    <div key={index}>{item.degree}</div>
                                    <div>{item.endDate}</div>
                                    <div>{item.fieldOfStudy}</div>
                                    <div>{item.schoolAddresss}</div>
                                    <div>{item.schoolName}</div>
                                    <div>{item.startDate}</div>
                                </>
                            );
                        })}
                    </EducationContainer>
                    <SkillsContainer>
                        {resumeContent?.skills && Object.values(resumeContent?.skills).map((item, index) => {
                            return (
                                <>
                                    <div key={index}>{item.title}</div>
                                    <div>{item.description}</div>
                                </>
                            )
                        })}
                    </SkillsContainer>
                </LeftColumn>
                {/********************************** */}
                <RightColumn>
                    <ExperienceContainer>
                        <ProjectExperienceWrapper>
                            {resumeContent?.experience.projectExperience && Object.values(resumeContent?.experience.projectExperience).map((item, index) => {
                                return (
                                    <>
                                        <div key={index}>{item.description}</div>
                                    </>
                                )
                            })}
                        </ProjectExperienceWrapper>
                        <VolunteerExperienceWrapper>
                            {resumeContent?.experience.volunteerExperience && Object.values(resumeContent?.experience.volunteerExperience).map((item, index) => {
                                return (
                                    <>
                                        <div key={index}>{item.description}</div>
                                    </>
                                )
                            })}
                        </VolunteerExperienceWrapper>
                        <WorkingExperienceWrapper>
                            {resumeContent?.experience.workingExperience && Object.values(resumeContent?.experience.workingExperience).map((item, index) => {
                                return (
                                    <>
                                        <div key={index}>{item.jobTitle}</div>
                                        <div>{item.organizationName}</div>
                                        <div>{item.startDate}</div>
                                        <div>{item.stillWorking}</div>
                                        {item.taskDescription.map(task => {return <div>{task}</div>})}
                                        <div>{item.stillWorking ? '' : item.endDate}</div>
                                    </>
                                )
                            })};
                        </WorkingExperienceWrapper>
                    </ExperienceContainer>
                </RightColumn>
            </ColumnWrapper>
        </Container>
    );
};

// For every the section
const SectionContainer = styled.div`
    width: 100%;
`;

const ColumnWrapper = styled.div`
    display: flex;
`;

/**************** LEFT COLUMN *************************/
const LeftColumn = styled.div`
`;
const LeftColTitles = styled.div`
    font-weight: 800;
    font-size: 1.8rem;
`;

/**************** RIGHT INFO *************************/
const RightColumn = styled.div`
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;
    background: white;
    padding: 10px 50px;
`;


/**************** GENERAL INFO *************************/
const NameWrapper = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 32px;
`;
const ContactInfoContainer = styled(SectionContainer)`
    width: 100%;
    gap: 3px;
    margin-bottom: 20px;
`;

/**************** LANGUAGE *************************/
const LanguageContainer = styled(SectionContainer)``;

/**************** EXPERIENCE *************************/
const ExperienceContainer = styled(SectionContainer)``;
const ProjectExperienceWrapper = styled(SectionContainer)``;
const VolunteerExperienceWrapper = styled(SectionContainer)``;
const WorkingExperienceWrapper = styled(SectionContainer)``;

/**************** SKILLS *************************/
const SkillsContainer = styled(SectionContainer)``;

/**************** EDUCATION *************************/
const EducationContainer = styled(SectionContainer)``;

export default PdfTemplate;