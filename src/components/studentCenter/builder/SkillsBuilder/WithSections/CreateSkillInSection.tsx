import { Button, Dialog, DialogTitle, InputLabel, TextField } from '@mui/material';
import { ResumeDefinition, Skill, SkillsFlat, SkillsHierarchical } from "@types";
import { useState } from 'react';
import styled from 'styled-components';
import '../../../../../assets/ModalStyling.css';

type CreateSkillModalProps = {
    isModalOpened: boolean;
    section: string;
    setIsModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeDefinition>>;
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 45px;
    width: 100%;
    @media screen and (max-width: 992px) {
        gap: 10px;
    }
`;

const CreateSkillInSection = ({ isModalOpened, setIsModalOpened, setCurrentResume, section }: CreateSkillModalProps) => {
    const [newSkill, setNewSkill] = useState<Skill>({
        title: '',
    });

    const handleAddSingleSkill = () => {
        setCurrentResume(prev => {
            const currentSkills: SkillsFlat = prev.content.skills.content[section.toUpperCase()] as SkillsFlat ?? [];

            return ({
                ...prev,
                content: {
                    ...prev.content,
                    skills: {
                        hasSections: true,
                        content: {
                            ...prev.content.skills.content as SkillsHierarchical,
                            [section.toUpperCase()]: currentSkills.concat(newSkill)
                        }
                    }
                }
            })
        })
        setIsModalOpened(false);
    }

    return (
        <Dialog open={isModalOpened} >
            <DialogTitle color={"#34495E"} sx={{ borderBottom: "1px solid #ced2d3", fontWeight: '800', marginBottom: '20px' }}>Add a new skill</DialogTitle>
            <div style={{ padding: '0 40px 20px 40px', display: 'flex', flexDirection: 'column' }}>
                <InputWrapper>
                    <InputLabel sx={{ width: '50px', whiteSpace: 'unset', fontWeight: '700' }}>{'Title'}</InputLabel>
                    <TextField
                    variant='outlined'
                    sx={{ flex: '1', minWidth: '100px' }}
                    label={'Skill'}
                    type="text"
                    value={newSkill.title}
                    onChange={(e) => setNewSkill(prev => ({...prev, title: e.target.value}))}
                    />
                </InputWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
                    <Button variant='outlined' onClick={() => setIsModalOpened(false)}>Cancel</Button>
                    <Button variant='contained' color='info' onClick={handleAddSingleSkill}>Add skill</Button>
                </div>
            </div>
        </Dialog>
        
    )
}

export default CreateSkillInSection;