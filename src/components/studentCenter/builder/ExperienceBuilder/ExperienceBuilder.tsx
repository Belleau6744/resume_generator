import { ResumeType } from "../../../../types/dbStructType";
import { Experience } from "../../../../types/resumeTypes";

type ExperienceBuilderProps = {
    content: Experience;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ExperienceBuilder = ({ content, setCurrentResume }: ExperienceBuilderProps) => {
    return (
        <>Work Experience</>
    )
};

export default ExperienceBuilder;