import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { Button, Typography } from "@mui/material";
import { ResumeDefinition } from "@types";
import HelpIcon from "assets/Icons/HelpIcon";
import BackgroundComponent from 'components/Background';
import dayjs from "dayjs";
import { getDatabase, onValue, ref } from "firebase/database";
import { _ } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { saveResume } from "../../../firebase/db_actions";
import { Features } from "../../../redux/features";
import { getDateString } from "../../../utils/dateUtils";
import { getEmptyResumeInit } from "../../../utils/init";
import "../../style.css";
import CommentField from "./CommentField";
import EducationBuilder from "./EducationBuilder/EducationBuilder";
import ExperienceBuilder from "./ExperienceBuilder/ExperienceBuilder";
import GeneralInfoBuilder from "./GeneralInfoBuilder/GeneralInfoBuilder";
import HelpCenter from "./HelpCenter";
import { ResumeContext } from "./ResumeContext";
import SkillsBuilder from "./SkillsBuilder/SkillsBuilder";

const ResumeBuilder = () => {
    const { resumeID } = useParams();
    const userID = useSelector(Features.UserFeature.selector.getUserID);
    const [ isCommentSectionOpen, setIsCommentSectionOpen ] = useState<boolean>(false);

    /**
     * * Keeps track of the original resume, as a point of reference for updates, and the current version being updated
     */
    const [ originalResume, setOriginalResume ] = useState<ResumeDefinition>(getEmptyResumeInit());
    const [ currentResume, setCurrentResume ] = useState<ResumeDefinition>(getEmptyResumeInit());

    /**
     * FETCHING - Resume content
     */ 
    const db = getDatabase();
    const dbRef = ref(db, `content/resumes/${resumeID}`);
    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            const content = snapshot.val();
            if (content) {
                setOriginalResume(content);
                setCurrentResume(content);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * If form is dirty - Unsaved changes are present
     */
    const isDirty = useMemo(() => {
        return !(_.isEqual(currentResume, originalResume))
    }, [currentResume, originalResume]);

    const handleSaveResume = (): void => {
        if (userID && resumeID) {
            let newResume: ResumeDefinition;
            setCurrentResume(prev => {
                newResume = {
                    ...prev,
                    creationDate: getDateString(dayjs(new Date()))
                }
                setOriginalResume(newResume);
                return newResume;
            })
            saveResume(newResume, resumeID);
        }
    }

    /**
     * Different sections of the resume builder
     */
    const Sections = {
        'generalInfo': <GeneralInfoBuilder />,
        'education': <EducationBuilder />,
        'skills': <SkillsBuilder />,
        'experience': <ExperienceBuilder />,
        'help': <HelpCenter />
    };
    type SectionEditingType = keyof typeof Sections;
    const [ sectionEdit, setSectionEdit ] = useState<SectionEditingType>('generalInfo');

     /**
     * Toggles open or closed the comment section
     */
     const handleCommentSectionToggle = () => {
        setIsCommentSectionOpen(prev => !prev);
    }

    /**
     * Reset - Returns to the original resume state
     */
    const resetResume = () => {
        setCurrentResume(originalResume);
    }

    /**
     * Changes the section being currently edited
     */
    const handleSelect = useCallback((item: SectionEditingType) => () => setSectionEdit(item), [])

    return (
        <ResumeContext.Provider value={{
            isCommentSectionOpen,
            handleCommentSectionToggle,
            originalResume,
            currentResume,
            setCurrentResume,
            isDirty,
            handleSaveResume,
            sectionEdit,
            setSectionEdit,
            handleSelect,
            resetResume
          }}>
            <BackgroundComponent>
                <Container data-test-id={'resume-builder'}>
                    <SectionSelector>
                        <Typography color={"#34495E"} variant="overline">Sections</Typography>
                        <ItemSelect $selected={sectionEdit == 'generalInfo'} onClick={handleSelect('generalInfo')}><ManageAccountsIcon/>General</ItemSelect>
                        <ItemSelect $selected={sectionEdit == 'education'} onClick={handleSelect('education')}><SchoolIcon/>Education</ItemSelect>
                        <ItemSelect $selected={sectionEdit == 'skills'} onClick={handleSelect('skills')}><LightbulbIcon/>Skills</ItemSelect>
                        <ItemSelect $selected={sectionEdit == 'experience'} onClick={handleSelect('experience')}><WorkIcon/>Experience</ItemSelect>
                        <Button onClick={handleSelect('help')} sx={{ display: 'flex', alignItems: 'center', gap: '4px' }} variant="outlined" size="small" color="info"><HelpIcon width={15}  fill={'rgba(5, 138, 209, 0.79)'} height={15}/>Help</Button>
                    </SectionSelector>
                    <EditContent>
                        {Sections[sectionEdit]}
                    </EditContent>
                    <CommentField />
                </Container>
            </BackgroundComponent>
        </ResumeContext.Provider>
    )
};


const EditContent = styled.div`
    padding: 24px;
    z-index: 10;
    max-width: 100%;
    flex: 1;
    overflow: hidden;
    background: #FAFAFA;
    margin: 0 10px 10px 25px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const ItemSelect = styled.div<{ $selected: boolean }>`
    padding: 6px 60px 6px 20px;
    display: flex;
    align-items: center;
    color:#34495E;
    justify-content: flex-start;
    gap: 12px;
    font-size: 1.2em;
    font-weight: 800;
    border-radius: 5px;
    ${props => props.$selected && css`
        background: rgba(0, 96, 133, 0.8);
        color: white;
    `}
    &&:hover {
        cursor: pointer;
        background: #afafaf;
        border-radius: 5px;
        ${props => props.$selected && css`
            background: rgba(0, 96, 133, 0.6);
            color: white;
    `}
    }
`;

const SectionSelector = styled.div`
    display: flex;
    flex-direction: column;
    background: #FAFAFA;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    gap: 8px;
    z-index: 10;
`;

const Container = styled.div`
    padding: 24px;
    min-width: 700px;
    min-height: 100vh;
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
    z-index: 10;
`;


export default ResumeBuilder;