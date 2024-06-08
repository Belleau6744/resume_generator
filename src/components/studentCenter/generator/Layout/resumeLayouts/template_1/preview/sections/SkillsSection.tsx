import styled from "styled-components";
import { SectionContainer } from "./utils";
import { Skeleton } from "@mui/material";

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const SkillsContainer = styled(SectionContainer)`
    margin-bottom: 20px;
`; 

const SkillsSectionPreview = () => {
    return (
        <SkillsContainer>
            <SectionTitle>Skills</SectionTitle>
            <div>
                <div><Skeleton variant="rectangular" width={100} height={20} /></div>
                <div><Skeleton variant="rectangular" width={100} height={20} /></div>
                <div><Skeleton variant="rectangular" width={100} height={20} /></div>
            </div>
        </SkillsContainer>
    )
};

export default SkillsSectionPreview;