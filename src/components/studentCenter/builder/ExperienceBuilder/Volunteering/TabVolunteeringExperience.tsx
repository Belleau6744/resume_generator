import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeType, VolunteeringExperience } from "@types";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { STRINGS_ENG } from "../../../../../assets/stringConstants";
import CreateProjectExperience from "./CreateVolunteeringExperience";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    volunteeringExperience: VolunteeringExperience;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeType>>;
  }

const TabVolunteeringExperience = (props: TabPanelProps) => {
    const { value, index, setCurrentResume, volunteeringExperience, ...other } = props;
    const [ isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [ editingID, setEditinID] = useState<string | undefined>(undefined);

    const deleteSelectedExperience = (experienceIndex: string) => {
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
            {/* Volunteering Experience Modal */}
            {isModalOpened && <CreateProjectExperience editingID={editingID} isModalOpened={isModalOpened} volunteeringExperience={volunteeringExperience} setIsModalOpened={setIsModalOpened} setCurrentResume={setCurrentResume} />}
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Job Title</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Organization</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: '800' }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_volunteeringExperience}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {volunteeringExperience && Object.keys(volunteeringExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{volunteeringExperience[item].jobTitle}</TableCell>
                        <TableCell component="th" scope="row">{volunteeringExperience[item].organizationName}</TableCell>
                        <TableCell component="th" scope="row">{volunteeringExperience[item].description}</TableCell>
                        <TableCell component="th" scope="row">{volunteeringExperience[item].startDate}</TableCell>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <TableCell component="th" scope="row">{volunteeringExperience[item].stillWorking === true ? STRINGS_ENG.still_working : volunteeringExperience[item].endDate}</TableCell>
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

export default TabVolunteeringExperience;