import styled from "styled-components";
import EmailIcon from "../../../../../../../../assets/Icons/EmailIcon";
import LinkedInIcon from "../../../../../../../../assets/Icons/LinkedInIcon";
import LocationIcon from "../../../../../../../../assets/Icons/LocationIcon";
import PhoneIcon from "../../../../../../../../assets/Icons/PhoneIcon";
import { SectionContainer } from "./utils";
import { Skeleton } from "@mui/material";

const ContactInfoSectionPreview = () => {
    return (
        <ContactInfoContainer>    
            <SectionTitle>Contact</SectionTitle>
            <ItemContainer><PhoneIcon /><Skeleton variant="rectangular" width={100} height={60} /></ItemContainer>
            <ItemContainer><LocationIcon /><Skeleton variant="rectangular" width={100} height={60} /></ItemContainer>
            <ItemContainer><EmailIcon /><Skeleton variant="rectangular" width={100} height={60} /></ItemContainer>
            <ItemContainer><LinkedInIcon /><Skeleton variant="rectangular" width={100} height={60} /></ItemContainer>
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

export default ContactInfoSectionPreview;