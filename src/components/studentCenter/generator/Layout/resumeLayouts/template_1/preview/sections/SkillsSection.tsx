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
                    <div><Skeleton variant="rectangular" width={100} height={10} /></div>
                    <div style={{ paddingLeft: '10px', paddingTop: '5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Skeleton variant="rectangular" width={90} height={10} />
                        <Skeleton variant="rectangular" width={90} height={10} />
                        <Skeleton variant="rectangular" width={90} height={10} />
                    </div>
                </div>
                <div>
                    <div><Skeleton variant="rectangular" width={100} height={10} /></div>
                    <div style={{ paddingLeft: '10px', paddingTop: '5px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Skeleton variant="rectangular" width={90} height={10} />
                        <Skeleton variant="rectangular" width={90} height={10} />
                        <Skeleton variant="rectangular" width={90} height={10} />
                    </div>
                </div>
            </div>
        </SkillsContainer>
    )
};

export default SkillsSectionPreview;