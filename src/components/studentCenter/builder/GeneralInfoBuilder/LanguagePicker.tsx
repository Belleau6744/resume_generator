import styled from "styled-components";
import { LanguageType } from "../../../../types/resumeTypes";

type LanguagePickerProps = {
    languages: LanguageType;
}

const LanguagePicker = ({ languages }: LanguagePickerProps) => {
    const mockLang: LanguageType = {
        'fra': '0',
        'eng': '3'
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <StyledLabel id={`${'languagesInput'}`}>Languages</StyledLabel>
                <AddLanguageButton>+ Add Language</AddLanguageButton>
            </div>
            {Object.entries(mockLang).map((languageItem) => {
                return (
                    <div>{languageItem[0]}{languageItem[1]}</div>
                )
            })}
        </div>
    )
}

const AddLanguageButton = styled.button`
    background: #2185d0;
    color: #FFFFFF;
    font-size: 0.8rem;
    font-weight: 600;
    padding: 7px 20px;
`;

const StyledLabel = styled.label`
    margin-left: 8px;
    font-weight: 800;
`;

export default LanguagePicker;