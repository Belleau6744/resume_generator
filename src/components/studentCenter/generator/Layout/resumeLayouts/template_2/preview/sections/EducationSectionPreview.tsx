import { Skeleton } from "@mui/material";
import styled from "styled-components";

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
    font-weight: 700;
    font-size: 0.8rem;
`;

const EducationSectionPreview = () => {
    return (
        <Container>
            <SectionTitle>Education</SectionTitle>
            <ContentWrapper>
                <div style={{ borderBottom: '1px ', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '5px'}} ><Skeleton animation={false} width={300} height={12} /></div>
                    <div style={{ padding: '0', margin: '0', display: 'flex', flexDirection: 'column' ,paddingLeft: '8px', gap: '3px' }}>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={330} height={10} /></div>
                        <div style={{ padding: '0', display: 'flex', alignItems: 'center' }}><Skeleton animation={false} width={330} height={10} /></div>
                    </div>
                </div>
            </ContentWrapper>
        </Container>
    )
}

export default EducationSectionPreview;