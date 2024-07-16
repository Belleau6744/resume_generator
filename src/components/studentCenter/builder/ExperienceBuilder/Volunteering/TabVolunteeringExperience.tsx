import { Button, capitalize, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from "@mui/material";
import { VolunteeringExperience } from "@types";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import EditIcon from "../../../../../assets/Icons/EditIcon";
import { STRINGS_ENG } from "../../../../../assets/stringConstants";
import CreateProjectExperience from "./CreateVolunteeringExperience";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    volunteeringExperience?: VolunteeringExperience;
  }

const TabVolunteeringExperience = (props: TabPanelProps) => {
    const { value, index, volunteeringExperience, ...other } = props;
    const [ isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [ editingID, setEditinID] = useState<string | undefined>(undefined);
    const [ cellWidth, setCellWidth ] = useState<number>(0);
    const rowRef = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleteSelectedExperience = (experienceIndex: string) => {
        // TODO IMPLEMENT
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
            {/* Volunteering Experience Modal */}
            {isModalOpened && <CreateProjectExperience editingID={editingID} isModalOpened={isModalOpened} volunteeringExperience={volunteeringExperience} setIsModalOpened={setIsModalOpened} />}
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }} align="left">Job Title</TableCell>
                    <TableCell sx={{ fontWeight: '800' }} align="left">Organization</TableCell>
                    <TableCell sx={{ fontWeight: '800' }} align="left">Start Date</TableCell>
                    <TableCell sx={{ fontWeight: '800' }} align="left">End Date</TableCell>
                    <TableCell sx={{ fontWeight: '800' }} align="center">Edit</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="center">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={addNewExperience}>
                            {STRINGS_ENG.adding.plus_volunteeringExperience}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {volunteeringExperience && Object.keys(volunteeringExperience).map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(volunteeringExperience[item].jobTitle)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {capitalize(volunteeringExperience[item].jobTitle)};dfslfmls;dfmsl
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(volunteeringExperience[item].organizationName)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {capitalize(volunteeringExperience[item].organizationName)}
                                </div>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(volunteeringExperience[item].startDate)}>
                            <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                            {capitalize(volunteeringExperience[item].startDate)}
                            </div>
                            </Tooltip>
                        </TableCell>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <TableCell component="th" scope="row" sx={{maxWidth: `${cellWidth}px`}}>
                            <Tooltip title={capitalize(volunteeringExperience[item].stillWorking === true ? STRINGS_ENG.still_working : volunteeringExperience[item].endDate)}>
                                <div style={{ textOverflow: 'ellipsis', textWrap: 'nowrap', whiteSpace: 'nowrap', overflow: 'hidden'}}>
                                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                {/* @ts-ignore */}
                                {capitalize(volunteeringExperience[item].stillWorking === true ? STRINGS_ENG.still_working : volunteeringExperience[item].endDate)}
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

export default TabVolunteeringExperience;