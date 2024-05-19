import { ResumeType } from "../../../types/dbStructType";
import { Experience } from "../../../types/resumeTypes";

type ExperienceBuilderProps = {
    content: Experience;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const ExperienceBuilder = ({ content, setCurrentResume }: ExperienceBuilderProps) => {
    console.log(content, setCurrentResume);
    return (
        <>Work Experience</>
    )
};

export default ExperienceBuilder;