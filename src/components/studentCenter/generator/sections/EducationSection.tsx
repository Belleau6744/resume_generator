import styled from "styled-components";
import { Education } from "../../../../types/resumeTypes";

type EducationSectionProps = {
    education?: Education;
}

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
    margin-bottom: 8px;
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
    font-size: 0.8rem;
`;

const FieldOfStudy = styled.div`
    font-weight: 800;
`;

const SchoolName = styled.div`
    font-weight: 500;
    font-size: 0.8rem;
`;

const DateWrapper = styled.div`
    display: flex;
    color: #667085;
    font-size: 0.6rem;
`;
/********** Degree Content **************/

const EducationSection = ({education}: EducationSectionProps) => {
    return education ? (
        <EducationContainer>
            <SectionTitle>Education</SectionTitle>
                {Object.values(education).map((item, index) => {
                    return (
                        <DegreeContainer key={index}>
                            <FieldOfStudy>{item.fieldOfStudy}</FieldOfStudy>
                            <DegreeTitle>{item.degree},</DegreeTitle>
                            <SchoolName>{item.schoolName}</SchoolName>
                            <DateWrapper>
                                <div>{item.startDate}&nbsp;</div>-
                                <div>&nbsp;{item.endDate}</div>
                            </DateWrapper>
                        </DegreeContainer>
                    );
                })}
        </EducationContainer>
    ): (
        <></>
    )
};

export default EducationSection;