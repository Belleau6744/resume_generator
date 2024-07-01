import { Button, Checkbox, InputLabel, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Volunteering_DaysJs, VolunteeringExperience, VolunteeringInputErrors } from "@types";
import dayjs from 'dayjs';
import { useState } from 'react';
import { Heading, Modal } from 'react-aria-components';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import '../../../../../assets/ModalStyling.css';
import { STRINGS_ENG } from '../../../../../assets/stringConstants';
import { getDefaultVolunteeringExperienceDayJs, getDefaultVolunteeringExperienceInputErrors } from '../../../../../utils/init';
import { checkEmptyInputs } from '../../../../../utils/validation';
import { useResumeContext } from '../../useResumeContext';
import { dayJsToVolunteeringExperience, volunteeringExperienceToDayJs } from './utils';


type CreateVolunteeringExperienceProps = {
    isModalOpened: boolean;
    volunteeringExperience: VolunteeringExperience;
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


const CreateVolunteeringExperience = ({ isModalOpened, setIsModalOpened, editingID, volunteeringExperience }: CreateVolunteeringExperienceProps) => {
    const { setCurrentResume } = useResumeContext();
    const [ selectedVolunteeringExperience, setSelectedVolunteeringExperience ] = useState<Volunteering_DaysJs>(editingID ? volunteeringExperienceToDayJs(volunteeringExperience[editingID]) : getDefaultVolunteeringExperienceDayJs());
    const [ inputErrors, setInputErrors ] = useState<VolunteeringInputErrors>(getDefaultVolunteeringExperienceInputErrors());

    const addNewProjectExperience = () => {
        const errorCheck = checkEmptyInputs(selectedVolunteeringExperience, getDefaultVolunteeringExperienceInputErrors());
        if (Object.values(errorCheck).every(err => err === false)) {
            setCurrentResume(prev => {
                return ({
                    ...prev,
                    'content': {
                        ...prev.content,
                        'experience': {
                            ...prev.content.experience,
                            'volunteerExperience': {
                                ...prev.content.experience.volunteerExperience,
                                [editingID ?? uuidv4()]: dayJsToVolunteeringExperience(selectedVolunteeringExperience)
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

    const handleInputChange = (inputName: string, value: string | dayjs.Dayjs) => {
        setSelectedVolunteeringExperience(prev => {
            return ({
                ...prev,
                [inputName]: value,
            })
        })
    }

    const handleChangeStillWorking = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isStillWorking = (event.target.checked);
        if (isStillWorking === true) {
            setSelectedVolunteeringExperience(prev => {
                return ({
                    ...prev,
                    stillWorking: true,
                })
            })
        } else {
            setSelectedVolunteeringExperience(prev => {
                return ({
                    ...prev,
                    stillWorking: false,
                    endDate: (dayjs(new Date()))
                })
            })
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal style={{ background: 'white', padding: '25px' }} isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Heading slot="title">{STRINGS_ENG.adding.addNewProjectExperience.toUpperCase()}</Heading>

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
                    value={selectedVolunteeringExperience.jobTitle}
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
                    value={selectedVolunteeringExperience.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    />
                </InputWrapper>

                {/* Start Date */}
                <InputWrapper>
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Start Date'}</InputLabel>
                    <DatePicker
                        autoFocus
                        value={selectedVolunteeringExperience.startDate} 
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
                        value={selectedVolunteeringExperience.stillWorking === true ? '' : selectedVolunteeringExperience.endDate} 
                        onChange={e => handleInputChange('endDate', e)} 
                        label={selectedVolunteeringExperience.stillWorking === true ? 'Still Working' : 'End Date'}
                        disabled={selectedVolunteeringExperience.stillWorking === true}
                        slotProps={{
                            textField: {
                                variant: selectedVolunteeringExperience.stillWorking === true ? 'outlined' : 'filled',
                                helperText: inputErrors.startDate ? 'Input a start date' : '',
                                error: inputErrors.endDate,
                                sx:{ flex: '1', minWidth: '100px' }
                            },
                        }} 
                    />

                    {/* Still Working */}
                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{'Still Working'}</InputLabel>
                    <Checkbox
                        checked={selectedVolunteeringExperience.stillWorking}
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
                    error={inputErrors.description}
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Description'}
                    type="text"
                    value={selectedVolunteeringExperience.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                </InputWrapper>
                </div>
              
                
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={addNewProjectExperience}>Add Experience</Button>
                </div>
        </Modal>
        </LocalizationProvider>
    )
}

export default CreateVolunteeringExperience;