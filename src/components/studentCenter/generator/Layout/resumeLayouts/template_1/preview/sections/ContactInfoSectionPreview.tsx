import { Skeleton } from "@mui/material";
import styled from "styled-components";
import EmailIcon from "../../../../../../../../assets/Icons/EmailIcon";
import LinkedInIcon from "../../../../../../../../assets/Icons/LinkedInIcon";
import LocationIcon from "../../../../../../../../assets/Icons/LocationIcon";
import PhoneIcon from "../../../../../../../../assets/Icons/PhoneIcon";
import { SectionContainer } from "./utils";

const ContactInfoSectionPreview = () => {
    return (
        <ContactInfoContainer>    
            <SectionTitle>Contact</SectionTitle>
            <ItemContainer><PhoneIcon width={15} height={15} /><Skeleton variant="rectangular" width={100} height={10} /></ItemContainer>
            <ItemContainer><LocationIcon width={15} height={15} /><Skeleton variant="rectangular" width={100} height={10} /></ItemContainer>
            <ItemContainer><EmailIcon width={15} height={15} /><Skeleton variant="rectangular" width={100} height={10} /></ItemContainer>
            <ItemContainer><LinkedInIcon width={15} height={15} /><Skeleton variant="rectangular" width={100} height={10} /></ItemContainer>
        </ContactInfoContainer>
    )
};

const SectionTitle = styled.div`
    font-weight: 700;
    font-size: 0.8rem;
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ContactInfoContainer = styled(SectionContainer)`
    gap: 3px;
    margin-bottom: 10px;
`;

export default ContactInfoSectionPreview;