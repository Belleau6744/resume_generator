import styled from "styled-components";
import EmailIcon from "../../../../assets/Icons/EmailIcon";
import LinkedInIcon from "../../../../assets/Icons/LinkedInIcon";
import LocationIcon from "../../../../assets/Icons/LocationIcon";
import PhoneIcon from "../../../../assets/Icons/PhoneIcon";

type ContactInfoProps = {
    phoneNumber?: string;
    address?: string;
    emailAddress?: string;
    linkedIn?: string;
    citizenship?: string;
}

const ContactInfoSection = (props: ContactInfoProps) => {
    const { phoneNumber, address, emailAddress, linkedIn, citizenship } = props;
    return (
        <ContactInfoContainer>    
            <SectionTitle>Contact</SectionTitle>
            {phoneNumber && <ItemContainer><PhoneIcon />{phoneNumber}</ItemContainer>}
            {address && <ItemContainer><LocationIcon />{address}</ItemContainer>}
            {emailAddress && <ItemContainer><EmailIcon />{emailAddress}</ItemContainer>}
            {linkedIn && <ItemContainer><LinkedInIcon />{linkedIn}</ItemContainer>}
            {<div>{citizenship}</div>}
        </ContactInfoContainer>
    )
};

const SectionTitle = styled.div`
    font-weight: 800;
    font-size: 1.3rem;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ContactInfoContainer = styled.div`
    width: 100%;
    gap: 3px;
    margin-bottom: 20px;
`;

export default ContactInfoSection;