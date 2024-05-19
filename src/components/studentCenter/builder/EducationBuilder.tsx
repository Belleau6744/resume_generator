import { ResumeType } from "../../../types/dbStructType";
import { Education } from '../../../types/resumeTypes';

type EducationBuilderProps = {
    content: Education;
    setCurrentResume:  React.Dispatch<React.SetStateAction<ResumeType>>;
}

const EducationBuilder = ({ content, setCurrentResume }: EducationBuilderProps) => {
    console.log(content, setCurrentResume);
    return (
        <>Education</>
    )
};

export default EducationBuilder;