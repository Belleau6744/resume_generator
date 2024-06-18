import { Alert, Button, IconButton, InputLabel, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { EducationList, ResumeDefinition } from "@types";
import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../assets/Icons/EditIcon";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import EducationPickerModal from "./EducationPickerModal";

type EducationBuilderProps = {
    content: EducationList;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
    isDirty: boolean;
    handleSaveResume: () => void;
}

const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EducationBuilder = ({ content, setCurrentResume, isDirty, handleSaveResume }: EducationBuilderProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingID, setEditinID] = useState<string | undefined>(undefined);

    const handleAddNewEducation = () => {
        setEditinID(undefined);
        setIsModalOpen(true);
    }

    const editSelectedEducation = (id: string) => {
        setEditinID(id);
        setIsModalOpen(true);
    }

    const deleteSelectedEducation = (educationToRemove: string) => {
        setCurrentResume(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[educationToRemove]: _, ...updatedEducation} = prev.content.education;
            return ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    ['education']: {...updatedEducation}
                }
            })
        })
    }

    return (
        <Container>
            <SectionTitle>Education</SectionTitle>
            {isModalOpen && <EducationPickerModal educationID={editingID} content={content} setCurrentResume={setCurrentResume} isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>}
            <Table aria-label="simple table">
                <TableHead sx={{ background: '#BEBEBE' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '800' }}>Degree</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">Field of Study</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">School Name</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">School Address</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">Start Date</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">End Date</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">
                            <Button type="button" size='small' variant='contained' color='primary' onClick={handleAddNewEducation}>
                                + Add
                            </Button>
                        </TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right"></TableCell>
                    </TableRow>
                </TableHead>
                    {content && Object.keys(content).length > 0 && (
                        <TableBody>
                        {Object.entries(content).map((item) => {
                            console.log(item)
                            return (
                                <TableRow
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{item[1]['degree'] ? capitalizeEveryWord(item[1]['degree']) : ''}</TableCell>
                                    <TableCell align="right">{item[1]['field of study'] ? capitalizeEveryWord(item[1]['field of study']): ''}</TableCell>
                                    <TableCell align="right">{item[1]['school name'] ? capitalizeEveryWord(item[1]['school name']): ''}</TableCell>
                                    <TableCell align="right">{item[1]['school address'] ? capitalizeEveryWord(item[1]['school address']): ''}</TableCell>
                                    <TableCell align="right">{item[1]['start date'] ? capitalizeEveryWord(item[1]['start date']): ''}</TableCell>
                                    <TableCell align="right">{item[1]['end date'] ? capitalizeEveryWord(item[1]['end date']): ''}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedEducation(item[0])}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="comment" type='button' onClick={() => editSelectedEducation(item[0])}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                        </TableBody>
                    )}
            </Table>
            {content && Object.keys(content).length === 0 && <InputLabel style={{ color: 'gray', flex: '1', whiteSpace: 'unset', paddingTop: '10px', paddingLeft: '10px' }}>Click "Add" to begin.</InputLabel>}
            <BottomWrapper>
                <Alert sx={{ margin: 'unset', visibility: (isDirty ? 'visible' : 'hidden') }} variant='outlined' severity='warning'>You have unsaved changes</Alert>
                <Button type="button" size='large' color='success' variant='contained' onClick={handleSaveResume}>Save</Button>
            </BottomWrapper>
        </Container>
    )
};

const SectionTitle = styled.h1`
    color: black;
`;

const Container = styled.div``;

export default EducationBuilder;