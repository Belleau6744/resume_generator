import { SkillsFlat, SkillsHierarchical } from "@types";



const transformToFlat = (hierarchical: SkillsHierarchical): SkillsFlat => {
    let flat: SkillsFlat = [];
    hierarchical && Object.keys(hierarchical).forEach(section => {
        hierarchical[section].forEach(skill => {
            flat = flat.concat(skill);
        })
    })
    return flat;
};

const transformToHierarchical = (flat: SkillsFlat): SkillsHierarchical => {
    return { "GENERAL": flat };
};

export const SkillsUtils = {
    transformToFlat,
    transformToHierarchical,
}