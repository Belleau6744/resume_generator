import styled from "styled-components";
import EmailIcon from "../../../../../../../../assets/Icons/EmailIcon";
import LinkedInIcon from "../../../../../../../../assets/Icons/LinkedInIcon";
import PhoneIcon from "../../../../../../../../assets/Icons/PhoneIcon";
import { ContactInfoProps } from "../../../types";
import { SectionContainer } from "./utils";

const ContactInfoSection = (props: ContactInfoProps) => {
    const { phoneNumber, emailAddress, linkedIn } = props;
    return (
        <ContactInfoContainer>    
            <SectionTitle>Contact</SectionTitle>
            {phoneNumber && <ItemContainer><PhoneIcon />{phoneNumber}</ItemContainer>}
            {emailAddress && <ItemContainer><EmailIcon />{emailAddress}</ItemContainer>}
            {linkedIn && <ItemContainer><LinkedInIcon />{linkedIn}</ItemContainer>}
        </ContactInfoContainer>
    )
};

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1rem;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ContactInfoContainer = styled(SectionContainer)`
    gap: 3px;
    margin-bottom: 20px;
`;

export default ContactInfoSection;