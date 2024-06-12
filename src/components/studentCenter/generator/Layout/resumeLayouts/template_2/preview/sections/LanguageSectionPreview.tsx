import { Skeleton } from "@mui/material";
import styled from "styled-components";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 20px;
    gap: 8px;
    margin-bottom: 10px;
`;

const Container = styled.div`    
    padding-top: 8px;
`;

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const Scale = styled.div`
    display: flex;
`;

const LanguageLevelDescription = styled.div`
    color: #667085;
    font-size: 0.8rem;
`;

const LanguageName = styled.div``;


const LanguageSectionPreview = () => {
    return (
        <Container>
            <SectionTitle>Languages</SectionTitle>
            <ContentWrapper>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>
                            <LanguageName><Skeleton variant="text" width={60} height={10} animation={false} /></LanguageName>
                            <LanguageLevelDescription><Skeleton variant="text" width={60} height={10} animation={false} /></LanguageLevelDescription>
                        </div>
                        <Scale>
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                        </Scale>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>
                            <LanguageName><Skeleton variant="text" width={60} height={10} animation={false} /></LanguageName>
                            <LanguageLevelDescription><Skeleton variant="text" width={60} height={10} animation={false} /></LanguageLevelDescription>
                        </div>
                        <Scale>
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                            <Skeleton variant='circular' animation={false} width={10} height={10} />
                        </Scale>
                    </div>
                </div>
            </ContentWrapper>

        </Container>
    )
}

export default LanguageSectionPreview;