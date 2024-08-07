import { InputLabel, styled, TextField, Typography } from "@mui/material";
import { Experience } from "@types";

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
      caretColor: 'transparent', // Hides the caret
    },
  });

type ReviewExperienceSectionProps = {
    experience?: Experience;
}

const ReviewExperienceSection = ({ experience }: ReviewExperienceSectionProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="h4" borderBottom={'1px solid black'} color={"#34495E"} paddingLeft={'10px'} marginBottom={'20px'} fontWeight={800}>Experience</Typography>
            
            {/* Working Experience */}
            <div style={{ paddingLeft: '12px' }}>
                <Typography borderBottom={'1px solid black'} variant="h5">{"Working Experience"}</Typography>
                {experience?.workingExperience && Object.keys(experience.workingExperience).map((item, index) => {
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'baseline', paddingLeft: '12px', paddingTop: '12px' }} key={index}>
                            <Typography variant="h5">&#x2022;&nbsp;{experience.workingExperience[item].organizationName ?? 'Unknown Organization'}</Typography>
                            
                            {experience.workingExperience[item].jobTitle &&
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                    <InputLabel sx={{ width: '130px' }}>Job Title</InputLabel>
                                    <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.workingExperience[item].jobTitle}/>
                                </div>
                            }
                            {
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                    <InputLabel sx={{ width: '130px' }}>Task Description</InputLabel>
                                    <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.workingExperience[item].taskDescription}/>
                                </div>

                            }
                            {
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                    <InputLabel sx={{ width: '130px' }}>Dates</InputLabel>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={`${experience.workingExperience[item].startDate} - ${experience.workingExperience[item].stillWorking === true ? 'Stil Working' : experience.workingExperience[item].endDate}`}/>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>            

            {/* Project Experience */}
            <Typography borderBottom={'1px solid black'} marginTop={'12px'} variant="h5">{"Project Experience"}</Typography>
            {experience?.projectExperience && Object.keys(experience.projectExperience).map((item, index) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'baseline', paddingLeft: '12px', paddingTop: '12px', marginBottom: '12px' }} key={index}>
                        <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <InputLabel sx={{ width: '130px' }}>Title</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.projectExperience[item].title}/>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <InputLabel sx={{ width: '130px' }}>Task Description</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.projectExperience[item].description}/>
                        </div>
                    </div>
                )
            })}            

            {/* Volunteering Experience */}
            <Typography borderBottom={'1px solid black'} marginTop={'12px'} variant="h5">{"Volunteering Experience"}</Typography>
            {experience?.volunteerExperience && Object.keys(experience.volunteerExperience).map((item, index) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'baseline', paddingLeft: '12px', paddingTop: '12px', marginBottom: '12px' }} key={index}>
                        <Typography variant="h5">&#x2022;&nbsp;{experience.volunteerExperience[item].organizationName ?? 'Unknown Organization'}</Typography>


                        <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <InputLabel sx={{ width: '130px' }}>Job Title</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.volunteerExperience[item].jobTitle}/>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <InputLabel sx={{ width: '130px' }}>Description</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={experience.volunteerExperience[item].description}/>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                            <InputLabel sx={{ width: '130px' }}>Dates</InputLabel>
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <StyledTextField multiline sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={`${experience.volunteerExperience[item].startDate} - ${experience.volunteerExperience[item].stillWorking === true ? 'Stil Working' : experience.volunteerExperience[item].endDate}`}/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewExperienceSection;