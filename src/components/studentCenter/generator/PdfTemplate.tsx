import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ResumesType } from "../../../types/dbStructType";
import { ResumeFormType } from "../../../types/resumeTypes";
import ContactInfoSection from "./sections/ContactInfoSection";
import EducationSection from "./sections/EducationSection";
import LanguageSection from "./sections/LanguageSection/LanguageSection";

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
            <Header>
                <NameWrapper>
                    <div>{resumeContent?.generalInfo["First Name"]}</div>
                    <div>{resumeContent?.generalInfo["Last Name"]}</div>
                </NameWrapper>
                {resumeContent?.generalInfo?.title && <div style={{ color: '#667085' }}>{resumeContent?.generalInfo?.title}</div>}
            </Header>
            {/********************************** */}
            <BodyWrapper>
                <LeftColumn>
                    {/* Contact Information Section */}
                    <ContactInfoSection 
                        phoneNumber={resumeContent?.generalInfo["Phone Number"]}
                        address={resumeContent?.generalInfo.Address}
                        emailAddress={resumeContent?.generalInfo["Email Address"]}
                        linkedIn={resumeContent?.generalInfo["linkedIn"]}
                        citizenship={resumeContent?.generalInfo.Citizenship}
                    />

                    {/* Language Section */}
                    <LanguageSection languages={resumeContent?.generalInfo.Languages}/>

                    {/* Education Section */}
                    <EducationSection education={resumeContent?.education}/>                    
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
            </BodyWrapper>
        </Container>
    );
};

const SectionContainer = styled.div`
    width: 100%;
`;

const BodyWrapper = styled.div`
    display: flex;
    margin-top: 20px;
    padding: 30px 30px;
    border-top: 1px solid black;
`;

const Header = styled.div`
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

/**************** LEFT COLUMN *************************/
const LeftColumn = styled.div`
`;

/**************** RIGHT INFO *************************/
const RightColumn = styled.div`
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: black;
    width: 210mm;
    height: 297mm;
    font-family: sans-serif, Arial, Helvetica;
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
    line-height: 70px;
    font-size: 1.5em;
`;

/**************** EXPERIENCE *************************/
const ExperienceContainer = styled(SectionContainer)``;
const ProjectExperienceWrapper = styled(SectionContainer)``;
const VolunteerExperienceWrapper = styled(SectionContainer)``;
const WorkingExperienceWrapper = styled(SectionContainer)``;

/**************** SKILLS *************************/
const SkillsContainer = styled(SectionContainer)``;

export default PdfTemplate;