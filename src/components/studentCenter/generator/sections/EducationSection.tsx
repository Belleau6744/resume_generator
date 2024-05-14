import styled from "styled-components";
import { Education } from "../../../../types/resumeTypes";

type EducationSectionProps = {
    education?: Education;
}

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1.8rem;
`;

const EducationContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const DegreeContainer = styled.div`
    margin-bottom: 15px;
`;

/********** Degree Content **************/
const DegreeTitle = styled.div`
    font-weight: 1000;
`;

const FieldOfStudy = styled.div`
    font-weight: 800;
`;

const SchoolName = styled.div`
    font-weight: 500;
    /* color: #667085; */
`;
/********** Degree Content **************/

const EducationSection = ({education}: EducationSectionProps) => {
    return education ? (
        <EducationContainer>
            <SectionTitle>Education</SectionTitle>
                {Object.values(education).map((item, index) => {
                    return (
                        <DegreeContainer>
                            <div style={{ display: 'flex' }}>
                            <DegreeTitle key={index}>{item.degree},</DegreeTitle>
                            <FieldOfStudy>{item.fieldOfStudy.toUpperCase()}</FieldOfStudy>
                            </div>
                            
                            <SchoolName>{item.schoolName}</SchoolName>

                            <div>{item.endDate}</div>
                            <div>{item.schoolAddresss}</div>
                            
                            <div>{item.startDate}</div>
                        </DegreeContainer>
                    );
                })}
        </EducationContainer>
    ): (
        <></>
    )
};

export default EducationSection;