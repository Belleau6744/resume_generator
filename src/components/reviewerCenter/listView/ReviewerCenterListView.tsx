import styled from "styled-components";

type ReviewerCenterListViewProps = {
    userID: string;
}

const Container = styled.div`
    background: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 24px;
    margin: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 24px;
    color: black;
`;

const ReviewerCenterListView = ({ userID }: ReviewerCenterListViewProps) => {
    return (
        <Container>REVIEWER CENTER: {userID}</Container>
    )
};

export default ReviewerCenterListView;