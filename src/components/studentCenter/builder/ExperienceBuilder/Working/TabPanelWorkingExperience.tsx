import AddIcon from '@mui/icons-material/Add';
import { Button, capitalize, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { WorkingExperience } from "@types";
import { useEffect, useRef, useState } from "react";
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
    const [ cellWidth, setCellWidth ] = useState<number>(0);
    const rowRef = useRef<HTMLDivElement>(null);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        setCellWidth(Math.floor(+(rowRef?.current?.clientWidth)/7));
    });

    return (
        <div
        role="tabpanel"
        ref={rowRef}
        hidden={value !== index}
        id={`experience-tabpanel-${index}`}
        aria-labelledby={`experience-tab-${index}`}
        {...other}
        >

        {value === index && (
        <Table>
        {/* Working Experience Modal */}
            {isWorkingExperienceModalOpened && <CreateWorkingExperience workingExperience={workingExperience} editingID={editingID} isModalOpened={isWorkingExperienceModalOpened} setIsModalOpened={setIsWorkingExperienceModalOpened} />}
            <TableHead sx={{ background: '#2C3E50' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">Job Title</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">Organization Name</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">Start Date</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="left">End Date</TableCell>
                    <TableCell sx={{ fontWeight: '800', color: 'white' }} align="center">Edit</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                        <Button startIcon={<AddIcon/>} type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_workingExperience}
                        </Button>
                    </TableCell>
                    <TableCell sx={{ fontWeight: '800' }}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {workingExperience && Object.keys(workingExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(workingExperience[item].jobTitle)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {capitalize(workingExperience[item].jobTitle)}
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(workingExperience[item].organizationName)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {capitalize(workingExperience[item].organizationName)}
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(workingExperience[item].startDate)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {capitalize(workingExperience[item].startDate)}
                                </div>
                            </Tooltip>
                        </TableCell>
                        
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <Tooltip title={capitalize(workingExperience[item].stillWorking === true ? STRINGS_ENG.still_working : workingExperience[item].endDate)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    {capitalize(workingExperience[item].stillWorking === true ? STRINGS_ENG.still_working : workingExperience[item].endDate)}
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

export default TabPanelWorkingExperience;