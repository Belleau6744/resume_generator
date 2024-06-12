import { Skeleton } from "@mui/material";
import styled from "styled-components";
import { SectionContainer } from "./utils";

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const EducationContainer = styled(SectionContainer)`
    margin-bottom: 20px;
`;

const DateWrapper = styled.div`
    display: flex;
    color: #667085;
    gap: 8px;
    font-size: 0.6rem;
`;

const EducationSectionPreview = () => {
    return (
        <EducationContainer>
            <SectionTitle>Education</SectionTitle>
                <span>
                    <div><Skeleton width={60} height={10} animation={false} /></div>
                    <DateWrapper>
                        <Skeleton width={30} height={10} animation={false} />
                        <Skeleton width={30} height={10} animation={false} />
                    </DateWrapper>
                    <div><Skeleton width={100} height={10} animation={false} /></div>
                    <div><Skeleton width={100} height={10} animation={false} /></div>
                </span>
                <span>
                    <div><Skeleton width={60} height={10} animation={false} /></div>
                    <DateWrapper>
                        <Skeleton width={30} height={10} animation={false} />
                        <Skeleton width={30} height={10} animation={false} />
                    </DateWrapper>
                    <div><Skeleton width={100} height={10} animation={false} /></div>
                    <div><Skeleton width={100} height={10} animation={false} /></div>
                </span>
        </EducationContainer>
    )
};

export default EducationSectionPreview ;