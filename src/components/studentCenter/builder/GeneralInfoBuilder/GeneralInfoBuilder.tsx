import { Alert, Button, InputLabel, TextField } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../../types/dbStructType";
import { GeneralInfoType } from "../../../../types/resumeTypes";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import LanguagePicker from "./LanguagePicker/LanguagePicker";

type GeneralInfoProps = {
    content: GeneralInfoType;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
}

const GeneralInfoBuilder = ({ content }: GeneralInfoProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [originalValues, setOriginalValues] = useState<GeneralInfoType>(content);
    const [currentValues, setCurrentValues] = useState<GeneralInfoType>(content);

    /**
     * Update original values when DB updates
     */
    useEffect(() => {
        setOriginalValues(content);
    }, [content]);

    /**
     * If form is dirty - Unsaved changes are present
     */
    const isDirty = !(_.isEqual(currentValues, originalValues));

    const handleInputChange = useCallback((inputName, value) => {
        const newCurrentValues = { ...currentValues };
        newCurrentValues[inputName] = value;
        setCurrentValues(newCurrentValues);
    }, [currentValues]);

    return (
        <Container>
            <SectionTitle>General Information</SectionTitle>
            <ContentWrapper>
                <form ref={formRef}>
                    <FormContainer>
                        {currentValues && Object.entries(currentValues).map((item, index) => {
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
                                        onChange={(e) => handleInputChange(item[0], e.target.value)}
                                        />
                                    </InputWrapper>
                                )
                            }
                            return <div key={index}></div>
                        })}
                            
                        <ColumnsContainer>
                            <LanguagePicker languages={currentValues['languages']} setCurrentValues={setCurrentValues}/>
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