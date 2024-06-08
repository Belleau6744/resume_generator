import styled from "styled-components";
import { Skeleton } from "@mui/material";
import ContactInfoSectionPreview from "./sections/ContactInfoSectionPreview";
import ExperienceSectionPreview from "./sections/ExperienceSection/ExperienceSectionPreview";
import EducationSectionPreview from "./sections/EducationSection";
import LanguageSectionPreview from "./sections/LanguageSection/LanguageSectionPreview";
import SkillsSectionPreview from "./sections/SkillsSection";

const PdfTemplate1Preview = () => {    

    // TODO Handle "no user ID"
    return (    
        <ResumeContainer id='resume-container' style={{ fontSize: '0.7rem' }}>
            <Header>
                <NameWrapper>
                    <Skeleton variant="rectangular" width={210} height={60} />
                    <Skeleton variant="rectangular" width={210} height={60} />
                </NameWrapper>
                <Skeleton variant="rectangular" width={210} height={60} />
            </Header>
            {/********************************** */}
            <BodyWrapper id='body-wrapper'>
                <LeftColumn id='left-column'>
                    {/* Contact Information Section */}
                    <ContactInfoSectionPreview />

                    {/* Language Section */}
                    <LanguageSectionPreview data-test-id='language-section' />

                    {/* Education Section */}
                    <EducationSectionPreview data-test-id='education-section' />                    

                    {/* Skills Section */}
                    <SkillsSectionPreview data-test-id='skills-section' />
                </LeftColumn>
                {/********************************** */}
                <RightColumn id='right-column'>
                    <ExperienceSectionPreview data-test-id='experience-section' />
                </RightColumn>
            </BodyWrapper>
        </ResumeContainer>
    );
};

const BodyWrapper = styled.div`
    display: flex;
    width: 100%;
    flex: 1;
    margin-top: 20px;
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
    font-size: 1.5em;
`;

export default PdfTemplate1Preview;