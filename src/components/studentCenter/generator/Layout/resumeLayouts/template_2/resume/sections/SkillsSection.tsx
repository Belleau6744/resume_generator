import { Skill } from "@types";
import styled from "styled-components";
import { SkillsSectionProps } from "../../../types";

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const SkillsContainer = styled.div`
    margin-bottom: 20px;
`; 

const SkillsSection = ({ skills }: SkillsSectionProps) => {
    return (
        <SkillsContainer>
            <SectionTitle>Skills</SectionTitle>
            {skills && (
                skills.hasSections === true ? (
                    Object.keys(skills.content).map((item, index) => {
                        return (
                            <div key={index}>
                                <div style={{ fontWeight: 800 }}>{item}</div>
                                <div style={{ display: 'flex', gap: '8px'}}>
                                    {skills.content[item].map((skillItem: Skill) => {
                                        return (
                                            <div>&#x2022;&nbsp;{skillItem.title}</div>
                                        )

                                    })}
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        justifyContent: 'start',
                        gap: '10px',
                        padding: '5px 30px 0 15px',
                    }}>
                        {skills.content.map((skillItem: Skill, index) => {
                            return (
                                <div key={index}>&#x2022;{skillItem.title}</div>
                            )
                        })}
                    </div>
                )
            )}
        </SkillsContainer>
    )
};

export default SkillsSection;