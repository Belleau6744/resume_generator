import { Skeleton } from "@mui/material";
import styled from "styled-components";


const LanguageLevelScalePreview = () => {
    
    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LeftSide>
                    <LanguageName><Skeleton variant="rectangular" width={60} height={10} /></LanguageName>
                    <LanguageLevelDescription><Skeleton variant="rectangular" width={60} height={10} /></LanguageLevelDescription>
                </LeftSide>
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
                <LeftSide>
                    <LanguageName><Skeleton variant="rectangular" width={60} height={10} /></LanguageName>
                    <LanguageLevelDescription><Skeleton variant="rectangular" width={60} height={10} /></LanguageLevelDescription>
                </LeftSide>
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
                <LeftSide>
                    <LanguageName><Skeleton variant="rectangular" width={60} height={10} /></LanguageName>
                    <LanguageLevelDescription><Skeleton variant="rectangular" width={60} height={10} /></LanguageLevelDescription>
                </LeftSide>
                <Scale>
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                    <Skeleton variant='circular' animation={false} width={10} height={10} />
                </Scale>
            </div>
        </Container>
    )
};

const LanguageLevelDescription = styled.div`
    color: #667085;
    font-size: 0.8rem;
`;

const LanguageName = styled.div``;

const Scale = styled.div`
    display: flex;
`;

const LeftSide = styled.div`
    display: flex;
    gap: 5px;
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-bottom: 13px;
    border-bottom: 1px solid black;
`;


export default LanguageLevelScalePreview