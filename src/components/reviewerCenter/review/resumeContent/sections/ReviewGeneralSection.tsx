import { InputLabel, TextField, Typography, styled } from "@mui/material";
import { GeneralInfoType } from "@types";
import { LangLevel, LangList } from "utils/Languages";

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
      caretColor: 'transparent', // Hides the caret
    },
  });
type ReviewGeneralSectionProps = {
    generalInfo?: GeneralInfoType;
}

const ReviewGeneralSection = ({ generalInfo }: ReviewGeneralSectionProps) => {
    
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} fontWeight={800}>General Information</Typography>
            {generalInfo && 
                <div style={{ paddingLeft: '20px', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {
                        generalInfo?.["first name"] && 
                            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                                <InputLabel sx={{ width: '120px' }}>First Name</InputLabel>
                                <StyledTextField sx={{ flex: '1'}} variant="outlined" InputProps={{readOnly: true}} value={generalInfo["first name"]}/>
                            </div>
                    }
                    {
                        generalInfo?.["last name"] && 
                            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                                <InputLabel sx={{ width: '120px' }}>Last Name</InputLabel>
                                <StyledTextField sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["last name"]}/>
                            </div>
                    }
                    {
                        generalInfo?.["email address"] &&
                            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                                <InputLabel sx={{ width: '120px' }}>Email Address</InputLabel>
                                <StyledTextField sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["email address"]}/>
                            </div>
                    }
                    {
                        generalInfo?.["linkedin"] && 
                            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                                <InputLabel sx={{ width: '120px' }}>LinkedIn</InputLabel>
                                <StyledTextField sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["linkedin"]}/>
                            </div>
                    }   
                    {
                        generalInfo["phone number"] && 
                        <div style={{ display: 'flex', alignItems: 'baseline'}}>
                            <InputLabel sx={{ width: '120px' }}>Phone Number</InputLabel>
                            <StyledTextField sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["phone number"]}/>
                        </div>
                    }
                    {
                        generalInfo["role_title"] && 
                        <div style={{ display: 'flex', alignItems: 'baseline'}}>
                            <InputLabel sx={{ width: '120px' }}>Role Title</InputLabel>
                            <StyledTextField sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["role_title"]}/>
                        </div>
                    }
                    {
                        generalInfo["languages"] && 
                        <>
                            <Typography variant="h5">Languages</Typography>
                            {Object.keys(generalInfo["languages"]).map(item => {
                                return (
                                    <div style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '12px'}}>
                                        <InputLabel sx={{ width: '108px' }}>{LangList[item]}</InputLabel>
                                        <StyledTextField fullWidth sx={{ flex: '1' }} InputProps={{readOnly: true}} value={LangLevel[generalInfo["languages"][item]]} />
                                    </div>
                                )
                            })}
                        </>
                    }
                </div>
            }
        </div>
    )
}

export default ReviewGeneralSection;