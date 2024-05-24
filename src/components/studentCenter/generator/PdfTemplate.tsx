import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ResumesType } from "../../../types/dbStructType";
import { ResumeFormType } from "../../../types/resumeTypes";
import ContactInfoSection from "./sections/ContactInfoSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection/ExperienceSection";
import LanguageSection from "./sections/LanguageSection/LanguageSection";

type PdfTemplateProps = {
    resumeId: string;
    userId: string | undefined;
}

// TODO REMOVE THIS
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PdfTemplate = (_props: PdfTemplateProps) => {
    // const { resumeId, userId } = props;
    // TODO REMOVE
    const resumeId = 'abc';
    const userId = 'CFIHxTvvnEOdIvKLt4EX9WW1dmh1';
    // TODO REMOVE

    const [ resumesList , setResumesList ] = useState<ResumesType>({});
    const [ resumeContent, setResumeContent ] = useState<ResumeFormType>();
  
    const db = getDatabase();
    const dbRef = ref(db, `users/${userId}/resumes/`);
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
        <Container style={{ fontSize: '0.7rem' }}>
            <Header>
                <NameWrapper>
                    <div>{resumeContent?.generalInfo["first name"]}</div>
                    <div>{resumeContent?.generalInfo["last name"]}</div>
                </NameWrapper>
                {resumeContent?.generalInfo?.role_title && <div style={{ color: '#667085' }}>{resumeContent?.generalInfo?.role_title}</div>}
            </Header>
            {/********************************** */}
            <BodyWrapper>
                <LeftColumn>
                    {/* Contact Information Section */}
                    <ContactInfoSection 
                        phoneNumber={resumeContent?.generalInfo["phone number"]}
                        emailAddress={resumeContent?.generalInfo["email address"]}
                        linkedIn={resumeContent?.generalInfo["linkedin"]}
                    />

                    {/* Language Section */}
                    <LanguageSection languages={resumeContent?.generalInfo.languages}/>

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
                    <ExperienceSection experience={resumeContent?.experience}/>
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

/**************** SKILLS *************************/
const SkillsContainer = styled(SectionContainer)``;

export default PdfTemplate;