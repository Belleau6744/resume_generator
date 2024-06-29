import { Typography } from "@mui/material";
import { Experience } from "@types";

type ReviewExperienceSectionProps = {
    experience?: Experience;
}

const ReviewExperienceSection = ({ experience }: ReviewExperienceSectionProps) => {
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} marginRight={'20px'} fontWeight={800}>Experience</Typography>
            
            {/* Working Experience */}
            <Typography variant="h5">{"Working Experience"}</Typography>
            {experience?.workingExperience && Object.keys(experience.workingExperience).map(item => {
                return (
                    <div>
                        <Typography>{experience.workingExperience[item].jobTitle}</Typography>
                        <Typography>{experience.workingExperience[item].organizationName}</Typography>
                        <Typography>{experience.workingExperience[item].startDate}</Typography>
                        <Typography>{experience.workingExperience[item].taskDescription}</Typography>
                        <Typography>{experience.workingExperience[item].stillWorking === true ? 'Stil Working' : experience.workingExperience[item].endDate}</Typography>
                    </div>
                )
            })}

            {/* Project Experience */}
            <Typography variant="h5">{"Project Experience"}</Typography>
            {experience?.projectExperience && Object.keys(experience.projectExperience).map(item => {
                return (
                    <div>
                        <Typography>{experience.projectExperience[item].title}</Typography>
                        <Typography>{experience.projectExperience[item].description}</Typography>
                    </div>
                )
            })}            

            {/* Volunteering Experience */}
            <Typography variant="h5">{"Volunteering Experience"}</Typography>
            {experience?.volunteerExperience && Object.keys(experience.volunteerExperience).map(item => {
                return (
                    <div>
                        <Typography>{experience.volunteerExperience[item].jobTitle}</Typography>
                        <Typography>{experience.volunteerExperience[item].organizationName}</Typography>
                        <Typography>{experience.volunteerExperience[item].startDate}</Typography>
                        <Typography>{experience.volunteerExperience[item].description}</Typography>
                        <Typography>{experience.volunteerExperience[item].stillWorking === true ? 'Stil Working' : experience.volunteerExperience[item].endDate}</Typography>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewExperienceSection;