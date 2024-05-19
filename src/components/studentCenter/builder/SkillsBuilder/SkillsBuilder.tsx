import { ResumeType } from "../../../../types/dbStructType";
import { Skills } from "../../../../types/resumeTypes";

type SkillsBuilderProps = {
    content: Skills;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SkillsBuilder = ({ content, setCurrentResume }: SkillsBuilderProps) => {
    return (
        <>Skilss</>
    )
};

export default SkillsBuilder;