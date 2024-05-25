import { Button, IconButton, InputLabel, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../../../../assets/Icons/DeleteIcon";
import { ResumeType } from "../../../../types/dbStructType";
import { Education, EducationList } from "../../../../types/resumeTypes";
import EducationPickerModal from "./EducationPickerModal";

type EducationBuilderProps = {
    content: EducationList;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
    isDirty: boolean;
}

const defaultEducation: Education = {
    'degree': "",
    'field of study': "",
    'school name': "",
    'school address': "",
    'start date': "",
    'end date': ""
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EducationBuilder = ({ content, setCurrentResume, isDirty }: EducationBuilderProps) => {
    const [currentEducation, setCurrentEducation] = useState<Education>(defaultEducation);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleAddNewEducation = () => {
        setCurrentEducation(defaultEducation);
        setIsModalOpen(true);
    }

    const handleEditEducation = (id: string) => {
        setCurrentEducation(content[id]);
        setIsModalOpen(true);
    }

    const deleteSelectedLanguage = (index: string) => {
        console.log(content[index]);
    }

    return (
        <Container>
            <SectionTitle>Education</SectionTitle>
            <EducationPickerModal currentEducation={currentEducation} setCurrentResume={setCurrentResume} isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>
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
                    {Object.keys(content).length > 0 && (
                        <TableBody>
                        {Object.entries(content).map((item) => (
                                <TableRow
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item[0]}</TableCell>
                                    <TableCell align="right">{item[1]?.['degree']}</TableCell>
                                    <TableCell align="right">{item[1]?.['field of study']}</TableCell>
                                    <TableCell align="right">{item[1]?.['school name']}</TableCell>
                                    <TableCell align="right">{item[1]?.['school address']}</TableCell>
                                    <TableCell align="right">{item[1]?.['start date']}</TableCell>
                                    <TableCell align="right">{item[1]?.['end date']}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedLanguage(item[0])}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
            </Table>
            {Object.keys(content).length === 0 && <InputLabel style={{ color: 'gray', flex: '1', whiteSpace: 'unset', paddingTop: '10px', paddingLeft: '10px' }}>Click "Add" to begin.</InputLabel>}
        </Container>
    )
};

const SectionTitle = styled.h1`
    color: black;
`;

const Container = styled.div``;

export default EducationBuilder;