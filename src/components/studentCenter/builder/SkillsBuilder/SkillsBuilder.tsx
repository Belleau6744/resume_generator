import RateReviewIcon from '@mui/icons-material/RateReview';
import { Alert, Button, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import { SkillsFlat, SkillsHierarchical } from "@types";
import { ChangeEvent, useMemo, useState } from "react";
import styled from "styled-components";
import { useResumeContext } from "../useResumeContext";
import SingleListSkills from "./SingleList/SingleList";
import { useConfirmation } from "./utils/skillsbuilder.hooks";
import { SkillsUtils } from "./utils/skillsbuilder.utils";
import LosingSectionsModal from "./WarningModal/LosingSectionsModal";
import WithSections from "./WithSections/WithSections";

const Container = styled.div``;
const SectionTitle = styled.h1`
    color: black;
`;

const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
`;

const SkillsBuilder = () => {
    const {
        isDirty,
        handleSaveResume,
        currentResume,
        setCurrentResume,
        handleCommentSectionToggle
    } = useResumeContext();

    const content = useMemo(() => {
        return currentResume.content.skills;
    }, [currentResume.content.skills]);

    const hasSections = useMemo(() => {
        if (content.hasSections === undefined) {
            return false;
        }
        return content.hasSections;
    }, [content.hasSections]);

    const { isModalOpen, requestConfirmation, handleUserResponse } = useConfirmation();

    const [ isExistingSectionOpen, setIsExistingSectionOpen ] = useState<boolean>(false);

    const handleToggleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            const currHasSections = event.target.value === 'true';
            const userConfirmed = currHasSections ? true : await requestConfirmation();
            if (userConfirmed) {
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <SectionTitle>Skills</SectionTitle>
                <Button onClick={handleCommentSectionToggle} variant="contained" size="medium" color="warning" sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RateReviewIcon />
                    View Comments
                </Button>
            </div>
            
            {/* Existing Section SnackBar */}
            <Snackbar
                open={isExistingSectionOpen}
                autoHideDuration={4000}
                onClose={() => setIsExistingSectionOpen(false)}>
                <Alert
                    onClose={() => setIsExistingSectionOpen(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                This section already exist
              </Alert>
                </Snackbar>
            
            {/* Has sections controls */}
            <FormControl>
                <div style={{ padding: '0 10px', borderBottom: '1px solid black' }}>{'How would you like to organize your skills'}</div>
                <RadioGroup
                    value={hasSections}
                    onChange={handleToggleChange}
                    aria-labelledby="language-level-select"
                    aria-required
                    sx={{ margin: '20px 0' }}
                    defaultValue={''}
                    name="language-level-select"
                >
                    <FormControlLabel value={true} control={<Radio />} label={'Group in sections'} />
                    <FormControlLabel value={false} control={<Radio />} label={'Single list'} />
                </RadioGroup>
            </FormControl>

            {/** Content */}
            <div>
                {
                    hasSections === true ? 
                        (<WithSections setIsExistingSectionOpen={setIsExistingSectionOpen} setCurrentResume={setCurrentResume} content={content.content as SkillsHierarchical} />) 
                        : (<SingleListSkills setCurrentResume={setCurrentResume} content={content.content as SkillsFlat} />)
                }
                
            </div>
            <BottomWrapper>
                <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                <Button type="button" size='large' color='success' variant='contained' onClick={handleSaveResume}>Save</Button>
            </BottomWrapper>
        </Container>
    );
}

export default SkillsBuilder;