import { Skeleton } from "@mui/material";
import styled from "styled-components";
import { SectionContainer } from "./utils";

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const SkillsContainer = styled(SectionContainer)`
    margin-bottom: 10px;
`; 

const SkillsSectionPreview = () => {
    return (
        <SkillsContainer>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                    <div><Skeleton width={100} height={10} /></div>
                    <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div><Skeleton width={100} height={10} /></div>
                        <div><Skeleton width={100} height={10} /></div>
                        <div><Skeleton width={100} height={10} /></div>
                    </div>
                </div>
                <div>
                    <div><Skeleton width={100} height={10} /></div>
                    <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <div><Skeleton width={100} height={10} /></div>
                        <div><Skeleton width={100} height={10} /></div>
                        <div><Skeleton width={100} height={10} /></div>
                    </div>
                </div>
            </div>
        </SkillsContainer>
    )
};

export default SkillsSectionPreview;