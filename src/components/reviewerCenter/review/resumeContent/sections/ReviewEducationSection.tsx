import { InputLabel, styled, TextField, Typography } from "@mui/material";
import { EducationList } from "@types";

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
      caretColor: 'transparent', // Hides the caret
    },
  });

type ReviewEducationSectionProps = {
    education?: EducationList;
}

const ReviewEducationSection = ({ education }: ReviewEducationSectionProps) => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} marginRight={'20px'} marginBottom={'20px'} fontWeight={800}>Education</Typography>
            {education && Object.keys(education).map(item => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px'}}>
                        <Typography variant="h5">&#x2022;&nbsp;{education[item].degree}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'baseline', paddingLeft: '12px' }}>
                            {
                            education[item]["field of study"] && 
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                        <InputLabel sx={{ width: '120px' }}>Field Of Study</InputLabel>
                                        <StyledTextField sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={education[item]["field of study"]}/>
                                </div>
                            }
                            {
                            education[item]["school address"] && 
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                        <InputLabel sx={{ width: '120px' }}>School Address</InputLabel>
                                        <StyledTextField sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={education[item]["school address"]}/>
                                </div>
                            }
                            {
                            education[item]["school name"] && 
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                        <InputLabel sx={{ width: '120px' }}>School Name</InputLabel>
                                        <StyledTextField sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={education[item]["school name"]}/>
                                </div>
                            }
                            {
                            education[item]["end date"] && education[item]["start date"] &&
                                <div style={{ display: 'flex', alignItems: 'baseline', width: '100%'}}>
                                        <InputLabel sx={{ width: '120px' }}>Dates</InputLabel>
                                        <StyledTextField sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={`${education[item]["start date"]} - ${education[item]["end date"]}`}/>
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewEducationSection;