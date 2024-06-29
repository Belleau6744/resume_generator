import { Typography } from "@mui/material";
import { EducationList } from "@types";

type ReviewEducationSectionProps = {
    education?: EducationList;
}

const ReviewEducationSection = ({ education }: ReviewEducationSectionProps) => {
    return (
        <div>
            <Typography variant="h4" borderBottom={'1px solid black'} paddingLeft={'10px'} marginRight={'20px'} fontWeight={800}>Education</Typography>
            {education && Object.keys(education).map(item => {
                return (
                    <div>
                        <Typography>{education[item].degree}</Typography>
                        <Typography>{education[item]["end date"]}</Typography>
                        <Typography>{education[item]["field of study"]}</Typography>
                        <Typography>{education[item]["school address"]}</Typography>
                        <Typography>{education[item]["school name"]}</Typography>
                        <Typography>{education[item]["start date"]}</Typography>
                    </div>
                )
            })}
        </div>
    )
}

export default ReviewEducationSection;