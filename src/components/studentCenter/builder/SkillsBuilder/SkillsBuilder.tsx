import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { Skills, SkillsFlat, SkillsHierarchical } from "../../../../types/resumeTypes";
import SingleListSkills from "./SingleList/SingleList";
import { useConfirmation } from "./utils/skillsbuilder.hooks";
import { SkillsUtils } from "./utils/skillsbuilder.utils";
import LosingSectionsModal from "./WarningModal/LosingSectionsModal";
import WithSections from "./WithSections/WithSections";

type SkillsBuilderProps = {
    content: Skills;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
}

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SkillsBuilder({ content, setCurrentResume }: SkillsBuilderProps) {

    const hasSections = useMemo(() => {
        if (content.hasSections === undefined) {
            return false;
        }
        return content.hasSections;
    }, [content.hasSections]);

    const { isModalOpen, requestConfirmation, handleUserResponse } = useConfirmation();

    const handleToggleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const userConfirmed = await requestConfirmation();
            if (userConfirmed) {
                const currHasSections = event.target.value === 'true';
                if (currHasSections) {
                    setCurrentResume(prev => ({
                        ...prev,
                        ['content']: {
                            ...prev.content,
                            ['skills']: {
                                hasSections: true, // TODO
                                content: content.hasSections === false ? SkillsUtils.transformToHierarchical(content.content) : {}
                            }
                        }
                    }));
                } else {
                    setCurrentResume(prev => ({
                        ...prev,
                        ['content']: {
                            ...prev.content,
                            ['skills']: {
                                hasSections: false,
                                content: content.hasSections === true ? SkillsUtils.transformToFlat(content.content) : []
                            }
                        }
                    }));
                }
            }
        } catch {
            // User cancelled the confirmation
        }
    };

    return (
        <Container>
            {/* Modals Section */}
            <LosingSectionsModal setUserResponse={handleUserResponse} isModalOpened={isModalOpen} setIsModalOpened={() => { } } />
            <SectionTitle>Skills</SectionTitle>
            
            {/* Has sections controls */}
            <FormControl>
                <h4 style={{ borderBottom: '1px solid black' }}>{'How would you like to organize your skills'}</h4>
                <RadioGroup
                    value={hasSections}
                    onChange={handleToggleChange}
                    aria-labelledby="language-level-select"
                    aria-required
                    defaultValue={''}
                    name="language-level-select"
                >
                    <FormControlLabel value={true} control={<Radio />} label={'Group in sections'} />
                    <FormControlLabel value={false} control={<Radio />} label={'Single list'} />
                </RadioGroup>
            </FormControl>

            <div>
                {
                    hasSections === true ? 
                        (<WithSections setCurrentResume={setCurrentResume} content={content.content as SkillsHierarchical} />) 
                        : (<SingleListSkills setCurrentResume={setCurrentResume} content={content.content as SkillsFlat} />)
                }
                
            </div>
        </Container>
    );
}

export default SkillsBuilder;