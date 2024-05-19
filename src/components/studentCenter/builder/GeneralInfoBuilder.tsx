import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { ResumeType } from "../../../types/dbStructType";
import { GeneralInfoType } from "../../../types/resumeTypes";
import { capitalizeEveryWord } from "../../../utils/stringUtils";

type GeneralInfoProps = {
    content: GeneralInfoType;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
}

const GeneralInfoBuilder = ({ content }: GeneralInfoProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [originalValues, setOriginalValues] = useState<GeneralInfoType>(content);
    const [currentValues, setCurrentValues] = useState<GeneralInfoType>(content);

    // /**
    //  * Keeps track if there are changes in the form
    //  */
    const isDirty = Object.keys(originalValues).some((inputName) => originalValues[inputName] !== currentValues[inputName]);

    const handleInputChange = useCallback((inputName, value) => {
        const newCurrentValues = { ...currentValues };
        newCurrentValues[inputName] = value;
        setCurrentValues(newCurrentValues);
    }, [currentValues]);

    return (
        <Container>
            <SectionTitle>General Information</SectionTitle>
            <div>
                <form ref={formRef}>
                    {currentValues && Object.entries(currentValues).map((item, index) => {
                        const inputName = item[0];
                        return (
                            <InputWrapper key={index}>
                                <StyledLabel htmlFor={`${inputName}`}>{capitalizeEveryWord(inputName)}</StyledLabel>
                                {/* onChange={(e) => handleInputChange(item[0], e.target.value)}  */}
                                <StyledInput id={inputName} value={item[1].toString()} onChange={(e) => handleInputChange(item[0], e.target.value)} />
                            </InputWrapper>
                        )
                    })}
                </form>
                <button type="button" >TEST</button>
            </div>
        </Container>
    )
};

const SectionTitle = styled.h1`
    color: black;
`;

const StyledLabel = styled.label`
    margin-left: 8px;
    font-weight: 800;
`;

const StyledInput = styled.input`
    background: white;
    color: black;
    padding-left: 8px;
    height: 30px;
    border-radius: 8px;
    border: none;
    &::placeholder {
        color: gray;
    }
    &:focus {
        border: none;
        outline: 1px solid #3a9fbf;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    gap: 5px;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Container = styled.div``;

export default GeneralInfoBuilder;