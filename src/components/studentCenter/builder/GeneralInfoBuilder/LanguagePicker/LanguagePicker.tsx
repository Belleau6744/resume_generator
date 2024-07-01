import { Button, IconButton, InputLabel, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { LanguageKeys, LanguageType, ResumeDefinition } from "@types";
import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import { LangLevel, LangList } from "../../../../../utils/Languages";
import PickerModal from "./LanguagePickerModal";

type LanguagePickerProps = {
    languages: LanguageType;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const LanguagePicker = ({ languages, setCurrentResume }: LanguagePickerProps) => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const handleAddNewLanguage = () => {
        setIsModalOpen(true);
    }

    /**
     * Remove the language from the list
     * @param langToRemove Key associated to language
     */
    const deleteSelectedLanguage = (langToRemove: LanguageKeys) => {
        setCurrentResume(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [langToRemove]: _, ...updatedLanguages } = prev.content.generalInfo.languages;
            return ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    ['generalInfo']: {
                        ...prev.content.generalInfo,
                        ['languages']: {...updatedLanguages}
                    }
                }
            })
        });
    };
    
    return (
        <Container>
            <PickerModal currentLanguages={languages} setCurrentResume={setCurrentResume} isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>
            <Table aria-label="simple table">
                <TableHead sx={{ background: '#BEBEBE' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '800' }}>Language</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">Proficiency</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">
                            <Button type="button" size='small' variant='contained' color='primary' onClick={handleAddNewLanguage}>
                                + Add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                    {languages && Object.keys(languages).length > 0 && (
                        <TableBody>
                        {Object.entries(languages).map((languageItem) => (
                                <TableRow
                                    key={LangList[languageItem[0]]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{LangList[languageItem[0]]}</TableCell>
                                    <TableCell align="right">{LangLevel[languageItem[1]]}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedLanguage(languageItem[0] as LanguageKeys)}>
                                            <DeleteIcon width={23} height={23} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
            </Table>
            {languages && Object.keys(languages).length === 0 && <InputLabel style={{ color: 'gray', flex: '1', whiteSpace: 'unset', paddingTop: '10px', paddingLeft: '10px' }}>Start by adding the languages you know. Click "Add" to begin.</InputLabel>}
        </Container>
    )
}

const Container = styled.div`
    flex: 1;
    padding-bottom: 20px;
`;

export default LanguagePicker;