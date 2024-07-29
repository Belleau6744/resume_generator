import { Button, Dialog, DialogTitle, InputLabel, TextField } from '@mui/material';
import { ResumeDefinition } from "@types";
import styled from 'styled-components';
import '../../../../../assets/ModalStyling.css';

import { SkillsHierarchical } from "@types";
import { useState } from 'react';
import '../../../../../assets/ModalStyling.css';

type CreateSectionModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeDefinition>>;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
    setIsExistingSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 45px;
    width: 100%;
    @media screen and (max-width: 992px) {
        gap: 10px;
    }
`;

const CreateSection = ({ setIsExistingSectionOpen, isModalOpened, setIsModalOpened, setCurrentResume, setTabValue }: CreateSectionModalProps) => {
    const [newSection, setNewSection] = useState<string>('');

    const handleAddNewSection = () => {
        let newIndex = 0;
        setCurrentResume(prev => {
            if (Object.keys(prev.content.skills.content).every(item => item.toLocaleUpperCase() !== newSection.toLocaleUpperCase())) {
                newIndex = Object.keys(prev.content.skills.content).length;
                return ({
                    ...prev,
                    content: {
                        ...prev.content,
                        skills: {
                            hasSections: true,
                            content: {
                                ...(prev.content.skills.content as SkillsHierarchical),
                                [newSection.toUpperCase()]: []
                            }
                        }

                    }
                })
            } else {
                setIsExistingSectionOpen(true);
                return prev;
            }
        });
        setTabValue(newIndex);
        setIsModalOpened(false);
    }

    return (
        <Dialog open={isModalOpened}>
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>Create a new section</DialogTitle>
            <div style={{ padding: "10px 60px 30px 60px" }}>
            <InputWrapper>
                <InputLabel sx={{ whiteSpace: 'unset', fontWeight: '700' }}>{'Title'}</InputLabel>
                <TextField
                variant='outlined'
                sx={{ flex: '1', minWidth: '200px' }}
                label={'Section'}
                type="text"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                />
            </InputWrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "30px", width: '100%' }}>
                <Button variant='outlined' color="charcoal" onClick={() => setIsModalOpened(false)}>Cancel</Button>
                <Button variant='contained' color='info' onClick={handleAddNewSection} disabled={newSection === ''}>Create Section</Button>
            </div>
            </div>
        </Dialog>
        
    )
}

export default CreateSection;