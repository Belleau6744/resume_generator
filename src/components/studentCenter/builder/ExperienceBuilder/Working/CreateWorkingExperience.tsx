import { Button, Checkbox, Dialog, DialogTitle, InputLabel, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Work_DayJs, WorkExperienceInputErrors, WorkingExperience } from "@types";
import dayjs from "dayjs";
import { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import '../../../../../assets/ModalStyling.css';
import { STRINGS_ENG } from '../../../../../assets/stringConstants';
import { getDefaultWorkingExperienceDayJs, getDefaultWorkingExperienceInputErrors } from '../../../../../utils/init';
import { checkEmptyInputs } from '../../../../../utils/validation';
import { useResumeContext } from '../../useResumeContext';
import { dayJsToWorkingExperience, workingExperienceToDayJs } from './utils';

type CreateWorkingExperienceProps = {
    isModalOpened: boolean;
    workingExperience: WorkingExperience;
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

const CreateWorkingExperience = ({ isModalOpened, setIsModalOpened, editingID, workingExperience }: CreateWorkingExperienceProps) => {
    const { setCurrentResume } = useResumeContext();
    const [ selectedWorkingExperience, setSelectedWorkingExperience ] = useState<Work_DayJs>(editingID ? workingExperienceToDayJs(workingExperience[editingID]) : getDefaultWorkingExperienceDayJs());
    const [ inputErrors, setInputErrors ] = useState<WorkExperienceInputErrors>(getDefaultWorkingExperienceInputErrors());

    const handleAddNewExperience = () => {
        const errorCheck = checkEmptyInputs(selectedWorkingExperience, getDefaultWorkingExperienceInputErrors());
        setInputErrors(errorCheck);
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
        }
        
    }

    const handleChangeStillWorking = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isStillWorking = (event.target.checked);
        setSelectedWorkingExperience(prev => {
            return ({
                ...prev,
                stillWorking: isStillWorking,
                endDate: isStillWorking ? null : (dayjs(new Date()))
            })
        })
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
        <Dialog open={isModalOpened}>
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>{STRINGS_ENG.adding.addNewWorkingExperience.toUpperCase()}</DialogTitle>

            <div style={{ padding: '0 40px 10px 40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Job Title */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Job Title'}</InputLabel>
                    <TextField
                    variant="outlined"
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
                    variant="outlined"
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
                                variant: 'outlined',
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
                                variant: 'outlined',
                                helperText: inputErrors.startDate ? 'Input a start date' : '',
                                error: inputErrors.endDate,
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
                    inputProps={{ style: { resize: "block" } }}
                    variant="outlined"
                    error={inputErrors.taskDescription}
                    sx={{ flex: '1', minWidth: '100px', textOverflow: 'ellipsis', overflow: 'auto', maxHeight: '300px' }}
                    label={'Task Description'}
                    type="text"
                    value={selectedWorkingExperience.taskDescription}
                    onChange={(e) => handleInputChange('taskDescription', e.target.value)}
                    />
                </InputWrapper>
                </div>
              
                
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={handleAddNewExperience}>Add Experience</Button>
                </div>
        </Dialog>
        </LocalizationProvider>
    )
}

export default CreateWorkingExperience;