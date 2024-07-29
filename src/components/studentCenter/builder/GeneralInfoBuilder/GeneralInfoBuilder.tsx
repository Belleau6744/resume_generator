import RateReviewIcon from '@mui/icons-material/RateReview';
import { Alert, Button, InputLabel, TextField, Typography } from "@mui/material";
import { GeneralInfoType, LanguageType } from '@types';
import { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import { useResumeContext } from "../useResumeContext";
import LanguagePicker from "./LanguagePicker/LanguagePicker";

const sortGeneralInfo = (info: GeneralInfoType): [string, string][] => {
    const order = [
        'first name',
        'last name',
        'email address',
        'phone number',
        'role title',
        'linkedin',
        'languages',
        
    ];
    return order.map(key => [key, info[key]]);
};

const GeneralInfoBuilder = () => {
    const {
        isDirty,
        handleSaveResume,
        currentResume,
        setCurrentResume,
        handleCommentSectionToggle,
        resetResume
      } = useResumeContext();

    const content = useMemo(() => {
        return sortGeneralInfo(currentResume.content.generalInfo);
    }, [currentResume.content.generalInfo]);

    const languages = content.find(item => item[0] === 'languages')?.[1] as LanguageType;
    
    const formRef = useRef<HTMLFormElement>(null);

    const handleInputChangeGeneral = useCallback((inputName: string, value: string) => {
        setCurrentResume(prev => ({
            ...prev,
            ['content']: {
                ...prev.content,
                ['generalInfo']: {
                    ...prev.content.generalInfo,
                    [inputName]: value
                }
            }
        }));
    }, [setCurrentResume]);

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography fontWeight={700} variant='h2' color={"#34495E"}>General Information</Typography>
                <Button onClick={handleCommentSectionToggle} variant="contained" size="medium" color="warning" sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RateReviewIcon />
                    View Comments
                </Button>
            </div>
            <ContentWrapper>
                <form ref={formRef}>
                    <FormContainer>
                        {content && content.map((item, index) => {
                            const inputName = item[0];
                            if (inputName !== 'languages') {
                                return (
                                    <InputWrapper key={index}>
                                        <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{capitalizeEveryWord(inputName)}</InputLabel>
                                        <TextField
                                        variant='outlined'
                                        sx={{ flex: '1', minWidth: '100px' }}
                                        // label={capitalizeEveryWord(inputName)}
                                        type="text"
                                        value={item[1]?.toString()}
                                        onChange={(e) => handleInputChangeGeneral(item[0], e.target.value)}
                                        />
                                    </InputWrapper>
                                )
                            }
                            return <div key={index}></div>
                        })}
                            
                        <ColumnsContainer>
                            <LanguagePicker languages={languages} setCurrentResume={setCurrentResume}/>
                        </ColumnsContainer>
                    </FormContainer>
                </form>
                <BottomWrapper>
                    <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <Button disabled={!isDirty} size='large' color="charcoal" type="button" variant='outlined' onClick={resetResume}>Reset</Button>
                        <Button type="button" size='large' color='success' onClick={handleSaveResume} variant='contained'>Save</Button>
                    </div>
                </BottomWrapper>
            </ContentWrapper>
        </Container>
    )
};

const ContentWrapper = styled.div`
    padding: 20px 55px 0 55px;
    @media screen and (max-width: 992px) {
        padding: 0 125px 0 25px;
    }
`;

const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
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
    width: 100%;

`;

const ColumnsContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 4rem;
`;

const Container = styled.div``;

export default GeneralInfoBuilder;