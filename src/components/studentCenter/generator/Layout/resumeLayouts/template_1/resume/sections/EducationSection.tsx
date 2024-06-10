import { EducationList } from "@types";
import styled from "styled-components";
import { SectionContainer } from "./utils";

type EducationSectionProps = {
    education?: EducationList;
}

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
    margin-bottom: 8px;
`;

const EducationContainer = styled(SectionContainer)`
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
                            <FieldOfStudy>{item["field of study"]}</FieldOfStudy>
                            <DegreeTitle>{item.degree},</DegreeTitle>
                            <SchoolName>{item["school name"]}</SchoolName>
                            <DateWrapper>
                                <div>{item["start date"]}&nbsp;</div>-
                                <div>&nbsp;{item["end date"]}</div>
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