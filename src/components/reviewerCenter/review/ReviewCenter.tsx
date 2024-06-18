import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    min-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 24px;
    color: black;
`;

const ReviewCenter = () => {
    const { resumeID } = useParams();
    return (
        <Container>Welcome to the Review Center for resume: {resumeID}</Container>
    )
}
export default ReviewCenter;