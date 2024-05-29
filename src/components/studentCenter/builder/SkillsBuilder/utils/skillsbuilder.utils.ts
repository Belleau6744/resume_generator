import { SkillsFlat, SkillsHierarchical } from "../../../../../types/resumeTypes";



const transformToFlat = (hierarchical: SkillsHierarchical): SkillsFlat => {
    let flat: SkillsFlat = [];
    Object.keys(hierarchical).forEach(section => {
        hierarchical[section].forEach(skill => {
            flat = flat.concat(skill);
        })
    })
    return flat;
};

const transformToHierarchical = (flat: SkillsFlat): SkillsHierarchical => {
    return { "General": flat };
};

export const SkillsUtils = {
    transformToFlat,
    transformToHierarchical,
}