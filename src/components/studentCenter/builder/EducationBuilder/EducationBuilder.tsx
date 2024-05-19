import { ResumeType } from "../../../../types/dbStructType";
import { Education } from '../../../../types/resumeTypes';

type EducationBuilderProps = {
    content: Education;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const EducationBuilder = ({ content, setCurrentResume }: EducationBuilderProps) => {
    return (
        <>Education</>
    )
};

export default EducationBuilder;