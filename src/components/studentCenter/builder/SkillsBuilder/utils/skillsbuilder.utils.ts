import { SkillsFlat, SkillsHierarchical } from "../../../../../types/resumeTypes";

const transformToFlat = (hierarchical: SkillsHierarchical): SkillsFlat => {
    const flat: SkillsFlat = {};
    let index = 0;
    Object.keys(hierarchical).forEach(section => {
        Object.keys(hierarchical[section]).forEach(skill => {
            flat[+index] = hierarchical[section][skill];
            index++;
        })
    })
    return flat;
};

// const HMock: SkillsHierarchical = {
//     'section1': {
//         0: {
//             title: 'title1',
//             description: 'desc1'
//         },
//         1: {
//             title: 'title2',
//             description: 'desc2'
//         },
//     },
//     'section2': {
//         0: {
//             title: 'title21',
//             description: 'desc21'
//         },
//         1: {
//             title: 'title22',
//             description: 'desc22'
//         },
//     }
// }

const transformToHierarchical = (flat: SkillsFlat): SkillsHierarchical => {
    return { "General": flat };
};

export const SkillsUtils = {
    transformToFlat,
    transformToHierarchical,
}