import { InputLabel, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Education_DayJs, EducationInputErrors, EducationList, ResumeType } from "@types";
import dayjs from "dayjs";
import { useState } from "react";
import { Heading, Modal } from "react-aria-components";
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
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
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
        <Modal style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Container $error={!Object.values(error).every(err => err === false)}>
                <Heading style={{ fontWeight: '800' }} slot="title">Degree information</Heading>
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
                                        variant: 'filled',
                                        helperText: error[item[0]] ? STRINGS_ENG.education_input_errors[item[0]] : '',
                                        error: error[item[0]],
                                        sx:{ flex: '1', minWidth: '100px' }
                                       },
                                }} />
                            ): (
                                <TextField
                                    variant='filled'
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
                </FormContainer>
                <ButtonWrapper>
                    <StyledCancelButton type='button' onClick={() => setIsModalOpened(false)} >Cancel</StyledCancelButton>
                    <StyledAddButton type='button' onClick={handleSaveNewEducation}>Add</StyledAddButton>
                </ButtonWrapper>  
                {/* {error ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', height: '30px', width:'270px', paddingTop: '5px', gap: '8px'}}>
                        <div><ErrorIcon/></div>
                        <div style={{ color: 'black', fontWeight: '600'}}>{error}</div>
                    </div>
                ): (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'baseling', height: '30px', width: '270px', paddingTop: '5px'}}></div>
                )}               */}
            </Container>
        </Modal>
        </LocalizationProvider>
    )
};

const StyledCancelButton = styled.button`
    background: #FFFFFF;
    color: black;
    font-size: 0.8rem;
    border: 1px solid black;
    border-radius: 5px;
    width: 80px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
`;

const StyledAddButton = styled.button`
    background: #2185d0;
    color: #FFFFFF;
    font-size: 0.8rem;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-weight: 600;
    padding: 8px 0;
`;

const ButtonWrapper = styled.div`
    display: flex;
    padding: 30px 50px 0 50px;
    justify-content: space-between;
`;

const Container = styled.div<{ $error: boolean }>`
    background: white;
    outline: ${props => props.$error && '2px solid red'}; 
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 80vw;
    height: fit-content;
    padding: 40px;
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
    width: 100%;

`;

export default EducationPickerModal;