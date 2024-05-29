import { SkillsHierarchical } from "../../../../../types/resumeTypes";

type WithSectionsProps = {
    content: SkillsHierarchical;
}

const WithSections = ({content}: WithSectionsProps) => {

    return (
        <div>
            {Object.entries(content).map(([section, skillsFlat]) => (
                <div key={section}>
                    <h3>{section}</h3>
                    {Object.entries(skillsFlat).map(([key, skill]) => (
                        <div key={key}>
                            <h4>{skill.title}</h4>
                            <p>{skill.description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default WithSections;