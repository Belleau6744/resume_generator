import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { WorkingExperience } from "@types";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { STRINGS_ENG } from "../../../../../assets/stringConstants";
import { useResumeContext } from "../../useResumeContext";
import CreateWorkingExperience from "./CreateWorkingExperience";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    workingExperience?: WorkingExperience;
  }

const TabPanelWorkingExperience = (props: TabPanelProps) => {
    const { value, index, workingExperience, ...other } = props;
    const { setCurrentResume } = useResumeContext();
    const [ isWorkingExperienceModalOpened, setIsWorkingExperienceModalOpened] = useState<boolean>(false);
    const [editingID, setEditinID] = useState<string | undefined>(undefined);

    const deleteSelectedExperience = (experienceIndex: string) => {
        setCurrentResume(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[experienceIndex]: _, ...updatedWorkingExperience} = prev.content.experience.workingExperience;
            return ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    'experience': {
                        ...prev.content.experience,
                        'workingExperience': updatedWorkingExperience
                    }
                }
            })
        })
    }

    const addNewExperience = () => {
        setEditinID(undefined);
        setIsWorkingExperienceModalOpened(true);
    }

    const editExperience = (id: string) => {
        setEditinID(id);
        setIsWorkingExperienceModalOpened(true);
    }

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`experience-tabpanel-${index}`}
        aria-labelledby={`experience-tab-${index}`}
        {...other}
        >

        {value === index && (
        <Table>
        {/* Working Experience Modal */}
            {isWorkingExperienceModalOpened && <CreateWorkingExperience workingExperience={workingExperience} editingID={editingID} isModalOpened={isWorkingExperienceModalOpened} setIsModalOpened={setIsWorkingExperienceModalOpened} />}
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Job Title</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Organization Name</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_workingExperience}
                        </Button>
                    </TableCell>
                    <TableCell sx={{ fontWeight: '800' }}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {workingExperience && Object.keys(workingExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{workingExperience[item].jobTitle}</TableCell>
                        <TableCell component="th" scope="row">{workingExperience[item].organizationName}</TableCell>
                        <TableCell component="th" scope="row">{workingExperience[item].taskDescription}</TableCell>
                        <TableCell component="th" scope="row">{workingExperience[item].startDate}</TableCell>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <TableCell component="th" scope="row">{workingExperience[item].stillWorking === true ? STRINGS_ENG.still_working : workingExperience[item].endDate}</TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedExperience(item)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="comment" type='button' onClick={() => editExperience(item)}>
                                <EditIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>)}
        </div>
    );
}

export default TabPanelWorkingExperience;