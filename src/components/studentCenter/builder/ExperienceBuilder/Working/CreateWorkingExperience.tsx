import { Button, Checkbox, InputLabel, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useState } from 'react';
import { Heading, Modal } from 'react-aria-components';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import '../../../../../assets/ModalStyling.css';
import { STRINGS_ENG } from '../../../../../assets/stringConstants';
import { ResumeType } from '../../../../../types/dbStructType';
import { Work_DayJs, WorkExperienceInputErrors, WorkingExperience } from '../../../../../types/resumeTypes';
import { defaultWorkingExperienceDayJs, defaultWorkingExperienceInputErrors } from '../../../../../utils/init';
import { checkEmptyInputs } from '../../../../../utils/validation';
import { dayJsToWorkingExperience, workingExperienceToDayJs } from './utils';

type CreateWorkingExperienceProps = {
    isModalOpened: boolean;
    workingExperience: WorkingExperience;
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

const CreateWorkingExperience = ({ isModalOpened, setIsModalOpened, setCurrentResume, editingID, workingExperience }: CreateWorkingExperienceProps) => {
    const [ selectedWorkingExperience, setSelectedWorkingExperience ] = useState<Work_DayJs>(editingID ? workingExperienceToDayJs(workingExperience[editingID]) : defaultWorkingExperienceDayJs);
    const [ inputErrors, setInputErrors ] = useState<WorkExperienceInputErrors>(defaultWorkingExperienceInputErrors);

    const handleAddNewExperience = () => {
        const errorCheck = checkEmptyInputs(selectedWorkingExperience, defaultWorkingExperienceInputErrors);
        if (Object.values(errorCheck).every(err => err === false)) {
            setCurrentResume(prev => {
                return ({
                    ...prev,
                    'content': {
                        ...prev.content,
                        'experience': {
                            ...prev.content.experience,
                            'workingExperience': {
                                ...prev.content.experience.workingExperience,
                                [editingID ?? uuidv4()]: dayJsToWorkingExperience(selectedWorkingExperience)
                            }
                        }
                    }
                })
            });
            setIsModalOpened(false);
        } else {
            setInputErrors(errorCheck);
        }
        
    }

    const handleChangeStillWorking = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isStillWorking = (event.target.checked);
        if (isStillWorking) {
            setSelectedWorkingExperience(prev => {
                return ({
                    ...prev,
                    stillWorking: isStillWorking,
                })
            })
        } else {
            setSelectedWorkingExperience(prev => {
                return ({
                    ...prev,
                    stillWorking: isStillWorking,
                    endDate: (dayjs(new Date()))
                })
            })
        }
    };

    const handleInputChange = (inputName: string, value: string | dayjs.Dayjs) => {
        setSelectedWorkingExperience(prev => {
            return ({
                ...prev,
                [inputName]: value
            })
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal style={{ background: 'white', padding: '25px' }} isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Heading slot="title">{STRINGS_ENG.adding.addNewWorkingExperience.toUpperCase()}</Heading>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Job Title */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Job Title'}</InputLabel>
                    <TextField
                    variant='filled'
                    error={inputErrors.jobTitle}
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Job Title'}
                    type="text"
                    value={selectedWorkingExperience.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    />
                </InputWrapper>

                {/* Organization Name */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Organization Name'}</InputLabel>
                    <TextField
                    variant='filled'
                    sx={{ flex: '1', minWidth: '100px' }}
                    error={inputErrors.organizationName}
                    label={'Organization Name'}
                    type="text"
                    value={selectedWorkingExperience.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    />
                </InputWrapper>

                {/* Start Date */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Start Date'}</InputLabel>
                    <DatePicker
                        autoFocus
                        value={selectedWorkingExperience.startDate} 
                        onChange={e => handleInputChange('startDate', e)} 
                        label={'Start Date'}
                        slotProps={{
                            textField: {
                                variant: 'filled',
                                helperText: inputErrors.startDate ? 'Input a start date' : '',
                                error: inputErrors.startDate,
                                sx:{ flex: '1', minWidth: '100px' }
                            },
                        }} 
                    />
                </InputWrapper>

                
                <InputWrapper>
                    {/* End Date */}
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'End Date'}</InputLabel>
                    <DatePicker 
                        value={selectedWorkingExperience.stillWorking === true ? '' : selectedWorkingExperience.endDate} 
                        onChange={e => handleInputChange('endDate', e)} 
                        label={selectedWorkingExperience.stillWorking === true ? 'Still Working' : 'End Date'}
                        disabled={selectedWorkingExperience.stillWorking === true}
                        slotProps={{
                            textField: {
                                variant: selectedWorkingExperience.stillWorking === true ? 'outlined' : 'filled',
                                helperText: inputErrors.startDate ? 'Input a start date' : '',
                                error: inputErrors.startDate,
                                sx:{ flex: '1', minWidth: '100px' }
                            },
                        }} 
                    />

                    {/* Still Working */}
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Still Working'}</InputLabel>
                    <Checkbox
                        checked={selectedWorkingExperience.stillWorking}
                        onChange={handleChangeStillWorking}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </InputWrapper>

                {/* Description */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Description'}</InputLabel>
                    <TextField
                    multiline
                    inputProps={{ style: { resize: "both" } }}
                    variant='filled'
                    error={inputErrors.taskDescription}
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Description'}
                    type="text"
                    value={selectedWorkingExperience.taskDescription}
                    onChange={(e) => handleInputChange('taskDescription', e.target.value)}
                    />
                </InputWrapper>
                </div>
              
                
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={handleAddNewExperience}>Add Experience</Button>
                </div>
        </Modal>
        </LocalizationProvider>
    )
}

export default CreateWorkingExperience;