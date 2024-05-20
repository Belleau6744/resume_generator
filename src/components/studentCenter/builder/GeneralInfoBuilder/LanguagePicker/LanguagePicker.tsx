import { useState } from "react";
import styled from "styled-components";
import { LanguageType } from "../../../../../types/resumeTypes";
import { LangLevel, LangList } from "../../../../../utils/Languages";
import PickerModal from "./PickerModal";

type LanguagePickerProps = {
    languages: LanguageType;
}

const LanguagePicker = ({ languages }: LanguagePickerProps) => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const mockLang: LanguageType = {
        'fra': '0',
        'eng': '3'
    }

    const handleAddNewLanguage = () => {
        setIsModalOpen(true);
    }
    
    return (
        <Container style={{ paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <StyledLabel id={`${'languagesInput'}`}>Languages</StyledLabel>
                <AddLanguageButton type="button" onClick={handleAddNewLanguage}>+ Add</AddLanguageButton>
                <PickerModal isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>
            </div>
            <div style={{ marginLeft: '8px' }}>
                {Object.entries(mockLang).map((languageItem, index) => {
                    return (
                        <LanguageContainer key={index}>
                            <KnownLanguage>{LangList[languageItem[0]]} :</KnownLanguage>
                            <LanguageLevel>{LangLevel[languageItem[1]]}</LanguageLevel>
                        </LanguageContainer>
                    )
                })}
            </div>
        </Container>
    )
}

const KnownLanguage = styled.div`
    width: 100px;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const LanguageLevel = styled.div`
    width: 100px;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
`;

const LanguageContainer = styled.div`
    display: flex;
    height: 40px;
    align-items: end;
    justify-content: space-between;
    border-bottom: 1px solid black;
`;

const Container = styled.div`
    width: 300px;
`;

const AddLanguageButton = styled.button`
    background: #2185d0;
    color: #FFFFFF;
    font-size: 0.8rem;
    border-radius: 5px;
    font-weight: 600;
    padding: 8px 10px;
`;

const StyledLabel = styled.label`
    margin-left: 8px;
    font-weight: 800;
`;

export default LanguagePicker;