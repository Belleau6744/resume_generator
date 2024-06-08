import styled from "styled-components";
import EmptyCircleIcon from "../../../../../../../../../assets/Icons/EmptyCircleIcon";
import FullCircleIcon from "../../../../../../../../../assets/Icons/FullCircleIcon";
import { Skeleton } from "@mui/material";


const LanguageLevelScalePreview = () => {
    
    return (
        <Container>
            <LeftSide>
                <LanguageName><Skeleton variant="rectangular" width={100} height={60} /></LanguageName>
                <LanguageLevelDescription><Skeleton variant="rectangular" width={100} height={60} /></LanguageLevelDescription>
            </LeftSide>
            <Scale>
                <FullCircleIcon />
                <FullCircleIcon />
                <FullCircleIcon />
                <FullCircleIcon />
                <EmptyCircleIcon />
                <EmptyCircleIcon />
            </Scale>
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
    flex-direction: column;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
`;


export default LanguageLevelScalePreview