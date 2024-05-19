import { ResumeType } from "../../../types/dbStructType";
import { Skills } from "../../../types/resumeTypes";

type SkillsBuilderProps = {
    content: Skills;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const SkillsBuilder = ({ content, setCurrentResume }: SkillsBuilderProps) => {
    console.log(content, setCurrentResume);
    return (
        <>Skilss</>
    )
};

export default SkillsBuilder;