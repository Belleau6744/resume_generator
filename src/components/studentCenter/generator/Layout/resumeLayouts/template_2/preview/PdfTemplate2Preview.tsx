import { Skeleton } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import EmailIcon from "../../../../../../../assets/Icons/EmailIcon";
import LinkedInIcon from "../../../../../../../assets/Icons/LinkedInIcon";
import LocationIcon from "../../../../../../../assets/Icons/LocationIcon";
import PhoneIcon from "../../../../../../../assets/Icons/PhoneIcon";
import SelectTemplateButton from "../../SelectTemplateButton";
import { ResumeContainer } from "../../utilts";

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

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
                <ContactSectionPreview>
                    <ItemContainer><PhoneIcon width={15} height={15} /><Skeleton variant="rectangular" width={50} height={8} /></ItemContainer>
                    <ItemContainer><LocationIcon width={15} height={15} /><Skeleton variant="rectangular" width={50} height={8} /></ItemContainer>
                    <ItemContainer><EmailIcon width={15} height={15} /><Skeleton variant="rectangular" width={50} height={8} /></ItemContainer>
                    <ItemContainer><LinkedInIcon width={15} height={15} /><Skeleton variant="rectangular" width={50} height={8} /></ItemContainer>
                </ContactSectionPreview>

                {/** SKILLS SECTION */}
                <SkillsSectionPreview>
                    <SectionTitle>Skills</SectionTitle>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                        <div style={{ display: 'display', flexDirection: 'column' }}>
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                        </div>
                        <div style={{ display: 'display' }}>
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                            <Skeleton width={30} height={10} animation={false} />
                        </div>
                    </div>
                </SkillsSectionPreview>

                {/** SKILLS SECTION */}
                <ExperienceSectionPreview>
                    <SectionTitle>Experience</SectionTitle>
                    <h1>TODO</h1>
                </ExperienceSectionPreview>
            </BodyWrapper>
        </ResumeContainer>
    );
};

const ExperienceSectionPreview = styled.div`    
    padding-top: 8px;
`;

const SkillsSectionPreview = styled.div`
    padding-top: 8px;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
const ContactSectionPreview = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    height: fit-content;
    gap: 12px;
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid black;
`;

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