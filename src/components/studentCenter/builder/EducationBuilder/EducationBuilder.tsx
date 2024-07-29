import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Alert, Button, IconButton, InputLabel, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../assets/Icons/EditIcon";
import { capitalizeEveryWord } from "../../../../utils/stringUtils";
import { useResumeContext } from "../useResumeContext";
import EducationPickerModal from "./EducationPickerModal";

const BottomWrapper = styled.div`
    display: flex;
    width: 100%;
    height: fit-content;
    justify-content: space-between;
`;

const Container = styled.div``;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EducationBuilder = () => {
    const {
        isDirty,
        handleSaveResume,
        currentResume,
        setCurrentResume,
        handleCommentSectionToggle,
        resetResume
      } = useResumeContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingID, setEditinID] = useState<string | undefined>(undefined);

    const content = useMemo(() => {
        return currentResume.content.education;
    }, [currentResume.content.education]);

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography fontWeight={700} variant='h2' color={"#34495E"}>Education</Typography>
                <Button onClick={handleCommentSectionToggle} variant="contained" size="medium" color="warning" sx={{ height: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <RateReviewIcon />
                    View Comments
                </Button>
            </div>
            {isModalOpen && <EducationPickerModal educationID={editingID} content={content} setCurrentResume={setCurrentResume} isModalOpened={isModalOpen} setIsModalOpened={setIsModalOpen}/>}
            <Table aria-label="simple table">
                <TableHead sx={{ background: '#2C3E50' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Degree</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Field of Study</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">School Name</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">School Address</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Start Date</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">End Date</TableCell>
                        <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Edit</TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="right">
                            <Button startIcon={<AddIcon/>} type="button" size='medium' variant='contained' color='primary' onClick={handleAddNewEducation}>
                                Add
                            </Button>
                        </TableCell>
                        <TableCell sx={{ fontWeight: '800' }} align="center"></TableCell>
                    </TableRow>
                </TableHead>
                    {content && Object.keys(content).length > 0 && (
                        <TableBody>
                        {Object.entries(content).map((item) => {
                            return (
                                <TableRow
                                    key={item[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{item[1]['degree'] ? capitalizeEveryWord(item[1]['degree']) : ''}</TableCell>
                                    <TableCell align="center">{item[1]['field of study'] ? capitalizeEveryWord(item[1]['field of study']): ''}</TableCell>
                                    <TableCell align="center">{item[1]['school name'] ? capitalizeEveryWord(item[1]['school name']): ''}</TableCell>
                                    <TableCell align="center">{item[1]['school address'] ? capitalizeEveryWord(item[1]['school address']): ''}</TableCell>
                                    <TableCell align="center">{item[1]['start date'] ? capitalizeEveryWord(item[1]['start date']): ''}</TableCell>
                                    <TableCell align="center">{item[1]['end date'] ? capitalizeEveryWord(item[1]['end date']): ''}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="Edit" type='button' onClick={() => editSelectedEducation(item[0])}>
                                            <EditIcon width={20} height={20} />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="Delete" type='button' onClick={() => deleteSelectedEducation(item[0])}>
                                            <DeleteIcon width={23} height={23} />
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
                <div style={{ display: 'flex', gap: "20px" }}>
                    <Button disabled={!isDirty} size='large' color="charcoal" type="button" variant='outlined' onClick={resetResume}>Reset</Button>
                    <Button type="button" size='large' color='success' variant='contained' onClick={handleSaveResume}>Save</Button>
                </div>
            </BottomWrapper>
        </Container>
    )
};

export default EducationBuilder;