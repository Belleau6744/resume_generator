import { EducationList, Experience, LanguageType, Skills } from "@types";

export type ContactInfoProps = {
    phoneNumber?: string;
    emailAddress?: string;
    linkedIn?: string;
}

export type EducationSectionProps = {
    education?: EducationList;
}

export type ExperienceSectionProps = {
    experience: Experience;
}

export type SkillsSectionProps = {
    skills?: Skills;
}

export type LanguageLevelScaleProps = {
    level: number;
    language: string;
}

export type LanguageSectionProps = {
    languages?: LanguageType;
}