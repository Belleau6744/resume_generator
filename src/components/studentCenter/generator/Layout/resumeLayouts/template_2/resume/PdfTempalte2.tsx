import { ResumeFormType } from "@types";
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
    justify-content: center;
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

type Props = {
    resume: ResumeFormType;
}

const PdfTemplate2 = ({ resume }: Props) => {
    // TODO
    return(
        <ResumeContainer id='resume-container' style={{ fontSize: '0.7rem' }}>
            <Header>
                <NameWrapper>
                <div>{resume?.generalInfo?.["first name"]}</div>
                    <div style={{ display: 'flex' }}><div></div><div>{resume?.generalInfo?.["last name"]}</div></div>
                </NameWrapper>
                <div style={{ fontSize: '0.7em', display: 'flex', justifyContent: 'flex-end', width: '100%' }} >{resume?.generalInfo?.role_title && <div style={{ color: '#667085' }}>{resume?.generalInfo?.role_title}</div>}</div>
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
                <ExperienceSection />
            </BodyWrapper>
        </ResumeContainer>
    )
}

export default PdfTemplate2;