import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeDefinition, SkillsFlat } from "@types";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import CreateSkill from "./CreateSkill";

type SingleListSkillsProps = {
    content: SkillsFlat;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const SingleListSkills = ({ content, setCurrentResume }: SingleListSkillsProps) => {
    const [isSkillModalOpened, setIsSkillModalOpened] = useState<boolean>(false);

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

    return (
        <Table>
            {isSkillModalOpened && <CreateSkill setCurrentResume={setCurrentResume} isModalOpened={isSkillModalOpened} setIsModalOpened={setIsSkillModalOpened}/>}
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Skill</TableCell>
                    <TableCell sx={{ fontWeight: '800' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={() => setIsSkillModalOpened(true)}>
                            + Add
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {content && content.map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{item.title}</TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedSkill(item.title, index)}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default SingleListSkills;