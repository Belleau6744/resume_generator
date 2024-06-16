import { Skeleton } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
    padding-top: 8px;
`;

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const SkillsSectionPreview = () => {
    return (
        <Container>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                    <Skeleton width={50} height={10} animation={false} />
                </div>
            </div>
        </Container>
    )
}

export default SkillsSectionPreview;