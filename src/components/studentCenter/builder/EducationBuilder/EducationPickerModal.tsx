import { Button, Dialog, DialogTitle, InputLabel, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Education_DayJs, EducationInputErrors, EducationList, ResumeDefinition } from "@types";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import { STRINGS_ENG } from "../../../../assets/stringConstants";
import { getDefaultEducationDayjs, getDefaultEducationInputErrors } from "../../../../utils/init";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import { checkEmptyInputs, educationIDExist } from "../../../../utils/validation";
import './ModalStyling.css';
import { dayjsToEducation, educationToDayjs } from "./utils";

type PickerModalProps = {
    isModalOpened: boolean;
    content: EducationList;
    educationID: string;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const EducationPickerModal = ({ isModalOpened, setIsModalOpened, setCurrentResume, content, educationID}: PickerModalProps) => {
    const [selectedEducation, setSelectedEducation] = useState<Education_DayJs>(
        (educationID && educationIDExist(content, educationID)) ? 
        educationToDayjs(content[educationID]) :
        getDefaultEducationDayjs());
        
    const [error, setError] = useState<EducationInputErrors>({
        'degree': false,
        'field of study': false,
        'school name': false,
        'school address': false,
        'start date':false,
        'end date': false,
    });

    const handleSaveNewEducation = () => {
        const errorCheck = checkEmptyInputs(selectedEducation, getDefaultEducationInputErrors());
        if (Object.values(errorCheck).every(err => err === false)) {
            setCurrentResume(prev => ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    ['education']: {
                        ...prev.content.education,
                        [educationID ?? uuidv4()]: dayjsToEducation(selectedEducation)
                    }
                }
            }));
            setIsModalOpened(false);
        } else {
            setError(errorCheck);
        }
    }

    const handleInputChange = (inputName: string, value: string | dayjs.Dayjs) => {
        setSelectedEducation(prev => ({
            ...prev,
            [inputName]: value
        }))
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog fullWidth open={isModalOpened}>
            <DialogTitle color="#34495E" sx={{ borderBottom: "1px solid #ced2d3", fontWeight: 800 }}>Degree information</DialogTitle>
                <FormContainer >
                    {Object.entries(selectedEducation).map((item => {
                        return (
                            <InputWrapper key={item[0]}>
                                <div>
                                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{capitalizeEveryWord(item[0])}</InputLabel>
                                    {item[0] === 'end date' && (<InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontSize: 'ww' ,fontWeight: '500' }}>{'Expected or graduated'}</InputLabel>)}
                                </div>
                            {item[0] === 'start date' || item[0] === 'end date' ? (
                                <DatePicker value={item[1]} onChange={prev => handleInputChange(item[0], prev)} label={'"month" and "year"'} views={['month', 'year']} slotProps={{
                                    textField: {
                                        variant: 'outlined',
                                        helperText: error[item[0]] ? STRINGS_ENG.education_input_errors[item[0]] : '',
                                        error: error[item[0]],
                                        sx:{ flex: '1', minWidth: '100px' }
                                       },
                                }} />
                            ): (
                                <TextField
                                    variant='outlined'
                                    helperText={error[item[0]] ? STRINGS_ENG.education_input_errors[item[0]] : ''}
                                    error={error[item[0]]}
                                    placeholder={STRINGS_ENG.education_input_examples[item[0]]}
                                    sx={{ flex: '1', minWidth: '100px' }}
                                    type="text"
                                    value={item[1].toString()}
                                    onChange={(e) => handleInputChange(item[0], e.target.value)}
                                />
                            )}
                        </InputWrapper>
                        )
                    }))}
                    <ButtonWrapper>
                        <Button color="charcoal" variant="outlined" size="medium" type='button' onClick={() => setIsModalOpened(false)} >Cancel</Button>
                        <Button color="primary" variant="contained" size="medium" type='button' onClick={handleSaveNewEducation}>Add</Button>
                    </ButtonWrapper>  
                </FormContainer>
                
        </Dialog>
        </LocalizationProvider>
    )
};

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

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

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 40px;

`;

export default EducationPickerModal;