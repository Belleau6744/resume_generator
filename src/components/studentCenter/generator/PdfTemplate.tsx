import { Button } from "@mui/material";
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DownloadIcon from "../../../assets/Icons/DownloadIcon";
import { ResumeFormType } from "../../../types/resumeTypes";
import ContactInfoSection from "./sections/ContactInfoSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection/ExperienceSection";
import LanguageSection from "./sections/LanguageSection/LanguageSection";

type PdfTemplateProps = {
    userID: string;
}

const PdfTemplate = ({ userID }: PdfTemplateProps) => {    
    const [ currentResume , setCurrentResume ] = useState<ResumeFormType>();
    const { resumeID } = useParams();

    const db = getDatabase();
    const dbRef = ref(db, `users/${userID}/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            setCurrentResume(snapshot.val().content);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(currentResume);

    // TODO Handle "no user ID"
    return (
        <PageContainer style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Heading>
                <Title>Here is a preview of your resume</Title>
                <Button variant='contained' color='primary' endIcon={<DownloadIcon />}>Download PDF</Button>
            </Heading>

            <ResumeContainer style={{ fontSize: '0.7rem' }}>
                <Header>
                    <NameWrapper>
                        <div>{currentResume?.generalInfo?.["first name"]}</div>
                        <div>{currentResume?.generalInfo?.["last name"]}</div>
                    </NameWrapper>
                    {currentResume?.generalInfo?.role_title && <div style={{ color: '#667085' }}>{currentResume?.generalInfo?.role_title}</div>}
                </Header>
                {/********************************** */}
                <BodyWrapper>
                    <LeftColumn>
                        {/* Contact Information Section */}
                        <ContactInfoSection 
                            phoneNumber={currentResume?.generalInfo?.["phone number"]}
                            emailAddress={currentResume?.generalInfo?.["email address"]}
                            linkedIn={currentResume?.generalInfo?.["linkedin"]}
                        />

                        {/* Language Section */}
                        <LanguageSection languages={currentResume?.generalInfo?.languages}/>

                        {/* Education Section */}
                        <EducationSection education={currentResume?.education}/>                    
                        <SkillsContainer>
                            {currentResume?.skills && Object.values(currentResume?.skills).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div>{item?.title}</div>
                                        <div>{item?.description}</div>
                                    </div>
                                )
                            })}
                        </SkillsContainer>
                    </LeftColumn>
                    {/********************************** */}
                    <RightColumn>
                        <ExperienceSection experience={currentResume?.experience}/>
                    </RightColumn>
                </BodyWrapper>
            </ResumeContainer>
        </PageContainer>
    );
};

const Title = styled.h1`
    
`;

const Heading = styled.div`
    background: white;
    margin: 20px 0 80px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
    justify-content: center;
    width: 100%;
    height: fit-content;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`
const PageContainer = styled.div`
`

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

const ResumeContainer = styled.div`
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