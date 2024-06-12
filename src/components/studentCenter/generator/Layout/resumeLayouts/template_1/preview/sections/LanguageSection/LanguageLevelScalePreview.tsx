import { Skeleton } from "@mui/material";
import styled from "styled-components";


const LanguageLevelScalePreview = () => {
    
    return (
        <Container>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LeftSide>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                </LeftSide>
                <Scale>
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                </Scale>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LeftSide>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                </LeftSide>
                <Scale>
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                </Scale>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LeftSide>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                    <div><Skeleton width={60} height={12} animation={false} /></div>
                </LeftSide>
                <Scale>
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                    <Skeleton variant='circular' animation={false} width={8} height={8} />
                </Scale>
            </div>
        </Container>
    )
};

const Scale = styled.div`
    display: flex;
    gap: 2px;
`;

const LeftSide = styled.div`
    display: flex;
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