import styled from "styled-components";
import { EducationList } from "../../../../../../../../types/resumeTypes";
import { SectionContainer } from "./utils";
import { Skeleton } from "@mui/material";

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

const EducationSectionPreview = ({education}: EducationSectionProps) => {
    return education ? (
        <EducationContainer>
            <SectionTitle>Education</SectionTitle>
                <DegreeContainer>
                    <FieldOfStudy><Skeleton variant="rectangular" width={100} height={60} /></FieldOfStudy>
                    <DegreeTitle><Skeleton variant="rectangular" width={100} height={60} /></DegreeTitle>
                    <SchoolName><Skeleton variant="rectangular" width={100} height={60} /></SchoolName>
                    <DateWrapper>
                        <Skeleton variant="rectangular" width={100} height={60} />
                    </DateWrapper>
                </DegreeContainer>
        </EducationContainer>
    ): (
        <></>
    )
};

export default EducationSectionPreview ;