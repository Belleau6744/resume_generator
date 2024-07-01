import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ProjectExperience } from "@types";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { STRINGS_ENG } from "../../../../../assets/stringConstants";
import { useResumeContext } from "../../useResumeContext";
import CreateProjectExperience from "./CreateProjectExperience";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    projectExperience?: ProjectExperience;
  }

const TabPanelProjectExperience = (props: TabPanelProps) => {
    const { value, index, projectExperience, ...other } = props;
    const { setCurrentResume } = useResumeContext();
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
        {value === index && (
        <Table>
            {/* Project Experience Modal */}
            {isModalOpened && <CreateProjectExperience editingID={editingID} isModalOpened={isModalOpened} projectExperience={projectExperience} setIsModalOpened={setIsModalOpened} />}
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Edit</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_projectExperience}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projectExperience && Object.keys(projectExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{projectExperience[item].title}</TableCell>
                        <TableCell component="th" scope="row">{projectExperience[item].description}</TableCell>
                        <TableCell align="center">
                            <IconButton aria-label="comment" type='button' onClick={() => editExperience(item)}>
                                <EditIcon width={20} height={20} />
                            </IconButton>
                        </TableCell>
                        <TableCell align="center">
                            <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedExperience(item)}>
                                <DeleteIcon width={23} height={23} />
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