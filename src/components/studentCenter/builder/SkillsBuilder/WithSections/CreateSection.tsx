import { Button, InputLabel, TextField } from '@mui/material';
import { Dialog, Heading, Modal } from 'react-aria-components';
import styled from 'styled-components';
import '../../../../../assets/ModalStyling.css';
import { ResumeType } from '../../../../../types/dbStructType';

import { useState } from 'react';
import '../../../../../assets/ModalStyling.css';
import { SkillsHierarchical } from '../../../../../types/resumeTypes';

type CreateSectionModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
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

const CreateSection = ({ isModalOpened, setIsModalOpened, setCurrentResume, setTabValue }: CreateSectionModalProps) => {
    const [newSection, setNewSection] = useState<string>('');

    const handleAddNewSection = () => {
        let newIndex = 0;
        setCurrentResume(prev => {
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
        });
        setTabValue(newIndex);
        setIsModalOpened(false);
    }

    return (
        <Modal isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Dialog style={{ padding: '25px', background: 'white', display: 'flex', flexDirection: 'column' }}>
                <Heading slot="title">Create a new section</Heading>
                <InputWrapper>
                    <InputLabel sx={{ width: '50px', whiteSpace: 'unset', fontWeight: '700' }}>{'Title'}</InputLabel>
                    <TextField
                    variant='filled'
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Section'}
                    type="text"
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    />
                </InputWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={handleAddNewSection}>Create Section</Button>
                </div>
            </Dialog>
        </Modal>
    )
}

export default CreateSection;