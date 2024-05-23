import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { Features } from "../../../redux/features";
import { ResumesType, ResumeType } from "../../../types/dbStructType";
import { getEmptyResumeInit } from "../../../utils/init";
import EducationBuilder from "./EducationBuilder/EducationBuilder";
import ExperienceBuilder from "./ExperienceBuilder/ExperienceBuilder";
import GeneralInfoBuilder from "./GeneralInfoBuilder/GeneralInfoBuilder";
import SkillsBuilder from "./SkillsBuilder/SkillsBuilder";

const ResumeBuilder = () => {
    const { resumeID } = useParams();
    const userID = useSelector(Features.UserFeature.selector.getUserID);

    /**
     * * Keeps track of the original resume, as a point of reference for updates, and the current version being updated
     */
    const [ originalResume, setOriginalResume ] = useState<ResumeType>(getEmptyResumeInit(resumeID));
    const [ currentResume, setCurrentResume ] = useState<ResumeType>(getEmptyResumeInit(resumeID));  

    /**
     * FETCHING - Resume content
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `users/${userID}/resumes/`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            if (snapshot.val()) {
                const resumes: ResumesType = snapshot.val();
                const content = Object.values(resumes).find((currRes: ResumeType)  => currRes.id === resumeID)
                if(content) {
                    setOriginalResume(content);
                    setCurrentResume(content);
                }
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Different sections of the resume builder
     */
    const Sections = {
        'generalInfo': <GeneralInfoBuilder setCurrentResume={setCurrentResume} content={originalResume.content.generalInfo} />,
        'education': <EducationBuilder setCurrentResume={setCurrentResume} content={originalResume.content.education} />,
        'skills': <SkillsBuilder setCurrentResume={setCurrentResume} content={originalResume.content.skills} />,
        'experience': <ExperienceBuilder setCurrentResume={setCurrentResume} content={originalResume.content.experience} />,
    };
    type SectionEditingType = keyof typeof Sections;
    const [ sectionEdit, setSectionEdit ] = useState<SectionEditingType>('generalInfo');

    /**
     * Changes the section being currently edited
     */
    const handleSelect = useCallback((item: SectionEditingType) => () => setSectionEdit(item), [])

    return (
        <Container data-test-id={'resume-builder'}>
            <SectionSelector>
                <ItemSelect $selected={sectionEdit == 'generalInfo'} onClick={handleSelect('generalInfo')}>General Info</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'education'} onClick={handleSelect('education')}>Education</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'skills'} onClick={handleSelect('skills')}>Skills</ItemSelect>
                <ItemSelect $selected={sectionEdit == 'experience'} onClick={handleSelect('experience')}>Experience</ItemSelect>
            </SectionSelector>
            <EditContent>
                {Sections[sectionEdit]}
            </EditContent>
        </Container>
    )
};


const EditContent = styled.div`
    padding: 24px;
    flex: 1;
    background: #D2D2D2;
    width: 100%;
    margin: 0 10px 10px 25px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ItemSelect = styled.div<{ $selected: boolean }>`
    padding: 0 20px;
    font-size: 1.2em;
    font-weight: 800;
    ${props => props.$selected && css`
        background: rgba(0, 96, 133, 0.8);
        border-radius: 5px;
        color: white;
    `}
`;

const SectionSelector = styled.div`
    display: flex;
    flex-direction: column;
    background: #D2D2D2;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    gap: 8px;
`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    min-width: 700px;   
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;


export default ResumeBuilder;