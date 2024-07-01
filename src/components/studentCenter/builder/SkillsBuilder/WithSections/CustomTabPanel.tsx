import { Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ResumeDefinition, SkillsFlat, SkillsHierarchical } from "@types";
import { useState } from "react";
import DeleteIcon from "../../../../../assets/Icons/DeleteIcon";
import CreateSkillInSection from "./CreateSkillInSection";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    skills: SkillsFlat;
    section: string;
    setCurrentResume: React.Dispatch<React.SetStateAction<ResumeDefinition>>;
  }

const CustomTabPanel = (props: TabPanelProps) => {
    const { value, index, setCurrentResume, skills, section, ...other } = props;
    const [ isSkillModalOpened, setIsSkillModalOpened] = useState<boolean>(false);

    const handleDeleteSection = () => {
        setCurrentResume(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {[section]: _, ...updatedContent} = prev.content.skills.content as SkillsHierarchical;
            return ({
                ...prev,
                content: {
                    ...prev.content,
                    skills: {
                        hasSections: true,
                        content: {...updatedContent}
                    }
                }
            })
        })
    }

    const deleteSelectedSkill = (skillToDelete: string, currIndex: number) => {
        setCurrentResume(prev => {
            const hierarchicalContent = prev.content.skills.content as SkillsHierarchical;
            const newSkills = hierarchicalContent[section].filter((item, index) => !(item.title === skillToDelete && index === currIndex))
            return ({
                ...prev,
                content: {
                    ...prev.content,
                    skills: {
                        hasSections: true,
                        content: {
                            ...prev.content.skills.content as SkillsHierarchical,
                            [section]: newSkills 
                        }
                    }
                }
            })
        })
    }
  
    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`skills-tabpanel-${index}`}
        aria-labelledby={`skills-tab-${index}`}
        {...other}
        >
        {isSkillModalOpened && <CreateSkillInSection isModalOpened={isSkillModalOpened} section={section} setIsModalOpened={setIsSkillModalOpened} setCurrentResume={setCurrentResume} />}
        {value === index && (
        <>
        <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button sx={{ margin: '10px' }} type="button" size='small' variant='contained' color='error' onClick={handleDeleteSection}>
                x Delete Section
            </Button>
        </div>
        <Table>
            <TableHead sx={{ background: '#BEBEBE' }}>
                <TableRow>
                    <TableCell sx={{ fontWeight: '800' }}>Skill</TableCell>
                    <TableCell sx={{ fontWeight: '500' }} align="right">
                        <Button type="button" size='small' variant='contained' color='primary' onClick={() => setIsSkillModalOpened(true)}>
                            + Add Skill
                        </Button>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {skills && skills.map((item, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{item.title}</TableCell>
                        <TableCell align="right">
                            <IconButton aria-label="comment" type='button' onClick={() => deleteSelectedSkill(item.title, index)}>
                                <DeleteIcon width={23} height={23} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table></>)}
        </div>
    );
}

export default CustomTabPanel;