import { useRef, useState } from "react";
import styled from "styled-components";
import { GeneralInfoType } from "../../../types/resumeTypes";

type GeneralInfoProps = {
    content: GeneralInfoType;
}
// { content }: GeneralInfoProps
const GeneralInfo = () => {     
    const formRef = useRef<HTMLFormElement>(null);
    const [ originalValues, setOriginalValues ] = useState<any>({});
    const [ currentValues, setCurrentValues ] = useState<any>({});

    return (
        <Container>
            <SectionTitle>General Information</SectionTitle>
            <div>
                <form ref={formRef}>
                    {currentValues && Object.entries(currentValues).map((item) => {
                        return (
                            <InputWrapper>
                                <StyledLabel htmlFor={`${item[0]}`}>{item[0]}</StyledLabel>
                                <StyledInput value={item[1].toString()} onChange={(e) => handleInputChange(item[0], e.target.value)} />
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

export default GeneralInfo;