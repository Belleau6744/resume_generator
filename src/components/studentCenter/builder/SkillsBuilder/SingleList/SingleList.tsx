import { SkillsFlat } from "../../../../../types/resumeTypes";

type SingleListSkillsProps = {
    content: SkillsFlat;
}

const SingleListSkills = ({content}: SingleListSkillsProps) => {
    return (
        <div>
            {Object.entries(content).map(([key, skill]) => (
                <div key={key}>
                    <h4>{skill.title}</h4>
                    <p>{skill.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SingleListSkills;