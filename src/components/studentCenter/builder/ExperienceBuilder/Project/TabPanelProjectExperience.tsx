import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { STRINGS_ENG } from "../../../../../assets/stringConstants";
import { ResumeType } from "../../../../../types/dbStructType";
import { ProjectExperience } from "../../../../../types/resumeTypes";
import CreateProjectExperience from "./CreateProjectExperience";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    projectExperience: ProjectExperience;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
  }

const TabPanelProjectExperience = (props: TabPanelProps) => {
    const { value, index, setCurrentResume, projectExperience, ...other } = props;
    const [ isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [ editingID, setEditinID] = useState<string | undefined>(undefined);

    const deleteSelectedExperience = (experienceIndex: string) => {
        setCurrentResume(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[experienceIndex]: _, ...updatedProjectExperience} = prev.content.experience.projectExperience;
            return ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    'experience': {
                        ...prev.content.experience,
                        'projectExperience': updatedProjectExperience
                    }
                }
            })
        })
    }

    const addNewExperience = () => {
        setEditinID(undefined);
        setIsModalOpened(true);
    }

    const editExperience = (id: string) => {
        setEditinID(id);
        setIsModalOpened(true);
    }

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`experience-tabpanel-${index}`}
        aria-labelledby={`experience-tab-${index}`}
        {...other}
        >
        {/* Project Experience Modal */}
        {isModalOpened && <CreateProjectExperience editingID={editingID} isModalOpened={isModalOpened} projectExperience={projectExperience} setIsModalOpened={setIsModalOpened} setCurrentResume={setCurrentResume} />}

        {value === index && (
        <Table>
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_workingExperience}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projectExperience && Object.keys(projectExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{projectExperience[item].title}</TableCell>
                        <TableCell component="th" scope="row">{projectExperience[item].description}</TableCell>
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

export default TabPanelProjectExperience;