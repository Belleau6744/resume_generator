import { ResumeContentType } from "@types";
import styled from "styled-components";
import ContactSection from "./sections/ContactSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import LanguageSection from "./sections/LanguageSection/LanguageSection";
import SkillsSection from "./sections/SkillsSection";

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    margin-top: 20px;
    border-top: 1px solid black;
`;

const NameWrapper = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    line-height: 70px;
    font-size: 1.5em;
`;

const Header = styled.div`
    font-size: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
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

const RoleTile = styled.div`
    color: #667085;
    display: flex;
    width: 100%; 
    justify-content: flex-end;
    font-size: 1.5rem;
`;


const PdfTemplate2 = ({ resume }: { resume: ResumeContentType }) => {
    // TODO
    return(
        <ResumeContainer id='resume-container' style={{ fontSize: '0.7rem' }}>
            <Header>
                <NameWrapper>
                    {resume?.generalInfo?.["first name"] && <div style={{ fontSize: '2.5rem' }}>{(resume.generalInfo["first name"]).toLocaleUpperCase()}</div>}
                    {resume?.generalInfo?.["last name"] && <div style={{ fontSize: '2.5rem' }}>{(resume.generalInfo["last name"]).toLocaleUpperCase()}</div>}
                </NameWrapper>
                {resume?.generalInfo?.role_title && <RoleTile>{resume.generalInfo.role_title.toUpperCase()}</RoleTile>}
            </Header>
            <BodyWrapper>
                {/** CONTACT SECTION  */}
                <ContactSection phoneNumber={resume?.generalInfo?.["phone number"]} emailAddress={resume?.generalInfo?.["email address"]} linkedIn={resume?.generalInfo?.["linkedin"]} />

                {/** LANGUAGE SECTION */}
                <LanguageSection languages={resume?.generalInfo.languages} />

                {/** SKILLS SECTION */}
                <SkillsSection skills={resume?.skills} />

                {/** EDUCATION SECTION */}
                <EducationSection education={resume?.education} />

                {/** EXPERIENCE SECTION */}
                <ExperienceSection experience={resume?.experience}/>
            </BodyWrapper>
        </ResumeContainer>
    )
}

export default PdfTemplate2;