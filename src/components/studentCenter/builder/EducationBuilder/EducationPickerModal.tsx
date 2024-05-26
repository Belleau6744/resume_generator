import { InputLabel, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import { useState } from "react";
import { Heading, Modal } from "react-aria-components";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import ErrorIcon from "../../../../assets/Icons/ErrorIcon";
import { ResumeType } from "../../../../types/dbStructType";
import { Education, Education_DayJs, EducationList } from "../../../../types/resumeTypes";
import { getDateString } from "../../../../utils/dateUtils";
import { defaultEducationDayjs } from "../../../../utils/init";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import { educationIDExist } from "../../../../utils/validation";
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    content: EducationList;
    educationID: string;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
}

const Examples = {
    'degree': "Bachelor | Master's | PhD | DEC ...",
    "field of study": "Computer Science | Business | Nursing ...",
    "school name": "Enter the full name",
    "school address": "Establishment number, street name, province | state, country",
    "start date": "month - yearh",
    "end date": "Expected or graduated"
}

const educationToDayjs = (curr: Education): Education_DayJs => {
    return {
        ...curr,
        ["end date"]: curr["end date"] ? dayjs(curr["end date"]) : null, 
        ["start date"]: curr["start date"] ? dayjs(curr["start date"]): null
    }
}

const dayjsToEducation = (curr: Education_DayJs): Education => {
    return {
        ...curr,
        ["end date"]: curr["end date"] ? getDateString(curr["end date"]) : '',
        ["start date"]: curr["start date"] ? getDateString(curr["start date"]) : ''
    }
}

const EducationPickerModal = ({ isModalOpened, setIsModalOpened, setCurrentResume, content, educationID}: PickerModalProps) => {
    const [selectedEducation, setSelectedEducation] = useState<Education_DayJs>(
        (educationID && educationIDExist(content, educationID)) ? 
        educationToDayjs(content[educationID]) :
        defaultEducationDayjs);
        
    const [error, setError] = useState('');

    const handleSaveNewEducation = () => {
        // console.log(checkInputEmptyEducation(selectedEducation));
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
            <Container $error={error !== ''}>
                <Heading style={{ fontWeight: '800' }} slot="title">Degree information</Heading>
                <FormContainer >
                    {Object.entries(selectedEducation).map((item => {
                        return (
                            <InputWrapper key={item[0]}>
                                <div>
                                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{capitalizeEveryWord(item[0])}</InputLabel>
                                    {item[0] === 'end date' && (<InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontSize: '10px' ,fontWeight: '500' }}>{'Expected or graduated'}</InputLabel>)}
                                </div>
                            {item[0] === 'start date' || item[0] === 'end date' ? (
                                <DatePicker sx={{ background: 'rgba(0, 0, 0, 0.06)' ,minWidth: '100px', flex:'1' }} value={item[1]} onChange={prev => handleInputChange(item[0], prev)} label={'"month" and "year"'} views={['month', 'year']} />
                            ): (
                                <TextField
                                    variant='filled'
                                    placeholder={Examples[item[0]]}
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
                {error ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', height: '30px', width:'270px', paddingTop: '5px', gap: '8px'}}>
                        <div><ErrorIcon/></div>
                        <div style={{ color: 'black', fontWeight: '600'}}>{error}</div>
                    </div>
                ): (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'baseling', height: '30px', width: '270px', paddingTop: '5px'}}></div>
                )}              
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
    padding-bottom: 0;
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