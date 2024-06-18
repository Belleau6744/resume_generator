import { Skill } from "@types";
import styled from "styled-components";
import { SkillsSectionProps } from "../../../types";
import { SectionContainer } from "./utils";

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const SkillsContainer = styled(SectionContainer)`
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
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {skills.content[item].map((skillItem: Skill) => {
                                        return (
                                            <div style={{ flex: '0 1 auto', margin: '1px', padding: '2px', boxSizing: 'border-box' }}>&#x2022;&nbsp;{skillItem.title}</div>
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
        </SkillsContainer>
    )
};

export default SkillsSection;