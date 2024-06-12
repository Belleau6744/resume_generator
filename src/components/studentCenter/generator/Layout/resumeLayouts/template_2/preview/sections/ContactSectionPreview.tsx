import { Skeleton } from "@mui/material"
import EmailIcon from "assets/Icons/EmailIcon"
import LinkedInIcon from "assets/Icons/LinkedInIcon"
import LocationIcon from "assets/Icons/LocationIcon"
import PhoneIcon from "assets/Icons/PhoneIcon"
import styled from "styled-components"

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
const Container = styled.div`
    display: flex;
    align-items: start;
    justify-content: center;
    height: fit-content;
    gap: 12px;
    width: 100%;
    padding-bottom: 8px;
    border-bottom: 1px solid black;
`;

const ContactSectionPreview = () => {
    return (
        <Container>
            <ItemContainer><PhoneIcon width={15} height={15} /><Skeleton width={50} height={10} animation={false} /></ItemContainer>
            <ItemContainer><LocationIcon width={15} height={15} /><Skeleton width={50} height={10} animation={false} /></ItemContainer>
            <ItemContainer><EmailIcon width={15} height={15} /><Skeleton width={50} height={10} animation={false} /></ItemContainer>
            <ItemContainer><LinkedInIcon width={15} height={15} /><Skeleton width={50} height={10} animation={false} /></ItemContainer>
        </Container>
    )
}

export default ContactSectionPreview;