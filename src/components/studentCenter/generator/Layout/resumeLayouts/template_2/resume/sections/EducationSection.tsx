import styled from "styled-components";
import { EducationSectionProps } from "../../../types";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    padding-top: 4px;
    gap: 8px;
`;

const Container = styled.div`    
    padding-top: 8px;
`;

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
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

const EducationSection = ({ education }: EducationSectionProps) => {
    return education ? (
        <Container>
            <SectionTitle>Education</SectionTitle>
            <ContentWrapper>
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
            </ContentWrapper>
        </Container>
    ) : (
        <></>
    )
}

export default EducationSection;