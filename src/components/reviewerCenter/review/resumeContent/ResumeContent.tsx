import { ResumeContentType } from "@types";
import ReviewEducationSection from "./sections/ReviewEducationSection";
import ReviewExperienceSection from "./sections/ReviewExperienceSection";
import ReviewGeneralSection from "./sections/ReviewGeneralSection";
import ReviewSkillsSection from "./sections/ReviewSkillsSection";

type ResumeContentProps = {
    content?: ResumeContentType;
}

const ResumeContent = ({ content }: ResumeContentProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* General Info */}
            <ReviewGeneralSection generalInfo={content?.generalInfo}/>

            {/* Education */}
            <ReviewEducationSection education={content?.education} />            

            {/* Experience */}
            <ReviewExperienceSection experience={content?.experience} />

            {/* Skills */}
            <ReviewSkillsSection skills={content?.skills}/>
        </div>
    )
}

export default ResumeContent;