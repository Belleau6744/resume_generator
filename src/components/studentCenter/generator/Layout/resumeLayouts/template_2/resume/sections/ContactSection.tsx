import EmailIcon from "assets/Icons/EmailIcon"
import LinkedInIcon from "assets/Icons/LinkedInIcon"
import PhoneIcon from "assets/Icons/PhoneIcon"
import styled from "styled-components"
import { ContactInfoProps } from "../../../types"

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
const Container = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-around;
    height: fit-content;
    width: 100%;
    padding: 8px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid black;
`;

const ContactSection = ({ phoneNumber, emailAddress, linkedIn }: ContactInfoProps) => {
    return (
        <Container>
            {phoneNumber && <ItemContainer><PhoneIcon width={15} height={15} />{phoneNumber}</ItemContainer>}
            {emailAddress && <ItemContainer><EmailIcon width={15} height={15} />{emailAddress}</ItemContainer>}
            {linkedIn && <ItemContainer><LinkedInIcon width={15} height={15} />{linkedIn}</ItemContainer>}
        </Container>
    )
}

export default ContactSection;