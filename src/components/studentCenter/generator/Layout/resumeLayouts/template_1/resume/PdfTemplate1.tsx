import { ResumeContentType } from "@types";
import styled from "styled-components";
import ContactInfoSection from "./sections/ContactInfoSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import LanguageSection from "./sections/LanguageSection/LanguageSection";
import SkillsSection from "./sections/SkillsSection";

const RoleTile = styled.div`
    color: #667085;
    display: flex;
    width: 100%; 
    justify-content: center;
    font-size: 1.5rem;
`;

const BodyWrapper = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 20px;
    border-top: 1px solid black;
    padding-top: 10px;
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
    flex: 1;
    /* background-color: green; */
`;

/**************** RIGHT INFO *************************/
const RightColumn = styled.div`
    flex: 2;
    height: 100%;
    /* background-color: red; */
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

const PdfTemplate1 = ({ resume }: { resume: ResumeContentType }) => {    

    // TODO Handle "no user ID"
    return (    
        <ResumeContainer id='resume-container' style={{ fontSize: '0.7rem' }}>
            <Header>
                <NameWrapper>
                    {resume?.generalInfo?.["first name"] && <div style={{ fontSize: '2.5rem' }}>{resume.generalInfo["first name"].toLocaleUpperCase()}</div>}
                    {resume?.generalInfo?.["last name"] && <div style={{ fontSize: '2.5rem' }}>{resume.generalInfo["last name"].toLocaleUpperCase()}</div>}
                </NameWrapper>
                {resume?.generalInfo?.["role title"] && <RoleTile>{resume.generalInfo["role title"].toLocaleUpperCase()}</RoleTile>}
            </Header>
            {/********************************** */}
            <BodyWrapper id='body-wrapper'>
                <LeftColumn id='left-column'>
                    {/* Contact Information Section */}
                    <ContactInfoSection
                        data-test-id='contact-section'
                        phoneNumber={resume?.generalInfo?.["phone number"]}
                        emailAddress={resume?.generalInfo?.["email address"]}
                        linkedIn={resume?.generalInfo?.["linkedin"]}
                    />

                    {/* Language Section */}
                    <LanguageSection data-test-id='language-section' languages={resume?.generalInfo?.languages}/>

                    {/* Education Section */}
                    <EducationSection data-test-id='education-section' education={resume?.education}/>                    

                    {/* Skills Section */}
                    <SkillsSection data-test-id='skills-section' skills={resume?.skills} />
                </LeftColumn>
                {/********************************** */}
                <RightColumn id='right-column'>
                    <ExperienceSection data-test-id='experience-section' experience={resume?.experience}/>
                </RightColumn>
            </BodyWrapper>
        </ResumeContainer>
    );
};

export default PdfTemplate1;