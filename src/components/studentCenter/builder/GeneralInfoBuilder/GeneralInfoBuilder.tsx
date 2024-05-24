import { Alert, Button, InputLabel, TextField } from "@mui/material";
import { useCallback, useRef } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { GeneralInfoType } from "../../../../types/resumeTypes";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import LanguagePicker from "./LanguagePicker/LanguagePicker";

type GeneralInfoProps = {
    content: GeneralInfoType;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
    isDirty: boolean;
}

const GeneralInfoBuilder = ({ content, setCurrentResume, isDirty }: GeneralInfoProps) => {
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
            <SectionTitle>General Information</SectionTitle>
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
                                        value={item[1].toString()}
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
                    <Button type="button" size='large' color='success' variant='contained'>Save</Button>
                </BottomWrapper>
            </ContentWrapper>
        </Container>
    )
};

const ContentWrapper = styled.div`
    padding: 0 225px 0 55px;
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