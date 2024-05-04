type GeneralInfoType = {
    name: string;
}

type Education = {
    school: string;
}

type Skills = {
    skill: string;
}

type Experience = {
    workPlace: string;
}

export type ResumeFormType = {
    generalInfo: GeneralInfoType;
    education: Education;
    skills: Skills;
    experience: Experience;
}