import { TextField, Typography } from "@mui/material";
import { Skill, Skills } from "@types";

type ReviewSkillsSectionProps = {
    skills?: Skills;
}

const ReviewSkillsSection = ({ skills }: ReviewSkillsSectionProps) => {
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} color={"#34495E"} paddingLeft={'10px'} fontWeight={800} marginBottom={'12px'}>Skills</Typography>
            {skills && (
                skills.hasSections === true ? (
                    Object.keys(skills.content).map((item, index) => {
                        return (
                            <div key={index} style={{ paddingLeft: '12px', marginBottom: '15px'}}>
                                <Typography fontWeight={800} marginBottom={'3px'}>{item}</Typography>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField InputProps={{readOnly: true}} fullWidth multiline value={skills.content[item].map((skillItem: Skill) => {
                                        return (
                                            ` ${skillItem.title}`
                                        )

                                    })}/>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <TextField InputProps={{readOnly: true}} fullWidth multiline value={skills.content.map((skillItem: Skill) => {
                        return (
                            ` ${skillItem.title}`
                        )
                    })}/>
                )
            )}
        </div>
    )
}

export default ReviewSkillsSection;