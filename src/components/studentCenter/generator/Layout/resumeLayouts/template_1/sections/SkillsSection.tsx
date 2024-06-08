import styled from "styled-components";
import { Skill, Skills } from "../../../../../../../types/resumeTypes";
import { SectionContainer } from "./utils";

type SkillsSectionProps = {
    skills?: Skills;
}

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
                                Title: {item}
                                <div>
                                    {skills.content[item].map((skillItem: Skill) => {
                                        return (
                                            <div>{skillItem.title}</div>
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