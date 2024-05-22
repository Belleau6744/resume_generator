import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import { GeneralInfoType, LanguageKeys, LanguageType } from "../../../../../types/resumeTypes";
import { LangLevel, LangList } from "../../../../../utils/Languages";
import PickerModal from "./PickerModal";

type LanguagePickerProps = {
    languages: LanguageType;
    setCurrentValues: React.Dispatch<React.SetStateAction<GeneralInfoType>>
}

const LanguagePicker = ({ languages, setCurrentValues }: LanguagePickerProps) => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const handleAddNewLanguage = () => {
        setIsModalOpen(true);
    }

    /**
     * Remove the language from the list
     * @param langToRemove Key associated to language
     */
    const deleteSelectedLanguage = (langToRemove: LanguageKeys) => {
        setCurrentValues(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [langToRemove]: _, ...updatedLanguages } = prev.languages;
            return {
              ...prev,
              languages: updatedLanguages
            };
          });
    };
    
    return (
        <Container style={{ paddingBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <StyledLabel id={`${'languagesInput'}`}>Languages</StyledLabel>
                <AddLanguageButton type="button" onClick={handleAddNewLanguage}>+ Add</AddLanguageButton>
                <PickerModal currentLanguages={languages} setCurrentValues={setCurrentValues} isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>
            </div>
            <div style={{ marginLeft: '8px' }}>
                {Object.entries(languages).map((languageItem, index) => {
                    return (
                        <div style={{ display: 'flex', alignItems: 'end', gap: '8px'}} key={index}>
                            <LanguageContainer>
                                <KnownLanguage>{LangList[languageItem[0]]} :</KnownLanguage>
                                <LanguageLevel>{LangLevel[languageItem[1]]}</LanguageLevel>
                            </LanguageContainer>
                            <DeletedSelectedLanguageButton type='button' onClick={() => deleteSelectedLanguage(languageItem[0] as LanguageKeys)}><DeleteIcon/></DeletedSelectedLanguageButton>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

const DeletedSelectedLanguageButton = styled.button`
    background: none;
    margin: 0;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #c6c6c6
    }
`;

const KnownLanguage = styled.div`
    width: 100px;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const LanguageLevel = styled.div`
    width: 100px;
    font-weight: 500;
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