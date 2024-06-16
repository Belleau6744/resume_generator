import { useState } from "react";
import styled from "styled-components";
import SelectTemplateButton from "../../SelectTemplateButton";
import { ResumeContainer } from "../../utilts";
import ContactSectionPreview from "./sections/ContactSectionPreview";
import EducationSectionPreview from "./sections/EducationSectionPreview";
import ExperienceSectionPreview from "./sections/ExperienceSectionPreview";
import LanguageSectionPreview from "./sections/LanguageSectionPreview";
import SkillsSectionPreview from "./sections/SkillsSectionPreview";

type LayoutPreviewProps = {
    setLayoutID: (newLayoutID: string) => void;
}

const PdfTemplate2Preview = ({ setLayoutID }: LayoutPreviewProps) => {
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
            {isHovered && <SelectTemplateButton onClick={() => setLayoutID('2')} />}
            <Header>
                <NameWrapper>
                    <div>John</div>
                    <div>Doe</div>
                </NameWrapper>
                <div style={{ fontSize: '0.7em', display: 'flex', justifyContent: 'flex-end', width: '100%' }} >Resume Creator</div>
            </Header>
            {/********************************** */}
            <BodyWrapper id='body-wrapper'>
                
                {/** CONTACT SECTION  */}
                <ContactSectionPreview />

                {/** LANGUAGE SECTION */}
                <LanguageSectionPreview />

                {/** SKILLS SECTION */}
                <SkillsSectionPreview />

                {/** EDUCATION SECTION */}
                <EducationSectionPreview />

                {/** EXPERIENCE SECTION */}
                <ExperienceSectionPreview />

            </BodyWrapper>
        </ResumeContainer>
    );
};

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

/**************** GENERAL INFO *************************/
const NameWrapper = styled.div`
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    font-weight: 700;
    font-size: 1em;
`;

export default PdfTemplate2Preview;