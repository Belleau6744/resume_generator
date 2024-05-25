import { InputLabel, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from "react";
import { Heading, Modal } from "react-aria-components";
import styled from "styled-components";
import ErrorIcon from "../../../../assets/Icons/ErrorIcon";
import { ResumeType } from "../../../../types/dbStructType";
import { Education } from "../../../../types/resumeTypes";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    currentEducation: Education;
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

const EducationPickerModal = ({ isModalOpened, setIsModalOpened, setCurrentResume, currentEducation }: PickerModalProps) => {
    const [error, setError] = useState('');

    const handleSaveNewEducation = () => {
        // TODO
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Modal style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Container $error={error !== ''}>
                <Heading style={{ fontWeight: '800' }} slot="title">Degree information</Heading>
                <FormContainer >
                    {Object.entries(currentEducation).map((item => {
                        return (
                            <InputWrapper key={item[0]}>
                                <div>
                                    <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{capitalizeEveryWord(item[0])}</InputLabel>
                                    {item[0] === 'end date' && (<InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontSize: '10px' ,fontWeight: '500' }}>{'Expected or graduated'}</InputLabel>)}
                                </div>
                            {item[0] === 'start date' || item[0] === 'end date' ? (
                                <DatePicker sx={{ background: 'rgba(0, 0, 0, 0.06)', minWidth: '100px', flex:'1' }} label={'"month" and "year"'} views={['month', 'year']} />
                            ): (
                                <TextField
                                    variant='filled'
                                    placeholder={Examples[item[0]]}
                                    sx={{ flex: '1', minWidth: '100px' }}
                                    type="text"
                                    value={item[1].toString()}
                                    // onChange={(e) => handle(item[0], e.target.value)}
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