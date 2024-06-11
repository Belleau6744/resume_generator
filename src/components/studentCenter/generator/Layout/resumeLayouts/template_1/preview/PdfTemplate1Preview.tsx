import { useState } from "react";
import styled from "styled-components";
import SelectTemplateButton from "../../SelectTemplateButton";
import { ResumeContainer } from "../../utilts";
import ContactInfoSectionPreview from "./sections/ContactInfoSectionPreview";
import EducationSectionPreview from "./sections/EducationSection";
import ExperienceSectionPreview from "./sections/ExperienceSection/ExperienceSectionPreview";
import LanguageSectionPreview from "./sections/LanguageSection/LanguageSectionPreview";
import SkillsSectionPreview from "./sections/SkillsSection";

type LayoutPreviewProps = {
    setLayoutID: (newLayoutID: string) => void;
}

const PdfTemplate1Preview = ({ setLayoutID }: LayoutPreviewProps) => {    
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };  

    // TODO Handle "no user ID"
    return (    
        <ResumeContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id='resume-container' style={{ fontSize: '0.7rem' }}>
            {isHovered && <SelectTemplateButton onClick={() => setLayoutID('1')} />}
            <Header>
                <NameWrapper>
                    <div>John</div>
                    <div>Doe</div>
                </NameWrapper>
                <div style={{ fontSize: '0.7em' }} >Resume Creator</div>
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
    margin-top: 10px;    
`;

const Header = styled.div`
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid black;
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

/**************** GENERAL INFO *************************/
const NameWrapper = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1em;
`;

export default PdfTemplate1Preview;