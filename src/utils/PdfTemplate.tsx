import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Features } from "../redux/features";
import { ResumesType } from "../types/dbStructType";
import { ResumeFormType } from "../types/resumeTypes";

// TODO Add props : resumeId
const RESUME_ID = 'abc';

const PdfTemplate = () => {
    const userId = useSelector(Features.UserFeature.selector.getUserID);
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
        setResumeContent(Object.values(resumesList).find(resume => resume.id===RESUME_ID)?.content);
    }, [resumesList]);


    return (
        <Container>
            <GeneralInfoContainer>
                <NameWrapper>
                    <div>{resumeContent?.generalInfo["First Name"]}</div>
                    <div>{resumeContent?.generalInfo["Last Name"]}</div>
                </NameWrapper>
                <div>{resumeContent?.generalInfo.Address}</div>
                <div>{resumeContent?.generalInfo?.title}</div>
                <div>{resumeContent?.generalInfo.Citizenship}</div>
                <div>{resumeContent?.generalInfo["Email Address"]}</div>
                
                
                <div>{resumeContent?.generalInfo["Phone Number"]}</div>
                {resumeContent?.generalInfo.Languages && Object.entries(resumeContent?.generalInfo.Languages).map(lang => {
                    return (
                        <>
                        <div>{lang[0]}</div>
                        <div>{lang[1].comprehensionLevel}</div>
                        <div>{lang[1].oralLevel}</div>
                        <div>{lang[1].writtenLevel}</div>
                        </>
                    )
                })}
            </GeneralInfoContainer>
            {/********************************** */}
            <EducationContainer>
                <h3>Education</h3>
                {resumeContent?.education && Object.values(resumeContent?.education).map(item => {
                    return (
                        <>
                            <div>{item.degree}</div>
                            <div>{item.endDate}</div>
                            <div>{item.fieldOfStudy}</div>
                            <div>{item.schoolAddresss}</div>
                            <div>{item.schoolName}</div>
                            <div>{item.startDate}</div>
                        </>
                    );
                })}
            </EducationContainer>
            {/********************************** */}
            <SkillsContainer>
                {resumeContent?.skills && Object.values(resumeContent?.skills).map(item => {
                    return (
                        <>
                            <div>{item.title}</div>
                            <div>{item.description}</div>
                        </>
                    )
                })}
            </SkillsContainer>
            {/********************************** */}
            <ExperienceContainer>
                <ProjectExperienceWrapper>
                    {resumeContent?.experience.projectExperience && Object.values(resumeContent?.experience.projectExperience).map(item => {
                        return (
                            <>
                                <div>{item.description}</div>
                            </>
                        )
                    })}
                </ProjectExperienceWrapper>
                <VolunteerExperienceWrapper>
                    {resumeContent?.experience.volunteerExperience && Object.values(resumeContent?.experience.volunteerExperience).map(item => {
                        return (
                            <>
                                <div>{item.description}</div>
                            </>
                        )
                    })}
                </VolunteerExperienceWrapper>
                <WorkingExperienceWrapper>
                    {resumeContent?.experience.workingExperience && Object.values(resumeContent?.experience.workingExperience).map(item => {
                        return (
                            <>
                                <div>{item.jobTitle}</div>
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
            
        </Container>
    );
};

/**************** GENERAL INFO *************************/
const NameWrapper = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 32px;
`;
const GeneralInfoContainer = styled.div`
    color: white;
    width: 100%;
    gap: 3px;
`;

/**************** EXPERIENCE *************************/
const ExperienceContainer = styled.div`
    width: 100%;
`;
const ProjectExperienceWrapper = styled.div`
    width: 100%;
`;
const VolunteerExperienceWrapper = styled.div`
    width: 100%;
`;
const WorkingExperienceWrapper = styled.div`
    width: 100%;
`;

/**************** SKILLS *************************/
const SkillsContainer = styled.div`
    width: 100%;
`;

/**************** EDUCATION *************************/
const EducationContainer = styled.div`
    width: 100%;
`;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    padding: 10px;
`;

export default PdfTemplate;