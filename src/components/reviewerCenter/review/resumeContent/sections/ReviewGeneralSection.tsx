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
        <div style={{ marginBottom: '20px' }}>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} color={'#34495E'} fontWeight={800}>General Information</Typography>
            {generalInfo && 
                <div style={{ paddingLeft: '20px', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    
                    {generalInfo?.["first name"] && 
                        <InputLabel id="first name" sx={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <span style={{ width: '120px' }}>First Name</span>
                            <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["first name"]}/>
                        </InputLabel>
                    }
                    
                    {generalInfo?.["last name"] && 
                        <InputLabel id="last name" sx={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <span style={{ width: '120px' }}>Last Name</span>
                            <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["last name"]}/>
                        </InputLabel>
                    }
                    {generalInfo?.["email address"] &&
                        <InputLabel id="email address" sx={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                            <span style={{ width: '120px' }}>Email Address</span>
                            <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["email address"]}/>
                        </InputLabel>
                    }
                    {
                        generalInfo?.["linkedin"] && 
                            <div style={{ display: 'flex', alignItems: 'baseline'}}>
                                <InputLabel sx={{ width: '120px' }}>LinkedIn</InputLabel>
                                <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["linkedin"]}/>
                            </div>
                    }   
                    {
                        generalInfo["phone number"] && 
                        <div style={{ display: 'flex', alignItems: 'baseline'}}>
                            <InputLabel sx={{ width: '120px' }}>Phone Number</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["phone number"]}/>
                        </div>
                    }
                    {
                        generalInfo["role_title"] && 
                        <div style={{ display: 'flex', alignItems: 'baseline'}}>
                            <InputLabel sx={{ width: '120px' }}>Role Title</InputLabel>
                            <StyledTextField multiline sx={{ flex: '1'}} InputProps={{readOnly: true}} value={generalInfo["role_title"]}/>
                        </div>
                    }
                    {
                        generalInfo["languages"] && 
                        <>
                            <Typography fontWeight={700} color={"#34495E"} variant="h5">Languages</Typography>
                            {Object.keys(generalInfo["languages"]).map((item, index) => {
                                return (
                                    <div style={{ display: 'flex', alignItems: 'baseline', paddingLeft: '12px'}} key={index}>
                                        <InputLabel sx={{ width: '108px' }}>{LangList[item]}</InputLabel>
                                        <StyledTextField multiline fullWidth sx={{ flex: '1' }} InputProps={{readOnly: true}} value={LangLevel[generalInfo["languages"][item]]} />
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