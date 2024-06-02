import { Button, InputLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { Heading, Modal } from 'react-aria-components';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import '../../../../../assets/ModalStyling.css';
import { STRINGS_ENG } from '../../../../../assets/stringConstants';
import { ResumeType } from "../../../../../types/dbStructType";
import { Project, ProjectExperience, ProjectExperienceInputErrors } from "../../../../../types/resumeTypes";
import { defaultProjectExperience, defaultProjectExperienceInputErrors } from '../../../../../utils/init';
import { checkEmptyInputs } from '../../../../../utils/validation';

type CreateProjectExperienceProps = {
    isModalOpened: boolean;
    projectExperience: ProjectExperience;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
    editingID?: string;
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


const CreateProjectExperience = ({ isModalOpened, setIsModalOpened, setCurrentResume, editingID, projectExperience }: CreateProjectExperienceProps) => {
    const [ selectedProjectExperience, setSelectedProjectExperience ] = useState<Project>(editingID ? projectExperience[editingID] : defaultProjectExperience);
    const [ inputErrors, setInputErrors ] = useState<ProjectExperienceInputErrors>(defaultProjectExperienceInputErrors);

    const addNewProjectExperience = () => {
        const errorCheck = checkEmptyInputs(selectedProjectExperience, defaultProjectExperienceInputErrors);
        if (Object.values(errorCheck).every(err => err === false)) {
            setCurrentResume(prev => {
                return ({
                    ...prev,
                    'content': {
                        ...prev.content,
                        'experience': {
                            ...prev.content.experience,
                            'projectExperience': {
                                ...prev.content.experience.projectExperience,
                                [editingID ?? uuidv4()]: selectedProjectExperience
                            }
                        }
    
                    }
                })
            })
            setIsModalOpened(false);
        } else {
            setInputErrors(errorCheck);
        }
    }

    const handleInputChange = (inputName: string, value: string) => {
        setSelectedProjectExperience(prev => {
            return ({
                ...prev,
                [inputName]: value
            })
        })
    }

    return (
        <Modal style={{ background: 'white', padding: '25px' }} isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Heading slot="title">{STRINGS_ENG.adding.addNewProjectExperience.toUpperCase()}</Heading>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Title */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Job Title'}</InputLabel>
                    <TextField
                    variant='filled'
                    error={inputErrors.title}
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Title'}
                    type="text"
                    value={selectedProjectExperience.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                </InputWrapper>

                {/* Description */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Organization Name'}</InputLabel>
                    <TextField
                    variant='filled'
                    sx={{ flex: '1', minWidth: '100px' }}
                    error={inputErrors.description}
                    label={'Organization Name'}
                    type="text"
                    value={selectedProjectExperience.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </InputWrapper>
                </div>
              
                
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={addNewProjectExperience}>Add Experience</Button>
                </div>
        </Modal>
    )
}

export default CreateProjectExperience;