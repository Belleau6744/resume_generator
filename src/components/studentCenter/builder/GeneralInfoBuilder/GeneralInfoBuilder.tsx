import RateReviewIcon from '@mui/icons-material/RateReview';
import { Alert, Button, InputLabel, TextField } from "@mui/material";
import { useCallback, useMemo, useRef } from "react";
import styled from "styled-components";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import { useResumeContext } from "../useResumeContext";
import LanguagePicker from "./LanguagePicker/LanguagePicker";

const GeneralInfoBuilder = () => {
    const {
        isDirty,
        handleSaveResume,
        currentResume,
        setCurrentResume,
        handleCommentSectionToggle,
      } = useResumeContext();

    const content = useMemo(() => {
        return currentResume.content.generalInfo;
    }, [currentResume.content.generalInfo]);
    
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
                <SectionTitle>General Information</SectionTitle>
                <Button onClick={handleCommentSectionToggle} variant="contained" size="medium" color="warning" sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RateReviewIcon />
                    View Comments
                </Button>
            </div>
            <ContentWrapper>
                <form ref={formRef}>
                    <FormContainer>
                        {content && Object.entries(content).map((item, index) => {
                            const inputName = item[0];
                            if (inputName !== 'languages') {
                                return (
                                    <InputWrapper key={index}>
                                        <InputLabel sx={{ width: '100px', whiteSpace: 'unset', fontWeight: '700' }}>{capitalizeEveryWord(inputName)}</InputLabel>
                                        <TextField
                                        variant='filled'
                                        sx={{ flex: '1', minWidth: '100px' }}
                                        // label={capitalizeEveryWord(inputName)}
                                        type="text"
                                        value={content[item[0]]?.toString()}
                                        onChange={(e) => handleInputChangeGeneral(item[0], e.target.value)}
                                        />
                                    </InputWrapper>
                                )
                            }
                            return <div key={index}></div>
                        })}
                            
                        <ColumnsContainer>
                            <LanguagePicker languages={content['languages']} setCurrentResume={setCurrentResume}/>
                        </ColumnsContainer>
                    </FormContainer>
                </form>
                <BottomWrapper>
                    <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                    <Button type="button" size='large' color='success' onClick={handleSaveResume} variant='contained'>Save</Button>
                </BottomWrapper>
            </ContentWrapper>
        </Container>
    )
};

const ContentWrapper = styled.div`
    padding: 0 55px 0 55px;
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

const SectionTitle = styled.h1`
    color: black;
`;

const Container = styled.div``;

export default GeneralInfoBuilder;