import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useMemo, useState } from 'react';
import { Heading, Modal, } from 'react-aria-components';
import styled from 'styled-components';
import ErrorIcon from '../../../../../assets/Icons/ErrorIcon';
import { ResumeType } from '../../../../../types/dbStructType';
import { LanguageKeys, LanguageLevelKeys, LanguageType } from '../../../../../types/resumeTypes';
import { LangLevel, LangList } from '../../../../../utils/Languages';
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    currentLanguages: LanguageType;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
}

const LanguagePickerModal = ({ isModalOpened, setIsModalOpened, setCurrentResume, currentLanguages }: PickerModalProps) => {
    const [ selectedLanguage, setSelectedLanguage ] = useState<LanguageKeys | ''>('');
    const [ selectedLevel, setSelectedLevel] = useState<LanguageLevelKeys | ''>('');
    const [ error, setError ] = useState<string>('');
    const noLanguageSelected = 'No language selected';
    const noProficiencySelected = 'No proficiency selected';

    /**
     * Resets all the inputs to their default value
     */
    const resetInputs = () => {
        setSelectedLanguage('');
        setSelectedLevel('');
        setError('');
    }

    /**
     * Resets inputs on modal opening 
     */
    useEffect(() => {
        if (isModalOpened) {
            resetInputs();
        }
    }, [isModalOpened]);

    const handleChangeLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setSelectedLevel((event.target as HTMLInputElement).value as LanguageLevelKeys);
    };

    const handleChangeLanguage = (event: SelectChangeEvent) => {
        setError('');
        setSelectedLanguage(event.target.value as LanguageKeys);
    };

    const handleSaveNewLanguage = () => {
        if (selectedLanguage === '') {
            setError(noLanguageSelected);
        } else if (selectedLevel === '') {
            setError(noProficiencySelected);
        } else {
            setCurrentResume(prev => ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    ['generalInfo']: {
                        ...prev.content.generalInfo,
                        ['languages']: {
                            ...prev.content.generalInfo.languages,
                            [selectedLanguage]: selectedLevel
                        }
                    }
                }
            }));
            setIsModalOpened(false);
            resetInputs();
        }
    }

    const availableLanguages = useMemo(() => {
        if (LangList && currentLanguages) {
            return Object.keys(LangList).filter((lang) => !Object.keys(currentLanguages).includes(lang));
        } else {
            return []
        }
      }, [currentLanguages]);
    
    return (
        <Modal isDismissable={false} isOpen={isModalOpened} onOpenChange={setIsModalOpened}>
            <Container $error={error !== ''}>
                <Heading slot="title">Select a Language</Heading>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                    <FormControl variant="standard" >  
                        <InputLabel id="language-select">Language</InputLabel>
                            <Select
                            labelId="language-select"
                            id="language-select"
                            defaultValue=''
                            required
                            sx={{ marginBottom: '8px' }}
                            value={availableLanguages.includes(selectedLanguage) ? selectedLanguage : ''}
                            placeholder='select a language'
                            label="Age"
                            onChange={handleChangeLanguage}
                            >
                                {availableLanguages.map((item, index) => {
                                    if (Object.keys(currentLanguages).includes(item)) {
                                        return <div key={index}></div>
                                    } else {
                                        return (
                                            <MenuItem key={index} value={item}>{LangList[item]}</MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                        </FormControl>  
                        <FormControl>  
                            <RadioGroup
                                value={selectedLevel}
                                onChange={handleChangeLevel}
                                aria-labelledby="language-level-select"
                                aria-required
                                defaultValue={''}
                                name="language-level-select"
                            >
                                {Object.keys(LangLevel).map((item, index) => {
                                    return (
                                        <FormControlLabel key={index} value={item} control={<Radio />} label={LangLevel[item]} />
                                    )
                                })}
                            </RadioGroup>
                    </FormControl>  
                    </div>              
                <ButtonWrapper>
                    <StyledCancelButton type='button' onClick={() => setIsModalOpened(false)} >Cancel</StyledCancelButton>
                    <StyledAddButton type='button' onClick={handleSaveNewLanguage}>Add</StyledAddButton>
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

const Container = styled.div<{ $error: boolean }>`
    background: white;
    outline: ${props => props.$error && '2px solid red'}; 
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    min-width: fit-content;
    width: 100%;
    height: fit-content;
    padding: 35px;
    padding-bottom: 0;
`;

export default LanguagePickerModal;