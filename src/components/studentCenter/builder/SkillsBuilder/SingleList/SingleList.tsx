import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ResumeDefinition, SkillsFlat } from "@types";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import CreateSkill from "./CreateSkill";
import './TableStyling.css'; // Assuming you have this CSS file

type SingleListSkillsProps = {
    content: SkillsFlat;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const SingleListSkills = ({ content, setCurrentResume }: SingleListSkillsProps) => {
    const [isSkillModalOpened, setIsSkillModalOpened] = useState<boolean>(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);

    const deleteSelectedSkill = (skillToDelete: string, index: number) => {
        setCurrentResume(prev => {
            const currentSkills = prev.content.skills.content as SkillsFlat;
            return ({
                ...prev,
                ['content']: {
                    ...prev.content,
                    ['skills']: {
                        ...prev.content.skills,
                        hasSections: false,
                        ['content']: currentSkills.filter((item, currIndex) => !(item.title.toUpperCase() === skillToDelete.toUpperCase() && index === currIndex))
                    }
                }
            })
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            const container = tableContainerRef.current;
            const shadow = shadowRef.current;
            if (container && shadow) {
                if (container.scrollHeight > container.clientHeight) {
                    shadow.style.display = 'block';
                } else {
                    shadow.style.display = 'none';
                }
            }
        };

        const container = tableContainerRef.current;
        if (container) {
            handleScroll(); // Initial check
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [content]);

    return (
        <div style={{ position: 'relative', maxHeight: '500px' }}>
            <TableContainer ref={tableContainerRef} style={{ maxHeight: '500px' }} className="tableContainer">
                <Table stickyHeader>
                    {isSkillModalOpened && <CreateSkill setCurrentResume={setCurrentResume} isModalOpened={isSkillModalOpened} setIsModalOpened={setIsSkillModalOpened} />}
                    <TableHead sx={{ color: 'black', zIndex: 10, position: 'sticky' }}>
                        <TableRow sx={{ width: '200px' }}>
                            <TableCell sx={{ fontWeight: '800', color: 'white', backgroundColor: '#2C3E50' }}>Skill</TableCell>
                            <TableCell sx={{ fontWeight: '800', backgroundColor: '#2C3E50' }} align="right">
                                <Button startIcon={<AddIcon />} type="button" size='small' variant='contained' color='primary' onClick={() => setIsSkillModalOpened(true)}>
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {content && content.map((item, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{item.title}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="delete" type='button' onClick={() => deleteSelectedSkill(item.title, index)}>
                                        <DeleteIcon width={23} height={23} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div ref={shadowRef} className="scroll-shadow" />
        </div>
    );
}

export default SingleListSkills;
