import { Typography } from "@mui/material";
import { GeneralInfoType } from "@types";
import { LangLevel, LangList } from "utils/Languages";

type ReviewGeneralSectionProps = {
    generalInfo?: GeneralInfoType;
}

const ReviewGeneralSection = ({ generalInfo }: ReviewGeneralSectionProps) => {
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} marginRight={'20px'} fontWeight={800}>General Information</Typography>
            {generalInfo && 
                <div style={{ paddingLeft: '20px' }}>
                    {generalInfo["first name"] && <Typography>{generalInfo["first name"]}</Typography>}
                    {generalInfo["last name"] && <Typography>{generalInfo["last name"]}</Typography>}
                    {generalInfo["email address"] && <Typography>{generalInfo["email address"]}</Typography>}
                    {generalInfo["linkedin"] && <Typography>{generalInfo["linkedin"]}</Typography>}
                    {generalInfo["phone number"] && <Typography>{generalInfo["phone number"]}</Typography>}
                    {generalInfo["role_title"] && <Typography>{generalInfo["role_title"]}</Typography>}
                    {generalInfo["languages"] && 
                        <div>
                            <Typography variant="h5">Languages</Typography>
                            {Object.keys(generalInfo["languages"]).map(item => {
                                return (
                                    <div style={{ display: 'flex' }}>
                                        <Typography>-&nbsp;{LangList[item]}&nbsp;|&nbsp;</Typography>
                                        <Typography>{LangLevel[generalInfo["languages"][item]]}</Typography>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default ReviewGeneralSection;