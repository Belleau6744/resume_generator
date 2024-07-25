import { Button, capitalize, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { ProjectExperience } from "@types";
import { useEffect, useRef, useState } from "react";
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
    const [ cellWidth, setCellWidth ] = useState<number>(0);
    const rowRef = useRef<HTMLDivElement>(null);

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
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setCellWidth(Math.floor(+(rowRef?.current?.clientWidth)/4));
    });

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        ref={rowRef}
        id={`experience-tabpanel-${index}`}
        aria-labelledby={`experience-tab-${index}`}
        {...other}
        >
        {value === index && (
        <Table>
            {/* Project Experience Modal */}
            {isModalOpened && <CreateProjectExperience editingID={editingID} isModalOpened={isModalOpened} projectExperience={projectExperience} setIsModalOpened={setIsModalOpened} />}
            <TableHead sx={{ background: '#2C3E50' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">Title</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">Description</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Edit</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {capitalize(STRINGS_ENG.adding.plus_projectExperience)}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {projectExperience && Object.keys(projectExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(projectExperience[item].title)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {capitalize(projectExperience[item].title)}
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(projectExperience[item].description)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {capitalize(projectExperience[item].description)}
                                </div>
                            </Tooltip>
                        </TableCell>
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