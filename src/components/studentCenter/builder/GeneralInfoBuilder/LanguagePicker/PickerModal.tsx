import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { Heading, Modal, } from 'react-aria-components';
import styled from 'styled-components';
import { LangLevel, LangList } from '../../../../../utils/Languages';
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerModal = ({ isModalOpened, setIsModalOpened }: PickerModalProps) => {
    const [ selectedLanguage, setSelectedLanguage ] = useState('');
    const [ selectedLevel, setSelectedLevel] = useState('');
    const [ error, setError ] = useState('');

    const handleChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setSelectedLevel((event.target as HTMLInputElement).value);
    };

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setError('');
        setSelectedLanguage(event.target.value as string);
    };

    const handleSaveNewLanguage = () => {
        if (selectedLanguage === '') {
            setError('You need to select a language');
        } else if (selectedLevel === '') {
            setError('You need to set your proficiency level');
        } else {
            setError('');
            // TODO
        }
    }
    
    return (
        
        <Modal isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Container>
                <Heading slot="title">Select a Language</Heading>
                
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <FormControl variant="standard" >  
                        <InputLabel id="language-select">Language</InputLabel>
                            <Select
                            labelId="language-select"
                            id="language-select"
                            required
                            sx={{ marginBottom: '8px' }}
                            value={selectedLanguage}
                            placeholder='select a language'
                            label="Age"
                            onChange={handleChangeLanguage}
                            >
                                {Object.keys(LangList).map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>{LangList[item]}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>  
                        <FormControl>  
                            <RadioGroup
                                value={selectedLevel}
                                onChange={handleChangeLevel}
                                aria-labelledby="language-level-select"
                                aria-required
                                name="language-level-select"
                            >
                                {Object.keys(LangLevel).map((item, index) => {
                                    return (
                                        <FormControlLabel key={index} value={LangLevel[item]} control={<Radio />} label={LangLevel[item]} />
                                    )
                                })}
                            </RadioGroup>
                            
                    </FormControl>  
                    </div>              
                
                <ButtonWrapper>
                    <StyledCancelButton type='button' onClick={() => setIsModalOpened(false)} >Cancel</StyledCancelButton>
                    <StyledAddButton type='button' onClick={handleSaveNewLanguage}>Add</StyledAddButton>
                </ButtonWrapper>                
                {error && (
                    <div style={{ display: 'flex', paddingTop: '10px'}}>
                        <div style={{ color: 'red', fontWeight: '700'}}>*</div>
                        <div style={{ color: 'black', fontWeight: '600'}}>{error}</div>
                    </div>
                )}
            </Container>
        </Modal>
    )
}

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
    padding-top: 10px;
    justify-content: space-between;
`;

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    min-width: fit-content;
    width: 100%;
    height: fit-content;
    padding: 35px;
`;

export default PickerModal;