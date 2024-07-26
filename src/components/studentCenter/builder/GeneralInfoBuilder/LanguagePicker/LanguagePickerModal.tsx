import { Button, Dialog, DialogTitle } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LanguageKeys, LanguageLevelKeys, LanguageType, ResumeDefinition } from "@types";
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import ErrorIcon from '../../../../../assets/Icons/ErrorIcon';
import { LangLevel, LangList } from '../../../../../utils/Languages';
import './ModalStyling.css';

type PickerModalProps = {
    isModalOpened: boolean;
    currentLanguages: LanguageType;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
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
        <Dialog fullWidth open={isModalOpened}>
            
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>Select a language</DialogTitle>
            <div style={{ padding: '0 40px 10px 40px', display: 'flex', flexDirection: 'column' }}>
                <FormControl variant='outlined'>  
                    <InputLabel id="language-select">Language</InputLabel>
                        <Select
                            labelId="language-select"
                            id="language-select"
                            variant='outlined'
                            defaultValue=''
                            required
                            sx={{ marginBottom: '8px', color: "#34495E" }}
                            value={availableLanguages.includes(selectedLanguage) ? selectedLanguage : ''}
                            placeholder='select a language'
                            label="Language"
                            onChange={handleChangeLanguage}
                        >
                        {availableLanguages.map((item, index) => {
                            if (Object.keys(currentLanguages).includes(item)) {
                                return <div key={index}></div>
                            } else {
                                return (
                                    <MenuItem key={index} sx={{ color: "#34495E" }} value={item}>{LangList[item]}</MenuItem>
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
                            <FormControlLabel sx={{ color:'#34495E'}} key={index} value={item} control={<Radio />} label={LangLevel[item]} />
                        )
                    })}
                    </RadioGroup>
                </FormControl>            
                <ButtonWrapper>
                    <Button type='button' variant='outlined' size="large" color="charcoal" onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button type='button' variant="contained" size="large" color="primary" onClick={handleSaveNewLanguage}>Add language</Button>
                </ButtonWrapper>  
                {error ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', height: '30px', width:'270px', paddingTop: '5px', gap: '8px'}}>
                        <div><ErrorIcon/></div>
                        <div style={{ color: 'black', fontWeight: '600'}}>{error}</div>
                    </div>
                ): (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'baseling', height: '30px', width: '270px', paddingTop: '5px'}}></div>
                )}     
            </div>         
        </Dialog>
    )
}

const ButtonWrapper = styled.div`
    display: flex;
    padding-top: 20px;
    justify-content: space-between;
`;

export default LanguagePickerModal;