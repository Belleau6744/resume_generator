import { Typography } from "@mui/material";
import { Skill, Skills } from "@types";

type ReviewSkillsSectionProps = {
    skills?: Skills;
}

const ReviewSkillsSection = ({ skills }: ReviewSkillsSectionProps) => {
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} marginRight={'20px'} fontWeight={800}>Skills</Typography>
            {skills && (
                skills.hasSections === true ? (
                    Object.keys(skills.content).map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{ fontWeight: 800 }}>{item}</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {skills.content[item].map((skillItem: Skill, index: number) => {
                                        return (
                                            <div key={index} style={{ flex: '0 1 auto', margin: '1px', padding: '2px', boxSizing: 'border-box' }}>&#x2022;&nbsp;{skillItem.title}</div>
                                        )

                                    })}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    skills.content.map((skillItem: Skill, index) => {
                        return (
                            <div key={index}>{skillItem.title}</div>
                        )
                    })
                )
            )}
        </div>
    )
}

export default ReviewSkillsSection;