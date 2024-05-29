import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { Skills } from "../../../../types/resumeTypes";
import CreateSkill from "./SingleList/CreateSkill";
import SingleListSkills from "./SingleList/SingleList";
import { useConfirmation } from "./utils/skillsbuilder.hooks";
import { SkillsUtils } from "./utils/skillsbuilder.utils";
import LosingSectionsModal from "./WarningModal/LosingSectionsModal";
import CreateSection from "./WithSections/CreateSection";
import WithSections from "./WithSections/WithSections";

type SkillsBuilderProps = {
    content: Skills;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SkillsBuilder({ content, setCurrentResume }: SkillsBuilderProps) {
    const [isSkillModalOpened, setIsSkillModalOpened] = useState<boolean>(false);
    const [isSectionModalOpened, setIsSectionModalOpened] = useState<boolean>(false);

    const hasSections = useMemo(() => {
        if (content.hasSections === undefined) {
            return false;
        }
        return content.hasSections;
    }, [content.hasSections]);

    const { isModalOpen, requestConfirmation, handleUserResponse } = useConfirmation();

    useEffect(() => {
        console.log('SECTIONS: ', hasSections);
    }, [hasSections]);

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
                                hasSections: false, // TODO
                                content: content.hasSections === true ? SkillsUtils.transformToFlat(content.content) : {}
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
            <CreateSkill  isModalOpened={isSkillModalOpened} setIsModalOpened={setIsSkillModalOpened}/>
            <CreateSection isModalOpened={isSectionModalOpened} setIsModalOpened={setIsSectionModalOpened} />

            <SectionTitle>Skills</SectionTitle>

            {/* Has sections controls */}
            <FormControl>
                <FormLabel>How would you like to organize your skills</FormLabel>
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
                {content.hasSections === true && (<Button variant='contained' onClick={() => setIsSectionModalOpened(true)} sx={{ marginTop: '20px' }} >Add New section</Button>)}
            </div>

            <div>
                {content.content && 
                    (
                        content.hasSections === true ? 
                            (<WithSections content={content.content} />) 
                            : (<SingleListSkills content={content.content} />)
                    )
                }
            </div>
        </Container>
    );
}

export default SkillsBuilder;