import { Button, Dialog, DialogTitle, InputLabel, TextField } from '@mui/material';
import { Project, ProjectExperience, ProjectExperienceInputErrors } from "@types";
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import '../../../../../assets/ModalStyling.css';
import { STRINGS_ENG } from '../../../../../assets/stringConstants';
import { getDefaultProjectExperience, getDefaultProjectExperienceInputErrors } from '../../../../../utils/init';
import { checkEmptyInputs } from '../../../../../utils/validation';
import { useResumeContext } from '../../useResumeContext';

type CreateProjectExperienceProps = {
    isModalOpened: boolean;
    projectExperience: ProjectExperience;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
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


const CreateProjectExperience = ({ isModalOpened, setIsModalOpened, editingID, projectExperience }: CreateProjectExperienceProps) => {
    const { setCurrentResume } = useResumeContext();
    const [ selectedProjectExperience, setSelectedProjectExperience ] = useState<Project>(editingID ? projectExperience[editingID] : getDefaultProjectExperience());
    const [ inputErrors, setInputErrors ] = useState<ProjectExperienceInputErrors>(getDefaultProjectExperienceInputErrors());

    const addNewProjectExperience = () => {
        const errorCheck = checkEmptyInputs(selectedProjectExperience, getDefaultProjectExperienceInputErrors());
        if (Object.values(errorCheck).every(err => err === false)) {
            setCurrentResume(prev => {
                return ({
                    ...prev,
                    'content': {
                        ...prev?.content,
                        'experience': {
                            ...prev?.content?.experience,
                            'projectExperience': {
                                ...prev?.content?.experience?.projectExperience,
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
        <Dialog open={isModalOpened}>
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>{STRINGS_ENG.adding.addNewProjectExperience.toUpperCase()}</DialogTitle>

            <div style={{ padding: '0 40px 10px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Title */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Project Title'}</InputLabel>
                    <TextField
                    variant='outlined'
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
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Project Description'}</InputLabel>
                    <TextField
                    variant='outlined'
                    sx={{ flex: '1', minWidth: '100px' }}
                    error={inputErrors.description}
                    label={'Description'}
                    type="text"
                    value={selectedProjectExperience.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </InputWrapper>
                </div>
              
                
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={addNewProjectExperience}>Add Experience</Button>
                </div>
        </Dialog>
    )
}

export default CreateProjectExperience;