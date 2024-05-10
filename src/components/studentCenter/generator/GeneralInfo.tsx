import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { writeNewPost } from "../../../firebase_setup/db_actions";
import { MockCVContent } from "../../../utils/MockData";

const GeneralInfo = () => {     
    const formRef = useRef<HTMLFormElement>(null);

    // Record<string, string>
    const [ originalValues, setOriginalValues ] = useState(MockCVContent['ABC'].resumes['0'].content.generalInfo);
    const [ currentValues ] = useState(MockCVContent['ABC'].resumes['0'].content.generalInfo);


    /**
     * Keeps track if there are changes in the form
     */
    const isDirty = Object.keys(originalValues).some(
        (fieldName) => originalValues[fieldName] !== currentValues[fieldName]
    );

    console.log(isDirty);

    // TODO cleanup
    // const generatePDF = () => {
    //     if (!formRef.current) return;
    
    //     const formData = new FormData(formRef.current);
    //     const pdf = new jsPDF('portrait', 'mm', 'a4');
    //     let yPos = 10;
    
    //     formData.forEach((value, key) => {
    //         console.log(value);
    //         pdf.text("HELLO", 20, yPos);
    //         yPos += 10;
    //     });
    
    //     pdf.save('resume.pdf');
    // }

    /** INPUT CONTROLE start */
  const handleInputChange = (field: string, value: string) => {
    const newCurrentValues = { ...currentValues };
    // Check if the new value is empty
    if (value === '') {
      newCurrentValues[field] = '';
    } else {
      newCurrentValues[field] = value;
    }
    // TODO verify need
    // if(!isOpenUnsaved) {
    //   setCurrentValues(newCurrentValues); 
    // }
  };
//   writeNewPost

    const handleSaving = useCallback(() => {
        writeNewPost(currentValues, `/students/${0}/0/`).then(() => {
            setOriginalValues({...currentValues});
    });
  }, [currentValues]);

    return (
        <Container>
            <SectionTitle>General Information</SectionTitle>
            <div>
                <form ref={formRef}>
                    {Object.entries(currentValues).map((item) => {
                        return (
                            <InputWrapper>
                                <StyledLabel htmlFor={`${item[0]}`}>{item[0]}</StyledLabel>
                                <StyledInput value={item[1].toString()} onChange={(e) => handleInputChange(item[0], e.target.value)} />
                            </InputWrapper>
                        )
                    })}
                </form>
                <button type="button" onClick={handleSaving}>TEST</button>
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